// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: #277DA1; icon-glyph: calendar-alt;

// === CONFIGURATION ===
const SHEET_URL = "YOUR_SHEET_URL";

// === GRADIENT THEMES ===
const gradientThemes = {
  "monday": ["#0f2027", "#203a43"],   // Deep Navy to Dark Teal
  "tuesday": ["#2c3e50", "#4ca1af"],  // Dark Blue to Light Steel Blue
  "wednesday": ["#283048", "#859398"], // Charcoal to Muted Gray-Blue
  "thursday": ["#485563", "#29323c"],  // Gunmetal to Graphite
  "friday": ["#232526", "#414345"],    // Blackish to Dark Gray
  "saturday": ["#1f1c2c", "#928dab"],  // Very Dark Purple to Faded Indigo
  "sunday": ["#0b486b", "#f56217"]     // Dark Teal to Bold Orange Accent
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

// === TIME PARSING ===
function parseTime24(str) {
  const [h, m] = str.split(":").map(Number);
  return new Date(0, 0, 0, h, m);
}

// function formatShortTimeRange(start, end) {
//   const startHour = start.getHours();
//   const endHour = end.getHours();
//   const startFormatted = `${(startHour % 12) || 12}`;
//   const endFormatted = `${(endHour % 12) || 12}`;
//   const ampm = endHour >= 12 ? "PM" : "AM";
//   return `${startFormatted}–${endFormatted} ${ampm}`;
// }

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
    const csv = await req.loadString();
    const rows = csv.trim().split("\n").map(row => row.split(","));
    const header = rows.shift();
    const dayNumberMap = { "0": "Sunday", "1": "Monday", "2": "Tuesday", "3": "Wednesday", "4": "Thursday", "5": "Friday", "6": "Saturday" };

    return rows.map(row => {
      const obj = {};
      for (let i = 0; i < header.length; i++) {
        obj[header[i].trim()] = row[i] ? row[i].trim() : "";
      }
      if (obj["Day"] && dayNumberMap.hasOwnProperty(obj["Day"])) {
        obj["Day"] = dayNumberMap[obj["Day"]];
      }
      return obj;
    }).filter(obj => obj.Start && obj.End && obj.Day);
  } catch (e) {
    console.error("Failed to fetch schedule:", e);
    return [];
  }
}

// === BUILD WIDGET ===
// async function buildWidget(schedule, size, fullView = false, customDayName = null) {
async function buildWidget(schedule, size, fullView = false, customDayName = null, customTitle = null) {
  const w = new ListWidget();
  const today = getNowTime();
  const dayName = customDayName || today.toLocaleString("en-US", { weekday: "long" });
  w.backgroundGradient = getGradient(dayName);
  w.setPadding(10, 12, 10, 12);

  if (fullView) {
    const row = w.addStack();
    row.layoutHorizontally();
    // row.centerAlignContent();

    const allOverFont = 16; // 14 10 8 9
    // 16-4 16-6 16-8

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
        const noClass = column.addText("✅ No classes");
        noClass.font = Font.systemFont(allOverFont - 4);
        noClass.textColor = Color.lightGray();
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

          const fontTitle = isNow ? Font.boldSystemFont(allOverFont - 4) : Font.systemFont(allOverFont - 4);
          const fontDetails = isNow ? Font.boldSystemFont(allOverFont - 6) : Font.systemFont(allOverFont - 6);
          const fontLocation = isNow ? Font.boldSystemFont(allOverFont - 6) : Font.systemFont(allOverFont - 6);

          const title = classStack.addText(`${c.Title} (${c.Type})`);
          title.font = fontTitle;
          title.textColor = Color.white();

          const timeRange = formatShortTimeRange(startDate, endDate);
          const details = classStack.addText(`Sec ${c.Section} · ${timeRange}`);
          details.font = fontDetails;
          details.textColor = Color.gray();

          const location = classStack.addText(`${c.Building} · ${c.Location}`);
          location.font = fontLocation;
          location.textColor = Color.lightGray();

          column.addSpacer(4); // Add some space between class blocks
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

    // const header = w.addText(`📚 ${todayDayName} Schedule`);
    const header = w.addText(customTitle || `📚${todayDayName}'s Schedule`);
    header.font = Font.boldSystemFont(16);
    header.textColor = Color.white();
    w.addSpacer(4);

    if (todayClasses.length === 0) {
      const msg = w.addText("✅ No classes today");
      msg.font = Font.systemFont(14);
      msg.textColor = Color.gray();
    } else {
      const now = getNowTime();
      const nowTime = new Date(0, 0, 0, now.getHours(), now.getMinutes());
      const currentClass = todayClasses.find(c => nowTime >= parseTime24(c.Start) && nowTime < parseTime24(c.End));
      const nextClass = todayClasses.find(c => nowTime < parseTime24(c.Start));

      let countdown = "";
      if (currentClass) {
        const minsLeft = minutesBetween(nowTime, parseTime24(currentClass.End));
        countdown = `⏳ Current class ends in ${minsLeft}`;
      } else if (nextClass) {
        const minsLeft = minutesBetween(nowTime, parseTime24(nextClass.Start));
        countdown = `⏳ Next class starts in ${minsLeft}`;
      }

      if (countdown) {
        const countdownText = w.addText(countdown);
        countdownText.font = Font.systemFont(11);
        countdownText.textColor = Color.lightGray();
        w.addSpacer(4);
      }

      const show = size === "small" ? 1 : size === "medium" ? 2 : todayClasses.length;

      if (size === "medium") {
        const row = w.addStack();
        row.layoutHorizontally();
        row.centerAlignContent();

        const classesToShow = todayClasses.slice(0, 2); // max 2 classes

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
          details.textColor = Color.gray();

          const location = col.addText(`${c.Building} · ${c.Location}`);
          location.font = fontLocation;
          location.textColor = Color.lightGray();


          row.addSpacer(15); // Space between columns
        }

      } else {
        for (const c of todayClasses.slice(0, show)) {
          const stack = w.addStack();
          stack.layoutVertically();

          // stack.addSpacer(5);

          const startDate = parseTime24(c.Start);
          const endDate = parseTime24(c.End);
          const isNow = nowTime >= startDate && nowTime < endDate;

          // const title = stack.addText(`${c.Title} (${c.Type})`);
          // title.font = (size !== "small" && isNow) ? Font.boldSystemFont(14) : Font.systemFont(14);
          // title.textColor = Color.white();

          // const timeRange = formatShortTimeRange(startDate, endDate);
          // const details = stack.addText(`Sec ${c.Section} · ${timeRange}`);
          // details.font = Font.systemFont(12);
          // details.textColor = Color.gray();

          // const location = stack.addText(`${c.Building} · ${c.Location}`);
          // location.font = Font.systemFont(12);
          // location.textColor = Color.lightGray();

          const fontTitle = (size !== "small" && isNow) ? Font.boldSystemFont(14) : Font.systemFont(14);
          const fontDetails = (size !== "small" && isNow) ? Font.boldSystemFont(12) : Font.systemFont(12);
          const fontLocation = (size !== "small" && isNow) ? Font.boldSystemFont(12) : Font.systemFont(12);

          const title = stack.addText(`${c.Title} (${c.Type})`);
          title.font = fontTitle;
          title.textColor = Color.white();

          const timeRange = formatShortTimeRange(startDate, endDate);
          const details = stack.addText(`Sec ${c.Section} · ${timeRange}`);
          details.font = fontDetails;
          details.textColor = Color.gray();

          const location = stack.addText(`${c.Building} · ${c.Location}`);
          location.font = fontLocation;
          location.textColor = Color.lightGray();

          stack.addSpacer(8);
        }
        // w.addSpacer(8);
      }
    }
  }

  w.url = "https://courses.torontomu.ca/d2l/home"; // change it with you own
  w.refreshAfterDate = new Date(Date.now() + 15 * 60 * 1000);
  return w;
}

// === ENTRY POINT ===
const schedule = await fetchScheduleFromSheet();
let widget;
const today = getNowTime();
let dayToUse = getNowDay();
let selectedDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayToUse];
let customTitle = null;

if (param.startsWith("full view")) {
  widget = await buildWidget(schedule, config.widgetFamily, true, null);
} else if (param.startsWith("get ")) {
  const dayMap = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
  const shortDay = param.split(" ")[1]?.substring(0, 3);
  if (dayMap.hasOwnProperty(shortDay)) {
    dayToUse = dayMap[shortDay];
    selectedDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayToUse];
    customTitle = `📚Showing Schedule for ${selectedDayName}`; // ✅ <-- ADD THIS
  }
  widget = await buildWidget(schedule, config.widgetFamily, false, selectedDayName, customTitle); // ✅ <-- Pass customTitle
} else {
  widget = await buildWidget(schedule, config.widgetFamily, false, selectedDayName, customTitle);
}

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentLarge();
}
Script.complete();
