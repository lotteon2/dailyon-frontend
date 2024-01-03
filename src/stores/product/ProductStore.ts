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
      console.log('Pinia Before setting products:', products.value)
      products.value = productInfos
      orderType.value = type
      console.log('Pinia After setting products:', products.value)
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
