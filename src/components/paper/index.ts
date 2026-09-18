/**
 * 论文写作组件统一出口。在 sections/*.vue 中：
 *
 * import { Heading, Para, En, Zh, Figure, Equation, Table, Th, Td,
 *          Bullets, Numbered, Item, Cite, Ref, EqRef, MathIn, Foot } from '../../../components/paper'
 */
export { default as PaperBody } from './PaperBody.vue'
export { default as Heading } from './Heading.vue'
export { default as Para } from './Para.vue'
export { default as Figure } from './Figure.vue'
export { default as Equation } from './Equation.vue'
export { default as Table } from './Table.vue'
export { default as Th } from './Th.vue'
export { default as Td } from './Td.vue'
export { default as Bullets } from './Bullets.vue'
export { default as Numbered } from './Numbered.vue'
export { default as Item } from './Item.vue'
export { default as En } from './En.vue'
export { default as Zh } from './Zh.vue'
export { Cite, Ref, EqRef, MathIn, Foot } from './inline'
