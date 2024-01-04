<template>
  <div>
    <div class="order-item">
      <div class="product-name-block">
        <div class="image-container">
          <img :src="orderItem.imgUrl as string" alt="상품이미지" />
        </div>
        <div class="product-name">{{ orderItem.productName }}</div>
      </div>

      <div class="price-block">
        <div>
          <div class="price-desc">상품 가격</div>
          <div class="price-value">{{ formatPrice(orderItem.orderPrice) }}원</div>
        </div>
        <div class="price-operator">x</div>
        <div>
          <div class="price-desc">개수</div>
          <div class="price-value bold">{{ orderItem.quantity }}개</div>
        </div>

        <div class="price-operator">=</div>
        <div>
          <div class="price-desc">총 가격</div>
          <div class="price-value bold">
            {{ formatPrice(orderItem.orderPrice * orderItem.quantity) }}원
          </div>
        </div>
      </div>

      <div class="discount-block">{{ formatPrice(selectedDiscount) }}원</div>
    </div>
    <div>
      <!-- 가져온 해당 orderItem에 대한 coupon을 선택할 수 있는 radio button -->
      <div class="select-radio" v-for="coupon in coupons" :key="coupon.couponInfoId">
        <input
          type="radio"
          :id="`coupon-${orderItem.productId}-${coupon.couponInfoId}`"
          :value="coupon.couponInfoId"
          :checked="coupon.couponInfoId === selectedCouponId"
          :disabled="isCouponDisabled(coupon)"
          @change="onCouponSelected(coupon.couponInfoId)"
        />
        <label class="coupon-label" :for="`coupon-${orderItem.productId}-${coupon.couponInfoId}`">
          <!-- <div>
            {{ coupon.couponInfoId }}
          </div> -->
          <div class="coupon-name">
            {{ coupon.couponInfoName }}
          </div>
          <!-- <div>
            {{ coupon.endAt }}
          </div> -->
          <div class="discount-limitation">
            <div class="discount-limitation-block">
              <div>최소 구매</div>
              <div>{{ displayAmount(coupon.minPurchaseAmount) }}</div>
            </div>
            <div class="discount-limitation-block">
              <div>최대 할인</div>
              <div>{{ displayAmount(coupon.maxDiscountAmount) }}</div>
            </div>
          </div>
        </label>
      </div>

      <div class="select-radio">
        <!-- 쿠폰 선택안함 옵션 -->
        <input
          type="radio"
          :id="`no-coupon-${orderItem.productId}`"
          value="null"
          :checked="selectedCouponId === null"
          @change="onCouponSelected(null)"
        />
        <label :for="`no-coupon-${orderItem.productId}`">선택 안함</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted, ref, watch } from 'vue'
import type {
  CouponInfoItemResponse,
  CouponInfoItemCheckoutResponse
} from '@/apis/coupon/CouponItemDto'
import type { OrderItemDto } from '@/types/coupon'
import type { ProductInfo } from '@/apis/product/ProductDto'

const emit = defineEmits<{
  // (event: 'apply-coupon', orderItemIndex: number, couponInfoId: number | null): void
  (
    event: 'apply-coupon',
    orderItemIndex: number,
    couponInfoItem: CouponInfoItemCheckoutResponse | null
  ): void
}>()

const props = defineProps<{
  orderItem: ProductInfo
  coupons: CouponInfoItemCheckoutResponse[]
  selectedCouponId: number | null
  orderItemIndex: number
}>()

const selectedDiscount = ref<number>(0)

//😀//////////////////////////////////////////////

///////////////////////////////////////////////////////////
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ko-KR').format(price)
}

const displayAmount = (amount?: number | null): string => {
  return amount == null || amount === 0 ? '-' : formatPrice(amount) + '원'
}

const onCouponSelected = (couponId: number | null) => {
  const coupon = props.coupons.find((c) => c.couponInfoId === couponId)
  calculateDiscount(coupon)
  emit('apply-coupon', props.orderItemIndex, coupon ?? null)
}

const calculateDiscount = (coupon?: CouponInfoItemResponse | null): void => {
  if (coupon && props.orderItem) {
    const totalPrice = props.orderItem.orderPrice * props.orderItem.quantity
    let discount = 0
    if (coupon.discountType === 'PERCENTAGE') {
      discount = totalPrice * (coupon.discountValue / 100)
      if (
        coupon.maxDiscountAmount !== null &&
        coupon.maxDiscountAmount !== undefined &&
        discount > coupon.maxDiscountAmount
      ) {
        discount = coupon.maxDiscountAmount
      }
    } else {
      discount = coupon.discountValue
    }
    selectedDiscount.value = discount
  } else {
    selectedDiscount.value = 0
  }
}
const isCouponDisabled = (coupon: CouponInfoItemCheckoutResponse): boolean => {
  return props.orderItem.orderPrice * props.orderItem.quantity < (coupon.minPurchaseAmount || 0)
}

watch(
  () => props.selectedCouponId,
  (newCouponId: number | null) => {
    if (props.coupons !== undefined && props.coupons.length) {
      const coupon = props.coupons.find(
        (c: CouponInfoItemResponse) => c.couponInfoId === newCouponId
      )
      calculateDiscount(coupon)
    }
  },
  {
    immediate: true // This ensures the watcher is triggered immediately after the component is mounted
  }
)
</script>

<style scoped>
@import url('@/assets/css/coupon/checkoutmodal/order-item.css');
</style>
