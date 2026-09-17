<!-- Detailed Filtering Results -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Table, Td } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:addfilter" appendix en="Detailed Filtering Results" zh="过滤的详细结果" />

<Para>
  <En>In \autoref{tab:pplx}, we report detailed perplexity filtering results on C4 and OSCAR. For C4, perplexity filtering is only effective at 4.2B parameters. Meanwhile, for OSCAR, which is noisier than C4, perplexity filtering seems effective both for 2.8B and 4.2B parameters. \autoref{tab:dedup} contains deduplication results and results for the ROOTS filter. Deduplication does not improve downstream performance for C4 while being effective for OSCAR which has significantly more noise. Applying the ROOTS filter on OSCAR is not better than the unfiltered OSCAR on our benchmark, but might have other beneficial effects, such as reducing obscenity, templated messages, or repetition, depending on the final use case.</En>
  <Zh>在 \autoref{tab:pplx} 中，我们报告了在 C4 与 OSCAR 上困惑度过滤的详细结果。对 C4 而言，困惑度过滤只在 4.2B 参数时有效；而对比 C4 更含噪的 OSCAR，困惑度过滤在 2.8B 与 4.2B 参数下似乎都有效。\autoref{tab:dedup} 包含去重结果与 ROOTS 过滤器的结果。去重并未改善 C4 的下游性能，但对噪声大得多的 OSCAR 有效。在 OSCAR 上应用 ROOTS 过滤器在我们的基准上并未优于未过滤的 OSCAR，但可能具有其他益处，例如减少淫秽内容、模板化消息或重复内容，具体取决于最终用途。</Zh>
</Para>

<Table label="tab:pplx" caption-en="\textbf{Results for perplexity-filtering.} The training data is perplexity filtered according to the given percentile, e.g. 25\% corresponds to training on the top 25\% percent of examples with the lowest perplexity. The resulting dataset sizes are in \autoref{tab:filt}. The data is repeated until it matches 55B tokens for 2.8B parameter and 84B tokens for 4.2B parameter models. Scores are normalized averages of 0-5 few-shots and reported as percentages. For unfiltered models, we report mean/std. err. across five different models, each trained with a different random seed." caption-zh="\textbf{困惑度过滤的结果。}训练数据按给定百分位进行困惑度过滤，例如 25\% 表示在困惑度最低的前 25\% 样本上训练。所得数据集规模见 \autoref{tab:filt}。数据被重复使用直至达到 28 亿参数模型的 55B 词元与 42 亿参数模型的 84B 词元。分数为 0-5 few-shot 的归一化平均值，以百分比报告。对未过滤模型，我们报告五个不同随机种子训练模型之间的均值/标准误。">
  <tr>
    <Td align="left">Training Data</Td>
    <Td align="left" :colspan="7">{C4}</Td>
    <Td align="left" :colspan="4">{OSCAR}</Td>
  </tr>
  <tr>
    <Td align="left">Parameters</Td>
    <Td align="left" :colspan="3">{2.8B}</Td>
    <Td align="left" :colspan="4">{4.2B}</Td>
    <Td align="left" :colspan="2">{2.8B}</Td>
    <Td align="left" :colspan="2">{4.2B}</Td>
  </tr>
  <tr>
    <Td align="left">Percentile</Td>
    <Td align="left">All</Td>
    <Td align="left">25\%</Td>
    <Td align="left">50\%</Td>
    <Td align="left">All</Td>
    <Td align="left">25\%</Td>
    <Td align="left">50\%</Td>
    <Td align="left">25-75\%</Td>
    <Td align="left">All</Td>
    <Td align="left">25\%</Td>
    <Td align="left">All</Td>
    <Td align="left">25\%</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R1</Td>
    <Td align="left">0.4 ± 1.6</Td>
    <Td align="left">-0.1</Td>
    <Td align="left">0.9</Td>
    <Td align="left">-0.5 ± 1.4</Td>
    <Td align="left">-0.0</Td>
    <Td align="left">-0.7</Td>
    <Td align="left">-0.8</Td>
    <Td align="left">-0.3 ± 0.5</Td>
    <Td align="left">-0.4</Td>
    <Td align="left">-0.4 ± 1.2</Td>
    <Td align="left">-2.2</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R2</Td>
    <Td align="left">0.9 ± 0.4</Td>
    <Td align="left">-0.2</Td>
    <Td align="left">-0.7</Td>
    <Td align="left">0.0 ± 1.3</Td>
    <Td align="left">-0.4</Td>
    <Td align="left">-0.0</Td>
    <Td align="left">1.1</Td>
    <Td align="left">1.0 ± 1.0</Td>
    <Td align="left">1.7</Td>
    <Td align="left">1.0 ± 0.9</Td>
    <Td align="left">0.7</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R3</Td>
    <Td align="left">1.7 ± 0.5</Td>
    <Td align="left">0.5</Td>
    <Td align="left">1.4</Td>
    <Td align="left">0.7 ± 0.5</Td>
    <Td align="left">0.7</Td>
    <Td align="left">2.9</Td>
    <Td align="left">0.4</Td>
    <Td align="left">0.4 ± 0.8</Td>
    <Td align="left">1.7</Td>
    <Td align="left">1.2 ± 0.5</Td>
    <Td align="left">2.1</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Challenge</Td>
    <Td align="left">1.6 ± 1.0</Td>
    <Td align="left">3.3</Td>
    <Td align="left">2.9</Td>
    <Td align="left">4.2 ± 1.6</Td>
    <Td align="left">10.2</Td>
    <Td align="left">9.3</Td>
    <Td align="left">7.9</Td>
    <Td align="left">-1.4 ± 0.8</Td>
    <Td align="left">3.3</Td>
    <Td align="left">1.8 ± 0.8</Td>
    <Td align="left">6.3</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Easy</Td>
    <Td align="left">44.5 ± 0.5</Td>
    <Td align="left">47.3</Td>
    <Td align="left">47.7</Td>
    <Td align="left">48.1 ± 4.8</Td>
    <Td align="left">55.8</Td>
    <Td align="left">53.7</Td>
    <Td align="left">51.0</Td>
    <Td align="left">39.7 ± 0.3</Td>
    <Td align="left">46.8</Td>
    <Td align="left">45.7 ± 0.6</Td>
    <Td align="left">51.8</Td>
  </tr>
  <tr>
    <Td align="left">BoolQ</Td>
    <Td align="left">18.8 ± 3.4</Td>
    <Td align="left">17.1</Td>
    <Td align="left">17.7</Td>
    <Td align="left">22.4 ± 3.3</Td>
    <Td align="left">27.7</Td>
    <Td align="left">23.5</Td>
    <Td align="left">24.5</Td>
    <Td align="left">12.8 ± 4.4</Td>
    <Td align="left">11.8</Td>
    <Td align="left">12.4 ± 5.9</Td>
    <Td align="left">22.2</Td>
  </tr>
  <tr>
    <Td align="left">CB</Td>
    <Td align="left">20.0 ± 4.7</Td>
    <Td align="left">16.1</Td>
    <Td align="left">13.8</Td>
    <Td align="left">9.3 ± 16.6</Td>
    <Td align="left">24.6</Td>
    <Td align="left">22.3</Td>
    <Td align="left">12.5</Td>
    <Td align="left">19.7 ± 5.1</Td>
    <Td align="left">17.0</Td>
    <Td align="left">23.9 ± 3.8</Td>
    <Td align="left">20.1</Td>
  </tr>
  <tr>
    <Td align="left">COPA</Td>
    <Td align="left">49.7 ± 3.5</Td>
    <Td align="left">55.7</Td>
    <Td align="left">56.0</Td>
    <Td align="left">55.3 ± 3.8</Td>
    <Td align="left">60.7</Td>
    <Td align="left">66.0</Td>
    <Td align="left">61.0</Td>
    <Td align="left">42.7 ± 2.2</Td>
    <Td align="left">44.0</Td>
    <Td align="left">41.1 ± 3.0</Td>
    <Td align="left">49.3</Td>
  </tr>
  <tr>
    <Td align="left">HellaSwag</Td>
    <Td align="left">24.7 ± 0.3</Td>
    <Td align="left">24.7</Td>
    <Td align="left">26.0</Td>
    <Td align="left">29.4 ± 1.3</Td>
    <Td align="left">30.7</Td>
    <Td align="left">32.7</Td>
    <Td align="left">33.1</Td>
    <Td align="left">16.3 ± 0.1</Td>
    <Td align="left">19.0</Td>
    <Td align="left">21.0 ± 0.2</Td>
    <Td align="left">23.3</Td>
  </tr>
  <tr>
    <Td align="left">PiQA</Td>
    <Td align="left">47.9 ± 0.6</Td>
    <Td align="left">43.4</Td>
    <Td align="left">45.8</Td>
    <Td align="left">48.8 ± 3.8</Td>
    <Td align="left">47.9</Td>
    <Td align="left">52.2</Td>
    <Td align="left">52.1</Td>
    <Td align="left">41.2 ± 0.7</Td>
    <Td align="left">38.3</Td>
    <Td align="left">45.0 ± 0.6</Td>
    <Td align="left">44.4</Td>
  </tr>
  <tr>
    <Td align="left">RTE</Td>
    <Td align="left">5.1 ± 4.0</Td>
    <Td align="left">5.7</Td>
    <Td align="left">7.3</Td>
    <Td align="left">6.9 ± 3.1</Td>
    <Td align="left">11.9</Td>
    <Td align="left">2.2</Td>
    <Td align="left">10.3</Td>
    <Td align="left">3.9 ± 1.1</Td>
    <Td align="left">-1.2</Td>
    <Td align="left">2.2 ± 4.3</Td>
    <Td align="left">7.0</Td>
  </tr>
  <tr>
    <Td align="left">SciQ</Td>
    <Td align="left">83.2 ± 0.6</Td>
    <Td align="left">82.4</Td>
    <Td align="left">82.8</Td>
    <Td align="left">86.3 ± 1.1</Td>
    <Td align="left">88.6</Td>
    <Td align="left">87.4</Td>
    <Td align="left">88.4</Td>
    <Td align="left">83.2 ± 0.6</Td>
    <Td align="left">84.0</Td>
    <Td align="left">86.3 ± 0.6</Td>
    <Td align="left">86.5</Td>
  </tr>
  <tr>
    <Td align="left">StoryCloze 2016</Td>
    <Td align="left">58.7 ± 0.2</Td>
    <Td align="left">61.1</Td>
    <Td align="left">61.2</Td>
    <Td align="left">62.8 ± 0.5</Td>
    <Td align="left">65.5</Td>
    <Td align="left">65.6</Td>
    <Td align="left">65.1</Td>
    <Td align="left">52.8 ± 0.3</Td>
    <Td align="left">57.9</Td>
    <Td align="left">57.2 ± 0.6</Td>
    <Td align="left">60.2</Td>
  </tr>
  <tr>
    <Td align="left">WinoGrande XL</Td>
    <Td align="left">11.6 ± 0.8</Td>
    <Td align="left">15.3</Td>
    <Td align="left">14.3</Td>
    <Td align="left">18.7 ± 1.0</Td>
    <Td align="left">24.9</Td>
    <Td align="left">22.3</Td>
    <Td align="left">18.7</Td>
    <Td align="left">5.8 ± 0.9</Td>
    <Td align="left">9.7</Td>
    <Td align="left">10.1 ± 1.0</Td>
    <Td align="left">14.8</Td>
  </tr>
  <tr>
    <Td align="left">E2E NLG</Td>
    <Td align="left">17.0 ± 1.4</Td>
    <Td align="left">16.1</Td>
    <Td align="left">16.8</Td>
    <Td align="left">17.9 ± 0.7</Td>
    <Td align="left">18.8</Td>
    <Td align="left">17.8</Td>
    <Td align="left">19.2</Td>
    <Td align="left">20.3 ± 0.3</Td>
    <Td align="left">19.5</Td>
    <Td align="left">21.6 ± 0.7</Td>
    <Td align="left">22.6</Td>
  </tr>
  <tr>
    <Td align="left">XSUM</Td>
    <Td align="left">2.4 ± 0.1</Td>
    <Td align="left">2.6</Td>
    <Td align="left">3.0</Td>
    <Td align="left">3.0 ± 0.3</Td>
    <Td align="left">3.9</Td>
    <Td align="left">3.2</Td>
    <Td align="left">3.0</Td>
    <Td align="left">3.0 ± 0.1</Td>
    <Td align="left">3.2</Td>
    <Td align="left">3.7 ± 0.2</Td>
    <Td align="left">2.7</Td>
  </tr>
  <tr>
    <Td align="left">WebNLG EN</Td>
    <Td align="left">5.3 ± 0.1</Td>
    <Td align="left">4.8</Td>
    <Td align="left">5.1</Td>
    <Td align="left">5.6 ± 0.3</Td>
    <Td align="left">5.4</Td>
    <Td align="left">5.7</Td>
    <Td align="left">5.2</Td>
    <Td align="left">8.8 ± 0.4</Td>
    <Td align="left">6.9</Td>
    <Td align="left">9.3 ± 0.5</Td>
    <Td align="left">10.6</Td>
  </tr>
  <tr>
    <Td align="left">WikiLingua EN</Td>
    <Td align="left">3.0 ± 0.1</Td>
    <Td align="left">3.2</Td>
    <Td align="left">3.3</Td>
    <Td align="left">3.6 ± 0.2</Td>
    <Td align="left">3.4</Td>
    <Td align="left">3.5</Td>
    <Td align="left">3.4</Td>
    <Td align="left">2.9 ± 0.1</Td>
    <Td align="left">3.4</Td>
    <Td align="left">4.0 ± 0.1</Td>
    <Td align="left">3.8</Td>
  </tr>
  <tr>
    <Td align="left">bAbI</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">15.5 ± 1.0</Td>
    <Td align="left">14.5</Td>
    <Td align="left">19.3 ± 1.0</Td>
    <Td align="left">17.2</Td>
  </tr>
  <tr>
    <Td align="left">Average</Td>
    <Td align="left">20.9 ± 0.4</Td>
    <Td align="left">21.0</Td>
    <Td align="left">21.3</Td>
    <Td align="left">22.2 ± 1.4</Td>
    <Td align="left">25.3</Td>
    <Td align="left">24.7</Td>
    <Td align="left">24.0</Td>
    <Td align="left">19.4 ± 0.5</Td>
    <Td align="left">20.1</Td>
    <Td align="left">21.4 ± 0.5</Td>
    <Td align="left">23.3</Td>
  </tr>
</Table>

<Table label="tab:dedup" caption-en="\textbf{Results for filtering with deduplication and the ROOTS filters.} The resulting dataset sizes are in \autoref{tab:filt}. The data is repeated until it matches 55B tokens for 2.8B parameter and 84B tokens for 4.2B parameter models. Scores are normalized averages of 0-5 few-shots and reported as percentages. For unfiltered models we report mean/std. err. across five different models, each trained with a different random seed." caption-zh="\textbf{去重过滤与 ROOTS 过滤器的结果。}所得数据集规模见 \autoref{tab:filt}。数据被重复使用直至达到 28 亿参数模型的 55B 词元与 42 亿参数模型的 84B 词元。分数为 0-5 few-shot 的归一化平均值，以百分比报告。对未过滤模型，我们报告五个不同随机种子训练模型之间的均值/标准误。">
  <tr>
    <Td align="left">Training Data</Td>
    <Td align="left" :colspan="4">{C4}</Td>
    <Td align="left" :colspan="6">{OSCAR}</Td>
  </tr>
  <tr>
    <Td align="left">Parameters</Td>
    <Td align="left" :colspan="2">{2.8B parameters}</Td>
    <Td align="left" :colspan="2">{4.2B parameters}</Td>
    <Td align="left" :colspan="3">{2.8B parameters}</Td>
    <Td align="left" :colspan="3">{4.2B parameters}</Td>
  </tr>
  <tr>
    <Td align="left">Method</Td>
    <Td align="left">All</Td>
    <Td align="left">Dedup.</Td>
    <Td align="left">All</Td>
    <Td align="left">Dedup.</Td>
    <Td align="left">All</Td>
    <Td align="left">Dedup.</Td>
    <Td align="left">ROOTS</Td>
    <Td align="left">All</Td>
    <Td align="left">Dedup.-exp.</Td>
    <Td align="left">ROOTS</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R1</Td>
    <Td align="left">0.4 ± 1.6</Td>
    <Td align="left">-0.2</Td>
    <Td align="left">-0.5 ± 1.4</Td>
    <Td align="left">-0.8</Td>
    <Td align="left">-0.3 ± 0.5</Td>
    <Td align="left">-2.1</Td>
    <Td align="left">-1.7</Td>
    <Td align="left">-0.4 ± 1.2</Td>
    <Td align="left">-1.8</Td>
    <Td align="left">1.2</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R2</Td>
    <Td align="left">0.9 ± 0.4</Td>
    <Td align="left">1.1</Td>
    <Td align="left">0.0 ± 1.3</Td>
    <Td align="left">-0.1</Td>
    <Td align="left">1.0 ± 1.0</Td>
    <Td align="left">2.0</Td>
    <Td align="left">0.7</Td>
    <Td align="left">1.0 ± 0.9</Td>
    <Td align="left">-0.5</Td>
    <Td align="left">-0.3</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R3</Td>
    <Td align="left">1.7 ± 0.5</Td>
    <Td align="left">1.8</Td>
    <Td align="left">0.7 ± 0.5</Td>
    <Td align="left">0.4</Td>
    <Td align="left">0.4 ± 0.8</Td>
    <Td align="left">0.4</Td>
    <Td align="left">0.2</Td>
    <Td align="left">1.2 ± 0.5</Td>
    <Td align="left">0.8</Td>
    <Td align="left">-0.3</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Challenge</Td>
    <Td align="left">1.6 ± 1.0</Td>
    <Td align="left">0.6</Td>
    <Td align="left">4.2 ± 1.6</Td>
    <Td align="left">3.9</Td>
    <Td align="left">-1.4 ± 0.8</Td>
    <Td align="left">2.6</Td>
    <Td align="left">-0.9</Td>
    <Td align="left">1.8 ± 0.8</Td>
    <Td align="left">6.8</Td>
    <Td align="left">0.6</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Easy</Td>
    <Td align="left">44.5 ± 0.5</Td>
    <Td align="left">43.0</Td>
    <Td align="left">48.1 ± 4.8</Td>
    <Td align="left">46.8</Td>
    <Td align="left">39.7 ± 0.3</Td>
    <Td align="left">44.6</Td>
    <Td align="left">42.3</Td>
    <Td align="left">45.7 ± 0.6</Td>
    <Td align="left">51.0</Td>
    <Td align="left">47.1</Td>
  </tr>
  <tr>
    <Td align="left">BoolQ</Td>
    <Td align="left">18.8 ± 3.4</Td>
    <Td align="left">1.5</Td>
    <Td align="left">22.4 ± 3.3</Td>
    <Td align="left">2.2</Td>
    <Td align="left">12.8 ± 4.4</Td>
    <Td align="left">3.4</Td>
    <Td align="left">13.4</Td>
    <Td align="left">12.4 ± 5.9</Td>
    <Td align="left">13.0</Td>
    <Td align="left">7.0</Td>
  </tr>
  <tr>
    <Td align="left">CB</Td>
    <Td align="left">20.0 ± 4.7</Td>
    <Td align="left">0.4</Td>
    <Td align="left">9.3 ± 16.6</Td>
    <Td align="left">0.9</Td>
    <Td align="left">19.7 ± 5.1</Td>
    <Td align="left">25.4</Td>
    <Td align="left">14.3</Td>
    <Td align="left">23.9 ± 3.8</Td>
    <Td align="left">25.0</Td>
    <Td align="left">28.1</Td>
  </tr>
  <tr>
    <Td align="left">COPA</Td>
    <Td align="left">49.7 ± 3.5</Td>
    <Td align="left">57.0</Td>
    <Td align="left">55.3 ± 3.8</Td>
    <Td align="left">60.0</Td>
    <Td align="left">42.7 ± 2.2</Td>
    <Td align="left">47.3</Td>
    <Td align="left">37.7</Td>
    <Td align="left">41.1 ± 3.0</Td>
    <Td align="left">55.3</Td>
    <Td align="left">43.0</Td>
  </tr>
  <tr>
    <Td align="left">HellaSwag</Td>
    <Td align="left">24.7 ± 0.3</Td>
    <Td align="left">25.1</Td>
    <Td align="left">29.4 ± 1.3</Td>
    <Td align="left">30.7</Td>
    <Td align="left">16.3 ± 0.1</Td>
    <Td align="left">22.8</Td>
    <Td align="left">17.6</Td>
    <Td align="left">21.0 ± 0.2</Td>
    <Td align="left">26.3</Td>
    <Td align="left">22.4</Td>
  </tr>
  <tr>
    <Td align="left">PiQA</Td>
    <Td align="left">47.9 ± 0.6</Td>
    <Td align="left">49.1</Td>
    <Td align="left">48.8 ± 3.8</Td>
    <Td align="left">53.4</Td>
    <Td align="left">41.2 ± 0.7</Td>
    <Td align="left">45.1</Td>
    <Td align="left">41.9</Td>
    <Td align="left">45.0 ± 0.6</Td>
    <Td align="left">48.5</Td>
    <Td align="left">46.3</Td>
  </tr>
  <tr>
    <Td align="left">RTE</Td>
    <Td align="left">5.1 ± 4.0</Td>
    <Td align="left">3.2</Td>
    <Td align="left">6.9 ± 3.1</Td>
    <Td align="left">0.1</Td>
    <Td align="left">3.9 ± 1.1</Td>
    <Td align="left">6.1</Td>
    <Td align="left">5.8</Td>
    <Td align="left">2.2 ± 4.3</Td>
    <Td align="left">1.1</Td>
    <Td align="left">8.9</Td>
  </tr>
  <tr>
    <Td align="left">SciQ</Td>
    <Td align="left">83.2 ± 0.6</Td>
    <Td align="left">80.4</Td>
    <Td align="left">86.3 ± 1.1</Td>
    <Td align="left">82.2</Td>
    <Td align="left">83.2 ± 0.6</Td>
    <Td align="left">82.6</Td>
    <Td align="left">83.1</Td>
    <Td align="left">86.3 ± 0.6</Td>
    <Td align="left">88.5</Td>
    <Td align="left">86.4</Td>
  </tr>
  <tr>
    <Td align="left">StoryCloze 2016</Td>
    <Td align="left">58.7 ± 0.2</Td>
    <Td align="left">61.8</Td>
    <Td align="left">62.8 ± 0.5</Td>
    <Td align="left">65.2</Td>
    <Td align="left">52.8 ± 0.3</Td>
    <Td align="left">58.1</Td>
    <Td align="left">54.3</Td>
    <Td align="left">57.2 ± 0.6</Td>
    <Td align="left">61.6</Td>
    <Td align="left">58.6</Td>
  </tr>
  <tr>
    <Td align="left">WinoGrande XL</Td>
    <Td align="left">11.6 ± 0.8</Td>
    <Td align="left">13.3</Td>
    <Td align="left">18.7 ± 1.0</Td>
    <Td align="left">19.7</Td>
    <Td align="left">5.8 ± 0.9</Td>
    <Td align="left">12.7</Td>
    <Td align="left">5.6</Td>
    <Td align="left">10.1 ± 1.0</Td>
    <Td align="left">16.2</Td>
    <Td align="left">11.0</Td>
  </tr>
  <tr>
    <Td align="left">E2E NLG</Td>
    <Td align="left">17.0 ± 1.4</Td>
    <Td align="left">15.6</Td>
    <Td align="left">17.9 ± 0.7</Td>
    <Td align="left">14.2</Td>
    <Td align="left">20.3 ± 0.3</Td>
    <Td align="left">20.5</Td>
    <Td align="left">20.5</Td>
    <Td align="left">21.6 ± 0.7</Td>
    <Td align="left">2.4</Td>
    <Td align="left">22.6</Td>
  </tr>
  <tr>
    <Td align="left">XSUM</Td>
    <Td align="left">2.4 ± 0.1</Td>
    <Td align="left">2.1</Td>
    <Td align="left">3.0 ± 0.3</Td>
    <Td align="left">2.5</Td>
    <Td align="left">3.0 ± 0.1</Td>
    <Td align="left">3.2</Td>
    <Td align="left">3.1</Td>
    <Td align="left">3.7 ± 0.2</Td>
    <Td align="left">4.6</Td>
    <Td align="left">3.8</Td>
  </tr>
  <tr>
    <Td align="left">WebNLG EN</Td>
    <Td align="left">5.3 ± 0.1</Td>
    <Td align="left">4.3</Td>
    <Td align="left">5.6 ± 0.3</Td>
    <Td align="left">4.4</Td>
    <Td align="left">8.8 ± 0.4</Td>
    <Td align="left">7.4</Td>
    <Td align="left">7.4</Td>
    <Td align="left">9.3 ± 0.5</Td>
    <Td align="left">9.7</Td>
    <Td align="left">9.4</Td>
  </tr>
  <tr>
    <Td align="left">WikiLingua EN</Td>
    <Td align="left">3.0 ± 0.1</Td>
    <Td align="left">3.2</Td>
    <Td align="left">3.6 ± 0.2</Td>
    <Td align="left">3.2</Td>
    <Td align="left">2.9 ± 0.1</Td>
    <Td align="left">3.0</Td>
    <Td align="left">3.1</Td>
    <Td align="left">4.0 ± 0.1</Td>
    <Td align="left">4.3</Td>
    <Td align="left">4.0</Td>
  </tr>
  <tr>
    <Td align="left">bAbI</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">15.5 ± 1.0</Td>
    <Td align="left">17.2</Td>
    <Td align="left">14.3</Td>
    <Td align="left">19.3 ± 1.0</Td>
    <Td align="left">21.1</Td>
    <Td align="left">18.0</Td>
  </tr>
  <tr>
    <Td align="left">Average</Td>
    <Td align="left">20.9 ± 0.4</Td>
    <Td align="left">19.1</Td>
    <Td align="left">22.2 ± 1.4</Td>
    <Td align="left">20.5</Td>
    <Td align="left">19.4 ± 0.5</Td>
    <Td align="left">21.2</Td>
    <Td align="left">19.1</Td>
    <Td align="left">21.4 ± 0.5</Td>
    <Td align="left">22.8</Td>
    <Td align="left">22.0</Td>
  </tr>
</Table>
</template>
