import type { ReadAuctionDetailResponse, ReadAuctionPageResponse } from '@/apis/auction/AuctionDto'
import { defaultAxiosInstance } from '@/apis/utils'
import { AxiosError } from 'axios'

const AUCTION_SERVICE_PREFIX: string = '/auction-service'
const AUCTION_PREFIX: string = '/auction'

export const getAuctionPage = async (
  path: string,
  page: number,
  size: number
): Promise<ReadAuctionPageResponse> => {
  try {
    const { data } = await defaultAxiosInstance.get(
      `${AUCTION_SERVICE_PREFIX}${AUCTION_PREFIX}/${path}`,
      {
        params: { page: page, size: size }
      }
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
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}

export const getAuctionDetail = async (auctionId: string): Promise<ReadAuctionDetailResponse> => {
  try {
    const { data } = await defaultAxiosInstance.get(
      `${AUCTION_SERVICE_PREFIX}${AUCTION_PREFIX}/detail/${auctionId}`
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
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}
