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
    const referralCode = ref()
    const auctionId = ref()

    const setProducts = (
      productInfos: ProductInfo[],
      type: String,
      refCode: String | null,
      auction: String | null
    ) => {
      products.value = productInfos
      orderType.value = type
      referralCode.value = refCode
      auctionId.value = auction
    }

    const setReceiver = (data: GiftInfo) => {
      giftInfo.value = data
    }
    const deletePinia = () => {
      products.value = null
      giftInfo.value = null
      orderType.value = null
      referralCode.value = null
      auctionId.value = null
    }
    return {
      products,
      orderType,
      giftInfo,
      referralCode,
      auctionId,
      setProducts,
      setReceiver,
      deletePinia
    }
  },
  {
    persist: {
      key: 'orderProduct',
      storage: sessionStorage,
      paths: ['products', 'orderType', 'giftInfo', 'referralCode', 'auctionId']
    }
  }
)
