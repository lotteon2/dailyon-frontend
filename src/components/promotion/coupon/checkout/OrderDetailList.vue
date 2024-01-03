<template>
  <div class="order-item-list">
    <OrderItem
      v-for="(orderItem, index) in orderItems"
      :key="orderItem.productId as number"
      :orderItem="orderItem"
      :coupons="nestedCoupons[index]"
      :selectedCouponId="selectedCoupons[index]?.couponInfoId ?? null"
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
import type { ProductInfo } from '@/apis/product/ProductDto'

const props = defineProps<{
  orderItems: ProductInfo[]
  nestedCoupons: CouponInfoItemCheckoutResponse[][]
}>()

const emit = defineEmits(['update-coupons'])

// OrderItem개수만큼의 array. couponId선택되었으면 해당 index는 CouponInfoItemCheckoutResponse, 선택안되었으면 null을 갖게 됨. 😀 여기서 관리
const selectedCoupons = ref<(CouponInfoItemCheckoutResponse | null)[]>(
  new Array(props.orderItems.length).fill(null)
)

const handleApplyCoupon = (
  orderItemIndex: number,
  couponItem: CouponInfoItemCheckoutResponse | null
) => {
  // 다른 orderItem에 현재 선택하려는 couponId가 선택되어 있는 경우, 해당 index의 값을 null로.(deselect)
  for (let i = 0; i < selectedCoupons.value.length; i++) {
    if (selectedCoupons.value[i] === couponItem && i !== orderItemIndex) {
      selectedCoupons.value[i] = null
    }
  }
  // 선택하고 있는 orderItem의 값을 바꿈. (couponId, null 들어올 수 있음.)
  selectedCoupons.value[orderItemIndex] = couponItem ? couponItem : null
  console.log('Emit update-coupons event:', selectedCoupons.value)
  emit('update-coupons', selectedCoupons.value) // 바꾼 뒤 전달. 계속 동기화시켜줌.
}
</script>

<style scoped>
@import url('@/assets/css/coupon/checkoutmodal/order-detail-list.css');
</style>
