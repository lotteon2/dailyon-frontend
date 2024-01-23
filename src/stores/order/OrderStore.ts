import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { OrderSheet } from '@/apis/order/orderDto'

export const useOrderStore = defineStore(
  'order',
  () => {
    const order = ref()

    const setOrder = (orderInfo: any) => {
      order.value = orderInfo
    }
    return { order, setOrder }
  },
  {
    persist: {
      key: 'order',
      storage: sessionStorage,
      paths: ['order']
    }
  }
)
