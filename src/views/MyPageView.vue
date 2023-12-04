<script setup lang="ts">
import MyPageNavbarComponent from '@/components/MyPageNavbarComponent.vue'
import MyPageHeaderComponent from '@/components/MyPageHeaderComponent.vue'
import OrderHistoryComponent from '@/components/order/OrderHistoryComponent.vue'
import PointPaymentHistoryComponent from '@/components/payment/PointPaymentHistoryComponent.vue'
import PointHistoryComponent from '@/components/member/PointHistoryComponent.vue'
import CouponComponent from '@/components/promotion/CouponComponent.vue'
import EventComponent from '@/components/promotion/EventComponent.vue'
import CartComponent from '@/components/wishcart/CartComponent.vue'
import WishComponent from '@/components/wishcart/WishComponent.vue'
import MemberInfoComponent from '@/components/member/MemberInfoComponent.vue'
import ReviewComponent from '@/components/product/ReviewComponent.vue'
import OOTDFollowComponent from '@/components/ootd/OOTDFollowComponent.vue'
import OOTDPostLikeComponent from '@/components/ootd/OOTDPostLikeComponent.vue'
import MyOOTDPostComponent from '@/components/ootd/MyOOTDPostComponent.vue'
</script>

<template>
  <div class="main-container">
    <MyPageNavbarComponent />
    <div class="right-container">
      <MyPageHeaderComponent />
      <OrderHistoryComponent v-if="$route.name === 'orderHistory'" />
      <PointPaymentHistoryComponent v-if="$route.name === 'pointPaymentHistory'" />
      <PointHistoryComponent v-if="$route.name === 'pointHistory'" />
      <CouponComponent v-if="$route.name === 'coupons'" />
      <EventComponent v-if="$route.name === 'events'" />
      <CartComponent v-if="$route.name === 'carts'" />
      <WishComponent v-if="$route.name === 'wishlist'" />
      <MemberInfoComponent v-if="$route.name === 'memberInfo'" />
      <ReviewComponent v-if="$route.name === 'reviews'" />
      <OOTDFollowComponent v-if="$route.name === 'follows'" />
      <MyOOTDPostComponent v-if="$route.name === 'myPosts'" />
      <OOTDPostLikeComponent v-if="$route.name === 'likePosts'" />
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/mypage.css';
</style>
