<script setup lang="ts">
/**
 * 外部链接（对应 LaTeX 的 \url{...} 与 \href{url}{text}）：
 * 新标签页打开。
 */
defineProps<{
  href: string
  text: string
}>()
</script>

<template>
  <a :href="href" target="_blank" rel="noreferrer">{{ text }}</a>
</template>
