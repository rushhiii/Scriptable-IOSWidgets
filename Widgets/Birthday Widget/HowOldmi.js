// icon-color: teal; icon-glyph: birthday-cake;

// Get widget parameter in format: "name, MMM DD"
const PARAM = args.widgetParameter || "rushi, May 11 2005";

// Extract name and date from parameter
let [rawName, rawDate] = PARAM.split(",");
rawName = rawName.trim();
rawDate = rawDate.trim();

// Capitalize first letter of name
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const displayName = capitalize(rawName);

const CANVAS_SIZE = 50;
const RADIUS = 20;
const LINE_WIDTH = 8;

// Convert to Date
let parsedDate = new Date(rawDate);

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const today = stripTime(new Date());
const birthday = stripTime(parsedDate);

// Calculate the *next* birthday
let nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
if (today > nextBirthday) {
  nextBirthday.setFullYear(today.getFullYear() + 1);
}

const msInDay = 1000 * 60 * 60 * 24;
const daysUntilBirthday = Math.ceil((nextBirthday - today) / msInDay);
const daysInYear = (nextBirthday.getFullYear() % 4 === 0 && nextBirthday.getFullYear() % 100 > 0 || nextBirthday.getFullYear() % 400 == 0) ? 366 : 365;
const birthdayProgress = 1 - (daysUntilBirthday / daysInYear);


const displayBirthStr = birthday.toDateString().split(" ").slice(1).join(" ");
const LIFE_EXPECTANCY_YEARS = 80;
const totalLifeDays = LIFE_EXPECTANCY_YEARS * 365.25;
const daysLived = Math.floor((today - birthday) / msInDay) + 1;
const yearAge = (daysLived / 365.25).toFixed(2);

function drawCircleProgress(progress) {
  const context = new DrawContext();
  context.size = new Size(CANVAS_SIZE, CANVAS_SIZE);
  context.opaque = false;
  context.respectScreenScale = true;

  const center = new Point(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
  context.setStrokeColor(new Color("#222"));
  context.setLineWidth(LINE_WIDTH);
  context.strokeEllipse(new Rect(
    center.x - RADIUS,
    center.y - RADIUS,
    RADIUS * 2,
    RADIUS * 2
  ));

  context.setFillColor(new Color("#FFD723"));
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

function createGradientBackground(widget, colors) {
  const gradient = new LinearGradient();
  gradient.colors = colors;
  gradient.locations = [0, 1];
  widget.backgroundGradient = gradient;
}

// ========================
// WIDGET LAYOUT BEGINS
// ========================
const widget = new ListWidget();
const BACKGROUND_COLOR = [new Color("#202020"), new Color("#000000")];
createGradientBackground(widget, BACKGROUND_COLOR);

const a = 5;

// 1. Progress Ring
const img = drawCircleProgress(birthdayProgress); // Use birthdayProgress here
const imgView = widget.addImage(img);
imgView.imageSize = new Size(CANVAS_SIZE, CANVAS_SIZE);
imgView.leftAlignImage();

widget.addSpacer(a + 5);

// 2. Info Block (Name + Date + Day)
const nameText = widget.addText(`${displayName}’s Life`);
nameText.textColor = new Color("#ccff00");
nameText.font = Font.boldSystemFont(14);
nameText.leftAlignText();

const dateAndDay = widget.addText(`${displayBirthStr} · ${daysLived-1} days`);
dateAndDay.textColor = Color.gray();
dateAndDay.font = Font.boldSystemFont(10);
dateAndDay.leftAlignText();

widget.addSpacer(a);

// 3. Age Display
const ageStack = widget.addStack();
ageStack.layoutHorizontally();
ageStack.centerAlignContent();
ageStack.spacing = 4;

const ageNum = ageStack.addText(`${yearAge}`);
ageNum.font = Font.boldSystemFont(28);
ageNum.textColor = new Color("#b8bdfb");

const ageLabel = ageStack.addText("years\nold");
ageLabel.font = Font.boldSystemFont(10);
ageLabel.textColor = Color.gray();
ageLabel.lineLimit = 2;

Script.setWidget(widget);
widget.presentSmall();
Script.complete();
