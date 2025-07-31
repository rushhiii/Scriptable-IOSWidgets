// icon-color: deep-blue; icon-glyph: chalkboard-teacher;

const username = "rushhiii"; // replace with your github username
const token = Keychain.get("github_token_here"); // replace this with you token
// const size = config.widgetFamily || "large";
// const size = config.widgetFamily || "medium";
const size = config.widgetFamily || "small";


const themePresets = {
  auto: Device.isUsingDarkAppearance()
    ? { colors: ["#000244", "#000233", "#000000"], locations: [0.0, 0.5, 1.0], head: "#ffffff", text: "#909692", acc: "#3094ff" }
    : { colors: ["#e6f2f1", "#bff2c2"], locations: [0, 1], head: "#000000", text: "#5a615c", acc: "#006edb" },



  // auto: Device.isUsingDarkAppearance()
  //   ? {
  //           colors: [
  //       "#E1F5FE", // Very light sky blue
  //       "#B3E5FC", // Soft cyan
  //       "#81D4FA", // True sky blue
  //       "#4FC3F7", // Deeper cyan
  //       "#29B6F6"  // iOS-like vibrant blue
  //     ],
  //     locations: [0.0, 0.25, 0.5, 0.75, 1.0],
  //     head: "#000000",        // dark title/icon
  //     text: "#32555f",         // bluish-gray text
  //     acc: "#007AFF"          // standard iOS accent blue

  //     // colors: ["#000244", "#000233", "#000000"],
  //     // locations: [0, 0.5, 1],
  //     // head: "#ffffff", text: "#909692", acc: "#ffffff"
  //   }
  //   : {
  //           colors: ["#000244", "#000233", "#000000"],
  //     locations: [0, 0.5, 1],
  //     head: "#ffffff", text: "#909692", acc: "#ffffff"

  //     // colors: [
  //     //   "#E1F5FE", // Very light sky blue
  //     //   "#B3E5FC", // Soft cyan
  //     //   "#81D4FA", // True sky blue
  //     //   "#4FC3F7", // Deeper cyan
  //     //   "#29B6F6"  // iOS-like vibrant blue
  //     // ],
  //     // locations: [0.0, 0.25, 0.5, 0.75, 1.0],
  //     // head: "#000000",        // dark title/icon
  //     // text: "#32555f",         // bluish-gray text
  //     // acc: "#007AFF"          // standard iOS accent blue
  //   },


  blue: {
    // colors: ["#0d1117", "#1E2838", "#1f6feb"],
    // locations: [1.0, 0.5, 0.0],
    // head: "#ffffff", text: "#c0c0c0", acc: "#58a6ff"
    colors: ["#0A0C1C", "#121C3C", "#263B73"],
    locations: [0, 0.5, 1],
    head: "#ffffff",
    text: "#c0c0c0",
    acc: "#8ac7ff"

  },
  gray: {
    colors: [
      "#202631", // Cloudy navy gray
      "#2D3440", // Muted slate
      "#3C4454", // Blue-gray storm cloud
      "#525D6F", // Electric gray blue
      "#7A8699"  // Lighter edge storm sky
    ],
    locations: [0.0, 0.25, 0.5, 0.75, 1.0],
    head: "#EAEAEA",       // soft lightning white
    text: "#C7CCD5",       // light gray
    acc: "#8AB4F8"         // stormy blue accent

  },
  night: {
    colors: [
      "#000000", // Pure black
      "#04050A", // Subtle hint of navy
      "#0A0F1A", // Faint cool midnight
      "#111827"  // Deep twilight blue-gray
    ],
    locations: [0.0, 0.4, 0.75, 1.0],
    head: "#ffffff",        // bright title/icon
    text: "#B0B8C0",        // soft gray text
    acc: "#42A5F5"
  },
  day: {
    colors: [
      "#E1F5FE", // Very light sky blue
      "#B3E5FC", // Soft cyan
      "#81D4FA", // True sky blue
      "#4FC3F7", // Deeper cyan
      "#29B6F6"  // iOS-like vibrant blue
    ],
    locations: [0.0, 0.25, 0.5, 0.75, 1.0],
    head: "#000000",        // dark title/icon
    text: "#32555f",         // bluish-gray text
    acc: "#007AFF"          // standard iOS accent blue

  },

  gitgreen: {
    colors: ["#defefa", "#bfffd1"],
    locations: [0, 1],
    head: "#000000", text: "#5a615c", acc: "#000000"
  },
  green: {
    colors: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    locations: [0.0, 0.25, 0.5, 0.75, 1.0],
    head: "#0a0e27", // 0a0e27
    text: "#000000",
    acc: "#216e39"
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

// const heatmapThemes = {

//   auto: Device.isUsingDarkAppearance()
//     ? {
//       bg: ["#0d1117", "#0d1117", "#0d1117"],
//       text: "#ffffff",
//       accent: "#56d364",
//       box: ["#2e2f37", "#196c2e", "#196c2e", "#2ea043", "#56d364"]
//     }
//     : {
//       bg: ["#ffffff", "#ffffff", "#ffffff"],
//       text: "#000000",
//       // accent: "#A0A0A0",
//       accent: size === "small" ? "#A0A0A0" : "#116329",
//       box: ["#eff2f5", "#aceebb", "#4ac26b", "#2da44e", "#116329"]

//     },
//   light: {
//     bg: ["#ffffff", "#ffffff", "#ffffff"],
//     text: "#000000",
//     // accent: "#A0A0A0",
//     accent: size === "small" ? "#A0A0A0" : "#116329",
//     box: ["#eff2f5", "#aceebb", "#4ac26b", "#2da44e", "#116329"]
//   },
//   dark: {
//     bg: ["#0d1117", "#0d1117", "#0d1117"],
//     text: "#ffffff",
//     accent: "#56d364",
//     box: ["#2e2f37", "#196c2e", "#196c2e", "#2ea043", "#56d364"]
//   },
//   red: {
//     bg: ["#1e1e1e", "#1e1e1e", "#1e1e1e"],
//     text: "#ffffff",
//     accent: "#fd4c56",
//     box: ["#3a2e30", "#5f2f31", "#ad3b39", "#ae3c3c", "#fd4c56"]
//   },
//   green: {
//     bg: ["#ebedf0", "#9be9a8", "#40c463"],
//     text: "#0a0e27",
//     accent: "#216e39",
//     box: ["#CACACA", "#9be9a8", "#40c463", "#30a14e", "#216e39"]
//   }
// };

const heatmapThemes = {
  auto: Device.isUsingDarkAppearance()
    ? {
      bg: ["#0d1117", "#0d1117", "#0d1117"],
      text: "#ffffff",
      accent: "#56d364",
      box: ["#2e2f37", "#196c2e", "#196c2e", "#2ea043", "#56d364"]
    }
    : {
      bg: ["#ffffff", "#ffffff", "#ffffff"],
      text: "#000000",
      accent: size === "small" ? "#A0A0A0" : "#116329",
      box: ["#eff2f5", "#aceebb", "#4ac26b", "#2da44e", "#116329"]
    },
  light: {
    bg: ["#ffffff", "#ffffff", "#ffffff"],
    text: "#000000",
    accent: size === "small" ? "#A0A0A0" : "#116329",
    box: ["#eff2f5", "#aceebb", "#4ac26b", "#2da44e", "#116329"]
  },
  dark: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#ffffff",
    accent: "#56d364",
    box: ["#2e2f37", "#196c2e", "#196c2e", "#2ea043", "#56d364"]
  },
  red: {
    bg: ["#1e1e1e", "#1e1e1e", "#1e1e1e"],
    text: "#ffffff",
    accent: "#fd4c56",
    box: ["#3a2e30", "#5f2f31", "#ad3b39", "#ae3c3c", "#fd4c56"]
  },
  green: {
    bg: ["#ebedf0", "#9be9a8", "#40c463"],
    text: "#0a0e27",
    accent: "#216e39",
    box: ["#CACACA", "#9be9a8", "#40c463", "#30a14e", "#216e39"]
  },
  // New themes added below
  forestCalm: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#e9f5db",
    accent: "#95d5b2",
    box: ["#0d1b1e", "#1b4332", "#2d6a4f", "#52b788", "#95d5b2"]
  },
  forestCanopy: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#f4a261",
    accent: "#80ffdb",
    box: ["#0d1b1e", "#1d3a3f", "#3a7d44", "#57cc99", "#80ffdb"]
  },
  cyberPurple: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#ffffff",
    accent: "#c77dff",
    box: ["#1a1a2e", "#4b0082", "#6a0dad", "#9b59b6", "#c77dff"]
  },
  sunsetGold: {
    bg: ["#000000", "#000000", "#000000"],
    text: "#ffffff",
    accent: "#fcd34d",
    box: ["#1a1a1a", "#a05a2c", "#e76f51", "#f4a261", "#fcd34d"]
  },
  nordBlueV1: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#00bfff",
    accent: "#ffd700",
    box: ["#1a1a2e", "#113f67", "#1c7293", "#00bfff", "#ffd700"]
  },
  nordBlueV2: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#c9d1d9",
    accent: "#43D0FF",
    box: ["#1a1a2e", "#113f67", "#1c7293", "#0086B3", "#43D0FF", "#ffd700"]
  },
  sunsetDusk: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#f9c74f",
    accent: "#ff8e9e",
    box: ["#1e1e2e", "#42275a", "#734b6d", "#b06ab3", "#ff8e9e"]
  },
  earthyWarm: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#7fb069",
    accent: "#fae588",
    box: ["#1a120b", "#3c2a21", "#9a5b13", "#d4a017", "#fae588"]
  },
  arcticIce: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#ff6d00",
    accent: "#e0e1dd",
    box: ["#050505", "#1b263b", "#415a77", "#778da9", "#e0e1dd"]
  }
};


const langColors = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  TypeScript: "#2b7489",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Go: "#00ADD8",
  Ruby: "#701516",
  Shell: "#89e051",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Rust: "#dea584",
  Dart: "#00B4AB"
};


// Cache configuration
const CACHE_DIR = ".cache";
const CACHE_FILE = "github_stats_cache.json";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Cache management class
class CacheManager {
  constructor() {
    this.fm = FileManager.iCloud();
    this.cacheDir = this.fm.joinPath(this.fm.documentsDirectory(), CACHE_DIR);
    this.cacheFile = this.fm.joinPath(this.cacheDir, CACHE_FILE);
    console.log(`Cache directory path: ${this.cacheDir}`);
    console.log(`Cache file path: ${this.cacheFile}`);
    this.ensureCacheDir();
  }

  ensureCacheDir() {
    try {
      if (!this.fm.fileExists(this.cacheDir)) {
        console.log("Creating cache directory...");
        this.fm.createDirectory(this.cacheDir, true);
        console.log("Cache directory created successfully");
      } else {
        console.log("Cache directory already exists");
      }
    } catch (error) {
      console.error("Failed to create cache directory:", error);
    }
  }

  async saveCache(data) {
    try {
      console.log(`Attempting to save cache with data: ${Object.keys(data).join(', ')}`);
      
      // Ensure directory exists before writing
      this.ensureCacheDir();
      
      const cacheData = {
        timestamp: Date.now(),
        data: data
      };
      
      const jsonString = JSON.stringify(cacheData, null, 2);
      console.log(`Writing cache data, size: ${jsonString.length} characters`);
      
      this.fm.writeString(this.cacheFile, jsonString);
      
      // Download from iCloud to ensure it's available
      if (this.fm.fileExists(this.cacheFile)) {
        await this.fm.downloadFileFromiCloud(this.cacheFile);
        const fileSize = this.fm.fileSize(this.cacheFile);
        console.log(`Cache saved successfully! File size: ${fileSize} bytes`);
        
        // Also log the actual file location for verification
        console.log(`Cache file created at: ${this.cacheFile}`);
        
        // List files in cache directory to verify
        const cacheContents = this.fm.listContents(this.cacheDir);
        console.log(`Cache directory contents: ${cacheContents.join(', ')}`);
      } else {
        console.error("Cache file was not created!");
      }
    } catch (error) {
      console.error("Failed to save cache:", error);
      console.error(`Error details: ${error.message}`);
    }
  }

  async loadCache() {
    try {
      if (!this.fm.fileExists(this.cacheFile)) {
        console.log("No cache file found");
        return null;
      }

      // Download from iCloud first
      await this.fm.downloadFileFromiCloud(this.cacheFile);
      const cacheContent = this.fm.readString(this.cacheFile);
      const cacheData = JSON.parse(cacheContent);
      
      // Check if cache is still valid (within 24 hours)
      const isValid = (Date.now() - cacheData.timestamp) < CACHE_DURATION;
      
      if (!isValid) {
        console.log("Cache expired");
        return null;
      }

      console.log("Cache loaded successfully");
      return cacheData.data;
    } catch (error) {
      console.error("Failed to load cache:", error);
      return null;
    }
  }

  isCacheValid() {
    try {
      if (!this.fm.fileExists(this.cacheFile)) return false;
      
      const cacheContent = this.fm.readString(this.cacheFile);
      const cacheData = JSON.parse(cacheContent);
      
      return (Date.now() - cacheData.timestamp) < CACHE_DURATION;
    } catch (error) {
      return false;
    }
  }
}

// Initialize cache manager
const cacheManager = new CacheManager();

// Helper function to check internet connectivity
async function isOnline() {
  try {
    const req = new Request("https://www.google.com");
    req.timeoutInterval = 5; // 5 second timeout
    await req.load();
    return true;
  } catch (error) {
    console.log("No internet connection detected");
    return false;
  }
}

// console.log(token);

const rawParam = args.widgetParameter || "";

// const rawParam = args.widgetParameter || "rushhiii/Scriptable-IOSWidgets,prs";
// const rawParam = args.widgetParameter || "heatmap,forestCalm";
// const parts = rawParam.toLowerCase().split(",").map(s => s.trim());
const parts = rawParam.split(",").map(s => s.trim());

// With this improved version:
let isHeatmap = parts.includes("heatmap");
let repoPath = "";
let statType = "";
let themeParam = "";

// First pass - look for stat type and repo path
for (let part of parts) {
  if (part === "heatmap") continue;

  if (["stars", "commits", "views", "currstreak", "contributions", "allcommits", "repos", "longstreak", "followers", "following", "issues", "prs"].includes(part)) {
    statType = part;
  } else if (part.includes("/")) {
    repoPath = part;
  }
}

// Second pass - look for theme (prioritize heatmap themes if in heatmap mode)
for (let part of parts) {
  if (part === "heatmap") continue;

  if (isHeatmap && heatmapThemes[part]) {
    themeParam = part;
    break;
  } else if (!isHeatmap && themePresets[part]) {
    themeParam = part;
    break;
  }
}

// Default theme if none specified
if (!themeParam) {
  themeParam = isHeatmap ? "auto" : "auto";
}

// If heatmap and no valid theme found, default to "auto"
// if (isHeatmap && !heatmapThemes.hasOwnProperty(themeParam)) {
//   themeParam = "auto";
// }
// // If not heatmap and no valid theme found, default to "auto"
// if (!isHeatmap && !themePresets.hasOwnProperty(themeParam)) {
//   themeParam = "auto";
// }

// const themeParam = parts.find(p => p in themePresets) || "auto";


const UI = {
  small: { font: 12, headfont: 24, lineSpacing: 4, logo: 26, pad: 10 },
  medium: { font: 13, headfont: 24, lineSpacing: 5, logo: 38, pad: 14 },
  large: { font: 14, headfont: 26, lineSpacing: 6, logo: 55, pad: 16 }
}[size];

const now = new Date();
const year = now.getFullYear();
const shortyearLabel = `${year.toString().slice(-2)}`;
const thisYearStart = new Date(year, 0, 1).toISOString();
const today = now.toISOString();


const selectedTheme = themePresets[themeParam];
// const selectedTheme =
//   isHeatmap
//     ? (themeParam in heatmapThemes ? heatmapThemes[themeParam] : heatmapThemes.auto)
//     : (themeParam in themePresets ? themePresets[themeParam] : themePresets.auto);

// const selectedTheme = themePresets[themeParam.toLowerCase()] || themePresets.auto;

function getHeatmapColor(count) {
  const boxes = heatmapThemes[themeParam].box;
  if (count === 0) return new Color(boxes[0]);
  if (count >= 20) return new Color(boxes[4]);
  if (count >= 10) return new Color(boxes[3]);
  if (count >= 5) return new Color(boxes[2]);
  if (count >= 1) return new Color(boxes[1]);
  return new Color(boxes[0]);
}

// function createGradientBackground() {
//   // const colors = heatmapThemes[themeParam]?.bg || heatmapThemes.dark.bg;
//   const theme = heatmapThemes[themeParam].bg;
//   const gradient = new LinearGradient();
//   // gradient.colors = colors.map(c => new Color(c));
//   // gradient.colors = heatmapThemes.themeParam.bg.map(c => new Color(c));
//   gradient.colors = theme.map(c => new Color(c));
//   // gradient.locations = [1.0, 0.5, 0.0];
//   gradient.locations = [0.0, 0.5, 1.0];
//   return gradient;
// }

function createGradientBackground() {
  const theme = heatmapThemes[themeParam];
  const gradient = new LinearGradient();
  gradient.colors = theme.bg.map(c => new Color(c));
  gradient.locations = [0.0, 0.5, 1.0];
  return gradient;
}



function makeGradient(theme) {
  const g = new LinearGradient();
  g.colors = theme.colors.map(c => new Color(c));
  g.locations = theme.locations;
  return g;
}


// Dates for yearly contributions
// const now = new Date();
// const year = new Date().getFullYear();
// const shortyearLabel = `${year.toString().slice(-2)}`; // e.g., "25'"

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
        stargazerCount
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
  const online = await isOnline();
  
  // If offline, use cache immediately
  if (!online) {
    console.log("Offline mode - loading GraphQL stats from cache");
    const cachedData = await cacheManager.loadCache();
    if (cachedData && cachedData.ghStats) {
      console.log("✅ Using cached GraphQL stats (offline)");
      return cachedData.ghStats;
    }
    throw new Error("No internet connection and no valid cache available");
  }
  
  // If online, try to fetch fresh data
  try {
    console.log("🌐 Online mode - fetching fresh GraphQL stats");
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
    const totalStars = user.repositories.nodes.reduce((sum, repo) =>
      sum + (repo.stargazerCount || 0), 0);

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

    const result = {
      commits2025,
      totalCommits,
      totalContributions,
      totalPRs,
      totalIssues,
      currentStreak,
      longestStreak,
      totalStars
    };

    console.log("✅ Fresh GraphQL stats fetched successfully");
    return result;
  } catch (error) {
    console.error("❌ Failed to fetch GraphQL stats:", error);
    // Try cache as fallback
    const cachedData = await cacheManager.loadCache();
    if (cachedData && cachedData.ghStats) {
      console.log("✅ Using cached GraphQL stats as fallback");
      return cachedData.ghStats;
    }
    throw error;
  }
}

async function fetchUserInfo() {
  const online = await isOnline();
  
  // If offline, use cache immediately
  if (!online) {
    console.log("Offline mode - loading user info from cache");
    const cachedData = await cacheManager.loadCache();
    if (cachedData && cachedData.userInfo) {
      console.log("✅ Using cached user info (offline)");
      return cachedData.userInfo;
    }
    throw new Error("No internet connection and no valid cache available");
  }
  
  // If online, try to fetch fresh data
  try {
    console.log("🌐 Online mode - fetching fresh user info");
    const req = new Request(`https://api.github.com/users/${username}`);
    req.headers = { Authorization: `Bearer ${token}` };
    const result = await req.loadJSON();
    console.log("✅ Fresh user info fetched successfully");
    return result;
  } catch (error) {
    console.error("❌ Failed to fetch user info:", error);
    const cachedData = await cacheManager.loadCache();
    if (cachedData && cachedData.userInfo) {
      console.log("✅ Using cached user info as fallback");
      return cachedData.userInfo;
    }
    throw error;
  }
}

// async function fetchTopLanguage() {
//   const req = new Request(`https://api.github.com/users/${username}/repos?per_page=100`);
//   req.headers = { Authorization: `Bearer ${token}` };
//   const data = await req.loadJSON();
//   const langCount = {};
//   for (let repo of data) {
//     const lang = repo.language;
//     if (lang) langCount[lang] = (langCount[lang] || 0) + 1;
//   }
//   return Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
// }

// fetchTopLanguagesShortform
// async function fetchTopLanguage(limit = 8) {
//   const req = new Request(`https://api.github.com/users/${username}/repos?per_page=100`);
//   req.headers = { Authorization: `Bearer ${token}` };
//   const data = await req.loadJSON();

//   const langCount = {};
//   let total = 0;

//   for (let repo of data) {
//     const lang = repo.language;
//     if (lang) {
//       langCount[lang] = (langCount[lang] || 0) + 1;
//       total++;
//     }
//   }

//   // Sort and keep top N
//   const topLangs = Object.entries(langCount)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, limit);

//   // Shortform map
//   const shortMap = {
//     JavaScript: "JS",
//     TypeScript: "TS",
//     Python: "PY",
//     Java: "JAVA",
//     C: "C",
//     "C++": "CPP",
//     "C#": "CS",
//     HTML: "HTML",
//     CSS: "CSS",
//     PHP: "PHP",
//     Ruby: "RB",
//     Shell: "SH",
//     Go: "GO",
//     Kotlin: "KT",
//     Swift: "SW",
//     Rust: "RS",
//   };

//   // Format
//   return topLangs.map(([lang, count]) => {
//     const short = shortMap[lang] || lang.slice(0, 3).toUpperCase();
//     const percent = ((count / total) * 100).toFixed(0);
//     return `${short} ${percent}%`;
//   }).join(" | ");
// }

async function fetchTopLanguage(limit = 12) {
  const online = await isOnline();
  
  // If offline, use cache immediately
  if (!online) {
    console.log("Offline mode - loading top languages from cache");
    const cachedData = await cacheManager.loadCache();
    if (cachedData && cachedData.topLanguages) {
      console.log("✅ Using cached top languages (offline)");
      return cachedData.topLanguages;
    }
    throw new Error("No internet connection and no valid cache available");
  }
  
  // If online, try to fetch fresh data
  try {
    console.log("🌐 Online mode - fetching fresh top languages");
    let allRepos = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      const req = new Request(`https://api.github.com/user/repos?type=all&per_page=100&page=${page}`);
      req.headers = { Authorization: `Bearer ${token}` };
      const data = await req.loadJSON();
      
      if (data.length === 0) {
        hasMore = false;
      } else {
        allRepos = allRepos.concat(data);
        page++;
        if (page > 10) hasMore = false;
      }
    }

    const langCount = {};
    let total = 0;

    for (let repo of allRepos) {
      const lang = repo.language;
      if (lang) {
        langCount[lang] = (langCount[lang] || 0) + 1;
        total++;
      }
    }

    const shortMap = {
      JavaScript: "JS", TypeScript: "TS", Python: "PY", Java: "JAVA",
      C: "C", "C++": "CPP", "C#": "CS", HTML: "HTML", CSS: "CSS",
      PHP: "PHP", Ruby: "RB", Shell: "SH", Go: "GO", Kotlin: "KT",
      Swift: "SW", Rust: "RS", Dart: "DART"
    };

    const result = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([lang, count]) => {
        const short = shortMap[lang] || lang.slice(0, 3).toUpperCase();
        const percent = ((count / total) * 100).toFixed(2) + "%";
        return [short, percent, lang]; // ← return full info
      });

    console.log("✅ Fresh top languages fetched successfully");
    return result;
  } catch (error) {
    console.error("❌ Failed to fetch top languages:", error);
    const cachedData = await cacheManager.loadCache();
    if (cachedData && cachedData.topLanguages) {
      console.log("✅ Using cached top languages as fallback");
      return cachedData.topLanguages;
    }
    throw error;
  }
}


// async function fetchRepoStat(repoPath, statType) {

//   const baseUrl = `https://api.github.com/repos/${repoPath}`;
//   const headers = { Authorization: `Bearer ${token}` };

//   const req = new Request(baseUrl);
//   req.headers = headers;
//   const json = await req.loadJSON();
//   const ghStats = await fetchGraphQLStats();
//   const userInfo = await fetchUserInfo();


//   let statValue = 0;
//   let type = "";
//   if (statType === "stars") {
//     statValue = json.stargazers_count;
//     type = stars;
//   } else if (statType === "commits") {
//     // const commitsReq = new Request(`${baseUrl}/commits?per_page=1`);
//     // commitsReq.headers = headers;
//     // const commits = await commitsReq.loadJSON();
//     // const link = commitsReq.response.headers["link"];
//     // const lastPage = link?.match(/&page=(\d+)>; rel="last"/)?.[1];
//     // statValue = lastPage ? parseInt(lastPage) : commits.length;

//     statValue = ghStats.commits2025;
//     type = `${year} commits`;
//   } else if (statType === "views") {
//     const viewsReq = new Request(`${baseUrl}/traffic/views`);
//     viewsReq.headers = headers;
//     const views = await viewsReq.loadJSON();
//     statValue = views.count || 0;
//     type = "views";
//   } else if (statType === "currstreak") {
//     statValue = ghStats.currentStreak;
//     type = "current streak";
//   } else if (statType === "contributions") {
//     statValue = ghStats.totalContributions;
//     type = "contributions";
//   } else if (statType === "allcommits") {
//     statValue = ghStats.totalCommits;
//     type = "total commits";
//   } else if (statType === "repos") {
//     statValue = userInfo.public_repos;
//     type = "repos";
//   } else if (statType === "longstreak") {
//     statValue = ghStats.longestStreak;
//     type = "longest streak";
//   } else if (statType === "followers") {
//     statValue = userInfo.followers;
//     type = "Followers";
//   } else if (statType === "following") {
//     statValue = userInfo.following;
//     type = "Following";
//   } else if (statType === "prs") {
//     statValue = ghStats.totalPRs;
//     type = "PRs";
//   } else if (statType === "issues") {
//     statValue = ghStats.totalIssues;
//     type = "Total Issues";
//   }

//   return {
//     name: json.name,
//     statValue,
//     url: json.html_url,
//     type
//   };
// }

async function fetchRepoStat(repoPath, statType) {
  let json = {};
  let repoName = "";
  let repoUrl = "";

  if (repoPath) {
    const req = new Request(`https://api.github.com/repos/${repoPath}`);
    req.headers = { Authorization: `Bearer ${token}` };
    json = await req.loadJSON();
    repoName = json?.name || repoPath.split("/")[1];
    repoUrl = json?.html_url || `https://github.com/${repoPath}`;
  }

  const ghStats = await fetchGraphQLStats();
  // console.log(ghStats);
  // console.log("currentStreak:", ghStats?.currentStreak);

  const userInfo = await fetchUserInfo();

  // fallback display name
  const title = repoPath ? repoName : username;
  const link = repoPath ? repoUrl : `https://github.com/${username}`;

  // let value = 0;
  // let label = "";


  let statValue = 0;
  let type = "";
  if (statType === "stars") {
    statValue = json.stargazers_count;
    type = "stars";
  } else if (statType === "commits") {
    // const commitsReq = new Request(`${repoUrl}/commits?per_page=1`);
    // commitsReq.headers = headers;
    // const commits = await commitsReq.loadJSON();
    // const link = commitsReq.response.headers["link"];
    // const lastPage = link?.match(/&page=(\d+)>; rel="last"/)?.[1];
    // statValue = lastPage ? parseInt(lastPage) : commits.length;

    statValue = ghStats.commits2025;
    type = `${year} commits`;
  } else if (statType === "views") {
    // const viewsReq = new Request(`${repoUrl}/traffic/views`);
    // viewsReq.headers = headers;
    const viewsReq = new Request(`${baseUrl}/traffic/views`);
    viewsReq.headers = { Authorization: `Bearer ${token}` };

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

  // switch (statType) {
  //   case "views":
  //     value = json?.views?.count || 0;
  //     label = "Views";
  //     break;
  //   case "stars":
  //     value = json?.stargazers_count || 0;
  //     label = "Stars";
  //     break;
  //   case "commits":
  //     value = ghStats?.commits2025 || 0;
  //     label = "Commits";
  //     break;
  //   case "allcommits":
  //     value = ghStats?.totalCommits || 0;
  //     label = "Total Commits";
  //     break;
  //   case "currstreak":
  //     value = ghStats?.currentStreak || 0;
  //     label = "Current Streak";
  //     break;
  //   case "longstreak":
  //     value = ghStats?.longestStreak || 0;
  //     label = "Longest Streak";
  //     break;
  //   case "contributions":
  //     value = ghStats?.totalContributions || 0;
  //     label = "Contributions";
  //     break;
  //   case "repos":
  //     value = userInfo?.public_repos || 0;
  //     label = "Repositories";
  //     break;
  //   case "followers":
  //     value = userInfo?.followers || 0;
  //     label = "Followers";
  //     break;
  //   case "following":
  //     value = userInfo?.following || 0;
  //     label = "Following";
  //     break;
  //   case "issues":
  //     value = ghStats?.totalIssues || 0;
  //     label = "Issues";
  //     break;
  //   case "prs":
  //     value = ghStats?.totalPRs || 0;
  //     label = "Pull Requests";
  //     break;
  //   default:
  //     value = 0;
  //     label = "Unknown";
  // }

  // return { label, value, title, link };
  return {
    name: json.name,
    statValue,
    url: json.html_url,
    type
  };
}



// async function fetchHeatmapData() {
//   const now = new Date();
//   const fromDate = new Date(now);
//   fromDate.setDate(now.getDate() - 133);

//   const query = `{
//     user(login: "${username}") {
//       contributionsCollection(from: "${fromDate.toISOString()}", to: "${now.toISOString()}") {
//         totalCommitContributions
//         contributionCalendar {
//           totalContributions
//           weeks {
//             contributionDays {
//               contributionCount
//               date
//             }
//           }
//         }
//       }
//     }
//   }`;

//   const req = new Request("https://api.github.com/graphql");
//   req.method = "POST";
//   req.headers = {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json"
//   };
//   req.body = JSON.stringify({ query });

//   const json = await req.loadJSON();
//   return json.data.user.contributionsCollection;
// }

async function fetchHeatmapData() {
  const online = await isOnline();
  
  // If offline, use cache immediately
  if (!online) {
    console.log("Offline mode - loading heatmap data from cache");
    const cachedData = await cacheManager.loadCache();
    if (cachedData && cachedData.heatmapData) {
      console.log("✅ Using cached heatmap data (offline)");
      return cachedData.heatmapData;
    }
    throw new Error("No internet connection and no valid cache available");
  }
  
  // If online, try to fetch fresh data
  try {
    console.log("🌐 Online mode - fetching fresh heatmap data");
    const now = new Date();
    const fromDate = new Date(now);
    fromDate.setDate(now.getDate() - 133); // ~19 weeks

    const query = `{
      user(login: "${username}") {
        contributionsCollection(from: "${fromDate.toISOString()}", to: "${now.toISOString()}") {
          totalCommitContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }`;

    const req = new Request("https://api.github.com/graphql");
    req.method = "POST";
    req.headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };
    req.body = JSON.stringify({ query });

    const json = await req.loadJSON();
    const contribData = json.data.user.contributionsCollection;

    // calculate streak
    const allDays = contribData.contributionCalendar.weeks.flatMap(w => w.contributionDays);
    const todayStr = new Date().toISOString().split("T")[0];
    let currentStreak = 0;
    for (let i = allDays.length - 1; i >= 0; i--) {
      const d = allDays[i];
      if (d.date === todayStr) continue;
      if (d.contributionCount > 0) currentStreak++;
      else break;
    }

    const result = {
      ...contribData,
      currentStreak
    };

    console.log("✅ Fresh heatmap data fetched successfully");
    return result;
  } catch (error) {
    console.error("❌ Failed to fetch heatmap data:", error);
    const cachedData = await cacheManager.loadCache();
    if (cachedData && cachedData.heatmapData) {
      console.log("✅ Using cached heatmap data as fallback");
      return cachedData.heatmapData;
    }
    throw error;
  }
}

function calculateCurrentStreak(weeks) {
  const allDays = weeks.flatMap(w => w.contributionDays);
  const todayStr = new Date().toISOString().split("T")[0];

  let currentStreak = 0;
  for (let i = allDays.length - 1; i >= 0; i--) {
    const d = allDays[i];
    if (d.date === todayStr) continue;
    if (d.contributionCount > 0) currentStreak++;
    else break;
  }

  return currentStreak;
}

// Add error widget function
function createErrorWidget(message) {
  const widget = new ListWidget();
  widget.backgroundGradient = makeGradient(selectedTheme);
  
  const errorText = widget.addText(message);
  errorText.font = Font.systemFont(14);
  errorText.textColor = Color.red();
  errorText.centerAlignText();
  
  return widget;
}


async function createHeatmapWidget() {
  try {
    const online = await isOnline();
    let data;

    if (online) {
      // When online, fetch fresh data
      try {
        console.log("Fetching fresh heatmap data...");
        data = await fetchHeatmapData();
        
        // Save to cache
        console.log("Saving heatmap data to cache...");
        const existingCache = await cacheManager.loadCache() || {};
        await cacheManager.saveCache({
          ...existingCache,
          heatmapData: data,
          timestamp: Date.now()
        });
        console.log("Heatmap data cached successfully");
      } catch (error) {
        console.error("Failed to fetch heatmap data:", error);
        const cachedData = await cacheManager.loadCache();
        if (cachedData && cachedData.heatmapData) {
          data = cachedData.heatmapData;
          console.log("Using cached heatmap data as fallback");
        } else {
          throw error;
        }
      }
    } else {
      // When offline, load from cache
      console.log("Offline mode - loading heatmap from cache...");
      const cachedData = await cacheManager.loadCache();
      if (cachedData && cachedData.heatmapData) {
        data = cachedData.heatmapData;
        console.log("Using cached heatmap data (offline)");
      } else {
        throw new Error("No internet connection and no heatmap cache available");
      }
    }

    const weeks = data.contributionCalendar.weeks;
    const total = data.contributionCalendar.totalContributions;
    const streak = data.currentStreak;

    const widget = new ListWidget();
    widget.backgroundGradient = createGradientBackground();
    widget.setPadding(11, 11, 11, 11);
    
    // Add offline indicator at top right if needed
    if (!online) {
      const topRow = widget.addStack();
      topRow.layoutHorizontally();
      topRow.addSpacer();
      const offlineIndicator = topRow.addText("Offline");
      offlineIndicator.font = Font.boldSystemFont(8);
      offlineIndicator.textColor = Color.orange();
      topRow.addSpacer(12);
      widget.addSpacer(2);
    }
    
    widget.addSpacer();

    const grid = widget.addStack();
    grid.layoutHorizontally();
    grid.centerAlignContent();

    const boxSize = 13;
    const boxSpacing = 3;
    const displayWeeks = weeks;

    grid.addSpacer();

    for (let w = 0; w < displayWeeks.length; w++) {
      const col = grid.addStack();
      col.layoutVertically();
      col.spacing = boxSpacing;

      for (let d = 0; d < 7; d++) {
        const day = displayWeeks[w].contributionDays[d];
        const cell = col.addStack();
        cell.size = new Size(boxSize, boxSize);
        cell.backgroundColor = getHeatmapColor(day?.contributionCount || 0);
        cell.cornerRadius = 2;
      }
      grid.addSpacer(boxSpacing);
    }

    grid.addSpacer();
    widget.addSpacer();

    const footer = widget.addStack();
    footer.layoutHorizontally();
    footer.centerAlignContent();

    footer.addSpacer(12);
    const totalText = footer.addText(`${streak} `);
    totalText.textColor = new Color(heatmapThemes[themeParam]?.accent || "#00ff4e");
    totalText.font = Font.heavySystemFont(12);
    const totalText2 = footer.addText(`day streak`);
    totalText2.textColor = new Color(heatmapThemes[themeParam]?.text || "#ffffff");
    totalText2.font = Font.mediumSystemFont(11);

    footer.addSpacer();

    const contribText = footer.addText(`+${total} `);
    contribText.textColor = new Color(heatmapThemes[themeParam]?.accent || "#00ff4e");
    contribText.font = Font.heavySystemFont(12);
    const contribText2 = footer.addText(`contributions`);
    contribText2.textColor = new Color(heatmapThemes[themeParam]?.text || "#ffffff");
    contribText2.font = Font.mediumSystemFont(11);

    footer.addSpacer(12);
    widget.addSpacer();

    return widget;
  } catch (error) {
    console.error("Failed to create heatmap widget:", error);
    return createErrorWidget("Failed to load heatmap data\nCheck internet connection");
  }
}

async function createHeatmapSmallWidget() {
  try {
    const online = await isOnline();
    let data;

    if (online) {
      // When online, fetch fresh data
      try {
        console.log("Fetching fresh heatmap data for small widget...");
        data = await fetchHeatmapData();
        
        // Save to cache
        console.log("Saving heatmap data to cache...");
        const existingCache = await cacheManager.loadCache() || {};
        await cacheManager.saveCache({
          ...existingCache,
          heatmapData: data,
          timestamp: Date.now()
        });
        console.log("Heatmap data cached successfully");
      } catch (error) {
        console.error("Failed to fetch heatmap data:", error);
        const cachedData = await cacheManager.loadCache();
        if (cachedData && cachedData.heatmapData) {
          data = cachedData.heatmapData;
          console.log("Using cached heatmap data as fallback");
        } else {
          throw error;
        }
      }
    } else {
      // When offline, load from cache
      console.log("Offline mode - loading heatmap from cache...");
      const cachedData = await cacheManager.loadCache();
      if (cachedData && cachedData.heatmapData) {
        data = cachedData.heatmapData;
        console.log("Using cached heatmap data (offline)");
      } else {
        throw new Error("No internet connection and no heatmap cache available");
      }
    }

    const weeks = data.contributionCalendar.weeks.slice(-7); // last 7 weeks
    const widget = new ListWidget();
    widget.backgroundGradient = createGradientBackground();
    widget.useDefaultPadding();

    // Add offline indicator at top right if needed
    if (!online) {
      const topRow = widget.addStack();
      topRow.layoutHorizontally();
      topRow.addSpacer();
      const offlineIndicator = topRow.addText("📶 Offline");
      offlineIndicator.font = Font.systemFont(8);
      offlineIndicator.textColor = Color.orange();
    } else {
      widget.addSpacer();
    }

    // === Header: Month + GitHub logo ===
    const header = widget.addStack();
    header.layoutHorizontally();
    header.centerAlignContent();

    const monthName = new Date().toLocaleDateString("en-US", { month: "long" });
    const monthText = header.addText(monthName);
    monthText.font = Font.semiboldSystemFont(UI.headfont - 6);
    monthText.textColor = new Color(heatmapThemes[themeParam]?.text || "#ffffff");

    header.addSpacer();

    const logoImg = await new Request("https://i.imgur.com/MJzROGa.png").loadImage();
    const logo = header.addImage(logoImg);
    logo.imageSize = new Size(UI.logo - 2, UI.logo - 2);
    logo.tintColor = new Color(heatmapThemes[themeParam].text);

    widget.addSpacer(5);

    // === Grid (7x5) ===
    const grid = widget.addStack();
    grid.layoutHorizontally();
    grid.centerAlignContent();

    const boxSize = 18;
    const boxSpacing = 2;
    const days = ["S", "M", "T", "W", "T", "F", "S"];

    for (let w = 0; w < weeks.length; w++) {
      const col = grid.addStack();
      col.layoutVertically();
      col.spacing = boxSpacing;

      const labelWrap = col.addStack();
      labelWrap.layoutHorizontally();
      labelWrap.size = new Size(boxSize, boxSize);
      labelWrap.centerAlignContent();

      const label = labelWrap.addText(days[w]);
      label.font = Font.systemFont(UI.font);
      label.textColor = new Color(heatmapThemes[themeParam].accent);
      label.centerAlignText();
      label.lineLimit = 1;

      for (let d = 0; d < 5; d++) {
        const day = weeks[w].contributionDays[d];
        const cell = col.addStack();
        cell.size = new Size(boxSize, boxSize);
        cell.backgroundColor = getHeatmapColor(day?.contributionCount || 0);
        cell.cornerRadius = 2;
      }

      grid.addSpacer(2);
    }

    widget.addSpacer();

    return widget;
  } catch (error) {
    console.error("Failed to create heatmap small widget:", error);
    return createErrorWidget("Failed to load heatmap data\nCheck internet connection");
  }
}

// async function createHeatmapSmallWidget() {
//   const data = await fetchHeatmapData();
//   const weeks = data.contributionCalendar.weeks.slice(-7); // last 5 weeks
//   // const weeks = data.contributionCalendar.weeks.slice(-7).reverse();
//   const widget = new ListWidget();
//   widget.backgroundGradient = createGradientBackground();
//   widget.useDefaultPadding();
//   widget.addSpacer();

//   // === Header: Month + GitHub logo ===
//   const header = widget.addStack();
//   header.layoutHorizontally();
//   header.centerAlignContent();

//   const monthText = header.addText(`September`);
//   monthText.font = Font.semiboldSystemFont(UI.headfont - 6);
//   monthText.textColor = new Color(heatmapThemes[themeParam]?.text || "#ffffff");

//   header.addSpacer();

//   const logoImg = await new Request("https://i.imgur.com/MJzROGa.png").loadImage();
//   const logo = header.addImage(logoImg);
//   logo.imageSize = new Size(UI.logo - 1, UI.logo - 1);
//   logo.tintColor = new Color(heatmapThemes[themeParam].text);

//   widget.addSpacer(5);


//   // === Grid (7 columns for days, 5 rows for weeks) ===
// const days = ["S", "M", "T", "W", "T", "F", "S"];
// const displayWeeks = weeks;

// const grid = widget.addStack();
// grid.layoutHorizontally();
// grid.centerAlignContent();

// const boxSize = 18;
// const boxSpacing = 2;

// for (let d = 0; d < 7; d++) {
//   const col = grid.addStack();
//   col.layoutVertically();
//   col.spacing = boxSpacing;

//   // Add weekday initial at top of each column
//   const label = col.addText(days[d]);
//   label.font = Font.systemFont(UI.font - 2);
//   label.textColor = new Color(heatmapThemes[themeParam].accent);
//   label.centerAlignText();
//   // label.minimumScaleFactor = 0.7;

//   col.addSpacer(2);

//   // 5 weeks vertically
//   for (let w = 0; w < displayWeeks.length; w++) {
//     const day = displayWeeks[w]?.contributionDays[d];
//     const cell = col.addStack();
//     cell.size = new Size(boxSize, boxSize);
//     cell.backgroundColor = getHeatmapColor(day?.contributionCount || 0);
//     cell.cornerRadius = 2;
//   }

//   if (d < 6) grid.addSpacer(boxSpacing);
// }

//   widget.addSpacer();

//   return widget;
// }


function formatNumber(value) {
  value = parseInt(value);
  if (!value) return "0";
  if (value < 1000) return value.toString();
  const units = ["k", "m", "b", "t"];
  const order = Math.floor(Math.log10(value) / 3);
  const num = (value / Math.pow(1000, order)).toFixed(1).replace(/\.0$/, "");
  return num + units[order - 1];
}



async function createWidget() {
  // try {
    const online = await isOnline();
    let allData = {};

    if (online) {
      // When online, always try to fetch fresh data
      try {
        console.log("Fetching fresh data...");
        const userInfo = await fetchUserInfo();
        const language = await fetchTopLanguage();
        const ghStats = await fetchGraphQLStats();

        allData = { userInfo, language, ghStats };

        // Always save fresh data to cache when online
        console.log("Saving fresh data to cache...");
        console.log(`Data to cache - userInfo keys: ${Object.keys(userInfo).join(', ')}`);
        console.log(`Data to cache - language length: ${language.length}`);
        console.log(`Data to cache - ghStats keys: ${Object.keys(ghStats).join(', ')}`);
        
        await cacheManager.saveCache({
          userInfo,
          topLanguages: language,
          ghStats,
          timestamp: Date.now()
        });
        
        console.log("Fresh data cached successfully");
      } catch (error) {
        console.error("Failed to fetch fresh data:", error);
        // Try to load from cache as fallback
        const cachedData = await cacheManager.loadCache();
        if (cachedData) {
          allData = {
            userInfo: cachedData.userInfo,
            language: cachedData.topLanguages,
            ghStats: cachedData.ghStats
          };
          console.log("Using cached data as fallback");
        } else {
          throw error;
        }
      }
    } else {
      // When offline, try to load from cache
      console.log("Offline mode - loading from cache...");
      const cachedData = await cacheManager.loadCache();
      if (cachedData) {
        allData = {
          userInfo: cachedData.userInfo,
          language: cachedData.topLanguages,
          ghStats: cachedData.ghStats
        };
        console.log("Using cached data (offline)");
      } else {
        throw new Error("No internet connection and no cache available");
      }
    }

    const { userInfo, language, ghStats } = allData;

    // Skip repo stats in offline mode - only fetch when online and explicitly requested
    const showRepoStats = online && [
      "stars", "commits", "views", "currstreak", "contributions", 
      "allcommits", "repos", "longstreak", "followers", "following",
      "issues", "prs"
    ].includes(statType);

    const repoStats = showRepoStats ? await fetchRepoStat(repoPath, statType) : null;
    
    // Load logo from local .source folder (available offline)
    let logoImg = null;
    try {
      const fm = FileManager.iCloud();
      const logoPath = fm.joinPath(fm.joinPath(fm.documentsDirectory(), ".source"), "github_icon.png");
      
      // Try to download from iCloud first if it exists
      if (fm.fileExists(logoPath)) {
        await fm.downloadFileFromiCloud(logoPath);
        logoImg = fm.readImage(logoPath);
        console.log("✅ Loaded GitHub logo from local .source folder");
      } else {
        console.log("⚠️ GitHub logo not found in .source folder");
        logoImg = null;
      }
    } catch (error) {
      console.log("❌ Failed to load local logo:", error.message);
      logoImg = null;
    }

    const w = new ListWidget();
    w.backgroundGradient = makeGradient(selectedTheme);

    const headClr = new Color(selectedTheme.head);
    const textClr = new Color(selectedTheme.text);
    const accClr = new Color(selectedTheme.acc);

    const data = { userInfo, language, ghStats, repoStats, logoImg, headClr, textClr, accClr };

    switch (size) {
      case "small": renderSmallLayout(w, data, online); break;
      case "medium": renderMediumLayout(w, data); break;
      case "large": renderLargeLayout(w, data); break;
    }

    w.url = `https://github.com/${username}`;

    // Add offline indicator at bottom center if using cached data
    if (!online) {
      // w.addSpacer();
      const offlineIndicator = w.addText("Offline Mode");
      offlineIndicator.font = Font.systemFont(8);
      offlineIndicator.textColor = Color.orange();
      offlineIndicator.centerAlignText();
      // w.addSpacer(3);
    }

    return w;
  // } catch (error) {
  //   console.error("Failed to create widget:", error);
  //   return createErrorWidget("Failed to load data\nCheck internet connection");
  // }
}


function renderSmallLayout(w, { userInfo, language, ghStats, repoStats, logoImg, headClr, textClr, accClr }, online) {

  // w.useDefaultPadding();


  const f = (UI.font) - 1;
  const addLine = (label, value, icon = "") => {
    const isZero = !value || value === 0;
    const line = w.addText(`${icon} ${label}: ${isZero ? "" : formatNumber(value)}`);
    line.font = Font.mediumSystemFont(f);
    line.textColor = isZero ? Color.gray() : textClr;
    line.lineLimit = 1;
    line.opacity = isZero ? 0.5 : 1;
    w.addSpacer(UI.lineSpacing);
  };


  if (repoStats) {
    const row = w.addStack();
    row.layoutHorizontally();
    row.centerAlignContent();

    const head = row.addText(username);
    head.font = Font.mediumSystemFont(UI.headfont);
    head.textColor = headClr;
    // head.lineLimit = 2;
    head.minimumScaleFactor = 0.6;

    row.addSpacer();

    // Only show logo if available (when online)
    if (logoImg) {
      const offset = (UI.logo) + 5;
      const img = row.addImage(logoImg);
      img.imageSize = new Size(offset, offset);
      img.tintColor = headClr; // any accent color
    }

    w.addSpacer();
    const stat = w.addText(formatNumber(repoStats.statValue));
    stat.font = Font.mediumSystemFont(UI.headfont + 12); // 36 = 24 + 12
    stat.textColor = accClr;

    // const statTitle = w.addText(`${repoStats.name} (${repoStats.type})`);
    // statTitle.font = Font.systemFont(UI.font);
    // statTitle.textColor = textClr;
    if (repoPath) {
      const statTitle = w.addText(`${repoStats.name} (${repoStats.type})`);
      statTitle.font = Font.systemFont(UI.font);
      statTitle.textColor = textClr;
    } else {
      const statTitle = w.addText(`${repoStats.type}`);
      statTitle.font = Font.systemFont(UI.font);
      statTitle.textColor = textClr;
    }
  } else {
    w.addSpacer(0);

    const header = w.addStack();
    header.layoutHorizontally();
    header.centerAlignContent();

    const title = header.addText(`${username}'s GitHub Stats`);
    title.font = Font.boldSystemFont(UI.font);
    title.textColor = headClr;
    title.lineLimit = 2;
    header.addSpacer();
    
    // Only show logo if available (when online)
    if (logoImg) {
      const logo = header.addImage(logoImg);
      logo.imageSize = new Size(UI.logo, UI.logo);
      logo.tintColor = headClr;
    }

    // w.addSpacer(UI.lineSpacing);
    // w.addSpacer(6);
    w.addSpacer();

    // max 5
    addLine("Curr Streak", `${ghStats.currentStreak} d`, "🔥");
    addLine(`Commits ('${shortyearLabel})`, ghStats.commits2025, "🕒");
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
    if (!online) {
      w.addSpacer(4);
    } else {
      w.addSpacer();
    }

  }

}

function renderMediumLayout(w, { userInfo, language, ghStats, logoImg, headClr, textClr, accClr }) {
  w.setPadding(UI.pad, UI.pad, UI.pad, UI.pad);
  w.addSpacer();

  const header = w.addStack();
  header.layoutHorizontally();
  header.centerAlignContent(); // bottomAlignContent

  const title = header.addText(`${username}'s GitHub Stats`);
  title.font = Font.boldSystemFont(UI.headfont);
  title.textColor = headClr;
  title.minimumScaleFactor = 0.8;
  title.lineLimit = 2;

  header.addSpacer();

  // Only show logo if available (when online)
  if (logoImg) {
    const logo = header.addImage(logoImg);
    logo.imageSize = new Size(UI.logo, UI.logo);
    logo.tintColor = headClr;
  }

  w.addSpacer();


  const grid = w.addStack();
  grid.layoutHorizontally();
  // grid.centerAlignContent();


  const addTo = (stack, label, value, icon) => {
    if (!value || value === 0 || value === "0") return;
    const line = stack.addText(`${icon} ${label}: ${(value)}`);
    line.font = Font.mediumSystemFont(UI.font);
    line.textColor = textClr;
    line.opacity = 1;
    stack.addSpacer(UI.lineSpacing);
  };


  const col1 = grid.addStack();
  col1.layoutVertically();


  // addTo(col1, "Public Repos", userInfo.public_repos, "📦");
  // addTo(col1, "Followers", userInfo.followers, "👥");
  // // addTo(col1, "Commits (2025)", ghStats.commits2025, "🕒");
  // addTo(col1, `Commits('${shortyearLabel})`, ghStats.commits2025, "🕒");
  // addTo(col1, "Streak", `${ghStats.currentStreak}d`, "🔥"); 

  // addTo(col1, "Stars Earned", ghStats.totalStars, "⭐");
  // addTo(col1, `Commits ('${shortyearLabel})`, ghStats.commits2025, "🕒");
  // addTo(col1, "Total Commits", ghStats.totalCommits, "📜");
  // addTo(col1, "Issues", ghStats.totalIssues, "❗");
  // addTo(col1, "PRs", ghStats.totalPRs, "🔃");

  addTo(col1, "Stars Earned", formatNumber(ghStats.totalStars), "⭐");
  addTo(col1, `Commits ('${shortyearLabel})`, formatNumber(ghStats.commits2025), "🕒");
  addTo(col1, "Total Commits", formatNumber(ghStats.totalCommits), "📜");
  addTo(col1, "Issues", formatNumber(ghStats.totalIssues), "❗");
  addTo(col1, "PRs", formatNumber(ghStats.totalPRs), "🔃");


  // const col3 = grid.addStack();
  // col3.layoutVertically();

  grid.addSpacer(25);

  const col2 = grid.addStack();
  col2.layoutVertically();
  // col2.rightAlignText();

  // addTo(col2, "Issues", ghStats.totalIssues, "❗");
  addTo(col2, "Streak", `${ghStats.currentStreak}d`, "🔥");
  addTo(col2, "Longest", `${ghStats.longestStreak}d`, "🏆");
  addTo(col2, "Public Repos", userInfo.public_repos, "📦");
  addTo(col2, "Followers", userInfo.followers, "👥");
  // addTo(col2, "Top Language", language, "💻");


  // Only add row if value is not 0 or falsy
  // const addTo = (label, value, icon) => {
  //   if (!value || value === 0) return;
  //   const row = w.addStack();
  //   row.layoutHorizontally();
  //   const txt = row.addText(`${icon} ${label}: ${formatNumber(value)}`);
  //   txt.font = Font.mediumSystemFont(UI.font);
  //   txt.textColor = textClr;
  //   txt.opacity = 1;
  //   w.addSpacer(UI.lineSpacing);
  // };


  //   // if (language) addLine("Top Language", language, "💻");
  // // max 5
  // addLine("Current Streak", `${ghStats.currentStreak} days`, "🔥");
  // // addLine("Longest Streak", `${ghStats.longestStreak} days`, "🏆");
  // addLine(`Commits (${year})`, ghStats.commits2025, "🕒");
  // // addLine(`Commits ('${shortyearLabel})`, ghStats.commits2025, "🕒");
  // addLine("Total Commits (all-time)", ghStats.totalCommits, "📜");
  // addLine("Contributions", ghStats.totalContributions, "📅");
  // addLine("Public Repos", userInfo.public_repos, "📦");
  // // addLine("Total Issues", ghStats.totalIssues, "❗");
  // // addLine("PRs", ghStats.totalPRs, "🔃");
  // // if (language) addLine("Top Language", language, "💻");
  // // addLine("Followers", userInfo.followers, "👥");
  // // addLine("Following", userInfo.following, "🔄");


  w.addSpacer();
}

function renderLargeLayout(w, { userInfo, language, ghStats, logoImg, headClr, textClr, accClr }) {
  w.setPadding(UI.pad, UI.pad, UI.pad, UI.pad);
  w.addSpacer(0);

  const header = w.addStack();
  header.layoutHorizontally();
  header.centerAlignContent(); // bottomAlignContent

  const title = header.addText(`${username}'s GitHub Stats`);
  title.font = Font.boldSystemFont(UI.headfont);
  title.textColor = headClr;
  title.minimumScaleFactor = 0.8;
  title.lineLimit = 2;

  header.addSpacer();

  // Only show logo if available (when online)
  if (logoImg) {
    const logo = header.addImage(logoImg);
    logo.imageSize = new Size(UI.logo, UI.logo);
    logo.tintColor = headClr;
  }

  w.addSpacer();


  const grid = w.addStack();
  grid.layoutHorizontally();
  // grid.centerAlignContent();

  const addTo = (stack, label, value, icon) => {
    if (!value || value === 0 || value === "0") return;
    const line = stack.addText(`${icon} ${label}: ${value}`);
    line.font = Font.mediumSystemFont(UI.font);
    line.textColor = textClr; // textClr Color. lightGray or gray()
    line.opacity = 1;
    stack.addSpacer(UI.lineSpacing);
  };




  const col2 = grid.addStack();
  col2.layoutVertically();
  // col2.rightAlignText();

  // addTo(col2, "Issues", ghStats.totalIssues, "❗");
  addTo(col2, "Streak", `${ghStats.currentStreak}d`, "🔥");
  addTo(col2, "Longest", `${ghStats.longestStreak}d`, "🏆");
  addTo(col2, "Public Repos", `${userInfo.public_repos}`, "📦");
  addTo(col2, "Followers", userInfo.followers, "👥");


  grid.addSpacer(25);


  const col1 = grid.addStack();
  col1.layoutVertically();

  addTo(col1, "Stars Earned", formatNumber(ghStats.totalStars), "⭐");
  addTo(col1, `Commits ('${shortyearLabel})`, formatNumber(ghStats.commits2025), "🕒");
  addTo(col1, "Total Commits", formatNumber(ghStats.totalCommits), "📜");
  addTo(col1, "Issues", formatNumber(ghStats.totalIssues), "❗");
  addTo(col1, "PRs", formatNumber(ghStats.totalPRs), "🔃");



  w.addSpacer(7);

  const subtitle = w.addText("💻 Top Language:");;
  subtitle.font = Font.mediumSystemFont(UI.font + 1);
  subtitle.textColor = headClr; // new Color("#D4D4D4") accClr textClr Color.gray()

  w.addSpacer(5);

  // const topLangs = language;

  const langGrid = w.addStack();
  langGrid.layoutHorizontally();

  const langCol1 = langGrid.addStack();
  langCol1.layoutVertically();
  langCol1.spacing = UI.lineSpacing;

  langGrid.addSpacer(10)

  const langCol2 = langGrid.addStack();
  langCol2.layoutVertically();
  langCol2.spacing = UI.lineSpacing;

  for (let i = 0; i < language.length; i++) {
    const [short, percent, original] = language[i];
    const colorHex = langColors[original] || "#cccccc";
    const dot = "●";

    const lineStack = (i < Math.ceil(language.length / 2) ? langCol1 : langCol2).addStack();
    lineStack.layoutHorizontally();

    const dotText = lineStack.addText(dot);
    dotText.textColor = new Color(colorHex);
    dotText.font = Font.mediumSystemFont(UI.font + 1);
    lineStack.addSpacer(5);

    const labelText = lineStack.addText(`${short} ${percent}`);
    labelText.textColor = textClr;
    labelText.font = Font.mediumSystemFont(UI.font);
  }

  // addTo(col1, "Total Stars Earned", ghStats.totalStars, "⭐");
  // addTo(col1, "Public Repos", userInfo.public_repos, "📦");
  // addTo(col1, "Followers", userInfo.followers, "👥");
  // addTo(col1, `Commits ('${year})`, ghStats.commits2025, "🕒");
  // addTo(col1, "Total Commits", ghStats.totalCommits, "📜");
  // addTo(col1, "Issues", ghStats.totalIssues, "❗");
  // addTo(col1, "PRs", ghStats.totalPRs, "🔃");
  // addTo(col1, "Streak", `${ghStats.currentStreak}d`, "🔥");
  // addTo(col1, "Longest", `${ghStats.longestStreak}d`, "🏆");






  w.addSpacer();

}


// const widget = await createWidget();
// const widget = isHeatmap
//   ? await createHeatmapWidget()
//   : await createWidget();
// if (!config.runsInWidget) await widget.presentSmall();
// if (!config.runsInWidget) await widget.presentMedium();
// if (!config.runsInWidget) await widget.presentLarge();
// Script.setWidget(widget);
// Script.complete();
// Test cache function - uncomment to test cache system
async function testCache() {
  console.log("=== TESTING CACHE SYSTEM ===");
  const testCacheManager = new CacheManager();
  
  // Show exact file system paths
  console.log(`Documents directory: ${testCacheManager.fm.documentsDirectory()}`);
  console.log(`Cache directory: ${testCacheManager.cacheDir}`);
  console.log(`Cache file: ${testCacheManager.cacheFile}`);
  
  const testData = {
    userInfo: { login: "test", followers: 100 },
    topLanguages: [["JS", "50%", "JavaScript"]],
    ghStats: { commits2025: 42, currentStreak: 5 }
  };
  
  console.log("Testing cache save...");
  await testCacheManager.saveCache(testData);
  
  console.log("Testing cache load...");
  const loadedData = await testCacheManager.loadCache();
  console.log(`Loaded data: ${loadedData ? "SUCCESS" : "FAILED"}`);
  
  if (loadedData) {
    console.log("Cache test passed!");
    try {
      console.log(`Loaded timestamp: ${new Date(loadedData.timestamp).toISOString()}`);
    } catch (dateError) {
      console.log(`Loaded timestamp (raw): ${loadedData.timestamp}`);
    }
  } else {
    console.log("Cache test failed!");
  }
  
  // Try to read the file manually to see if it exists
  try {
    if (testCacheManager.fm.fileExists(testCacheManager.cacheFile)) {
      await testCacheManager.fm.downloadFileFromiCloud(testCacheManager.cacheFile);
      const fileContent = testCacheManager.fm.readString(testCacheManager.cacheFile);
      console.log(`File exists and contains ${fileContent.length} characters`);
    } else {
      console.log("File does not exist in expected location");
    }
  } catch (error) {
    console.log(`Error reading file: ${error.message}`);
  }
}

// Uncomment the line below to test cache system
// await testCache();

// ===================================
const widget = isHeatmap
  ? (size === "small" ? await createHeatmapSmallWidget() : await createHeatmapWidget())
  : await createWidget();

// if (!config.runsInWidget) await widget.presentSmall();
if (!config.runsInWidget && size === "small") await widget.presentSmall();
else if (!config.runsInWidget && size === "medium") await widget.presentMedium();
else if (!config.runsInWidget && size === "large") await widget.presentLarge();
Script.setWidget(widget);
Script.complete();

// // Update formatNumber if needed (already correct in your code)

// // Example for renderMediumLayout:
// function  renderMediumLayout(w, { userInfo, language, ghStats, logoImg, headClr, textClr, accClr }) {
//   w.setPadding(UI.pad, UI.pad, UI.pad, UI.pad);
//   w.addSpacer();



//   const header = w.addStack();
//   header.layoutHorizontally();
//   header.centerAlignContent();

//   const title = header.addText(`${username}'s GitHub Stats`);
//   title.font = Font.boldSystemFont(UI.headfont);
//   title.textColor = headClr;
//   title.minimumScaleFactor = 0.8;
//   title.lineLimit = 2;

//   header.addSpacer();

//   const logo = header.addImage(logoImg);
//   logo.imageSize = new Size(UI.logo, UI.logo);
//   logo.tintColor = headClr;

//   w.addSpacer();

//   // Only add row if value is not 0 or falsy
//   const addStatRow = (label, value, icon) => {
//     if (!value || value === 0) return;
//     const row = w.addStack();
//     row.layoutHorizontally();
//     // const iconImg = svgToImage(svgIcons[svgKey]);



//     const txt = row.addText(`${icon} ${label}: ${formatNumber(value)}`);
//     txt.font = Font.mediumSystemFont(UI.font);
//     txt.textColor = textClr;
//     txt.opacity = 1;
//     w.addSpacer(UI.lineSpacing);
//   };

//   addStatRow("Total Stars Earned", ghStats.totalStars, "⭐");
//   addStatRow(`Total Commits (${year})`, ghStats.commits2025, "🕒");
//   addStatRow("Total PRs", ghStats.totalPRs, "🔃");
//   addStatRow("Total Issues", ghStats.totalIssues, "❗");
//   addStatRow("Contributed to (last year)", ghStats.totalContributions, "📜");

//   //   addStatRow("Total Stars Earned", ghStats.totalStars, "⭐");
//   // addTo(col1, "Public Repos", userInfo.public_repos, "📦");
//   // addTo(col1, "Followers", userInfo.followers, "👥");
//   // addTo(col1, `Commits ('${year})`, ghStats.commits2025, "🕒");
//   // addTo(col1, "Total Commits", ghStats.totalCommits, "📜");
//   // addTo(col1, "Issues", ghStats.totalIssues, "❗");
//   // addTo(col1, "PRs", ghStats.totalPRs, "🔃");
//   // addTo(col1, "Streak", `${ghStats.currentStreak}d`, "🔥");
//   // addTo(col1, "Longest", `${ghStats.longestStreak}d`, "🏆");


//   w.addSpacer();
// }
