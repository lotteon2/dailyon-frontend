import { AxiosError, type AxiosResponse } from 'axios'
import { authAxiosInstance, defaultAxiosInstance, chatAuthAxiosInstance } from '@/apis/utils'
import type { CreateBidRequest, EnterResponse } from './AuctionDto'
import { useRouter } from 'vue-router'
const AUCTION_SERVICE_PREFIX_PATH = '/auction-service'

export const createBid = async (createBidRequest: CreateBidRequest): Promise<number> => {
  try {
    const { data } = await chatAuthAxiosInstance.post(
      `${AUCTION_SERVICE_PREFIX_PATH}/bids`,
      createBidRequest
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        } else if (error.response.status >= 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}

export const enter = async (auctionId: string): Promise<EnterResponse> => {
  const router = useRouter()
  try {
    const { data } = await authAxiosInstance.get(
      `${AUCTION_SERVICE_PREFIX_PATH}/auctions/enter/${auctionId}`
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
          router.replace('/')
        } else if (error.response.status >= 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
          router.replace('/')
        }
      }
    }
    throw error
  }
}

export const startBid = async (): Promise<AxiosResponse> => {
  try {
    const response = await authAxiosInstance.post(`${AUCTION_SERVICE_PREFIX_PATH}/admin/bids/`)
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        } else if (error.response.status >= 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}
