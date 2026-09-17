<!-- Experimental Setup -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:fixu" en="Experimental Setup" zh="实验设置" />

<Figure src="figures/2305.16264/composition.svg" :width="40" label="fig:composition" caption-en="\textbf{Dataset setup.} We ensure that runs using less data (more epochs) always use a subset of the data used in runs with more data (fewer epochs)." caption-zh="\textbf{数据集设置。}我们确保使用较少数据（更多 epoch）的运行总是使用使用较多数据（较少 epoch）的运行所用数据的一个子集。" />

<Para>
  <En>For all experiments, we train transformer language models with the GPT-2 architecture and tokenizer~\cite{radford2019language}. Models have up to 8.7 billion parameters and are trained for up to 900 billion total tokens. Following~\cite{hoffmann2022training} we use cosine learning rate schedules that decay 10$\times$ over the course of training for each model (different schedules led to different estimates in \cite{kaplan2020scaling}). Unlike~\cite{kaplan2020scaling}, we do not use early stopping to also explore the extent of overfitting when repeating. Other hyperparameters are based on prior work~\cite{rae2021scaling,hoffmann2022training} and detailed in \autoref{sec:arch}. Models are trained on subsets of C4~\cite{raffel2020exploring}. The data constraints are carefully defined to ensure maximal overlap as shown in \autoref{fig:composition}. Unlike~\cite{hernandez2022scaling}, we always repeat the entire available data rather than subsets of it. Data is shuffled after each epoch. As repeating data can result in extreme overfitting (see \autoref{sec:trainlossc4}), we report loss on a held-out test set unless otherwise specified (see \autoref{sec:eval}). This contrasts training loss used in~\cite{hoffmann2022training}, but should not alter our findings as the held-out data stems from the same underlying dataset.</En>
  <Zh>在所有实验中，我们训练采用 GPT-2 架构与分词器的 transformer 语言模型~\cite{radford2019language}。模型的参数量最高达 87 亿，训练的总词元数最高达 9000 亿。遵循~\cite{hoffmann2022training}，每个模型都采用余弦学习率调度，在训练过程中衰减为初值的 10$\times$ 分之一（不同的调度曾使 \cite{kaplan2020scaling} 得到不同的估计）。与~\cite{kaplan2020scaling} 不同，我们不使用早停，以便同时探究重复数据时过拟合的程度。其他超参数基于以往工作~\cite{rae2021scaling,hoffmann2022training}，详见 \autoref{sec:arch}。模型在 C4 的子集上训练~\cite{raffel2020exploring}。数据约束经过仔细定义，以保证不同运行间的数据最大程度重叠，如 \autoref{fig:composition} 所示。与~\cite{hernandez2022scaling} 不同，我们总是重复全部可用数据而非其子集。每个 epoch 之后数据都会被打乱。由于重复数据可能导致极端过拟合（见 \autoref{sec:trainlossc4}），除非另有说明，我们报告的是在留出测试集上的损失（见 \autoref{sec:eval}）。这与~\cite{hoffmann2022training} 使用的训练损失不同，但由于留出数据与训练数据来自同一底层数据集，这不应影响我们的结论。</Zh>
</Para>
</template>
