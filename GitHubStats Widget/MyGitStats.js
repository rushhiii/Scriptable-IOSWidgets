// icon-color: black; icon-glyph: github;

const username = "rushhiii";
const token = Keychain.get("github_token"); // replace this with you token

// const rawParam = args.widgetParameter || "";
// const rawParam = args.widgetParameter || "rushhiii/Scriptable-IOSWidgets,views,indigo";
// const [repoPath, statType = "", themeParam = "auto"] = rawParam.split(",").map(s => s.trim());
const rawParam = args.widgetParameter || "";
const parts = rawParam.split(",").map(s => s.trim());

let repoPath = "";
let statType = "";
let themeParam = "auto";

if (parts.length === 3) {
  [repoPath, statType, themeParam] = parts;
} else if (parts.length === 2) {
  if (parts[0].includes("/")) {
    [repoPath, statType] = parts;
  } else {
    [statType, themeParam] = parts;
  }
} else if (parts.length === 1) {
  if (parts[0].includes("/")) {
    repoPath = parts[0];
  } else {
    themeParam = parts[0];
  }
}


const size = config.widgetFamily || "medium";
const UI = {
  small: { font: 12, headfont: 24, lineSpacing: 4, logo: 26, pad: 10 },
  medium: { font: 13, headfont: 20, lineSpacing: 5, logo: 38, pad: 12 },
  large: { font: 14, headfont: 32, lineSpacing: 6, logo: 34, pad: 14 }
}[size];

const now = new Date();
const year = now.getFullYear();
const yearLabel = `${year.toString().slice(-2)}`;
const thisYearStart = new Date(year, 0, 1).toISOString();
const today = now.toISOString();

const themePresets = {
  auto: Device.isUsingDarkAppearance()
    ? { colors: ["#0b0e2c", "#000000"], locations: [0, 1], head: "#ffffff", text: "#909692", acc: "#3094ff" }
    : { colors: ["#e6f2f1", "#bff2c2"], locations: [0, 1], head: "#000000", text: "#5a615c", acc: "#006edb" },

  blue: {
    colors: ["#0d1117", "#1E2838", "#1f6feb"],
    locations: [1.0, 0.5, 0.0],
    head: "#ffffff", text: "#c0c0c0", acc: "#58a6ff"
  },
  green: {
    colors: ["#defefa", "#bfffd1"],
    locations: [0, 1],
    head: "#000000", text: "#5a615c", acc: "#000000"
  },
  indigo: {
    colors: ["#000244", "#000233", "#000000"],
    locations: [0, 0.5, 1],
    head: "#ffffff", text: "#909692", acc: "#ffffff"
  },
  dark: {
    colors: ["#101411", "#101411"],
    locations: [0, 1],
    head: "#ffffff", text: "#909692", acc: "#3094ff"
  },
  light: {
    colors: ["#ffffff", "#ffffff"],
    locations: [0, 1],
    head: "#000000", text: "#5a615c", acc: "#006edb"
  }
};

const selectedTheme = themeParam in themePresets ? themePresets[themeParam] : themePresets.auto;
// const selectedTheme = themePresets[themeParam.toLowerCase()] || themePresets.auto;

function makeGradient(theme) {
  const g = new LinearGradient();
  g.colors = theme.colors.map(c => new Color(c));
  g.locations = theme.locations;
  return g;
}


// Dates for yearly contributions
// const now = new Date();
// const year = new Date().getFullYear();
// const yearLabel = `${year.toString().slice(-2)}`; // e.g., "25'"

// const thisYearStart = new Date(now.getFullYear(), 0, 1).toISOString();
// const today = now.toISOString();

// === GRAPHQL Query ===
const graphQLQuery = `
{
  user(login: "${username}") {
    contributionsThisYear: contributionsCollection(from: "${thisYearStart}", to: "${today}") {
      totalCommitContributions
    }
    contributionsAllTime: contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
    pullRequests(states: [OPEN, MERGED, CLOSED]) { totalCount }
    issues(states: [OPEN, CLOSED]) { totalCount }
    repositories(first: 100, isFork: false) {
      nodes {
        defaultBranchRef {
          target {
            ... on Commit {
              history { totalCount }
            }
          }
        }
      }
    }
  }
}`;

async function fetchGraphQLStats() {
  const req = new Request("https://api.github.com/graphql");
  req.method = "POST";
  req.headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
  req.body = JSON.stringify({ query: graphQLQuery });

  const json = await req.loadJSON();
  const user = json.data.user;

  const commits2025 = user.contributionsThisYear.totalCommitContributions;
  const totalContributions = user.contributionsAllTime.contributionCalendar.totalContributions;
  const totalPRs = user.pullRequests.totalCount;
  const totalIssues = user.issues.totalCount;
  const totalCommits = user.repositories.nodes.reduce((sum, repo) =>
    sum + (repo.defaultBranchRef?.target?.history?.totalCount || 0), 0);

  const allDays = user.contributionsAllTime.contributionCalendar.weeks.flatMap(w => w.contributionDays);
  const todayStr = new Date().toISOString().split("T")[0];

  let currentStreak = 0;
  for (let i = allDays.length - 1; i >= 0; i--) {
    const d = allDays[i];
    if (d.date === todayStr) continue;
    if (d.contributionCount > 0) currentStreak++;
    else break;
  }

  let longestStreak = 0, temp = 0;
  for (const d of allDays) {
    if (d.contributionCount > 0) {
      temp++;
      longestStreak = Math.max(temp, longestStreak);
    } else temp = 0;
  }

  return {
    commits2025,
    totalCommits,
    totalContributions,
    totalPRs,
    totalIssues,
    currentStreak,
    longestStreak
  };
}

async function fetchUserInfo() {
  const req = new Request(`https://api.github.com/users/${username}`);
  req.headers = { Authorization: `Bearer ${token}` };
  return await req.loadJSON();
}

async function fetchTopLanguage() {
  const req = new Request(`https://api.github.com/users/${username}/repos?per_page=100`);
  req.headers = { Authorization: `Bearer ${token}` };
  const data = await req.loadJSON();
  const langCount = {};
  for (let repo of data) {
    const lang = repo.language;
    if (lang) langCount[lang] = (langCount[lang] || 0) + 1;
  }
  return Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

async function fetchRepoStat(repoPath, statType) {
  const baseUrl = `https://api.github.com/repos/${repoPath}`;
  const headers = { Authorization: `Bearer ${token}` };

  const req = new Request(baseUrl);
  req.headers = headers;
  const json = await req.loadJSON();
  const ghStats = await fetchGraphQLStats();
  const userInfo = await fetchUserInfo();


  let statValue = 0;
  let type = "";
  if (statType === "stars") {
    statValue = json.stargazers_count;
    type = stars;
  } else if (statType === "commits") {
    // const commitsReq = new Request(`${baseUrl}/commits?per_page=1`);
    // commitsReq.headers = headers;
    // const commits = await commitsReq.loadJSON();
    // const link = commitsReq.response.headers["link"];
    // const lastPage = link?.match(/&page=(\d+)>; rel="last"/)?.[1];
    // statValue = lastPage ? parseInt(lastPage) : commits.length;

    statValue = ghStats.commits2025;
    type = `${year} commits`;
  } else if (statType === "views") {
    const viewsReq = new Request(`${baseUrl}/traffic/views`);
    viewsReq.headers = headers;
    const views = await viewsReq.loadJSON();
    statValue = views.count || 0;
    type = "views";
  } else if (statType === "currstreak") {
    statValue = ghStats.currentStreak;
    type = "current streak";
  } else if (statType === "contributions") {
    statValue = ghStats.totalContributions;
    type = "contributions";
  } else if (statType === "allcommits") {
    statValue = ghStats.totalCommits;
    type = "total commits";
  } else if (statType === "repos") {
    statValue = userInfo.public_repos;
    type = "repos";
  } else if (statType === "longstreak") {
    statValue = ghStats.longestStreak;
    type = "longest streak";
  } else if (statType === "followers") {
    statValue = userInfo.followers;
    type = "Followers";
  } else if (statType === "following") {
    statValue = userInfo.following;
    type = "Following";
  } else if (statType === "prs") {
    statValue = ghStats.totalPRs;
    type = "PRs";
  } else if (statType === "issues") {
    statValue = ghStats.totalIssues;
    type = "Total Issues";
  }

  return {
    name: json.name,
    statValue,
    url: json.html_url,
    type
  };
}

function formatNumber(value) {
  value = parseInt(value);
  if (value < 1000) return value.toString();
  const units = ["k", "m", "b", "t"];
  const order = Math.floor(Math.log10(value) / 3);
  const num = (value / Math.pow(1000, order)).toFixed(1).replace(/\.0$/, "");
  return num + units[order - 1];
}

async function createWidget() {
  const userInfo = await fetchUserInfo();
  const language = await fetchTopLanguage();
  const ghStats = await fetchGraphQLStats();
  const showRepoStats = repoPath && [
    "stars", "commits", "views", "currstreak", "contributions", "allcommits", "repos", "longstreak",
    "followers", "issues", "prs", "following", "followers"
  ].includes(statType);
  const repoStats = showRepoStats ? await fetchRepoStat(repoPath, statType) : null;
  const logoImg = await new Request("https://i.imgur.com/MJzROGa.png").loadImage();

  const w = new ListWidget();
  // w.useDefaultPadding();
  w.backgroundGradient = makeGradient(selectedTheme);

  const headClr = new Color(selectedTheme.head);
  const textClr = new Color(selectedTheme.text);
  const accClr = new Color(selectedTheme.acc);

  const data = { userInfo, language, ghStats, repoStats, logoImg, headClr, textClr, accClr };

  switch (size) {
    case "small": renderSmallLayout(w, data); break;
    case "medium": renderMediumLayout(w, data); break;
    case "large": renderLargeLayout(w, data); break;
  }

  return w;
}


function renderSmallLayout(w, { userInfo, language, ghStats, repoStats, logoImg, headClr, textClr, accClr }) {

  w.useDefaultPadding();


  const f = (UI.font) - 1;
  const addLine = (label, value, icon = "") => {
    if (typeof value === "number" && value <= 1) return;
    if (!value || value === 0) return;
    const line = w.addText(`${icon} ${label}: ${value}`);
    line.font = Font.mediumSystemFont(f);
    line.textColor = textClr;
    line.lineLimit = 1;
    w.addSpacer(UI.lineSpacing);
  };


  if (repoStats) {
    const row = w.addStack();
    row.layoutHorizontally();
    row.centerAlignContent(); // bottomAlignContent

    const head = row.addText(username);
    head.font = Font.mediumSystemFont(UI.headfont);
    head.textColor = headClr;
    // head.lineLimit = 2;
    head.minimumScaleFactor = 0.8;

    row.addSpacer();

    const offset = (UI.logo) + 5;
    const img = row.addImage(logoImg);
    img.imageSize = new Size(offset, offset);
    img.tintColor = headClr; // any accent color

    w.addSpacer();
    const stat = w.addText(formatNumber(repoStats.statValue));
    stat.font = Font.mediumSystemFont(UI.headfont + 12); // 36 = 24 + 12
    stat.textColor = accClr;

    const statTitle = w.addText(`${repoStats.name} (${repoStats.type})`);
    statTitle.font = Font.systemFont(UI.font);
    statTitle.textColor = textClr;
  } else {
    w.addSpacer();

    const header = w.addStack();
    header.layoutHorizontally();
    header.centerAlignContent(); // bottomAlignContent

    const title = header.addText(`${username}'s GitHub Stats`);
    title.font = Font.boldSystemFont(UI.font);
    title.textColor = headClr;
    title.lineLimit = 2;
    header.addSpacer();
    const logo = header.addImage(logoImg);
    logo.imageSize = new Size(UI.logo, UI.logo);
    logo.tintColor = headClr;

    // w.addSpacer(UI.lineSpacing);
    // w.addSpacer(6);
    w.addSpacer();


    addLine("Curr Streak", `${ghStats.currentStreak} days`, "🔥");
    addLine(`Commits ('${yearLabel})`, ghStats.commits2025, "🕒");
    addLine("Contributions", ghStats.totalContributions, "📅");
    // addLine("PRs", ghStats.totalPRs, "🔃");
    addLine("Repos", userInfo.public_repos, "📦");
    addLine("Followers", userInfo.followers, "👥");
    // addLine("Following", userInfo.following, "🔄");
    // if (language) addLine("Top Language", language, "💻");
    // addLine("Total Commits (all-time)", ghStats.totalCommits, "📜");
    // addLine("Total Issues", ghStats.totalIssues, "❗");
    // addLine("Repos", userInfo.public_repos, "📦");
    // addLine("Longest Streak", `${ghStats.longestStreak} days`, "🏆");
    w.addSpacer();

  }

}

function renderMediumLayout(w, { userInfo, language, ghStats, repoStats, logoImg, headClr, textClr, accClr }) {
  w.setPadding(UI.pad, UI.pad, UI.pad, UI.pad);
  // w.addSpacer();

  const header = w.addStack();
  header.layoutHorizontally();
  header.centerAlignContent(); // bottomAlignContent

  const title = header.addText(`${username}'s GitHub Stats`);
  title.font = Font.boldSystemFont(UI.headfont);
  title.textColor = headClr;

  header.addSpacer();

  const logo = header.addImage(logoImg);
  logo.imageSize = new Size(UI.logo, UI.logo);
   logo.tintColor = headClr;

  // w.addSpacer(UI.lineSpacing);
  // w.addSpacer();

  const addLine = (label, value, icon = "") => {
    if (typeof value === "number" && value <= 1) return;
    if (!value || value === 0) return;
    const line = w.addText(`${icon} ${label}: ${value}`);
    line.font = Font.mediumSystemFont(UI.font);
    line.textColor = Color.lightGray();
    w.addSpacer(UI.lineSpacing);
  };


  addLine("Followers", userInfo.followers, "👥");
  addLine("Following", userInfo.following, "🔄");
  if (language) addLine("Top Language", language, "💻");

  addLine("Curr Streak", `${ghStats.currentStreak} days`, "🔥");
  addLine(`Commits ('${yearLabel})`, ghStats.commits2025, "🕒");
  addLine("Contributions", ghStats.totalContributions, "📅");
  // addLine("PRs", ghStats.totalPRs, "🔃");
  // addLine("Repos", userInfo.public_repos, "📦");
  addLine("Public Repos", userInfo.public_repos, "📦");
  addLine("Followers", userInfo.followers, "👥");
  // addLine("Following", userInfo.following, "🔄");
  // if (language) addLine("Top Language", language, "💻");
  // addLine("Total Commits (all-time)", ghStats.totalCommits, "📜");
  // addLine("Total Issues", ghStats.totalIssues, "❗");
  // addLine("Repos", userInfo.public_repos, "📦");
  // addLine("Longest Streak", `${ghStats.longestStreak} days`, "🏆");
  // w.addSpacer();

}

function renderLargeLayout(w, { userInfo, language, ghStats, logoImg }) {
  const grid = w.addStack();
  grid.layoutHorizontally();

  const col1 = grid.addStack();
  col1.layoutVertically();

  const col2 = grid.addStack();
  col2.layoutVertically();

  const addTo = (stack, label, value, icon) => {
    if (typeof value === "number" && value <= 1) return;
    if (!value || value === 0) return;
    const line = stack.addText(`${icon} ${label}: ${value}`);
    line.font = Font.mediumSystemFont(UI.font);
    line.textColor = Color.lightGray();
    stack.addSpacer(UI.lineSpacing);
  };

  addTo(col1, "Public Repos", userInfo.public_repos, "📦");
  addTo(col1, "Followers", userInfo.followers, "👥");
  addTo(col1, "Commits (2025)", ghStats.commits2025, "🕒");
  addTo(col1, "Streak", `${ghStats.currentStreak}d`, "🔥");

  addTo(col2, "Issues", ghStats.totalIssues, "❗");
  addTo(col2, "PRs", ghStats.totalPRs, "🔃");
  addTo(col2, "Total Commits", ghStats.totalCommits, "📜");
  addTo(col2, "Longest", `${ghStats.longestStreak}d`, "🏆");
}


const widget = await createWidget();
// if (!config.runsInWidget) await widget.presentSmall();
if (!config.runsInWidget) await widget.presentMedium();
Script.setWidget(widget);
Script.complete();
