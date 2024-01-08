<template>
  <div class="modal" v-show="showModal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-close-button" @click="closeModal">&times;</div>
      </div>
      <div class="title-section">
        <div>회원님만을 위한</div>
        <div class="discount-highlight">최대 할인 혜택</div>
      </div>
      <div v-if="coupons.length" class="coupon-body-content-wrapper">
        <!-- TODO: 통합 테스트 완료 전까지 남겨두겠습니다. -->
        <!-- <CouponItemComponent
          :key="999"
          :couponInfoItemWithAvailabilityResponse="{
            couponInfoId: 1,
            appliesToType: `PRODUCT`,
            appliedToId: 1,
            discountType: `PERCENTAGE`,
            discountValue: 10,
            endAt: '2023-04-30T23:59:59',
            minPurchaseAmount: 1000,
            maxDiscountAmount: 10000,
            isDownloadable: true
          }"
        /> -->
        <!-- <CouponItemComponent
          :key="1000"
          :couponInfoItemWithAvailabilityResponse="{
            couponInfoId: 2,
            appliesToType: `CATEGORY`,
            appliedToId: 2,
            discountType: `FIXED_AMOUNT`,
            discountValue: 1000,
            endAt: '2023-04-30T23:59:59',
            minPurchaseAmount: 0,
            maxDiscountAmount: undefined,
            isDownloadable: false
          }"
        /> -->
        <!-- <CouponItemComponent
          :key="1000"
          :couponInfoItemWithAvailabilityResponse="{
            couponInfoId: 2,
            appliesToType: `CATEGORY`,
            appliedToId: 2,
            discountType: `FIXED_AMOUNT`,
            discountValue: 1000,
            endAt: '2023-04-30T23:59:59',
            minPurchaseAmount: 0,
            maxDiscountAmount: undefined,
            isDownloadable: false
          }"
        /> -->
        <CouponItemComponent
          v-for="(coupon, index) in coupons"
          :key="index"
          :couponInfoItemWithAvailabilityResponse="coupon"
        />

        <div class="bottom-section">
          <div class="price-calculation flex-row price-content">
            <div class="price-content">
              <div>상품가격</div>
              <div>{{ formattedProductPrice }}</div>
            </div>
            <div>-</div>
            <div class="price-content discount-value">
              <div>최대할인금액</div>
              <div>{{ formattedMaxDiscountAmount }}</div>
            </div>
            <div>=</div>
            <div class="price-content">
              <div>총상품금액</div>
              <div>{{ formattedTotalPrice }}</div>
            </div>
          </div>
          <div class="download-all" @click="handleDownloadMultipleCoupons">쿠폰 전체 다운받기</div>
        </div>
      </div>
      <div v-else class="coupon-body-content-wrapper no-content">
        해당 상품에 적용 가능한 쿠폰이 없습니다.
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CouponItemComponent from './CouponItemComponent.vue'
import { ref, onMounted, computed } from 'vue'
import type {
  CouponInfoItemWithAvailabilityResponse,
  MultipleCouponDownloadResponse
} from '@/apis/coupon/CouponItemDto'
import {
  getCouponsWithAvailibilityForProductDetail,
  downloadMultipleCoupons
} from '@/apis/coupon/coupon'
import { defineEmits } from 'vue'

const emit = defineEmits(['close-coupon-modal', 'total-price-updated'])

const { showModal, productId, categoryId, productPriceValue } = defineProps({
  showModal: {
    type: Boolean,
    required: true
  },
  productId: {
    type: Number,
    required: true
  },
  categoryId: {
    type: Number,
    required: true
  },
  productPriceValue: {
    type: Number,
    required: true
  }
})

const productPrice = ref(productPriceValue) // Using the prop value
const coupons = ref<CouponInfoItemWithAvailabilityResponse[]>([])

onMounted(async () => {
  try {
    coupons.value = await getCouponsWithAvailibilityForProductDetail(productId, categoryId)
  } catch (error) {
    console.error('Failed to fetch coupons for product detail:', error)
  }
})

const handleDownloadMultipleCoupons = async () => {
  const downloadableCouponInfoIds = coupons.value
    .filter((coupon) => coupon.isDownloadable)
    .map((coupon) => coupon.couponInfoId)
  if (downloadableCouponInfoIds.length === 0) {
    alert('이미 모든 쿠폰을 다운로드 받았습니다.')
    // console.log('다운로드 가능한 쿠폰이 없습니다.')
    return
  }

  try {
    const downloadResponse: MultipleCouponDownloadResponse =
      await downloadMultipleCoupons(downloadableCouponInfoIds)
    alert(downloadResponse.successfulIds.length + '개의 쿠폰을 다운로드 했습니다.')
    console.log('다운로드된 couponInfoId 목록:', downloadResponse.successfulIds)
    console.log('다운로드 실패한 couponInfoId 목록:', downloadResponse.failedIds)

    coupons.value.forEach((coupon) => {
      // 다운로드 된 쿠폰들 상태변경
      if (downloadResponse.successfulIds.includes(coupon.couponInfoId)) {
        coupon.isDownloadable = false
      }
    })
  } catch (error) {
    console.error('모든 쿠폰 다운로드 중 에러 발생:', error)
  }
}

const closeModal = () => {
  emit('close-coupon-modal')
}

const formattedProductPrice = computed(() => {
  return productPrice.value.toLocaleString() + '원'
})

const maxDiscountAmount = computed(() => {
  let maxDiscount = 0

  for (const coupon of coupons.value) {
    let discountAmount = 0
    console.log(`discountAmount:${discountAmount}`)

    // 할인 타입에 따라 분기
    if (coupon.discountType === 'PERCENTAGE') {
      discountAmount = (productPriceValue * coupon.discountValue) / 100
      console.log(`PERCENTAGE:${coupon}`)
      console.log(`discountAmount:${discountAmount}`)
    } else if (coupon.discountType === 'FIXED_AMOUNT') {
      discountAmount = coupon.discountValue
      console.log(`FIXED_AMOUNT:${coupon}`)
      console.log(`discountAmount:${discountAmount}`)
    }

    // maxDiscountAmount가 있다면 해당 쿠폰 할인이 해당 limit을 안넘는지 확인
    if (coupon.maxDiscountAmount !== undefined) {
      discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount)
      console.log(`max처리 후 임시 discountAmount:${discountAmount}`)
    }

    // max값 갱신
    maxDiscount = Math.max(maxDiscount, discountAmount)
    console.log(`갱신 후 임시 maxDiscount:${maxDiscount}`)
  }
  console.log(`계산완료 된 maxDiscount:${maxDiscount}`)
  return maxDiscount
})

const formattedMaxDiscountAmount = computed(() => {
  return maxDiscountAmount.value.toLocaleString() + '원'
})

const totalPrice = computed(() => {
  const newTotalPrice = productPrice.value - maxDiscountAmount.value

  // 총 상품 금액이 업데이트될 때마다 이벤트를 발생시켜 상위 컴포넌트로 전달.
  emit('total-price-updated', newTotalPrice)
  return newTotalPrice
})

const formattedTotalPrice = computed(() => {
  return totalPrice.value.toLocaleString() + '원'
})
</script>
<style scoped>
@import url('@/assets/css/coupon/product-detail-coupon-modal.css');
</style>
