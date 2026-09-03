import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

// Stamped into the bundle (__BUILD_TIME__) and into dist/version.json at
// build time. The app fetches version.json (bypassing the cache) and
// reloads itself when the two no longer match — see src/versionCheck.js.
// This is what lets an iPhone "Add to Home Screen" icon pick up a new
// deploy without the user having to clear Safari's cache by hand.
const buildTime = String(Date.now())

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'write-version-file',
      closeBundle() {
        writeFileSync(resolve('dist/version.json'), JSON.stringify({ buildTime }))
      },
    },
  ],
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  build: {
    // Without this, the lightningcss CSS minifier rewrites "max-width" media
    // queries into the newer range syntax (e.g. "width <= 640px"), which
    // only Safari 16.4+ parses — older/other mobile Safari versions
    // silently drop the whole rule. Pinning a Safari 13 floor keeps the
    // classic, universally-supported media query syntax in the output.
    cssTarget: 'safari13',
  },
})
