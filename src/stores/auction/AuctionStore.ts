import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ReadAuctionDetailResponse } from '@/apis/auction/AuctionDto'
export const useAuctionStore = defineStore(
  'auction',
  () => {
    const chatToken = ref<String>('')
    const auctionDetail = ref()

    const setToken = (token: String) => {
      chatToken.value = token
    }

    const setAuctionDetail = (readAuctionDetail: ReadAuctionDetailResponse) => {
      auctionDetail.value = readAuctionDetail
    }

    const deletePinia = () => {
      chatToken.value = ''
      auctionDetail.value = null
    }
    return {
      chatToken,
      auctionDetail,
      setToken,
      setAuctionDetail,
      deletePinia
    }
  },
  {
    persist: {
      key: 'auctions',
      storage: sessionStorage,
      paths: ['chatToken', 'auctionDetail']
    }
  }
)
