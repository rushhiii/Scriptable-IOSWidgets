# 🖊️ My Quotes Widget

![smartquote](https://user-images.githubusercontent.com/your-image-here.png)

This iOS widget fetches a quote from your personal Google Sheet and displays it with dynamic styling.  
It supports:
- Daily randomized quotes
- Manual quote selection by index
- Custom font/background color
- Size-aware filtering for small, medium, and large widgets

> Built using [Scriptable](https://scriptable.app) and the Google Visualization API.


## ✨ Features

- ✍️ Pulls quotes from multiple categories (tabs) like `gita`, `zen`, `kafka`, etc.
- 🎯 Supports fixed index selection for showing specific quotes
- 📏 Adapts font size and filtering based on widget size
- 🎨 Automatically loads font/background color from Google Sheet or fallback themes
- 🔄 Refreshes daily at midnight to show a new quote

## ⚙️ Setup

### Google Sheet Structure

Your Google Sheet must follow this structure (per tab):

| Quote                        | Author         | Font Color (hex) | Background Color (hex) |
|-----------------------------|----------------|------------------|-------------------------|
| “He who has a why...”       | Nietzsche      | `#FFFFFF`        | `#1A1A1A`               |
| “The unexamined life...”    | Socrates       | *(optional)*     | *(optional)*           |

Each category (e.g., `gita`, `zen`) should be a separate tab.

> **Sheet ID used:**  
`1amFMwf_j83eRLNOAWnqMNfA3ZyE6igqjZF_OrSNww84`

## 🎨 Color Fallbacks

If no font or background color is specified for a quote, the widget loads a random fallback from:

```
.source/dark\_theme\_color\_pairs.json
````

Each entry should follow:

```json
[
  { "font": "#FFFFFF", "background": "#1A1A1A" },
  { "font": "#E0E0E0", "background": "#2C3E50" }
]
````

## 📦 Local File Requirements

* `.source/dark_theme_color_pairs.json`
  (optional, for color fallback)

* *(Optional)* `.fonts/` directory for custom font loading (currently unused)

## 🔄 Auto-Refresh

The widget refreshes automatically **at midnight** using:

```js
widget.refreshAfterDate = tomorrowAtMidnight;
```

To force refresh during development, use:

```js
if (!config.runsInWidget) await widget.presentMedium();
```

## 🔧 Installation Guide

1. **Install Scriptable** from the App Store
2. **Copy the Widget Code** from this repo into a new script in Scriptable
3. Save the script as `QuoteWidget.js`
4. Create the folders:

   * `Scriptable/.source/` → for `dark_theme_color_pairs.json`
   * *(optional)* `Scriptable/.fonts/` → for custom font support
5. *(Optional)* Add your own `quote spreadsheet` to Google Sheets and update the `SHEET_ID`
6. Add a **Scriptable Widget** to your Home Screen
7. Long-press the widget → **Edit Widget**
8. Set **Script** to `QuoteWidget`
9. Use one of the supported **parameters**, like `zen`, `fyodor,12,m`, etc.

## 🧩 Widget Parameters

You can configure the widget by passing **1 to 3 comma-separated values**:

```
<category>, <index>, <size>
```

The **order doesn't matter**. Examples:

| Parameter           | Meaning                                              |
|---------------------|------------------------------------------------------|
| `zen`               | Today's quote from `zen` tab                         |
| `42,zen`            | Quote at index 42 from `zen`                         |
| `kafka,99,l`        | Large widget showing quote #99 from `kafka`         |
| `machiavelli,s,3`   | Small widget, quote #3 from `machiavelli`           |
| `s`                 | Today's quote from default category, small widget   |
| `8`                 | Quote #8 from default category                      |

### Available Categories
- `myquotes`
- `gita`
- `zen`
- `machiavelli`
- `aurelius`
- `fyodor`
- `kafka`

### Widget Sizes
- `s` → Small
- `m` → Medium
- `l` → Large


## 📸 Screenshot

*(Replace with your actual screenshots)*

| Small                        | Medium                        | Large                        |
| ---------------------------- | ----------------------------- | ---------------------------- |
| ![](./screenshots/small.png) | ![](./screenshots/medium.png) | ![](./screenshots/large.png) |



## 🙌 Feedback

Have feature ideas or issues? DM me on [Instagram](https://www.instagram.com/the.tirth12) or email me at <rushiofficial1205@gmail.com>.

Widgets shouldn’t be limited to timers—I’d love to build tools that help you passively learn, reflect, or stay organized. If you have a unique concept in mind, I’d love to collaborate.

## 📜 License

This project is licensed under the **MIT License**.

Feel free to fork, build upon, and remix with attribution.

##

<p align="center">
Enjoy using this widget ~ RP
</p>
