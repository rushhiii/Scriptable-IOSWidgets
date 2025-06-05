// icon-color: brown; icon-glyph: feather;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// Quote Widget (zenquotes API)

const quoteApiUrl = "https://zenquotes.io/api/today";

const param = args.widgetParameter ? args.widgetParameter.trim().toLowerCase() : "dark";

// === Theme Configuration ===
const THEMES = {
  light: {
    backgroundClr: new Color("#FFFFFF"),
    textClr: new Color("#5A5A5A"),
    accentClr: new Color("#000000")
  },
  dark: {
    backgroundClr: new Color("#000000"),
    textClr: new Color("#AAAAAA"),
    accentClr: new Color("#FAF6E2")
  }
};

// const textClr = new Color("#5A5A5A");
// const accentClr = new Color("#000000");
// const backgroundClr = new Color("#FFFFFF");



const theme = THEMES[param] || THEMES["dark"]; // fallback to light if invalid


async function getFontSize() {
    if(config.widgetFamily === "small"){
        return 15;
    } else if(config.widgetFamily === "medium"){
        return 17;
    } else if(config.widgetFamily === "large"){
        return 23;
    }
    else {
        return 28;
    }
}

const MAX_LINES = 10; // Maximum lines for the quote
const MAX_QUOTE_LENGTH = 300; // Maximum characters for the quote


// zenquotes
async function getRandomQuoteAndAuthor() {
    try {
        const req = new Request(quoteApiUrl);
        const res = await req.loadJSON();
        if (res && res.length > 0 && res[0].q && res[0].a) {
            return {
                quote: res[0].q,
                author: res[0].a,
            };
        } else {
            return {
                quote: "No quotes available today.",
                author: "",
            };
        }
    } catch (error) {
        console.error(`Error fetching quote: ${error}`);
        return {
            quote: "Failed to fetch quote.",
            author: "",
        };
    }
}

async function createWidget() {
    const widget = new ListWidget();
    widget.setPadding(10, 10, 10, 10);
    widget.backgroundColor = theme.backgroundClr;

    const quoteData = await getRandomQuoteAndAuthor();
    let quote = quoteData.quote;
    let author = quoteData.author;

    // Create a vertical stack to center the quote vertically
    const verticalStack = widget.addStack();
    verticalStack.layoutVertically();
    verticalStack.addSpacer(); // Add spacer to push content to the vertical center

    // Quote text
    let quoteFontSize = await getFontSize();
    const quoteText = verticalStack.addText(`“${quote}”`);
    quoteText.textColor = theme.accentClr;
    quoteText.font = Font.boldSystemFont(quoteFontSize);
    quoteText.leftAlignText();
    quoteText.lineLimit = MAX_LINES; // Limit lines
    quoteText.minimumScaleFactor = 0.8; // Allow scaling to fit

    verticalStack.addSpacer();

    if (author) {
        // Dynamic author font size
        let authorFontSize = quoteFontSize - 3; // Make it smaller than the quote
        if (authorFontSize < 10) {
            authorFontSize = 10; // Minimum font size
        }
        const horizontalStack = widget.addStack(); // it is by defualt horizontal
        horizontalStack.addSpacer(); // to pust it right
        const authorText = horizontalStack.addText(`— ${author}`);
        authorText.textColor = theme.textClr;
        authorText.font = Font.italicSystemFont(authorFontSize);
        authorText.leftAlignText();
    }

    return widget;
}

// Main execution
(async () => {
    if (!config.runsInWidget) {
        const widget = await createWidget();
        widget.presentLarge();
    } else {
        Script.setWidget(await createWidget());
    }
    Script.complete();
})();