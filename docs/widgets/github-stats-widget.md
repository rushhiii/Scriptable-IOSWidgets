# 📊 GitHub Stats Widget

![Scriptable](https://img.shields.io/badge/Scriptable-Compatible-purple)
![Widget Size](https://img.shields.io/badge/Supports-Medium%2C%20Large-blue)
![API](https://img.shields.io/badge/API-GitHub%20GraphQL-black)

Display your GitHub coding activity and statistics right on your iOS home screen. Track contributions, repositories, followers, and more with a beautiful, customizable widget.

![GitHub Stats Widget Preview](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/githubstats_showcase.png)

## ✨ Features

- 📈 **Contribution Stats**: Daily, weekly, monthly, and yearly contributions
- 📊 **Repository Metrics**: Public repos, stars, forks, and languages
- 👥 **Social Stats**: Followers, following, and profile views
- 🔥 **Streak Tracking**: Current and longest contribution streaks
- 🎨 **Customizable Design**: Multiple themes and color schemes
- 📱 **Responsive Layout**: Adapts to medium and large widget sizes
- 🔄 **Real-time Updates**: Fetches latest data from GitHub API

## � Screenshots

### Large Widget
Comprehensive GitHub dashboard with detailed statistics and contribution graph.

| Large Widget - Full Dashboard |
|:--:|
| ![GitHub Stats Large](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/githubstats_l.png) |

### Medium Widget
Essential GitHub metrics in a compact, glanceable format.

| Medium Widget - Key Stats |
|:--:|
| ![GitHub Stats Medium](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/githubstats_m.png) |

### Theme Variations
The widget supports multiple themes to match your home screen aesthetic.

| Dark Theme | Light Theme | GitHub Theme |
|:--:|:--:|:--:|
| ![GitHub Stats Dark](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/githubstats_dark.png) | ![GitHub Stats Light](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/githubstats_light.png) | ![GitHub Stats GitHub](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/githubstats/githubstats_github.png) |

## �🚀 Quick Setup

### 1. Generate GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Give it a name like "Scriptable Widget"
4. Select these scopes:
   - `read:user` - Read user profile information
   - `public_repo` - Access public repositories
5. Click **Generate token** and copy it

::: warning Keep Your Token Safe
Store your token securely and never share it publicly. This token gives access to your GitHub account.
:::

### 2. Configure the Widget

1. Download [`MyGitStats.js`](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/main/GitHubStats%20Widget/MyGitStats.js)
2. Open Scriptable and create a new script
3. Paste the code and update your credentials:

```javascript
// GitHub Configuration
const GITHUB_TOKEN = "your_github_token_here";
const GITHUB_USERNAME = "your_github_username";

// Widget Settings
const WIDGET_CONFIG = {
  theme: "dark", // or "light"
  showStreak: true,
  showLanguages: true,
  maxRepos: 5
};
```

### 3. Add to Home Screen

1. Long press on your home screen
2. Tap the "+" in the top corner
3. Search for "Scriptable"
4. Choose Medium or Large widget size
5. Select "GitHub Stats" script

## 📊 Available Metrics

### Contribution Data
- **Today's Contributions**: Commits made today
- **This Week**: Contributions in the current week
- **This Month**: Monthly contribution count
- **This Year**: Annual contribution total
- **Total Contributions**: All-time contribution count

### Repository Statistics
- **Public Repositories**: Number of public repos
- **Total Stars**: Stars across all repositories
- **Total Forks**: Forks of your repositories
- **Top Languages**: Most used programming languages

### Social Metrics
- **Followers**: People following your account
- **Following**: Accounts you follow
- **Public Gists**: Number of public gists

### Streak Information
- **Current Streak**: Current consecutive contribution days
- **Longest Streak**: Longest contribution streak ever
- **Contribution Graph**: Visual representation of activity

## 🎨 Customization Options

### Theme Configuration

```javascript
// Available themes
const THEMES = {
  dark: {
    background: "#0d1117",
    text: "#f0f6fc",
    accent: "#238636",
    secondary: "#30363d"
  },
  light: {
    background: "#ffffff",
    text: "#24292f", 
    accent: "#1f883d",
    secondary: "#f6f8fa"
  },
  github: {
    background: "#161b22",
    text: "#c9d1d9",
    accent: "#f85149",
    secondary: "#21262d"
  }
};
```

### Layout Options

```javascript
// Widget layout configuration
const LAYOUT_CONFIG = {
  showContributions: true,
  showRepositories: true,
  showSocialStats: true,
  showLanguages: true,
  compactMode: false, // For medium widgets
  maxLanguages: 3,
  maxRepos: 5
};
```

### Color Customization

```javascript
// Custom color scheme
const CUSTOM_COLORS = {
  contributions: "#238636",
  repositories: "#1f6feb", 
  social: "#f85149",
  languages: "#a5a5a5",
  text: "#f0f6fc",
  background: "#0d1117"
};
```

## 📱 Widget Sizes

### Medium Widget
Perfect for essential stats at a glance:
- Current contribution streak
- Today's contributions  
- Repository and follower counts
- Compact layout with key metrics

### Large Widget
Comprehensive dashboard view:
- Detailed contribution breakdown
- Repository statistics with stars/forks
- Top programming languages
- Social stats and streak information
- Contribution graph visualization

## 🔧 Advanced Features

### Version 2.0 Features

The latest version includes enhanced capabilities:

```javascript
// Advanced configuration options
const ADVANCED_CONFIG = {
  cacheEnabled: true,
  cacheDuration: 30, // minutes
  retryAttempts: 3,
  timeout: 10000, // milliseconds
  debugMode: false,
  animateNumbers: true
};
```

### Data Caching

To improve performance and reduce API calls:

- **Smart Caching**: Stores data locally for offline viewing
- **Configurable Duration**: Set custom cache expiration
- **Automatic Refresh**: Updates when cache expires
- **Fallback Support**: Shows cached data during network issues

### Error Handling

Robust error handling for reliable operation:

- **API Rate Limiting**: Respects GitHub API limits
- **Network Timeouts**: Handles slow connections gracefully  
- **Token Validation**: Checks token validity
- **Fallback UI**: Shows meaningful errors when data unavailable

## 📈 Understanding Your Stats

### Contribution Metrics
- **Contributions**: Include commits, pull requests, issues, and code reviews
- **Streaks**: Consecutive days with at least one contribution
- **Activity Graph**: Visual representation of your coding rhythm

### Repository Insights
- **Stars**: Indicates project popularity and community interest
- **Forks**: Shows how many developers have copied your projects
- **Languages**: Reveals your technical expertise and preferences

## 🚨 Troubleshooting

### Common Issues

**"API Error" or "Invalid Token":**
- Verify your GitHub token is correct and active
- Check token permissions include required scopes
- Ensure username matches your GitHub account

**Widget shows outdated data:**
- Check internet connection
- Clear widget cache by running script manually
- Verify GitHub API is accessible

**Layout looks crowded:**
- Try compact mode for medium widgets
- Reduce number of displayed items in config
- Switch to large widget for more space

### API Rate Limits

GitHub API has rate limits:
- **Authenticated requests**: 5,000 per hour
- **Widget refresh**: Every 30 minutes (48 requests/day)
- **Well within limits**: Normal usage won't hit limits

## 🔄 Updates & Changelog

### Version 2.0
- Enhanced GraphQL API integration
- Improved caching system
- Better error handling
- New theme options
- Performance optimizations

### Version 1.0
- Basic GitHub stats display
- REST API integration
- Simple theming
- Medium widget support

## 📚 API Reference

### GitHub GraphQL Queries

The widget uses these GraphQL queries:

```graphql
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
    repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
      totalCount
      nodes {
        stargazerCount
        forkCount
        primaryLanguage {
          name
          color
        }
      }
    }
    followers {
      totalCount
    }
    following {
      totalCount
    }
  }
}
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/rushhiii/Scriptable-IOSWidgets/blob/main/LICENSE) file for details.

## 🤝 Contributing

Help improve the GitHub Stats Widget:

1. [Report issues](https://github.com/rushhiii/Scriptable-IOSWidgets/issues)
2. [Request features](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)  
3. Submit pull requests with improvements
4. Share your custom themes and configurations

## 🌟 Show Your Support

If this widget helps track your coding journey:

- ⭐ Star the repository
- 🔄 Share with fellow developers
- 📝 Write a review or blog post
- 💡 Suggest new features

---

**Made with ❤️ by [rushhiii](https://github.com/rushhiii)**
