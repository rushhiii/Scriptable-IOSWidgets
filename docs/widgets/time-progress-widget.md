# ⏰ Time Progress Widget

![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Small%2C%20Medium%2C%20Large-blue)
![Display Modes](https://img.shields.io/badge/Modes-Day%2C%20Week%2C%20Month%2C%20Year-lightgrey)
![Theme](https://img.shields.io/badge/Theme-Dark%20Gradient-black)

Visualize the passage of time with beautiful progress bars and rings. Track daily, weekly, monthly, and yearly progress in an elegant, minimalist design that helps you stay aware of time's flow.

![Time Progress Widget Preview](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/timeprogress/timeprogress_showcase.png)

## ✨ Features

- ⏳ **Multiple Time Scales**: Day, week, month, year, and week number tracking
- 🎨 **Beautiful Visualizations**: Circular rings, progress bars, and dot grids
- 🌙 **Dark Theme**: Clean black-to-gray gradients that make elements pop
- 🪄 **Smooth Animations**: Elegant progress rings and transitions
- 📱 **All Widget Sizes**: Optimized layouts for small, medium, and large widgets
- 🧠 **Smart Defaults**: Shows comprehensive overview when no parameter is set
- ⚙️ **Flexible Parameters**: Choose specific time periods to focus on

## 🚀 Quick Setup

### 1. Install the Widget

1. Download [`ModularTimeProgress.js`](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/main/TimeProgress%20Widget/ModularTimeProgress.js)
2. Create new script in Scriptable
3. Paste the code and save
4. Add widget to home screen

### 2. Configure Display Mode

Add a parameter to customize what time period to show:

| Parameter | Display |
|-----------|---------|
| `day` | Current day progress (circular ring) |
| `week` | Weekly progress visualization |
| `month` | Monthly dot grid with current day highlighted |
| `year` | Yearly progress ring (0-100%) |
| `weeknum` | Week number progress ring |
| `weeknumdot` | 52-week dot grid visualization |
| *(empty)* | Default stacked view (all time periods) |

## 📸 Screenshots

### Day Progress (`day`)

Circular ring showing progress through the current day.

| Day Progress Ring |
|:--:|
| ![Day Progress](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/timeprogress/timeprogress_s_7.png) |

### Month Progress (`month`)

Dot grid visualization showing progress through the current month.

| Month Dot Grid |
|:--:|
| ![Month Progress](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/timeprogress/timeprogress_s_2.png) |

### Year Progress (`year`)

Circular ring displaying yearly progress with days passed.

| Small | Medium | Large |
|:--:|:--:|:--:|
| ![Year Small](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/timeprogress/timeprogress_s_1.png) | ![Year Medium](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/timeprogress/timeprogress_m_1.png) | ![Year Large](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/timeprogress/timeprogress_l.png) |

### Week Progress (`week`)

Ring visualization showing progress through the current week.

| Week Progress Ring |
|:--:|
| ![Week Progress](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/timeprogress/timeprogress_s_5.png) |

### Week Number (`weeknum`)

Circular ring showing which week of the year you're in.

| Week Number Ring |
|:--:|
| ![Week Number](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/timeprogress/timeprogress_s_4.png) |

### Week Number Dots (`weeknumdot`)

Dot grid marking each week of the year with current week highlighted.

| Week Dot Grid |
|:--:|
| ![Week Dots](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/timeprogress/timeprogress_s_3.png) |

### Default Mode (no parameter)

Stacked progress bars showing today, this week, this month, and this year.

| Medium Default | Small Default |
|:--:|:--:|
| ![Default Medium](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/timeprogress/timeprogress_m_2.png) | ![Default Small](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/timeprogress/timeprogress_s_6.png) |

## ⚙️ Widget Parameters

Configure your widget by adding a parameter when setting it up:

### Time Period Options

| Parameter | Description | Best For |
|-----------|-------------|----------|
| `day` | Current day progress | Tracking daily productivity |
| `week` | Weekly progress | Weekly goal monitoring |
| `month` | Monthly dot grid | Monthly milestone tracking |
| `year` | Yearly progress ring | Annual goal visualization |
| `weeknum` | Week number ring | Calendar week awareness |
| `weeknumdot` | 52-week dot grid | Full year overview |
| *(empty)* | All time periods | Comprehensive time awareness |

### Parameter Examples

```
day         → Daily progress ring
year        → Annual progress visualization  
month       → Monthly dot grid
weeknumdot  → 52-week overview
```

## 🎨 Visual Design

### Dark Gradient Theme
- **Background**: Smooth black-to-gray gradients
- **Progress Elements**: Bright, high-contrast colors
- **Typography**: Clean, readable fonts
- **Animations**: Smooth progress transitions

### Progress Visualization Types

**Circular Rings**: Perfect for continuous time periods
- Day progress (24-hour cycle)
- Week progress (7-day cycle)
- Year progress (365-day cycle)

**Dot Grids**: Great for discrete time units
- Monthly calendar view
- Weekly year overview
- Visual milestone tracking

**Progress Bars**: Ideal for multiple metrics
- Stacked time periods
- Comparative visualization
- Clean information hierarchy

## 📱 Widget Size Optimization

### Small Widget
- **Single Focus**: One time period per widget
- **Large Elements**: Bold, easy-to-read visuals
- **Minimal Text**: Essential information only
- **High Impact**: Clear progress indication

### Medium Widget
- **Dual Display**: Multiple time periods possible
- **Balanced Layout**: Text and visual elements
- **Rich Information**: More detailed progress data
- **Comparative View**: Side-by-side progress

### Large Widget
- **Comprehensive View**: All time periods together
- **Detailed Information**: Full progress breakdown
- **Visual Hierarchy**: Clear organization
- **Rich Experience**: Complete time awareness

## 🔧 Advanced Features

### Time Calculations

The widget performs precise time calculations:

```javascript
// Day progress: current time vs 24 hours
const dayProgress = (currentHour * 60 + currentMinute) / (24 * 60);

// Year progress: days passed vs total days
const yearProgress = dayOfYear / totalDaysInYear;

// Month progress: current date vs total days in month
const monthProgress = currentDate / totalDaysInMonth;
```

### Visual Customization

Modify colors and themes in the code:

```javascript
// Custom gradient themes
const customGradients = {
  background: ["#000000", "#1a1a1a"],
  progress: ["#00ff88", "#0099ff"],
  accent: ["#ff6b9d", "#ffa726"]
};
```

### Animation Settings

```javascript
// Progress ring animations
const animationDuration = 1.0; // seconds
const easeType = "easeInOut";
const updateInterval = 60; // minutes
```

## 💡 Usage Ideas

### Productivity Tracking
- **Daily Goals**: Use day progress to track daily objectives
- **Weekly Sprints**: Monitor weekly project milestones
- **Monthly Targets**: Visualize monthly achievement progress
- **Annual Planning**: Stay aware of yearly goal timelines

### Time Awareness
- **Present Moment**: Stay grounded in current time
- **Perspective**: See your place in larger time cycles
- **Mindfulness**: Regular time awareness check-ins
- **Life Balance**: Visualize work-life time distribution

### Goal Visualization
- **Deadline Tracking**: Monitor time until important deadlines
- **Habit Building**: Track consistency over time periods
- **Project Management**: Visualize project timeline progress
- **Personal Growth**: Monitor long-term development

## 🎯 Widget Combinations

### Multiple Widget Setup

Create a complete time dashboard:

1. **Small Day Widget**: Track today's progress
2. **Medium Week Widget**: Monitor weekly goals
3. **Large Year Widget**: Maintain annual perspective
4. **Small Month Widget**: Monthly milestone awareness

### Time Stack Configuration

```
Widget 1: day (small)     → Today's focus
Widget 2: week (medium)   → Weekly progress  
Widget 3: year (large)    → Annual perspective
Widget 4: default (medium)→ Complete overview
```

## 🔄 Auto-Update Features

### Real-Time Progress
- **Minute Updates**: Progress updates in real-time
- **Day Transitions**: Automatically resets at midnight
- **Week Cycles**: Updates on Sunday/Monday transitions
- **Month Changes**: Handles varying month lengths
- **Year Transitions**: Accounts for leap years

### Smart Refresh
- **Background Updates**: Widget refreshes automatically
- **Battery Optimization**: Efficient update scheduling
- **Network Independence**: No external data required
- **Offline Functionality**: Works without internet

## 🚨 Troubleshooting

### Common Issues

**Progress not updating:**
- Check if widget refresh is enabled in iOS settings
- Ensure Scriptable has background app refresh permission
- Try running the script manually in Scriptable

**Visual display issues:**
- Verify widget size matches parameter requirements
- Check iOS display settings and zoom levels
- Ensure sufficient widget space on home screen

**Time calculations incorrect:**
- Verify device time zone settings
- Check device date and time accuracy
- Ensure iOS is updated to latest version

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🤝 Contributing

Help improve the Time Progress Widget:

1. [Share visualization ideas](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)
2. [Report bugs](https://github.com/rushhiii/Scriptable-IOSWidgets/issues)
3. [Suggest features](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)
4. Submit custom themes and configurations

---

**Made with ❤️ by [rushhiii](https://github.com/rushhiii)** | **Time flows, make it visible ⏳**
