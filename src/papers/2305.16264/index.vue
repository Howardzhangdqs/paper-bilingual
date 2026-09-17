<!-- 论文入口：meta + 各章节组件。meta 在 ./meta.ts（主页轻量加载）。 -->
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
import S03 from './sections/03-background.vue'
import S04 from './sections/04-method-data-constrained-scaling-laws.vue'
import S05 from './sections/05-experimental-setup.vue'
import S06 from './sections/06-results-resource-allocation-for-data-constrained-sca.vue'
import S07 from './sections/07-results-resource-return-for-data-constrained-scaling.vue'
import S08 from './sections/08-results-complementary-strategies-for-obtaining-addit.vue'
import S09 from './sections/09-related-work.vue'
import S10 from './sections/10-conclusion.vue'
import S11 from './sections/11-acknowledgments.vue'
import S12 from './sections/12-derivation-of-data-constrained-scaling-laws.vue'
import S13 from './sections/13-c4-scaling-coefficients.vue'
import S14 from './sections/14-additional-contour-plots.vue'
import S15 from './sections/15-double-descent.vue'
import S16 from './sections/16-repeating-on-heavily-deduplicated-data.vue'
import S17 from './sections/17-do-excess-parameters-hurt-plateau-or-help.vue'
import S18 from './sections/18-case-study-galactica.vue'
import S19 from './sections/19-training-loss.vue'
import S20 from './sections/20-scaling-curves-on-the-oscar-corpus.vue'
import S21 from './sections/21-validation-loss-by-epoch.vue'
import S22 from './sections/22-evaluation-details.vue'
import S23 from './sections/23-downstream-repetition-results.vue'
import S24 from './sections/24-detailed-code-augmentation-results.vue'
import S25 from './sections/25-filtering-procedure.vue'
import S26 from './sections/26-detailed-filtering-results.vue'
import S27 from './sections/27-loss-curves-for-complementary-strategies.vue'
import S28 from './sections/28-limitations-and-future-work.vue'
import S29 from './sections/29-contributions.vue'
import S30 from './sections/30-hyperparameters-and-setup.vue'
import S31 from './sections/31-prompts-and-samples.vue'
import S32 from './sections/32-other-experiments.vue'
import S33 from './sections/33-release-of-artifacts.vue'
import S34 from './sections/34-version-control.vue'
import S35 from './sections/35-broader-impacts.vue'
</script>

<template>
  <PaperBody
    :meta="meta"
    :cites="cites"
    :references="references"
    :macros="{ '\\argmin': '\\operatorname*{argmin}' }"
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
    <S15 />
    <S16 />
    <S17 />
    <S18 />
    <S19 />
    <S20 />
    <S21 />
    <S22 />
    <S23 />
    <S24 />
    <S25 />
    <S26 />
    <S27 />
    <S28 />
    <S29 />
    <S30 />
    <S31 />
    <S32 />
    <S33 />
    <S34 />
    <S35 />
  </PaperBody>
</template>
