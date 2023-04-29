import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'portal',
      fileName: 'portal',
      formats: ['es', 'iife', 'umd'],
    },
    minify: true,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
})
