<template>
  <div class="fullscreen"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const orderId = ref(route.params.orderId)
const VITE_SUCCESS_REDIRECT_URL = ref<string>(import.meta.env.VITE_SUCCESS_REDIRECT_URL)
onMounted(async () => {
  await window.opener.postMessage(
    {
      routeName: 'OrderResult',
      params: {
        orderId: orderId.value
      }
    },
    VITE_SUCCESS_REDIRECT_URL
  )
  window.close()
})
</script>

<style scoped>
@import '@/assets/css/payment-success.css';
</style>
