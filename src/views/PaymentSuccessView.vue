<template>
  <div class="fullscreen">
    <div>결제 성공하셨습니다.</div>
    <div>{{ countdown }}초 뒤 포인트 결제 내역으로 이동합니다.</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const orderId = ref(route.params.orderId)
const countdown = ref<number>(3)

onMounted(() => {
  setTimeout(() => {
    window.opener.postMessage(
      {
        routeName: 'pointPaymentHistory',
        params: {
          orderId: orderId.value
        }
      },
      'http://localhost:5173'
    )
  }, 3000)

  const intervalId = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(intervalId)
      window.close()
    }
  }, 1000)
})
</script>

<style scoped>
@import '@/assets/css/payment-success.css';
</style>
