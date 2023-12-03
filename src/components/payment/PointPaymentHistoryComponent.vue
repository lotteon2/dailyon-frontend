<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getPointPayments } from '@/apis/payment/payment'
import type { PaymentPageResponse, PaymentResponse } from '@/apis/payment/paymentDto'
import { request } from 'http'
import PointPaymentHistoryItem from './PointPaymentHistoryItem.vue'
const requestPage = ref<number>(0)
const paymentId = ref<Number | null>(null)
const payments = ref<Array<PaymentResponse>>()
const hasNext = ref<boolean>(false)

const fetchDefaultData = async (): Promise<PaymentPageResponse<PaymentResponse>> => {
  const data = await getPointPayments(paymentId.value, requestPage.value)
  payments.value = data.payments
  hasNext.value = data.hasNext
}

onBeforeMount(async () => {
  await fetchDefaultData()
})
</script>

<template>
  <div class="point-container">
    <div class="container-title">포인트 결제 내역</div>
    <div class="container-line"></div>
    <table>
      <col width="200px" />
      <col width="150px" />
      <col width="150px" />
      <col width="150px" />
      <tr class="point-table-data1">
        <td class="left-margin">결제금액</td>
        <td>결제수단</td>
        <td>결제상태</td>
        <td>결제일</td>
      </tr>
      <point-payment-history-item :payments="payments" />
    </table>
  </div>
</template>

<style scoped>
@import '@/assets/css/point-payment-history.css';
</style>
