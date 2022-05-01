import { createRouter, createWebHistory } from 'vue-router'
//import {preloaderStart} from "@/../public/js/func.js";

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
  },
  {
    path: '/profile/id:id',
    name: 'Profile',
    props: true,
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/dialogs',
    name: 'Dialogs',
    props: true,
    component: () => import('../views/Dialogs.vue'),
  },
  {
    path: '/messages/id:id',
    name: 'Messages',
    props: true,
    component: () => import('../views/Messages.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('../views/Feed.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFound.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'Messages') {
      if (savedPosition) return savedPosition
    } else {
      return { top: 0, behavior: 'instant' }
    }
  },
})
router.beforeEach((to, from, next) => {
  //console.log(to)
  //this.preloaderStart()
  //preloaderStart();
  switch (to.name) {
    case 'Profile':
      document.title = `id${to.params.id} — Барыбинцы`
      window.history.pushState(
        to.params,
        `id${to.params.id} — Барыбинцы`,
        `/profile/id${to.params.id}`
      )
      next()
      break
    case 'Dialogs':
      document.title = 'Диалоги — Барыбинцы'
      window.history.pushState(to.params, 'Диалоги — Барыбинцы', '/dialogs')
      next()
      break
    case 'Messages':
      document.title = 'Сообщения — Барыбинцы'
      window.history.pushState(
        to.params,
        'Сообщения — Барыбинцы',
        `/messages/id${to.params.id}`
      )
      next()
      break
    case 'Feed':
      document.title = 'Новости — Барыбинцы'
      window.history.pushState(to.params, 'Новости — Барыбинцы', `/feed`)
      next()
      break
    case 'Settings':
      document.title = 'Настройки — Барыбинцы'
      //window.history.pushState(to.params, "Настройки — Барыбинцы", "/settings");
      next()
      break
    default:
      //document.title = to.name + ' — Барыбинцы'
      next()
  }
})

export default router
