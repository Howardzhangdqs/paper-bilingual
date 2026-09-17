/**
 * 阅读偏好：主题（浅色/深色/跟随系统）与显示语言（双语/仅英文/仅中文）。
 * 偏好持久化到 localStorage，并同步为 <html> 上的类（dark、
 * lang-only-en、lang-only-zh）——布局与配色的全部响应都在 CSS 完成，
 * 不触发组件重渲染。防白闪的内联脚本（index.html）读同一个 key，
 * 在 Vue 挂载前就给 <html> 加好 dark 类。
 */
import { computed, reactive, watchEffect } from 'vue'

export type Theme = 'light' | 'dark' | 'system'
export type Lang = 'both' | 'en' | 'zh'

const KEY = 'reading-prefs'

function load(): { theme: Theme; lang: Lang; invertFigures: boolean } {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) ?? '{}')
    return {
      theme: ['light', 'dark', 'system'].includes(p.theme) ? p.theme : 'system',
      lang: ['both', 'en', 'zh'].includes(p.lang) ? p.lang : 'both',
      invertFigures: typeof p.invertFigures === 'boolean' ? p.invertFigures : true,
    }
  } catch {
    return { theme: 'system', lang: 'both', invertFigures: true }
  }
}

export const settings = reactive(load())

const systemDark = window.matchMedia('(prefers-color-scheme: dark)')

/** 实际生效的暗色判定（theme = system 时跟随系统，其余取手动选择） */
export const dark = computed(() =>
  settings.theme === 'system' ? systemDark.matches : settings.theme === 'dark',
)

function syncHtml() {
  const root = document.documentElement
  root.classList.toggle('dark', dark.value)
  root.classList.toggle('lang-only-en', settings.lang === 'en')
  root.classList.toggle('lang-only-zh', settings.lang === 'zh')
  // 插图反色开关（CSS 侧与 html.dark 联合生效，浅色下无意义）
  root.classList.toggle('invert-fig', settings.invertFigures)
  // en 列的两端对齐断词（hyphens）依赖 html lang，仅英文时一并切换
  root.lang = settings.lang === 'en' ? 'en' : 'zh-CN'
}

watchEffect(() => {
  syncHtml()
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({ theme: settings.theme, lang: settings.lang, invertFigures: settings.invertFigures }),
    )
  } catch {
    /* 隐私模式写不进就算了，本次会话内仍然生效 */
  }
})

/* matchMedia 不是 Vue 响应式源，系统明暗翻转需手动监听 */
systemDark.addEventListener('change', () => {
  if (settings.theme === 'system') syncHtml()
})
