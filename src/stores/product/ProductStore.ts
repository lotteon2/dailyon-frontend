import type { ProductInfo } from '@/apis/product/ProductDto'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore(
  'product',
  () => {
    const products = ref<ProductInfo[]>([])
    const orderType = ref()

    const setProducts = (productInfos: ProductInfo[], type: String) => {
      products.value = productInfos
      orderType.value = type
    }
    return {
      products,
      orderType,
      setProducts
    }
  },
  {
    persist: {
      key: 'orderProduct',
      storage: sessionStorage,
      paths: ['products', 'orderType']
    }
  }
)
