<template>
  <div class="modal" v-show="isCheckoutCouponModalOpen">
    <div class="modal-content">
      <div class="modal-header-section">
        <div class="modal-close-button" @click="closeModal">&times;</div>
      </div>
      <div>
        <h2 class="modal-title">쿠폰 적용</h2>
        <div class="modal-header-bar">
          <div>상품명</div>
          <div>판매가</div>
          <div>할인금액</div>
        </div>
      </div>
      <OrderDetailList
        :orderItems="orderItems"
        :nestedCoupons="computedNestedCoupons"
        @update-coupons="handleUpdateCoupons"
      />
      <CheckoutModalFooter @apply-coupons-and-close="applyCouponsAndClose" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderDetailList from './OrderDetailList.vue'
import CheckoutModalFooter from './CheckoutModalFooter.vue'
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { getCouponsForCheckout } from '@/apis/coupon/coupon'

import type { OrderItemDto, OrderItemWithCouponInfoIdDto } from '@/types/coupon'

import type {
  ProductCategoryPair,
  CheckoutCouponApplicationResponse,
  CouponInfoItemResponse,
  CouponInfoItemCheckoutResponse
} from '@/apis/coupon/CouponItemDto'

const { isCheckoutCouponModalOpen, orderItems } = defineProps<{
  isCheckoutCouponModalOpen: boolean
  orderItems: OrderItemDto[]
}>()

const emit = defineEmits(['close-checkout-coupon-modal', 'apply-coupons'])
// , {event: 'apply-coupons', null}: void
const computedNestedCoupons = ref<CouponInfoItemCheckoutResponse[][]>([])
const couponSelections = ref<OrderItemWithCouponInfoIdDto[]>([])

const fetchCouponsForCheckout = async () => {
  const productCategoryPairs: ProductCategoryPair[] = orderItems.map((item: OrderItemDto) => ({
    productId: item.productId,
    categoryId: item.categoryId
  }))
  computedNestedCoupons.value = (
    await getCouponsForCheckout(productCategoryPairs)
  ).nestedCouponInfoItemResponses
}

const closeModal = () => {
  emit('close-checkout-coupon-modal')
}

const applyCouponsAndClose = () => {
  // 쿠폰 선택 정보를 checkout 페이지로 전달
  emit('apply-coupons', couponSelections) // 어떤 아이템에 어떤 쿠폰을 쓰는지 넘겨줌. 매핑된 객체 리스트
  emit('close-checkout-coupon-modal')
}

const handleUpdateCoupons = (selectedIds: (number | null)[]) => {
  // 이벤트에 포함될 데이터를 정리하는 로직
  couponSelections.value = orderItems.map((item: OrderItemDto, index: number) => ({
    productId: item.productId,
    categoryId: item.categoryId,
    couponInfoId: selectedIds[index] // number | null
  }))
}

onMounted(fetchCouponsForCheckout)
</script>

<style scoped>
@import url('@/assets/css/coupon/checkoutmodal/checkout-coupon-modal.css');
</style>
