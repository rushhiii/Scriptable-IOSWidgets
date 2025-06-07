# 📊 GitHub Stats Widget (for Scriptable)
![GitHub Repo stars](https://img.shields.io/github/stars/rushhiii/Scriptable-IOSWidgets?style=flat-square\&logo=github)
![GitHub forks](https://img.shields.io/github/forks/rushhiii/Scriptable-IOSWidgets?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/rushhiii/Scriptable-IOSWidgets?style=flat-square)
![Scriptable Widget](https://img.shields.io/badge/Scriptable-iOS%20Widget-black?style=flat-square\&logo=apple)

![Widget Preview](https://i.imgur.com/MJzROGa.png)


Display your GitHub profile or repository statistics directly on your iOS home screen with rich visuals, contribution data, and beautiful gradient themes.


## 🔧 Features

* Dynamic GitHub profile stats powered by the GitHub GraphQL API
* Repository-specific views (Stars, Commits, Views, Issues, PRs, Followers)
* Streak tracking, contribution counts, and total commits
* Multiple layout support (small, medium, large)
* Auto-switching light/dark theme or manual override
* Custom background gradients inspired by GitHub and weather aesthetics
* Tiny display logic — no zero stats shown unless > 2
* Compact number formatting (`1.2k`, `3.4m`, etc.)
* GitHub-inspired logos, emojis, and streak indicators

---

## 🧠 Widget Modes

| Size   | View                  | Example                                     |
| ------ | --------------------- | ------------------------------------------- 
| Small  | Profile or repo stats | - 🔥 12d <br> - 📅 483 <br> - 📦 18 <br> - etc...                                  | 
| Medium | Full GitHub stats     | Adds all-time commits, contributions, repos |    
| Large  | Grid stats (dual col) | Stats grouped in columns                    |  

---

## 🧩 Setup

1. **Scriptable App**

   * Download [Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188) from the App Store.

2. **GitHub Token**

   * Generate a GitHub [Personal Access Token (classic)](https://github.com/settings/tokens) with `read:user`, `read:repo`, and `repo` scopes.
   * Store it in Scriptable’s **Keychain** under `github_token`.

   ```js
   Keychain.set("github_token", "ghp_your_generated_token_here");
   ```

3. **Save Script**

   * Copy the full widget code into a new Scriptable script named `GitHub Stats`.


## 🧾 Parameters

Use comma-separated widget parameters to customize display:

### Repo Stats Mode

```text
rushhiii/Scriptable-IOSWidgets,views,green
```

| Param     | Example                                     |
| --------- | ------------------------------------------- |
| Repo path | `rushhiii/Scriptable-IOSWidgets`            |
| Stat type | `views`, `stars`, `commits`, `issues`, etc. |
| Theme     | `green`, `night`, `blue`, etc.              |

### Profile Stats Mode

```text
green
```

| Param           | Example                         |
| --------------- | ------------------------------- |
| Theme only      | `indigo`                        |
| Profile display | Uses default username and stats |


## 🎨 Themes

Pass the theme name as the 3rd param or alone to apply custom colors.

| Theme      | Description                     |
| ---------- | ------------------------------- |
| `auto`     | Light/dark auto switch          |
| `green`    | GitHub contribution palette     |
| `indigo`   | Deep GitHub-inspired night mode |
| `day`      | Bright blue sky tones           |
| `night`    | AMOLED dark with blue-gray      |
| `blue`     | Rich GitHub + twilight blend    |
| `gray`     | Slate storm aesthetic           |
| `gitgreen` | Light contribution aesthetic    |
| `light`    | Plain white bg                  |
| `dark`     | Plain dark bg                   |


## 💡 Examples

```text
rushhiii/Scriptable-IOSWidgets,stars,night
```

```text
rushhiii/Scriptable-IOSWidgets,commits,green
```

```text
views,indigo
```

```text
gray
```


## 📦 Stats Supported

| Type            | Description                        |
| --------------- | ---------------------------------- |
| `stars`         | Repo star count                    |
| `commits`       | Commits in current year            |
| `views`         | Last 14 days repo traffic views    |
| `contributions` | Total contributions (calendar)     |
| `currstreak`    | Current contribution streak (days) |
| `longstreak`    | Longest streak ever                |
| `allcommits`    | Total commits across all repos     |
| `followers`     | GitHub followers                   |
| `following`     | GitHub following                   |
| `repos`         | Public repos owned                 |
| `issues`        | Total issues opened                |
| `prs`           | Total pull requests                |


## 🚀 Notes

* All values dynamically fetched via GitHub API.
* Small widget only shows non-zero values above 2.
* Automatically trims year (`2025` → `'25`) in compact views.
* All icons are emoji-based, styled with system fonts.


## 🖌️ Customize

To add more themes, simply extend the `themePresets` object in the code:

```js
themePresets.purple = {
  colors: ["#3a0ca3", "#7209b7", "#b5179e"],
  locations: [0.0, 0.5, 1.0],
  head: "#ffffff", text: "#f0f0f0", acc: "#ffb703"
};
```

## 🙌 Credits

* GitHub GraphQL & REST APIs
* Inspired by GitHub's visual identity
* Widget built using [Scriptable](https://scriptable.app/)
* Created by [`rushhiii`](https://github.com/rushhiii)
