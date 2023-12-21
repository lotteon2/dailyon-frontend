<script setup lang="ts">
import { ref } from 'vue'
import type { PaymentResponse } from '@/apis/payment/paymentDto'
const props = defineProps({
  payments: {
    type: Array as () => Array<PaymentResponse>,
    default: () => [],
    required: true
  }
})
</script>

<template>
  <tr v-for="(payment, idx) in payments" :key="idx" class="point-table-data2">
    <td class="left-margin">{{ payment.totalAmount }}원</td>
    <td>{{ payment.method }}</td>
    <td>{{ payment.status }}</td>
    <td>{{ payment.createdAt }}</td>
  </tr>
</template>

<style scoped>
@import '@/assets/css/point-history.css';
</style>
