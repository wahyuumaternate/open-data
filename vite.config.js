import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: false, // Disable error overlay jika diperlukan
    },
  },
  optimizeDeps: {
    include: ['echarts', 'vue-echarts', 'axios', 'vue-router'],
    force: true, // Force re-optimize dependencies
    exclude: ['vue'], // Exclude Vue from optimization
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ['echarts'],
          'vue-echarts': ['vue-echarts'],
        },
      },
    },
  },
})
