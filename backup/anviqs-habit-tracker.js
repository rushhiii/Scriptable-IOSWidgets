// 🟢 HABIT TRACKER CONFIGURATION
let HABITS = [
  "Sleep",
  "Training",
  "Cardio",
  "Water",
  "Reading",
  "Meditation"
];

// Constants
const STORAGE_KEY = "multiHabitTrackerData";
const THEME_KEY = "multiHabitTrackerTheme";
const HABITS_KEY = "multiHabitTrackerHabits";
const YEAR = new Date().getFullYear();
const MONTH = new Date().getMonth() + 1;

const THEMES = {
  dark: { background: "#000000", text: "#ffffff" },
  light: { background: "#ffffff", text: "#454545" }, // alterado aqui
  midnight: { background: "#0D1B2A", text: "#E0E1DD" },
  solarized: { background: "#002B36", text: "#839496" },
  nordic: { background: "#2E3440", text: "#D8DEE9" },
  paper: { background: "#FDF6E3", text: "#586E75" },
  pink: { background: "#FFC0CB", text: "#8B5D68" }
};

const THEME_NAMES = [
  "Classic Dark",
  "Classic Light",
  "Midnight Blue",
  "Solarized Dark",
  "Nordic Night",
  "Paper White",
  "Sweet Pink"
];

// Default Appearance
let COLOR_FILLED = new Color("#ffffff");
let COLOR_UNFILLED = new Color("#ffffff", 0.4);
let BACKGROUND_COLOR = new Color("#000000");

const MENLO_REGULAR = new Font("Menlo", 8);
const MENLO_BOLD = new Font("Menlo-Bold", 8);
const PADDING = 16;
const LINES_SPACING = 6;

// 🔵 THEME MANAGEMENT
function applyTheme(themeKey) {
  const theme = THEMES[themeKey] || THEMES.dark;
  BACKGROUND_COLOR = new Color(theme.background);
  COLOR_FILLED = new Color(theme.text);
  COLOR_UNFILLED = new Color(theme.text, 0.4);
}

function loadTheme() {
  try {
    const savedTheme = Keychain.get(THEME_KEY);
    if (savedTheme && THEMES[savedTheme]) {
      applyTheme(savedTheme);
    } else {
      applyTheme("dark");
      Keychain.set(THEME_KEY, "dark");
    }
  } catch (e) {
    console.log("Error loading theme: " + e);
    applyTheme("dark");
  }
}

async function selectTheme() {
  const alert = new Alert();
  alert.title = "Select Theme";
  THEME_NAMES.forEach(name => alert.addAction(name));
  alert.addCancelAction("Cancel");

  const selected = await alert.presentSheet();
  const themeKeys = Object.keys(THEMES);

  if (selected >= 0 && selected < themeKeys.length) {
    const themeKey = themeKeys[selected];
    Keychain.set(THEME_KEY, themeKey);
    applyTheme(themeKey);
    return true;
  }
  return false;
}

// 🔵 HABITS MANAGEMENT
function loadHabits() {
  try {
    const savedHabits = Keychain.get(HABITS_KEY);
    if (savedHabits) {
      HABITS = JSON.parse(savedHabits);
    }
  } catch (e) {
    console.log("Error loading habits: " + e);
  }
}

async function changeHabits() {
  const alert = new Alert();
  alert.title = "Change Habits";
  alert.message = "Enter 6 habits, separated by commas.";
  alert.addTextField("Sleep, Training, Cardio, Water, Reading, Meditation");

  alert.addAction("Save");
  alert.addCancelAction("Cancel");

  const response = await alert.presentAlert();

  if (response === 0) {
    const input = alert.textFieldValue(0);
    const newHabits = input.split(",").map(h => h.trim()).filter(h => h.length > 0);

    if (newHabits.length === 6) {
      HABITS = newHabits;
      Keychain.set(HABITS_KEY, JSON.stringify(HABITS));
      console.log("Habits updated:", HABITS);
      return true;
    } else {
      const errorAlert = new Alert();
      errorAlert.title = "Invalid Input";
      errorAlert.message = "You must enter exactly 6 habits separated by commas.";
      errorAlert.addCancelAction("OK");
      await errorAlert.presentAlert();
    }
  }
  return false;
}

// 🔵 HELPER FUNCTIONS
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// 🔵 DATA MANAGEMENT
async function loadHabitData() {
  try {
    const raw = Keychain.get(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      for (let habit of HABITS) {
        if (!parsed.habits[habit]) parsed.habits[habit] = [];
      }
      if (parsed.month !== MONTH || parsed.year !== YEAR) {
        await exportAndResetData(parsed);
        return initializeHabitData();
      }
      return parsed;
    }
  } catch (e) {
    console.log("Error loading data: " + e);
  }
  return initializeHabitData();
}

function initializeHabitData() {
  const structure = { year: YEAR, month: MONTH, habits: {} };
  HABITS.forEach(habit => structure.habits[habit] = []);
  saveHabitData(structure);
  return structure;
}

function saveHabitData(data) {
  Keychain.set(STORAGE_KEY, JSON.stringify(data));
}

async function exportAndResetData(oldData) {
  let exportText = `Habits - ${oldData.month}/${oldData.year}\n\n`;
  for (let habit of HABITS) {
    const log = oldData.habits[habit] || [];
    const totalDays = daysInMonth(oldData.month, oldData.year);
    exportText += `- ${habit}: ${log.length}/${totalDays}\n`;
  }
  Pasteboard.copy(exportText);

  const note = new Notification();
  note.title = "Backup exported";
  note.body = "Monthly summary copied to clipboard.";
  note.schedule();
}

// 🔵 UI FUNCTIONS
async function showCheckInMenu(data) {
  const today = formatDate(new Date());
  const alert = new Alert();
  alert.title = "Habit Check-in";

  HABITS.forEach(habit => {
    const alreadyLogged = (data.habits[habit] || []).includes(today);
    alert.addAction(`${alreadyLogged ? "✅ " : ""}${habit}`);
  });

  alert.addCancelAction("Finish");
  const response = await alert.presentSheet();

  if (response >= 0 && response < HABITS.length) {
    const selectedHabit = HABITS[response];
    const logs = data.habits[selectedHabit] || [];

    if (logs.includes(today)) {
      data.habits[selectedHabit] = logs.filter(d => d !== today);
    } else {
      data.habits[selectedHabit].push(today);
    }

    saveHabitData(data);
    await showCheckInMenu(data);
  }
}

function createWidget(data) {
  const widget = new ListWidget();
  widget.setPadding(PADDING + 4, PADDING, PADDING, PADDING);
  widget.backgroundColor = BACKGROUND_COLOR;

  const todayDay = new Date().getDate();
  const days = daysInMonth(MONTH, YEAR);
  const autoCircleSize = 6;

  const markerRow = widget.addStack();
  markerRow.layoutHorizontally();

  const weekDayInitial = markerRow.addText(new Date().toLocaleDateString("en-US", { weekday: "short" })[0].toUpperCase());
  weekDayInitial.font = MENLO_BOLD;
  weekDayInitial.textColor = Color.red();
  markerRow.addSpacer(4);

  const markerDotsStack = markerRow.addStack();
  markerDotsStack.layoutHorizontally();
  markerDotsStack.centerAlignContent();

  for (let d = 1; d <= days; d++) {
    const dotContainer = markerDotsStack.addStack();
    dotContainer.size = new Size(8, autoCircleSize + 4);
    dotContainer.centerAlignContent();

    const marker = dotContainer.addText("●");
    marker.font = Font.systemFont(autoCircleSize);
    marker.textColor = d === todayDay ? Color.red() : widget.backgroundColor;
  }

  markerRow.addSpacer(4);

  const todayLabel = markerRow.addText(`${String(todayDay).padStart(2, "0")}/${String(MONTH).padStart(2, "0")}`);
  todayLabel.font = MENLO_REGULAR;
  todayLabel.textColor = Color.red();

  widget.addSpacer(LINES_SPACING);

  HABITS.forEach(habit => {
    const logs = data.habits[habit] || [];
    const row = widget.addStack();
    row.layoutHorizontally();

    const initial = row.addText(habit.charAt(0).toUpperCase());
    initial.font = MENLO_BOLD;
    initial.textColor = COLOR_FILLED;

    row.addSpacer(4);

    const dotsStack = row.addStack();
    dotsStack.layoutHorizontally();
    dotsStack.centerAlignContent();

    for (let d = 1; d <= days; d++) {
      const dateStr = `${YEAR}-${String(MONTH).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const logged = logs.includes(dateStr);

      const dotContainer = dotsStack.addStack();
      dotContainer.size = new Size(8, autoCircleSize + 4);
      dotContainer.centerAlignContent();

      const dot = dotContainer.addText("●");
      dot.font = Font.systemFont(autoCircleSize);
      dot.textColor = logged ? COLOR_FILLED : COLOR_UNFILLED;
    }

    row.addSpacer(4);

    const counter = row.addText(`${String(logs.length).padStart(2, "0")}/${String(days).padStart(2, "0")}`);
    counter.font = MENLO_REGULAR;
    counter.textColor = COLOR_UNFILLED;

    widget.addSpacer(LINES_SPACING);
  });

  return widget;
}

// 🔵 MAIN EXECUTION
loadTheme();
loadHabits();

if (config.runsInApp) {
  const alert = new Alert();
  alert.title = "Options";
  alert.addAction("Change Habits");
  alert.addAction("Reset Month");
  alert.addAction("Select Theme");
  alert.addAction("Check-in");
  alert.addCancelAction("Exit");

  const selection = await alert.presentSheet();
  let data = await loadHabitData();

  if (selection === 0) {
    const habitsChanged = await changeHabits();
    if (habitsChanged) saveHabitData(initializeHabitData());
    data = await loadHabitData();
  } else if (selection === 1) {
    await exportAndResetData(data);
    saveHabitData(initializeHabitData());
    data = await loadHabitData();
  } else if (selection === 2) {
    const themeChanged = await selectTheme();
    if (themeChanged) loadTheme();
    data = await loadHabitData();
  } else if (selection === 3) {
    await showCheckInMenu(data);
  }

  const w = createWidget(data);
  await w.presentMedium();
  Script.complete();
} else {
  const data = await loadHabitData();
  const w = createWidget(data);
  Script.setWidget(w);
  Script.complete();
}