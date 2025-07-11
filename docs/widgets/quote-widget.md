# 💭 Quote Widget

![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Small%2C%20Medium%2C%20Large-blue)
![Data Source](https://img.shields.io/badge/Data-Google%20Sheet%20(CSV)-green)
![Customization](https://img.shields.io/badge/Styling-Dynamic%20Colors%20%2B%20Size--aware-orange)

Start your day with inspiration! This widget displays daily motivational quotes with beautiful themes and customizable styling options. Fetch quotes from your personal Google Sheet with dynamic styling and size-aware filtering.

![Quote Widget Preview](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/quotes/quote_showcase_1.png)

## ✨ Features

- ✍️ **Multiple Categories**: Pulls quotes from different tabs (gita, zen, kafka, etc.)
- 🎯 **Fixed Index Selection**: Show specific quotes by index
- 📏 **Size-Aware Filtering**: Adapts font size and content based on widget size
- 🎨 **Dynamic Colors**: Automatically loads colors from Google Sheet or fallback themes
- 🔄 **Daily Refresh**: Refreshes at midnight to show new quotes
- 📱 **All Widget Sizes**: Optimized for small, medium, and large widgets

## 🚀 Quick Setup

### 1. Google Sheet Structure

Create a Google Sheet with this structure (per tab):

| Quote | Author | Font Color (hex) | Background Color (hex) |
|-------|--------|------------------|-------------------------|
| "He who has a why to live..." | Nietzsche | `#FFFFFF` | `#1A1A1A` |
| "The unexamined life..." | Socrates | *(optional)* | *(optional)* |

**Available Categories (Sheet Tabs):**
- `myquotes` - Your personal collection
- `gita` - Bhagavad Gita quotes
- `zen` - Zen philosophy
- `machiavelli` - Political wisdom
- `aurelius` - Marcus Aurelius
- `fyodor` - Dostoyevsky
- `kafka` - Franz Kafka

### 2. Configure the Widget

```javascript
// Google Sheet ID (example provided, or use your own)
const SHEET_ID = "1amFMwf_j83eRLNOAWnqMNfA3ZyE6igqjZF_OrSNww84";

// Optional: Color fallback file
// Create: Scriptable/.source/dark_theme_color_pairs.json
```

### 3. Install and Run

1. Download [`MyQuotes.js`](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/main/Quote%20Widget/MyQuotes.js)
2. Create new script in Scriptable
3. Optional: Create color fallback file in `.source/`
4. Add widget to home screen with parameters

## ⚙️ Widget Parameters

Configure your widget using **1 to 3 comma-separated values**:

```
<category>, <index>, <size>
```

**Order doesn't matter!** Examples:

| Parameter | Result |
|-----------|--------|
| `zen` | Today's quote from zen tab |
| `42,zen` | Quote #42 from zen category |
| `kafka,99,l` | Large widget, quote #99 from kafka |
| `machiavelli,s,3` | Small widget, quote #3 from machiavelli |
| `s` | Today's quote, small widget |
| `8` | Quote #8 from default category |

### Size Parameters
- `s` → Small widget
- `m` → Medium widget  
- `l` → Large widget

## 📸 Screenshots

### Small Widgets

| Daily Quotes | Philosophical | Inspirational | Wisdom |
|:--:|:--:|:--:|:--:|
| ![Small 1](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/quotes/quote_s.png) | ![Small 2](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/quotes/quote_s_1.png) | ![Small 3](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/quotes/quote_s_2.png) | ![Small 4](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/quotes/quote_s_3.png) |

### Medium Widgets

| Zen Philosophy | Literature | Motivation | Reflection |
|:--:|:--:|:--:|:--:|
| ![Medium 1](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/quotes/quote_m_1.png) | ![Medium 2](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/quotes/quote_m_2.png) | ![Medium 3](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/quotes/quote_m_3.png) | ![Medium 4](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/quotes/quote_m_4.png) |

### Large Widgets

| Extended Quotes | Full Context |
|:--:|:--:|
| ![Large 1](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/quotes/quote_l_1.png) | ![Large 2](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/quotes/quote_l_2.png) |

## 🎨 Color Customization

### Dynamic Colors from Sheet
Add hex color codes to your Google Sheet:
- **Font Color**: Text color for the quote
- **Background Color**: Widget background color

### Fallback Color Themes
Create `Scriptable/.source/dark_theme_color_pairs.json`:

```json
[
  { "font": "#FFFFFF", "background": "#1A1A1A" },
  { "font": "#E0E0E0", "background": "#2C3E50" },
  { "font": "#F8F8F2", "background": "#44475A" },
  { "font": "#FFFFFF", "background": "#282A36" }
]
```

The widget will randomly select from these when no colors are specified in the sheet.

## 🔄 Auto-Refresh Features

### Daily Quote Rotation
- **Midnight Refresh**: Automatically shows new quote each day
- **Deterministic Selection**: Same quote shows all day (based on date)
- **Manual Refresh**: Run script in Scriptable to update immediately

### Development Mode
```javascript
// Force refresh during testing
if (!config.runsInWidget) await widget.presentMedium();
```

## 📁 File Structure

```
Scriptable/
├── MyQuotes.js              ← Main widget script
└── .source/                 ← Optional directory
    └── dark_theme_color_pairs.json  ← Color fallbacks
```

## 🔧 Advanced Configuration

### Custom Google Sheet Setup

1. **Create Your Sheet**: Use the template structure above
2. **Share Settings**: Make it viewable by anyone with the link
3. **Get Sheet ID**: Copy from the URL between `/d/` and `/edit`
4. **Update Script**: Replace `SHEET_ID` in the code

### Quote Categories

Create different tabs for different themes:
- **Personal quotes** (`myquotes`)
- **Philosophical** (`zen`, `aurelius`)
- **Literary** (`kafka`, `fyodor`)
- **Spiritual** (`gita`)
- **Strategic** (`machiavelli`)

## 🚨 Troubleshooting

### Common Issues

**"No quotes found":**
- Check Google Sheet is publicly viewable
- Verify sheet ID is correct
- Ensure tab names match categories

**Colors not loading:**
- Check hex color format (`#FFFFFF`)
- Verify fallback JSON file exists
- Test with valid color codes

**Widget not updating:**
- Manually run script in Scriptable
- Check internet connection
- Verify sheet accessibility

### API Limits

- **Google Sheets**: No strict limits for viewing
- **Update Frequency**: Once per day (midnight refresh)
- **Network Usage**: Minimal data transfer

## 💡 Usage Tips

### Best Practices
- **Curate Quality**: Add meaningful, impactful quotes
- **Organize Categories**: Group quotes by theme or author
- **Test Colors**: Preview color combinations before adding
- **Regular Updates**: Add new quotes periodically

### Creative Ideas
- **Morning Motivation**: Inspirational quotes for daily energy
- **Study Wisdom**: Educational quotes for learning
- **Reflection Time**: Philosophical quotes for contemplation
- **Goal Tracking**: Achievement-focused quotes

## 🎯 Widget Variations

### Different Use Cases

**Daily Motivation**: `zen,s` - Small zen quote
**Study Focus**: `aurelius,m` - Medium stoic wisdom  
**Evening Reflection**: `kafka,l` - Large contemplative quote
**Random Inspiration**: `myquotes` - Your personal collection

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/main/LICENSE) file for details.

## 🤝 Contributing

Want to improve the Quote Widget?

1. [Share quote collections](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)
2. [Report issues](https://github.com/rushhiii/Scriptable-IOSWidgets/issues)
3. [Suggest features](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)
4. Submit pull requests with improvements

---

**Made with ❤️ by [rushhiii](https://github.com/rushhiii)** | **Find wisdom in every moment 🌟**
