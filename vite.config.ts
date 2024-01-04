import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  AntDesignVueResolver,
  ElementPlusResolver,
  VantResolver
} from 'unplugin-vue-components/resolvers'

import { Buffer } from 'buffer'

Components({
  resolvers: [AntDesignVueResolver(), ElementPlusResolver(), VantResolver()]
} as any)
export default defineConfig({
  plugins: [vue()],
  define: {
    global: {},
    Buffer: Buffer
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      process: 'process/browser'
    }
  }
})
