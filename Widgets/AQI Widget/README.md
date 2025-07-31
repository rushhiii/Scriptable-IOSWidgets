# Smart Air + Temp Widget

![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Small%2C%20Medium%2C%20Large-blue)
![Data Source](https://img.shields.io/badge/Data-OpenWeatherMap-brightgreen)
![Customization](https://img.shields.io/badge/Configurable-Temperature%20%2B%20AQI%20%2B%20City%20%2B%20Icon-orange)
![Offline Support](https://img.shields.io/badge/Fallback-Offline%20Cache%20%2B%20Auto%20Sync-lightgrey)
![Status](https://img.shields.io/badge/Status-Stable-brightgreen)
![Last Updated](https://img.shields.io/badge/Updated-June%202025-yellow)

![air widget](../.src/air_widget_showcase.png)

A dynamic and customizable air quality and temperature widget built using the [Scriptable app](https://scriptable.app), powered by OpenWeatherMap. This widget displays the air quality index (AQI) and temperature for your location directly on your iOS home screen.

> **Mention:** Air quality and temperature widget
> If the links don't work, check the [backup](https://github.com/rushhiii/Scriptable-IOSWidgets/tree/main/.assets/backups) folder.

## ✨ Features

* 🌡️ **Temperature Display**: Displays current temperature, high, low, and hourly changes.
* 🌍 **Air Quality Index (AQI)**: Real-time AQI for your location, with color-coded severity.
* 🌬️ **Pollution Data**: PM2.5, PM10, and other pollutants.
* 🎨 **Customizable Layout**: Select small, medium, or large widget sizes.
* 📶 **Offline Fallback**: Automatically switches to cached data when offline.

## 🚀 How It Works

The widget fetches data from the OpenWeatherMap API to display:

* **Current Temperature** and weather details.
* **Air Quality Index** based on the OpenWeatherMap AQI scale.
* **Pollution Levels** for PM2.5, PM10, etc.
* Customizable icon and color scheme based on AQI severity.

## 🔧 Setup

### 1. Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/).
2. Create an account and generate an API key.

### 2. Update the Script

In the `air_widget.js` script, update the `API_KEY` variable with your OpenWeatherMap API key.

```js
const API_KEY = "YOUR_API_HERE"; // OpenWeatherMap API key
```

### 3. Add the Script to Scriptable

1. **Option A – Upload Method**:

   * Download the [`air_widget.js`](./air_widget.js) script.
   * Move it to the `Scriptable` folder in your **iCloud Drive**.

2. **Option B – Manual Method**:

   * Open Scriptable, tap the **+** icon, and paste the script content.
   * Name the script (e.g., `Smart Air Widget`).

### 4. Add Widget to Home Screen

1. Long-press your iOS Home Screen to enter "jiggle mode."
2. Tap the **+** icon, scroll to add a **Scriptable** widget.
3. Choose the desired widget size (Small/Medium/Large).
4. Edit the widget settings:

   * Select the script (`Smart Air Widget`).
   * Configure widget parameters (temperature, AQI, etc.).

## ⚙️ Configure Parameters

You can modify the following parameters:

| Option              | Defaults         | Change to                          |
| ------------------- | ---------------- | ---------------------------------- |
| Script              | Smart Air Widget | Your script name                   |
| Parameters          | Text             | For example, `temp`, `aqi`, `city` |
| Temperature Display | `temp`           | `true` or `false`                  |
| AQI Display         | `aqi`            | `true` or `false`                  |
| City                | Automatically    | Set a specific city                |

> Note: The widget will show the temperature and AQI data for your current location by default. You can configure the widget to display specific cities or data.

## 📷 Screenshots

> *Small Widgets*

| <img src="../.src/air_widget_s.png" width="160"/> | <img src="../.src/air_widget_s_2.png" width="160"/> |
| :-----------------------------------------------: | :-------------------------------------------------: |
|                Temperature Display                |                      AQI Level                      |

> *Medium Widgets*

| <img src="../.src/air_widget_m.png" width="260"/> | <img src="../.src/air_widget_m_2.png" width="260"/> |
| :-----------------------------------------------: | :-------------------------------------------------: |
|                  Air Quality Info                 |                   City & Pollution                  |

> *Large Widgets*

| <img src="../.src/air_widget_l.png" width="360"/> | <img src="../.src/air_widget_l_2.png" width="360"/> |
| :-----------------------------------------------: | :-------------------------------------------------: |
|                   Full Data View                  |                  Detailed City Info                 |

## 🙌 Feedback

Have suggestions or issues? DM me on [Instagram](https://www.instagram.com/the.tirth12) or email at [rushiofficial1205@gmail.com](mailto:rushiofficial1205@gmail.com).

## 📜 License

This project is licensed under the **MIT License**.

Feel free to fork, build upon, and remix with attribution.

##

<p align="center">
Enjoy using this widget ~ RP
</p>
