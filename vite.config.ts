/// <reference types="vitest" />

import { defineConfig } from 'vite';
import { PrerenderRoute } from 'nitropack';
import analog, { PrerenderContentFile } from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [analog({
    static: true,
    prerender: {
      routes: async () => [
        '/',
        '/blog',
        {
          contentDir: '/src/content',
          transform: (file: PrerenderContentFile) => {
            const slug = file.attributes['slug'] || file.name;
            return `/blog/${slug}`;
          },
        },
      ],
      postRenderingHooks: [
        async (route: PrerenderRoute) => {
          const matomoTag = `
            <!-- Matomo -->
            <script>
              var _paq = window._paq = window._paq || [];
              /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
              _paq.push(["disableCookies"]);
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="//nieruchalski.online/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '1']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            </script>
            <!-- End Matomo Code -->  
          `;
          route.contents = route.contents?.replace('</head>', `${matomoTag}</head>`);
        },
      ],
    },
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
