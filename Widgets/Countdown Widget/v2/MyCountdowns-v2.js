// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: clock;

// === CONFIG ===
const SHEET_API_URL = "YOU_SHEET_API_URL_HERE"; // looks like: https://script.google.com/macros/s/..../exe 
const colorPalette = ["#CB2443", "#8e44ad", "#2980b9", "#F79F39", "#CEA834", "#7b9a50"];

// HARD-CODED sheet settings: change these to lock the widget to a single tab
// Set HARDCODED_SHEET to the exact tab name (or numeric gid) you want always
// to fetch. If you don't want to override the spreadsheet id, leave the
// HARDCODED_SPREADSHEET_ID as null. This disables sheet selection via
// widget parameters so other widget features won't be affected.
const HARDCODED_SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // or a string like "1S..." to lock spreadsheet
const HARDCODED_SHEET = "YOUR_SHEET_ID_HERE"; // the sheet tab inside your SPREADSHEET  

// Set to true to force-delete the per-sheet cache on startup (useful for testing)
const HARDCODED_FORCE_REFRESH = true;
// Notification/testing settings
// Hour (0-23) to schedule real notifications (week/day before). Default 9 AM local.
const HARDCODED_NOTIFY_HOUR = 9;
// TEST mode: set to true only for manual testing. Keep false for normal operation.
const HARDCODED_TEST_MODE = false;
// Prefer pulling data from the Apps Script web app (matches the URL you verified).
const USE_APPS_SCRIPT_WEBAPP = true;
// Set false to ignore args.widgetParameter and always use the hard-coded sheet.
const ALLOW_WIDGET_PARAM_OVERRIDES = false;

// Notification templates. Use placeholders: {icon}, {name}, {date} (ISO), {formattedDate} (human), {suffix}
// Default phrasing: week = "1 wk until {name}{suffix}", day = "Tomorrow: {name}{suffix}"
const NOTIFY_TITLE_WEEK = "{name}{suffix}";
const NOTIFY_BODY_WEEK = "1 wk until {name}{suffix}";
const NOTIFY_TITLE_DAY = "{name}{suffix}";
const NOTIFY_BODY_DAY = "1 day until {name}{suffix}";

// const NOTIFY_TITLE_WEEK = "1 wk until {name}{suffix}";
// const NOTIFY_BODY_WEEK = "{icon} {name}{suffix} is on {formattedDate}.";
// const NOTIFY_TITLE_DAY = "Tomorrow: {name}{suffix}";
// const NOTIFY_BODY_DAY = "{icon} {name}{suffix} — happening on {formattedDate}.";

// Test notification templates (so you can distinguish test notifications)
const NOTIFY_TITLE_TEST_WEEK = "TEST: {icon} {name} (1 week)";
const NOTIFY_BODY_TEST_WEEK = "TEST MODE — simulating 1-week reminder for {formattedDate}.";
const NOTIFY_TITLE_TEST_DAY = "TEST: {icon} {name} (1 day)";
const NOTIFY_BODY_TEST_DAY = "TEST MODE — simulating 1-day reminder for {formattedDate}.";

function renderTemplate(template, row) {
  if (!template) return '';
  const mapping = {
    icon: row.icon || '',
    name: row.name || '',
    date: row.date || '',
    formattedDate: (row.date ? formatDate(row.date) : ''),
    // suffix uses the same mapping as titles in the widget (falls back to empty)
    suffix: (typeof titleSuffixes !== 'undefined' && titleSuffixes[row.icon]) ? titleSuffixes[row.icon] : ''
  };
  return String(template).replace(/\{(\w+)\}/g, (_, key) => mapping.hasOwnProperty(key) ? mapping[key] : '');
}

function buildUrlWithParams(base, params = {}) {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  if (!query) return base;
  return base + (base.includes('?') ? '&' : '?') + query;
}

function normalizeEventRow(row) {
  if (!row || typeof row !== 'object') return null;

  const pick = (...keys) => {
    for (const key of keys) {
      if (row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== '') {
        return row[key];
      }
    }
    return null;
  };

  const name = pick('name', 'Name', 'Event Name');
  const date = pick('date', 'Date', 'Event Date');
  if (!name || !date) return null;

  const icon = pick('icon', 'Icon', 'Widget Emoji', 'Emoji') || '📅';
  const colorRaw = pick('color', 'Color', 'Widget Clr', 'Widget Color');
  const color = colorRaw ? String(colorRaw).trim() : null;

  const normalized = {
    name: String(name).trim(),
    date: String(date).trim(),
    icon: String(icon).trim() || '📅',
    color: color && color.length ? color : null
  };

  const passthroughKeys = ['notes', 'Notes', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for (const key of passthroughKeys) {
    if (row[key] !== undefined) {
      const targetKey = key.length === 1 ? key : key.toLowerCase();
      normalized[targetKey] = row[key];
    }
  }

  return normalized;
}

// === Fetch Data from Google Sheets Web App (instead of local JSON) ===
const req = new Request(SHEET_API_URL);

// === Local cache setup ===
const fm = FileManager.iCloud();
const dataDir = fm.joinPath(fm.documentsDirectory(), ".cache");
if (!fm.fileExists(dataDir)) fm.createDirectory(dataDir);

const dataPath = fm.joinPath(dataDir, "events_cache.json");

// Cleanup old schedule-related .txt files so we don't leave artifacts in Documents
try {
  const docs = fm.documentsDirectory();
  const items = fm.listContents(docs);
  for (const name of items) {
    // Remove legacy scheduling/text artifacts we previously wrote
    if (name.startsWith('schedule_log_') || name.startsWith('schedule_summary_')) {
      try { const p = fm.joinPath(docs, name); if (fm.fileExists(p)) fm.remove(p); } catch (e) { /* ignore */ }
    }
  }
} catch (e) {
  // ignore cleanup errors
}

// Note: removed verbose scheduling log helper to keep script lean. Use readable schedule file instead.

// Fetch data from the Google Sheets GViz endpoint for a single hard-coded tab.
// This bypasses the Apps Script webapp so the widget always reads the
// specified sheet/tab directly (the spreadsheet must be viewable).
async function loadEventData() {
  // Allow overriding the target sheet/tab and spreadsheet id via widget parameter.
  // Supported param forms (comma-separated): "tab=NAME", "sheet=NAME", "ss=SPREADSHEET_ID", "ssid=..."
  let effectiveSheet = HARDCODED_SHEET;
  let effectiveSSId = HARDCODED_SPREADSHEET_ID;
  if (ALLOW_WIDGET_PARAM_OVERRIDES) {
    try {
      const wp = (typeof args !== 'undefined' && args.widgetParameter) ? String(args.widgetParameter).trim() : '';
      if (wp) {
        const parts = wp.split(',').map(p => p.trim());
        parts.forEach(p => {
          const mTab = p.match(/^(?:tab|sheet)=(.+)$/i);
          const mSS = p.match(/^(?:ss|ssid|spreadsheet)=(.+)$/i);
          if (mTab) effectiveSheet = mTab[1];
          if (mSS) effectiveSSId = mSS[1];
        });
      }
    } catch (e) {
      // ignore param parsing errors and fall back to hard-coded values
    }
  } else if (config && config.runsInApp && typeof args !== 'undefined' && args.widgetParameter) {
    console.warn("Widget parameter detected but overrides are disabled. Clear the parameter or enable overrides.");
  }

  const safeSheet = effectiveSheet ? String(effectiveSheet).replace(/[^a-zA-Z0-9_-]/g, '_') : 'default';
  const cacheFile = fm.joinPath(dataDir, `events_cache_${safeSheet}.json`);

  // Force refresh helper for testing
  if (HARDCODED_FORCE_REFRESH && fm.fileExists(cacheFile)) {
    try { fm.remove(cacheFile); } catch (e) { /* ignore */ }
  }
  let rows = null;
  let lastFetchError = null;

  if (USE_APPS_SCRIPT_WEBAPP && SHEET_API_URL) {
    try {
      const webUrl = buildUrlWithParams(SHEET_API_URL, {
        sheet: effectiveSheet,
        ssid: effectiveSSId,
        cb: Date.now()
      });
      const webReq = new Request(webUrl);
      webReq.headers = { 'Cache-Control': 'no-cache', Pragma: 'no-cache' };
      const payload = await webReq.loadJSON();
      if (Array.isArray(payload)) rows = payload;
      else if (payload && Array.isArray(payload.events)) rows = payload.events;
      else if (payload && payload.data && Array.isArray(payload.data)) rows = payload.data;
      else throw new Error('Apps Script response is missing an events array.');
    } catch (err) {
      lastFetchError = err;
    }
  }

  if (!rows) {
    const isGid = !!(effectiveSheet && String(effectiveSheet).match(/^\d+$/));
    const ssId = effectiveSSId;
    let url = `https://docs.google.com/spreadsheets/d/${ssId}/gviz/tq?tqx=out:json`;
    if (effectiveSheet) {
      url += isGid ? `&gid=${encodeURIComponent(effectiveSheet)}` : `&sheet=${encodeURIComponent(effectiveSheet)}`;
    }
    url = buildUrlWithParams(url, { cb: Date.now() });

    try {
      const req = new Request(url);
      const txt = await req.loadString();
      const m = txt.match(/google\.visualization\.Query\.setResponse\(([\s\S]*?)\);?\s*$/);
      let jsonStr = null;
      if (m && m[1]) jsonStr = m[1];
      else jsonStr = txt.replace(/^\/\*[\s\S]*?\*\//, '').trim();

      const resp = JSON.parse(jsonStr);
      const table = resp.table || {};
      const cols = (table.cols || []).map((c, i) => (c.label && c.label.length) ? c.label : (c.id || `col${i}`));

      function normalizeCellValue(cell) {
        if (cell === null || cell === undefined) return null;

        if (typeof cell === 'object') {
          if (cell.hasOwnProperty('v')) return normalizeCellValue(cell.v);
          if (cell.hasOwnProperty('f')) return normalizeCellValue(cell.f);

          if (cell.year !== undefined && cell.month !== undefined && cell.day !== undefined) {
            const y = Number(cell.year);
            const m = Number(cell.month);
            const d = Number(cell.day);
            if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
              return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            }
          }

          if (cell instanceof Date) return cell.toISOString().slice(0, 10);

          try { return String(cell); } catch (e) { return null; }
        }

        if (typeof cell === 'string') {
          const s = cell.trim();
          const m = s.match(/(?:new\s*)?Date\s*\(\s*(\d{4})\s*,\s*(\d{1,2})\s*,\s*(\d{1,2})\s*\)/i);
          if (m) {
            const y = Number(m[1]);
            const mm = Number(m[2]);
            const d = Number(m[3]);
            if (!isNaN(y) && !isNaN(mm) && !isNaN(d)) {
              const monthOneBased = mm + 1;
              return `${y}-${String(monthOneBased).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            }
          }

          return s;
        }

        return cell;
      }

      rows = (table.rows || []).map(r => {
        const obj = {};
        for (let i = 0; i < cols.length; i++) {
          const raw = r.c && r.c[i] ? r.c[i] : null;
          const cellVal = raw ? normalizeCellValue(raw.v !== undefined ? raw.v : (raw.f !== undefined ? raw.f : raw)) : null;

          const colName = cols[i] || `col${i}`;

          if (colName && colName.toLowerCase().includes('date') && cellVal) {
            if (typeof cellVal === 'number') {
              if (cellVal > 1000000000000) {
                obj[colName] = new Date(cellVal).toISOString().slice(0, 10);
              } else {
                const excelBase = new Date(Date.UTC(1899, 11, 30));
                const dateObj = new Date(excelBase.getTime() + (cellVal * 24 * 60 * 60 * 1000));
                obj[colName] = dateObj.toISOString().slice(0, 10);
              }
            } else {
              const parsed = new Date(String(cellVal));
              if (!isNaN(parsed)) obj[colName] = parsed.toISOString().slice(0, 10);
              else {
                const m = String(cellVal).match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
                if (m) obj[colName] = `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}`;
                else obj[colName] = String(cellVal);
              }
            }
          } else {
            obj[colName] = cellVal;
          }
        }
        return obj;
      });
    } catch (err) {
      lastFetchError = err;
    }
  }

  if (!rows) {
    if (fm.fileExists(cacheFile)) return JSON.parse(fm.readString(cacheFile));
    if (fm.fileExists(dataPath)) return JSON.parse(fm.readString(dataPath));
    if (lastFetchError) throw lastFetchError;
    throw new Error('No data available online or locally.');
  }

  const normalizedRows = [];
  for (const row of rows) {
    const norm = normalizeEventRow(row);
    if (norm) normalizedRows.push(norm);
  }
  rows = normalizedRows;
  if (!rows.length) {
    if (fm.fileExists(cacheFile)) return JSON.parse(fm.readString(cacheFile));
    throw new Error('Fetched data but none of the rows contained name/date columns.');
  }

  try {
    const scheduleFile = fm.joinPath(dataDir, `scheduled_notifications_${safeSheet}.json`);
    let prevScheduled = {};
    if (fm.fileExists(scheduleFile)) {
      try { prevScheduled = JSON.parse(fm.readString(scheduleFile)) || {}; } catch (e) { prevScheduled = {}; }
    }

    const newScheduled = {};
    const newScheduledReadable = {};
    const now = new Date();

    for (const row of rows) {
      if (!row || !row.date) continue;
      let nextOcc = null;
      try { nextOcc = upcomingDateInCurrentYear(row.date); } catch (e) { nextOcc = null; }
      if (!nextOcc || isNaN(nextOcc.getTime())) continue;

      const weekBefore = new Date(nextOcc);
      weekBefore.setDate(weekBefore.getDate() - 7);
      weekBefore.setHours(9, 0, 0, 0);

      const dayBefore = new Date(nextOcc);
      dayBefore.setDate(dayBefore.getDate() - 1);
      dayBefore.setHours(9, 0, 0, 0);

      const eid = `${safeSheet}||${String(row.name || '')}||${String(row.date || '')}`;
      newScheduled[eid] = { week: weekBefore.getTime(), day: dayBefore.getTime() };
      newScheduledReadable[eid] = { week: weekBefore.toISOString(), day: dayBefore.toISOString() };

      if (config && config.runsInApp) {
        try {
          if (weekBefore > now) {
            const prev = prevScheduled[eid] && prevScheduled[eid].week;
            if (!prev || prev !== weekBefore.getTime()) {
              const n1 = new Notification();
              n1.title = renderTemplate(NOTIFY_TITLE_WEEK, row);
              n1.body = renderTemplate(NOTIFY_BODY_WEEK, row);
              n1.userInfo = { id: eid, when: weekBefore.getTime() };
              n1.schedule(weekBefore);
            }
          }

          if (dayBefore > now) {
            const prevD = prevScheduled[eid] && prevScheduled[eid].day;
            if (!prevD || prevD !== dayBefore.getTime()) {
              const n2 = new Notification();
              n2.title = renderTemplate(NOTIFY_TITLE_DAY, row);
              n2.body = renderTemplate(NOTIFY_BODY_DAY, row);
              n2.userInfo = { id: eid, when: dayBefore.getTime() };
              n2.schedule(dayBefore);
            }
          } else {
            const msUntilEvent = nextOcc.getTime() - now.getTime();
            if (msUntilEvent > 0 && msUntilEvent <= 48 * 60 * 60 * 1000) {
              const prevD = prevScheduled[eid] && prevScheduled[eid].day;
              if (!prevD || prevD !== dayBefore.getTime()) {
                const nNow = new Notification();
                nNow.title = renderTemplate(NOTIFY_TITLE_DAY, row);
                nNow.body = renderTemplate(NOTIFY_BODY_DAY, row);
                nNow.userInfo = { id: eid, when: Date.now() };
                nNow.schedule(new Date(Date.now() + 5000));
              }
            }
          }
        } catch (e) {
          // ignore scheduling failure for this row
        }
      }
    }
    try { fm.writeString(scheduleFile, JSON.stringify(newScheduled, null, 2)); } catch (e) { /* ignore */ }
  } catch (e) {
    // ignore scheduling errors
  }

  fm.writeString(cacheFile, JSON.stringify(rows));
  try {
    const debugPath = fm.joinPath(dataDir, `parsed_events_${safeSheet}.json`);
    fm.writeString(debugPath, JSON.stringify(rows, null, 2));
  } catch (e) {
    // ignore debug write failures
  }

  return rows;
}

const events = await loadEventData();

// const events = await req.loadJSON();

const titleSuffixes = {
  "🎂": "'s Birthday",
  "🥂": "'s Anniversary",
  "🗓": "", // relationships
  "🔱": "",
  "✈️": "",
  "default": ""
};

const ageSuffixMap = {
  "🎂": ["turning ", ""],
  "🥂": ["", " yrs together"],
  "🔱": ["", " yrs observed"],
  "🗓": ["", " yrs together"],
  "default": [" ", " "]
};

const todaySuffixes = {
  "🎂": ["You are ", " 🥳"],
  "🥂": ["", " together 🥳"],
  "🗓": ["", " together 🥳"],
  "🔱": ["", " observed"],
  "default": ["", ""]
};


// === Load local files ===
// const fm = FileManager.iCloud();

// === Google Drive assets manifest (OPTIONAL) ===
// Provide direct-download URLs for files you upload to Google Drive. If you leave
// these empty, the script will try to use any locally-cached files in iCloud.
// Replace the example URLs with your own direct-download links (see instructions below).
const DRIVE_ASSETS = {
  "Roboto-Regular.ttf": "https://drive.google.com/uc?export=download&id=1yTBh2E9U1zaT1I3hARU8Fsje8NyvVfZT",
  "repeat_icon.png": "https://drive.google.com/uc?export=download&id=1tTOZb2tL2zunJTMMX3USPf142TKL21Vo",
};

// Helper: ensure a file exists locally by downloading from Drive manifest if provided.
async function ensureLocalFile(subdir, fileName) {
  const dir = fm.joinPath(fm.documentsDirectory(), subdir);
  if (!fm.fileExists(dir)) fm.createDirectory(dir);
  const path = fm.joinPath(dir, fileName);

  if (fm.fileExists(path)) {
    return path;
  }

  const driveUrl = DRIVE_ASSETS[fileName];
  if (!driveUrl) {
    // No remote URL provided and file not in iCloud — caller should handle fallback.
    return null;
  }

  try {
    const req = new Request(driveUrl);
    // Try to load raw data and write to file (works for images/fonts/binaries)
    const data = await req.load();
    fm.write(path, data);
    return path;
  } catch (e) {
    // Download failed — return null so caller can fallback.
    return null;
  }
}

// === Load Custom Roboto Font (from Drive or iCloud fallback) ===
const fontFileName = "Roboto-Regular.ttf";
const localFontPath = await ensureLocalFile(".fonts", fontFileName) || fm.joinPath(fm.joinPath(fm.documentsDirectory(), ".fonts"), fontFileName);
// If we still don't have the font file locally, don't block — fallback to system fonts.
let roboto = null;
if (fm.fileExists(localFontPath)) {
  try {
    await fm.downloadFileFromiCloud(localFontPath);
  } catch (e) {
    // ignore download errors
  }
  roboto = (size) => new Font(localFontPath, size);
} else {
  // Fallback factory using system font
  roboto = (size) => Font.systemFont(size);
}

// === Load Repeat Icon (from Drive or iCloud fallback) ===
const repeatFileName = "repeat_icon.png";
const localRepeatPath = await ensureLocalFile(".source", repeatFileName) || fm.joinPath(fm.joinPath(fm.documentsDirectory(), ".source"), repeatFileName);
let repeatIcon = null;
if (fm.fileExists(localRepeatPath)) {
  try {
    await fm.downloadFileFromiCloud(localRepeatPath);
  } catch (e) {
    // ignore
  }
  try {
    repeatIcon = fm.readImage(localRepeatPath);
  } catch (e) {
    repeatIcon = null;
  }
} else {
  repeatIcon = null; // gracefully handle missing icon later
}


// === Parameter Handling for Small Widget ===
const param = args.widgetParameter ? args.widgetParameter.trim().toLowerCase() : null;
// Find the most recent upcoming event (soonest event)
let selectedEvent = events.reduce((closest, event) => {
  const daysToEvent = daysUntil(event.date);
  const daysToClosest = daysUntil(closest.date);
  return daysToEvent < daysToClosest ? event : closest;
}, events[0]);
let showAgeMode = false; // default off
let page = 1; // default page

if (param) {
  const parts = param.split(',').map(p => p.trim().toLowerCase());

  parts.forEach(p => {
    if (p.startsWith("pg")) {
      // Handle pagination (pg1, pg2, etc.)
      page = parseInt(p.slice(2)) || 1;
    } else if (p === "age") {
      // Activate age display mode
      showAgeMode = true;
    } else if (!isNaN(p)) {
      // Select event by numeric index
      const index = parseInt(p) - 1;
      if (index >= 0 && index < events.length) {
        selectedEvent = events[index];
      }
    } else {
      // Select event by matching name (case-insensitive)
      const match = events.find(e => e.name.toLowerCase().includes(p));
      if (match) selectedEvent = match;
    }
  });
}

// if (param && param !== "col") {
//   const parts = param.split(',').map(p => p.trim());
//   if (parts.includes("age")) showAgeMode = true;

//   const otherParam = parts.find(p => p !== "age");
//   if (otherParam) {
//     if (!isNaN(otherParam)) {
//       const index = parseInt(otherParam) - 1;
//       if (index >= 0 && index < events.length) {
//         selectedEvent = events[index];
//       }
//     } else {
//       const match = events.find(e => e.name.toLowerCase().includes(otherParam));
//       if (match) selectedEvent = match;
//     }
//   }
// }

// === Countdown Utils ===
function upcomingDateInCurrentYear(dateStr) {
  const today = new Date();
  // Use parseLocalDate to avoid UTC parsing issues ("YYYY-MM-DD" parses as UTC)
  const d = parseLocalDate(dateStr);
  if (!d || isNaN(d.getTime())) return null;
  let upcoming = new Date(today.getFullYear(), d.getMonth(), d.getDate());
  if (upcoming < today) {
    upcoming.setFullYear(today.getFullYear() + 1);
  }
  return upcoming;
}
// Sort events by days until occurrence so today's events appear first in lists/grids
events.sort((a, b) => daysUntil(a.date) - daysUntil(b.date));

function parseLocalDate(dateStr) {
  if (!dateStr && dateStr !== 0) return null;
  if (dateStr instanceof Date) {
    const dd = new Date(dateStr);
    return new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
  }

  const s = String(dateStr).trim();

  // YYYY-MM-DD (ISO) -> treat as local date (avoid UTC shift)
  const mIso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (mIso) {
    const y = Number(mIso[1]);
    const mo = Number(mIso[2]) - 1;
    const day = Number(mIso[3]);
    return new Date(y, mo, day);
  }

  // MM/DD/YYYY or M/D/YYYY
  const mUS = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (mUS) {
    const mo = Number(mUS[1]) - 1;
    const day = Number(mUS[2]);
    const y = Number(mUS[3]);
    return new Date(y, mo, day);
  }

  // Fallback: parse with Date, then normalize to local Y/M/D
  const d = new Date(s);
  if (isNaN(d)) return null;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let eventDate = parseLocalDate(dateStr);
  if (!eventDate || isNaN(eventDate.getTime())) {
    // If we can't parse the date, return a large number so it won't be chosen as next event
    return 99999;
  }

  eventDate.setFullYear(today.getFullYear());

  if (eventDate < today) {
    eventDate.setFullYear(today.getFullYear() + 1);
  }

  return Math.round((eventDate - today) / (1000 * 60 * 60 * 24));
}

function calculateAgeData(dateStr, today) {
  const birthDate = parseLocalDate(dateStr);
  const thisYearBday = new Date(birthDate);
  thisYearBday.setFullYear(today.getFullYear());
  thisYearBday.setHours(0, 0, 0, 0);

  const lastBday = new Date(thisYearBday);
  const nextBday = new Date(thisYearBday);
  nextBday.setFullYear(nextBday.getFullYear() + 1);

  const ageWhole = today.getFullYear() - birthDate.getFullYear();
  const ageDecimal = ageWhole + (today - lastBday) / (nextBday - lastBday);

  return { birthDate, thisYearBday, ageDecimal };
}

function formatDate(dateStr) {
  const d = parseLocalDate(dateStr);
  const df = new DateFormatter();
  df.dateFormat = "EEE, MMM d, YYYY"; // e.g., Sat, Aug 23
  return df.string(d);
}

function formatCountdown(dateStr) {
  const days = daysUntil(dateStr);
  if (days < 0) return "Today!";
  if (days === 0) return "Today";
  return `${days} day${days > 1 ? 's' : ''} left`;
}

// === Helper Function to Create Text Elements ===
/**
 * Creates a styled label in a stack.
 * @param {WidgetStack} stack - The stack to add the text to.
 * @param {string} text - The label text.
 * @param {number} size - Font size.
 * @param {string} weight - One of: "bold", "heavy", "light", "medium", "semibold", "ultralight", "thin", "italic".
 * @param {Object} opts - Optional settings:
 *  - color: Color (default white)
 *  - alignment: "left" | "center" | "right" (default "left")
 *  - minScale: number (default 1.0)
 *  - lineLimit: number (default 1)
 */
function createStyledLabel(stack, text, size, weight = "regular", opts = {}) {
  const label = stack.addText(text);

  // Determine font weight
  switch (weight) {
    case "bold":
      label.font = Font.boldSystemFont(size);
      break;
    case "heavy":
      label.font = Font.heavySystemFont(size);
      break;
    case "light":
      label.font = Font.lightSystemFont(size);
      break;
    case "medium":
      label.font = Font.mediumSystemFont(size);
      break;
    case "semibold":
      label.font = Font.semiboldSystemFont(size);
      break;
    case "ultralight":
      label.font = Font.ultraLightSystemFont(size);
      break;
    case "thin":
      label.font = Font.thinSystemFont(size);
      break;
    case "italic":
      label.font = Font.italicSystemFont(size);
      break;
    default:
      label.font = Font.systemFont(size);
  }

  // Apply other styling
  label.textColor = opts.color || Color.white();
  label.minimumScaleFactor = opts.minScale || 1.0;
  if (opts.lineLimit) {
    label.lineLimit = opts.lineLimit;
  }


  if (opts.alignment === "center") label.centerAlignText();
  else if (opts.alignment === "right") label.rightAlignText();
  else label.leftAlignText();

  return label;
}


// === Widget Setup ===
const widget = new ListWidget();
widget.backgroundColor = new Color("#1e1e1e");
widget.setPadding(10, 10, 10, 10);

// === Layout Settings Based on Size ===
const size = config.widgetFamily;

// === Small Widget ===
if (size === "small") {

  const event = selectedEvent;
  const days = daysUntil(event.date);

  const titleIconName = titleSuffixes[event.icon] || titleSuffixes["default"];
  const ageSuffixArr = ageSuffixMap[event.icon] || ageSuffixMap["default"];
  const suffixArr = todaySuffixes[event.icon] || todaySuffixes["default"];

  // FIXED date adjustment (fully timezone safe)
  const originalDate = parseLocalDate(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const displayDate = new Date(originalDate);
  displayDate.setFullYear(today.getFullYear());

  if (displayDate < today) {
    displayDate.setFullYear(today.getFullYear() + 1);
  }

  const formattedDate = formatDate(displayDate);

  // Override widget properties
  // const widget = new ListWidget();
  // widget.backgroundColor = new Color("#1e1e1e");
  widget.setPadding(0, 0, 0, 0); // reset
  widget.backgroundColor = new Color(event.color || "#2980b9");

  // let a = 15; // top bottom
  // let b = 17; // left right

  // === Main vertical layout
  const mainWrap = widget.addStack(); // wrapper stack to make main stack horizontal left 
  mainWrap.layoutHorizontally();

  const main = mainWrap.addStack();
  main.layoutVertically();
  // main.topAlignContent();
  // main.setPadding(a, b, a, b);
  main.setPadding(15, 17, 15, 17); // top left bottom right
  // main.spacing = 2;

  // === Top tittle section
  const topRow = main.addStack();
  // topRow.layoutVertically();
  topRow.layoutHorizontally();
  topRow.centerAlignContent();

  const mainFontsize = 15; // same as title font

  // icon/emoji
  createStyledLabel(topRow, event.icon, mainFontsize + 6, "bold");
  topRow.addSpacer(7); // space between
  // title
  createStyledLabel(topRow, `${event.name}${titleIconName}`, mainFontsize, "bold", { minScale: 0.5, lineLimit: 2 });

  // === Age section
  if (showAgeMode) {


    // makes everthing in bwtween "main.addSpacer();" align equally
    main.addSpacer();
    const middleRow = main.addStack();
    middleRow.layoutVertically();
    // middleRow.bottomAlignContent();
    // middleRow.spacing = 10;

    if (event.icon) {

      const { birthDate, thisYearBday, ageDecimal } = calculateAgeData(event.date, today);
      let ageDisplay;

      // line 1: days left
      const countdown = middleRow.addStack();
      countdown.layoutHorizontally();

      let fsOffset = 5;
      // middleRow.addSpacer(); 

      if (thisYearBday.getTime() === today.getTime()) {
        // if birthday than show nothing
        // this won't show days left label
      }
      else {
        // days left lable
        createStyledLabel(countdown, `${days}`, mainFontsize + fsOffset, "semibold",);
        createStyledLabel(countdown, ` days left`, mainFontsize + fsOffset - 1);
      }

      // line 2: turing age
      const turningAge = middleRow.addStack();
      turningAge.layoutHorizontally();

      let k = fsOffset;
      ageDisplay = (thisYearBday <= today) ? (parseFloat(ageDecimal) + 1).toFixed(0) : (ageDecimal).toFixed(0);

      if (thisYearBday.getTime() === today.getTime()) {
        createStyledLabel(turningAge, suffixArr[0], mainFontsize + k - 1);
        createStyledLabel(turningAge, `${ageDisplay}!`, mainFontsize + k, "semibold");
        createStyledLabel(turningAge, suffixArr[1], mainFontsize + k - 1);
      } else {
        createStyledLabel(turningAge, ageSuffixArr[0], mainFontsize + k - 1);
        createStyledLabel(turningAge, `${ageDisplay}!`, mainFontsize + k, "semibold");
        createStyledLabel(turningAge, ageSuffixArr[1], mainFontsize + k - 1);
      }

    } else {
      // Non-emoji events: show age info if birthday is today, else show normal countdown
      const { birthDate, thisYearBday, ageDecimal } = calculateAgeData(event.date, today);
      if (thisYearBday.getTime() === today.getTime()) {
        // Show only the age line when birthday is today
        main.addSpacer();
        const turningAge = middleRow.addStack();
        turningAge.layoutHorizontally();

        const ageDisplay = (thisYearBday <= today) ? (parseFloat(ageDecimal) + 1).toFixed(0) : (ageDecimal).toFixed(0);

        // Use today's suffix mapping if available, otherwise default
        const suffixArr = todaySuffixes[event.icon] || todaySuffixes["default"];
        createStyledLabel(turningAge, suffixArr[0], mainFontsize + 4 - 1);
        createStyledLabel(turningAge, `${ageDisplay}!`, mainFontsize + 4, "semibold");
        createStyledLabel(turningAge, suffixArr[1], mainFontsize + 4 - 1);
      } else {
        main.addSpacer(0);
        createStyledLabel(middleRow, `${days}`, mainFontsize + 27, "light");
        createStyledLabel(middleRow, `days left`, mainFontsize + 2, "light");
      }
    }

  } else {
    const { birthDate, thisYearBday, ageDecimal } = calculateAgeData(event.date, today);
    let ageDisplay;
    let k = 5; // font size offset
    ageDisplay = (thisYearBday <= today) ? (parseFloat(ageDecimal) + 1).toFixed(0) : (ageDecimal).toFixed(0);


    if (thisYearBday.getTime() === today.getTime()) {
      main.addSpacer();
      const middleRow = main.addStack();
      middleRow.layoutVertically();
      const turningAge = middleRow.addStack();
      turningAge.layoutHorizontally();
      createStyledLabel(turningAge, suffixArr[0], mainFontsize + k - 1);
      createStyledLabel(turningAge, `${ageDisplay}!`, mainFontsize + k, "semibold");
      createStyledLabel(turningAge, suffixArr[1], mainFontsize + k - 1);
    } else {
      // === days left
      main.addSpacer(0); // Pushs the section up
      const middleRow = main.addStack();
      middleRow.layoutVertically();
      createStyledLabel(middleRow, `${days}`, mainFontsize + 27, "light");
      createStyledLabel(middleRow, `days left`, mainFontsize + 2,);
    }
  }
  main.addSpacer();

  // === Date section
  const bottomRow = main.addStack();
  bottomRow.layoutHorizontally();
  bottomRow.centerAlignContent();
  let repeatIconSize = 15;

  // load image
  const iconImg = bottomRow.addImage(repeatIcon);
  iconImg.imageSize = new Size(repeatIconSize, repeatIconSize);
  iconImg.tintColor = Color.white();
  bottomRow.addSpacer(6); // space between icon and date text
  // birth date
  createStyledLabel(bottomRow, `${formattedDate}`, mainFontsize - 3);

  mainWrap.addSpacer();

  Script.setWidget(widget);
  Script.complete();
  return;

}

const gridConfig = {
  // large: { rows: 5, cols: 2, cellHeight: 65, cellWidth: 329 / 2, fontSize: { title: 13, text: 11 }, padding: 6, spacing: 8 },
  // medium: { rows: 2, cols: 2, cellHeight: 65, cellWidth: 329 / 2, fontSize: { title: 13, text: 11 }, padding: 6, spacing: 8 },
  large: { rows: 5, cols: 2, cellHeight: 65, cellWidth: 329 / 2, fontSize: { title: 13, text: 11 }, padding: 0, spacing: 8 },
  medium: { rows: 2, cols: 2, cellHeight: 65, cellWidth: 329 / 2, fontSize: { title: 13, text: 11 }, padding: 0, spacing: 8 },
  small: { rows: 1, cols: 1, cellHeight: 50, cellWidth: 0, fontSize: { title: 13, text: 11 }, padding: 4, spacing: 4 }
};

const configSize = gridConfig[size] || gridConfig["small"];

if (param && param.includes("col")) {
  const { rows, cols, cellHeight, cellWidth, fontSize, padding, spacing } = configSize;

  // Pagination logic for Grid View
  const itemsPerPage = rows * cols;
  const startIdx = (page - 1) * itemsPerPage;
  const pagedEvents = events.slice(startIdx, startIdx + itemsPerPage);

  // Pad with null if fewer items remain
  while (pagedEvents.length < itemsPerPage) pagedEvents.push(null);

  for (let r = 0; r < rows; r++) {
    const row = widget.addStack();
    row.layoutHorizontally();
    row.spacing = spacing;

    for (let c = 0; c < cols; c++) {
      const index = r * cols + c;
      const item = pagedEvents[index];

      const cell = row.addStack();
      cell.layoutVertically();
      // cell.layoutHorizontally();
      cell.size = new Size(cellWidth, cellHeight);
      cell.cornerRadius = 12;
      cell.setPadding(padding, padding, padding, padding);
      cell.centerAlignContent();

      if (item) {
        const days = daysUntil(item.date);
        const formattedDate = formatDate(item.date);
        const colorIndex = (startIdx + index) % colorPalette.length;
        cell.backgroundColor = new Color(item.color || colorPalette[colorIndex]);

        const rowStack = cell.addStack();
        // rowStack.layoutVertically();
        rowStack.layoutHorizontally();
        rowStack.centerAlignContent();
        // rowStack.spacing = 4;

        // Left Stack component
        // const leftStack = rowStack.addStack();
        // leftStack.layoutHorizontally();
        // leftStack.centerAlignContent();

        // createStyledLabel(leftStack, item.icon || "📅", fontSize.title + 7, "regular", { minScale: 0.8, lineLimit: 1 });
        // createStyledLabel(leftStack, item.icon || "📅", fontSize.title - 2, "regular", { minScale: 0.8, lineLimit: 1 });
        // topRow.addSpacer(2);
        // Name (truncate if necessary)
        // createStyledLabel(topRow, item.name, fontSize.title, "bold", { minScale: 0.8, lineLimit: 1 });

        // rowStack.addSpacer(3);

        const leftStack_text_wrapper = rowStack.addStack();
        leftStack_text_wrapper.layoutVertically();
        // setPadding(top, leading, bottom, trailing)
        leftStack_text_wrapper.setPadding(0, 5, 0, 0);

        const leftStack_text = leftStack_text_wrapper.addStack();
        // leftStack_text.layoutVertically();
        leftStack_text.layoutHorizontally();
        // leftStack.centerAlignContent();
        // leftStack_text.addSpacer(3);
        createStyledLabel(leftStack_text, `${item.icon || "📅"} ${item.name}`, fontSize.title - 1, "bold", { minScale: 0.8, lineLimit: 1 });
        // createStyledLabel(leftStack_text, `${formattedDate}`, fontSize.text - 2, { minScale: 0.8, lineLimit: 1 });

        leftStack_text_wrapper.addSpacer(5);

        // Bottom row: date and icon
        const dateRow = leftStack_text_wrapper.addStack();
        dateRow.layoutHorizontally();
        dateRow.centerAlignContent();

        if (repeatIcon) {
          const iconImg = dateRow.addImage(repeatIcon);
          iconImg.imageSize = new Size(fontSize.text, fontSize.text);
          iconImg.tintColor = Color.white();
          dateRow.addSpacer(3);
        } else {
          // If no repeat icon is available, give equivalent spacing so layout stays consistent
          dateRow.addSpacer(fontSize.text - 1);
        }

        // dateRow.addSpacer(5);
        createStyledLabel(dateRow, `${formattedDate}`, fontSize.text - 2, { minScale: 0.8, lineLimit: 1 });


        // space in between
        rowStack.addSpacer();

        // Right Stack component
        // const RightStack = rowStack.addStack();
        // // RightStack.layoutVertically();
        // RightStack.layoutHorizontally();
        // RightStack.centerAlignContent();

        // if (days === 0) {
        //   createStyledLabel(RightStack, "Today!", fontSize.text, "medium", { lineLimit: 1 });
        // } else {
        //   createStyledLabel(RightStack, `${days}`, fontSize.text+4, "bold", { lineLimit: 1 });
        //   createStyledLabel(RightStack, "days left", fontSize.text, "regular", { lineLimit: 1 });
        // }

        const rightWrapperH = rowStack.addStack();
        rightWrapperH.layoutHorizontally();
        rightWrapperH.centerAlignContent();
        rightWrapperH.size = new Size(50, cellHeight);
        rightWrapperH.backgroundColor = new Color("#000000", 108 / 255);

        const rightWrapper = rightWrapperH.addStack();
        rightWrapper.layoutVertically();
        rightWrapper.centerAlignContent();
        // rightWrapper.size = new Size(45, cellHeight);

        // "6C" hex alpha = 0x6C = 108 -> alpha = 108/255 ≈ 0.4235
        // let a = 15;
        // let b = 12;
        // // setPadding(top, leading, bottom, trailing)
        // rightWrapper.setPadding(a,b,a,b);

        const rightStack1 = rightWrapper.addStack();
        rightStack1.layoutHorizontally();
        rightStack1.centerAlignContent();

        // Right stack (days number + "days left")
        const rightPaddingMap = { 1: 14, 2: 8, 3: 4, default: 5 };
        const rightPad = rightPaddingMap[days.toString().length] || rightPaddingMap.default;
        rightStack1.setPadding(0, rightPad, 0, 0);

        if (days === 0) {
          createStyledLabel(rightStack1, `🎉`, fontSize.text + 5, "semibold", { alignment: "center" });
        } else {
          createStyledLabel(rightStack1, `${days}`, fontSize.text + 5, "semibold", { alignment: "center" });

          const rightStack2 = rightWrapper.addStack();
          rightStack2.layoutHorizontally();
          rightStack2.centerAlignContent();
          rightWrapper.addSpacer(0);

          createStyledLabel(rightStack2, "days left", fontSize.text - 2, { lineLimit: 1, alignment: "center" });
        }

        // ----------------------------------------------------
        // // Top row: emoji icon on left and name on right (like default list view)
        // const topRow = rowStack.addStack();
        // topRow.layoutHorizontally();
        // topRow.centerAlignContent();

        // // Emoji icon as a separate label (larger)
        // createStyledLabel(topRow, item.icon || "📅", fontSize.title + 4, "regular", { minScale: 0.8, lineLimit: 1 });
        // topRow.addSpacer(2);
        // // Name (truncate if necessary)
        // createStyledLabel(topRow, item.name, fontSize.title, "bold", { minScale: 0.8, lineLimit: 1 });

        // // Middle row: formatted date (short)
        // const dateRow = rowStack.addStack();
        // dateRow.layoutHorizontally();
        // dateRow.centerAlignContent();
        // createStyledLabel(dateRow, formattedDate, fontSize.text, { lineLimit: 1 });

        // // Bottom row: countdown (make it right-aligned within the cell)
        // const bottomRow = rowStack.addStack();
        // bottomRow.layoutHorizontally();
        // bottomRow.centerAlignContent();
        // bottomRow.addSpacer();
        // const cd = (days === 0) ? `🎉 ${formatCountdown(item.date)}` : `${days} days left`;
        // createStyledLabel(bottomRow, cd, fontSize.text, "medium", { lineLimit: 1 });
      } else {
        cell.backgroundColor = new Color("#00000000"); // transparent placeholder
      }
    }

    if (r < rows - 1) widget.addSpacer(spacing);
  }


} else {
  // === Defualt List View ===
  const mainPadding = 6;
  const iconSize = size === "large" ? 20 : 20;
  const nameFontSize = size === "large" ? 17 : 17;
  const dateFontSize = nameFontSize - 5;
  const colorBarHeight = size === "large" ? 38 : 38;
  const colorBarGap = size === "large" ? 8 : 8;
  const rightNumberSize = 20; // same for all
  const rightPaddingMap = { 1: 24, 2: 18, 3: 12, default: 5 };
  const maxItems = size === "large" ? 7 : 3;
  widget.backgroundColor = new Color("#000000");

  // === Pagination Logic ===
  const itemsPerPage = size === "large" ? 7 : 3;
  const startIdx = (page - 1) * itemsPerPage;
  const pagedEvents = events.slice(startIdx, startIdx + itemsPerPage);

  // for (let i = 0; i < maxItems; i++) { // normal loop
  for (let i = 0; i < pagedEvents.length; i++) { // paged loop
    const event = pagedEvents[i];
    if (!event) continue; // skip empty slots
    const daysNum = daysUntil(event.date);
    const isToday = daysNum === 0;
    const daysDisplay = isToday ? formatCountdown(event.date) : String(daysNum);

    const row = widget.addStack();
    row.layoutHorizontally();
    row.centerAlignContent();
    row.addSpacer(mainPadding);

    // Left color bar
    const colorBar = row.addStack();
    colorBar.size = new Size(4, colorBarHeight);
    colorBar.backgroundColor = new Color(event.color || colorPalette[i % colorPalette.length]);

    row.addSpacer(colorBarGap);

    // Left content stack
    const leftStack = row.addStack();
    leftStack.layoutVertically();

    // Top row: icon and name
    const topRow = leftStack.addStack();
    topRow.layoutHorizontally();
    topRow.centerAlignContent();

    createStyledLabel(topRow, event.icon, iconSize);
    topRow.addSpacer(4);

    const nameLabel = event.icon === "🎂" ? `${event.name}'s Birthday` : event.name;
    createStyledLabel(topRow, nameLabel, nameFontSize, { lineLimit: 1 });

    // Bottom row: date and icon
    const dateRow = leftStack.addStack();
    dateRow.layoutHorizontally();
    dateRow.centerAlignContent();

    if (repeatIcon) {
      const iconImg = dateRow.addImage(repeatIcon);
      iconImg.imageSize = new Size(dateFontSize, dateFontSize);
      iconImg.tintColor = Color.white();
      dateRow.addSpacer(6);
    } else {
      // If no repeat icon is available, give equivalent spacing so layout stays consistent
      dateRow.addSpacer(dateFontSize + 6);
    }

    createStyledLabel(dateRow, formatDate(event.date), dateFontSize, { lineLimit: 1 });

    row.addSpacer(); // Push right stack to the right

    // Right stack (days number + "days left")
    const rightWrapper = row.addStack();
    rightWrapper.layoutVertically();
    rightWrapper.centerAlignContent();

    const rightStack1 = rightWrapper.addStack();
    rightStack1.layoutHorizontally();
    rightStack1.centerAlignContent();

    const rightPad = rightPaddingMap[daysDisplay.toString().length] || rightPaddingMap.default;
    rightStack1.setPadding(0, rightPad, 0, 0);

    if (isToday) {
      createStyledLabel(rightStack1, `🎉 ${daysDisplay}`, rightNumberSize - 1, "semibold", { alignment: "center" });
    } else {
      createStyledLabel(rightStack1, `${daysDisplay}`, rightNumberSize, "semibold", { alignment: "center" });

      const rightStack2 = rightWrapper.addStack();
      rightStack2.layoutHorizontally();
      rightStack2.centerAlignContent();
      rightWrapper.addSpacer(0);

      createStyledLabel(rightStack2, "days left", rightNumberSize - 5, { alignment: "center" });
    }

    row.addSpacer(mainPadding);

    if (i < maxItems - 1) widget.addSpacer(4);
  }
}

// Refresh widget daily at 2 AM
function getNext2AM() {
  const now = new Date();
  const nextRefresh = new Date(now);
  nextRefresh.setHours(2, 0, 0, 0); // Set to 2:00 AM today
  if (now >= nextRefresh) {
    nextRefresh.setDate(nextRefresh.getDate() + 1); // if past 2 AM, schedule for next day
  }
  return nextRefresh;
}

// widget.refreshAfterDate = getNext2AM();

widget.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000); // refresh hourly
// For in-app runs (scrolling view)
if (config.runsInApp) {
  const table = new UITable();
  table.showSeparators = false;
  table.backgroundColor = new Color("#000000");

  for (const event of events) {
    const days = daysUntil(event.date);
    const row = new UITableRow();
    row.height = 80;
    row.backgroundColor = new Color("#1e1e1e");

    // Combine emoji and event details into a single left-aligned cell
    const leftText = `${event.icon}  ${event.icon === "🎂" ? event.name + "'s Birthday" : event.name}\n📅 ${formatDate(event.date)}`;
    const leftCell = row.addText(leftText);
    leftCell.titleFont = Font.semiboldSystemFont(16);
    leftCell.subtitleFont = Font.systemFont(13);
    leftCell.titleColor = Color.white();
    leftCell.subtitleColor = Color.gray();
    leftCell.widthWeight = 0.7;
    leftCell.leftAligned();

    // Days left in a right-aligned cell (show friendly "Today" text when appropriate)
    const friendly = formatCountdown(event.date);
    const daysCell = row.addText(`${friendly}`);
    daysCell.titleFont = Font.semiboldSystemFont(16);
    daysCell.subtitleFont = Font.systemFont(13);
    daysCell.titleColor = Color.white();
    daysCell.subtitleColor = Color.gray();
    daysCell.widthWeight = 0.3;
    daysCell.rightAligned();

    table.addRow(row);
  }

  await table.present();

  Script.complete();
} else {
  Script.setWidget(widget);
  Script.complete();
}
