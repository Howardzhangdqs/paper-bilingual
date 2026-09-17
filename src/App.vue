<script setup lang="ts">
import { computed, nextTick, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { paperMetaById } from './data/registry'
import { immersive } from './immersive'
import { titleScrolledAway, topbarSectionLabel, topbarSectionDir, topbarSectionFast } from './topbarTitle'
import DebugFab from './components/DebugFab.vue'
import SettingsFab from './components/SettingsFab.vue'

const route = useRoute()
/* 路由表里论文 path 是逐篇注册的字面量（/paper/<id>，无 :id 参数），
   params 拿不到 ID，只能从 path 提取 */
const current = computed(() => {
  const m = /^\/paper\/([^/]+)$/.exec(route.path)
  return m ? paperMetaById[m[1]] : undefined
})
/* 是否在论文页（顶栏沉浸按钮的显示条件；不依赖 current——其 meta
   解析受路由时序影响） */
const onPaper = computed(() => route.path.startsWith('/paper/'))

/* 标题区滚出视口后：站名原地收拢淡出（宽度塌缩），旁侧 paper-name
   提亮放大加粗接棒为顶栏主标题，中文标题同步展开（动画见 style.css
   的 .brand.collapsed 与 .paper-name.as-title） */
const titleMode = computed(() => titleScrolledAway.value && !!current.value)

/* 沉浸式只作用于论文页：首页保留顶栏（导航入口），否则进得去出不来。
   切换瞬间借 .immersive-jump 关掉目录过渡：.toc 会从侧栏/折叠标题
   样式跨到浮层样式，按浮层的 opacity/transform 过渡播放一次离场
   动画——目录在左下角闪现一下。DOM 更新完成后加类并强制 reflow
   提交「无过渡」状态再移除，同一次绘制内完成，不产生中间帧 */
const root = document.documentElement
watchEffect(() => {
  const on = immersive.on && onPaper.value
  if (root.classList.contains('immersive') === on) return
  root.classList.toggle('immersive', on)
  nextTick(() => {
    root.classList.add('immersive-jump')
    void root.offsetWidth
    root.classList.remove('immersive-jump')
  })
})
</script>

<template>
  <header class="topbar">
    <router-link to="/" class="brand" :class="{ collapsed: titleMode }">
      <span>论文双语对照</span>
    </router-link>
    <span v-if="current" class="paper-name" :class="{ 'as-title': titleMode }">{{ current.titleEn }}<span class="zh" :class="{ shown: titleMode }"><span>· {{ current.titleZh }}</span></span></span>
    <!-- 标题接棒后显示当前章节名：窗口与站名同款 1fr⇄0fr 宽度展开
         （首个章节名因此有宽度出现动画），换章时窗口内新名沿滚动方向
         顶入顶掉旧名（sec-fwd：下滚自下顶入，sec-back：上滚自上顶入） -->
    <span v-if="current" class="topbar-section" :class="{ shown: titleMode, fast: topbarSectionFast }">
      <Transition :name="topbarSectionDir === 1 ? 'sec-fwd' : 'sec-back'">
        <span v-if="topbarSectionLabel" :key="topbarSectionLabel">{{ topbarSectionLabel }}</span>
      </Transition>
    </span>
    <span class="spacer" />
    <button v-if="onPaper" type="button" class="immersive-btn" title="沉浸式阅读" @click="immersive.on = true">
      <Icon icon="material-symbols:open-in-full" />
    </button>
  </header>
  <router-view />
  <SettingsFab />
  <DebugFab />
</template>
