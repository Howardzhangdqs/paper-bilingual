<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { PaperMeta } from '../types'
import { paperLoaders } from '../data/registry'
import { markCardForTransition, navigateWithTransition, paperVt } from '../paperTransition'
import RichText from './RichText'

defineProps<{ papers: PaperMeta[] }>()

const router = useRouter()

/* 悬停/触摸即预载论文正文 chunk：点击时几乎必已就绪，过渡动画不被网络
   等待卡住（startViewTransition 的回调期间旧页面是冻结的）。触屏没有
   悬停，tap 后才派发的兼容 mouse 事件来不及预取，故另挂 touchstart */
function prefetch(p: PaperMeta) {
  void paperLoaders[p.id]?.()
}

function onCardClick(e: MouseEvent, id: string) {
  /* 修饰键/中键交给浏览器默认行为（新标签页打开等），不拦截 */
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
  e.preventDefault()
  if (e.currentTarget instanceof HTMLElement) markCardForTransition(e.currentTarget)
  navigateWithTransition(async () => {
    await router.push(`/paper/${id}`)
    await nextTick()
  })
}

/* 回程动画：从论文页点站名返回时（paperVt.backPending，见 App.vue），
   给最近一篇论文的卡片打上过渡名，论文页头部的内容反向飞回卡片。
   浏览器前进/后退键不经过这里——只有站名点击有反向动画 */
onMounted(() => {
  if (!paperVt.backPending) return
  paperVt.backPending = false
  const card = document.querySelector(`.paper-card[data-id="${paperVt.lastId}"]`)
  if (card) markCardForTransition(card)
})
</script>

<template>
  <div class="home">
    <h1>论文双语对照阅读</h1>
    <p class="sub">左栏英文原文 · 右栏中文译文 · 图表与行间公式跨栏居中</p>
    <!-- 不用 router-link：fallthrough 的 @click 排在其内部 navigate 之后，
         路由会在 startViewTransition 快照前脱管切换，过渡必然失效 -->
    <a
      v-for="p in papers"
      :key="p.id"
      :href="`#/paper/${p.id}`"
      class="paper-card"
      :data-id="p.id"
      @click="onCardClick($event, p.id)"
      @mouseenter="prefetch(p)"
      @touchstart.passive="prefetch(p)"
    >
      <div class="id">arXiv: {{ p.id }}</div>
      <div class="t">{{ p.titleEn }}</div>
      <div class="tz">{{ p.titleZh }}</div>
      <div class="meta">
        <span class="m-authors"><RichText :text="p.authors" /></span>
        <span v-if="p.venue" class="m-venue"> · {{ p.venue }} <template v-if="p.year">{{ p.year }}</template></span>
      </div>
    </a>
  </div>
</template>
