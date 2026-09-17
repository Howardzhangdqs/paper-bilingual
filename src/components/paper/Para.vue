<script setup lang="ts">
/**
 * <Para>
 *   <En lead="paragraph 标题">英文段落（LaTeX 行内标记直接写）</En>
 *   <Zh lead="段落标题">中文译文</Zh>
 * </Para>
 * 注册为 spacer：正文段落会打断「连续公式」分组（被文字隔开的公式
 * 各自带释义面板）。
 */
import { useRegister } from './registry'

useRegister({ type: 'spacer' })
</script>

<template>
  <div class="pair-row para">
    <slot />
  </div>
</template>
