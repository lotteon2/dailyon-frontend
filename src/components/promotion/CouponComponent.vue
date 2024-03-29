<script setup lang="ts">
import { ref, onMounted, computed, watch, onBeforeMount } from 'vue'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import { getMyCoupons } from '@/apis/coupon/coupon'
import type { Coupons, Coupon } from '@/apis/coupon/CouponItemDto'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'
import router from '@/router'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const requestPage = ref<number>(0)
const totalPages = ref<number>(0)
const totalElements = ref<number>()

const coupons = ref<Coupons | null>(null)

const pageSize = 10

const onChangePage = async (page: number) => {
  if (page >= 0 && page < totalPages.value!) {
    requestPage.value = page
    const response = await getMyCoupons(page)
    coupons.value = response
  }
}

onBeforeMount(async () => {
  const response = await getMyCoupons(0)

  totalElements.value = response.totalCounts
  totalPages.value = Math.ceil(response.totalCounts / pageSize)
  coupons.value = response
})

watch(requestPage, async (afterPage, beforePage) => {
  if (afterPage < totalPages.value!) {
    const response = await getMyCoupons(afterPage)
    coupons.value = response
  }
})

const formatCouponDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear() % 100
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}

const formatDiscountValue = (coupon: Coupon) => {
  if (coupon.discountType === 'FIXED_AMOUNT') {
    const formattedValue = Number(coupon.discountValue).toLocaleString()
    return `${formattedValue}원`
  } else if (coupon.discountType === 'PERCENTAGE') {
    return `${coupon.discountValue}%`
  }
  return coupon.discountValue
}

const couponClickHandler = (coupon: Coupon) => {
  if (coupon.appliesToType === 'PRODUCT') {
    if (coupon.appliesToId) {
      router.push({ path: `/products/${coupon.appliesToId}` })
    }
  } else if (coupon.appliesToType === 'CATEGORY') {
    if (coupon.appliesToId) {
      router.push({ path: `/product-list?category=${coupon.appliesToId}` })
    }
  }
}
</script>

<template>
  <div class="container-title">보유 쿠폰 조회</div>
  <div class="container-line"></div>
  <template v-if="coupons && coupons.memberCouponInfoReadItemResponse.length > 0">
    <div class="coupon-container">
      <table>
        <col width="1200px" />
        <col width="200px" />
        <col width="200px" />
        <thead>
          <tr class="coupon-table-data1">
            <th>쿠폰이름</th>
            <th>할인금액</th>
            <th>마감일</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(coupon, index) in coupons?.memberCouponInfoReadItemResponse"
            :key="index"
            class="coupon-table-data2"
            @click="couponClickHandler(coupon)"
          >
            <td>{{ coupon.name }}</td>
            <td>{{ formatDiscountValue(coupon) }}</td>
            <td>{{ formatCouponDate(coupon.endAt) }}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <div class="pagination">
        <PaginationComponent
          :onChangePage="onChangePage"
          :requestPage="requestPage"
          :totalPages="totalPages"
        />
      </div>
    </div>
  </template>
  <template v-else>
    <WhitePageComponent message="보유 쿠폰이 없습니다." />
  </template>
</template>

<style scoped>
@import '@/assets/css/coupon.css';
</style>
