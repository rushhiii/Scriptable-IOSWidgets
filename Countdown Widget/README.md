
# ⏰ Interactive Countdown Widget Script

![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Small%2C%20Medium%2C%20Large-blue)
![Data Source](https://img.shields.io/badge/Data-Google%20Sheet%20Web%20App-brightgreen)
![Customization](https://img.shields.io/badge/Configurable-Color%20%2B%20Icon%20%2B%20Age%20%2B%20Pages-orange)
![Offline Support](https://img.shields.io/badge/Offline%20Cache%20%2B%20Auto%20Sync-lightgrey)
![Status](https://img.shields.io/badge/Status-Stable-brightgreen)
![Last Updated](https://img.shields.io/badge/Updated-June%202025-yellow)

<p align="center">
  <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdow_showcase.png" width="500" alt="Countdown Widget Screenshot"/>
</p>

---

## 📋 Overview

The Interactive Countdown Widget is a lightweight, customizable JavaScript widget for displaying dynamic countdowns to important events (birthdays, anniversaries, deadlines, etc.) on your iOS home screen using the [Scriptable app](https://scriptable.app). Data is fetched from a Google Sheet, making it easy to update events without editing code.

---

## ✨ Features

- **Dynamic Countdown**: Shows days remaining to each event.
- **Age/Anniversary Display**: Automatically calculates and displays age or years together.
- **Google Sheets Integration**: Manage events via a simple spreadsheet.
- **Customizable Appearance**: Set unique colors and icons for each event.
- **Multiple Layouts**: Supports list and grid views, with pagination.
- **Offline Support**: Caches data for use when offline.
- **Widget Parameter Support**: Filter, paginate, or change display modes via widget parameters.

---

## 🛠️ Installation

### 1. Download or Clone the Repository

```sh
git clone https://github.com/rushhiii/Scriptable-IOSWidgets.git
```
Or download the ZIP and extract it.

### 2. Add the Script to Scriptable

- Copy `Countdown Widget/MyCountdowns.js` to your iCloud Drive’s `Scriptable` folder.
- Or, open Scriptable, create a new script, and paste the contents of `MyCountdowns.js`.

### 3. Include the Script in Scriptable

No HTML `<script>` tag is needed—this widget runs inside the [Scriptable app](https://scriptable.app) on iOS.

### 4. Dependencies

- **Scriptable app** (iOS, free on App Store)
- **Google Sheets** (for event data)
- No external JS/CSS dependencies required.

---

## 🚀 Usage Example

### Basic Setup

1. **Prepare your Google Sheet** (see below for format).
2. **Set your Google Sheets Web App URL** in the script:
   ```js
   const SHEET_API_URL = "https://script.google.com/macros/s/YOUR_ID/exec";
   ```
3. **Add the widget** to your home screen via Scriptable.

### Example Widget Initialization

- In Scriptable, select the script and add it as a widget.
- Configure widget parameters for advanced options (see below).

---

## ⚙️ Customization Options

You can customize the widget’s behavior and appearance using parameters and by editing the Google Sheet.

### Widget Parameters

| Parameter Example      | Effect                                      |
|-----------------------|----------------------------------------------|
| `age`                 | Show age/years for the event                 |
| `col`                 | Grid view (medium/large widgets only)        |
| `2`                   | Show the 2nd event in the list               |
| `john,age`            | Show John's event with age display           |
| `pg2`                 | Show page 2 of events                        |
| `col,pg3`             | Grid view, page 3                            |

- **Small widget**: Show a single event (by name or index).
- **Medium/Large**: Show a list or grid of events, with pagination.

### Google Sheet Format

| name | date       | icon | color   |
|------|------------|------|---------|
| Mom  | 2003-09-25 | 🎂   | #2980b9 |
| Dad  | 1975-07-01 | 🎂   | #F79F39 |

- Dates must be in `YYYY-MM-DD` format.
- Icons can be any emoji.
- Colors are hex codes (optional).

### Customizing Appearance

- Change event colors/icons in your Google Sheet.
- Edit the color palette in the script for default colors.
- Replace the repeat icon by placing a PNG in your Scriptable `.assets` folder.

---

## 🧩 Advanced Usage

- **Offline Caching**: The widget automatically caches data and syncs daily.
- **Recurring Events**: Use the repeat icon for recurring events.
- **Custom Fonts/Icons**: Place custom assets in the Scriptable iCloud folders as described in the script comments.

---

## 🤝 Contribution Guidelines

1. **Fork** the repository.
2. **Create a branch** for your feature or fix.
3. **Commit** your changes with clear messages.
4. **Submit a pull request** describing your changes.

---

## 📄 License

This project is licensed under the [MIT License](../LICENSE).

---

## 📬 Contact & Support

- **Instagram**: [@the.tirth12](https://www.instagram.com/the.tirth12)
- **Email**: rushiofficial1205@gmail.com

Feel free to reach out for help, feature requests, or collaboration ideas!

---

## 🖼️ Screenshots / GIFs

> _Add screenshots or GIFs here to showcase the widget in action._

| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_s.PNG" width="160"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_age_s.PNG" width="160"/> |
|:--:|:--:|
| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_bday_s.PNG" width="160"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_1_s.PNG" width="160"/> |

| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_m.PNG" width="260"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_col_m.PNG" width="260"/> |
|:--:|:--:|

| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_l.PNG" width="360"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_col_l.png" width="360"/> |
|:--:|:--:|

---

<p align="center">
Enjoy using the Interactive Countdown Widget!
</p>

## ✨ Features

* 🗓️ **Dynamic Countdown**: Displays days remaining to an event.
* 🎂 **Age Display**: Automatically shows age or anniversary years.
* 📅 **Google Sheets Integration**: Events loaded from your own sheet.
* 🎨 **Color Customization**: Assign vibrant colors and icons per event.
* ⚙️ **Flexible Layouts**: Adaptable to different widget sizes and views.

## 🚀 How It Works

The widget fetches events from a Google Sheets Web App link and automatically displays the nearest upcoming event(s). Depending on widget size and provided parameters, it can show:

* A **single event** (Small widget)
* A **grid of events** (use `col` parameter)
* A **list of upcoming events** (default for Medium and Large widgets)

## 🔧 Setup

### 1. Prepare Google Sheets

Create a sheet like this:

| name | date       | icon | color   |
| ---- | ---------- | ---- | ------- |
| Mom  | 2003-09-25 | 🎂   | #2980b9 |
| Dad  | 1975-07-01 | 🎂   | #F79F39 |

> Ensure dates are formatted as `YYYY-MM-DD`.

### 2. Turn Sheet into Web App

1. Go to **Extensions > Apps Script**.
2. Paste this code:

```js
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const events = [];
  for (let i = 1; i < data.length; i++) {
    const [name, date, icon = "🗓️", color = ""] = data[i];
    if (!name || !date) continue;
    let formattedDate = date instanceof Date
      ? Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd")
      : date;
    let event = { name, date: formattedDate, icon };
    if (color) event.color = color;
    events.push(event);
  }
  return ContentService.createTextOutput(JSON.stringify(events))
      .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy > New Deployment**
4. Select type **Web app**
5. Set access to **Anyone**
6. Click **Deploy**, then copy the **Web App URL**

### 3. Link Scriptable Script

In your `countdown.js` file, update:

```js
const SHEET_API_URL = "https://script.google.com/macros/s/YOUR_ID/exec";
```

Then save the script in Scriptable.

### 4. Load Repeat Icon

If you see a ❗ warning or square character instead of the **repeat icon**, it's likely because the required icon font isn't available. To fix this:

1. **Download the `repeat.png` icon** from the repository’s `assets` folder (or use your own).
2. Save it inside your `iCloud Drive > Scriptable > .assets` folder.
3. Ensure the file is named exactly: `repeat.png`
4. The widget will automatically load this icon when it detects a recurring event.

> 🔧 Tip: You can replace `repeat.png` with any custom icon (e.g., circular arrows) — just make sure it’s 60x60 px and in PNG format.


### 5. Add Widget

1. **Download** the [Scriptable app](https://apps.apple.com/in/app/scriptable/id1405459188) from the App Store.
2. **Option A – Upload Method**

   * **Download** the [`CountdownWidget.js`](./Countdown.js) script from this repository.
   * Move it into the `Scriptable` folder in your **iCloud Drive** (this folder is created automatically after installing the Scriptable app).
3. **Option B – Manual Method**

   * Open the Scriptable app.
   * Tap the **+** icon to create a new script.
   * **Copy and paste** the script content from this repo manually.
   * Name the script however you'd like (e.g., `Countdown Widget`).
4. Long-press anywhere on your iOS Home Screen to enter "jiggle mode", tap the **+** button on the top-left, and scroll to add a **Scriptable** widget.
5. Choose the desired **widget size** (Small/Medium/Large) and tap **\[+ Add Widget]**.
6. Long-press the newly added widget, tap **Edit Widget ⓘ**, and configure the **script and parameter values** as described [see below](#️-configure-parameters).

## ⚙️ Configure Parameters

Use the following options when editing the widget:

<table>
  <tr>
    <th>Option</th>
    <th>Defaults</th>
    <th>Change to</th>
  </tr>
  <tr>
    <td>Script</td>
    <td>Choose</td>
    <td>Widget Name (e.g., Countdown Widget)</td>
  </tr>
  <tr>
    <td>While Interacting (optional)</td>
    <td>Open App</td>
    <td>Run Script</td>
  </tr>
  <tr>
    <td>Parameters</td>
    <td>Text</td>
    <td>
      <ul>
        <li>For e.g., <code>age</code>, <code>2</code>, <code>john,age</code>, <code>col</code>    
        </li>
        <li><a href="#note">Read below</a> for more instructions</li>
      </ul>
      </ul>
    </td>
  </tr>
</table>

> _Here's a Screenshot of widget's config panal_

<img height="auto" width="500px" src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_config_panal.PNG" alt="countdown_config_panal.png">

<br/>
<div id="note"></div>

> [!NOTE]
> 
> * `col` parameter works **only for Medium and Large** widgets.
>
>   * **Medium widget** shows top **4** events.
>   * **Large widget** shows top **10** events.
> * If no `col` is used, widget defaults to **list view**:
>
>   * **Medium:** top **3** events.
>   * **Large:** top **7** events.
> * In **small** widgets:
>
>   * Type any name from your Google Sheet (e.g., `mom`, `dad`) to show that person's event.
>
>     * If the emoji is 🎂, it will automatically append `'s Birthday`.
>     * If it's 🥂, it appends `'s Anniversary`.
>     * *It only supports these two emojis, but you can always add more to your liking by updating the `titleSuffixes` array.*
>   * You can also use numeric indexes (e.g., `1`, `2`) to select an upcoming event by position.
>   * Default is the **most upcoming event**.
>   * Using `age` shows the years passed since the event date — useful for birthdays or anniversaries.
>
>    * If today is the event date, countdown is hidden and only age is shown.
> 
> *  **Pagination (`pg`)**:
>    * Use `pg1`, `pg2`, `pg3`, etc., to display **multiple pages** of events.
> 
>       * In **list view** (default):
>           * **Medium widget**: each page displays **3 events**.
>         * **Large widget**: each page displays **7 events**.
>       * In **grid view** (`col`):
>
>         * **Medium widget**: each page displays **4 events**.
>         * **Large widget**: each page displays **10 events**.
>
>     * Example:
>       * `pg2`: shows the second page of events.
>       * `col,pg3`: shows the third page of events in grid view.
>
> * **Offline Fallback & Regular Sync**:
>
>   * Events are automatically cached locally in the `.cache` folder.
>   * Widget gracefully **falls back to cached data** when offline.
>   * Data automatically updates daily at **2:00 AM**.


## 📷 Screenshots

<!--

| ![](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/src/countdown/countdown_s.png) | ![](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/src/countdown/countdown_age_s.PNG) | ![](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/src/countdown//countdown_bday_s.PNG) |
|:--:|:--:|:--:|
| Countdown | Age Display | On Birthday |

| ![](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/src/countdown/countdown_m.PNG) | ![](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/src/countdown//countdown_col_m.PNG) | ![](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/src/countdown//countdown_l.PNG) |
|:--:|:--:|:--:|
| Medium Widget | Color View | Large View |

-->

> _Small Widgets_ 

| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_s.PNG" width="160"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_age_s.PNG" width="160"/> |
|:--:|:--:|
| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_bday_s.PNG" width="160"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_1_s.PNG" width="160"/> |

> _Medium Widgets_

| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_m.PNG" width="260"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_col_m.PNG" width="260"/> |
|:--:|:--:|


> _Large Widgets_

| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_l.PNG" width="360"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdown_col_l.png" width="360"/> |
|:--:|:--:|


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
