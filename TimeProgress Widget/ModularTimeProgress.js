// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: hourglass-half;
// Modular Time Progress Widget — supports: day, month, year, weeknumdot, weeknum, week


// Invalid parameter.
// Use 'alarm' , 'day', 'month', 'year', 'weeknumdot', 'weeknum', or 'week'.
const PARAM = args.widgetParameter ? args.widgetParameter.toLowerCase() : "default";

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

async function renderAlarms() {
  // 12-hour format with AM/PM - Alarm Widget
  const alarms = [
    "9:00 PM", // Night
    "5:30 AM", // Arise
  ];

  // const clrBg = new Color("#1e1e1e"); 
  const clrBg = Color.Black;
  const clrTxt = Color.White;
  const clrSubTxt = Color.Gray;


  // === HELPER FUNCTIONS ===
  function parse12HrTimeToDate(timeStr) {
    const [time, modifier] = timeStr.toUpperCase().split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const now = new Date();
    const alarm = new Date(now);
    alarm.setHours(hours, minutes, 0, 0);
    return alarm;
  }

  function getNextAlarmTime(alarmStrings) {
    const now = new Date();
    const todayAlarms = alarmStrings.map(parse12HrTimeToDate).sort((a, b) => a - b);

    for (let alarm of todayAlarms) {
      if (alarm > now) return alarm;
    }

    // If all alarms passed, return first alarm for tomorrow
    const tomorrow = parse12HrTimeToDate(alarmStrings[0]);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  function formatCountdown(ms) {
    const totalSec = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  }

  function format12HrTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    const minuteStr = minutes.toString().padStart(2, '0');
    return `${hours}:${minuteStr} ${ampm}`;
  }

  // === BUILD WIDGET ===

  function createWidget() {
    const nextAlarm = getNextAlarmTime(alarms);
    const countdown = formatCountdown(nextAlarm - new Date());

    const widget = new ListWidget();
    widget.backgroundColor = clrBg;

    const title = widget.addText("⏰ Next Alarm");
    title.font = Font.boldSystemFont(16);
    title.textColor = clrTxt;

    widget.addSpacer(5);

    const timeText = widget.addText(format12HrTime(nextAlarm));
    timeText.font = Font.semiboldSystemFont(22);
    timeText.textColor = clrTxt;

    widget.addSpacer(2);

    const countdownText = widget.addText(`⏳ ${countdown}`);
    countdownText.font = Font.systemFont(16);
    countdownText.textColor = clrSubTxt;

    return widget;
  }

  const widget = await createWidget();

  if (config.runsInWidget) {
    Script.setWidget(widget);
  } else {
    widget.presentMedium();
    // widget.presentSmall();
  }

  Script.complete();
}

async function renderWeekProgressWidget() {
  const BACKGROUND_COLOR = [new Color("#202020"), new Color("#000000")];
  const TITLE_COLOR = "#FFFFFF";
  const DETAILS_COLOR = "#AAAAAA";
  const PROGRESS_COLOR = "#00BFFF";
  const PROGRESS_BG = "#4A4A4A";
  const TITLE_FONT_SIZE = 18;
  const DETAILS_FONT_SIZE = 12;
  const PERCENT_FONT_SIZE = 35;
  const PERCENT_SYMBOL_FONT_SIZE = 14;
  const CANVAS_SIZE = 45;
  const RADIUS = 18;
  const LINE_WIDTH = 7;

  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  const totalMs = endOfWeek - startOfWeek;
  const passedMs = now - startOfWeek;
  const progress = passedMs / totalMs;
  const percentText = Math.floor(progress * 100);

  function drawProgressRing(progress) {
    const context = new DrawContext();
    context.size = new Size(CANVAS_SIZE, CANVAS_SIZE);
    context.opaque = false;
    context.respectScreenScale = true;
    const center = new Point(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    context.setStrokeColor(new Color(PROGRESS_BG));
    context.setLineWidth(LINE_WIDTH);
    context.strokeEllipse(new Rect(center.x - RADIUS, center.y - RADIUS, RADIUS * 2, RADIUS * 2));
    context.setFillColor(new Color(PROGRESS_COLOR));
    const totalDegrees = 360 * progress;
    for (let i = 0; i < totalDegrees; i += 3.6) {
      const angle = (i - 90) * (Math.PI / 180);
      const x = center.x + RADIUS * Math.cos(angle);
      const y = center.y + RADIUS * Math.sin(angle);
      context.fillEllipse(new Rect(x - LINE_WIDTH / 2, y - LINE_WIDTH / 2, LINE_WIDTH, LINE_WIDTH));
    }
    return context.getImage();
  }

  const widget = new ListWidget();
  const gradient = new LinearGradient();
  gradient.colors = BACKGROUND_COLOR;
  gradient.locations = [0, 1];
  widget.backgroundGradient = gradient;
  widget.setPadding(0, 14, 0, 0);
  widget.spacing = 4;

  const circleStack = widget.addStack();
  circleStack.layoutHorizontally();
  const progressImage = drawProgressRing(progress);
  const circleImg = circleStack.addImage(progressImage);
  circleImg.imageSize = new Size(CANVAS_SIZE, CANVAS_SIZE);
  circleImg.leftAlignImage();

  const textStack = widget.addStack();
  textStack.layoutVertically();
  textStack.setPadding(2, 0, 2, 0);
  const titleText = widget.addText(`Week Progress`);
  titleText.textColor = new Color(TITLE_COLOR);
  titleText.font = Font.boldSystemFont(TITLE_FONT_SIZE);
  titleText.leftAlignText();

  const detailsText = widget.addText(`${dayOfWeek}d/7d · Passed`);
  detailsText.textColor = new Color(DETAILS_COLOR);
  detailsText.font = Font.boldSystemFont(DETAILS_FONT_SIZE);
  detailsText.leftAlignText();

  const percentStack = widget.addStack();
  percentStack.centerAlignContent();
  percentStack.spacing = 0;
  const percentValue = percentStack.addText(`${percentText}`);
  percentValue.font = Font.boldSystemFont(PERCENT_FONT_SIZE);
  percentValue.textColor = new Color(TITLE_COLOR);
  const percentSymbol = percentStack.addText(" %");
  percentSymbol.font = Font.boldSystemFont(PERCENT_SYMBOL_FONT_SIZE);
  percentSymbol.textColor = new Color(DETAILS_COLOR);

  Script.setWidget(widget);
  Script.complete();
}

async function renderWeekNumDotWidget() {

  const BACKGROUND_COLOR = [new Color("#202020"), new Color("#000000")];
  const TITLE_COLOR = "#FFFFFF";
  const DETAILS_COLOR = "#AAAAAA";
  const PERCENT_COLOR = "#FFFFFF";
  const DOT_ACTIVE_COLOR = "#FFD700";
  const DOT_INACTIVE_COLOR = "#444444";
  const DOT_CHAR = "●";
  const DOT_SIZE = 8;
  const DOT_SPACING = 4;
  const DOT_ROW_COUNT = 4;

  const TITLE_FONT_SIZE = 18;
  const DETAILS_FONT_SIZE = 12;
  const PERCENT_FONT_SIZE = 32;

  const WIDGET_PADDING_TOP = 18;
  const WIDGET_PADDING_LEFT = 14;
  const WIDGET_PADDING_BOTTOM = 12;
  const WIDGET_PADDING_RIGHT = 14;

  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((now - oneJan) / (24 * 60 * 60 * 1000));
  const currentWeek = Math.ceil((oneJan.getDay() + 1 + numberOfDays) / 7);
  const totalWeeks = 52;
  const percentText = Math.round((currentWeek / totalWeeks) * 100);

  const widget = new ListWidget();
  const gradient = new LinearGradient();
  gradient.colors = BACKGROUND_COLOR;
  gradient.locations = [0, 1];
  widget.backgroundGradient = gradient;
  widget.setPadding(WIDGET_PADDING_TOP, WIDGET_PADDING_LEFT, WIDGET_PADDING_BOTTOM, WIDGET_PADDING_RIGHT);

  // === DOT GRID ===
  const totalDots = totalWeeks;
  const dotsPerRow = Math.ceil(totalDots / DOT_ROW_COUNT);
  const dotsStack = widget.addStack();
  dotsStack.layoutVertically();
  dotsStack.spacing = DOT_SPACING;

  for (let row = 0; row < DOT_ROW_COUNT; row++) {
    const rowStack = dotsStack.addStack();
    rowStack.layoutHorizontally();
    rowStack.spacing = DOT_SPACING;
    for (let col = 0; col < dotsPerRow; col++) {
      const index = row * dotsPerRow + col + 1;
      if (index > totalDots) break;
      const dot = rowStack.addText(DOT_CHAR);
      dot.textColor = new Color(index <= currentWeek ? DOT_ACTIVE_COLOR : DOT_INACTIVE_COLOR);
      dot.font = Font.mediumMonospacedSystemFont(DOT_SIZE);
    }
  }

  widget.addSpacer(8);

  // === TITLE ===
  const title = widget.addText(`Week ${currentWeek}`);
  title.textColor = new Color(TITLE_COLOR);
  title.font = Font.boldSystemFont(TITLE_FONT_SIZE);
  title.leftAlignText();

  widget.addSpacer(2);

  // === DETAILS ===
  const details = widget.addText(`${currentWeek}w/${totalWeeks}w · Passed`);
  details.textColor = new Color(DETAILS_COLOR);
  details.font = Font.boldSystemFont(DETAILS_FONT_SIZE);
  details.leftAlignText();

  widget.addSpacer(5);

  // === PERCENT ===
  const percentStack = widget.addStack();
  percentStack.centerAlignContent();
  const percentValue = percentStack.addText(`${percentText}`);
  percentValue.font = Font.boldSystemFont(PERCENT_FONT_SIZE);
  percentValue.textColor = new Color(PERCENT_COLOR);
  const percentSymbol = percentStack.addText(" %");
  percentSymbol.font = Font.mediumSystemFont(DETAILS_FONT_SIZE);
  percentSymbol.textColor = new Color(DETAILS_COLOR);

  Script.setWidget(widget);
  widget.presentSmall();
  Script.complete();


}

async function renderDayProgressWidget() {
  // --- Customizable Variables ---
  const WIDGET_BACKGROUND_COLOR_1 = "#202020";
  const WIDGET_BACKGROUND_COLOR_2 = "#000000";
  const PROGRESS_COLOR = "#00B700";
  const PROGRESS_BACKGROUND_COLOR = "#4a4a4a";
  const TITLE_COLOR = "#ffffff";
  const DETAILS_COLOR = "#aaaaaa";
  const PERCENT_COLOR = "#ffffff";
  const PERCENT_SYMBOL_COLOR = "#aaaaaa";

  const CANVAS_SIZE = 45;
  const RADIUS = 18;
  const LINE_WIDTH = 7;

  const TITLE_FONT_SIZE = 18;
  const DETAILS_FONT_SIZE = 12;
  const PERCENT_FONT_SIZE = 35;
  const PERCENT_SYMBOL_FONT_SIZE = 14;

  const WIDGET_PADDING_TOP = 0;
  const WIDGET_PADDING_LEFT = 14;
  const WIDGET_PADDING_BOTTOM = 0;
  const WIDGET_PADDING_RIGHT = 0;
  const WIDGET_SPACING = 4;

  const CIRCLE_PADDING_TOP = 0;
  const CIRCLE_PADDING_LEFT = 0;
  const CIRCLE_PADDING_BOTTOM = 0;
  const CIRCLE_PADDING_RIGHT = 0;

  const TEXT_PADDING_TOP = 2;
  const TEXT_PADDING_BOTTOM = 2;
  const TEXT_PADDING_LEFT = 0;
  const TEXT_PADDING_RIGHT = 0;

  const PERCENT_PADDING_TOP = 0;
  const PERCENT_PADDING_LEFT = 0;
  const PERCENT_PADDING_BOTTOM = 0;
  const PERCENT_PADDING_RIGHT = 0;
  const PERCENT_SPACING = 0;

  // --- End Customizable Variables ---

  // Get current date
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDay = today;
  const endOfDay = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  // Calculate day progress
  const msInHour = 1000 * 60 * 60;
  const hoursPassed = Math.floor((now.getTime() - startOfDay.getTime()) / msInHour);
  const totalHoursInDay = 24;
  const progress = hoursPassed / totalHoursInDay;
  const percentText = Math.ceil(progress * 100); // Round up to the nearest integer

  // Function to draw the progress ring
  function drawProgressRing(progress) {
    const context = new DrawContext();
    context.size = new Size(CANVAS_SIZE, CANVAS_SIZE);
    context.opaque = false;
    context.respectScreenScale = true;

    const center = new Point(CANVAS_SIZE / 2, CANVAS_SIZE / 2);

    // Background circle
    context.setStrokeColor(new Color(PROGRESS_BACKGROUND_COLOR));
    context.setLineWidth(LINE_WIDTH);
    context.strokeEllipse(new Rect(
      center.x - RADIUS,
      center.y - RADIUS,
      RADIUS * 2,
      RADIUS * 2
    ));

    // Progress dots
    context.setFillColor(new Color(PROGRESS_COLOR));
    const totalDegrees = 360 * progress;

    for (let i = 0; i < totalDegrees; i += 3.6) {
      const angle = (i - 90) * (Math.PI / 180);
      const x = center.x + RADIUS * Math.cos(angle);
      const y = center.y + RADIUS * Math.sin(angle);
      context.fillEllipse(
        new Rect(x - LINE_WIDTH / 2, y - LINE_WIDTH / 2, LINE_WIDTH, LINE_WIDTH)
      );
    }

    return context.getImage();
  }

  // Create widget
  const widget = new ListWidget();
  const gradient = new LinearGradient();
  gradient.colors = [new Color(WIDGET_BACKGROUND_COLOR_1), new Color(WIDGET_BACKGROUND_COLOR_2)];
  gradient.locations = [0, 1];
  widget.backgroundGradient = gradient;
  widget.setPadding(WIDGET_PADDING_TOP, WIDGET_PADDING_LEFT, WIDGET_PADDING_BOTTOM, WIDGET_PADDING_RIGHT);
  widget.spacing = WIDGET_SPACING;

  // Top-left progress circle
  const circleStack = widget.addStack();
  circleStack.layoutHorizontally();
  circleStack.setPadding(CIRCLE_PADDING_TOP, CIRCLE_PADDING_LEFT, CIRCLE_PADDING_BOTTOM, CIRCLE_PADDING_RIGHT);
  const progressImage = drawProgressRing(progress);
  const circleImg = circleStack.addImage(progressImage);
  circleImg.imageSize = new Size(CANVAS_SIZE, CANVAS_SIZE);
  circleImg.leftAlignImage();

  // Add text block
  const textStack = widget.addStack();
  textStack.layoutVertically();


  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  const titleText = widget.addText(`${dayName}`); // Use dayName here
  // const titleText = widget.addText(`Today`);
  titleText.textColor = new Color(TITLE_COLOR);
  titleText.font = Font.boldSystemFont(TITLE_FONT_SIZE);
  titleText.leftAlignText();
  textStack.setPadding(TEXT_PADDING_TOP, TEXT_PADDING_LEFT, TEXT_PADDING_BOTTOM, TEXT_PADDING_RIGHT);

  const detailsText = widget.addText(`${hoursPassed}h/${totalHoursInDay}h · Passed`);
  detailsText.textColor = new Color(DETAILS_COLOR);
  detailsText.font = Font.boldSystemFont(DETAILS_FONT_SIZE);
  detailsText.leftAlignText();

  // Add percentage display
  const percentStack = widget.addStack();
  percentStack.setPadding(PERCENT_PADDING_TOP, PERCENT_PADDING_LEFT, PERCENT_PADDING_BOTTOM, PERCENT_PADDING_RIGHT);
  percentStack.centerAlignContent();
  percentStack.spacing = PERCENT_SPACING;

  const percentValue = percentStack.addText(`${percentText}`);
  percentValue.font = Font.boldSystemFont(PERCENT_FONT_SIZE);
  percentValue.textColor = new Color(PERCENT_COLOR);

  const percentSymbol = percentStack.addText(" %");
  percentSymbol.font = Font.boldSystemFont(PERCENT_SYMBOL_FONT_SIZE);
  percentSymbol.textColor = new Color(PERCENT_SYMBOL_COLOR);
  percentSymbol.lineLimit = 1;

  // Finalize
  Script.setWidget(widget);
  widget.presentSmall();
  Script.complete();


}


async function renderMonthProgressWidget() {
  // --- Customizable Variables ---
  // const WIDGET_BACKGROUND_COLOR = "#438C95"; // #84C5CD, 
  const BACKGROUND_COLOR = [
    new Color("#202020"), // #438C95  
    new Color("#000000"), // #84C5CD
  ];
  const TITLE_COLOR = "#FFFFFF";
  const DETAILS_COLOR = "#9B9B9B";
  const PERCENT_COLOR = "#FFFFFF";
  const DOT_ACTIVE_COLOR = "#FFD700"; // 
  // const DOT_INACTIVE_COLOR = "#FFFFFF33"; // Faded white
  const DOT_INACTIVE_COLOR = "#9B9B9B"; // Faded white
  const DOT_CHAR = "●"; // Thicker dot
  const DOT_SIZE = 8;
  const DOT_SPACING = 7;
  const DOT_ROW_COUNT = 3;

  const TITLE_FONT_SIZE = 18;
  const DETAILS_FONT_SIZE = 12;
  const PERCENT_FONT_SIZE = 35;

  const WIDGET_PADDING_TOP = 20;
  const WIDGET_PADDING_LEFT = 15;
  const WIDGET_PADDING_BOTTOM = 10;
  const WIDGET_PADDING_RIGHT = 15;
  // --- End Customizable Variables ---

  // Function to create a gradient background 
  function createGradientBackground(widget, colors) {
    const gradient = new LinearGradient();
    gradient.colors = colors;
    gradient.locations = [0, 1];
    widget.backgroundGradient = gradient;
  }

  // Load custom Roboto font
  // const fm = FileManager.iCloud();
  // const fontPath = fm.joinPath(fm.documentsDirectory(), ".fonts/Roboto-Regular.ttf");
  // await fm.downloadFileFromiCloud(fontPath);
  // const robotoFont = new Font("Roboto", 24); // Size will be overridden per use


  // Get current date info
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const dayOfMonth = now.getDate();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const progress = dayOfMonth / daysInMonth;
  const percentText = Math.round(progress * 100);
  const monthName = now.toLocaleDateString('en-US', { month: 'long' });

  // Create widget
  const widget = new ListWidget();
  // widget.backgroundColor = new Color();
  createGradientBackground(widget, BACKGROUND_COLOR); // Apply the gradient background
  widget.setPadding(WIDGET_PADDING_TOP, WIDGET_PADDING_LEFT, WIDGET_PADDING_BOTTOM, WIDGET_PADDING_RIGHT);

  // === Dots ===
  const totalDots = daysInMonth;
  const dotsPerRow = Math.ceil(totalDots / DOT_ROW_COUNT);
  const dotsStack = widget.addStack();
  dotsStack.layoutVertically();
  dotsStack.spacing = DOT_SPACING;




  for (let row = 0; row < DOT_ROW_COUNT; row++) {
    const rowStack = dotsStack.addStack();
    rowStack.layoutHorizontally();
    rowStack.spacing = DOT_SPACING;

    for (let col = 0; col < dotsPerRow; col++) {
      const index = row * dotsPerRow + col + 1;
      if (index > totalDots) break;

      const dot = rowStack.addText(DOT_CHAR);
      dot.textColor = new Color(index <= dayOfMonth ? DOT_ACTIVE_COLOR : DOT_INACTIVE_COLOR);
      dot.font = Font.mediumMonospacedSystemFont(DOT_SIZE);
    }
  }

  const a = 5;

  widget.addSpacer(a + 5);



  // === Month Title ===
  const title = widget.addText(monthName);
  title.textColor = new Color(TITLE_COLOR);
  title.font = Font.boldSystemFont(TITLE_FONT_SIZE); // new Font("Roboto",
  // title.font = new Font("Roboto",TITLE_FONT_SIZE);
  title.leftAlignText();

  widget.addSpacer(3);

  // === Detail Text ===
  const details = widget.addText(`${dayOfMonth}d/${daysInMonth}d · Passed`);
  details.textColor = new Color(DETAILS_COLOR);
  details.font = Font.boldSystemFont(DETAILS_FONT_SIZE);
  details.leftAlignText();

  widget.addSpacer(a);



  // // === Percentage Text ===
  // const percent = widget.addText(`${percentText}`);
  // percent.textColor = new Color(PERCENT_COLOR);
  // percent.font = Font.boldSystemFont(PERCENT_FONT_SIZE);
  // const percentSymbol = widget.addText("%");
  // percentSymbol.font = Font.systemFont(DETAILS_FONT_SIZE);
  // percentSymbol.textColor = new Color(DETAILS_COLOR);
  // percent.leftAlignText();


  // === Percentage Text (with % symbol side by side) ===
  const percentStack = widget.addStack();
  percentStack.centerAlignContent(); // Center the stack itself
  // percentStack.layoutHorizontally();

  const percent = percentStack.addText(`${percentText}`);
  percent.textColor = new Color(PERCENT_COLOR);
  percent.font = Font.boldSystemFont(PERCENT_FONT_SIZE); // new Font("Roboto",
  // percent.font = new Font("Roboto",PERCENT_FONT_SIZE);

  // percentStack.addSpacer(4); // optional spacing between number and %



  const percentSymbol = percentStack.addText(" %");
  // percentSymbol.font = Font.mediumRoundedSystemFont(PERCENT_FONT_SIZE * 0.5);
  percentSymbol.font = Font.boldSystemFont(DETAILS_FONT_SIZE);
  percentSymbol.textColor = new Color(DETAILS_COLOR);
  // percentSymbol.leftAlignText(); // Align the symbol to the bottom
  // percentSymbol.baselineOffset = -16; // slight raise for alignment



  // Done
  Script.setWidget(widget);
  widget.presentSmall(); // For testing
  Script.complete();

}


async function renderYearProgressWidget() {
  // icon-color: gold; icon-glyph: chart-pie;

  // --- Customizable Variables ---
  const WIDGET_BACKGROUND_COLOR_1 = "#202020"; // Top gradient
  const WIDGET_BACKGROUND_COLOR_2 = "#000000"; // Bottom gradient
  const PROGRESS_COLOR = "#FFD700";
  const PROGRESS_BACKGROUND_COLOR = "#4a4a4a";
  const TITLE_COLOR = "#ffffff";
  const DETAILS_COLOR = "#aaaaaa";
  const PERCENT_COLOR = "#ffffff";
  const PERCENT_SYMBOL_COLOR = "#aaaaaa";

  const CANVAS_SIZE = 45;
  const RADIUS = 18;
  const LINE_WIDTH = 7;

  const TITLE_FONT_SIZE = 18;
  const DETAILS_FONT_SIZE = 12;
  const PERCENT_FONT_SIZE = 35;
  const PERCENT_SYMBOL_FONT_SIZE = 14;

  const WIDGET_PADDING_TOP = 0;
  const WIDGET_PADDING_LEFT = 14;
  const WIDGET_PADDING_BOTTOM = 0;
  const WIDGET_PADDING_RIGHT = 0;
  const WIDGET_SPACING = 4;

  const CIRCLE_PADDING_TOP = 0;
  const CIRCLE_PADDING_LEFT = 0;
  const CIRCLE_PADDING_BOTTOM = 0;
  const CIRCLE_PADDING_RIGHT = 0;

  const TEXT_PADDING_TOP = 2;
  const TEXT_PADDING_BOTTOM = 2;
  const TEXT_PADDING_LEFT = 0;
  const TEXT_PADDING_RIGHT = 0;

  const PERCENT_PADDING_TOP = 0;
  const PERCENT_PADDING_LEFT = 0;
  const PERCENT_PADDING_BOTTOM = 0;
  const PERCENT_PADDING_RIGHT = 0;
  const PERCENT_SPACING = 0;
  // --- End Customizable Variables ---

  // Get current date and year
  const NOW = new Date();
  const currentYear = NOW.getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear + 1, 0, 1);
  const daysPassed = Math.floor((NOW - startOfYear) / 86400000) + 1;
  const totalDays = Math.floor((endOfYear - startOfYear) / 86400000);
  const progress = daysPassed / totalDays;

  // === Truncate percent instead of rounding ===
  const rawPercent = progress * 100;
  const percent = Math.floor(rawPercent * 100) / 100;
  const percentText = percent.toFixed(2);

  function createProgressBarImage(total, current, width, height, fillColor, backgroundColor) {
    const context = new DrawContext();
    context.size = new Size(width, height);
    context.opaque = false;
    context.respectScreenScale = true;

    // Draw background bar
    const bgPath = new Path();
    bgPath.addRoundedRect(new Rect(0, 0, width, height), height / 2, height / 2);
    context.setFillColor(backgroundColor);
    context.addPath(bgPath);
    context.fillPath();

    // Draw filled portion
    const progressWidth = Math.floor(width * Math.min(current / total, 1));
    const fillPath = new Path();
    fillPath.addRoundedRect(new Rect(0, 0, progressWidth, height), height / 2, height / 2);
    context.setFillColor(fillColor);
    context.addPath(fillPath);
    context.fillPath();

    return context.getImage();
  }


  // === Draw circular progress ===
  function drawProgressRing(progress) {
    const context = new DrawContext();
    context.size = new Size(CANVAS_SIZE, CANVAS_SIZE);
    context.opaque = false;
    context.respectScreenScale = true;

    const center = new Point(CANVAS_SIZE / 2, CANVAS_SIZE / 2);

    // Background circle
    context.setStrokeColor(new Color(PROGRESS_BACKGROUND_COLOR));
    context.setLineWidth(LINE_WIDTH);
    context.strokeEllipse(new Rect(
      center.x - RADIUS,
      center.y - RADIUS,
      RADIUS * 2,
      RADIUS * 2
    ));

    // Progress dots
    context.setFillColor(new Color(PROGRESS_COLOR));
    const totalDegrees = 360 * progress;
    for (let i = 0; i < totalDegrees; i += 3.6) {
      const angle = (i - 90) * (Math.PI / 180);
      const x = center.x + RADIUS * Math.cos(angle);
      const y = center.y + RADIUS * Math.sin(angle);
      context.fillEllipse(
        new Rect(x - LINE_WIDTH / 2, y - LINE_WIDTH / 2, LINE_WIDTH, LINE_WIDTH)
      );
    }

    return context.getImage();
  }

  let widget;

  if (config.widgetFamily === "large") {
    // === LARGE LAYOUT (dot-grid) ===
    widget = new ListWidget();
    widget.backgroundColor = new Color("#000000");

    // === Config ===
    const PADDING = 20; // 26
    const CIRCLE_SIZE = 9;
    const CIRCLE_SPACING = 5;
    const TEXT_SPACING = 18;
    const GOLD_FILLED = new Color("#FFD700");
    const GOLD_DIMMED = new Color("#FFD700", 0.25);

    const AVAILABLE_WIDTH = 360 - (2 * PADDING);
    const TOTAL_CIRCLE_SIZE = CIRCLE_SIZE + CIRCLE_SPACING;
    const COLUMNS = Math.floor(AVAILABLE_WIDTH / TOTAL_CIRCLE_SIZE);
    const ROWS = Math.ceil(365 / COLUMNS);

    widget.setPadding(PADDING, PADDING, PADDING, PADDING);
    // widget.useDefaultPadding();



    // === Center container stack ===
    const mainStack = widget.addStack();
    mainStack.layoutVertically();
    mainStack.centerAlignContent();

    // const footerStack = mainStack.addStack();
    // footerStack.centerAlignContent();
    // footerStack.layoutHorizontally();
    // footerStack.topAlignContent();
    // footerStack.layoutVertically();



    // mainStack.addSpacer(TEXT_SPACING-10);


    // === Dot grid ===
    const gridStack = mainStack.addStack();
    gridStack.layoutVertically();
    gridStack.centerAlignContent();
    gridStack.spacing = CIRCLE_SPACING;

    const circleFont = Font.systemFont(CIRCLE_SIZE);

    for (let row = 0; row < ROWS; row++) {
      const rowStack = gridStack.addStack();
      rowStack.layoutHorizontally();
      rowStack.centerAlignContent();
      rowStack.spacing = CIRCLE_SPACING;

      for (let col = 0; col < COLUMNS; col++) {
        const day = row * COLUMNS + col + 1;
        if (day > 365) continue;

        const circle = rowStack.addText("●");
        circle.font = circleFont;
        circle.lineLimit = 1;
        circle.textColor = day <= daysPassed ? GOLD_FILLED : GOLD_DIMMED;
      }
    }

    mainStack.addSpacer(TEXT_SPACING - 8);

    // === Day count text ===

    // footerStack.addSpacer();

    const yearText = mainStack.addText(`${currentYear} Progress`);
    yearText.font = new Font("Menlo", 14);
    // yearText.textColor = GOLD_FILLED;
    yearText.textColor = Color.white();

    mainStack.addSpacer(3);

    const dayspasstext = mainStack.addText(`${daysPassed}d/${totalDays}d · Passed`);
    dayspasstext.font = new Font("Menlo", 12);
    // dayspasstext.textColor = GOLD_FILLED;
    dayspasstext.textColor = new Color(DETAILS_COLOR);

  }

  else if (config.widgetFamily === "medium") {
    widget = new ListWidget();
    const gradient = new LinearGradient();
    gradient.colors = [new Color(WIDGET_BACKGROUND_COLOR_1), new Color(WIDGET_BACKGROUND_COLOR_2)];
    gradient.locations = [0, 1];
    widget.backgroundGradient = gradient;
    //   widget.setPadding(16, 16, 16, 16);
    // const PADDING = 20; 
    // widget.setPadding(PADDING, PADDING, PADDING, PADDING);
    widget.useDefaultPadding();


    const mainStack = widget.addStack();
    mainStack.layoutVertically();
    mainStack.size = new Size(0, 0); // force auto sizing
    mainStack.layoutVertically();
    //   mainStack.layoutHorizontally();

    mainStack.addSpacer(); // pushes the ring to the bottom


    // === Top-left Text Stack ===
    const textStack = mainStack.addStack();
    textStack.layoutVertically();
    textStack.spacing = 4;
    //   textStack.leftAlign();

    const title = textStack.addText(`${currentYear} Progress`);
    title.font = Font.boldSystemFont(27);
    title.textColor = new Color(TITLE_COLOR);


    const subtext = textStack.addText(`${daysPassed}d / ${totalDays}d · Passed`);
    subtext.font = Font.mediumSystemFont(16);
    subtext.textColor = new Color(DETAILS_COLOR);


    const percentTextStack = textStack.addStack();
    percentTextStack.layoutHorizontally();
    percentTextStack.spacing = 2;
    //   percentTextStack.leftAlign();

    const percentVal = percentTextStack.addText(`${percentText}`);
    percentVal.font = Font.boldSystemFont(25);
    percentVal.textColor = new Color(PERCENT_COLOR);

    const percentSym = percentTextStack.addText("%");
    percentSym.font = Font.boldSystemFont(24);
    percentSym.textColor = new Color(PERCENT_SYMBOL_COLOR);
    //   percentSym.centerAlignText();


    mainStack.addSpacer(); // pushes the ring to the bottom

    // === Bottom-right Ring Stack ===
    //   const ringStack = mainStack.addStack();
    //   ringStack.layoutVertically();
    //   ringStack.addSpacer(); // pushes ring to far right

    //   const ringImg = drawProgressRing(progress);
    //   const ring = ringStack.addImage(ringImg);
    //   ring.imageSize = new Size(55, 55);

    // === Bottom-right Progress Bar ===
    const barStack = mainStack.addStack();
    //   barStack.layoutVertically();
    //   barStack.addSpacer(5);

    const barWidth = 329;
    const barHeight = 12;

    const progressBarImage = createProgressBarImage(
      totalDays, daysPassed,
      barWidth, barHeight,
      new Color(PROGRESS_COLOR),
      new Color(PROGRESS_COLOR, 0.25)
    );

    const progressImage = barStack.addImage(progressBarImage);
    progressImage.imageSize = new Size(barWidth, barHeight);

    mainStack.addSpacer(); // pushes the ring to the bottom

  } else {


    // === Create widget layout ===
    widget = new ListWidget();
    const gradient = new LinearGradient();
    gradient.colors = [new Color(WIDGET_BACKGROUND_COLOR_1), new Color(WIDGET_BACKGROUND_COLOR_2)];
    gradient.locations = [0, 1];
    widget.backgroundGradient = gradient;
    widget.setPadding(WIDGET_PADDING_TOP, WIDGET_PADDING_LEFT, WIDGET_PADDING_BOTTOM, WIDGET_PADDING_RIGHT);
    widget.spacing = WIDGET_SPACING;

    // Top-left progress circle
    const circleStack = widget.addStack();
    circleStack.layoutHorizontally();
    circleStack.setPadding(CIRCLE_PADDING_TOP, CIRCLE_PADDING_LEFT, CIRCLE_PADDING_BOTTOM, CIRCLE_PADDING_RIGHT);
    const progressImage = drawProgressRing(progress);
    const circleImg = circleStack.addImage(progressImage);
    circleImg.imageSize = new Size(CANVAS_SIZE, CANVAS_SIZE);
    circleImg.leftAlignImage();

    // Text block below
    const textStack = widget.addStack();
    textStack.layoutVertically();

    const titleText = widget.addText(`${currentYear} Progress`);
    titleText.textColor = new Color(TITLE_COLOR);
    titleText.font = Font.boldSystemFont(TITLE_FONT_SIZE);
    titleText.leftAlignText();
    textStack.setPadding(TEXT_PADDING_TOP, TEXT_PADDING_LEFT, TEXT_PADDING_BOTTOM, TEXT_PADDING_RIGHT);

    const detailsText = widget.addText(`${daysPassed}d/${totalDays}d · Passed`);
    detailsText.textColor = new Color(DETAILS_COLOR);
    detailsText.font = Font.boldSystemFont(DETAILS_FONT_SIZE);
    detailsText.leftAlignText();

    // Percentage display
    const percentStack = widget.addStack();
    percentStack.setPadding(PERCENT_PADDING_TOP, PERCENT_PADDING_LEFT, PERCENT_PADDING_BOTTOM, PERCENT_PADDING_RIGHT);
    percentStack.centerAlignContent();
    percentStack.spacing = PERCENT_SPACING;

    const percentValue = percentStack.addText(`${percentText}`);
    percentValue.font = Font.boldSystemFont(PERCENT_FONT_SIZE);
    percentValue.textColor = new Color(PERCENT_COLOR);

    const percentSymbol = percentStack.addText(" %");
    percentSymbol.font = Font.boldSystemFont(PERCENT_SYMBOL_FONT_SIZE);
    percentSymbol.textColor = new Color(PERCENT_SYMBOL_COLOR);
    percentSymbol.lineLimit = 1;

  }
  // === Run widget ===
  if (config.runsInWidget) {
    Script.setWidget(widget);
  } else {
    if (config.widgetFamily === "large") {
      await widget.presentLarge();
    } else {
      await widget.presentSmall();
    }
  }
  Script.complete();

}

async function renderWeekNumRingWidget() {
  const BACKGROUND_COLOR = [new Color("#202020"), new Color("#000000")];
  const TITLE_COLOR = "#FFFFFF";
  const DETAILS_COLOR = "#AAAAAA";
  const PERCENT_COLOR = "#FFFFFF";
  const PERCENT_SYMBOL_COLOR = "#AAAAAA";

  const CANVAS_SIZE = 45;
  const RADIUS = 18;
  const LINE_WIDTH = 7;

  const TITLE_FONT_SIZE = 18;
  const DETAILS_FONT_SIZE = 12;
  const PERCENT_FONT_SIZE = 35;
  const PERCENT_SYMBOL_FONT_SIZE = 14;

  const WIDGET_PADDING_TOP = 10;
  const WIDGET_PADDING_LEFT = 14;
  const WIDGET_PADDING_BOTTOM = 10;
  const WIDGET_PADDING_RIGHT = 14;

  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((now - oneJan) / (24 * 60 * 60 * 1000));
  const currentWeek = Math.ceil((oneJan.getDay() + 1 + numberOfDays) / 7);
  const totalWeeks = 52;
  const progress = currentWeek / totalWeeks;
  const percentText = Math.round(progress * 100);

  function drawProgressRing(progress) {
    const context = new DrawContext();
    context.size = new Size(CANVAS_SIZE, CANVAS_SIZE);
    context.opaque = false;
    context.respectScreenScale = true;

    const center = new Point(CANVAS_SIZE / 2, CANVAS_SIZE / 2);

    context.setStrokeColor(new Color("#4a4a4a"));
    context.setLineWidth(LINE_WIDTH);
    context.strokeEllipse(new Rect(center.x - RADIUS, center.y - RADIUS, RADIUS * 2, RADIUS * 2));

    context.setFillColor(new Color("#FFD700"));
    const totalDegrees = 360 * progress;
    for (let i = 0; i < totalDegrees; i += 3.6) {
      const angle = (i - 90) * (Math.PI / 180);
      const x = center.x + RADIUS * Math.cos(angle);
      const y = center.y + RADIUS * Math.sin(angle);
      context.fillEllipse(new Rect(x - LINE_WIDTH / 2, y - LINE_WIDTH / 2, LINE_WIDTH, LINE_WIDTH));
    }

    return context.getImage();
  }

  const widget = new ListWidget();
  const gradient = new LinearGradient();
  gradient.colors = BACKGROUND_COLOR;
  gradient.locations = [0, 1];
  widget.backgroundGradient = gradient;
  widget.setPadding(WIDGET_PADDING_TOP, WIDGET_PADDING_LEFT, WIDGET_PADDING_BOTTOM, WIDGET_PADDING_RIGHT);
  widget.spacing = 4;

  const circleStack = widget.addStack();
  circleStack.layoutHorizontally();
  const progressImage = drawProgressRing(progress);
  const circleImg = circleStack.addImage(progressImage);
  circleImg.imageSize = new Size(CANVAS_SIZE, CANVAS_SIZE);
  circleImg.leftAlignImage();

  const textStack = widget.addStack();
  textStack.layoutVertically();

  const titleText = widget.addText("Week Progress");
  titleText.textColor = new Color(TITLE_COLOR);
  titleText.font = Font.boldSystemFont(TITLE_FONT_SIZE);
  titleText.leftAlignText();

  const detailsText = widget.addText(`${currentWeek}w/${totalWeeks}w · Passed`);
  detailsText.textColor = new Color(DETAILS_COLOR);
  detailsText.font = Font.boldSystemFont(DETAILS_FONT_SIZE);
  detailsText.leftAlignText();

  const percentStack = widget.addStack();
  percentStack.centerAlignContent();
  const percentValue = percentStack.addText(`${percentText}`);
  percentValue.font = Font.boldSystemFont(PERCENT_FONT_SIZE);
  percentValue.textColor = new Color(PERCENT_COLOR);

  const percentSymbol = percentStack.addText(" %");
  percentSymbol.font = Font.boldSystemFont(PERCENT_SYMBOL_FONT_SIZE);
  percentSymbol.textColor = new Color(PERCENT_SYMBOL_COLOR);

  Script.setWidget(widget);
  widget.presentSmall();
  Script.complete();
}


async function renderDefaultProgressWidget() {
  // Configuration - Customizable Theme and Features
  const REFRESH_INTERVAL = 1; // Seconds for live updates in preview mode
  const textColorTitle = new Color("#FFFFFF"); // Title Text Color
  const textColorProgress = new Color("#FFFFFF"); // Progress Bar Text Color
  const backgroundColor = new LinearGradient();
  backgroundColor.colors = [new Color("#202020"), new Color("#000000")]; // Dark gradient background

  // backgroundColor.colors = [new Color("#2C3E50"), new Color("#4A6572")]; // Dark gradient background
  // backgroundColor.colors = [new Color("#333333"), new Color("#121212")]; // Dark gradient background
  backgroundColor.locations = [0, 1];
  const progressBackground = new Color("#444444"); // Darker progress bar background
  const progressFillColor = new LinearGradient();
  // progressFillColor.colors = [new Color("#64B5F6"), new Color("#2196F3")]; // Blue gradient progress fill
  progressFillColor.colors = [new Color("#FFD700"), new Color("#FFA500")]; // Golden gradient progress fill
  progressFillColor.locations = [0, 1];
  const titleFontSmall = Font.boldSystemFont(14); // Slightly larger for readability
  const titleFontMedium = Font.boldSystemFont(16);
  const progressFont = Font.systemFont(12);
  const spacerHeightSmall = 4;
  const spacerHeightMedium = 8;
  const progressBarHeightSmall = 5;
  const progressBarHeightMedium = 10;
  const progressBarWidthSmall = 120; // Adjusted width
  const progressBarWidthMedium = 0; // Set to 0, will be calculated later

  // Data to Track and Labels
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  const trackingData = [
    {
      total: 24 * 60,
      gone: now.getHours() * 60 + now.getMinutes(),
      label: "Today"
    },
    {
      total: 7,
      gone: (now.getDay() + 6) % 7 + 1, // Mon = 1, Sun = 7
      label: "This Week"
    },
    {
      total: daysInMonth,
      gone: now.getDate(),
      label: "This Month"
    },
    {
      total: 12,
      gone: now.getMonth() + 1,
      label: "This Year"
    }
  ];

  const isLeap = isLeapYear(now.getFullYear());


  if (now.getMonth() === 1 && isLeap && now.getDate() === 29) {
    // Add a special message for Leap Year Bonus Day
    const widget = new ListWidget();
    widget.backgroundGradient = backgroundColor; // Apply gradient background
    widget.setPadding(10, 10, 10, 10); // Set padding for the widget
    widget.addSpacer(10); // Add some space at the top
    const titleStack = widget.addStack();
    titleStack.layoutHorizontally();
    titleStack.centerAlignContent();
    const titleText = titleStack.addText("Leap Year Bonus Day!");
    titleText.textColor = new Color("#FFD700");
    titleText.font = Font.boldSystemFont(16);
    titleText.centerAlignText();
    widget.addSpacer(5); // Add some space between title and message
    const messageStack = widget.addStack();
    messageStack.layoutHorizontally();
    messageStack.centerAlignContent();
    const messageText = messageStack.addText("🌕 Enjoy your extra day!");
    // const leapStack = widget.addStack();
    // leapStack.centerAlignContent();
    // const leapText = leapStack.addText("🌕 Leap Year Bonus Day!");
    // leapText.textColor = new Color("#00FFAA");
    // leapText.font = Font.mediumSystemFont(10);
  }



  async function loadImage(filename) {
    try {
      let fm = FileManager.iCloud();
      let filePath = fm.joinPath(fm.documentsDirectory(), filename);
      // let image = fm.readImage(filePath);

      return Image.fromFile(filePath);
    } catch (error) {
      console.error("Error loading image:", error);
      return null;
    }
  }


  // Create the main widget
  async function createWidget(widgetSize) {
    const widget = new ListWidget();
    widget.backgroundGradient = backgroundColor; // Apply gradient background

    // widget.backgroundColor = new Color("#00000000"); // transperant

    // Load your pre-made rounded corner background image
    // const backgroundImage = await loadImage("source/rounded_background.png"); // Replace with your image
    // widget.backgroundImage = backgroundImage;
    // Add rounded corners to the widget
    // widget.cornerRadius = 50; // Adjust corner radius as needed



    for (const item of trackingData) {
      addProgressBar(widget, item.total, item.gone, item.label, widgetSize);
      widget.addSpacer(widgetSize === "small" ? spacerHeightSmall : spacerHeightMedium);
    }

    return widget;
  }

  // Function to add a progress bar to the widget
  function addProgressBar(widget, total, haveGone, str, widgetSize) {
    if (widgetSize === "small") {
      // Small widget layout (vertically centered)
      const stack = widget.addStack();
      stack.layoutVertically();
      stack.centerAlignContent();

      const titleText = stack.addText(str);
      titleText.textColor = textColorTitle;
      titleText.font = titleFontSmall;
      titleText.leftAlignText();

      stack.addSpacer(spacerHeightSmall);

      const progressBarImage = createProgressBar(total, haveGone, widgetSize, progressBarWidthSmall);
      const progressBarWidget = stack.addImage(progressBarImage);
      progressBarWidget.imageSize = new Size(progressBarWidthSmall, progressBarHeightSmall);
      progressBarWidget.leftAlignImage();

      widget.addSpacer(spacerHeightSmall - 2);
    } else {
      // Medium widget layout (horizontal layout, full width)
      const row = widget.addStack();
      row.layoutHorizontally();
      row.centerAlignContent();

      const titleText = row.addText(str);
      titleText.textColor = textColorTitle;
      titleText.font = titleFontMedium;

      row.addSpacer(10);

      // Calculate full width for the progress bar (using fixed widget width)
      const widgetWidth = 329; // Median widget width
      const estimatedTextWidth = 100; // Adjust as needed
      const spacing = 30; // Adjust as needed
      const fullWidth = widgetWidth - estimatedTextWidth - spacing;

      const progressBarImage = createProgressBar(total, haveGone, widgetSize, fullWidth);
      const progressBarWidget = row.addImage(progressBarImage);
      progressBarWidget.imageSize = new Size(fullWidth, progressBarHeightMedium);

      // Add percentage text to the medium widget
      const percentage = Math.round((haveGone / total) * 100);
      const percentageText = row.addText(` ${percentage}%`);
      percentageText.textColor = textColorProgress;
      percentageText.font = progressFont;
    }
  }

  // Function to create the progress bar image
  function createProgressBar(total, haveGone, widgetSize, width) {
    const progressBarWidth = width;
    const progressBarHeight = widgetSize === "small" ? progressBarHeightSmall : progressBarHeightMedium;

    const context = new DrawContext();
    context.size = new Size(progressBarWidth, progressBarHeight);
    context.opaque = false;
    context.respectScreenScale = true;

    // Draw background
    context.setFillColor(progressBackground);
    const backgroundPath = new Path();
    backgroundPath.addRoundedRect(new Rect(0, 0, progressBarWidth, progressBarHeight), progressBarHeight / 2, progressBarHeight / 2);
    context.addPath(backgroundPath);
    context.fillPath();

    // Draw filled progress
    const progressWidth = progressBarWidth * Math.min(haveGone / total, 1);
    context.setFillColor(progressFillColor.colors[0]); // Use first color of gradient
    const progressPath = new Path();
    progressPath.addRoundedRect(new Rect(0, 0, progressWidth, progressBarHeight), progressBarHeight / 2, progressBarHeight / 2);
    context.addPath(progressPath);
    context.fillPath();

    return context.getImage();
  }


  // LIVE UPDATE (ONLY IN PREVIEW MODE)
  async function liveUpdate() {
    for (let i = 0; i < 60; i++) { // Auto-refresh for 60 seconds
      let widget = await createWidget("small");
      widget.presentSmall();
      await new Promise(resolve => setTimeout(resolve, REFRESH_INTERVAL * 1000));
    }
  }


  // RUN SCRIPT
  if (config.runsInWidget) {
    Script.setWidget(await createWidget(config.widgetFamily === "small" ? "small" : "medium"));
    Script.complete();
  } else {
    await liveUpdate();
  }

  // Main execution
  // async function run() {
  //     if (config.runsInWidget) {
  //         if (config.widgetFamily === "small") {
  //             const widget = await createWidget("small");
  //             Script.setWidget(widget);
  //         } else {
  //             const widget = await createWidget("medium");
  //             Script.setWidget(widget);
  //         }
  //     } else {
  //         const previewWidget = await createWidget("small"); // Default to medium for preview
  //         previewWidget.presentMedium();
  //     }

  //     Script.complete();
  // }

  // await run();
}


function renderPlaceholderWidget(label) {
  const widget = new ListWidget();
  widget.addText(`[ ${label} widget here ]`);
  Script.setWidget(widget);
  Script.complete();
}

// === Dispatcher ===
switch (PARAM) {
  case "alarm":
    renderAlarms();
    break;
  case "weeknumdot":
    renderWeekNumDotWidget();
    break;
  case "day":
    renderDayProgressWidget();
    break;
  case "month":
    renderMonthProgressWidget();
    break;
  case "year":
    renderYearProgressWidget();
    break;
  case "week":
    renderWeekProgressWidget();
    break;
  case "weeknum":
    renderWeekNumRingWidget();
    break;
  case "default":
  default:
    await renderDefaultProgressWidget();
    break;
}
