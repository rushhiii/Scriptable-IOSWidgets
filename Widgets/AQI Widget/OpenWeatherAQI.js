// Variables used by Scriptable.
// icon-color: deep-green; icon-glyph: temperature-high;
"use strict";

/**
 * OpenWeather AQI + Temperature Widget for Scriptable
 * Adapted from Jason Snell's PurpleAir widget
 * Uses OpenWeather Air Pollution API and Weather API
 * 
 * Parameters:
 * - "temp" = Show temperature view
 * - "temp,dark" = Show temperature view with dark theme
 * - "temp,light" = Show temperature view with light theme
 * - "dark" = Show AQI view with dark theme
 * - "light" = Show AQI view with light theme
 * - Leave empty for default AQI view with auto theme
 */

const API_KEY = "YOUR_API_HERE"; // OpenWeatherMap API key

const API_URL = "https://api.openweathermap.org/data/2.5/air_pollution";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Parse widget parameters
const params = (args.widgetParameter || "").toLowerCase().split(",");
const showTemp = params.includes("temp");
const forceTheme = params.find(p => p === "light" || p === "dark") || null;

/**
 * Widget attributes: AQI level threshold, text label, gradient start and end colors, text color
 */
const LEVEL_ATTRIBUTES = [
  {
    threshold: 300,
    label: "Hazardous",
    startColor: "76205d",
    endColor: "521541",
    textColor: "f0f0f0",
    darkStartColor: "333333",
    darkEndColor: "000000",
    darkTextColor: "ce4ec5",
    sfSymbol: "aqi.high",
  },
  {
    threshold: 200,
    label: "Very Unhealthy",
    startColor: "9c2424",
    endColor: "661414",
    textColor: "f0f0f0",
    darkStartColor: "333333",
    darkEndColor: "000000",
    darkTextColor: "f33939",
    sfSymbol: "aqi.high",
  },
  {
    threshold: 150,
    label: "Unhealthy",
    startColor: "da5340",
    endColor: "bc2f26",
    textColor: "eaeaea",
    darkStartColor: "333333",
    darkEndColor: "000000",
    darkTextColor: "f16745",
    sfSymbol: "aqi.high",
  },
  {
    threshold: 100,
    label: "Unhealthy for Sensitive Groups",
    startColor: "f5ba2a",
    endColor: "d3781c",
    textColor: "1f1f1f",
    darkStartColor: "333333",
    darkEndColor: "000000",
    darkTextColor: "f7a021",
    sfSymbol: "aqi.medium",
  },
  {
    threshold: 50,
    label: "Moderate",
    startColor: "f2e269",
    endColor: "dfb743",
    textColor: "1f1f1f",
    darkStartColor: "333333",
    darkEndColor: "000000",
    darkTextColor: "f2e269",
    sfSymbol: "aqi.low",
  },
  {
    threshold: -20,
    label: "Good",
    startColor: "8fec74",
    endColor: "77c853",
    textColor: "1f1f1f",
    darkStartColor: "333333",
    darkEndColor: "000000",
    darkTextColor: "6de46d",
    sfSymbol: "aqi.low",
  },
];

/**
 * Helper: Get latitude and longitude
 */
async function getLatLon() {
  try {
    const { latitude, longitude } = await Location.current();
    return { lat: latitude, lon: longitude };
  } catch (error) {
    console.log("Location error:", error);
    throw new Error("Unable to get location. Please check location permissions.");
  }
}

/**
 * Fetch weather data from OpenWeather
 */
async function getWeatherData(lat, lon) {
  const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const req = new Request(url);
  req.timeoutInterval = 10;
  const res = await req.loadJSON();

  if (!res.main) {
    throw new Error("Invalid weather data received");
  }

  return {
    temp: Math.round(res.main.temp),
    high: Math.round(res.main.temp_max),
    low: Math.round(res.main.temp_min),
    feels: Math.round(res.main.feels_like),
    city: res.name || "Unknown Location",
    description: res.weather?.[0]?.description || "Unknown"
  };
}

/**
 * Fetch AQI data from OpenWeather
 */
async function getAQIData(lat, lon) {
  const url = `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const req = new Request(url);
  req.timeoutInterval = 10;
  const res = await req.loadJSON();

  if (!res.list || !res.list[0]) {
    throw new Error("Invalid AQI data received");
  }

  const listItem = res.list[0];
  const pm2_5 = listItem.components?.pm2_5 || 0;
  const pm10 = listItem.components?.pm10 || 0;
  const aqiUS = aqiFromPM(pm2_5);

  return {
    aqi: aqiUS,
    pm2_5: Math.round(pm2_5 * 10) / 10,
    pm10: Math.round(pm10 * 10) / 10,
    data: listItem,
  };
}

/**
 * Map PM2.5 to US AQI
 */
function aqiFromPM(pm) {
  if (isNaN(pm) || pm < 0) return 0;
  
  if (pm > 350.5) return calculateAQI(pm, 500.0, 401.0, 500.0, 350.5);
  if (pm > 250.5) return calculateAQI(pm, 400.0, 301.0, 350.4, 250.5);
  if (pm > 150.5) return calculateAQI(pm, 300.0, 201.0, 250.4, 150.5);
  if (pm > 55.5) return calculateAQI(pm, 200.0, 151.0, 150.4, 55.5);
  if (pm > 35.5) return calculateAQI(pm, 150.0, 101.0, 55.4, 35.5);
  if (pm > 12.1) return calculateAQI(pm, 100.0, 51.0, 35.4, 12.1);
  if (pm >= 0.0) return calculateAQI(pm, 50.0, 0.0, 12.0, 0.0);
  return 0;
}

function calculateAQI(Cp, Ih, Il, BPh, BPl) {
  const a = Ih - Il;
  const b = BPh - BPl;
  const c = Cp - BPl;
  return Math.round((a / b) * c + Il);
}

/**
 * Calculates the AQI level
 */
function calculateLevel(aqi) {
  const level = Number(aqi) || 0;

  const {
    label = "Unknown",
    startColor = "cccccc",
    endColor = "999999", 
    textColor = "000000",
    darkStartColor = "333333",
    darkEndColor = "000000",
    darkTextColor = "ffffff",
    threshold = -Infinity,
    sfSymbol = "questionmark.circle",
  } = LEVEL_ATTRIBUTES.find(({ threshold }) => level > threshold) || {};

  return {
    label,
    startColor,
    endColor,
    textColor,
    darkStartColor,
    darkEndColor,
    darkTextColor,
    threshold,
    level,
    sfSymbol,
  };
}

/**
 * Get temperature-based theme colors
 */
function getTempTheme(temp) {
  if (temp >= 35) {
    return {
      startColor: "ff4500",
      endColor: "dc143c",
      textColor: "ffffff",
      darkStartColor: "333333",
      darkEndColor: "000000",
      darkTextColor: "ff6347"
    };
  } else if (temp >= 25) {
    return {
      startColor: "ffa500",
      endColor: "ff8c00",
      textColor: "000000",
      darkStartColor: "333333",
      darkEndColor: "000000",
      darkTextColor: "ffa500"
    };
  } else if (temp >= 15) {
    return {
      startColor: "87ceeb",
      endColor: "4682b4",
      textColor: "000000",
      darkStartColor: "333333",
      darkEndColor: "000000",
      darkTextColor: "87ceeb"
    };
  } else {
    return {
      startColor: "b0e0e6",
      endColor: "4169e1",
      textColor: "000000",
      darkStartColor: "333333",
      darkEndColor: "000000",
      darkTextColor: "87cefa"
    };
  }
}

/**
 * Get color based on theme preference
 */
function getThemedColor(lightColor, darkColor) {
  if (forceTheme === "light") {
    return new Color(lightColor);
  } else if (forceTheme === "dark") {
    return new Color(darkColor);
  } else {
    return Color.dynamic(new Color(lightColor), new Color(darkColor));
  }
}

/**
 * Create an SFSymbol
 */
function createSymbol(symbolName, fontSize) {
  try {
    const symbol = SFSymbol.named(symbolName);
    symbol.applyFont(Font.systemFont(fontSize));
    return symbol;
  } catch (error) {
    // Fallback symbol
    const fallback = SFSymbol.named("circle.fill");
    fallback.applyFont(Font.systemFont(fontSize));
    return fallback;
  }
}

async function run() {
  const listWidget = new ListWidget();
  listWidget.useDefaultPadding();

  try {
    // FIXED: Get location coordinates first
    const { lat, lon } = await getLatLon();

    if (showTemp) {
      // TEMPERATURE MODE
      const weatherData = await getWeatherData(lat, lon);
      const tempTheme = getTempTheme(weatherData.temp);

      const startColor = getThemedColor(tempTheme.startColor, tempTheme.darkStartColor);
      const endColor = getThemedColor(tempTheme.endColor, tempTheme.darkEndColor);
      const textColor = getThemedColor(tempTheme.textColor, tempTheme.darkTextColor);

      // Background
      const gradient = new LinearGradient();
      gradient.colors = [startColor, endColor];
      gradient.locations = [0.0, 1];
      listWidget.backgroundGradient = gradient;

      // Main temperature
      const tempText = listWidget.addText(`${weatherData.temp}°`);
      tempText.font = Font.systemFont(52);
      tempText.textColor = textColor;

      listWidget.addSpacer(8);

      // High/Low
      const detail = listWidget.addText(`High ${weatherData.high}°  Low ${weatherData.low}°`);
      detail.font = Font.systemFont(15);
      detail.textColor = textColor;

      // Temperature differences
      const diffFeels = weatherData.temp - weatherData.feels;
      const diffToday = weatherData.high - weatherData.low;

      const diffWrap = listWidget.addStack();
      diffWrap.layoutHorizontally();

      const diffdeg = diffWrap.addText(`${Math.abs(diffFeels)}°`);
      diffdeg.font = Font.systemFont(10);
      diffdeg.textColor = textColor;

      diffWrap.addSpacer(4);

      const diff1 = diffWrap.addText(`${diffFeels >= 0 ? "warmer" : "cooler"} than feels like`);
      diff1.font = Font.systemFont(10);
      diff1.textColor = textColor;
      diff1.lineLimit = 2;

      const diff2 = listWidget.addText(`${diffToday}° range today`);
      diff2.font = Font.systemFont(10);
      diff2.textColor = textColor;

      listWidget.addSpacer();

      // City name
      const cityText = listWidget.addText(weatherData.city);
      cityText.font = Font.regularSystemFont(11);
      cityText.textColor = textColor;

    } else {
      // AQI MODE (original functionality)
      const aqiData = await getAQIData(lat, lon);
      const weatherData = await getWeatherData(lat, lon);
      const aqi = aqiData.aqi;
      const level = calculateLevel(aqi);
      const aqiText = aqi.toString();

      const startColor = getThemedColor(level.startColor, level.darkStartColor);
      const endColor = getThemedColor(level.endColor, level.darkEndColor);
      const textColor = getThemedColor(level.textColor, level.darkTextColor);

      // Background
      const gradient = new LinearGradient();
      gradient.colors = [startColor, endColor];
      gradient.locations = [0.0, 1];
      listWidget.backgroundGradient = gradient;

      // Header
      const headStack = listWidget.addStack();
      headStack.layoutHorizontally();
      headStack.topAlignContent();
      headStack.setPadding(0, 0, 0, 0);

      const textStack = headStack.addStack();
      textStack.layoutVertically();
      textStack.topAlignContent();
      textStack.setPadding(0, 0, 0, 0);

      const header = textStack.addText('Air Quality'.toUpperCase());
      header.textColor = textColor;
      header.font = Font.regularSystemFont(11);
      header.minimumScaleFactor = 1;

      const wordLevel = textStack.addText(level.label);
      wordLevel.textColor = textColor;
      wordLevel.font = Font.semiboldSystemFont(25);
      wordLevel.minimumScaleFactor = 0.3;

      headStack.addSpacer();

      const statusSymbol = createSymbol(level.sfSymbol, 20);
      const statusImg = headStack.addImage(statusSymbol.image);
      statusImg.resizable = false;
      statusImg.tintColor = textColor;

      listWidget.addSpacer(0);

      // Score
      const scoreStack = listWidget.addStack();
      scoreStack.centerAlignContent();

      const content = scoreStack.addText(aqiText);
      content.textColor = textColor;
      content.font = Font.semiboldSystemFont(30);

      listWidget.addSpacer();

      // City name for AQI mode
      const cityText = listWidget.addText(weatherData.city);
      cityText.font = Font.regularSystemFont(14);
      cityText.textColor = textColor;

      listWidget.addSpacer(2);

      // PM values
      const pmText = listWidget.addText(`PM2.5: ${aqiData.pm2_5} | PM10: ${aqiData.pm10}`);
      pmText.textColor = textColor;
      pmText.font = Font.systemFont(10);
      pmText.minimumScaleFactor = 0.5;

      listWidget.addSpacer(2);

      // FIXED: Use proper timestamp from AQI data
      let updatedAt = "Just now";
      try {
        if (aqiData.data && aqiData.data.dt) {
          updatedAt = new Date(aqiData.data.dt * 1000).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          });
        } else {
          updatedAt = new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          });
        }
      } catch (timeError) {
        console.log("Time formatting error:", timeError);
      }
      
      const widgetText = listWidget.addText(`Updated ${updatedAt}`);
      widgetText.textColor = textColor;
      widgetText.font = Font.regularSystemFont(8);
      widgetText.minimumScaleFactor = 0.5;
    }

  } catch (error) {
    console.error("Widget error:", error);
    
    // Error display with better styling
    listWidget.backgroundColor = new Color("ffeeee");
    
    const header = listWidget.addText('Error'.toUpperCase());
    header.textColor = new Color('cc0000');
    header.font = Font.regularSystemFont(11);

    listWidget.addSpacer(15);

    const errorMessage = error.message || error.toString();
    const wordLevel = listWidget.addText(errorMessage);
    wordLevel.textColor = new Color('666666');
    wordLevel.font = Font.semiboldSystemFont(12);
    wordLevel.minimumScaleFactor = 0.8;
  }

  // FIXED: Proper widget presentation logic
  if (config.runsInWidget) {
    Script.setWidget(listWidget);
  } else {
    await listWidget.presentSmall();
  }
  
  Script.complete();
}

await run();