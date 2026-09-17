<!-- Version Control -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Bullets, Item } from '../../../components/paper'
</script>

<template>
<Heading :level="1" appendix en="Version Control" zh="版本记录" />

<Para>
  <En>\textbf{V4 → V5:}</En>
  <Zh>V4 → V5：</Zh>
</Para>

<Bullets>
  <Item>
    <En>Small writing improvements</En>
    <Zh>小幅文字改进。</Zh>
  </Item>
  <Item>
    <En>Fixed $R^2$ scores in \autoref{tab:fits}</En>
    <Zh>修正 \autoref{tab:fits} 中的 $R^2$ 分数。</Zh>
  </Item>
</Bullets>

<Para>
  <En>\textbf{V3 → V4:}</En>
  <Zh>V3 → V4：</Zh>
</Para>

<Bullets>
  <Item>
    <En>Added comparison of different fits in terms of loss and $R^2$ in \autoref{tab:fits}</En>
    <Zh>在 \autoref{tab:fits} 中增加了不同拟合在损失与 $R^2$ 上的比较。</Zh>
  </Item>
  <Item>
    <En>Small writing improvements</En>
    <Zh>小幅文字改进。</Zh>
  </Item>
</Bullets>

<Para>
  <En>\textbf{V2 → V3:}</En>
  <Zh>V2 → V3：</Zh>
</Para>

<Bullets>
  <Item>
    <En>Added loss curves of complementary strategies in \autoref{sec:losscomp}</En>
    <Zh>在 \autoref{sec:losscomp} 中增加了互补策略的损失曲线。</Zh>
  </Item>
  <Item>
    <En>Fixed OSCAR validation plot in \autoref{sec:fixoscar}</En>
    <Zh>修正 \autoref{sec:fixoscar} 中的 OSCAR 验证图。</Zh>
  </Item>
  <Item>
    <En>Clarified the usage of smoothing in training and validation plots in \autoref{sec:eval}</En>
    <Zh>在 \autoref{sec:eval} 中说明训练与验证图中的平滑用法。</Zh>
  </Item>
  <Item>
    <En>Added more references</En>
    <Zh>增加了更多参考文献。</Zh>
  </Item>
</Bullets>

<Para>
  <En>\textbf{V1 → V2:}</En>
  <Zh>V1 → V2：</Zh>
</Para>

<Bullets>
  <Item>
    <En>Added experiments decaying alpha and beta to allow excess epochs or parameters to hurt in \autoref{sec:toomany}</En>
    <Zh>在 \autoref{sec:toomany} 中增加了衰减 alpha 与 beta、允许过剩 epoch 或参数有害的实验。</Zh>
  </Item>
  <Item>
    <En>Added Galactica case study in \autoref{sec:galactica}</En>
    <Zh>在 \autoref{sec:galactica} 中增加了 Galactica 案例研究。</Zh>
  </Item>
  <Item>
    <En>Added more details on the calculation of $U_N$ given $U_D$ in \autoref{sec:scalinglaws}</En>
    <Zh>在 \autoref{sec:scalinglaws} 中补充了由 $U_D$ 计算 $U_N$ 的细节。</Zh>
  </Item>
  <Item>
    <En>Added hyperparameter sensitivity limitation in \autoref{sec:limits}</En>
    <Zh>在 \autoref{sec:limits} 中增加了超参数敏感性的局限。</Zh>
  </Item>
  <Item>
    <En>Added more detail on how score normalization is done in \autoref{sec:eval}</En>
    <Zh>在 \autoref{sec:eval} 中补充了分数归一化的细节。</Zh>
  </Item>
  <Item>
    <En>Mentioned modification of number of heads in \autoref{sec:arch}</En>
    <Zh>在 \autoref{sec:arch} 中说明了注意力头数的修改。</Zh>
  </Item>
</Bullets>
</template>
