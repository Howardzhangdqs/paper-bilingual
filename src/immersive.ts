/**
 * 沉浸式阅读模式：隐藏顶栏、目录收为左下角圆形按钮（点击弹出目录
 * 浮层，浮层内可退出沉浸）。窄屏（≤980px，本就无侧栏目录）默认开启，
 * 宽屏由顶栏按钮进入。<html> 上的 .immersive 类由 App.vue 按路由
 * 同步（仅论文页生效），布局切换全在 CSS 完成。
 */
import { reactive } from 'vue'

/** 窄屏断点：与 PaperBody 的目录折叠、style.css 的媒体查询一致 */
const NARROW = '(max-width: 980px)'

export const immersive = reactive({
  on: window.matchMedia(NARROW).matches,
})

/** 跨断点（旋转屏幕/缩放窗口）时回到该断点的默认值 */
window.matchMedia(NARROW).addEventListener('change', (e) => {
  immersive.on = e.matches
})
