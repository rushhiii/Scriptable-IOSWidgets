# 📅 Class Schedule Viewer
![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Small%2C%20Medium%2C%20Large-blue)
![Data Source](https://img.shields.io/badge/Data-Google%20Sheets-brightgreen)
![Schedule Type](https://img.shields.io/badge/Schedule-Dynamic%20Class%20View-lightgrey)
![Theme](https://img.shields.io/badge/Theme-Gradient%20by%20Weekday-9cf)
![Status](https://img.shields.io/badge/Status-Stable-brightgreen)
![Last Updated](https://img.shields.io/badge/Updated-June%202025-yellow)

<!-- ![schedule-widget](https://user-images.githubusercontent.com/your-image-here.png) -->

![Schedule Widget](../.src/schedule/schedule_showcase.png)

A powerful iOS widget built with **Scriptable** that displays your university or high school class schedule directly from a public Google Sheet.  

It dynamically adapts to the day of the week, highlights the current or upcoming class, and supports a weekly overview.

> Designed to bring clarity to your day—at a glance.

## ✨ Features

- 🗓️ Automatically shows today’s classes
- ⏱️ Displays countdown to current or next class
- 📅 Full weekly overview with `full view` mode
- 🌈 Gradient backgrounds based on weekday
- 🔍 Simulated time/day view for preview/testing
- 🔄 Auto-refresh every 15 minutes


## 📂 Google Sheet Format

The Sheet should be **published to the web** as a CSV file.

### Required Columns

Your CSV **must contain** the following headers:

| Day | Start | End | Title | Type | Section | Building | Location |
|-----|-------|-----|-------|------|---------|----------|----------|

Example row:

| Day | Start | End | Title | Type | Section | Building | Location |
|-----|-------|-----|-------|------|---------|----------|----------|
| 1   | 10:00 | 11:30 | CPS109 | Lecture | 011 | VIC | 105 |

Where `Day` is:
- 0 = Sunday
- 1 = Monday
- ...
- 6 = Saturday


## 🔗 How to Get Your Google Sheets CSV URL

1. Open your Google Sheet
2. Click on `File` > `Share` > `Publish to web`
3. Choose `Comma-separated values (.csv)` and the correct sheet/tab
4. Copy the generated link

It will look like this:

```
https://docs.google.com/spreadsheets/d/e/.../pub?output=csv
```

Paste it into your script by replacing the value of `SHEET_URL`.

```js
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/your-url-here/pub?output=csv";
```

## 📏 Widget Sizes and Modes

### Default Mode

Shows classes for **today** based on current system time.

### Full View Mode

Shows the **entire week’s schedule** in grid format.  
Set the parameter:

```
full view
```

### Simulate Specific Day or Time

To test future days or class times:

```
test mon 10:30
```

### View Other Days

To view the schedule for a specific day:

```
get tue
```


## ⚙️ Widget Parameters

Use any of the following:

| Parameter        | Purpose                              |
|------------------|--------------------------------------|
| `full view`      | Show weekly grid                     |
| `test tue 11:00` | Simulate time + weekday              |
| `get wed`        | Show Wednesday's classes             |
| *(empty)*        | Show today’s schedule (default)      |


## 🎨 Gradient Themes

Each day of the week has its own background theme, defined in the code as:

```js
const gradientThemes = {
  monday: ["#0f2027", "#203a43"],
  tuesday: ["#2c3e50", "#4ca1af"],
  ...
};
```

Feel free to modify these for your aesthetic preference.


## 📸 Screenshot

> _Small Widget_

| <img src="../.src/schedule/schedule_s.png" width="160"/> | <img src="../.src/schedule/schedule_s_1.png" width="160"/> |
|:--:|:--:|

> _Medium Widget_

| <img src="../.src/schedule/schedule_m.png" width="260"/> |
|:--:|

> _large Widget_

| <img src="../.src/schedule/schedule_l.png" width="360"/> | <img src="../.src/schedule/schedule_l_1.png" width="360"/> |
|:--:|:--:|



## 🧪 Development Tips

- During testing, use `widget.presentLarge()` to preview widget output in-app.
- Use `console.log()` to debug any parsing issues.
- Always ensure your Google Sheet is **public and published** as CSV.


## 🙌 Feedback

Have questions or want help customizing it? DM me on [Instagram](https://www.instagram.com/the.tirth12) or email me at <rushiofficial1205@gmail.com>.

Widgets shouldn’t be limited to timers—I’d love to build tools that help you passively learn, reflect, or stay organized. If you have a unique concept in mind, I’d love to collaborate.

## 📜 License

This project is licensed under the **MIT License**.

Feel free to fork, build upon, and remix with attribution.

##

<p align="center">
Enjoy using this widget ~ RP
</p>
