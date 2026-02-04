# Scriptable iOS Widgets

![Widget collection preview](https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/scriptable_mockup_wall.png)

Scriptable iOS Widgets is a curated set of home screen widgets for the [Scriptable](https://scriptable.app) app. Each widget ships with clean JavaScript code, detailed setup guidance, and practical examples so you can go from idea to a polished home screen in minutes.

## Quick Start

1. Install Scriptable from the iOS App Store.
2. Pick a widget from the [Widget Library](widgets/index.md).
3. Copy the script into Scriptable and add any required API keys.
4. Test the script inside Scriptable to confirm everything runs.
5. Add the widget to your home screen and tweak parameters as desired.

## Widget Highlights

| Widget | What it excels at | Learn more |
| --- | --- | --- |
| 🌤️ Weather | Minimal current conditions with themed layouts | [Weather Widget](widgets/weather-widget.md)
| 🌬️ AQI | Air quality + temperature with smart theming | [AQI Widget](widgets/aqi-widget.md)
| ⏰ Countdown | Google Sheets powered countdown boards | [Countdown Widget](widgets/countdown-widget.md)
| 📊 GitHub Stats | Personal GitHub analytics dashboard | [GitHub Stats Widget](widgets/github-stats-widget.md)
| 🎂 Birthday | Accurate age tracking and reminders | [Birthday Widget](widgets/birthday-widget.md)
| 💬 Quote | Daily inspirational quotes with light/dark themes | [Quote Widget](widgets/quote-widget.md)

Visit the [full widget catalog](widgets/index.md) for screenshots, feature tables, and setup notes for every available widget.

## Why People Use These Widgets

- 🔄 **Maintained & tested**: scripts receive regular fixes and improvements.
- 📚 **Detailed docs**: each widget explains parameters, APIs, and troubleshooting steps.
- 🎨 **Customizable**: colors, layouts, API choices, and themes are easy to override.
- ⚡ **Optimized**: lightweight JavaScript keeps refreshes quick and battery friendly.
- 🔗 **Data friendly**: several widgets pull from Google Sheets or external APIs so content stays fresh.

## Support & Community

- 🐛 [Report an issue](https://github.com/rushhiii/Scriptable-IOSWidgets/issues)
- 💬 [Start a discussion](https://github.com/rushhiii/Scriptable-IOSWidgets/discussions)
- 🤝 [Read the contributing guide](contributing.md)
- 📧 [Email support](mailto:rushiofficial1205@gmail.com)
- 📱 [Instagram](https://www.instagram.com/the.tirth12)

Need onboarding help or want to showcase your setup? Open a discussion and share screenshots—we love seeing creative layouts.
}

.widget-link:hover::before {
  opacity: 1;
}

.widget-link:hover {
  color: white;
  transform: translateY(-4px);
}

.widget-link:hover::after {
  transform: translateX(4px);
}

/* Dark mode adjustments */
html.dark .widget-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-color: var(--vp-c-border-hard);
  background: var(--vp-c-bg-alt);
}

html.dark .widget-card::before {
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light), var(--vp-c-brand));
}

html.dark .widget-card:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border-color: var(--vp-c-brand);
}

html.dark .widget-image-container {
  background: linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-bg));
}

html.dark .feature-tag {
  background: linear-gradient(135deg, var(--vp-c-brand-dark), var(--vp-c-brand-soft));
  color: var(--vp-c-brand-lighter);
  border-color: var(--vp-c-brand-dark);
}

html.dark .widget-link {
  background: linear-gradient(135deg, var(--vp-c-brand-dark), var(--vp-c-brand-soft));
  border-color: var(--vp-c-brand-dark);
  color: var(--vp-c-brand-lighter);
}

html.dark .widget-link::before {
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand));
}

/* Image loading and fallback */
.widget-image {
  transition: opacity 0.3s ease;
}

.widget-image:not([src]) {
  opacity: 0;
}

/* Better mobile experience */
@media (max-width: 768px) {
  .widget-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .widget-image-container {
    height: 200px;
    padding: 0.75rem;
  }
  
  .widget-content {
    padding: 1.25rem;
  }
  
  .widget-content p:first-child {
    font-size: 1.1rem;
  }
  
  .widget-content p:not(:first-child) {
    font-size: 0.9rem;
  }
  
  .feature-tag {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }
}

@media (max-width: 480px) {
  .widget-grid {
    gap: 1rem;
    margin: 1rem 0;
  }
  
  .widget-image-container {
    height: 180px;
    padding: 0.5rem;
  }
  
  .widget-content {
    padding: 1rem;
  }
  
  .feature-tag {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
  }
  
  .widget-link {
    font-size: 0.9rem;
  }
}

/* Ensure consistent card heights and better grid layout */
.widget-grid {
  align-items: stretch;
}

.widget-card {
  min-height: 420px;
}

/* Hero image optimization */
.VPHero .VPImage {
  max-width: 800px !important;
  width: 100% !important;
  height: auto !important;
}

.vp-doc .VPHero .image {
  max-width: 800px !important;
  width: 100% !important;
}

.VPHome .VPHero .VPImage img {
  max-width: 800px !important;
  width: 100% !important;
  height: auto !important;
}

/* Improved accessibility */
.widget-card:focus-within {
  outline: 3px solid var(--vp-c-brand);
  outline-offset: 4px;
  transform: translateY(-4px);
}

.widget-link:focus {
  outline: 3px solid var(--vp-c-brand);
  outline-offset: 4px;
  border-radius: 12px;
}

/* Loading states */
.widget-card {
  position: relative;
}

.widget-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.8s ease;
  pointer-events: none;
  border-radius: 20px;
}

.widget-card:hover::after {
  left: 100%;
}

/* Enhanced mobile responsiveness */
@media (max-width: 768px) {
  .widget-card:hover {
    transform: translateY(-8px) scale(1.01);
  }
  
  .widget-link {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .widget-card:hover {
    transform: translateY(-4px);
  }
  
  .widget-link {
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
  }
  
  .feature-tag {
    padding: 0.4rem 0.7rem;
  }
}
</style>
