export default {
  title: 'Scriptable iOS Widgets',
  description: 'Custom iOS Widgets built with Scriptable by rushhiii',
  base: process.env.VITEPRESS_BASE || '/Scriptable-iOSWidgets/', // Configurable base path
  
  // Transform page titles to remove emojis for clean browser tabs
  transformPageData(pageData) {
    if (pageData.title) {
      // Remove emojis from page titles for clean tab titles
      pageData.title = pageData.title.replace(/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu, '').trim();
    }
  },
  
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
    ['link', { rel: 'icon', href: `${process.env.VITEPRESS_BASE || '/Scriptable-iOSWidgets/'}/favicon.png`, id: 'favicon' }],
    ['link', { rel: 'apple-touch-icon', href: `${process.env.VITEPRESS_BASE || '/Scriptable-iOSWidgets/'}/favicon.png`, id: 'apple-favicon' }],
    ['script', {}, `
      // Dynamic favicon function
      window.updateDynamicFavicon = function() {
        try {
          const path = window.location.pathname;
          const widgetEmojis = {
            'birthday-widget': '🎂',
            'aqi-widget': '🌬️', 
            'weather-widget': '🌤️',
            'countdown-widget': '⏰',
            'github-stats-widget': '📊',
            'github-stats': '📊',
            'hindu-calendar-widget': '🕉️',
            'quote-widget': '💭',
            'schedule-widget': '📅',
            'time-progress-widget': '⏳',
            'toyota-widget': '🚗'
          };
          
          let emoji = null; // Will use static favicon as default
          
          // Find widget emoji based on path (check multiple patterns)
          for (const [key, value] of Object.entries(widgetEmojis)) {
            if (path.includes(key)) {
              emoji = value;
              break;
            }
          }
          
          // If no emoji found, use static favicon
          if (!emoji) {
            const favicon = document.getElementById('favicon') || document.querySelector('link[rel="icon"]');
            const appleFavicon = document.getElementById('apple-favicon') || document.querySelector('link[rel="apple-touch-icon"]');
            
            const staticFaviconUrl = '${process.env.VITEPRESS_BASE || '/Scriptable-iOSWidgets/'}/favicon.png';
            if (favicon) favicon.href = staticFaviconUrl;
            if (appleFavicon) appleFavicon.href = staticFaviconUrl;
            return;
          }
          
          // Create canvas for emoji favicon
          const canvas = document.createElement('canvas');
          canvas.width = 64;
          canvas.height = 64;
          const ctx = canvas.getContext('2d');
          
          // Clear canvas
          ctx.clearRect(0, 0, 64, 64);
          
          // Add subtle background
          const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
          gradient.addColorStop(0, 'rgba(102, 126, 234, 0.1)');
          gradient.addColorStop(1, 'rgba(118, 75, 162, 0.05)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 64, 64);
          
          // Draw emoji
          ctx.font = '48px Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';
          ctx.fillText(emoji, 32, 32);
          
          // Convert to data URL
          const dataURL = canvas.toDataURL('image/png');
          
          // Update favicon
          const favicon = document.getElementById('favicon') || document.querySelector('link[rel="icon"]');
          if (favicon) favicon.href = dataURL;
          
          const appleFavicon = document.getElementById('apple-favicon') || document.querySelector('link[rel="apple-touch-icon"]');
          if (appleFavicon) appleFavicon.href = dataURL;
          
        } catch (error) {
          console.log('Dynamic favicon update failed:', error);
        }
      };
      
      // Update on load and route changes
      if (typeof window !== 'undefined') {
        window.addEventListener('load', window.updateDynamicFavicon);
        
        // For VitePress route changes
        let lastPath = '';
        setInterval(() => {
          if (window.location.pathname !== lastPath) {
            lastPath = window.location.pathname;
            setTimeout(window.updateDynamicFavicon, 200);
          }
        }, 500);
      }
    `],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Scriptable iOS Widgets | Beautiful Custom Widgets' }],
    ['meta', { property: 'og:site_name', content: 'Scriptable iOS Widgets' }],
    ['meta', { property: 'og:url', content: 'https://rushhiii.github.io/Scriptable-iOSWidgets/' }]
  ],
  
  themeConfig: {
    logo: 'https://raw.githubusercontent.com/rushhiii/Scriptable-iOSWidgets/main/.src/scriptable_icon.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Overview', link: '/widgets/' },
      { text: 'Installation', link: '/installation' },
      { text: 'GitHub', link: 'https://github.com/rushhiii/Scriptable-iOSWidgets' }
    ],
    
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Overview', link: '/widgets/' },
          { text: 'Installation Guide', link: '/installation' }
        ]
      },
      {
        text: 'Widgets List',
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
        text: 'Resources',
        items: [
          { text: 'Scriptable Documentation', link: 'https://docs.scriptable.app/' },
          { text: 'Contributing', link: '/contributing/' }
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/rushhiii/Scriptable-iOSWidgets' }
    ],
    
    footer: {
      message: `<p style="color: var(--vp-c-text-3); font-size: 0.9rem; margin: 0;">
  Made with ❤️ by <a href="https://github.com/rushhiii" style="color: #667eea; text-decoration: none; font-weight: 500;">rushhiii</a> for the iOS community<br>
  <span style="opacity: 0.7;">All widgets are open source and free to use • Share the love!</span>
</p>`,
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://github.com/rushhiii">rushhiii</a> • <a href="https://www.instagram.com/the.tirth12">Follow on Instagram</a>`
    },
    
    editLink: {
      pattern: 'https://github.com/rushhiii/Scriptable-iOSWidgets/edit/main/docs/:path'
    },
    
    search: {
      provider: 'local'
    }
  }
}
