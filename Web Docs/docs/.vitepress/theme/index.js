import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    if (typeof window !== 'undefined') {
      // Dynamic favicon based on page content
      const updateFavicon = () => {
        try {
          // Get the page title or main heading
          const title = document.title
          const h1 = document.querySelector('h1')
          const content = h1?.textContent || title
          
          // Extract emoji from content
          const emojiMatch = content.match(/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu)
          
          let emoji = null
          
          // Widget-specific emoji mapping
          const path = window.location.pathname
          const widgetEmojis = {
            '/birthday': '🎂',
            '/aqi': '🌬️',
            '/weather': '🌤️',
            '/countdown': '⏰',
            '/github-stats': '📊',
            '/hindu-calendar': '🕉️',
            '/quote': '💭',
            '/schedule': '📅',
            '/time-progress': '⏳',
            '/toyota': '🚗'
          }
          
          // Find emoji based on path
          for (const [key, value] of Object.entries(widgetEmojis)) {
            if (path.includes(key)) {
              emoji = value
              break
            }
          }
          
          // Fallback to extracted emoji or default
          if (!emoji && emojiMatch && emojiMatch.length > 0) {
            emoji = emojiMatch[0]
          }
          
          if (emoji) {
            // Create canvas to convert emoji to favicon
            const canvas = document.createElement('canvas')
            canvas.width = 32
            canvas.height = 32
            const ctx = canvas.getContext('2d')
            
            // Set canvas background (transparent)
            ctx.clearRect(0, 0, 32, 32)
            
            // Draw emoji
            ctx.font = '24px Arial, sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(emoji, 16, 16)
            
            // Convert to data URL
            const dataURL = canvas.toDataURL('image/png')
            
            // Update favicon
            let favicon = document.querySelector('link[rel="icon"]')
            if (!favicon) {
              favicon = document.createElement('link')
              favicon.rel = 'icon'
              document.head.appendChild(favicon)
            }
            favicon.href = dataURL
            
            // Also update apple-touch-icon
            let appleFavicon = document.querySelector('link[rel="apple-touch-icon"]')
            if (!appleFavicon) {
              appleFavicon = document.createElement('link')
              appleFavicon.rel = 'apple-touch-icon'
              document.head.appendChild(appleFavicon)
            }
            appleFavicon.href = dataURL
          }
        } catch (error) {
          console.log('Favicon update failed:', error)
        }
      }
      
      // Update favicon on page load and route changes
      if (router) {
        router.onAfterRouteChanged = () => {
          setTimeout(updateFavicon, 100)
        }
      }
      
      // Initial update
      setTimeout(updateFavicon, 100)
      
      // Update when DOM content changes (for dynamic content)
      const observer = new MutationObserver(() => {
        setTimeout(updateFavicon, 100)
      })
      
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true
        })
        updateFavicon()
      })
      
      // Fallback for already loaded content
      if (document.readyState === 'complete') {
        updateFavicon()
      }
    }
  }
}
