# 🌬️ AQI Widget

![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Small%2C%20Medium-blue)
![API](https://img.shields.io/badge/API-OpenWeather%20AQI-orange)

Monitor air quality in your area with real-time Air Quality Index (AQI) data. Stay informed about pollution levels and make better decisions about outdoor activities.

## ✨ Features

- 🌬️ **Real-time AQI Data**: Current air quality measurements
- 📍 **Location-based**: Automatic location detection or custom coordinates
- 🎨 **Color-coded Display**: Visual indicators for air quality levels
- 📊 **Detailed Breakdown**: PM2.5, PM10, O3, NO2, SO2, CO levels
- ⚠️ **Health Recommendations**: Suggestions based on current AQI
- 🔄 **Auto Refresh**: Regular updates throughout the day

## 🚀 Quick Setup

### 1. Get OpenWeather API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API Keys section
4. Generate and copy your API key

### 2. Configure the Widget

```javascript
// API Configuration
const API_KEY = "your_openweather_api_key";

// Location Settings (optional - uses GPS if not set)
const CUSTOM_LAT = null; // e.g., 40.7128
const CUSTOM_LON = null; // e.g., -74.0060
```

### 3. Install and Run

1. Download [`OpenWeatherAQI.js`](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/main/AQI%20Widget/OpenWeatherAQI.js)
2. Create new script in Scriptable
3. Paste code and configure settings
4. Add to home screen

## 📊 AQI Scale & Colors

| AQI Range | Level | Color | Health Impact |
|-----------|-------|-------|---------------|
| 0-50 | Good | 🟢 Green | Minimal impact |
| 51-100 | Moderate | 🟡 Yellow | Sensitive groups may experience minor issues |
| 101-150 | Unhealthy for Sensitive Groups | 🟠 Orange | Sensitive individuals should limit outdoor activity |
| 151-200 | Unhealthy | 🔴 Red | Everyone may experience health effects |
| 201-300 | Very Unhealthy | 🟣 Purple | Health alert - everyone should avoid outdoor activity |
| 301+ | Hazardous | 🟤 Maroon | Emergency conditions - all outdoor activity discouraged |

## 📱 Widget Display

### Small Widget
- Current AQI value
- Air quality level (Good, Moderate, etc.)
- Color-coded background
- Location name

### Medium Widget
- All small widget features
- Detailed pollutant breakdown
- Health recommendations
- Last update timestamp

## ⚙️ Customization Options

### Display Preferences

```javascript
// Widget configuration
const CONFIG = {
  showDetailedPollutants: true,
  showHealthAdvice: true,
  showLastUpdate: true,
  use24HourFormat: true,
  temperatureUnit: "celsius" // or "fahrenheit"
};
```

### Health Recommendations

The widget provides contextual advice based on AQI levels:

- **Good (0-50)**: "Great day for outdoor activities! 🌟"
- **Moderate (51-100)**: "Air quality is acceptable for most people 👍"
- **Unhealthy for Sensitive Groups (101-150)**: "Sensitive individuals should limit outdoor exposure ⚠️"
- **Unhealthy (151-200)**: "Consider reducing outdoor activities 🚫"
- **Very Unhealthy (201-300)**: "Avoid outdoor activities! Stay indoors 🏠"
- **Hazardous (301+)**: "Emergency conditions! Minimize exposure ☣️"

## 🔬 Pollutant Details

### Primary Pollutants Tracked

**PM2.5 (Fine Particulate Matter)**
- Size: ≤ 2.5 micrometers
- Sources: Vehicle emissions, industrial processes
- Health impact: Respiratory and cardiovascular issues

**PM10 (Coarse Particulate Matter)**  
- Size: ≤ 10 micrometers
- Sources: Dust, pollen, construction
- Health impact: Respiratory irritation

**O3 (Ground-level Ozone)**
- Formation: Chemical reaction in sunlight
- Sources: Vehicle and industrial emissions
- Health impact: Lung irritation, breathing difficulties

**NO2 (Nitrogen Dioxide)**
- Sources: Vehicle emissions, power plants
- Health impact: Respiratory problems, especially for asthmatics

**SO2 (Sulfur Dioxide)**
- Sources: Fossil fuel combustion, industrial processes
- Health impact: Respiratory system irritation

**CO (Carbon Monoxide)**
- Sources: Vehicle emissions, incomplete combustion
- Health impact: Reduces oxygen delivery to organs

## 🌍 Location Services

### Automatic Location Detection
- Uses iOS GPS services
- Requires location permission for Scriptable
- Updates based on current location

### Custom Location Setup
```javascript
// Set specific coordinates
const CUSTOM_LAT = 40.7128;  // New York City
const CUSTOM_LON = -74.0060;
const USE_CUSTOM_LOCATION = true;
```

### Multiple Locations
You can create multiple widget instances for different locations:
1. Duplicate the script
2. Set different coordinates for each
3. Name them distinctly (e.g., "AQI Home", "AQI Work")

## 🔧 Troubleshooting

### Common Issues

**"Location not available":**
- Enable Location Services for Scriptable in iOS Settings
- Check internet connection
- Try running script manually first

**API errors:**
- Verify OpenWeather API key is valid
- Check if you've exceeded free tier limits (1000 calls/day)
- Ensure API key has Air Pollution access

**Outdated data:**
- Widget updates every hour automatically
- Manual refresh by running script in Scriptable
- Check OpenWeather service status

### API Limits

OpenWeather free plan:
- **1,000 API calls per day**
- **Hourly updates** = 24 calls per day
- Well within free limits

## 🔄 Data Updates

### Refresh Schedule
- **Automatic**: Every 60 minutes
- **Manual**: Run script in Scriptable app
- **Background**: Updates when widget is visible

### Offline Support
- Caches last known values
- Shows cached data when offline
- Indicates when data is stale

## 🌟 Pro Tips

### Best Practices
- Check AQI before outdoor workouts
- Use for planning daily activities
- Monitor trends over time
- Share alerts with family members

### Health-Conscious Usage
- Set up multiple locations (home, work, gym)
- Check before opening windows
- Plan outdoor activities around better AQI times
- Use data to make informed health decisions

## 📱 Integration Ideas

### With Other Widgets
- Combine with Weather Widget for complete environmental data
- Use alongside Calendar for outdoor event planning
- Pair with Fitness widgets for workout timing

### Automation Ideas
- iOS Shortcuts integration for AQI-based notifications
- Combine with smart home systems
- Weather app comparison and validation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🤝 Contributing

Help improve air quality monitoring:

1. [Report issues](https://github.com/rushhiii/Scriptable-IOSWidgets/issues)
2. [Suggest features](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)
3. Share customizations and improvements
4. Help with translations for international users

---

**Made with ❤️ by [rushhiii](https://github.com/rushhiii)** | **Stay safe, breathe clean! 🌱**
