import { AxiosError, type AxiosResponse } from 'axios'
import { authAxiosInstance, defaultAxiosInstance } from '@/apis/utils'
import type { CreateBidRequest } from './AuctionDto'

const AUCTION_SERVICE_PREFIX_PATH = '/auction-service'

export const createBid = async (createBidRequest: CreateBidRequest): Promise<number> => {
  try {
    const { data } = await authAxiosInstance.post(
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
        }
        if (error.response.status >= 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}
