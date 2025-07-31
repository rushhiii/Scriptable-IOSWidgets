// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: tshirt;

// === Hindu Color Wear Widget ===

const today = new Date();
// const today = new Date("2025-04-20"); // sunday
// const today = new Date("2025-04-21"); // monday
// const today = new Date("2025-04-22"); // tuesday
// const today = new Date("2025-04-23"); // wednesday
// const today = new Date("2025-04-24"); // thursday
// const today = new Date("2025-04-25"); // friday
// const today = new Date("2025-04-26"); // saturday
const weekdayIndex = today.getDay();

// const days = [
//   { day: "Sunday", colorName: "orange", color: "#orange", reason: "Red represents the Sun's energy, vitality, and strength. Wearing red honors Surya (Sun God) and invites power and courage." },
//   { day: "Monday", colorName: "White", color: "#FFFFFF", reason: "White symbolizes peace, calmness, and purity. Monday is dedicated to Lord Shiva, and white attire invites mental clarity, emotional healing, and spiritual growth." },
//   { day: "Tuesday", colorName: "Red", color: "#FF1493", reason: "deeppink (or light red) symbolizes love, compassion, and strength. Tuesdays honor Lord Hanuman, encouraging courage blended with kindness." },
//   { day: "Wednesday", colorName: "Green", color: "#00A86B", reason: "Green represents growth, prosperity, and balance. Wednesday is ruled by Mercury (Budh), enhancing communication, intelligence, and renewal." },
//   { day: "Thursday", colorName: "Yellow", color: "#FFD700", reason: "Yellow signifies wisdom, learning, and spirituality. Thursday is governed by Jupiter (Guru), supporting positive energy, success, and knowledge." },
//   { day: "Friday", colorName: "Light Blue", color: "#87CEFA", reason: "Light Blue symbolizes harmony, devotion, and tranquility. Fridays are associated with Goddess Durga and Shukra (Venus), favoring nurturing relationships and creativity." },
//   { day: "Saturday", colorName: "Black", color: "#000000", reason: "Black represents protection, discipline, and endurance. Saturday belongs to Shani (Saturn), wearing black absorbs negativity and strengthens resilience." }
// ];

const days = [
  { day: "Sunday", colorName: "Red", color: "#FF0000", reason: "Red symbolizes energy, vitality, and power. It is associated with Surya (the Sun God), promoting leadership, strength, and the dispelling of negativity." },
  { day: "Monday", colorName: "White", color: "#FFFFFF", reason: "White stands for peace, purity, and calmness. Monday is sacred to Lord Shiva, and wearing white invites mental clarity, emotional healing, and spiritual focus." },
  { day: "Tuesday", colorName: "Orange-Red", color: "#FF4500", reason: "Orange-Red embodies strength, passion, and courage. Tuesday is linked to Lord Hanuman, encouraging fearlessness, perseverance, and active energy." },
  { day: "Wednesday", colorName: "Green", color: "#00A86B", reason: "Green represents growth, prosperity, and renewal. Wednesday is ruled by Mercury (Budh), supporting wisdom, communication skills, and balanced thinking." },
  { day: "Thursday", colorName: "Yellow", color: "#FFD700", reason: "Yellow signifies knowledge, learning, and positivity. Thursday, governed by Jupiter (Guru), promotes wisdom, wealth, and spiritual development." },
  { day: "Friday", colorName: "Light Blue", color: "#87CEFA", reason: "Light Blue represents devotion, harmony, and beauty. Fridays are associated with Goddess Durga and Venus (Shukra), nurturing relationships, love, and creativity." },
  { day: "Saturday", colorName: "Black", color: "#000000", reason: "Black symbolizes protection, discipline, and endurance. Saturday belongs to Shani (Saturn), wearing black helps absorb negativity and strengthen resilience." }
];

// const days = [
//   { day: "Sunday", colorName: "Red", color: "#FF0000", reason: "Red represents the Sun's energy, vitality, and strength. It honors Surya (Sun God) and invites courage and leadership." },
//   { day: "Monday", colorName: "White", color: "#FFFFFF", reason: "White symbolizes peace, calmness, and purity. Monday is sacred to Lord Shiva and promotes clarity and healing." },
//   { day: "Tuesday", colorName: "Orange-Red", color: "#FF4500", reason: "Orange-Red embodies strength, passion, and bravery. Tuesdays honor Lord Hanuman, encouraging fearlessness and vitality." },
//   { day: "Wednesday", colorName: "Green", color: "#00A86B", reason: "Green represents growth, prosperity, and balance. Wednesday is ruled by Mercury (Budh), enhancing communication and learning." },
//   { day: "Thursday", colorName: "Yellow", color: "#FFD700", reason: "Yellow symbolizes wisdom, knowledge, and positivity. Thursday is governed by Jupiter (Guru) for spiritual growth and success." },
//   { day: "Friday", colorName: "Light Blue", color: "#87CEFA", reason: "Light Blue signifies devotion, tranquility, and beauty. Friday connects with Goddess Durga and Venus (Shukra) for nurturing energy." },
//   { day: "Saturday", colorName: "Black", color: "#000000", reason: "Black represents discipline, endurance, and protection. Saturday belongs to Shani (Saturn), wearing black absorbs negativity and strengthens resilience." }
// ];


const todayInfo = days[weekdayIndex];
const tomorrowInfo = days[(weekdayIndex + 1) % 7];

const newClr = new Color("#FFFFFFD4");

function darkenColor(hex, percent) {
  let num = parseInt(hex.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = (num >> 8 & 0x00FF) - amt,
      B = (num & 0x0000FF) - amt;
  return "#" + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

// === WIDGET BUILDER ===
async function createWidget(widgetSize) {
  const widget = new ListWidget();

  if (widgetSize === "small") {
    widget.backgroundColor = new Color(todayInfo.color);

    const title = widget.addText(todayInfo.colorName);
    title.textColor = new Color(tomorrowInfo.color);
    title.font = Font.boldSystemFont(18);
    title.centerAlignText();

    widget.addSpacer(4);

    const dayText = widget.addText(todayInfo.day);
    dayText.textColor = new Color(tomorrowInfo.color);
    dayText.font = Font.systemFont(14);
    dayText.centerAlignText();

  } else if (widgetSize === "medium") {
    const gradient = new LinearGradient();
    // gradient.colors = [
    //   new Color(darkenColor(todayInfo.color, 20)),
    //   new Color(darkenColor(tomorrowInfo.color, 20))
    // ];
    gradient.colors = [
      new Color(darkenColor(todayInfo.color, 85)), // darker
      new Color(darkenColor(todayInfo.color, 50)) // lighter
    ];
    // gradient.colors = [new Color("#001A33"), new Color("#00375B")];
    gradient.locations = [1, 0]; // notice locations first
    widget.backgroundGradient = gradient; // THEN apply


    widget.setPadding(10, 20, 10, 20);
    // const newClr = new Color("#FFFFFFD4");

    const colStack = widget.addStack();
    colStack.layoutHorizontally();

    const leftCol = colStack.addStack();
    leftCol.layoutVertically();
    leftCol.centerAlignContent();
    colStack.addSpacer(25);
    const rightCol = colStack.addStack();
    rightCol.layoutVertically();
    rightCol.centerAlignContent();

    const columnOrder = [
      [days[1], days[2], days[3], days[4]],
      [days[5], days[6], days[0]]
    ];

    for (let i = 0; i < columnOrder[0].length; i++) {
      const left = columnOrder[0][i];
      const right = columnOrder[1][i];

      const leftRow = leftCol.addStack();
      leftRow.centerAlignContent();
      const leftText = leftRow.addText(`${left.day} - ${left.colorName}`);
      // leftText.textColor = new Color(left.color);
      leftText.textColor = newClr;
      leftText.font = left.day === todayInfo.day ? Font.boldSystemFont(14) : Font.systemFont(14);
      if (left.day === todayInfo.day) {
        leftText.textColor = new Color(tomorrowInfo.color);
        // leftText.shadowColor = tomorrowInfo.color;
        // leftText.shadowOffset = new Point(1, 1);
      }

      leftCol.addSpacer(3);

      if (right) {
        const rightRow = rightCol.addStack();
        rightRow.centerAlignContent();
        const rightText = rightRow.addText(`${right.day} - ${right.colorName}`);
        rightText.textColor = newClr;
        rightText.font = right.day === todayInfo.day ? Font.boldSystemFont(14) : Font.systemFont(14);
        if (right.day === todayInfo.day) {
          rightText.textColor = new Color(tomorrowInfo.color);
          // rightText.shadowColor = new Color("#000000");
          // rightText.shadowOffset = new Point(1, 1);
        }

        rightCol.addSpacer(3);
      }
    }

  } else if (widgetSize === "large") {
    const gradient = new LinearGradient();
    gradient.colors = [
      new Color(darkenColor(todayInfo.color, 85)), // darker
      new Color(darkenColor(todayInfo.color, 50)) // lighter
    ];
    // gradient.colors = [new Color("#001A33"), new Color("#00375B")];
    gradient.locations = [1, 0]; // notice locations first
    widget.backgroundGradient = gradient; // THEN apply
    widget.setPadding(10, 20, 10, 20);

    const title = widget.addText(`${todayInfo.colorName} - ${todayInfo.day}`); // tomorrowInfo
    title.textColor = new Color(tomorrowInfo.color);
    title.font = Font.boldSystemFont(22);
    title.leftAlignText();

    widget.addSpacer(10);

    const reason = widget.addText(todayInfo.reason);
    reason.textColor = newClr;
    reason.font = Font.systemFont(14);
    reason.leftAlignText();
    reason.minimumScaleFactor = 0.8;
  }

  return widget;
}

// === RUN ===
if (config.runsInWidget) {
  const widget = await createWidget(config.widgetFamily);
  Script.setWidget(widget);
  Script.complete();
} else {
  const preview = await createWidget("medium");
  preview.presentMedium();
  Script.complete();
}