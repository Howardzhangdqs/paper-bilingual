<!-- Conclusion -->
<script setup lang="ts">
import { Heading, Para, En, Zh } from '../../../components/paper'
</script>

<template>
<Heading :level="1" en="Conclusion" zh="结论" />

<Para>
  <En>This work studies data-constrained scaling, focusing on the optimal use of computational resources when unique data is limited. We propose an extension to the Chinchilla scaling laws that takes into account the decay in value of repeated data, and we fit this function using a large set of controlled experiments. We find that despite recommendations of earlier work, training large language models for multiple epochs by repeating data is beneficial and that scaling laws continue to hold in the multi-epoch regime, albeit with diminishing returns. We also consider complementary approaches to continue scaling models, and find that code gives the ability to scale an additional 2$\times$. We believe that our findings will enable further scaling of language models to unlock new capabilities with current data. However, our work also indicates that there are limits on the scaling horizon. In addition to collecting additional data, researchers should explore using current data in a more effective manner.</En>
  <Zh>本文研究了数据受限下的扩展问题，重点关注唯一数据有限时计算资源的最优使用。我们提出了 Chinchilla 缩放定律的一个扩展，它考虑了重复数据价值的衰减，并通过大量受控实验对该函数进行了拟合。我们发现，尽管以往工作不建议这样做，但通过重复数据对大语言模型进行多个 epoch 的训练是有益的，且缩放定律在多 epoch 情形下依然成立，只是回报递减。我们还考虑了继续扩展模型的互补途径，发现代码能够带来额外的 2$\times$ 扩展空间。我们相信，这些发现将使语言模型能够利用现有数据继续扩展，解锁新的能力。然而，我们的工作也表明扩展的前景存在上限。除了收集更多数据之外，研究者还应探索以更有效的方式利用现有数据。</Zh>
</Para>
</template>
