# 🎉 Countdown Widget for Scriptable

A fully-featured countdown widget built using the [Scriptable app](https://scriptable.app) and powered by data from Google Sheets. It helps you track important upcoming events like birthdays, anniversaries, and more—right on your iOS home screen.

---

## ✨ Features

- 📅 **Dynamic Countdown**: Displays the number of days until your events.
- 🎂 **Age Tracking**: Shows the age or years together for birthdays and anniversaries.
- 📝 **Customizable Events**: Load your events directly from a Google Sheets database.
- 🎨 **Vibrant Themes**: Automatically assigns color themes to events.
- ⚙️ **Widget Modes**: Supports multiple widget sizes and display styles.

---

## 🚀 How It Works

This widget pulls your event data from a **Google Sheets web app** endpoint and sorts events based on the closest upcoming date.  
Depending on the widget size and parameters, it displays:

✅ **Single-event view** (small widget)  
✅ **Grid view** (for `col` parameter)  
✅ **List view** (default for medium/large widgets)  

---

## 🔧 Setup

1️⃣ **Google Sheets API**  
This script uses a Google Sheets Web App URL to fetch event data. To protect your personal API keys:  
- Store the API URL in a separate `config.js` file (not committed to GitHub).  
- Example `config.sample.js` file:

    ```javascript
    const SHEET_API_URL = "https://your-scriptable-webapp-url";
    module.exports = { SHEET_API_URL };
    ```

2️⃣ **File Structure**  
- `countdown.js` – Main script for the widget  
- `.fonts/Roboto-Regular.ttf` – Custom font for styling (store locally on your device)  
- `.source/repeat_icon.png` – Repeat icon for event details  
- `config.js` – **Your personal API URL** (excluded from repo via `.gitignore`)

3️⃣ **Using in Scriptable**  
- Copy the `countdown.js` script to a new script in the Scriptable app.  
- Add your `config.js` file locally in the Scriptable iCloud directory (not tracked by GitHub).  
- Create a widget on your iOS home screen and select this script.

---

## ⚠️ Important

🔒 **Do not commit your personal `config.js` file to GitHub** to protect your API keys and private data.  
💡 **This repo includes a `config.sample.js` file as a template**—update it locally with your real API URL.

---

## 📷 Screenshots

*(Add screenshots here of your widget in action!)*

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and share—just give proper credit!

---

## 🙌 Acknowledgments

- Built for personal use and shared to help others.  
- Inspired by the flexibility of Scriptable and the power of Google Sheets for data management.

---

Enjoy using this widget and feel free to share feedback or improvements!
