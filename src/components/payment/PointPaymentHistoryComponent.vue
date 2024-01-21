<script setup lang="ts">
import { ref, onBeforeMount, watchEffect } from 'vue'
import { getPointPayments } from '@/apis/payment/payment'
import type { PaymentPageResponse, PaymentResponse } from '@/apis/payment/paymentDto'
import PointPaymentHistoryItem from './PointPaymentHistoryItem.vue'
import PaginationComponent from '../ootd/PaginationComponent.vue'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'
const requestPage = ref<number>(0)
const totalElements = ref<Number | null>(0)
const payments = ref<Array<PaymentResponse>>()
const totalPages = ref<number>()
const type = ref<string>('POINT')

const fetchDefaultData = async (requestPage: number, type: string): Promise<void> => {
  const data = await getPointPayments(requestPage, type)
  payments.value = data.payments
  totalElements.value = data.totalElements
  totalPages.value = data.totalPages
}

onBeforeMount(async () => {
  await fetchDefaultData(0, type.value)
})

const onChangePage = async (page: number) => {
  if (page >= 0 && page < totalPages.value!) {
    requestPage.value = page
  }
}

watchEffect(() => {
  fetchDefaultData(requestPage.value, type.value), requestPage.value
})
</script>

<template>
  <div class="point-container">
    <div class="container-title">포인트 결제 내역</div>
    <div class="container-line"></div>
    <table class="point-table">
      <col width="150px" />
      <col width="150px" />
      <col width="150px" />
      <col width="150px" />
      <tr class="point-table-data1">
        <td class="left-margin">결제금액</td>
        <td>결제수단</td>
        <td>결제상태</td>
        <td>결제일</td>
      </tr>
      <point-payment-history-item v-if='payments !== undefined && payments.length !== 0' :payments="payments" />
      <td v-else colspan='4' style='width: 100%; text-align: center'>
        <WhitePageComponent message="포인트 결제 내역이 없습니다" />
      </td>
    </table>
    <PaginationComponent
      :onChangePage="onChangePage"
      :requestPage="requestPage"
      :totalPages="totalPages"
    />
  </div>
</template>

<style scoped>
@import '@/assets/css/point-payment-history.css';
</style>
