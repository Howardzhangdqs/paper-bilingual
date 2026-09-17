import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  base: './',
  server: {
    // 监听所有网卡：局域网可直接用本机 IP 访问；放行内网穿透域名
    host: '0.0.0.0',
    allowedHosts: ['.trycloudflare.com', '.loca.lt'],
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
})
