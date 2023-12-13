<script setup lang="ts">
import { ref } from 'vue'
import type { OrderDetailResponse } from '@/apis/order/orderDto'
const props = defineProps({
  orderDetails: {
    type: Array as () => Array<OrderDetailResponse>,
    default: () => [],
    required: true
  }
})
</script>
<template v-if="props.orderDetails">
  <div v-for="(orderDetail, index) in props.orderDetails" :key="index" class="card">
    <img :src="orderDetail.thumbnail" class="thumbnail" />
    <p class="product-name">{{ orderDetail.productName }}</p>
    <p class="product-quantity">{{ orderDetail.productQuantity }}개</p>
    <p class="order-price">{{ orderDetail.orderPrice }}원</p>
    <p class="status">{{ orderDetail.status }}</p>
    <button class="black-button">상세 보기</button>
  </div>
  <div class="card2">
    <div>나 주문에 사용 된 포인트</div>
    <div>주문에 적용 된 배달 비</div>
  </div>
</template>

<style scoped>
@import '@/assets/css/order-history.css';
</style>
