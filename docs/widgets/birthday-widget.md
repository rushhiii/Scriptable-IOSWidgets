# 🎂 Birthday Widget

![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Small-blue)
![Type](https://img.shields.io/badge/Type-Age%20Calculator-green)

Calculate and display ages with precision down to days, months, and years. Perfect for tracking birthdays, anniversaries, or any significant date milestones.

![Birthday Widget Preview](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/birthday/birthday_showcase.png)

## ✨ Features

- 🎂 **Precise Age Calculation**: Years, months, and days
- 📅 **Next Birthday Countdown**: Days until next birthday
- 🎉 **Milestone Tracking**: Special age milestones
- 📱 **Compact Display**: Perfect for small widget size
- ⚙️ **Easy Configuration**: Simple date setup
- 🔄 **Daily Updates**: Automatic age progression

## � Screenshots

### Small Widget
Perfect compact display for quick age reference.

| Small Widget - Age Display |
|:--:|
| ![Birthday Small](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/birthday/birthday_s.png) |

### Age Calculation Views
Different display modes for various age calculation needs.

| Precise Age | Next Birthday | Milestone View |
|:--:|:--:|:--:|
| ![Age Precise](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/birthday/birthday_precise.png) | ![Next Birthday](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/birthday/birthday_countdown.png) | ![Milestone](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/birthday/birthday_milestone.png) |

### Color Themes
Customize your birthday widget with different color schemes.

| Default Theme | Birthday Theme | Celebration Theme |
|:--:|:--:|:--:|
| ![Birthday Default](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/birthday/birthday_default.png) | ![Birthday Party](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/birthday/birthday_party.png) | ![Birthday Celebration](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/birthday/birthday_celebration.png) |

## �🚀 Quick Setup

### 1. Configure Your Birth Date

```javascript
// Set your birth date (YYYY-MM-DD format)
const BIRTH_DATE = "1990-05-15";

// Optional: Customize display name
const DISPLAY_NAME = "My Age";
```

### 2. Install the Widget

1. Download [`HowOldmi.js`](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/main/Birthday%20Widget/HowOldmi.js)
2. Create new script in Scriptable
3. Paste code and set your birth date
4. Add small widget to home screen

## 📱 Widget Display

### Information Shown
- **Current Age**: Exact years, months, days
- **Next Birthday**: Countdown in days
- **Special Milestones**: Noteworthy age markers
- **Birthday Status**: "Today is your birthday!" on special day

### Display Format
```
🎂 John's Age
25 years, 3 months, 12 days

Next Birthday: 264 days
```

## ⚙️ Customization Options

### Multiple People

Create separate widgets for family members:

```javascript
// Widget 1: Your age
const BIRTH_DATE_SELF = "1990-05-15";
const NAME_SELF = "My Age";

// Widget 2: Partner's age  
const BIRTH_DATE_PARTNER = "1988-09-22";
const NAME_PARTNER = "Sarah's Age";
```

### Display Preferences

```javascript
// Customization options
const CONFIG = {
  showMonthsAndDays: true,
  showNextBirthday: true,
  showMilestones: true,
  birthdayEmoji: "🎂",
  celebrationEmoji: "🎉"
};
```

### Special Milestones

The widget highlights special ages:

- **Sweet 16** (16 years)
- **Coming of Age** (18, 21 years)
- **Milestone Decades** (30, 40, 50, etc.)
- **Century Celebrations** (100+ years)

## 🎉 Birthday Features

### On Your Birthday
- Special birthday message
- Celebration emojis
- Age milestone recognition
- "Happy Birthday!" display

### Birthday Countdown
- Shows exact days until next birthday
- Updates daily automatically
- Special formatting as birthday approaches

### Anniversary Support
Use the same widget for:
- Wedding anniversaries
- Relationship milestones
- Work anniversaries
- Any significant date

## 📊 Age Calculation Details

### Precision Levels

**Exact Age Calculation**:
- Accounts for leap years
- Handles month-end dates correctly
- Considers varying month lengths
- Accurate to the day

**Smart Display**:
- Rounds to appropriate precision
- Shows relevant time units
- Adapts based on age magnitude

### Technical Implementation

```javascript
// Age calculation example
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  
  // Adjust for negative values
  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months, days };
}
```

## 🔧 Advanced Features

### Multiple Date Tracking

Track multiple important dates:

```javascript
const IMPORTANT_DATES = [
  { name: "My Age", date: "1990-05-15", type: "birthday" },
  { name: "Anniversary", date: "2015-06-20", type: "anniversary" },
  { name: "Career Start", date: "2012-08-01", type: "milestone" }
];
```

### Notification Integration

Combine with iOS Shortcuts for:
- Birthday reminder notifications
- Milestone celebration alerts
- Anniversary notifications
- Family birthday tracking

## 🎨 Styling Options

### Color Themes

```javascript
// Color customization
const THEMES = {
  birthday: {
    background: "#ff6b9d",
    text: "#ffffff",
    accent: "#ffd93d"
  },
  anniversary: {
    background: "#ff9ff3",
    text: "#ffffff", 
    accent: "#f368e0"
  },
  default: {
    background: "#667eea",
    text: "#ffffff",
    accent: "#764ba2"
  }
};
```

### Custom Emojis

Personalize with relevant emojis:
- 🎂 Traditional birthday
- 💕 Romantic anniversaries
- 🎉 Celebrations
- 📅 General milestones
- 👶 Baby age tracking

## 📱 Use Cases

### Personal Tracking
- Your own age with precise calculation
- Track how long you've been at current job
- Monitor relationship milestones
- Celebrate life achievements

### Family Management
- Children's ages for school enrollment
- Track multiple family birthdays
- Anniversary reminders
- Grandparent age celebrations

### Professional Use
- Company anniversary tracking
- Project timeline milestones
- Career progression markers
- Professional development goals

## 🔧 Troubleshooting

### Common Issues

**Wrong age calculation:**
- Verify birth date format (YYYY-MM-DD)
- Check for typos in date entry
- Ensure valid date (not future date)

**Widget not updating:**
- iOS automatically refreshes small widgets
- Manually refresh by running script
- Check if device date/time is correct

**Display formatting issues:**
- Verify widget size is set to "Small"
- Check text length fits widget constraints
- Adjust display options if needed

## 🎯 Tips & Best Practices

### Setup Tips
- Use YYYY-MM-DD format for reliability
- Test with today's date to verify calculation
- Consider time zones for international users
- Keep names short for better display

### Usage Ideas
- Create widgets for each family member
- Track pet ages (convert to human years)
- Monitor business/project milestones
- Celebrate sobriety anniversaries

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/main/LICENSE) file for details.

## 🤝 Contributing

Help make age tracking even better:

1. [Report calculation bugs](https://github.com/rushhiii/Scriptable-IOSWidgets/issues)
2. [Suggest new features](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)
3. Share creative use cases
4. Contribute localization support

---

**Made with ❤️ by [rushhiii](https://github.com/rushhiii)** | **Celebrate every moment! 🎉**
