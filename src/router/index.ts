import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { infoModal, warningModal } from '@/utils/Modal'
import { LOGIN_NEED_MSG, NOTFOUND_MSG } from '@/utils/CommonMessage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/new-products',
      name: 'newProduct',
      component: () => import('@/views/NewProductView.vue')
    },
    {
      path: '/best-products',
      name: 'bestProduct',
      component: () => import('@/views/BestProductView.vue')
    },
    {
      path: '/product-list',
      name: 'productList',
      component: () => import('@/views/ProductListView.vue')
    },
    {
      path: '/products/:id',
      name: 'productDetails',
      component: () => import('@/views/ProductDetailView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/OrderView.vue'),
      meta: { requiresAuth: true }
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
      component: () => import('@/views/OOTDPostCreateView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/ootds/:id/edit',
      name: 'ootdPostUpdate',
      component: () => import('@/views/OOTDPostUpdateView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/ootds/profile/:id',
      name: 'ootdProfile',
      component: () => import('@/views/OOTDProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('@/views/EventView.vue')
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('@/views/NotificationView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/auctions',
      name: 'auctions',
      component: () => import('@/views/AuctionListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/my-page',
      name: 'my-page',
      redirect: '/order-history',
      component: () => import('@/views/MyPageView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/order-history',
          name: 'orderHistory',
          component: () => import('@/components/order/OrderHistoryComponent.vue')
        },
        {
          path: '/point-payment-history',
          name: 'pointPaymentHistory',
          component: () => import('@/components/payment/PointPaymentHistoryComponent.vue')
        },
        {
          path: '/gifts',
          name: 'gifts',
          component: () => import('@/components/gifts/GiftComponent.vue')
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
    },
    {
      path: '/payment-result',
      redirect: 'paymentResult',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'success',
          redirect: '/notfound',
          children: [
            {
              path: ':orderId',
              name: 'paymentResult',
              component: () => import('@/views/PaymentSuccessView.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/order-result/:orderId',
      name: 'OrderResult',
      component: () => import('@/views/OrderResultView.vue')
    },
    {
      path: '/order-success/:orderId',
      name: 'orderSuccess',
      component: () => import('@/views/OrderSuccessView.vue')
    },
    {
      path: '/logininfo',
      name: 'info',
      component: () => import('@/views/LoginGetInfo.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    },
    {
      path: '/chat/:auctionId',
      name: 'chat',
      component: () => import('@/views/ChatView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    infoModal('알림', LOGIN_NEED_MSG)
    next('/login')
  } else if (to.name === 'login' && isLoggedIn()) {
    infoModal('알림', '이미 로그인한 상태입니다.')
    next('/')
  } else if (to.name === 'not-found') {
    warningModal('알림', NOTFOUND_MSG)
    next('/')
  } else {
    next()
  }
})

const isLoggedIn = () => {
    const token = localStorage.getItem('accessToken')
    return !!token
}

export default router
