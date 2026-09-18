import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { spawn } from 'node:child_process'

/**
 * dev 期 sections/*.vue 变更时重跑 scripts/gen_toc.mjs（predev 只在
 * 启动时跑一次，写作循环里改章节目录要跟着更新）。产物内容不变时不
 * 重写文件（脚本内做了幂等），watcher 不会因此再次触发，无循环。
 */
function genPaperToc(): Plugin {
  const PAPERS_VUE = /[\\/]src[\\/]papers[\\/].+\.vue$/
  let timer: NodeJS.Timeout | undefined
  const rerun = (file: string) => {
    if (!PAPERS_VUE.test(file)) return
    clearTimeout(timer) // 批量保存合并成一次生成
    timer = setTimeout(() => spawn('node', ['scripts/gen_toc.mjs'], { stdio: 'inherit' }), 100)
  }
  return {
    name: 'gen-paper-toc',
    apply: 'serve',
    configureServer(server) {
      server.watcher.on('change', rerun)
      server.watcher.on('add', rerun)
    },
  }
}

export default defineConfig({
  plugins: [vue(), vueDevTools(), genPaperToc()],
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
