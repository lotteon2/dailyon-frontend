<template>
  <div class="fullscreen"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const orderId = ref(route.params.orderId)
onMounted(async () => {
  await window.opener.postMessage(
    {
      routeName: 'OrderResult',
      params: {
        orderId: orderId.value
      }
    },
    'http://localhost:5173'
  )
  window.close()
})
</script>

<style scoped>
@import '@/assets/css/payment-success.css';
</style>
