# 🌤️ Weather Widget

![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Small%2C%20Medium%2C%20Large-blue)
![API](https://img.shields.io/badge/API-OpenWeatherMap-orange)

A clean and elegant iOS weather widget built with Scriptable, fetching real-time data from the OpenWeather API. The widget adapts layout and font size based on weather conditions and city names for improved readability.

## ✨ Features

- 📍 **Auto Location Detection**: Fetches your current coordinates using iOS GPS
- 🌤️ **Real-Time Forecast**: Displays current temperature and condition
- 🏙️ **City Recognition**: Dynamically detects and displays the city name
- 📐 **Responsive Typography**: Adjusts font size based on widget size and content
- 🎨 **Gradient Backgrounds**: Custom gradients for stylish appearance
- 🔁 **Auto Refresh**: Refreshes every 30 minutes to stay updated

## 🚀 Quick Setup

### 1. Get Your Free OpenWeather API Key

1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Create a free account or log in
3. Go to [API Keys](https://home.openweathermap.org/api_keys) page
4. Generate a new key and copy it

### 2. Configure the Widget

```javascript
// Replace with your API key
const API_KEY = "your_actual_key_here";
```

### 3. Install in Scriptable

1. Copy the code from [`MinimalWeather.js`](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/main/Weather%20Widget/MinimalWeather.js)
2. Open Scriptable app
3. Tap the "+" to create a new script
4. Paste the code and save as "Weather Widget"
5. Run once to test

### 4. Add to Home Screen

1. Long press on your home screen
2. Tap the "+" in the top corner
3. Search for "Scriptable"
4. Choose your preferred widget size
5. Select "Weather Widget" script

## ⚙️ Configuration Options

### Widget Sizes

| Size | Best For | Features |
|------|----------|----------|
| **Small** | Quick glance | Temperature, condition, city |
| **Medium** | Balanced view | Full weather info with icons |
| **Large** | Detailed display | Extended forecast (coming soon) |

### Customization

You can customize several aspects of the widget:

```javascript
// Refresh interval (minutes)
const REFRESH_INTERVAL = 30;

// Temperature unit (metric/imperial)
const UNITS = "metric"; // or "imperial"

// Background gradient colors
const gradientColors = [
  new Color("#74b9ff"), // Light blue
  new Color("#0984e3")  // Darker blue
];
```

## 🎨 Themes & Styling

The widget automatically adapts its appearance based on:

- **Time of day** (lighter during day, darker at night)
- **Weather conditions** (different gradients for sunny, cloudy, rainy weather)
- **Widget size** (typography scales appropriately)

## 📱 Widget Sizes Support

### Small Widget
- Current temperature
- Weather condition
- City name
- Weather icon

### Medium Widget  
- All small widget features
- Feels like temperature
- Humidity and wind speed
- Larger, more readable text

### Large Widget
- All medium widget features
- Extended forecast (future update)
- More detailed weather information

## 🔧 Advanced Configuration

### Custom Location

If you want to set a fixed location instead of auto-detection:

```javascript
// Set custom coordinates
const CUSTOM_LAT = 40.7128;
const CUSTOM_LON = -74.0060;
const USE_CUSTOM_LOCATION = true;
```

### Styling Options

```javascript
// Font configurations
const FONT_NAME = "Avenir-Heavy";
const TITLE_SIZE = 16;
const TEMP_SIZE = 32;
const SUBTITLE_SIZE = 12;

// Color scheme
const TEXT_COLOR = Color.white();
const BACKGROUND_OPACITY = 0.8;
```

## 🚨 Troubleshooting

### Common Issues

**Widget shows "Error" or doesn't load:**
- Check your API key is correct and active
- Ensure location permissions are enabled for Scriptable
- Verify internet connection

**Location not detected:**
- Enable Location Services for Scriptable in iOS Settings
- Try running the script manually first
- Check if location permissions prompt appeared

**Weather data seems outdated:**
- Widget refreshes automatically every 30 minutes
- Manually refresh by running the script in Scriptable
- Check OpenWeather API status

### API Limits

The free OpenWeather plan includes:
- 1,000 API calls per day
- Updates every 30 minutes = ~48 calls per day
- Well within the free limit!

## 🔄 Updates & Changelog

### Latest Version Features:
- Improved error handling
- Better location detection
- Responsive font sizing
- Multiple widget size support
- Custom gradient backgrounds

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🤝 Contributing

Found a bug or want to add a feature? 

1. [Open an issue](https://github.com/rushhiii/Scriptable-IOSWidgets/issues)
2. Fork the repository
3. Create your feature branch
4. Submit a pull request

## 🌟 Show Your Support

If you found this widget helpful, please:
- ⭐ Star this repository
- 🔄 Share with friends
- 🐛 Report any issues
- 💡 Suggest new features

---

**Made with ❤️ by [rushhiii](https://github.com/rushhiii)**
