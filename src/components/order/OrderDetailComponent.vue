<script setup lang="ts">
import { ref, computed } from 'vue'
import type { OrderDetailResponse } from '@/apis/order/orderDto'
const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)
const props = defineProps({
  orderDetails: {
    type: Array as () => Array<OrderDetailResponse>,
    default: () => [],
    required: true
  }
})
</script>
<template v-if="props.orderDetails">
  <div v-for="(orderDetail, index) in orderDetails" :key="index" class="order-detail-container">
    <div class="left-section">
      <div class="left-inner-status">
        <div class="product-status bold-text">{{ orderDetail.status }}</div>
      </div>
      <div class="left-inner-contents">
        <div class="product-thumbnail">
          <img class="image" :src="`${VITE_STATIC_IMG_URL}${orderDetail.thumbnail}`" />
        </div>
        <div class="text-contents">
          <div class="product-name">상품명 : {{ orderDetail.productName }}</div>
          <div class="product-price">
            가격 : {{ new Intl.NumberFormat('ko-KR').format(orderDetail.orderPrice) }}원
            <span class="gray-text mid-bar">|</span>
            {{ orderDetail.productQuantity }}개
          </div>
          <div>쿠폰이름 : {{ orderDetail.couponName }}</div>
          <div>쿠폰 적용 금액 : {{ orderDetail.couponDiscountPrice }}</div>
        </div>
      </div>
      <div class="left-inner-empty"></div>
    </div>
    <div class="right-section">
      <div v-if="orderDetail.status == 'PaymentStatus'">
        <div class="right-section-buttons">
          <div class="right-inner-button">
            <button class="white-button">결제 조회</button>
          </div>
        </div>
      </div>
      <div v-else-if="orderDetail.status == '주문 완료'">
        <div class="right-section-buttons">
          <div class="right-inner-button">
            <button class="white-button">주문취소</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/order/order-detail.css';
</style>
