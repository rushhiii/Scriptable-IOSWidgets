export default {
  title: 'Scriptable iOS Widgets',
  description: 'Custom iOS Widgets built with Scriptable by rushhiii',
  base: process.env.VITEPRESS_BASE || '/Scriptable-IOSWidgets/', // Configurable base path
  
  // Configure dead link checking
  ignoreDeadLinks: [
    // Ignore relative license links (in case any remain)
    /\.\.\/LICENSE/,
    // Ignore local development paths
    /localhost/,
    // Ignore any external links that might be temporarily down
    (url) => {
      return url.includes('openweathermap.org') || url.includes('api.github.com');
    }
  ],
  
  head: [
    ['link', { rel: 'icon', href: `${process.env.VITEPRESS_BASE || '/Scriptable-IOSWidgets/'}/favicon.ico` }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Scriptable iOS Widgets | Beautiful Custom Widgets' }],
    ['meta', { property: 'og:site_name', content: 'Scriptable iOS Widgets' }],
    ['meta', { property: 'og:url', content: 'https://rushhiii.github.io/Scriptable-IOSWidgets/' }]
  ],
  
  themeConfig: {
    logo: 'https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.src/scriptable_icon.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Widgets', link: '/widgets/' },
      { text: 'GitHub', link: 'https://github.com/rushhiii/Scriptable-IOSWidgets' }
    ],
    
    sidebar: [
      {
        text: '🚀 Getting Started',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Installation', link: '/installation' }
        ]
      },
      {
        text: '📱 Widgets',
        items: [
          { text: 'AQI Widget', link: '/widgets/aqi-widget' },
          { text: 'Birthday Widget', link: '/widgets/birthday-widget' },
          { text: 'Countdown Widget', link: '/widgets/countdown-widget' },
          { text: 'GitHub Stats Widget', link: '/widgets/github-stats-widget' },
          { text: 'Hindu Calendar Widget', link: '/widgets/hindu-calendar-widget' },
          { text: 'Quote Widget', link: '/widgets/quote-widget' },
          { text: 'Schedule Widget', link: '/widgets/schedule-widget' },
          { text: 'Time Progress Widget', link: '/widgets/time-progress-widget' },
          { text: 'Toyota Widget', link: '/widgets/toyota-widget' },
          { text: 'Weather Widget', link: '/widgets/weather-widget' }
        ]
      },
      {
        text: '📚 Resources',
        items: [
          { text: 'Scriptable Documentation', link: 'https://docs.scriptable.app/' },
          { text: 'Contributing', link: '/contributing' }
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/rushhiii/Scriptable-IOSWidgets' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present rushhiii'
    },
    
    editLink: {
      pattern: 'https://github.com/rushhiii/Scriptable-IOSWidgets/edit/main/docs/:path'
    },
    
    search: {
      provider: 'local'
    }
  }
}
