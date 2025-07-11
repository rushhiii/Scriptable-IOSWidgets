# 🚀 VitePress Documentation Setup

This guide will help you set up and run the VitePress documentation site locally.

## 📋 Prerequisites

- **Node.js** v18 or higher
- **npm** (comes with Node.js)
- **Git** for version control

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run docs:dev
```

The site will be available at: **http://localhost:5173**

### 3. Build for Production

```bash
npm run docs:build
```

### 4. Preview Production Build

```bash
npm run docs:preview
```

## 📁 Project Structure

```
docs/
├── .vitepress/
│   └── config.js          # VitePress configuration
├── widgets/               # Widget documentation pages
│   ├── index.md          # Widget overview
│   ├── weather-widget.md # Individual widget docs
│   └── ...
├── index.md              # Homepage
├── installation.md       # Installation guide
└── contributing.md       # Contributing guide
```

## ⚙️ Configuration

### Site Configuration

Edit `.vitepress/config.js` to customize:

- Site title and description
- Navigation menu
- Sidebar structure
- Theme settings
- SEO metadata

### Adding New Widgets

1. Create a new `.md` file in `docs/widgets/`
2. Add entry to sidebar in `.vitepress/config.js`
3. Follow the existing documentation template

## 🎨 Customization

### Themes and Styling

VitePress uses the default theme with customization options:

- **Colors**: Customize CSS variables
- **Layout**: Modify theme components
- **Typography**: Adjust font settings
- **Dark mode**: Built-in support

### Custom Components

Add Vue components for enhanced functionality:

```vue
<!-- .vitepress/components/WidgetDemo.vue -->
<template>
  <div class="widget-demo">
    <h3>{{ title }}</h3>
    <div class="demo-content">
      <slot />
    </div>
  </div>
</template>
```

## 📝 Writing Documentation

### Markdown Features

VitePress supports enhanced Markdown:

```markdown
::: tip Pro Tip
This is a helpful tip for users!
:::

::: warning Important
Pay attention to this warning.
:::

::: danger Critical
This is critical information.
:::
```

### Code Blocks

Syntax highlighting for JavaScript:

```javascript
// Configuration example
const CONFIG = {
  apiKey: "your_api_key_here",
  refreshInterval: 30
};
```

### Custom Containers

```markdown
::: details Click to expand
This content is hidden by default.
:::
```

## 🚀 Deployment

### Automatic Deployment

The site automatically deploys to GitHub Pages when you push to `main` branch.

### Manual Deployment

```bash
npm run deploy
```

### Custom Domain

1. Add CNAME file to `docs/public/`
2. Update GitHub Pages settings
3. Modify deployment workflow

## 🔧 Development Tips

### Hot Reload

The development server supports hot reload - changes appear instantly.

### Debug Mode

Add debug information to config:

```javascript
export default {
  // ... other config
  vite: {
    logLevel: 'info'
  }
}
```

### Performance

- Optimize images before adding
- Use lazy loading for large content
- Minimize JavaScript in pages

## 📊 Analytics

Add analytics tracking in `.vitepress/config.js`:

```javascript
export default {
  head: [
    ['script', { 
      async: true, 
      src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID' 
    }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `]
  ]
}
```

## 🤝 Contributing to Docs

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** locally with `npm run docs:dev`
5. **Build** with `npm run docs:build`
6. **Submit** a pull request

### Documentation Standards

- **Clear headings** and structure
- **Code examples** for all features
- **Screenshots** where helpful
- **Step-by-step** instructions
- **Error handling** and troubleshooting

## 🐛 Troubleshooting

### Common Issues

**Build fails:**
- Check Node.js version (needs v18+)
- Clear node_modules and reinstall
- Check for TypeScript errors

**Images not loading:**
- Place images in `docs/public/`
- Use absolute paths `/images/filename.png`
- Optimize image sizes

**Links broken:**
- Use relative paths for internal links
- Check file names and paths
- Test all links before deployment

### Getting Help

- **VitePress Docs**: https://vitepress.dev/
- **GitHub Issues**: Report bugs and ask questions
- **Discord/Community**: Join VitePress community

---

**Happy documenting!** 📚✨
