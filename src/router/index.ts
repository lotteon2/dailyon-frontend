import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/luxury',
      name: 'luxury',
      component: () => import('@/views/LuxuryView.vue')
    },
    {
      path: '/fashions',
      name: 'fashions',
      component: () => import('@/views/FashionView.vue')
    },
    {
      path: '/products/:id',
      name: 'productDetails',
      component: () => import('@/views/ProductDetailView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/OrderView.vue')
    },
    {
      path: '/ootds',
      name: 'ootds',
      component: () => import('@/views/OOTDView.vue')
    },
    {
      path: '/ootds/:id',
      name: 'ootdDetails',
      component: () => import('@/views/OOTDDetailView.vue')
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
