# 📊 GitHub Stats Widget

![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat)
![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-F7DF1E?logo=javascript&style=flat)
![Platform](https://img.shields.io/badge/Platform-iOS-blue?style=flat&logo=apple)
![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-success?style=flat&logo=scriptable)
![Themes](https://img.shields.io/badge/Themes-20%2B-purple?style=flat)
![Widget Sizes](https://img.shields.io/badge/Sizes-Small%2C%20Medium%2C%20Large-informational?style=flat)
![Offline Support](https://img.shields.io/badge/Offline-Supported-green?style=flat)
![Heatmap](https://img.shields.io/badge/Heatmap-Enabled-orange?style=flat)



<img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/githubstats_showcase.png">

**A comprehensive GitHub statistics widget for iOS** that displays your GitHub activity, contributions, and repository metrics directly on your home screen. Built for the Scriptable app with advanced features including **offline caching**, **contribution heatmaps**, and **20+ stunning themes**.

> ✨ **New Features**: Offline support with intelligent caching, GitHub contribution heatmaps, enhanced themes, and repository-specific statistics


## 🚀 Quick Setup

### 1. **Install the Widget**
1. Download and install the [Scriptable app](https://apps.apple.com/app/scriptable/id1405459188) from the App Store
2. Copy the complete script from `MyGitHubStats.js`
3. Create a new script in Scriptable and paste the code
4. Save it with a memorable name (e.g., "GitHub Stats")

### 2. **Configure Your GitHub Token**
1. **Generate a Personal Access Token:**
   - Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Select these scopes:
     - ✅ `read:user` (read user profile information)
     - ✅ `repo` (access repositories)
     - ✅ `read:org` (read organization membership)
   - Click "Generate token" and copy it

2. **Store the token securely:**
   ```javascript
   // Run this once in Scriptable to store your token
   Keychain.set("github_token_here", "YOUR_GITHUB_TOKEN")
   ```

### 3. **Update Username**
Edit the script and replace the username:
```javascript
const username = "your_github_username"; // Replace with your username
```

### 4. **Add to Home Screen**
1. Long press on your home screen
2. Tap the "+" button to add a widget
3. Search for "Scriptable" and select your preferred size
4. Configure the widget to run your GitHub Stats script

## ✨ Features

### 📈 **Comprehensive Statistics**
- � **Contribution streaks** (current & longest)
- 📅 **Annual commits** and total contributions
- ⭐ **Stars earned** across all repositories
- 🔃 **Pull requests** and ❗ **issues** count
- 📦 **Repository statistics** (public repos, language breakdown)
- 👥 **Social metrics** (followers, following)

### 🎯 **Repository-Specific Stats**
- ⭐ **Stars**, 👁️ **views**, and 📊 **commit counts** for specific repos
- 📈 **Traffic analytics** for repository insights
- � Direct links to repository pages

### 🗺️ **GitHub Contribution Heatmap**
- 📊 **Visual contribution calendar** similar to GitHub's interface
- 🎨 **Color-coded intensity** showing daily activity levels
- 📱 **Responsive grid** optimized for widget sizes
- 🗓️ **Last 19 weeks** of activity display

### 🎨 **Advanced Theming System**
- **🌓 Auto theme** - Adapts to iOS dark/light mode
- **📊 Standard themes** - `light`, `dark`, `blue`, `night`, `day`, `gray`, `green`, `gitgreen`, `indigo`
- **🗺️ Heatmap themes** - `forestCalm`, `forestCanopy`, `cyberPurple`, `sunsetGold`, `nordBlueV1`, `nordBlueV2`, `sunsetDusk`, `earthyWarm`, `arcticIce`


## 🎛️ Widget Configuration

Widget behavior is controlled through **widget parameters**. Set these when configuring your widget on the home screen.

### 📊 **Basic Profile Stats**

By defualt display your overall GitHub profile statistics with the `auto` theme: auto theme (adapts to iOS dark/light mode).

```
indigo
```

Themes:

| Theme | Description | Theme | Description |
|-------|-------------|-------|-------------|
| `auto` | Adapts to iOS appearance | `day` | Bright sky theme |
| `light` | Clean light theme | `gray` | Sophisticated gray |
| `dark` | Sleek dark theme | `green` | Nature-inspired |
| `blue` | Ocean blue gradient | `gitgreen` | GitHub green |
| `night` | Deep space theme | `indigo` | Purple-blue gradient |


### 📦 **Repository-Specific Stats**
Get detailed statistics for a specific repository:

```text
username/repository,stat_type,theme
```

**Available stat types:**
- `stars` - Repository star count
- `views` - Repository traffic views
- `commits` - Your commits this year
- `currstreak` - Current contribution streak
- `longstreak` - Longest contribution streak
- `contributions` - Total lifetime contributions
- `allcommits` - All-time commit count
- `repos` - Public repository count
- `followers` - Follower count
- `following` - Following count
- `issues` - Total issues opened
- `prs` - Total pull requests

### 🗺️ **Contribution Heatmap**
Display a GitHub-style contribution heatmap:

```text
heatmap,theme_name
```

Widget heatmap Themes:
> so when using parameter like, "heatmap,{heatmapThemeName}"
> NOTE: these theme only work with the heatmap only.

| Theme | Description | Theme | Description |
|-------|-------------|-------|-------------|
| `auto` | Adapts to iOS appearance | `cyberPurple` | Futuristic purple theme |
| `light` | Standard GitHub light | `sunsetGold` | Warm sunset colors |
| `dark` | Standard GitHub dark | `nordBlueV1` | Nordic blue variant 1 |
| `red` | Red intensity theme | `nordBlueV2` | Nordic blue variant 2 |
| `green` | Green contribution theme | `sunsetDusk` | Evening sky colors |
| `forestCalm` | Peaceful forest greens | `earthyWarm` | Warm earth tones |
| `forestCanopy` | Rich forest colors | `arcticIce` | Cool arctic theme |

### 💡 **Configuration Examples**

| Parameter | Description | Result |
|-----------|-------------|---------|
| `night` | Profile stats with night theme | Dark themed profile overview |
| `commits,blue` | Your 2025 commits with blue theme | Annual commit count in blue |
| `username/repo,stars,indigo` | Repository stars with indigo theme | Star count for specific repo |
| `heatmap,forestCalm` | Contribution heatmap with forest theme | GitHub-style activity grid |
| `currstreak,auto` | Current streak with auto theme | Streak count adapting to iOS theme |
| `repos,green` | Repository count with green theme | Total public repos in green |

## ❔ Widget Layout Guide

### **Small Widget (1x1)**

| Mode | Display Elements | Use Case |
|------|------------------|----------|
| **👤 Profile** | Username + logo, 🔥 streak, 🕒 commits, 📅 contributions, 📦 repos, 👥 followers | Personal stats summary |
| **📦 Repository** | Repo name, large stat value, clean focus | Specific repo metrics |
| **🗺️ Heatmap** | 7×5 contribution grid, month header, weekday labels | Activity visualization |

### **Medium Widget (2x1)**

| Section | Left Column | Right Column |
|---------|-------------|--------------|
| **Header** | Username + GitHub logo | - |
| **Stats** | ⭐ Stars, 🕒 Commits, 📜 Total commits, ❗ Issues, 🔃 PRs | 🔥 Current streak, 🏆 Longest streak, 📦 Repos, 👥 Followers |
| **Format** | Smart value formatting (1.2k, 345m) | Optimized spacing |

### **Large Widget (2x2)**

| Section | Content | Details |
|---------|---------|---------|
| **Header** | Username + GitHub logo | Same as medium |
| **Stats Grid** | All medium widget metrics | Two-column comprehensive view |
| **Languages** | 💻 Programming language breakdown | Color-coded indicators, percentages, two-column grid |
| **Density** | Maximum information | Enhanced visual hierarchy |

### **Heatmap Widgets**

| Widget Size | Grid | Additional Info |
|-------------|------|-----------------|
| **Small** | 7×5 contribution cells | Month name, GitHub logo, weekday labels |
| **Medium/Large** | Full 19-week grid | Color intensity levels, current streak + total contributions |
| **Features** | Responsive design | Adapts to selected theme colors |

## 🌐 Offline Support & Caching

### **Intelligent Caching System**
- **24-hour cache duration** for optimal balance of freshness and availability
- **Automatic fallback** to cached data when offline
- **iCloud synchronization** ensures cache availability across devices
- **Smart cache management** with compression and error handling

### **Offline Behavior**
- **Visual indicators** show when using cached data
- **Graceful degradation** - core stats remain available
- **Repository stats** require internet connection
- **Logo caching** for completely offline operation

### **Cache Management**
- Cache stored in `.cache/github_stats_cache.json`
- Automatic cleanup of expired cache
- Manual cache testing available in script
- Robust error handling with fallback strategies

## ⚙️ Technical Details

### **API Integration**
- **GitHub GraphQL v4** for efficient data fetching
- **GitHub REST API v3** for repository-specific metrics
- **Smart rate limiting** to avoid API limits
- **Batch requests** for optimal performance

### **Security & Privacy**
- **Secure token storage** using iOS Keychain
- **No data collection** - all processing is local
- **Minimal permissions** - only required GitHub scopes
- **iCloud sync** respects user privacy settings

### **Performance Optimizations**
- **Intelligent caching** reduces API calls
- **Lazy loading** of non-critical data
- **Compressed data storage** for efficient caching
- **Responsive layouts** adapt to widget constraints

### **Error Handling**
- **Graceful degradation** when APIs are unavailable
- **User-friendly error messages**
- **Automatic retry logic** with exponential backoff
- **Fallback to cached data** maintains functionality

## 🛠️ Troubleshooting

### **Common Issues**

**Widget shows "Failed to load data":**
- ✅ Check internet connection
- ✅ Verify GitHub token is valid and properly stored
- ✅ Ensure token has required scopes (`read:user`, `repo`, `read:org`)
- ✅ Try running the script manually in Scriptable first

**Repository stats not loading:**
- ✅ Verify repository path format: `username/repository`
- ✅ Ensure you have access to the repository
- ✅ Check if repository is public or you have appropriate permissions

**Heatmap not displaying:**
- ✅ Confirm widget parameter includes `heatmap`
- ✅ Verify theme name is spelled correctly
- ✅ Check widget size (heatmap works best on medium/large)

**Offline mode issues:**
- ✅ Run widget online first to create cache
- ✅ Verify iCloud sync is enabled for Scriptable
- ✅ Check `.cache` folder permissions

### **Advanced Debugging**

**Enable cache testing:**
```javascript
// Uncomment this line in the script to test cache system
await testCache();
```

**Token verification:**
```javascript
// Run this in Scriptable to verify token storage
console.log(Keychain.get("github_token_here"));
```

**Manual cache inspection:**
- Cache location: `Scriptable/.cache/github_stats_cache.json`
- Cache duration: 24 hours
- iCloud sync required for offline access

## 🔄 Changelog & Updates

### **Latest Version Features**
- ✨ **Offline support** with 24-hour intelligent caching
- 🗺️ **GitHub heatmap visualization** with multiple themes
- 🎨 **20+ themes** including specialized heatmap themes
- 💻 **Programming language breakdown** in large widgets
- 📊 **Enhanced repository statistics**
- 🔧 **Improved error handling** and user feedback
- 📱 **Responsive layouts** for all widget sizes

### **Performance Improvements**
- ⚡ **50% faster loading** with optimized API calls
- 💾 **Reduced memory usage** with efficient caching
- 🔄 **Smart cache management** with automatic cleanup
- 📡 **Better network handling** with retry logic

### **User Experience Enhancements**
- 🎯 **Intuitive parameter system** with flexible ordering
- 👁️ **Visual offline indicators** for transparency
- 🎨 **Adaptive themes** that respond to iOS appearance
- 📊 **Professional value formatting** (1.2k, 345m)

### 📎 Notes

* All API requests use GitHub’s GraphQL v4 and REST API v3.
* Uses `Keychain.get("github_token")` for secure token storage.
* Widget automatically adapts to light/dark mode when using `auto` theme.


## 📸 Screenshots

### **Small Widgets**
Compact yet informative displays perfect for quick stats checking

| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/githubstats_s_1.png" width="160"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/githubstats_s_2.png" width="160"/> |
|:--:|:--:|
| **Heatmap View** | **Profile Stats** |
| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/githubstats_s_6.png" width="160"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/github_stats_s_3.PNG" width="160"/> |
| **Repository Stats** | **Custom Theme** |

### **Medium Widgets**
Comprehensive overviews with dual-column layouts

| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/github_stats_m_3.PNG" width="260"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/github_stats_m_4.PNG" width="260"/> |
|:--:|:--:|
| **Heatmap Display** | **Dark Theme** |
| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/github_stats_m_@.png" width="260"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/githubstats_m_4.png" width="260"/> |
| **Complete Stats Dashboard** | **Custom Color Scheme** |
| <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/github_stats_m.png" width="260"/> | <img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/github_stats_m_5.png" width="260"/> |
| **Professional Theme** | **Minimalist Design** |

### **Large Widget**
Ultimate dashboard experience with language breakdown

<div align="center">
<img src="https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/githubstats_l.png" width="360"/>

**Complete Developer Dashboard**
*Full statistics + programming language analysis*
</div>

## 🤝 Contributing & Support

### **Community Support**
- **GitHub Issues** - Report bugs and request features
- **Direct Contact** - <rushiofficial1205@gmail.com>
- **Instagram** - [@the.tirth12](https://www.instagram.com/the.tirth12)

### **Development**
- 🔧 **Open Source** - Feel free to fork and contribute
- 🐛 **Bug Reports** - Help us improve with detailed reports
- 💡 **Feature Requests** - Share your ideas for new functionality
- 📖 **Documentation** - Help improve the documentation

### **What's Next?**
Widgets shouldn't be limited to timers—I'm building tools that help you **passively learn**, **reflect**, and **stay organized**. If you have a unique concept in mind, I'd love to collaborate!

**Potential Future Features:**
- 🔄 **Real-time notifications** for GitHub events
- 📈 **Historical trend analysis** with charts
- 🏆 **Achievement system** for coding milestones
- 🤝 **Team/organization stats** for collaborative insights

## 📄 License

This project is licensed under the [**MIT License**](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/30444dd67d981ca016b9fdcff84c170c0de4174b/LICENSE).

#

<div align="center">

**Enjoy Your GitHub Stats Widget!**

*Built with ❤️ for the iOS developer community*

~ by Rushi Patel (RP) ~

[![GitHub](https://img.shields.io/badge/GitHub-rushhiii-black?style=for-the-badge&logo=github)](https://github.com/rushhiii)
[![Instagram](https://img.shields.io/badge/Instagram-the.tirth12-E4405F?style=for-the-badge&logo=instagram)](https://www.instagram.com/the.tirth12)
[![Email](https://img.shields.io/badge/Email-Contact-blue?style=for-the-badge&logo=gmail)](mailto:rushiofficial1205@gmail.com)

#

*⭐ If this widget helped you, consider starring the repository!*

</div>