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
import { useProductStore } from '@/stores/product/ProductStore'
import { getCouponsForCheckout } from '@/apis/coupon/coupon'

import type {
  OrderItemDto,
  OrderItemWithCouponInfoDto,
  OrderItemWithCouponInfoIdDto
} from '@/types/coupon'
import type { ProductInfo } from '@/apis/product/ProductDto'

import type {
  ProductCategoryPair,
  CheckoutCouponApplicationResponse,
  CouponInfoItemResponse,
  CouponInfoItemCheckoutResponse
} from '@/apis/coupon/CouponItemDto'

const productStore = useProductStore()
const { isCheckoutCouponModalOpen, orderItems } = defineProps<{
  isCheckoutCouponModalOpen: boolean
  orderItems: ProductInfo[]
}>()


const emit = defineEmits(['close-checkout-coupon-modal'])
// , {event: 'apply-coupons', null}: void

const computedNestedCoupons = ref<CouponInfoItemCheckoutResponse[][]>([])
const orderItemsWithCouponSelections = ref<OrderItemWithCouponInfoDto[]>([]) // 중간객체

const fetchCouponsForCheckout = async () => {
  // 😀 side effect 우려되서 이렇게 둠.
  const productCategoryPairs: ProductCategoryPair[] = orderItems.map((item: ProductInfo) => ({
    productId: item.productId as number,
    categoryId: item.categoryId as number
  }))
  computedNestedCoupons.value = (
    await getCouponsForCheckout(productCategoryPairs)
  ).nestedCouponInfoItemResponses
}

const closeModal = () => {
  emit('close-checkout-coupon-modal')
}

const applyCouponsAndClose = () => {
  // 😀 여기서 pinia update
  applyCouponDatas() // discountAmount 계산 후 pinia 저장
  emit('close-checkout-coupon-modal')
}

// 이벤트에 포함될 데이터를 정리하는 로직. 중간객체인 OrderItemWithCouponInfoDto[]를 두고,
// 😀 side effect 방지 위해 중간격 객체 두고 적용시에 pinia update
const handleUpdateCoupons = (selectedCoupons: (CouponInfoItemCheckoutResponse | null)[]) => {
  orderItemsWithCouponSelections.value = orderItems.map(
    (item: ProductInfo, index: number): OrderItemWithCouponInfoDto => {
      const coupon = selectedCoupons[index] // Get the selected coupon

      return {
        ...item, // ProductInfo fields들을 Spread

        couponInfoId: coupon ? coupon.couponInfoId : null, // 따로 할당
        couponInfoName: coupon ? coupon.couponInfoName : null,
        appliesToType: coupon ? coupon.appliesToType : null,
        appliedToId: coupon ? coupon.appliedToId : null,
        discountType: coupon ? coupon.discountType : null,
        discountValue: coupon ? coupon.discountValue : null,
        endAt: coupon ? coupon.endAt : null,
        minPurchaseAmount: coupon ? coupon.minPurchaseAmount : null,
        maxDiscountAmount: coupon ? coupon.maxDiscountAmount : null
      }
    }
  )
}

const applyCouponDatas = () => {
  const updatedProducts = orderItemsWithCouponSelections.value.map((item) => {
    let discount = 0

    if (item.couponInfoId !== null && item.discountValue !== null) {
      const totalPrice = item.orderPrice * item.quantity

      if (item.discountType === 'PERCENTAGE') {
        discount = totalPrice * (item.discountValue / 100)
        const maxDiscountAmount = item.maxDiscountAmount ?? Number.MAX_VALUE
        discount = Math.min(discount, maxDiscountAmount)
      } else if (item.discountType === 'FIXED_AMOUNT') {
        discount = item.discountValue
      }
    }

    return {
      ...item,
      discountAmount: discount,
      couponInfoId: item.couponInfoId
    }
  })

  productStore.setProducts(updatedProducts, productStore.orderType)
}

onMounted(fetchCouponsForCheckout)
</script>

<style scoped>
@import url('@/assets/css/coupon/checkoutmodal/checkout-coupon-modal.css');
</style>
