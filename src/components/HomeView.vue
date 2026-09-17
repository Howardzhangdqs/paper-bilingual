<script setup lang="ts">
import type { PaperMeta } from '../types'
import RichText from './RichText'

defineProps<{ papers: PaperMeta[] }>()
</script>

<template>
  <div class="home">
    <h1>论文双语对照阅读</h1>
    <p class="sub">左栏英文原文 · 右栏中文译文 · 图表与行间公式跨栏居中</p>
    <router-link
      v-for="p in papers"
      :key="p.id"
      :to="`/paper/${p.id}`"
      class="paper-card"
    >
      <div class="id">arXiv: {{ p.id }}</div>
      <div class="t">{{ p.titleEn }}</div>
      <div class="tz">{{ p.titleZh }}</div>
      <div class="meta">
        <RichText :text="p.authors" />
        <template v-if="p.venue"> · {{ p.venue }} <template v-if="p.year">{{ p.year }}</template></template>
      </div>
    </router-link>
  </div>
</template>
