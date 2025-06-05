// icon-color: purple; icon-glyph: quote-right;

// === Start: Param Handling ===
const defaultCategory = "aurelius";
// const defaultCategory = "kafka";
const defaultSize = config.widgetFamily === "small" ? "s" : config.widgetFamily === "medium" ? "m" : "l";
const validSizes = ["s", "m", "l"];
const validCategories = ["myquotes", "gita", "zen", "machiavelli", "aurelius", "fyodor", "kafka"];

const param = args.widgetParameter ? args.widgetParameter.trim().toLowerCase() : defaultCategory;
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

// === End: Param Handling ===
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


async function getQuoteFromSheet(indexOverride = null) {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${category}`;
    const req = new Request(url);
    let raw;

    try {
      raw = await req.loadString();
    } catch (fetchErr) {
      console.error(`❌ Failed to load sheet tab "${category}"`, fetchErr);
      return { quote: "No quotes available (invalid tab).", author: "" };
    }

    let json;
    try {
      json = JSON.parse(raw.match(/google.visualization.Query.setResponse\((.+)\)/)[1]);
    } catch (parseErr) {
      console.error(`❌ Failed to parse quote JSON from tab "${category}"`, parseErr);
      return { quote: "No quotes available (parse error).", author: "" };
    }

    const rows = json.table.rows.map(r => r.c.map(c => (c ? c.v : "")));
    const usable = rows.filter(r => r[0] && r[1]);
    if (usable.length === 0) return { quote: "No quotes found.", author: "" };

    const dailyIndex = getDailyIndex(usable.length, widgetSize);
    let index = indexOverride !== null ? indexOverride : dailyIndex;
    if (index >= usable.length) index = usable.length - 1;
    if (index < 0) index = 0;

    // let index = dailyIndex;
    let attempts = 0;
    const maxAttempts = usable.length;

    let quote, author, fontHex, bgHex;
    let found = false;

    while (attempts < maxAttempts) {
      // this checks and displays the quote which would fix redaly less of the index entered
      [quote, author, fontHex, bgHex] = usable[index];
      if (!isQuoteTooLong(quote, author, widgetSize)) {
        found = true;
        break;
      }

      // this display the quote at that index even if it is too long
    //   if (indexOverride !== null) {
    //     [quote, author, fontHex, bgHex] = usable[index];
    //   } else {
    //     while (attempts < maxAttempts) {
    //       [quote, author, fontHex, bgHex] = usable[index];
    //       if (!isQuoteTooLong(quote, author, widgetSize)) {
    //         found = true;
    //         break;
    //       }
    //       index = (index + 1) % usable.length;
    //       attempts++;
    //     }

    //     if (!found) {
    //       [quote, author, fontHex, bgHex] = usable[dailyIndex];
    //     }
    //   }

      index = (index + 1) % usable.length;
      attempts++;
    }

    if (!found) {
      [quote, author, fontHex, bgHex] = usable[dailyIndex];
    }

    let fontColor = getColor(fontHex);
    let backgroundColor = getColor(bgHex);

    if (
      fontColor?.hex.toUpperCase() === "#000000" &&
      backgroundColor?.hex.toUpperCase() === "#FFFFFF"
    ) {
      const fallback = getColorPairFromJSON();
      fontColor = fallback.fontColor;
      backgroundColor = fallback.backgroundColor;
    }

    console.log(`📆 Today's quote (${widgetSize}): ${quote} — ${author}`);
    console.log(`🎯 Final index used: ${index}`);
    console.log(`✅ Total quotes available: ${usable.length}`);


    return {
      quote,
      author,
      fontColor,
      backgroundColor
    };
  } catch (err) {
    console.error("🔥 Unexpected error in getQuoteFromSheet()", err);
    return { quote: "Something went wrong.", author: "" };
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
  const totalText = `“${quote}”`;
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
