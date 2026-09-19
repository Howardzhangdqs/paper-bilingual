<!-- Scaling Laws for Neural Language Models -->
<script lang="ts">
export { meta } from './meta'
import { meta } from './meta'
</script>

<script setup lang="ts">
import { PaperBody } from '../../components/paper'
import cites from './cites.json'
import references from './references.json'
import S01 from './sections/01-abstract.vue'
import S02 from './sections/02-introduction.vue'
import S03 from './sections/03-background-and-methods.vue'
import S04 from './sections/04-empirical-results-and-basic-power-laws.vue'
import S05 from './sections/05-charting-the-infinite-data-limit.vue'
import S06 from './sections/06-scaling-laws-with-model-size-and-time.vue'
import S07 from './sections/07-optimal-allocation-of-compute.vue'
import S08 from './sections/08-related-work.vue'
import S09 from './sections/09-discussion.vue'
import S10 from './sections/10-acknowledgments.vue'
import S11 from './sections/11-summary-of-power-laws.vue'
import S12 from './sections/12-compute-efficient-frontier.vue'
import S13 from './sections/13-caveats.vue'
import S14 from './sections/14-supplemental-figures.vue'
</script>

<template>
  <PaperBody
    :meta="meta"
    :cites="cites"
    :references="references"
    :macros="{ '\\CB': '{\\cal B}' }"
  >
    <S01 />
    <S02 />
    <S03 />
    <S04 />
    <S05 />
    <S06 />
    <S07 />
    <S08 />
    <S09 />
    <S10 />
    <S11 />
    <S12 />
    <S13 />
    <S14 />
  </PaperBody>
</template>
