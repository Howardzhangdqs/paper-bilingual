<!-- Prompts and Samples -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Table, Td } from '../../../components/paper'
</script>

<template>
<Heading :level="1" appendix label="sec:samples" en="Prompts and Samples" zh="提示与样本" />

<Para>
  <En>The following figures illustrate the prompts with samples from each evaluation dataset. Prompts stem from PromptSource~\cite{promptsource} or GPT-3~\cite{brown2020language}. All data comes from the ground truth datasets in this section, and no generations are shown here.</En>
  <Zh>以下各图展示了每个评估数据集的提示与样本。提示来自 PromptSource~\cite{promptsource} 或 GPT-3~\cite{brown2020language}。本节所有数据均来自真实标注（ground truth）数据集，未展示任何模型生成内容。</Zh>
</Para>

<Table caption-en="Formatted dataset example from ANLI R1 evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 ANLI R1 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">Edmond (or Edmund) Halley, FRS (pronounced ; 8 November [O.S. 29 October] 1656 – 25 January 1742 [O.S. 14 January 1741] ) was an English astronomer, geophysicist, mathematician, meteorologist, and physicist who is best known for computing the orbit of Halley's Comet. He was the second Astronomer Royal in Britain, succeeding John Flamsteed.

Question: Edmond Halley was born outside of the United Kingdom. True, False, or Neither?

Answer:</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~Neither</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~True</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~False</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from ANLI R2 evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 ANLI R2 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">The 1970 Swedish Open was a combined men's and women's tennis tournament played on outdoor clay courts held in Båstad, Sweden and was part of the Grand Prix circuit of the 1970 Tour. It was the 23rd edition of the tournament and was held from 2 July through 12 July 1970. Dick Crealy and Peaches Bartkowicz won the singles titles.

Question: Dick Crealy and Peaches Bartkowicz beat eachother in the 1970 Swedish Open. True, False, or Neither?

Answer:</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~False</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~True</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~Neither</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from ANLI R3 evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 ANLI R3 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">Tokyo - Food group Nestle is seeking to lure Japanese holiday shoppers with a taste for fine snacking with a gold-wrapped Kit Kat chocolate bar. The single finger Kit Kat is wrapped in a thin layer of gold leaf. Only 500 of the bars go on sale from Dec. 29 with a price tag of around 2,016 yen (\$16). The Kit Kat chocolate bar made its debut in Japan in 1973 and since then a variety of flavors -- from green tea to wasabi -- have been produced.

Question: Japanese like kit kat. True, False, or Neither?

Answer:</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~True</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~False</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~Neither</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from ARC-Challenge evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 ARC-Challenge 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">An astronomer observes that a planet rotates faster after a meteorite impact. Which is the most likely effect of this increase in rotation?</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~Planetary days will become shorter.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~Planetary years will become longer.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~Planetary gravity will become stronger.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from ARC-Easy evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 ARC-Easy 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">To express the distance between the Milky Way galaxy and other galaxies, the most appropriate unit of measurement is the</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~light-year.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~meter.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~kilometer.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~astronomical unit.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from BoolQ evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 BoolQ 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">Radio wave -- Radio waves are a type of electromagnetic radiation with wavelengths in the electromagnetic spectrum longer than infrared light. Radio waves have frequencies as high as 300 gigahertz (GHz) to as low as 30 hertz (Hz). At 300 GHz, the corresponding wavelength is 1 mm, and at 30 Hz is 10,000 km. Like all other electromagnetic waves, radio waves travel at the speed of light. They are generated by electric charges undergoing acceleration, such as time varying electric currents. Naturally occurring radio waves are emitted by lightning and astronomical objects.

Question: do radio waves travel at the speed of light?

Answer:</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~yes</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~no</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from CB evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 CB 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">A: Okay. So Frank, what, uh, type of, uh, budget do you or your family have? B: Well, uh I don't know that we really have a budget.

Question: he and his family really have a budget. True, False or Neither?

Answer:</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~False</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~True</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~Neither</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from COPA evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 COPA 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">The computer was expensive to fix therefore</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~I bought a new one.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~I got it repaired.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from HellaSwag evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 HellaSwag 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">Canoeing: Two women in a child are shown in a canoe while a man pulls the canoe while standing in the water, with other individuals visible in the background. The child and a different man</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~sit in a canoe while the man paddles.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~are then shown paddling down a river in a boat while a woman talks.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~are driving the canoe, they go down the river flowing side to side.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~walking go down the rapids, while the man in his helicopter almost falls and goes out of canoehood.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from PiQA evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 PiQA 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">Question: How to sleep in proper posture?

Answer:</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~Sleep straight with a pillow under your head.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~Sleep straight with a pillow over your head.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from RTE evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 RTE 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">As spacecraft commander for Apollo XI, the first manned lunar landing mission, Armstrong was the first man to walk on the Moon. "That's one small step for a man, one giant leap for mankind." With these historic words, man's dream of the ages was fulfilled. 

Question: Neil Armstrong was the first man who landed on the Moon. True or False?

Answer:</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~True.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~False.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from SciQ evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 SciQ 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">The electromagnetic spectrum encompasses a very wide range of wavelengths and frequencies. Visible light is only a very small portion of the spectrum with wavelengths from 400-700 nm.

Question: With wavelengths from 400-700 nm, what kind of light represents only a very small portion of the spectrum?

Answer:</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~visible light.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~ultraviolet light.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~invisible light.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~sunlight.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from StoryCloze evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 StoryCloze 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">Bob went to the gas station to fill up his car. His tank was completely empty and so was his wallet. The cashier offered to pay for his gas if he came back later to pay. Bob felt grateful as he drove home.

Answer:</Td>
  </tr>
  <tr>
    <Td align="right">Correct Answer $\to$</Td>
    <Td align="left">~Bob believed that there were good people in the world.</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Answer $\to$</Td>
    <Td align="left">~Bob contemplated how unfriendly the world was.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from WinoGrande evaluated using accuracy as described in \autoref{sec:eval}." caption-zh="来自 WinoGrande 的格式化数据集示例，按 \autoref{sec:eval} 所述以准确率评估。">
  <tr>
    <Td align="right">Correct Context $\to$</Td>
    <Td align="left">Johnny likes fruits more than vegetables in his new keto diet because the fruits:</Td>
  </tr>
  <tr>
    <Td align="right">Incorrect Context $\to$</Td>
    <Td align="left">Johnny likes fruits more than vegetables in his new keto diet because the
vegetables:</Td>
  </tr>
  <tr>
    <Td align="right">Target Completion $\to$</Td>
    <Td align="left">~are saccharine.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from E2E NLG evaluated using ROUGE as described in \autoref{sec:eval}." caption-zh="来自 E2E NLG 的格式化数据集示例，按 \autoref{sec:eval} 所述以 ROUGE 评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">Given the following data about a restaurant:

name : The Wrestlers

eatType : pub

food : Japanese

priceRange : cheap

area : riverside

near : Raja Indian Cuisine</Td>
  </tr>
  <tr>
    <Td align="right">Generate some text about this restaurant.</Td>
  </tr>
  <tr>
    <Td align="right">Target $\to$</Td>
    <Td align="left">~The Wrestlers offers Japanese food and pub with cheap price near Raja Indian Cuisine in riverside.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from XSUM evaluated using ROUGE as described in \autoref{sec:eval}." caption-zh="来自 XSUM 的格式化数据集示例，按 \autoref{sec:eval} 所述以 ROUGE 评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">Article: The artificial intelligence system - LipNet - watches video of a person speaking and matches the text to the movement of their mouths with 93\% accuracy, the researchers said.

Automating the process could help millions, they suggested.

But experts said the system needed to be tested in real-life situations.

Lip-reading is a notoriously tricky business with professionals only able to decipher what someone is saying up to 60\% of the time.

"Machine lip-readers have enormous potential, with applications in improved hearing aids, silent dictation in public spaces, covert conversations, speech recognition in noisy environments, biometric identification and silent-movie processing," wrote the researchers.

They said that the AI system was provided with whole sentences so that it could teach itself which letter corresponded to which lip movement.

To train the AI, the team - from Oxford University's AI lab - fed it nearly 29,000 videos, labelled with the correct text. Each video was three seconds long and followed a similar grammatical pattern.

While human testers given similar videos had an error rate of 47.7\%, the AI had one of just 6.6\%.

The fact that the AI learned from specialist training videos led some on Twitter to criticise the research.

Writing in OpenReview, Neil Lawrence pointed out that the videos had "limited vocabulary and a single syntax grammar".

"While it's promising to perform well on this data, it's not really groundbreaking. While the model may be able to read my lips better than a human, it can only do so when I say a meaningless list of words from a highly constrained vocabulary in a specific order," he writes.

The project was partially funded by Google's artificial intelligence firm DeepMind.</Td>
  </tr>
  <tr>
    <Td align="right">Summary:</Td>
  </tr>
  <tr>
    <Td align="right">Target $\to$</Td>
    <Td align="left">~Scientists at Oxford University have developed a machine that can lip-read better than humans.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from WebNLG evaluated using ROUGE as described in \autoref{sec:eval}." caption-zh="来自 WebNLG 的格式化数据集示例，按 \autoref{sec:eval} 所述以 ROUGE 评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">I will verbalize an abstract representation of a sentence in natural language. To do so, I will first show the representation and then the natural language. The text needs to include all of the information in the representation.

Brandon\_Carter | almaMater | University\_of\_Cambridge, University\_of\_Cambridge | chancellor | David\_Sainsbury,\_Baron\_Sainsbury\_of\_Turville, Brandon\_Carter | birthPlace | England, University\_of\_Cambridge | viceChancellor | Leszek\_Borysiewicz</Td>
  </tr>
  <tr>
    <Td align="right">Target $\to$</Td>
    <Td align="left">~The University of Cambridge is the alma mater of Brandon Carter, who was born in England. David Sainsbury, also known as the Baron Sainsbury of Turville, and Leszek Borysiewicz are respectively the chancellor and vice chancellor of the University of Cambridge.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from WikiLingua evaluated using ROUGE as described in \autoref{sec:eval}." caption-zh="来自 WikiLingua 的格式化数据集示例，按 \autoref{sec:eval} 所述以 ROUGE 评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">Attributes are placed within the tag itself, making additional alterations to the \"element content\" between the start and end tag. They never stand alone. They are written in the format name=\"value\", where name is the name of the attribute (for instance \"color\"), and value describes this specific instance (for instance \"red\"). You've actually seen attributes before, if you followed the tutorial in the basic HTML section. &lt;img> tags use the src attribute, anchors use the name attribute, and links use the href attribute. See how those all follow the \_\_\_=\"\_\_\_\" format? Making a table, or chart, requires several different tags. Play with these tags, or learn about HTML tables in more detail.  Start with table tags around the entire table:&lt;table>&lt;/table>  Row tags around the contents of each row: &lt;tr>  Column headers in the first row: &lt;th>  Cells in subsequent rows: &lt;td>  Here's an example of how it all fits together:&lt;table>&lt;tr>&lt;th>Column 1: Month&lt;/th>&lt;th>Column 2: Money Saved&lt;/th>&lt;/tr>&lt;tr>&lt;td>January&lt;/td>&lt;td>\$100&lt;/td>&lt;/tr>&lt;/table> You've already learned the &lt;head> tag, which shows up at the start of each document. Besides the &lt;title> tag, it can include the following types of tags:   Meta tags, which are used to provide metadata about a web page. This data can be used by search engines when the robot scours the internet to locate and list websites. To make your website more visible on search engines, use one or more &lt;meta> start tags (no end tags necessary), each with exactly one name attribute and one content attribute, for example: &lt;meta name=\"description\" content=\"write a description here\">; or &lt;meta name=\"keywords\" content=\"write a list of keywords, each separated by a comma\"> &lt;link> tags are used to associate other files with the page. This is mainly used to link to CSS stylesheets, which are made using a different type of coding to alter your HTML page by adding color, aligning your text, and many other things. &lt;script> tags are used to link the page to JavaScript files, which can cause the page to change as...</Td>
  </tr>
  <tr>
    <Td align="right">TL;DR in English:</Td>
  </tr>
  <tr>
    <Td align="right">Target $\to$</Td>
    <Td align="left">~Learn about attributes. Experiment with HTML tables. Learn the miscellaneous head tags. Play around with HTML found on websites. Learn more advanced web design from comprehensive guides.</Td>
  </tr>
</Table>

<Table caption-en="Formatted dataset example from bAbI evaluated using exact match as described in \autoref{sec:eval}." caption-zh="来自 bAbI 的格式化数据集示例，按 \autoref{sec:eval} 所述以精确匹配评估。">
  <tr>
    <Td align="right">Context $\to$</Td>
    <Td align="left">John travelled to the kitchen. Sandra moved to the kitchen. Daniel went to the kitchen. John journeyed to the hallway. Mary journeyed to the bedroom. Mary journeyed to the kitchen. Mary travelled to the bedroom. Sandra travelled to the bedroom. John went to the office. John went back to the kitchen. Where is Mary?</Td>
  </tr>
  <tr>
    <Td align="right">Target $\to$</Td>
    <Td align="left">~bedroom</Td>
  </tr>
</Table>
</template>
