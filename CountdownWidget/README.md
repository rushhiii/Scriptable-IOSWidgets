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

## 🔧 Setup and Usage

### 1️⃣ Create Your Google Sheets Database

- Create a Google Sheet with columns like:  
  | name | date       | icon | color  |  
  |------|------------|------|--------|  
  | Rushi | 2003-09-25 | 🎂   | #2980b9 |  
  | Dad   | 1975-07-01 | 🎂   | #F79F39 |  

- Format the **date** column as YYYY-MM-DD for best results.

### 2️⃣ Publish Your Google Sheet as a Web App

1. In Google Sheets, click **Extensions > Apps Script**.  
2. In the script editor, paste this example code:

    ```javascript
    function doGet(e) {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      const jsonData = data.slice(1).map(row => {
        let obj = {};
        row.forEach((cell, i) => obj[headers[i]] = cell);
        return obj;
      });
      return ContentService.createTextOutput(JSON.stringify(jsonData)).setMimeType(ContentService.MimeType.JSON);
    }
    ```

3. Click the **Deploy** button (top-right corner), then **New deployment**.  
4. Under **Select type**, choose **Web app**.  
5. Set who has access to **Anyone**.  
6. Click **Deploy** and **Authorize access**.  
7. Copy the **Web App URL** (e.g., `https://script.google.com/macros/s/AKfycb.../exec`).

---

### 3️⃣ Insert Your API URL into the Script

In the **`countdown.js`** script file, find the line:

```javascript
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycb.../exec";
````

Replace the URL with **your own** Web App URL you just created.

✅ Save the script.

---

### 4️⃣ Using in Scriptable

* Copy the updated `countdown.js` script to a new script in the Scriptable app.
* On your home screen, add a Scriptable widget and select this script.
* Customize widget parameters as needed (see below).

---

## 🛠️ Widget Usage

Here’s how to configure the widget for different modes:

### 🔹 **Default List View**

* **Applies to:** Medium and Large widgets by default.
* **Displays:** A scrollable list of the top upcoming events with countdowns.

### 🔹 **Single Event View (Small Widget)**

* **Applies to:** Small widgets by default.
* **Displays:** The next upcoming event with days left, age (if a birthday/anniversary), and date.

#### 🔹 Show Age Mode (Small Widget)

* Add `"age"` to the widget parameter in the Scriptable widget config.
* Example parameter:

  ```
  age
  ```
* **Displays:** Age or years together for birthdays and anniversaries in the small widget.

#### 🔹 Select a Specific Event (Small Widget)

* Use the **name** or **index** of an event in the widget parameter.
* Example parameter to select second event:

  ```
  2
  ```
* Example parameter to select by name and show age (NOTE: **the order doesn’t matter** as long as it’s separated by a comma):

  ```
  john,age
  ```

### 🔹 **Grid View**

* Add `"col"` to the widget parameter to enable grid view.
* Works best with large widgets for a 2-column grid of upcoming events.
* Example parameter:

  ```
  col
  ```

---

## ⚠️ Important

🔒 **Do not share your personal Web App URL publicly** to protect your Google Sheet data.
💡 **You can always update the Google Sheet without modifying the widget script again!**

---

## 📷 Screenshots

*(Add screenshots here of your widget in action!)*

---

## 📜 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and share—just give proper credit!

---

## 🙌 Acknowledgments

* Built for personal use and shared to help others.
* Inspired by the flexibility of Scriptable and the power of Google Sheets for data management.

---

Enjoy using this widget and feel free to share feedback or improvements! 🚀✨