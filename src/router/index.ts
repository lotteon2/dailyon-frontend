import { createRouter, createWebHistory } from 'vue-router'
import LuxuryView from '@/views/LuxuryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'luxury',
      component: LuxuryView
    },
    {
      path: '/fashions',
      name: 'fashions',
      component: () => import('@/views/FashionView.vue')
    },
    {
      path: '/ootds',
      name: 'ootds',
      component: () => import('@/views/OOTDView.vue')
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('@/views/EventView.vue')
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('@/views/NotificationView.vue')
    },
    {
      path: '/carts',
      name: 'carts',
      component: () => import('@/views/CartView.vue')
    },
    {
      path: '/likes',
      name: 'likes',
      component: () => import('@/views/LikeView.vue')
    },
    {
      path: '/my-page',
      name: 'my-page',
      component: () => import('@/views/MyPageView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

export default router
