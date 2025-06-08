// countdown widget by jvscholz
// for use in scriptable
// based on: https://github.com/ferraridavide/scriptable/blob/main/days-left.js

// ===================================================
// USER CONFIGURATION
// ===================================================

// STEP 1: Enter your event name (example: "JLPT N1", "Vacation", "Wedding")
const EVENT_NAME = "JLPT N1";

// STEP 2: Set your start and end dates (Format: YYYY, MM-1, DD)
// IMPORTANT: Months are 0-indexed, meaning January=0, February=1, etc.
// Example: December 25, 2024 would be (2024, 11, 25)
const START_DATE = new Date(2024, 8, 26);  // September 26, 2024
const END_DATE = new Date(2025, 6, 15);    // July 15, 2025

// STEP 3: Add your background image URL
// Replace with your own image URL or leave blank for no image
// To use a transparent background, use the transparent script, then upload it to the internet somewhere and link it here
const BG_IMAGE_URL = "imgur.com/meow";

// STEP 4: Customize the appearance (optional)
// Background overlay color and opacity
const BG_COLOR = "#406260";       // Overlay color in hex format
const BG_OVERLAY_OPACITY = 0.5;   // Overlay opacity (0-1)

// Color settings for dots
const COLOR_FILLED = new Color("#ffffff");         // Color for completed days
const COLOR_UNFILLED = new Color("#ffffff", 0.4);  // Color for remaining days

// STEP 5: Layout settings
// These are optimized for iPhone 15 Pro. You may need to adjust for different devices.
// Increase values for larger screens, decrease for smaller screens.
const PADDING = 8;           // Space around the edges of the widget
const CIRCLE_SIZE = 6;       // Size of the progress dots
const CIRCLE_SPACING = 4;    // Space between dots
const TEXT_SPACING = 8;      // Space between dot grid and text
const DOT_SHIFT_LEFT = 2;
const YEAR_OFFSET = DOT_SHIFT_LEFT - 2;
const DAYS_LEFT_OFFSET = 0;


// ===================================================
// ADVANCED CONFIGURATION
// ===================================================

const NOW = new Date();
const MS_PER_DAY = 86400000;

const DAYS_TOTAL = Math.round((END_DATE - START_DATE) / MS_PER_DAY) + 1;
const DAYS_SINCE_START = Math.max(0, Math.round((NOW - START_DATE) / MS_PER_DAY));
const DAYS_UNTIL_END = Math.max(0, Math.round((END_DATE - NOW) / MS_PER_DAY));

const widget = new ListWidget();

let bgImage = null;
try {
    const req = new Request(BG_IMAGE_URL);
    bgImage = await req.loadImage();
} catch (e) {
    console.log("Couldn't load background image");
}

if (bgImage) {
    widget.backgroundImage = bgImage;
}

const overlay = new LinearGradient();
overlay.locations = [0, 1];
overlay.colors = [
    new Color(BG_COLOR, BG_OVERLAY_OPACITY),
    new Color(BG_COLOR, BG_OVERLAY_OPACITY)
];
widget.backgroundGradient = overlay;

const WIDGET_WIDTH = 320;
const AVAILABLE_WIDTH = WIDGET_WIDTH - (2 * PADDING);
const TOTAL_CIRCLE_WIDTH = CIRCLE_SIZE + CIRCLE_SPACING;
const COLUMNS = Math.floor(AVAILABLE_WIDTH / TOTAL_CIRCLE_WIDTH);
const ROWS = Math.ceil(DAYS_TOTAL / COLUMNS);

const MENLO_REGULAR = new Font("Menlo", 12);
const MENLO_BOLD = new Font("Menlo-Bold", 12);

widget.setPadding(12, PADDING, 12, PADDING);

const gridContainer = widget.addStack();
gridContainer.layoutVertically();

const gridStack = gridContainer.addStack();
gridStack.layoutVertically();
gridStack.spacing = CIRCLE_SPACING;

for (let row = 0; row < ROWS; row++) {
  const rowStack = gridStack.addStack();
  rowStack.layoutHorizontally();
  rowStack.addSpacer(DOT_SHIFT_LEFT);
  
  for (let col = 0; col < COLUMNS; col++) {
    const day = row * COLUMNS + col + 1;
    if (day > DAYS_TOTAL) continue;
    
    const circle = rowStack.addText("●");
    circle.font = Font.systemFont(CIRCLE_SIZE);
    circle.textColor = day <= DAYS_SINCE_START ? COLOR_FILLED : COLOR_UNFILLED;
    
    if (col < COLUMNS - 1) rowStack.addSpacer(CIRCLE_SPACING);
  }
}

widget.addSpacer(TEXT_SPACING);

const footer = widget.addStack();
footer.layoutHorizontally();

const eventStack = footer.addStack();
eventStack.addSpacer(YEAR_OFFSET);
const eventText = eventStack.addText(EVENT_NAME);
eventText.font = MENLO_BOLD;
eventText.textColor = COLOR_FILLED;

const daysText = `${DAYS_UNTIL_END} days left`;
const textWidth = daysText.length * 7.5;
const availableSpace = WIDGET_WIDTH - (PADDING * 2) - YEAR_OFFSET - (eventText.text.length * 7.5);
const spacerLength = availableSpace - textWidth + DAYS_LEFT_OFFSET;

footer.addSpacer(spacerLength);

const daysTextStack = footer.addStack();
const daysLeft = daysTextStack.addText(daysText);
daysLeft.font = MENLO_REGULAR;
daysLeft.textColor = COLOR_UNFILLED;

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();
