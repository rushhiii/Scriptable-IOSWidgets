// icon-color: purple; icon-glyph: quote-right;

// === Start: Param Handling ===
const defaultCategory = "machiavelli";
// const defaultCategory = "kafka";
const defaultSize = config.widgetFamily === "small" ? "s" : config.widgetFamily === "medium" ? "m" : "l";
const validSizes = ["s", "m", "l"];
const validCategories = ["myquotes", "gita", "test", "zen", "machiavelli", "aurelius", "fyodor", "kafka"];

// const param = args.widgetParameter ? args.widgetParameter.trim().toLowerCase() : `${defaultCategory}`;
const param = args.widgetParameter ? args.widgetParameter.trim().toLowerCase() : defaultCategory;
// const param = args.widgetParameter ? args.widgetParameter.trim().toLowerCase() : "540";
const parts = param.split(",");
let category = defaultCategory;
let sizeParam = defaultSize;
let forcedIndex = null;

for (const p of parts) {
  const trimmed = p.trim();
  if (validCategories.includes(trimmed)) {
    category = trimmed;
  } else if (validSizes.includes(trimmed)) {
    sizeParam = trimmed;
  } else if (!isNaN(parseInt(trimmed))) {
    forcedIndex = parseInt(trimmed);
  }
}

// Determine widget size fallback
let widgetSize;
if (validSizes.includes(sizeParam)) {
  widgetSize = sizeParam;
} else if (config.widgetFamily === "medium") {
  widgetSize = "m";
} else if (config.widgetFamily === "large") {
  widgetSize = "l";
} else {
  widgetSize = "s";
}

// If category is invalid, just refresh and exit
if (!validCategories.includes(category)) {
  console.warn("⚠️ Invalid category. Refreshing...");
  Script.complete();
  return;
}

const fm = FileManager.iCloud();
// myQuotes, test ,gita, zen, machiavelli, Aurelius, fyodor, kafka
// const defaultParam = "machiavelli";
// const param = args.widgetParameter ? args.widgetParameter.trim().toLowerCase() : "machiavelli";
// const SOURCE = param || "gita"; 
const SHEET_ID = "1amFMwf_j83eRLNOAWnqMNfA3ZyE6igqjZF_OrSNww84";
// const SHEET_TAB = param;
// const SHEET_TAB = category.charAt(0).toUpperCase() + category.slice(1);
const SHEET_TAB = category;
const COLOR_PAIRS_PATH = fm.joinPath(fm.documentsDirectory(), ".source/dark_theme_color_pairs.json");

// === Utilities ===
function getColor(hex) {
  if (!hex || typeof hex !== "string" || !hex.startsWith("#")) return null;
  try {
    return new Color(hex);
  } catch (_) {
    return null;
  }
}

function getColorPairFromJSON() {
  try {
    if (!fm.fileExists(COLOR_PAIRS_PATH)) return null;
    const raw = fm.readString(COLOR_PAIRS_PATH);
    const pairs = JSON.parse(raw);
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    return {
      backgroundColor: getColor(pair.background) || new Color("#000000"),
      fontColor: getColor(pair.font) || Color.white()
    };
  } catch (_) {
    return {
      backgroundColor: new Color("#000000"),
      fontColor: Color.white()
    };
  }
}

async function getQuoteFromSheet(rowNumber = null) {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${category}`;
    const req = new Request(url);
    const raw = await req.loadString();

    const json = JSON.parse(raw.match(/google.visualization.Query.setResponse\((.+)\)/)[1]);
    const rows = json.table.rows.map(r => r.c.map(c => (c ? c.v : "")));

    const usable = rows.filter(r => r[0] && r[1]);

    let row;
    if (rowNumber !== null && rowNumber >= 2) {
      row = rows[rowNumber - 1]; // Spreadsheet row 544 → rows[542]
    }

    if (!row || !row[0]) {
      console.warn(`⚠️ No valid quote at row ${rowNumber}, falling back to filtered random`);

      // Try to find a usable quote that fits the widget size
      const fitting = usable.filter(([q, a]) => !isQuoteTooLong(q, a, widgetSize));

      if (fitting.length > 0) {
        // row = fitting[Math.floor(Math.random() * fitting.length)];
        const dailyIndex = getDailyIndex(fitting.length, widgetSize);
        row = fitting[dailyIndex];

      } else {
        // If none fit, fall back to truly random
        console.warn("⚠️ No short enough quote found, using random long one");
        row = usable[Math.floor(Math.random() * usable.length)];
      }
    }


    const [quote, author, fontHex, bgHex] = row;

    return {
      quote,
      author,
      fontColor: getColor(fontHex),
      backgroundColor: getColor(bgHex)
    };
  } catch (err) {
    console.error("🔥 Error fetching or parsing sheet data:", err);
    return {
      quote: "Something went wrong.",
      author: ""
    };
  }
}



// Utility to get repeatable index based on current day
function getDailyIndex(length, sizeKey) {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const sizeOffset = { s: 1, m: 2, l: 3 };
  return (seed + sizeOffset[sizeKey]) % length;
  //   return 1; // for testing
}

const sfs = 12;
const mfs = 14;
const lfs = 16;

function isQuoteTooLong(quote, author, sizeKey) {
  const totalText = `“${quote}”— ${author}`;
  const length = totalText.length;

  if (sizeKey === "s") {
    return length < 1 || length > 140;
  }

  if (sizeKey === "m") {
    return length <= 140 || length > 260;
  }

  if (sizeKey === "l") {
    return length <= 260; // anything above 260 is fine!
  }

  return false; // fallback safety
}


// === Font Loader ===
function loadCustomFont(fileName, size) {
  const fontPath = fm.joinPath(fm.documentsDirectory(), `.fonts/${fileName}`);
  if (fm.fileExists(fontPath)) {
    return new Font(fileName, size);
  } else {
    console.warn(`⚠️ Font not found: ${fileName}`);
    return Font.systemFont(size);
  }
}

// === Widget ===
async function createWidget() {
  const widget = new ListWidget();
  // const quoteData = await getQuoteFromSheet();
  const quoteData = await getQuoteFromSheet(forcedIndex);

  const fallback = getColorPairFromJSON();

  const bgColor = quoteData.backgroundColor || fallback.backgroundColor;
  const fontColor = quoteData.fontColor || fallback.fontColor;

  widget.backgroundColor = bgColor;

  // Font settings
  // const fontSize = config.widgetFamily === "small" ? 13 : 16;
  const fontSize = widgetSize === "s" ? sfs : widgetSize === "l" ? lfs : mfs;

  // new Font(FONT, fontSize - 3); 
  // loadCustomFont("Roboto-Bold.ttf", fontSize);
  // Font.boldSystemFont(fontSize)
  // loadCustomFont("Roboto-Italic.ttf", fontSize - 3);
  // Font.italicSystemFont(fontSize - 3)

  // // "Avenir-Black"  "Avenir-Heavy" Avenir-Oblique  Roboto
  // 1 style
  // const FONT = "Avenir-Heavy";
  // const quoteFont = new Font(FONT, fontSize);
  // const authorFont = new Font("Avenir-Oblique", fontSize - 3);

  // 2 style
  // const FONT = "Roboto";
  // const quoteFont = new Font(FONT, fontSize);
  // const authorFont = new Font(FONT, fontSize - 3);

  // 3 style
  const quoteFont = Font.boldSystemFont(fontSize);
  const authorFont = Font.italicSystemFont(fontSize - 1);



  const stack = widget.addStack(); // Create a vertical stack
  stack.layoutVertically();
  stack.addSpacer();



  const textStack = stack.addStack();
  textStack.layoutHorizontally();
  // textStack.centerAlignContent();
  // stack.centerAlignContent();
  // textStack.addSpacer();


  // Quote: bold
  const quoteText = textStack.addText(`“${quoteData.quote}”`);
  quoteText.font = quoteFont;
  // quoteText.font = loadCustomFont("Roboto-Bold.ttf", fontSize);
  quoteText.textColor = fontColor;
  // quoteText.minimumScaleFactor = 0.5;
  quoteText.leftAlignText();

  stack.addSpacer();


  // Author: italic
  if (quoteData.author) {
    const textStack = stack.addStack();
    textStack.layoutHorizontally();
    textStack.addSpacer();
    const authorText = textStack.addText(`— ${quoteData.author}`);
    // textStack.addSpacer(0);
    // authorText.font = new Font(FONT, fontSize - 3);
    // authorText.font = loadCustomFont("Roboto-Italic.ttf", fontSize - 3);
    authorText.font = authorFont;
    authorText.textColor = fontColor;
    // authorText.minimumScaleFactor = 0.5;
    authorText.rightAlignText();
  }

  // stack.addSpacer();
  // widget.refreshAfterDate = new Date(Date.now() + 3600000); // refresh hourly

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // exactly at 12:00:00 AM (midnight)
  widget.refreshAfterDate = tomorrow;

  console.log("➡️ Param parts:", parts);
  console.log("📂 Category:", category);
  console.log("📏 Size:", sizeParam);
  console.log("🔢 Forced index:", forcedIndex);


  return widget;
}

// === Run ===
const widget = await createWidget();
if (!config.runsInWidget) await widget.presentSmall();
// if (!config.runsInWidget) await widget.presentMedium();
// if (!config.runsInWidget) await widget.presentLarge();
else Script.setWidget(widget);
Script.complete();
