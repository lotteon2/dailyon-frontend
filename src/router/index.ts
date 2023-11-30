import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OrderHistoryComponent from '@/components/order/OrderHistoryComponent.vue'

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
      path: '/ootds/create',
      name: 'ootdPostCreate',
      component: () => import('@/views/OOTDPostCreateView.vue')
    },
    {
      path: '/ootds/profile/:id',
      name: 'ootdProfile',
      component: () => import('@/views/OOTDProfileView.vue')
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
      path: '/my-page',
      name: 'my-page',
      redirect: '/order-history',
      component: () => import('@/views/MyPageView.vue'),
      children: [
        {
          path: '/order-history',
          name: 'orderHistory',
          component: () => import('@/components/order/OrderHistoryComponent.vue')
        },
        {
          path: '/point-history',
          name: 'pointHistory',
          component: () => import('@/components/member/PointHistoryComponent.vue')
        },
        {
          path: '/coupons',
          name: 'coupons',
          component: () => import('@/components/promotion/CouponComponent.vue')
        },
        {
          path: '/events',
          name: 'events',
          component: () => import('@/components/promotion/EventComponent.vue')
        },
        {
          path: '/carts',
          name: 'carts',
          component: () => import('@/components/wishcart/CartComponent.vue')
        },
        {
          path: '/wishlist',
          name: 'wishlist',
          component: () => import('@/components/wishcart/WishComponent.vue')
        },
        {
          path: '/member-info',
          name: 'memberInfo',
          component: () => import('@/components/member/MemberInfoComponent.vue')
        },
        {
          path: '/reviews',
          name: 'reviews',
          component: () => import('@/components/product/ReviewComponent.vue')
        },
        {
          path: '/follows',
          name: 'follows',
          component: () => import('@/components/ootd/OOTDFollowComponent.vue')
        },
        {
          path: '/my-posts',
          name: 'myPosts',
          component: () => import('@/components/ootd/MyOOTDPostComponent.vue')
        },
        {
          path: '/like-posts',
          name: 'likePosts',
          component: () => import('@/components/ootd/OOTDPostLikeComponent.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

export default router
