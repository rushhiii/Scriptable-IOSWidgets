// icon-color: red; icon-glyph: temperature-high;
// Smart Air + Temp Widget — Enhanced AQI Layout (OpenWeather AQI scale)

const API_KEY = "YOUR_API_HERE"; // OpenWeatherMap API key
const param = args.widgetParameter?.toLowerCase().trim() || "";
const loc = await Location.current();
const lat = loc.latitude;
const lon = loc.longitude;

const listWidget = new ListWidget();
listWidget.useDefaultPadding();

try {
  const weatherRes = await new Request(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).loadJSON();
  const temp = Math.round(weatherRes.main.temp);
  const high = Math.round(weatherRes.main.temp_max);
  const low = Math.round(weatherRes.main.temp_min);
  const feels = Math.round(weatherRes.main.feels_like);
  const city = weatherRes.name;
  const diffHour = temp - feels;
  const diffToday = high - low;

  const aqiRes = await new Request(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`).loadJSON();
  const data = aqiRes.list[0];
  const components = data.components;
  const aqi = data.main.aqi; // AQI Level from OpenWeather (1–5)
  const aqiInfo = getOWAQIStyle(aqi);

  const now = new Date();

  const gradient = new LinearGradient();
  gradient.colors = [new Color(aqiInfo.bgStart), new Color(aqiInfo.bgEnd)];
  gradient.locations = [0, 1];
  listWidget.backgroundGradient = gradient;

  if (param === "temp") {
    const tempText = listWidget.addText(`${temp}°`);
    tempText.font = Font.systemFont(52);
    tempText.textColor = new Color(aqiInfo.text);

    listWidget.addSpacer(8);

    const detail = listWidget.addText(`High ${high}°  Low ${low}°`);
    detail.font = Font.systemFont(16);
    detail.textColor = new Color(aqiInfo.text);

    const diff1 = listWidget.addText(`${Math.abs(diffHour)}° ${diffHour >= 0 ? "warmer" : "cooler"} last hour`);
    diff1.font = Font.systemFont(12);
    diff1.textColor = new Color(aqiInfo.text);

    const diff2 = listWidget.addText(`${Math.abs(diffToday)}° ${diffToday >= 0 ? "warmer" : "cooler"} today`);
    diff2.font = Font.systemFont(12);
    diff2.textColor = new Color(aqiInfo.text);
  } else {
    const headStack = listWidget.addStack();
    headStack.layoutHorizontally();
    headStack.topAlignContent();
    headStack.setPadding(0, 0, 0, 0);

    const textStack = headStack.addStack();
    textStack.layoutVertically();
    textStack.topAlignContent();
    textStack.setPadding(0, 0, 0, 0);

    const header = textStack.addText('Air Quality'.toUpperCase());
    header.textColor = new Color(aqiInfo.text);
    header.font = Font.regularSystemFont(11);
    header.minimumScaleFactor = 1;

    const aqiLabel = textStack.addText(`${aqiInfo.label}`);
    aqiLabel.textColor = new Color(aqiInfo.text);
    aqiLabel.font = Font.semiboldSystemFont(25);
    aqiLabel.minimumScaleFactor = 0.3;

    headStack.addSpacer();

    const icon = SFSymbol.named(aqiInfo.sfSymbol);
    icon.applyFont(Font.systemFont(20));
    const iconImg = headStack.addImage(icon.image);
    iconImg.resizable = false;
    iconImg.tintColor = new Color(aqiInfo.text);

    listWidget.addSpacer(0);

    const aqiNum = listWidget.addText(`${aqi}`);
    aqiNum.font = Font.semiboldSystemFont(30);
    aqiNum.textColor = new Color(aqiInfo.text);

    listWidget.addSpacer();

    const cityText = listWidget.addText(city);
    cityText.font = Font.regularSystemFont(14);
    cityText.textColor = new Color(aqiInfo.text);
    cityText.minimumScaleFactor = 0.5;

    listWidget.addSpacer(2);

    const pollutionFooter = listWidget.addText(`PM2.5: ${components.pm2_5} | PM10: ${components.pm10}`);
    pollutionFooter.font = Font.systemFont(10);
    pollutionFooter.textColor = new Color(aqiInfo.text);
    pollutionFooter.minimumScaleFactor = 0.5;

    listWidget.addSpacer(2);

    const updated = listWidget.addText(`Updated ${formatTime(now)}`);
    updated.font = Font.regularSystemFont(8);
    updated.textColor = new Color(aqiInfo.text);
    updated.minimumScaleFactor = 0.5;
  }

} catch (err) {
  const errorText = listWidget.addText("Error loading data.");
  errorText.textColor = Color.red();
  errorText.font = Font.regularSystemFont(12);
  console.error(err);
}

if (config.runsInWidget) {
  Script.setWidget(listWidget);
} else {
  await listWidget.presentSmall();
}
Script.complete();

function formatTime(d) {
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
}

function getOWAQIStyle(aqi) {
  switch (aqi) {
    case 1:
      return { label: "Good", bgStart: "#8fec74", bgEnd: "#77c853", text: "#1f1f1f", sfSymbol: "leaf.fill" };
    case 2:
      return { label: "Fair", bgStart: "#d5ec74", bgEnd: "#c2d853", text: "#1f1f1f", sfSymbol: "aqi.low" };
    case 3:
      return { label: "Moderate", bgStart: "#f2e269", bgEnd: "#dfb743", text: "#1f1f1f", sfSymbol: "aqi.medium" };
    case 4:
      return { label: "Poor", bgStart: "#da5340", bgEnd: "#b32b1f", text: "#ffffff", sfSymbol: "aqi.high" };
    case 5:
    default:
      return { label: "Very Poor", bgStart: "#8b1c62", bgEnd: "#581141", text: "#ffffff", sfSymbol: "exclamationmark.triangle.fill" };
  }
}


// const LEVEL_ATTRIBUTES = [
//   {
//     threshold: 300,
//     label: "Hazardous",
//     startColor: "76205d",
//     endColor: "521541",
//     textColor: "f0f0f0",
//     darkStartColor: "333333",
//     darkEndColor: "000000",
//     darkTextColor: "ce4ec5",
//     sfSymbol: "aqi.high",
//   },
//   {
//     threshold: 200,
//     label: "Very Unhealthy",
//     startColor: "9c2424",
//     endColor: "661414",
//     textColor: "f0f0f0",
//     darkStartColor: "333333",
//     darkEndColor: "000000",
//     darkTextColor: "f33939",
//     sfSymbol: "aqi.high",
//   },
//   {
//     threshold: 150,
//     label: "Unhealthy",
//     startColor: "da5340",
//     endColor: "bc2f26",
//     textColor: "eaeaea",
//     darkStartColor: "333333",
//     darkEndColor: "000000",
//     darkTextColor: "f16745",
//     sfSymbol: "aqi.high",
//   },
//   {
//     threshold: 100,
//     label: "Unhealthy for Sensitive Groups",
//     startColor: "f5ba2a",
//     endColor: "d3781c",
//     textColor: "1f1f1f",
//     darkStartColor: "333333",
//     darkEndColor: "000000",
//     darkTextColor: "f7a021",
//     sfSymbol: "aqi.medium",
//   },
//   {
//     threshold: 50,
//     label: "Moderate",
//     startColor: "f2e269",
//     endColor: "dfb743",
//     textColor: "1f1f1f",
//     darkStartColor: "333333",
//     darkEndColor: "000000",
//     darkTextColor: "f2e269",
//     sfSymbol: "aqi.low",
//   },
//   {
//     threshold: -20,
//     label: "Good",
//     startColor: "8fec74",
//     endColor: "77c853",
//     textColor: "1f1f1f",
//     darkStartColor: "333333",
//     darkEndColor: "000000",
//     darkTextColor: "6de46d",
//     sfSymbol: "aqi.low",
//   },
// ];


