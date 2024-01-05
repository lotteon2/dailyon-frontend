<script setup lang='ts'>
import { ref, onMounted, computed, watch, onBeforeMount } from 'vue'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import { getMyCoupons } from '@/apis/coupon/coupon'
import type { Coupons, Coupon } from '@/apis/coupon/CouponItemDto'

const requestPage = ref<number>(0)
const totalPages = ref<number>(0); 
const totalElements = ref<number>()

const coupons = ref<Coupons | null>(null)

const pageSize = 10; 

const onChangePage = async (page: number) => {
  if (page >= 0 && page < totalPages.value!) {
    requestPage.value = page;
    const response = await getMyCoupons(page);
    coupons.value = response;
  }
}

onBeforeMount(async () => {
  const response = await getMyCoupons(0);
  console.log("로딩 완료");
  console.log(response);
  
  totalElements.value = response.totalCounts;
  totalPages.value = Math.ceil(response.totalCounts / pageSize);
  coupons.value = response;
  console.log(coupons)
})


watch(requestPage, async (afterPage, beforePage) => {
  if (afterPage < totalPages.value!) {
    const response = await getMyCoupons(afterPage);
    coupons.value = response;
    
  }
})

</script>
<template>
  <div class="coupon-container">
    <div class="container-title">쿠폰 관리</div>
    <div class="container-line"></div>
    <table>
      <thead>
        <tr class="coupon-table-data1">
          <th>ID</th>
          <th>Name</th>
          <th>Discount Type</th>
          <th>Discount Value</th>
          <th>Start At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coupon, index) in coupons?.memberCouponInfoReadItemResponse" :key="index" class="coupon-table-data2">
          <td>{{ coupon.id }}</td>
          <td>{{ coupon.name }}</td>
          <td>{{ coupon.discountType }}</td>
          <td>{{ coupon.discountValue }}</td>
          <td>{{ coupon.startAt }}</td>
        </tr>
      </tbody>
    </table>
    <br>
    <div class="pagination">
      <PaginationComponent
      :onChangePage="onChangePage"
      :requestPage="requestPage"
      :totalPages="totalPages"
    />
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/coupon.css";
</style>
