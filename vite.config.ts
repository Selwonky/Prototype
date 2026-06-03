import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
const nm = (m: string) => path.resolve(__dirname, 'node_modules', m)

// Shared dependencies are deduped so the design-system package and app use one React runtime.
const sharedDeps = [
  'clsx', 'tailwind-merge', 'lucide-react', 'recharts',
  '@radix-ui/react-alert-dialog', '@radix-ui/react-checkbox', '@radix-ui/react-dialog',
  '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover', '@radix-ui/react-progress',
  '@radix-ui/react-radio-group', '@radix-ui/react-select', '@radix-ui/react-switch',
  '@radix-ui/react-tabs', '@radix-ui/react-toast', '@radix-ui/react-tooltip',
]

const radixPkgs = sharedDeps.filter((d) => d.startsWith('@radix-ui/'))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: /^react$/, replacement: nm('react') },
      { find: /^react-dom$/, replacement: nm('react-dom') },
      { find: 'react/jsx-runtime', replacement: nm('react/jsx-runtime') },
      { find: 'react/jsx-dev-runtime', replacement: nm('react/jsx-dev-runtime') },
      ...sharedDeps.map((m) => ({ find: m, replacement: nm(m) })),
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('recharts')) return 'recharts'
          if (radixPkgs.some((p) => id.includes(p))) return 'radix'
        },
      },
    },
  },
  server: {
    port: 4321,
    fs: { allow: [path.resolve(__dirname)] },
  },
})
