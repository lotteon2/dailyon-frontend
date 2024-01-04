<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
const props = defineProps({
  totalOrderPrice: {
    type: Number,
    required: true,
    default: 0
  },
  usedPoints: {
    type: Number,
    required: true,
    default: 0
  },
  totalPaymentPrice: {
    type: Number,
    required: true,
    default: 0
  },
  totalDiscountAmount: {
    type: Number,
    required: true,
    default: 0
  }
})
const emit = defineEmits(['doOrder'])
const doOrder = () => {
  emit('doOrder')
}
</script>
<template>
  <div class="pay-total-container">
    <div class="container-title">결제 금액</div>
    <div class="line"></div>
    <div class="pay-first-block">
      <div class="pay-inner-first-block">
        <div class="pay-first-col">
          <span>총 주문금액</span>
          <span>쿠폰 할인</span>
          <span>포인트</span>
        </div>
        <div class="pay-second-col">
          <span>{{ props.totalOrderPrice?.toLocaleString() }} 원</span>
          <span>- {{ props.totalDiscountAmount?.toLocaleString() }} 원</span>
          <span>- {{ props.usedPoints?.toLocaleString() }} 원</span>
        </div>
      </div>
      <div class="inner-line"></div>
      <div class="pay-inner-second-block">
        <span>총 결제금액</span>
        <span>{{ (props.totalPaymentPrice - props.totalDiscountAmount).toLocaleString() }} 원</span>
      </div>
    </div>
  </div>
  <div class="pay-method-container">
    <div class="pay-method-first-row">
      <div class="container-title">결제 수단</div>
      <span>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</span>
    </div>
    <div class="line"></div>
    <div class="kakao-pay" @click="doOrder">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="47"
        height="42"
        viewBox="0 0 47 42"
        fill="none"
      >
        <path
          d="M23.5 39.3804C36.4779 39.3804 47 30.5648 47 19.6902C47 8.81559 36.4779 0 23.5 0C10.5221 0 0 8.81559 0 19.6902C0 24.6409 2.18256 29.1696 5.78688 32.6295C5.50194 35.4874 4.56194 38.6209 3.52206 40.9725C3.29 41.4957 3.73944 42.0808 4.324 41.9908C10.951 40.95 14.8902 39.3523 16.6028 38.5197C18.8526 39.0943 21.1715 39.3837 23.5 39.3804Z"
          fill="#181600"
        />
      </svg>
      <span>카카오페이</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="42"
        viewBox="0 0 47 42"
        fill="none"
      >
        <path
          d="M23.5 39.3804C36.4779 39.3804 47 30.5648 47 19.6902C47 8.81559 36.4779 0 23.5 0C10.5221 0 0 8.81559 0 19.6902C0 24.6409 2.18256 29.1696 5.78688 32.6295C5.50194 35.4874 4.56194 38.6209 3.52206 40.9725C3.29 41.4957 3.73944 42.0808 4.324 41.9908C10.951 40.95 14.8902 39.3523 16.6028 38.5197C18.8526 39.0943 21.1715 39.3837 23.5 39.3804Z"
          fill="#fee500"
        />
      </svg>
    </div>
  </div>
</template>
<style scoped>
@import '@/assets/css/order/order-payment.css';
</style>
