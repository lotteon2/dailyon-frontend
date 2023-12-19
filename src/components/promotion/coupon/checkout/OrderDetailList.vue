<template>
  <div class="order-item-list">
    <OrderItem
      v-for="(orderItem, index) in orderItems"
      :key="orderItem.productId"
      :orderItem="orderItem"
      :coupons="nestedCoupons[index]"
      :selectedCouponId="selectedCouponIds[index]"
      :orderItemIndex="index"
      @apply-coupon="handleApplyCoupon"
    />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, computed, defineProps, defineEmits } from 'vue'
import OrderItem from './OrderItem.vue'
import type { OrderItemDto } from '@/types/coupon'
import type {
  CouponInfoItemResponse,
  CouponInfoItemCheckoutResponse
} from '@/apis/coupon/CouponItemDto'

const props = defineProps<{
  orderItems: OrderItemDto[]
  nestedCoupons: CouponInfoItemCheckoutResponse[][]
}>()

const emit = defineEmits(['update-coupons'])

// OrderItem개수만큼의 array. couponId선택되었으면 해당 index는 couponId, 선택안되었으면 null을 갖게 됨.
const selectedCouponIds = ref<(number | null)[]>(new Array(props.orderItems.length).fill(null))

const handleApplyCoupon = (orderItemIndex: number, couponId: number | null) => {
  // 다른 orderItem에 현재 선택하려는 couponId가 선택되어 있는 경우, 해당 index의 값을 null로.(deselect)
  for (let i = 0; i < selectedCouponIds.value.length; i++) {
    if (selectedCouponIds.value[i] === couponId && i !== orderItemIndex) {
      selectedCouponIds.value[i] = null
    }
  }
  // 선택하고 있는 orderItem의 값을 바꿈. (couponId, null 들어올 수 있음.)
  selectedCouponIds.value[orderItemIndex] = couponId
  emit('update-coupons', selectedCouponIds.value) // 바꾼 뒤 전달. 계속 동기화시켜줌.
}
</script>

<style scoped>
@import url('@/assets/css/coupon/checkoutmodal/order-detail-list.css');
</style>
