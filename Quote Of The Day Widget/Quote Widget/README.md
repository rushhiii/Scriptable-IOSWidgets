# 🪶 ZenQuotes Widget for Scriptable

![zenquotes](https://user-images.githubusercontent.com/your-image.png)

A minimalist, themeable iOS widget that displays a daily quote using the [ZenQuotes API](https://zenquotes.io).  
Supports light and dark themes, auto-sizing fonts, and a clean centered layout.


## 🌟 Features

- 🧘‍♂️ Fetches a **new quote every day** from ZenQuotes API
- 🎨 Supports **light** and **dark** themes via widget parameters
- ✨ Clean typography with styled quote + italic author


## 🔧 Widget Parameters

You can choose between two visual themes:

| Parameter | Theme   | Background | Text        | Accent (quote) |
|-----------|---------|------------|-------------|----------------|
| `light`   | Light   | `#FFFFFF`  | `#5A5A5A`   | `#000000`      |
| `dark`    | Dark    | `#000000`  | `#AAAAAA`   | `#FAF6E2`      |

To apply a theme:

1. Long-press the widget on your Home Screen
2. Tap **Edit Widget**
3. Under **Parameter**, enter `light` or `dark`

> If no parameter is provided or it's invalid, the widget will default to **dark**.

---

## 🧩 Widget Behavior

### 🖼️ Font Sizes by Widget Size

| Widget Size | Font Size |
|-------------|-----------|
| Small       | 15 pt     |
| Medium      | 17 pt     |
| Large       | 23 pt     |
| XL / Sheet  | 28 pt     |

## 📦 API Details

- **Source:** [https://zenquotes.io/api/today](https://zenquotes.io)
- Returns a daily updated random quote with structure:

```json
[
  {
    "q": "The only limit to our realization of tomorrow is our doubts of today.",
    "a": "Franklin D. Roosevelt"
  }
]
````

> If the API fails or is unreachable, the widget displays a fallback message.


## 🚀 Installation

1. Install the [Scriptable App](https://apps.apple.com/app/scriptable/id1405459188)
2. Create a new script and paste the full code from this repo
3. Name it something like `ZenQuoteWidget.js`
4. Add a new Scriptable widget to your Home Screen
5. Configure widget:

   * Choose your script
   * (Optional) Enter theme parameter: `light` or `dark`



## 📸 Screenshot

*(Replace with your actual screenshots)*



## 🙌 Feedback

Have feature ideas or issues? DM me on [Instagram](https://www.instagram.com/the.tirth12) or email me at <rushiofficial1205@gmail.com>.

Widgets shouldn’t be limited to timers—I’d love to build tools that help you passively learn, reflect, or stay organized. If you have a unique concept in mind, I’d love to collaborate.

## 📜 License

This project is licensed under the **MIT License**.\
Feel free to fork, build upon, and remix with attribution.

##

<p align="center">
Enjoy using this widget ~ RP
</p>
