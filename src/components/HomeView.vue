<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { PaperMeta } from '../types'
import { paperLoaders } from '../data/registry'
import { flyToPaper } from '../paperTransition'
import RichText from './RichText'

defineProps<{ papers: PaperMeta[] }>()

const router = useRouter()

/* 悬停/触摸即预载论文正文 chunk：点击时几乎必已就绪，飞移动画不必
   原地等待（等待期页面静止，等落点挂载后内容才起飞）。触屏没有
   悬停，tap 后才派发的兼容 mouse 事件来不及预取，故另挂 touchstart */
function prefetch(p: PaperMeta) {
  void paperLoaders[p.id]?.()
}

function onCardClick(e: MouseEvent, id: string) {
  /* 修饰键/中键交给浏览器默认行为（新标签页打开等），不拦截 */
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
  e.preventDefault()
  const nav = async () => {
    await router.push(`/paper/${id}`)
  }
  if (e.currentTarget instanceof HTMLElement) void flyToPaper(e.currentTarget, nav)
  else void nav()
}
</script>

<template>
  <div class="home">
    <h1>论文双语对照阅读</h1>
    <p class="sub">左栏英文原文 · 右栏中文译文 · 图表与行间公式跨栏居中</p>
    <!-- 不用 router-link：fallthrough 的 @click 排在其内部 navigate 之后，
         路由会在飞移层捕获起点前脱管切换，动画必然错位 -->
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
