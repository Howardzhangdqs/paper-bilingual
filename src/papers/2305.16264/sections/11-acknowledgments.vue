<!-- Acknowledgments -->
<script setup lang="ts">
import { Heading, Para, En, Zh } from '../../../components/paper'
</script>

<template>
  <Heading :level="1" en="Acknowledgments" zh="致谢" :toc="false" />

  <Para>
    <En>This work was co-funded by the European Union under grant agreement No 101070350. The authors wish to acknowledge CSC – IT Center for Science, Finland, for generous computational resources on the LUMI supercomputer.\footnote{\url{https://www.lumi-supercomputer.eu/}} We are thankful for the immense support from teams at LUMI and AMD, especially Samuel Antao. Hugging Face provided storage and additional compute instances. This work was supported by a Simons Investigator Fellowship, NSF grant DMS-2134157, DARPA grant W911NF2010021, and DOE grant DE-SC0022199. We are grateful to Harm de Vries, Woojeong Kim, Mengzhou Xia and the EleutherAI community for exceptional feedback. We thank Loubna Ben Allal for help with the Python data and Big Code members for insightful discussions on scaling laws. We thank Thomas Wang, Helen Ngo and TurkuNLP members for support with early experiments. We thank Mengning Wu for pointing out a bug in our $R^2$ calculation.</En>
    <Zh>本研究由欧盟资助协议 No 101070350 部分资助。作者感谢芬兰 CSC——科学计算中心在 LUMI 超级计算机上提供的充足计算资源。\footnote{\url{https://www.lumi-supercomputer.eu/}}我们感谢 LUMI 与 AMD 团队的大力支持，特别是 Samuel Antao。Hugging Face 提供了存储与额外计算实例。本研究部分受 Simons Investigator Fellowship、NSF 基金 DMS-2134157、DARPA 基金 W911NF2010021 以及 DOE 基金 DE-SC0022199 资助。我们感谢 Harm de Vries、Woojeong Kim、Mengzhou Xia 与 EleutherAI 社区提出的宝贵反馈，感谢 Loubna Ben Allal 对 Python 数据的帮助，以及 Big Code 成员关于缩放定律的有益讨论。我们感谢 Thomas Wang、Helen Ngo 与 TurkuNLP 成员在早期实验中的支持，并感谢 Mengning Wu 指出我们 $R^2$ 计算中的一个错误。</Zh>
  </Para>
</template>
