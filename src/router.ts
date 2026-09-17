import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from './components/HomeView.vue'
import { paperLoaders, paperMetas } from './data/registry'

/* 论文正文按需动态加载：component 返回 Promise，首屏/主页只含 meta */
const paperRoutes: RouteRecordRaw[] = Object.entries(paperLoaders).map(([id, load]) => ({
  path: `/paper/${id}`,
  component: () => load!().then(m => m.default),
  meta: { paperId: id },
}))

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView, props: { papers: paperMetas } },
    ...paperRoutes,
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.path !== from.path) return { top: 0 }
    return savedPosition ?? { top: 0 }
  },
})

export default router
