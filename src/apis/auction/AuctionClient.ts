import type { ReadAuctionDetailResponse, ReadAuctionPageResponse } from '@/apis/auction/AuctionDto'
import { defaultAxiosInstance } from '@/apis/utils'
import { AxiosError } from 'axios'

const AUCTION_SERVICE_PREFIX: string = '/auction-service'
const AUCTION_PREFIX: string = '/auction'

export const getFutureAuctionPage = async (
  page: number,
  size: number
): Promise<ReadAuctionPageResponse> => {
  try {
    const { data } = await defaultAxiosInstance.get(
      `${AUCTION_SERVICE_PREFIX}${AUCTION_PREFIX}/future`,
      {
        params: { page: page, size: size }
      }
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        } else if (error.response.status < 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}

export const getCurrentAuctionPage = async (
  page: number,
  size: number
): Promise<ReadAuctionPageResponse> => {
  try {
    const { data } = await defaultAxiosInstance.get(
      `${AUCTION_SERVICE_PREFIX}${AUCTION_PREFIX}/current`,
      {
        params: { page: page, size: size }
      }
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        } else if (error.response.status < 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}

export const getPastAuctionPage = async (
  page: number,
  size: number
): Promise<ReadAuctionPageResponse> => {
  try {
    const { data } = await defaultAxiosInstance.get(
      `${AUCTION_SERVICE_PREFIX}${AUCTION_PREFIX}/past`,
      {
        params: { page: page, size: size }
      }
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        } else if (error.response.status < 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}

export const getAuctionDetail = async (auctionId: string): Promise<ReadAuctionDetailResponse> => {
  try {
    const { data } = defaultAxiosInstance.get(
      `${AUCTION_SERVICE_PREFIX}${AUCTION_PREFIX}/detail/${auctionId}`
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        } else if (error.response.status < 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}
