# 🎉 Countdown Widget

A lightweight and customizable countdown widget built using the [Scriptable app](https://scriptable.app), powered by Google Sheets. It helps you track upcoming events like birthdays, anniversaries, or deadlines—right from your iOS home screen.



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

### 4. Add Widget

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
6. Long-press the newly added widget, tap **Edit Widget ⓘ**, and configure the **script and parameter values** as described [see below](Configure Parameters).


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
    <td>For example:<br/>
      <ul>
        <li> <code>age</code> to show age in small widget. </li>
        <li> <code>2</code> to select second event. </li>
        <li> <code>john,age</code> to select by name and show age (order doesn’t matter). </li>
        <li> <code>col</code> to enable grid view (best for large widgets). </li>
      </ul>
    </td>
  </tr>
</table>
</p>

#### Parameter Examples

* Show **age**:

  ```
  age
  ```
* Show **second event**:

  ```
  2
  ```
* Show **event by name** with age:

  ```
  john,age
  ```
* Enable **grid view**:

  ```
  col
  ```

> Tip: You can combine parameters. Order doesn't matter (e.g., `col,age` is valid).



## 📷 Screenshots

*(Insert previews here of small/medium/large widgets with transparent backgrounds.)*



## 🙌 Feedback

Have feature ideas or issues? DM me on [Instagram](https://www.instagram.com/the.tirth12) or email me at [rushiofficial1205@email.com](mailto:rushiofficial1205@email.com).

Widgets shouldn’t be limited to timers—I’d love to build tools that help you passively learn, reflect, or stay organized. If you have a unique concept in mind, I’d love to collaborate.



## 📜 License

This project is licensed under the **MIT License**.

Feel free to fork, build upon, and remix with attribution.

##

Enjoy using this widget ~ RP
