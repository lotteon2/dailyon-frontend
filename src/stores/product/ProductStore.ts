import type { ProductInfo } from '@/apis/product/ProductDto'
import type { GiftInfo } from '@/apis/order/orderDto'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore(
  'product',
  () => {
    const products = ref()
    const giftInfo = ref()
    const orderType = ref()

    const setProducts = (productInfos: ProductInfo[], type: String) => {
      products.value = productInfos
      orderType.value = type
    }

    const setReceiver = (data: GiftInfo) => {
      giftInfo.value = data
    }
    const deletePinia = () => {
      products.value = null
      giftInfo.value = null
      orderType.value = null
      sessionStorage.removeItem('orderProduct')
    }
    return {
      products,
      orderType,
      giftInfo,
      setProducts,
      setReceiver,
      deletePinia
    }
  },
  {
    persist: {
      key: 'orderProduct',
      storage: sessionStorage,
      paths: ['products', 'orderType', 'giftInfo']
    }
  }
)
