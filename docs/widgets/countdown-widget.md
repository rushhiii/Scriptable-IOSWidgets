# ⏰ Countdown Widget

![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Small%2C%20Medium%2C%20Large-blue)
![Data Source](https://img.shields.io/badge/Data-Google%20Sheet%20Web%20App-brightgreen)

A lightweight and customizable countdown widget built using Scriptable, powered by Google Sheets. Track upcoming events like birthdays, anniversaries, or deadlines right from your iOS home screen.

![Countdown Widget Preview](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/countdown/countdow_showcase.png)

## ✨ Features

- 🗓️ **Dynamic Countdown**: Displays days remaining to events
- 🎂 **Age Display**: Automatically shows age or anniversary years
- 📅 **Google Sheets Integration**: Events loaded from your own spreadsheet
- 🎨 **Color Customization**: Assign vibrant colors and icons per event
- 📱 **Multiple Layouts**: Adaptable to different widget sizes
- 🔄 **Auto Sync**: Regular updates from your Google Sheet
- 💾 **Offline Cache**: Works even without internet connection

## 🚀 Quick Setup

### 1. Create Your Google Sheet

Set up a spreadsheet with these columns:

| name | date | icon | color |
|------|------|------|-------|
| Mom's Birthday | 2003-09-25 | 🎂 | #2980b9 |
| Anniversary | 1975-07-01 | 💕 | #F79F39 |
| Project Deadline | 2024-12-31 | 📝 | #e74c3c |

::: tip Date Format
Use `YYYY-MM-DD` format for dates. This ensures proper parsing and countdown calculation.
:::

### 2. Create Google Sheets Web App

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code and paste this:

```javascript
function doGet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const events = rows.map(row => {
    const event = {};
    headers.forEach((header, index) => {
      event[header] = row[index];
    });
    return event;
  });
  
  return ContentService
    .createTextOutput(JSON.stringify(events))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy > New Deployment**
4. Choose **Execute as: Me** and **Who has access: Anyone**
5. Copy the Web App URL

### 3. Configure the Widget

1. Download [`MyCountdowns.js`](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/main/Countdown%20Widget/MyCountdowns.js)
2. Open Scriptable and create a new script
3. Paste the code and update the configuration:

```javascript
// Replace with your Google Sheets Web App URL
const SHEET_URL = "your_web_app_url_here";

// Widget configuration
const CONFIG = {
  refreshInterval: 60, // minutes
  maxEvents: 5,
  showAge: true,
  dateFormat: "YYYY-MM-DD"
};
```

## 📱 Widget Layouts

### Small Widget
- Shows the **next upcoming event**
- Displays countdown in days
- Shows event icon and name
- Color-coded background

### Medium Widget
- Shows **multiple events** in a grid or list
- Configurable layout with `col` parameter
- More details per event

### Large Widget
- Shows **comprehensive event list**
- Additional event details
- Better spacing and readability

## ⚙️ Advanced Configuration

### Widget Parameters

Add parameters when setting up the widget to customize behavior:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `col=2` | Display in 2-column grid | For medium widget |
| `maxEvents=3` | Limit number of events | Show only 3 events |
| `showAge=false` | Hide age calculation | For non-birthday events |

### Color Customization

Use hex color codes in your Google Sheet:

```
#e74c3c  // Red
#3498db  // Blue  
#2ecc71  // Green
#f39c12  // Orange
#9b59b6  // Purple
```

### Icons

Use any emoji or Unicode character:

```
🎂 Birthday
💕 Anniversary  
📝 Deadline
🎓 Graduation
🏆 Goal
```

## 🎨 Styling Options

The widget automatically adapts its appearance based on:

- **Event colors** from your Google Sheet
- **Widget size** (typography and layout scaling)
- **Time remaining** (urgent events highlighted)
- **iOS theme** (respects dark/light mode)

## 📊 Event Types

### Birthday Events
- Automatically calculates age
- Shows "turns X" or "X years old"
- Special birthday emoji support

### Anniversary Events  
- Tracks years together
- Shows milestone celebrations
- Custom anniversary messages

### Deadline Events
- Shows urgency with color coding
- Countdown to specific dates
- Project and task tracking

## 🔧 Troubleshooting

### Widget Not Loading
- Verify Google Sheets Web App URL is correct
- Check internet connection
- Ensure Web App permissions are set to "Anyone"

### Events Not Updating
- Check Google Sheets date format (YYYY-MM-DD)
- Verify Web App is deployed correctly
- Try refreshing the widget manually

### Display Issues
- Check widget size matches your layout preference
- Verify color codes are valid hex values
- Ensure icons are proper Unicode characters

## 🔄 Backup & Sync

### Offline Support
The widget caches your events locally, so it works even without internet:

- **Auto-sync** when connection is available
- **Fallback** to cached data when offline
- **Smart updates** to minimize data usage

### Data Backup
Your events are stored in Google Sheets, providing:

- **Cloud backup** of all your events
- **Easy editing** from any device
- **Sharing** with family members
- **Version history** in Google Sheets

## 📈 Usage Tips

### Best Practices
- Keep event names short for better display
- Use consistent color schemes for event types
- Update dates annually for recurring events
- Test widget after adding new events

### Organization Tips
- Group similar events with same colors
- Use clear, descriptive names
- Sort by date in your Google Sheet
- Archive past events to keep list clean

## 🚀 Updates & Roadmap

### Recent Updates
- Improved offline caching
- Better error handling  
- Enhanced layout options
- Color customization support

### Coming Soon
- Recurring event support
- Notification reminders
- Custom date formats
- Widget themes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🤝 Contributing

Want to improve the Countdown Widget?

1. [Report bugs](https://github.com/rushhiii/Scriptable-IOSWidgets/issues)
2. [Suggest features](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)
3. Submit pull requests
4. Share your configurations

## 🌟 Inspiration

This widget was inspired by the minimal design philosophy of [jvscholz's countdown widget](https://jvscholz.com/blog/countdown.html). We've enhanced it with Google Sheets integration and additional customization options.

---

**Made with ❤️ by [rushhiii](https://github.com/rushhiii)**
