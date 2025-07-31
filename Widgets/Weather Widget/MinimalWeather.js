// icon-color: deep-purple; icon-glyph: sun;

const API_KEY = "YOUR_FREE_API_KEY"; // Your OpenWeather API key
const WEATHER_UNITS = "metric"; // Use "imperial" for Fahrenheit 

// Colors and styling 
const DARK_BG_COLOR = new Color("#000000");
const GRAY_TEXT_COLOR = new Color("#9B9B9B");
const WHITE_TEXT_COLOR = new Color("#FFFFFF");
const GOLD_TEXT_COLOR = new Color("#FFD700");

// Gradient background colors (adjust as needed) 
const testGradientClr = [
    new Color("#202020"), // Darker gray 
    // new Color("#2B2B2B"), // Black 
    new Color("#000000") // Black 
];

const blackBlueGradientClr = [
    new Color("#000000"), // Darker black 
    new Color("#111827"), // Medium blue 
];

const lightDarkBlueGradientClr = [
    new Color("#1E293B"), // Darker blue 
    new Color("#374151"), // Medium gray 
];

// Font settings 
const MAX_FONT_SIZE = 23;
const MIN_FONT_SIZE = 17;
const CHAR_WIDTH_RATIO = 0.4375; // Approximate character width ratio 

let MAX_WIDTH = getWidgetWidth();  // Adjust based on widget width 

// Function to determine widget width 
function getWidgetWidth() {
    switch (config.widgetFamily) {
        case "small": return 140;
        case "medium": return 329;
        case "large": return 687;
        default: return 140;
    }
}

// Function to estimate text width 
function estimateTextWidth(text, fontSize) {
    return text.length * (fontSize * CHAR_WIDTH_RATIO);
}

// Function to determine the best font size 
function determineFontSize(city, description) {
    let fontSize = MAX_FONT_SIZE;

    // Adjust based on first word of description 
    let firstWord = description.split(" ")[0];
    let specialWords = ["rainy", "cold", "broken", "clouds", "light", "snow", "rain", "mist", "fog"];

    // Adjust based on city name length 
    if (city.length > 7) {
        fontSize = Math.max(fontSize - 5, MIN_FONT_SIZE);
    }

    if (specialWords.includes(firstWord)) {
        fontSize = Math.min(fontSize, 20); // Moderate reduction 
    } else if (firstWord.length > 6) {
        fontSize = Math.min(fontSize, 18); // For longer first words like "overcast" 
    }

    return fontSize;
}

// Function to get current location 
async function getCurrentLocation() {
    try {
        const location = await Location.current();
        return location ? { latitude: location.latitude, longitude: location.longitude } : null;
    } catch (error) {
        console.error("Error getting location:", error);
        return null;
    }
}

// Function to fetch weather data 
async function fetchWeatherData(latitude, longitude) {
    // example
    // https://api.openweathermap.org/data/2.5/weather?lat=43.7878784&lon=-79.6622848&appid=API_KEY&units=metric
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${WEATHER_UNITS}`;
    try {


        const request = new Request(url);
        const response = await request.loadJSON();
        if (response.cod === 200) {
            return {
                // temperature: Math.round(response.main.temp),
                temperature: Math.round(response.main.feels_like),
                description: response.weather[0].description.toLowerCase(),
                city: response.name,
            };
        }

        // return { temperature: 13, description: "light intensity drizzle", city: "Downtown" };
        // return { temperature: 8, description: "overcast clouds", city: "Downtown" };
        // return { temperature: 8, description: "broken clouds", city: "Woodbridge" };
        // return { temperature: 8, description: "scattered clouds", city: "Woodbridge" };
        // return { temperature: 8, description: "scattered intensity rain", city: "Woodbridge" };
        // return { temperature: 3, description: "rainy and cold", city: "Tokyo" };
        // return { temperature: 3, description: "broken clouds", city: "Concord" };

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
    return { temperature: 99, description: "storm", city: "Unknown" }; // Default if fetch fails 
}

// Function to create a gradient background 
function createGradientBackground(widget, colors) {
    const gradient = new LinearGradient();
    gradient.colors = colors;
    gradient.locations = [0, 1];
    widget.backgroundGradient = gradient;
}


// Create widget 
async function createWidget() {
    const widget = new ListWidget();
    // widget.backgroundColor = DARK_BG_COLOR; // solid background

    createGradientBackground(widget, testGradientClr); // Apply the gradient background


    // Set the refresh interval (every 30 minutes) 
    let refreshInterval = 30 * 60 * 1000; // 30 minutes in milliseconds 
    widget.refreshAfterDate = new Date(Date.now() + refreshInterval);

    const location = await getCurrentLocation();
    const weather = location ? await fetchWeatherData(location.latitude, location.longitude) : null;

    if (!weather) {
        let errorText = widget.addText("Could not get location.");
        errorText.textColor = Color.red();
        errorText.font = Font.systemFont(14);
        return widget;
    }

    // Determine dynamic font size 
    let fontSize = determineFontSize(weather.city, weather.description);
    let font = Font.mediumSystemFont(fontSize);

    // First Row: "It's X° now" 
    let stack = widget.addStack();
    stack.layoutHorizontally();

    let text1 = stack.addText("It's ");
    text1.textColor = GRAY_TEXT_COLOR;
    text1.font = Font.boldSystemFont(fontSize);

    let tempText = stack.addText(`${weather.temperature}° `);
    tempText.textColor = WHITE_TEXT_COLOR;
    tempText.font = Font.boldSystemFont(fontSize);

    let text2 = stack.addText("now");
    text2.textColor = GRAY_TEXT_COLOR;
    text2.font = Font.boldSystemFont(fontSize);

    widget.addSpacer(2);

    // Second Row: "in City." 
    let stack2 = widget.addStack();
    stack2.layoutHorizontally();

    let text3 = stack2.addText("in ");
    text3.textColor = GRAY_TEXT_COLOR;
    text3.font = Font.boldSystemFont(fontSize);

    let cityName = weather.city;
    if (cityName.includes(" ")) {
        cityName = cityName.split(" ")[0]; // Take only the first word of city name 
    }

    let cityText = stack2.addText(`${cityName}.`);
    cityText.textColor = GOLD_TEXT_COLOR;
    cityText.font = Font.boldSystemFont(fontSize);

    widget.addSpacer(2);


    // Process Weather Description 
    let description = weather.description;
    let words = description.split(" ");
    let specialCases = ["scattered"]; // Add more words as needed 

    // Check if the description contains any special case words 
    let isSpecialCase = words.some(word => specialCases.includes(word));

    if (isSpecialCase) {
        let descriptionStack = widget.addStack();
        descriptionStack.layoutHorizontally();

        let willBeText = descriptionStack.addText("Will be ");
        willBeText.textColor = GRAY_TEXT_COLOR;
        willBeText.font = Font.boldSystemFont(fontSize);

        // Find the first long word (length > 8) 
        let firstLongWord = words.find(word => word.length > 8);

        if (firstLongWord) {
            // Display the first long word on the first line 
            let longWordText = widget.addText(firstLongWord);
            longWordText.font = Font.boldSystemFont(fontSize);
            longWordText.textColor = WHITE_TEXT_COLOR;

            // widget.addSpacer(2); 

            // Display remaining words on the next line(s) 
            let remainingWords = words.slice(words.indexOf(firstLongWord) + 1);
            let remainingStack = widget.addStack();
            remainingStack.layoutHorizontally();

            let currentWidth = 0;
            for (let i = 0; i < remainingWords.length; i++) {
                let word = remainingWords[i];
                let wordWidth = estimateTextWidth(word + " ", fontSize);

                if (currentWidth + wordWidth > MAX_WIDTH) {
                    // Start a new line if the word won't fit 
                    remainingStack = widget.addStack();
                    remainingStack.layoutHorizontally();
                    currentWidth = 0;
                }

                let descText = remainingStack.addText(i === remainingWords.length - 1 ? `${word}.` : `${word} `);
                descText.textColor = WHITE_TEXT_COLOR;
                descText.font = Font.boldSystemFont(fontSize);

                currentWidth += wordWidth;
            }
        } else {
            // If no long word is found, display all words vertically 
            for (let i = 0; i < words.length; i++) {
                let descText = widget.addText(i === words.length - 1 ? `${words[i]}.` : `${words[i]}`);
                descText.textColor = WHITE_TEXT_COLOR;
                descText.font = Font.boldSystemFont(fontSize);
            }
        }


    } else {
        // Existing word-wrapping logic for other descriptions 
        let descriptionStack = widget.addStack();
        descriptionStack.layoutHorizontally();

        let willBeText = descriptionStack.addText("Will be ");
        willBeText.textColor = GRAY_TEXT_COLOR;
        willBeText.font = Font.boldSystemFont(fontSize);

        let currentStack = descriptionStack;
        let currentWidth = estimateTextWidth("Will be ", fontSize);

        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let wordWidth = estimateTextWidth(word + " ", fontSize);

            if (currentWidth + wordWidth > MAX_WIDTH) {
                currentStack = widget.addStack();
                currentStack.layoutHorizontally();
                currentWidth = 0;
            }

            let descText = currentStack.addText(i === words.length - 1 ? `${word}.` : `${word} `);
            descText.textColor = WHITE_TEXT_COLOR;
            descText.font = Font.boldSystemFont(fontSize);

            currentWidth += wordWidth;
        }
    }



    return widget;
}

// Run the script 
const widget = await createWidget();

if (config.runsInWidget) {
    Script.setWidget(widget);
} else {
    widget.presentSmall();
}

Script.complete();