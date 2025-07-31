# 🎂 Birthday Life Progress Widget
![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Small-blue)
![Display](https://img.shields.io/badge/View-Life%20Progress%20%2B%20Age%20%2B%20Days%20Lived-orange)
![Parameter](https://img.shields.io/badge/Customizable-Name%20%2B%20Birthday%20via%20Param-green)
![Theme](https://img.shields.io/badge/Theme-Dark%20Gradient-9cf)
![Status](https://img.shields.io/badge/Status-Stable-brightgreen)
![Last Updated](https://img.shields.io/badge/Updated-June%202025-yellow)

<img width="60%" src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/birthday/birthday_showcase.png">

A minimalist Scriptable widget that shows:
- 🎂 Your age in years (accurate to 2 decimals)
- 📅 Total days lived
- 💫 Animated ring showing how far you are from your next birthday

> A beautiful way to reflect on your life — at a glance.

## ✨ Features

- 🧠 Calculates **exact age** from your birthdate (2 decimal precision)
- 📆 Shows total **days lived** since birth
- 🔄 **Next birthday countdown** (as a circular progress bar)
- 📊 Progress ring updates dynamically each day
- 🎨 Clean dark gradient background
- 🔧 Customize with your **name and birthdate** via widget parameter

## 📥 Setup Instructions

### 1. Add the Script to Scriptable

1. Install the [Scriptable app](https://apps.apple.com/app/scriptable/id1405459188)
2. Create a new script named `BirthdayWidget`
3. Paste the full widget code into the editor
4. Save the script

### 2. Add to Your Home Screen

1. Long-press your Home Screen → tap **+**
2. Search for **Scriptable**
3. Choose **Small Widget**
4. Tap **Add Widget**
5. Long-press the widget → tap **Edit Widget**
6. Set the **Script** to `BirthdayWidget`
7. Set the **Parameter** as:

```
<name>, <birthdate>
```
> Example:
```
rushi, May 11 2005
```

## 🧩 Widget Parameter Format

| Parameter Example           | Behavior                                      |
|----------------------------|-----------------------------------------------|
| `rushi, May 11 2005`       | Sets name to `Rushi`, birthdate to `May 11 2005` |
| `janvi, apr 24 2011`       | Sets name to `Janvi`, birthday ring updates accordingly |

> The widget capitalizes the first letter of the name and displays `Name's Life`.

## 📐 Layout Breakdown

| Element            | Description                                  |
|--------------------|----------------------------------------------|
| 🟡 Progress Ring    | Visual progress toward next birthday         |
| 📛 Name Text       | `Name’s Life`                                |
| 📅 Date Info       | Shows birthday (e.g., `May 11 2005`) and days lived |
| 🔢 Age Block       | Shows age in years with line-wrapped "years old" |

## 🎨 Theme

- Uses a **dark gradient** background (`#202020 → #000000`)
- Progress ring color: `#FFD723` (golden yellow)
- Text colors:
  - Name: `#ccff00`
  - Age: `#b8bdfb`
  - Subtext: `gray`

Feel free to modify these in the script for a more personal palette.

## 📸 Screenshots

<img width="160px" src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/birthday/birthday_s.png">

## 🙌 Feedback

Got feature ideas or want a version with weekly/monthly views?  
DM me on [Instagram](https://www.instagram.com/the.tirth12) or email me at <rushiofficial1205@gmail.com>.

Widgets aren’t just tools — they’re reflections of your life. Let’s build something personal.

## 📜 License

This widget is open-source under the **MIT License**.  
Feel free to fork, remix, and personalize — just give credit.

##
<p align="center">
Enjoy tracking your journey ~ RP
</p>