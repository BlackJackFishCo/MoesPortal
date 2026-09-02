import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Without this, the lightningcss CSS minifier rewrites "max-width" media
    // queries into the newer range syntax (e.g. "width <= 640px"), which
    // only Safari 16.4+ parses — older/other mobile Safari versions
    // silently drop the whole rule. Pinning a Safari 13 floor keeps the
    // classic, universally-supported media query syntax in the output.
    cssTarget: 'safari13',
  },
})
