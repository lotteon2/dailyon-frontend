<template>
  <div class="coupon-item" :style="{ backgroundImage: `url(${couponTicketImage})` }">
    <div class="discount-text-content">
      <div class="discount-value">
        {{ formattedDiscountValue }}
      </div>
      <div class="end-at-value">유효기간: {{ formattedEndDate }}</div>
      <div v-if="couponInfo?.minPurchaseAmount">
        최소주문금액: {{ formattedMinPurchaseAmount }}원 이상
      </div>
      <div v-if="couponInfo?.maxDiscountAmount">
        최대할인금액: {{ formattedMaxDiscountAmount }}원
      </div>
    </div>
    <div class="download-button-wrapper">
      <img
        class="active-button"
        @click="postDownloadCouponRequest"
        v-if="couponInfo?.isDownloadable"
        :src="downloadButtonImage"
        alt="Download Coupon"
      />
      <img v-else :src="downloadedMarkImage" alt="Coupon Downloaded" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, watchEffect, ref } from 'vue'
import type { PropType } from 'vue'
import type {
  CouponInfoItemWithAvailabilityResponse,
  CouponInfoItemResponse
} from '@/apis/coupon/CouponItemDto'
import { downloadCoupon } from '@/apis/coupon/coupon'
import couponTicketImage from '@/assets/images/coupon/coupon-ticket.png'
import downloadButtonImage from '@/assets/images/coupon/download-button.png'
import downloadedMarkImage from '@/assets/images/coupon/downloaded-mark.png'

const props = defineProps({
  couponInfoItemWithAvailabilityResponse: Object as PropType<CouponInfoItemWithAvailabilityResponse>
})

// 로컬로 복사해서 가지고 있음.
const couponInfo = ref(props.couponInfoItemWithAvailabilityResponse)
const isDownloadable = ref(couponInfo.value?.isDownloadable)
watchEffect(() => {
  // props이 업데이트될 때마다 로컬 상태도 업데이트.
  isDownloadable.value = couponInfo.value?.isDownloadable
})

const formattedDiscountValue = computed(() => {
  return couponInfo.value?.discountType === 'FIXED_AMOUNT'
    ? `${couponInfo.value?.discountValue.toLocaleString()}원`
    : `${couponInfo.value?.discountValue}%`
})

const formattedEndDate = computed(() => {
  if (!couponInfo.value?.endAt) return '' // Handle the case where endAt might be undefined
  const endDate = new Date(couponInfo.value?.endAt)
  return `~ ${endDate.getFullYear()}년 ${
    endDate.getMonth() + 1
  }월 ${endDate.getDate()}일 ${endDate.getHours()}:${endDate
    .getMinutes()
    .toString()
    .padStart(2, '0')} 까지`
})
//

const formattedMinPurchaseAmount = computed(() => {
  return couponInfo.value?.minPurchaseAmount
    ? couponInfo.value?.minPurchaseAmount.toLocaleString()
    : ''
})

const formattedMaxDiscountAmount = computed(() => {
  return couponInfo.value?.maxDiscountAmount
    ? couponInfo.value?.maxDiscountAmount.toLocaleString()
    : ''
})

const postDownloadCouponRequest = async () => {
  if (couponInfo === undefined || !couponInfo.value?.couponInfoId) {
    alert('쿠폰 정보가 유효하지 않습니다.')
    return
  }

  try {
    await downloadCoupon(couponInfo.value?.couponInfoId)
    isDownloadable.value = false
  } catch (err) {
    //이미 downloadCoupon메소드 안에서 alert날리는 중. catch가 필요해서 빈 block으로 둠.
  }
}
</script>

<style scoped>
@import url('@/assets/css/coupon/coupon-item-component.css');
</style>
