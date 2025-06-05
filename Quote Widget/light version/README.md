# 🪶 Daily ZenQuotes Widget

image

This lightweight iOS widget displays a daily quote fetched from the [ZenQuotes.io](https://zenquotes.io/) API, with a clean aesthetic and theme support.

> Built using [Scriptable](https://scriptable.app) and a minimalist layout optimized for small, medium, and large widget sizes.


## ✨ Features

- 📖 Fetches a **new inspirational quote every day** from ZenQuotes.io
- 🎨 Supports **light** and **dark** themes via widget parameters
- 📐 Dynamically adjusts font sizes and layout per widget size
- ⏳ Limits excessive text with maximum line and character settings
- 🧠 Gracefully handles offline/failure states with fallback messages


## ⚙️ Setup

### 1. Add the Script

1. Download and install the [Scriptable app](https://apps.apple.com/app/scriptable/id1405459188)
2. Create a new script named `ZenQuotesWidget`
3. Paste the contents of `ZenQuotesWidget.js` (from this repo) into the script

### 2. Add the Widget to Home Screen

1. Long-press on your home screen and tap the **+** icon
2. Search for **Scriptable**
3. Choose your desired widget size
4. Tap **Add Widget**
5. Long-press the added widget → **Edit Widget**
6. Set **Script** to `ZenQuotesWidget`
7. Set **Parameter** to `light` or `dark` to control theme


## 🎨 Theme Support

Use widget parameters to toggle between **light** and **dark** themes:

| Parameter | Background | Quote Color | Author Color |
|----------|-------------|-------------|--------------|
| `light`  | `#FFFFFF`   | `#000000`   | `#5A5A5A`    |
| `dark`   | `#000000`   | `#FAF6E2`   | `#AAAAAA`    |

If no parameter is passed, the widget defaults to the **dark** theme.


## 📐 Widget Size Behavior

| Size    | Font Size (approx.) | Max Lines | Truncation |
|---------|---------------------|-----------|------------|
| Small   | 15px                | 10        | Yes        |
| Medium  | 17px                | 10        | Yes        |
| Large   | 23px                | 10        | Yes        |

Widget uses automatic scaling (`minimumScaleFactor = 0.8`) and wraps quotes with smart truncation for better readability.


## 🔄 Auto Refresh

The widget refreshes daily through system scheduling via ZenQuotes API and Scriptable behavior.

For development preview, you can force present the widget in large size using:

```js
if (!config.runsInWidget) {
  const widget = await createWidget();
  widget.presentLarge();
}
```


## 📸 Screenshots

*(Replace with actual widget screenshots)*

| Light Theme | Dark Theme |
|-------------|------------|
| ![](./screenshots/light.png) | ![](./screenshots/dark.png) |


## 🙌 Feedback

Have feature ideas or want a custom version? DM me on [Instagram](https://www.instagram.com/the.tirth12) or email at <rushiofficial1205@gmail.com>.


## 📜 License

This project is licensed under the **MIT License**.  
Fork it, remix it, and use it with proper attribution.


##
<p align="center">
Enjoy the wisdom ~ RP
</p>
