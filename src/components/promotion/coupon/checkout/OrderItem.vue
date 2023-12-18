<template>
  <div>
    <div class="order-item">
      <div class="product-name-block">
        <div class="image-container">
          <img :src="orderItem.imgUrl" alt="상품이미지" />
        </div>
        <div class="product-name">{{ orderItem.productName }}</div>
      </div>

      <div class="price-block">
        <div>
          <div class="price-desc">상품 가격</div>
          <div class="price-value">{{ formatPrice(orderItem.originalPrice) }}원</div>
        </div>
        <div class="price-operator">x</div>
        <div>
          <div class="price-desc">개수</div>
          <div class="price-value bold">{{ orderItem.count }}개</div>
        </div>

        <div class="price-operator">=</div>
        <div>
          <div class="price-desc">총 가격</div>
          <div class="price-value bold">
            {{ formatPrice(orderItem.originalPrice * orderItem.count) }}원
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

const emit = defineEmits<{
  (event: 'apply-coupon', orderItemIndex: number, couponInfoId: number | null): void
}>()

const props = defineProps<{
  orderItem: OrderItemDto
  coupons: CouponInfoItemCheckoutResponse[]
  selectedCouponId: number | null
  orderItemIndex: number
}>()

const selectedDiscount = ref<number>(0)

//😀//////////////////////////////////////////////
const mockCoupons: CouponInfoItemCheckoutResponse[] = [
  {
    couponInfoId: 1,
    couponInfoName: '[특가할인] 나이키 에어포스1 20% 할인',
    appliesToType: 'PRODUCT',
    appliedToId: 1,
    discountType: 'PERCENTAGE',
    discountValue: 20,
    endAt: new Date().toISOString(), // converting current date-time to ISO string
    minPurchaseAmount: 15000,
    maxDiscountAmount: 2000
  },
  // Add more coupon mock objects here
  {
    couponInfoId: 2,
    couponInfoName: '나이키 에어포스1 5000원 할인',
    appliesToType: 'PRODUCT',
    appliedToId: 1,
    discountType: 'FIXED_AMOUNT',
    discountValue: 5000,
    endAt: new Date(Date.now() + 86400000).toISOString(), // One day later
    minPurchaseAmount: 10000,
    maxDiscountAmount: undefined
  },
  {
    couponInfoId: 3,
    couponInfoName: '[특가할인] 신발 카테고리 15% 할인',
    appliesToType: 'CATEGORY',
    appliedToId: 2,
    discountType: 'PERCENTAGE',
    discountValue: 15,
    endAt: new Date(Date.now() + 2 * 86400000).toISOString(), // Two days later
    minPurchaseAmount: 0,
    maxDiscountAmount: 15000
  },
  {
    couponInfoId: 4,
    couponInfoName: '남성 의류 1000원 할인',
    appliesToType: 'CATEGORY',
    appliedToId: 1,
    discountType: 'FIXED_AMOUNT',
    discountValue: 1000,
    endAt: new Date(Date.now() + 3 * 86400000).toISOString(), // Three days later
    minPurchaseAmount: 8000,
    maxDiscountAmount: 5000
  }
  // You can add as many as needed following the pattern above
]

// Use ref to create a reactive object for coupons, initially assign mock data
const coupons = ref<CouponInfoItemResponse[]>([])

onMounted(() => {
  coupons.value = mockCoupons
})
///////////////////////////////////////////////////////////
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ko-KR').format(price)
}

const displayAmount = (amount?: number | null): string => {
  return amount == null || amount === 0 ? '-' : formatPrice(amount) + '원'
}

const onCouponSelected = (couponId: number | null) => {
  const coupon = coupons.value.find((c) => c.couponInfoId === couponId)
  calculateDiscount(coupon)
  emit('apply-coupon', props.orderItemIndex, couponId)
}

const calculateDiscount = (coupon?: CouponInfoItemResponse | null): void => {
  if (coupon && props.orderItem) {
    const totalPrice = props.orderItem.originalPrice * props.orderItem.count
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
  return props.orderItem.originalPrice * props.orderItem.count < (coupon.minPurchaseAmount || 0)
}

watch(
  () => props.selectedCouponId,
  (newCouponId: number | null) => {
    const coupon = coupons.value.find((c: CouponInfoItemResponse) => c.couponInfoId === newCouponId)
    calculateDiscount(coupon)
  },
  {
    immediate: true // This ensures the watcher is triggered immediately after the component is mounted
  }
)

// const onCouponChange = (event: Event) => {
//   const target = event.target as HTMLInputElement
//   if (target.checked) {
//     emit('coupon-change', parseInt(target.value)) //emit selection
//   } else {
//     emit('coupon-change', null) //emit deselection
//   }
// }
</script>

<style scoped>
@import url('@/assets/css/coupon/checkoutmodal/order-item.css');
</style>
