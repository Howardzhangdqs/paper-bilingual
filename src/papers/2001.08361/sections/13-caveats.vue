<!-- Caveats -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Bullets, Item } from '../../../components/paper'
</script>

<template>
<Heading :level="1" appendix en="Caveats" zh="注意事项" />

<Para>
  <En>In this section we list some potential caveats to our analysis.</En>
  <Zh>本节列出我们分析的一些潜在注意事项。</Zh>
</Para>

<Bullets>
  <Item>
    <En>At present we do not have a solid theoretical understanding for any of our proposed scaling laws. The scaling relations with model size and compute are especially mysterious. It may be possible to understand scaling at very large $D$ holding model size fixed \cite{1710.03667}, and also the shape of learning curves late in training, by modeling the loss with a noisy quadratic. But the scaling with $D$ at very large model size still remains mysterious. Without a theory or a systematic understanding of the corrections to our scaling laws, it's difficult to determine in what circumstances they can be trusted.</En>
    <Zh>目前，我们对所提出的任何缩放律都还没有扎实的理论理解。与模型规模和算力相关的标度关系尤其神秘。把损失建模为带噪二次型，或许可以理解模型规模固定时非常大 $D$ 处的标度 \cite{1710.03667}，以及训练后期的学习曲线形状。但在模型规模非常大时损失随 $D$ 的标度仍是谜团。若没有关于缩放律修正的理论或系统性理解，就很难确定在何种情形下可以信任它们。</Zh>
  </Item>
  <Item>
    <En>We are not especially confident in the prediction of $B_{\rm crit}(L)$ for values of the loss far outside the range we have explored. Changes in $B_{\rm crit}$ could have a significant impact on trade-offs between data parallelism and the number of serial training steps required, which would have a major impact on training time.</En>
    <Zh>对于远离我们探索范围的损失值，我们对 $B_{\rm crit}(L)$ 的预测没有特别的信心。$B_{\rm crit}$ 的变化可能对数据并行与所需串行训练步数之间的权衡产生显著影响，进而大幅影响训练时间。</Zh>
  </Item>
  <Item>
    <En>We did not thoroughly investigate the small data regime, and our fits for $L(N,D)$ were poor for the smallest values of $D$ (where an epoch corresponded to only $40$ steps). Furthermore, we did not experiment with regularization and data augmentation. Improvements in these could alter our results, quantitatively or qualitatively.</En>
    <Zh>我们没有深入研究小数据情形，且对最小的 $D$ 值（一个 epoch 仅对应 $40$ 步）$L(N,D)$ 的拟合很差。此外，我们没有试验正则化与数据增强。这些方面的改进可能在定量或定性上改变我们的结果。</Zh>
  </Item>
  <Item>
    <En>We used the estimated training compute $C \approx 6 N B S$, which did not include contributions proportional to $n_{\rm ctx}$ (see Section \ref{sec:ParameterComputeCounts}). So our scalings with compute may be confounded in practice in the regime of very large $n_{\rm ctx}$, specifically where $n_{\rm ctx} \gtrsim 12 d_{\rm model}$.</En>
    <Zh>我们使用了估计的训练算力 $C \approx 6 N B S$，其中未包含正比于 $n_{\rm ctx}$ 的贡献（见第 \ref{sec:ParameterComputeCounts} 节）。因此在 $n_{\rm ctx}$ 非常大（具体而言 $n_{\rm ctx} \gtrsim 12 d_{\rm model}$）的情形下，我们的算力标度在实践中可能受到干扰。</Zh>
  </Item>
  <Item>
    <En>We tuned learning rates, and we experimented with learning rate schedules. But we may have neglected to tune some hyperparameter (e.g. intialization scale or momentum) that have an important effect on scaling.</En>
    <Zh>我们调节了学习率并试验了学习率调度。但可能忽略了某些对缩放有重要影响的超参数（如初始化尺度或动量）的调节。</Zh>
  </Item>
  <Item>
    <En>The optimal choice of learning rate is sensitive to the target loss. When training close to convergence, it may be necessary to use a smaller learning rate to avoid divergences. But when conducting a short training run (eg due to compute limitations), it may be possible to use a larger learning rate. We did not experiment with higher learning rates for training runs that did not proceed to convergence.</En>
    <Zh>学习率的最优选择对目标损失敏感。接近收敛训练时，可能需要较小的学习率以避免发散；而进行短期训练运行时（例如受算力限制），则可能可以使用较大的学习率。对于不训练至收敛的运行，我们没有试验过更高的学习率。</Zh>
  </Item>
</Bullets>
</template>
