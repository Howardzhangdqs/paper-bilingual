<!-- Abstract -->
<script setup lang="ts">
import { Para, En, Zh } from '../../../components/paper'
</script>

<template>
<Para>
  <En>We study empirical scaling laws for language model performance on the cross-entropy loss. The loss scales as a power-law with model size, dataset size, and the amount of compute used for training, with some trends spanning more than seven orders of magnitude. Other architectural details such as network width or depth have minimal effects within a wide range. Simple equations govern the dependence of overfitting on model/dataset size and the dependence of training speed on model size. These relationships allow us to determine the optimal allocation of a fixed compute budget. Larger models are significantly more sample-efficient, such that optimally compute-efficient training involves training very large models on a relatively modest amount of data and stopping significantly before convergence.</En>
  <Zh>我们研究了语言模型在交叉熵损失上的经验缩放律。损失随模型规模、数据集规模以及训练所用算力按幂律缩放，其中一些趋势跨越了七个数量级以上。网络宽度或深度等其他架构细节在很大范围内影响甚微。简单的方程刻画了过拟合对模型/数据集规模的依赖，以及训练速度对模型规模的依赖。这些关系使我们能够确定固定算力预算下的最优分配方式。更大的模型具有显著更高的样本效率，因此算力最优的训练方式是：用相对适量的数据训练非常大的模型，并在远未收敛之前即停止训练。</Zh>
</Para>
</template>
