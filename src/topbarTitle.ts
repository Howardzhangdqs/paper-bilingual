/**
 * 顶栏状态：论文页滚动到标题区（.paper-header）完全离开视口顶部后置真
 * ——顶栏左侧站名「论文双语对照」随即收拢淡出、论文标题接棒（App.vue
 * 渲染、PaperBody 随滚动更新；沉浸式下顶栏本身隐藏，无需区分）。
 */
import { ref } from 'vue'

export const titleScrolledAway = ref(false)

/**
 * 顶栏当前章节名（标题接棒后显示在论文标题之后）。PaperBody 的滚动
 * 判定写入：label 为当前高亮章节标题（与目录高亮同源同语言），dir 记
 * 录章节推进方向（1 = 向后翻章，新名自下顶入顶掉旧名；-1 = 向前，自
 * 上顶入），供顶栏上下顶替动画选择方向。
 */
export const topbarSectionLabel = ref('')
export const topbarSectionDir = ref<1 | -1>(1)
/** 换章是否处于高速档：距上次换章不足一拍（连续换章，如目录跳转的
 * 飞行途中、快速滚掠）时置真，顶栏顶替动画相应缩短，避免动画追不上 */
export const topbarSectionFast = ref(false)
