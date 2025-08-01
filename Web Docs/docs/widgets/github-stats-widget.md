# GitHub Stats Widget
![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat)
![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-F7DF1E?logo=javascript&style=flat)
![Platform](https://img.shields.io/badge/Platform-iOS-blue?style=flat&logo=apple)
![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-success?style=flat&logo=scriptable)
![Themes](https://img.shields.io/badge/Themes-10%2B-purple?style=flat)
![Widget Sizes](https://img.shields.io/badge/Sizes-Small%2C%20Medium%2C%20Large-informational?style=flat)
![iOS Widget](https://img.shields.io/badge/Scriptable-iOS%20Widget-black?style=flat&logo=apple)




<!-- ![github logo](https://i.imgur.com/MJzROGa.png) -->

<img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/githubstats_showcase.png">

Track your GitHub stats — commits, contributions, streaks, PRs, issues, and repo insights — all beautifully displayed on your iOS home screen using Scriptable.

> 📌 Dynamic layouts for small, medium, and large widgets with theme support and GitHub API integration.

---

### ⚙️ Features

* 🕒 **Yearly commits** and 🔥 **streak tracking**
* 📦 Repo-specific stats: ⭐ stars, 👁 views, 🧮 total commits
* 📜 All-time contributions, PRs, and issue counts
* 🎨 Multiple theme presets (auto/dark/light/indigo/night/green/etc.)
* 📐 Adaptive layouts for:

  * Small: condensed stat block
  * Medium: stat summary
  * Large: full grid layout
* 📁 GitHub GraphQL + REST API support
* 🔑 Secure GitHub token storage using `Keychain`


### 🧰 Setup

1. **Copy the script** into the Scriptable app.
2. Save it as `GitHubStatsWidget.js`.


### 🔐 Token Setup

1. Generate a GitHub [Personal Access Token (PAT)](https://github.com/settings/tokens) with:

   * `read:user`
   * `repo`
   * `read:org`
2. Store it in Scriptable’s Keychain:

   ```js
   Keychain.set("github_token", "YOUR_TOKEN_HERE")
   ```


### 🧪 Widget Parameters

Pass parameters to customize behavior:

#### 🧍 Profile Mode:

```text
night
```

Shows your overall GitHub stats with the `night` theme.

#### 📦 Repo Mode:

```text
rushhiii/Scriptable-IOSWidgets,stars,indigo
```

| Format                  | Description                       |
| ----------------------- | --------------------------------- |
| `<repo>,<stat>,<theme>` | Shows a specific repo stat        |
| `<stat>,<theme>`        | Profile stats with selected theme |
| `<repo>`                | Defaults to theme = `auto`        |
| `night`                 | Only theme                        |

---

### 📐 Widget Layouts

| Size   | Layout Details                                 |
| ------ | ---------------------------------------------- |
| Small  | Focused repo or profile stat + minimal details |
| Medium | Header + 5 stat lines                          |
| Large  | Two-column detailed layout (up to 8 metrics)   |

---

### 🎨 Themes

Available values for the third parameter,\
For Widget stats Themes:

* `auto`
* `light`
* `dark`
* `blue`
* `night`
* `day`
* `gray`
* `green`
* `gitgreen`
* `indigo`

For Widget heatmap Themes:
> so when using parameter like, "heatmap,{heatmapThemeName}"

* `auto`
* `light`
* `dark`
* `red`
* `green`
* `forestCalm`
* `forestCanopy`
* `cyberPurple`
* `sunsetGold`
* `nordBlueV1`
* `nordBlueV2`
* `sunsetDusk`
* `earthyWarm`
* `arcticIce`

### 🛠 Example Use Cases

```text
// Shows views on a repo with indigo theme
rushhiii/Scriptable-IOSWidgets,views,indigo

// Shows 2025 commits in blue theme
commits,blue

// Shows profile stats in dark mode
night
```

### 📎 Notes

* All API requests use GitHub’s GraphQL v4 and REST API v3.
* Uses `Keychain.get("github_token")` for secure token storage.
* Widget automatically adapts to light/dark mode when using `auto` theme.


### 📸 Screenshots

> _Small Widget_

| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/githubstats_s_1.png" width="160"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/githubstats_s_2.png" width="160"/> |
|:--:|:--:|
| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/githubstats_s_6.png" width="160"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/github_stats_s_3.PNG" width="160"/> |

> _Medium Widgets_

| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/github_stats_m_3.PNG" width="260"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/github_stats_m_4.PNG" width="260"/> |
|:--:|:--:|
| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/github_stats_m_@.png" width="260"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/githubstats_m_4.png" width="260"/> |
| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/github_stats_m.png" width="260"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/github_stats_m_5.png" width="260"/> |


<!-- <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/githubstats_m_1.png" width="260"/> <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/githubstats_m_2.png" width="260"/>
<img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/githubstats_m_3.png" width="260"/> <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/githubstats_m_4.png" width="260"/> -->

> _Large Widget_

<img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/githubstats/githubstats_l.png" width="360"/>

## 🙌 Feedback

Have questions or want help customizing it? DM me on [Instagram](https://www.instagram.com/the.tirth12) or email me at <rushiofficial1205@gmail.com>.

Widgets shouldn’t be limited to timers—I’d love to build tools that help you passively learn, reflect, or stay organized. If you have a unique concept in mind, I’d love to collaborate.

## 📜 License

This project is licensed under the **MIT License**.

Feel free to fork, build upon, and remix with attribution.

##

<p align="center">
Enjoy using this widget ~ RP
</p>
