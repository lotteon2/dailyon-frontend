<template>
  <div class="fullscreen"></div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notification/NotificationStore'

const route = useRoute()
const orderId = ref(route.params.orderId)
const notificationStore = useNotificationStore()
const { shouldSubscribeToSSE } = storeToRefs(notificationStore)
const VITE_SUCCESS_REDIRECT_URL = ref<string>(import.meta.env.VITE_SUCCESS_REDIRECT_URL)

/*
해당 창에서만 SSE 구독을 차단 (자식창에서 이루어지는 pinia 상태변경은 부모창과 공유되지 않음.) 
headerComponent의 onbeforeMount보다 빠른 setup에서 변경 -> 재구독 하지 않음. ( pinia 초기화 -> persist로 sessionStorage물려받음 -> setup -> onBeforeMount )
*/
shouldSubscribeToSSE.value = false

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
