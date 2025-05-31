// icon-color: brown; icon-glyph: calendar-check;

// === CONFIG ===
const SHEET_API_URL = ""; // YOUR API URL here
const colorPalette = ["#CB2443", "#8e44ad", "#2980b9", "#F79F39", "#CEA834", "#7b9a50"];

// === Fetch Data from Google Sheets Web App (instead of local JSON) ===
const req = new Request(SHEET_API_URL);
const events = await req.loadJSON();

const titleSuffixes = {
  "🎂": "'s Birthday",
  "🥂": "'s Anniversary",
  "🗓": "", // relationships
  "🔱": "", // Fetivals, etc
  "default": ""
};

const ageSuffixMap = {
  "🎂": ["turning ", ""],
  "🥂": ["", " years together"],
  "🔱": ["", " years observed"],
  "🗓": ["", " years together"],
  "default": ["turning ", " years"]
};

const todaySuffixes = {
  "🎂": ["You are ", " 🥳"],
  "🥂": ["", " together 🥳"],
  "🗓": ["", " together 🥳"],
  "🔱": ["", " observed"],
  "default": ["", " 🥳"]
};


// === Load local files ===
const fm = FileManager.iCloud();

// === Load Custom Roboto Font ===
const fontPath = fm.joinPath(fm.joinPath(fm.documentsDirectory(), ".fonts"), "Roboto-Regular.ttf");
await fm.downloadFileFromiCloud(fontPath);
const roboto = (size) => new Font(fontPath, size);

// === Load Repeat Icon ===
const repeatPath = fm.joinPath(fm.joinPath(fm.documentsDirectory(), ".source"), "repeat_icon.png");
await fm.downloadFileFromiCloud(repeatPath);
const repeatIcon = fm.readImage(repeatPath);


// === Parameter Handling for Small Widget ===
const param = args.widgetParameter ? args.widgetParameter.trim().toLowerCase() : null;
let selectedEvent = events[0]; // default: soonest event
let showAgeMode = false; // default off

if (param && param !== "col") {
  const parts = param.split(',').map(p => p.trim());
  if (parts.includes("age")) showAgeMode = true;

  const otherParam = parts.find(p => p !== "age");
  if (otherParam) {
    if (!isNaN(otherParam)) {
      const index = parseInt(otherParam) - 1;
      if (index >= 0 && index < events.length) {
        selectedEvent = events[index];
      }
    } else {
      const match = events.find(e => e.name.toLowerCase().includes(otherParam));
      if (match) selectedEvent = match;
    }
  }
}

// === Countdown Utils ===
function upcomingDateInCurrentYear(dateStr) {
  const today = new Date();
  const d = new Date(dateStr); // parse ISO date
  let upcoming = new Date(today.getFullYear(), d.getMonth(), d.getDate());
  if (upcoming < today) {
    upcoming.setFullYear(today.getFullYear() + 1);
  }
  return upcoming;
}
events.sort((a, b) => upcomingDateInCurrentYear(a.date) - upcomingDateInCurrentYear(b.date));

function parseLocalDate(dateStr) {
  const d = new Date(dateStr);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let eventDate = parseLocalDate(dateStr);
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

      if (thisYearBday === today) {
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
      // Non-emoji events, show as normal countdown
      main.addSpacer(0);
      createStyledLabel(middleRow, `${days}`, mainFontsize + 27, "light");
      createStyledLabel(middleRow, `days left`, mainFontsize + 2, "light");
    }

  } else {
    // Pushs the section up
    main.addSpacer(0);

    // === days left
    const middleRow = main.addStack();
    middleRow.layoutVertically();
    createStyledLabel(middleRow, `${days}`, mainFontsize + 27, "light");
    createStyledLabel(middleRow, `days left`, mainFontsize + 2,);
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
  large: { rows: 5, cols: 2, cellHeight: 65, cellWidth: 329 / 2, fontSize: { title: 13, text: 11 }, padding: 6, spacing: 8 },
  medium: { rows: 2, cols: 2, cellHeight: 65, cellWidth: 329 / 2, fontSize: { title: 13, text: 11 }, padding: 6, spacing: 8 },
  small: { rows: 1, cols: 1, cellHeight: 50, cellWidth: 0, fontSize: { title: 13, text: 11 }, padding: 4, spacing: 4 }
};

const configSize = gridConfig[size] || gridConfig["small"];

if (param === "col") {
  const { rows, cols, cellHeight, cellWidth, fontSize, padding, spacing } = configSize;
  const maxVisible = rows * cols;
  const visible = events.slice(0, maxVisible);

  // Pad with null to fill grid
  while (visible.length < maxVisible) visible.push(null);
  // === Build Grid ===
  for (let r = 0; r < rows; r++) {
    const row = widget.addStack();
    row.layoutHorizontally();
    row.spacing = spacing;

    for (let c = 0; c < cols; c++) {
      const index = r * cols + c;
      const item = visible[index];

      const cell = row.addStack();
      cell.layoutVertically();
      cell.size = new Size(cellWidth, cellHeight);
      cell.cornerRadius = 12;
      cell.setPadding(padding, padding, padding, 0);
      cell.centerAlignContent();

      if (item) {
        const days = daysUntil(item.date);
        const formattedDate = formatDate(item.date);

        const colorIndex = (r * cols + c * 2) % colorPalette.length;
        cell.backgroundColor = new Color(item.color || colorPalette[colorIndex]);

        const rowStack = cell.addStack();
        rowStack.layoutHorizontally();
        rowStack.centerAlignContent();
        rowStack.spacing = 6;

        // === Left info stack
        const info = rowStack.addStack();
        info.layoutVertically();
        info.spacing = 2;

        // Title
        createStyledLabel(info, `${item.icon || "📅"} ${item.name}`, fontSize.title, "bold", { minScale: 0.8, lineLimit: 1 });

        // Date
        createStyledLabel(info, formattedDate, fontSize.text, { lineLimit: 2 });

        rowStack.addSpacer();

        // === Right countdown
        const counter = rowStack.addStack();
        counter.layoutVertically();
        counter.backgroundColor = new Color("#0000004B");
        counter.setPadding(4, 6, 4, 6);
        counter.size = new Size(45, cellHeight);
        counter.centerAlignContent();

        createStyledLabel(counter, `${days}`, fontSize.title + 2, "heavy");
        createStyledLabel(counter, `days left`, fontSize.text);
      } else {
        cell.backgroundColor = new Color("#00000000"); // transparent
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

  for (let i = 0; i < maxItems; i++) {
    const event = events[i];
    const days = daysUntil(event.date);

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

    const repeatPath = fm.joinPath(fm.joinPath(fm.documentsDirectory(), ".source"), "repeat_icon.png");
    await fm.downloadFileFromiCloud(repeatPath);
    const repeatIcon = fm.readImage(repeatPath);

    const iconImg = dateRow.addImage(repeatIcon);
    iconImg.imageSize = new Size(dateFontSize, dateFontSize);
    iconImg.tintColor = Color.white();
    dateRow.addSpacer(6);

    createStyledLabel(dateRow, formatDate(event.date), dateFontSize, { lineLimit: 1 });

    row.addSpacer(); // Push right stack to the right

    // Right stack (days number + "days left")
    const rightWrapper = row.addStack();
    rightWrapper.layoutVertically();
    rightWrapper.centerAlignContent();

    const rightStack1 = rightWrapper.addStack();
    rightStack1.layoutHorizontally();
    rightStack1.centerAlignContent();

    const rightPad = rightPaddingMap[days.toString().length] || rightPaddingMap.default;
    rightStack1.setPadding(0, rightPad, 0, 0);

    createStyledLabel(rightStack1, `${days}`, rightNumberSize, "semibold", { alignment: "center" });

    const rightStack2 = rightWrapper.addStack();
    rightStack2.layoutHorizontally();
    rightStack2.centerAlignContent();
    rightWrapper.addSpacer(0);

    createStyledLabel(rightStack2, "days left", rightNumberSize - 5, { alignment: "center" });

    row.addSpacer(mainPadding);

    if (i < maxItems - 1) widget.addSpacer(4);
  }
}

widget.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000);
Script.setWidget(widget);
Script.complete();
