# 📚 Schedule Widget

![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Small%2C%20Medium%2C%20Large-blue)
![Data Source](https://img.shields.io/badge/Data-Google%20Sheets-brightgreen)
![Schedule Type](https://img.shields.io/badge/Schedule-Dynamic%20Class%20View-lightgrey)

Keep track of your university or work schedule with this comprehensive timetable widget. Perfect for students and professionals who need to stay organized throughout their day.

![Schedule Widget Preview](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/schedule/schedule_showcase_1.png)

## ✨ Features

- 🗓️ **Automatic Daily View**: Shows today's classes automatically
- ⏱️ **Current Class Highlighting**: Displays countdown to current or next class
- 📅 **Weekly Overview**: Full weekly schedule with "full view" mode
- 🌈 **Dynamic Themes**: Gradient backgrounds that change by weekday
- 🔍 **Time Simulation**: Preview future days and times for testing
- 🔄 **Auto-Refresh**: Updates every 15 minutes to stay current
- 📱 **All Widget Sizes**: Optimized layouts for small, medium, and large widgets

## 🚀 Quick Setup

### 1. Prepare Your Google Sheet

Create a Google Sheet with these **required columns**:

| Day | Start | End | Title | Type | Section | Building | Location |
|-----|-------|-----|-------|------|---------|----------|----------|
| 1 | 10:00 | 11:30 | CPS109 | Lecture | 011 | VIC | 105 |
| 1 | 13:00 | 14:30 | MTH110 | Tutorial | 02 | SID | 350 |
| 2 | 09:00 | 10:30 | ENG101 | Seminar | A1 | RYE | 201 |

**Day Numbers:**
- 0 = Sunday
- 1 = Monday  
- 2 = Tuesday
- 3 = Wednesday
- 4 = Thursday
- 5 = Friday
- 6 = Saturday

### 2. Publish Your Sheet

1. **File** → **Share** → **Publish to web**
2. Choose **Comma-separated values (.csv)**
3. Select the correct sheet/tab
4. Copy the generated URL

### 3. Configure the Widget

```javascript
// Replace with your Google Sheets CSV URL
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/your-url-here/pub?output=csv";
```

### 4. Install and Run

1. Download [`MyUniSchedule.js`](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/main/Schedule%20Widget/MyUniSchedule.js)
2. Create new script in Scriptable
3. Replace the `SHEET_URL` with your published CSV link
4. Add widget to home screen with optional parameters

## ⚙️ Widget Parameters

Customize your widget behavior with these parameters:

| Parameter | Purpose | Example |
|-----------|---------|---------|
| `full view` | Show entire weekly schedule | Grid layout |
| `test tue 11:00` | Simulate specific day/time | For testing |
| `get wed` | Show Wednesday's classes | Specific day view |
| *(empty)* | Show today's schedule | Default behavior |

### Parameter Examples

```
full view           → Weekly overview
test mon 10:30     → Simulate Monday 10:30 AM
get tue            → Show Tuesday's schedule
```

## 📸 Screenshots

### Small Widgets

| Current Day | Next Class |
|:--:|:--:|
| ![Schedule Small 1](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/schedule/schedule_s.png) | ![Schedule Small 2](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/schedule/schedule_s_1.png) |

### Medium Widget

| Daily Overview |
|:--:|
| ![Schedule Medium](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/schedule/schedule_m.png) |

### Large Widgets

| Full Day Schedule | Weekly View |
|:--:|:--:|
| ![Schedule Large 1](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/schedule/schedule_l.png) | ![Schedule Large 2](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/schedule/schedule_l_1.png) |

## 🎨 Dynamic Themes

Each weekday has its own gradient theme for visual variety:

```javascript
const gradientThemes = {
  monday: ["#0f2027", "#203a43"],    // Dark blue-grey
  tuesday: ["#2c3e50", "#4ca1af"],   // Blue-teal
  wednesday: ["#134e5e", "#71b280"], // Green-blue
  thursday: ["#ec6f66", "#f3a183"],  // Orange-coral
  friday: ["#614385", "#516395"],    // Purple-blue
  saturday: ["#868f96", "#596164"],  // Grey
  sunday: ["#bc4e9c", "#f80759"]     // Pink-red
};
```

## 📱 Widget Size Layouts

### Small Widget
- **Current/Next Class**: Shows the most relevant class
- **Time Information**: Start/end times and countdown
- **Location**: Building and room number
- **Compact Design**: Essential information only

### Medium Widget
- **Daily Schedule**: All classes for the current day
- **Class Details**: Full information for each class
- **Progress Indicators**: Visual time progress
- **Multiple Classes**: Scrollable if many classes

### Large Widget
- **Full Day View**: Complete daily schedule with details
- **Weekly Mode**: 7-day overview with "full view" parameter
- **Rich Information**: All class details including sections
- **Visual Hierarchy**: Clear separation between classes

## 🔧 Advanced Configuration

### Google Sheets Tips

**Sheet Structure Best Practices:**
- Use 24-hour time format (e.g., "14:30" not "2:30 PM")
- Keep class names short for better display
- Use consistent building/location naming
- Sort by day and time for easier management

**Column Details:**
- **Day**: 0-6 (Sunday to Saturday)
- **Start/End**: HH:MM format
- **Title**: Course code or class name
- **Type**: Lecture, Tutorial, Lab, etc.
- **Section**: Class section identifier
- **Building**: Building code or name
- **Location**: Room number

### Custom Themes

Modify gradient themes to match your school colors:

```javascript
// Example: Custom university theme
const customTheme = {
  monday: ["#003366", "#0066cc"],    // University blue
  tuesday: ["#cc0000", "#ff3333"],   // University red
  // ... customize all days
};
```

### Time Format Customization

```javascript
// 12-hour format
const time12 = "10:30 AM";

// 24-hour format (recommended)
const time24 = "10:30";
```

## 🔄 Auto-Refresh Features

### Smart Updates
- **15-minute intervals**: Keeps schedule current
- **Class progress**: Updates countdown timers
- **Day transitions**: Automatically switches to new day
- **Weekend handling**: Shows next weekday if no weekend classes

### Development Mode
```javascript
// Test different times and days
if (!config.runsInWidget) {
  await widget.presentLarge();
}
```

## 🚨 Troubleshooting

### Common Issues

**"No classes found":**
- Verify Google Sheet is published as CSV
- Check day numbers (0-6 format)
- Ensure time format is HH:MM

**Widget not updating:**
- Check internet connection
- Verify CSV URL is accessible
- Try running script manually in Scriptable

**Incorrect times:**
- Use 24-hour format in Google Sheet
- Check device timezone settings
- Verify start/end time formats

### Sheet Publishing Issues

**CSV not accessible:**
1. Make sheet "Anyone with link can view"
2. Publish to web as CSV format
3. Use the direct CSV URL in script
4. Test URL in browser first

## 💡 Usage Tips

### Best Practices
- **Regular Updates**: Keep your sheet current with semester changes
- **Consistent Naming**: Use standard building/room codes
- **Time Management**: Include buffer time between classes
- **Color Coding**: Use consistent type names (Lecture, Lab, Tutorial)

### Student Tips
- **Exam Schedules**: Create separate sheet for exam periods
- **Office Hours**: Include professor office hours
- **Study Blocks**: Add study time as "blocks"
- **Deadlines**: Include assignment due dates

### Professional Use
- **Meetings**: Replace classes with meetings
- **Projects**: Track project deadlines
- **Appointments**: Schedule client meetings
- **Tasks**: Block time for important tasks

## 🎯 Widget Variations

### Different Display Modes

**Daily Focus**: Default mode for current day
**Weekly Planning**: `full view` for week overview
**Future Planning**: `get mon` for specific days
**Testing**: `test tue 14:00` for development

### Academic Calendar Integration

```javascript
// Add special events
const events = [
  { day: 1, start: "09:00", end: "10:30", title: "Midterm Exam", type: "Exam" },
  { day: 5, start: "17:00", end: "18:00", title: "Office Hours", type: "Help" }
];
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🤝 Contributing

Help improve the Schedule Widget:

1. [Share schedule templates](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)
2. [Report bugs](https://github.com/rushhiii/Scriptable-IOSWidgets/issues)
3. [Suggest features](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)
4. Submit improvements and customizations

---

**Made with ❤️ by [rushhiii](https://github.com/rushhiii)** | **Stay organized, stay ahead! 📚**
