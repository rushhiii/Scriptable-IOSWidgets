// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: calendar-alt;

// === CONFIGURATION ===
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/......./pub?output=csv"; // YOUR_SHEET_URL

// === CACHE CONFIGURATION ===
const CACHE_FOLDER = ".cache";
const CACHE_FILE = "schedule_cache.json";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// === GRADIENT THEMES ===
// const gradientThemes = {
//   "monday": ["#000000", "#000076"],   // Deep Navy to Dark Teal
//   // "monday": ["#00006C", "#3535B7"],   // Deep Navy to Dark Teal
//   "tuesday": ["#2c3e50", "#4ca1af"],  // Dark Blue to Light Steel Blue
//   "wednesday": ["#283048", "#859398"], // Charcoal to Muted Gray-Blue
//   "thursday": ["#485563", "#29323c"],  // Gunmetal to Graphite
//   "friday": ["#232526", "#414345"],    // Blackish to Dark Gray
//   "saturday": ["#1f1c2c", "#928dab"],  // Very Dark Purple to Faded Indigo
//   "sunday": ["#0b486b", "#f56217"]     // Dark Teal to Bold Orange Accent
// };

const gradientThemes = {
  "monday": ["#2c3e50", "#3498db"],   // Dark Blue to Bright Blue
  "tuesday": ["#2c3e50", "#4ca1af"],  // Dark Blue to Light Steel Blue (your reference)
  "wednesday": ["#34495e", "#5dade2"], // Slate to Sky Blue
  "thursday": ["#2c3e50", "#27ae60"],  // Dark Blue to Emerald Green
  "friday": ["#2c3e50", "#e67e22"],    // Dark Blue to Orange
  "saturday": ["#e74c3c", "#f39c12"],  // Red to Orange
  "sunday": ["#d35400", "#f39c12"]     // Dark Orange to Light Orange
};

// === PARAMETER SETUP ===
const param = args.widgetParameter?.trim().toLowerCase() || "";
let simulatedTime = null;
let simulatedDay = null;

if (param.startsWith("test ")) {
  const parts = param.split(" ");
  if (parts.length >= 3) {
    const dayMap = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
    if (dayMap.hasOwnProperty(parts[1])) simulatedDay = dayMap[parts[1]];
    if (/^\d{1,2}:\d{2}$/.test(parts[2])) {
      const [h, m] = parts[2].split(":").map(Number);
      simulatedTime = new Date(0, 0, 0, h, m);
    }
  }
}

function getNowTime() { return simulatedTime || new Date(); }
function getNowDay() { return simulatedDay !== null ? simulatedDay : (new Date()).getDay(); }

// === CACHE FUNCTIONS ===
async function ensureCacheFolder() {
  const fm = FileManager.iCloud();
  const cacheDir = fm.joinPath(fm.documentsDirectory(), CACHE_FOLDER);
  if (!fm.fileExists(cacheDir)) {
    fm.createDirectory(cacheDir);
  }
  return cacheDir;
}

async function getCacheFilePath() {
  const cacheDir = await ensureCacheFolder();
  const fm = FileManager.iCloud();
  return fm.joinPath(cacheDir, CACHE_FILE);
}

async function saveToCache(data) {
  try {
    const fm = FileManager.iCloud();
    const cachePath = await getCacheFilePath();
    const cacheData = {
      data: data,
      timestamp: Date.now(),
      lastUpdated: new Date().toISOString()
    };
    fm.writeString(cachePath, JSON.stringify(cacheData));
    console.log("✅ Schedule cached successfully");
  } catch (error) {
    console.error("❌ Failed to save cache:", error);
  }
}

async function loadFromCache() {
  try {
    const fm = FileManager.iCloud();
    const cachePath = await getCacheFilePath();

    if (!fm.fileExists(cachePath)) {
      console.log("📝 No cache file found");
      return null;
    }

    const cacheContent = fm.readString(cachePath);
    const cacheData = JSON.parse(cacheContent);

    // Check if cache is still valid (within 24 hours)
    const now = Date.now();
    const cacheAge = now - cacheData.timestamp;

    if (cacheAge > CACHE_DURATION) {
      console.log("⏰ Cache expired, will try to fetch fresh data");
      return null;
    }

    console.log("✅ Loaded data from cache");
    return cacheData.data;
  } catch (error) {
    console.error("❌ Failed to load cache:", error);
    return null;
  }
}

async function isOnline() {
  try {
    const req = new Request("https://www.google.com");
    req.timeoutInterval = 5; // 5 second timeout
    await req.load();
    return true;
  } catch (error) {
    return false;
  }
}

// === TIME PARSING ===
function parseTime24(str) {
  const [h, m] = str.split(":").map(Number);
  return new Date(0, 0, 0, h, m);
}

function formatShortTimeRange(start, end) {
  function formatSingle(time) {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const hour12 = (hour % 12) || 12;
    const ampm = hour >= 12 ? "PM" : "AM";
    if (minute === 0) {
      return `${hour12} ${ampm}`;
    } else {
      return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
    }
  }

  return `${formatSingle(start)}–${formatSingle(end)}`;
}

function minutesBetween(date1, date2) {
  const totalMinutes = Math.round((date2 - date1) / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours} hr ${minutes} min`;
  } else if (hours > 0) {
    return `${hours} hr`;
  } else {
    return `${minutes} min`;
  }
}

function getGradient(dayName) {
  const grad = new LinearGradient();
  const colors = gradientThemes[dayName.toLowerCase()] || ["#232526", "#414345"];
  grad.colors = colors.map(c => new Color(c));
  grad.locations = [1, 0];
  return grad;
}

// === FETCH SCHEDULE ===
async function fetchScheduleFromSheet() {
  try {
    const req = new Request(SHEET_URL);
    req.timeoutInterval = 10; // 10 second timeout
    const csv = await req.loadString();
    const rows = csv.trim().split("\n").map(row => row.split(","));
    const header = rows.shift();
    const dayNumberMap = { "0": "Sunday", "1": "Monday", "2": "Tuesday", "3": "Wednesday", "4": "Thursday", "5": "Friday", "6": "Saturday" };

    const schedule = rows.map(row => {
      const obj = {};
      for (let i = 0; i < header.length; i++) {
        obj[header[i].trim()] = row[i] ? row[i].trim() : "";
      }
      if (obj["Day"] && dayNumberMap.hasOwnProperty(obj["Day"])) {
        obj["Day"] = dayNumberMap[obj["Day"]];
      }
      return obj;
    }).filter(obj => obj.Start && obj.End && obj.Day);

    // Save to cache
    await saveToCache(schedule);
    return schedule;
  } catch (e) {
    console.error("❌ Failed to fetch schedule from online source:", e);
    return null;
  }
}

async function getSchedule() {
  let schedule = null;
  const online = await isOnline();

  if (online) {
    console.log("Fetching Online data");
    schedule = await fetchScheduleFromSheet();
  }

  if (!schedule) {
    console.log("Falling to back-up data");
    schedule = await loadFromCache();
  }

  if (!schedule) {
    console.log("No data available");
    return [];
  }

  return schedule;
}

// === BUILD WIDGET ===
async function buildWidget(schedule, size, fullView = false, customDayName = null, customTitle = null, isOffline = false) {
  const w = new ListWidget();
  const today = getNowTime();
  const dayName = customDayName || today.toLocaleString("en-US", { weekday: "long" });
  w.backgroundGradient = getGradient(dayName);
  w.setPadding(10, 12, 10, 12);

  if (fullView) {
    const row = w.addStack();
    row.layoutHorizontally();

    const allOverFont = 16;

    for (let i = 1; i <= 5; i++) {
      const column = row.addStack();
      column.layoutVertically();
      column.setPadding(0, 4, 0, 4);
      column.spacing = 3;
      column.centerAlignContent();
      column.size = new Size(0, 0);

      const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i];
      const classes = schedule.filter(c => (c.Day || "").trim().toLowerCase() === dayName.toLowerCase());

      const dayTitle = column.addText(dayName);
      dayTitle.font = Font.boldSystemFont(allOverFont);
      dayTitle.textColor = Color.white();
      column.addSpacer(4);

      if (classes.length === 0) {
        // w.addSpacer()
        const noClass = column.addText("✅ No classes");
        noClass.font = Font.systemFont(allOverFont - 4);
        noClass.textColor = Color.lightGray();
        // w.addSpacer()
      } else {
        for (const c of classes) {
          const classStack = column.addStack();
          classStack.layoutVertically();
          classStack.topAlignContent();
          classStack.spacing = 2;

          const startDate = parseTime24(c.Start);
          const endDate = parseTime24(c.End);
          const now = getNowTime();
          const nowTime = new Date(0, 0, 0, now.getHours(), now.getMinutes());
          const isNow = nowTime >= startDate && nowTime < endDate;

          const fontTitle = isNow ? Font.boldSystemFont(allOverFont - 4) : Font.boldSystemFont(allOverFont - 4);
          const fontDetails = isNow ? Font.boldSystemFont(allOverFont - 6) : Font.systemFont(allOverFont - 6);
          const fontLocation = isNow ? Font.boldSystemFont(allOverFont - 6) : Font.systemFont(allOverFont - 6);

          const title = classStack.addText(`${c.Title} (${c.Type})`);
          title.font = fontTitle;
          title.textColor = Color.white();

          const timeRange = formatShortTimeRange(startDate, endDate);
          const details = classStack.addText(`Sec ${c.Section} · ${timeRange}`);
          details.font = fontDetails;
          details.textColor = new Color("#e8e8e8"); // Lighter gray for better visibility

          const location = classStack.addText(`${c.Building} · ${c.Location}`);
          location.font = fontLocation;
          location.textColor = new Color("#d0d0d0"); // Even lighter gray for location

          column.addSpacer(4);
        }
      }

      column.addSpacer(4);
      const summary = column.addText(`📚 ${classes.length} class${classes.length !== 1 ? "es" : ""}`);
      summary.font = Font.systemFont(allOverFont - 5);
      summary.textColor = Color.gray();

      row.addSpacer(8);
    }

  } else {
    const todayDayName = customDayName || ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][getNowDay()];
    const todayClasses = schedule.filter(c => (c.Day || "").trim().toLowerCase() === todayDayName.toLowerCase());

    const classes = schedule.filter(c => (c.Day || "").trim().toLowerCase() === dayName.toLowerCase());
    if (size != "large" && classes.length != 0) {
      w.addSpacer();
    } else {
      w.addSpacer(5);
    }

    let header;
    if (size === "small") {
      header = w.addText(customTitle || `📚${todayDayName.substring(0, 3)}'s Schedule`);
    } else {
      header = w.addText(customTitle || `📚${todayDayName}'s Schedule`);
    }

    if (size === "small") {
      header.font = Font.boldSystemFont(14);
    }
    if (size === "medium") {
      header.font = Font.boldSystemFont(16);
    }
    if (size === "large") {
      header.font = Font.boldSystemFont(23);
    }
    header.textColor = Color.white();
    // w.addSpacer();

    if (todayClasses.length === 0) {
      w.addSpacer();
      const msg = w.addText("✅ No classes today");
      msg.font = Font.systemFont(14);
      msg.textColor = new Color("#d0d0d0");
      w.addSpacer();
    } else {
      const now = getNowTime();
      const nowTime = new Date(0, 0, 0, now.getHours(), now.getMinutes());
      const currentClass = todayClasses.find(c => nowTime >= parseTime24(c.Start) && nowTime < parseTime24(c.End));
      const nextClass = todayClasses.find(c => nowTime < parseTime24(c.Start));

      let countdown = "";
      if (currentClass) {
        const minsLeft = minutesBetween(nowTime, parseTime24(currentClass.End));
        if (size === "small") {
          // countdown = `⏳Class ends in ${minsLeft}`;
          countdown = `Class ends in ${minsLeft}`;
        } else {
          // countdown = `⏳ Current class ends in ${minsLeft}`;
          countdown = `Current class ends in ${minsLeft}`;
        }
      } else if (nextClass) {
        const minsLeft = minutesBetween(nowTime, parseTime24(nextClass.Start));
        if (size === "small") {
          // countdown = `⏳Class starts in ${minsLeft}`;
          countdown = `Class starts in ${minsLeft}`;
        } else {
          // countdown = `⏳ Next class starts in ${minsLeft}`;
          countdown = `Next class starts in ${minsLeft}`;
        }
      }

      if (countdown) {
        w.addSpacer(2);
        const countdownWrap = w.addStack();
        countdownWrap.layoutHorizontally();
        countdownWrap.centerAlignContent();
        const countdownEmoji = countdownWrap.addText("⏳");
        countdownWrap.addSpacer(2)
        const countdownText = countdownWrap.addText(countdown);
        let countdownfs;
        if (size === "small") {
          countdownfs = 11;
        }
        if (size === "medium") {
          countdownfs = 11;
        }
        if (size === "large") {
          countdownfs = 13;
        }

        const emojifs = countdownfs+2;
        countdownEmoji.font = Font.systemFont(emojifs);
        countdownText.font = Font.systemFont(countdownfs);
        countdownText.textColor = Color.lightGray();
        // w.addSpacer(4);
      } else {
        w.addSpacer(2);
        const countdownWrap = w.addStack();
        countdownWrap.layoutHorizontally();
        countdownWrap.centerAlignContent();
        const countdownEmoji = countdownWrap.addText("✅");
        countdownWrap.addSpacer(2)
        const countdownText = countdownWrap.addText("Done for the day!");
        let countdownfs;
        if (size === "small") {
          countdownfs = 11;
        }
        if (size === "medium") {
          countdownfs = 12;
        }
        if (size === "large") {
          countdownfs = 13;
        }

        const emojifs = countdownfs+2;
        countdownEmoji.font = Font.systemFont(emojifs);
        countdownText.font = Font.systemFont(countdownfs);
        countdownText.textColor = Color.lightGray();
        // w.addSpacer(4);
      }

      w.addSpacer();

      // Smart class selection based on current time and widget size
      let classesToShow = [];

      if (size === "small") {
        // Small widget: Show current class, or next class, or previous class
        if (currentClass) {
          classesToShow = [currentClass];
        } else if (nextClass) {
          classesToShow = [nextClass];
        } else {
          // Show the last class of the day if no current/next class
          const pastClasses = todayClasses.filter(c => nowTime >= parseTime24(c.End));
          if (pastClasses.length > 0) {
            classesToShow = [pastClasses[pastClasses.length - 1]];
          } else {
            classesToShow = todayClasses.slice(0, 1);
          }
        }
      } else if (size === "medium") {
        // Medium widget: Show current + next, or previous + current, or just current
        if (currentClass && nextClass) {
          classesToShow = [currentClass, nextClass];
        } else if (currentClass && !nextClass) {
          // Current class exists but no next class - show previous + current
          const pastClasses = todayClasses.filter(c => nowTime >= parseTime24(c.End));
          if (pastClasses.length > 0) {
            classesToShow = [pastClasses[pastClasses.length - 1], currentClass];
          } else {
            classesToShow = [currentClass];
          }
        } else if (!currentClass && nextClass) {
          // No current class but next class exists - show previous + next
          const pastClasses = todayClasses.filter(c => nowTime >= parseTime24(c.End));
          if (pastClasses.length > 0) {
            classesToShow = [pastClasses[pastClasses.length - 1], nextClass];
          } else {
            classesToShow = [nextClass];
          }
        } else {
          // No current or next class - show the most recent past classes or first classes
          const pastClasses = todayClasses.filter(c => nowTime >= parseTime24(c.End));
          if (pastClasses.length >= 2) {
            classesToShow = pastClasses.slice(-2);
          } else if (pastClasses.length === 1) {
            classesToShow = [pastClasses[0]];
          } else {
            classesToShow = todayClasses.slice(0, 2);
          }
        }
      } else {
        // Large widget: Show all classes in chronological order (by time)
        classesToShow = todayClasses.sort((a, b) => {
          const timeA = parseTime24(a.Start);
          const timeB = parseTime24(b.Start);
          return timeA - timeB;
        });
      }

      if (size === "medium") {
        const row = w.addStack();
        row.layoutHorizontally();
        row.centerAlignContent();

        for (const c of classesToShow) {
          const col = row.addStack();
          col.layoutVertically();
          col.centerAlignContent();
          col.spacing = 2;

          const startDate = parseTime24(c.Start);
          const endDate = parseTime24(c.End);
          const isNow = nowTime >= startDate && nowTime < endDate;

          const fontTitle = isNow ? Font.boldSystemFont(14) : Font.systemFont(14);
          const fontDetails = isNow ? Font.boldSystemFont(12) : Font.systemFont(12);
          const fontLocation = isNow ? Font.boldSystemFont(12) : Font.systemFont(12);

          const title = col.addText(`${c.Title} (${c.Type})`);
          title.font = fontTitle;
          title.textColor = Color.white();

          const timeRange = formatShortTimeRange(startDate, endDate);
          const details = col.addText(`Sec ${c.Section} · ${timeRange}`);
          details.font = fontDetails;
          details.textColor = new Color("#e8e8e8");

          const location = col.addText(`${c.Building} · ${c.Location}`);
          location.font = fontLocation;
          location.textColor = new Color("#d0d0d0");

          row.addSpacer(15);
        }

      } else {
        for (const c of classesToShow) {
          const stack = w.addStack();
          stack.layoutVertically();

          const startDate = parseTime24(c.Start);
          const endDate = parseTime24(c.End);
          const isNow = nowTime >= startDate && nowTime < endDate;

          const fontTitle = (size !== "small" && isNow) ? Font.boldSystemFont(15) : Font.systemFont(14);
          const fontDetails = (size !== "small" && isNow) ? Font.boldSystemFont(13) : Font.systemFont(12);
          const fontLocation = (size !== "small" && isNow) ? Font.boldSystemFont(12) : Font.systemFont(11);

          const title = stack.addText(`${c.Title} (${c.Type})`);
          title.font = fontTitle;
          title.textColor = Color.white();

          const timeRange = formatShortTimeRange(startDate, endDate);
          const details = stack.addText(`Sec ${c.Section} · ${timeRange}`);
          details.font = fontDetails;
          details.textColor = new Color("#e8e8e8");

          const location = stack.addText(`${c.Building} · ${c.Location}`);
          location.font = fontLocation;
          location.textColor = new Color("#d0d0d0");
          if (size === "small") {
            location.lineLimit = 3;
          }

          stack.addSpacer(8);
        }
      }
      w.addSpacer();
    }
  }

  // Add offline indicator if using cached data
  if (isOffline) {
    // w.addSpacer(4);
    const offlineIndicator = w.addText(`~Offline Mode~`);
    offlineIndicator.font = Font.systemFont(10);
    offlineIndicator.textColor = Color.orange();
    offlineIndicator.rightAlignText();
    offlineIndicator.shadowColor = Color.black(); // Set the shadow color to black
    // offlineIndicator.shadowOffset = new Point(1, 1); // Offset the shadow by 1 point horizontally and 1 point vertically
    offlineIndicator.shadowRadius = 2; // Apply a blur radius of 2 points to the shadow
    // w.addSpacer(4);
  }

  w.url = "https://courses.torontomu.ca/d2l/home";
  w.refreshAfterDate = new Date(Date.now() + 15 * 60 * 1000);
  return w;
}

// === ENTRY POINT ===
const schedule = await getSchedule();
const isOfflineMode = !(await isOnline());

let widget;
const today = getNowTime();
let dayToUse = getNowDay();
let selectedDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayToUse];
let customTitle = null;

if (param.startsWith("full view")) {
  widget = await buildWidget(schedule, config.widgetFamily, true, null, null, isOfflineMode);
} else if (param.startsWith("get ")) {
  const dayMap = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
  const shortDay = param.split(" ")[1]?.substring(0, 3);
  if (dayMap.hasOwnProperty(shortDay)) {
    dayToUse = dayMap[shortDay];
    selectedDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayToUse];
    // Conditional title based on widget size
    if (config.widgetFamily === "small") {
      // selectedDayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayToUse];
      customTitle = `📚Schedule for ${selectedDayName.substring(0, 3)}`;
    } else {
      // customTitle = `📚Showing Schedule for ${selectedDayName}`;
      customTitle = `📚Showing ${selectedDayName}'s Schedule`;
    }
  }
  widget = await buildWidget(schedule, config.widgetFamily, false, selectedDayName, customTitle, isOfflineMode);
} else {
  widget = await buildWidget(schedule, config.widgetFamily, false, selectedDayName, customTitle, isOfflineMode);
}

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentLarge();
  // widget.presentSmall();
}
Script.complete();
