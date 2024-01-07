<template>
  <div class="fullscreen">
    <div>결제 성공하셨습니다.</div>
    <div>{{ countdown }}초 뒤 포인트 결제 내역으로 이동합니다.</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMember } from '@/apis/member/member'
const route = useRoute()
const countdown = ref<number>(3)
const VITE_SUCCESS_REDIRECT_URL = ref<string>(import.meta.env.VITE_SUCCESS_REDIRECT_URL)

onMounted(async () => {
  setTimeout(() => {
    window.opener.postMessage(
      {
        routeName: 'pointPaymentHistory'
      },
      VITE_SUCCESS_REDIRECT_URL
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
