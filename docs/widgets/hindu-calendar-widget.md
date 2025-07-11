# 🕉️ Hindu Calendar Widget

![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Small%2C%20Medium%2C%20Large-blue)
![Theme](https://img.shields.io/badge/Theme-Hindu%20Color%20Calendar-orange)
![Color Logic](https://img.shields.io/badge/Based%20on-Day%20of%20Week-yellow)

Stay connected with Hindu traditions through daily color recommendations. This widget suggests what color to wear each day based on ancient Hindu tradition, helping you feel aligned, energized, and spiritually centered.

![Hindu Calendar Widget Preview](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/hinduclrwear/hinduclrwear_showcase.png)

## ✨ Features

- 🗓️ **Day-Aware Detection**: Automatically recognizes today's day of the week
- 🎨 **Color Recommendations**: Shows traditional Hindu color for each day
- 🧘‍♂️ **Spiritual Guidance**: Explains symbolic meaning behind each color
- 📱 **Dynamic Layouts**: Optimized for all widget sizes
- 🌈 **Auto-Adjusting Gradients**: Background colors match daily recommendations
- 🕉️ **Mindfulness Focus**: Designed for intention, clarity, and spiritual alignment
- 📶 **Offline Functionality**: Works without internet connection

## 🎨 Daily Color Traditions

Each day of the week has its own sacred color, deity, and spiritual intention:

| Day | Color | Deity/Planet | Spiritual Significance |
|-----|--------|--------------|----------------------|
| **Sunday** | Red | Surya (Sun) | Vitality, Leadership, Energy |
| **Monday** | White | Shiva (Moon) | Purity, Peace, Calmness |
| **Tuesday** | Orange-Red | Hanuman (Mars) | Courage, Strength, Determination |
| **Wednesday** | Green | Budh (Mercury) | Growth, Wisdom, Communication |
| **Thursday** | Yellow | Guru (Jupiter) | Knowledge, Learning, Positivity |
| **Friday** | Light Blue | Durga/Shukra (Venus) | Devotion, Love, Beauty |
| **Saturday** | Black | Shani (Saturn) | Protection, Discipline, Focus |

## 🚀 Quick Setup

### 1. Install Scriptable

Download [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) from the App Store (free).

### 2. Add the Widget Script

1. Open Scriptable and create a new script
2. Name it "Hindu Color Widget"
3. Copy the code from [`WearClrAccHindu.js`](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/main/HinduClrWear%20Widget/WearClrAccHindu.js)
4. Paste and save the script

### 3. Add to Home Screen

1. Long-press your home screen → tap **"+"**
2. Search for **"Scriptable"**
3. Choose your preferred widget size
4. Edit the widget and select **"Hindu Color Widget"**
5. Leave parameters blank (auto-detects today)

## 📸 Screenshots

### Large Widget
Displays today's color with full spiritual reasoning and guidance.

| Large Widget - Detailed View |
|:--:|
| ![Hindu Large](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/hinduclrwear/hinduclrwear_l.png) |

### Medium Widget
Shows weekly color grid with today highlighted.

| Medium Widget - Weekly Overview |
|:--:|
| ![Hindu Medium](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/hinduclrwear/hinduclrwear_m.png) |

### Small Widget
Compact display of today's color and day.

| Small Widget - Daily Focus |
|:--:|
| ![Hindu Small](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/hinduclrwear/hinduclrwear_s.png) |

## 📱 Widget Size Features

### Small Widget (2x2)
- **Today's Color**: Clear color name display
- **Day of Week**: Current day indication
- **Centered Layout**: Clean, focused design
- **Color Background**: Gradient matching today's color

### Medium Widget (4x2)
- **Weekly Grid**: All seven days and colors
- **Today Highlighted**: Current day emphasized
- **Color Swatches**: Visual color representation
- **Complete Overview**: Full week at a glance

### Large Widget (4x4)
- **Detailed Guidance**: Full spiritual explanation
- **Color Meaning**: Deep dive into symbolism
- **Deity Information**: Associated god/goddess details
- **Spiritual Intent**: Purpose and benefits of wearing the color

## 🧘‍♂️ Spiritual Significance

### Understanding the Colors

**Red (Sunday - Surya)**
- Represents vitality, leadership, and solar energy
- Enhances confidence and personal power
- Best for important meetings and bold decisions

**White (Monday - Shiva)**
- Symbolizes purity, peace, and divine consciousness
- Promotes calmness and spiritual clarity
- Ideal for meditation and introspection

**Orange-Red (Tuesday - Hanuman)**
- Embodies courage, strength, and protection
- Boosts determination and physical energy
- Perfect for challenging tasks and workouts

**Green (Wednesday - Budh)**
- Signifies growth, wisdom, and communication
- Enhances learning and intellectual pursuits
- Great for studying and creative work

**Yellow (Thursday - Guru)**
- Represents knowledge, positivity, and prosperity
- Attracts wisdom and good fortune
- Excellent for business and educational activities

**Light Blue (Friday - Durga/Shukra)**
- Symbolizes devotion, love, and artistic expression
- Promotes harmony in relationships
- Ideal for social gatherings and creative endeavors

**Black (Saturday - Shani)**
- Represents discipline, protection, and transformation
- Provides grounding and focus
- Perfect for serious work and personal development

## ⚙️ Customization Options

### Modify Color Associations

You can customize the color traditions in the script:

```javascript
const colorData = [
  {
    day: "Sunday",
    colorName: "Red",
    color: "#FF4444",
    reason: "Custom meaning for your tradition..."
  },
  // Add or modify colors as needed
];
```

### Adjust Visual Style

```javascript
// Background gradient customization
const gradientColors = {
  red: ["#FF6B6B", "#FF4444"],
  white: ["#FFFFFF", "#F0F0F0"],
  // Customize gradients for each color
};
```

### Regional Variations

The widget can be adapted for different regional Hindu traditions:
- **North Indian**: Traditional planetary color associations
- **South Indian**: Regional festival color preferences  
- **Gujarati**: Community-specific color customs
- **Bengali**: Cultural color significance

## 💡 Daily Practice Ideas

### Morning Ritual
- Check the widget when you wake up
- Choose clothing in the recommended color
- Set intention based on the spiritual meaning
- Meditate on the associated deity

### Mindful Dressing
- **Full Color**: Wear complete outfit in recommended color
- **Accent Color**: Add accessories in the daily color
- **Color Touch**: Include small elements (jewelry, scarf)
- **Mental Focus**: Simply keep the color in mind

### Spiritual Integration
- **Prayer Focus**: Direct prayers to the day's deity
- **Mantra Practice**: Chant mantras related to the planet
- **Meditation Theme**: Focus on the color's spiritual qualities
- **Daily Intention**: Set goals aligned with the color's energy

## 🔧 Advanced Features

### Widget Behavior

**Automatic Updates**: Widget refreshes daily at midnight
**Offline Operation**: No internet required after installation
**Background Gradients**: Colors automatically adjust to daily recommendation
**Text Contrast**: Ensures readability on all color backgrounds

### Development Customization

```javascript
// Add festival-specific colors
const festivalColors = {
  "Diwali": { color: "#FFD700", reason: "Golden prosperity..." },
  "Holi": { color: "#FF69B4", reason: "Celebration of colors..." },
  "Navratri": { color: "#FF4444", reason: "Divine feminine energy..." }
};
```

### Time-Based Features

The widget can be enhanced to include:
- **Tithi Integration**: Lunar calendar dates
- **Festival Notifications**: Special occasion colors
- **Auspicious Timing**: Muhurat-based recommendations
- **Seasonal Adjustments**: Colors based on Hindu seasons

## 🌸 Cultural Context

### Historical Background

Hindu color traditions stem from:
- **Vedic Astronomy**: Planetary influences on daily life
- **Ayurvedic Medicine**: Color therapy for health
- **Temple Practices**: Deity-specific color offerings
- **Cultural Festivals**: Seasonal color celebrations

### Modern Application

This widget bridges ancient wisdom with modern life:
- **Digital Accessibility**: Traditional knowledge on your phone
- **Daily Reminders**: Consistent spiritual practice
- **Cultural Connection**: Stay linked to your heritage
- **Mindful Living**: Intentional color choices

## 🚨 Troubleshooting

### Common Issues

**Widget showing wrong day:**
- Check device time zone settings
- Ensure correct date and time
- Restart Scriptable app if needed

**Colors not displaying correctly:**
- Verify widget size settings
- Check iOS display preferences
- Ensure sufficient home screen space

**Text not readable:**
- Widget automatically adjusts contrast
- Try different widget sizes
- Check iOS accessibility settings

## 📚 Further Learning

### Hindu Calendar Resources
- **Panchangam**: Traditional Hindu calendar
- **Jyotish**: Vedic astrology principles
- **Ayurveda**: Color therapy in Indian medicine
- **Temple Traditions**: Deity color associations

### Cultural Exploration
- Study planetary deities and their significance
- Learn about regional Hindu color traditions
- Explore festival-specific color customs
- Understand the spiritual science behind colors

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🤝 Contributing

Help improve the Hindu Calendar Widget:

1. [Share regional traditions](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)
2. [Report issues](https://github.com/rushhiii/Scriptable-IOSWidgets/issues)
3. [Suggest features](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)
4. Contribute cultural insights and customizations

---

**Made with ❤️ by [rushhiii](https://github.com/rushhiii)** | **Align with tradition, dress with intention 🕉️**
