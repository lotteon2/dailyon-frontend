import { AxiosError } from 'axios'
import { defaultAxiosInstance } from '@/apis/utils'
import type {
  ReadCacheProductListResponse,
  ReadProductDetailResponse,
  ReadProductSearchResponse,
  ReadProductSliceResponse
} from '@/apis/product/ProductDto'
import { openInternalServerErrorNotification } from '@/utils/Toast'
import { warningModal } from '@/utils/Modal'

const PRODUCT_SERVICE_PREFIX: string = '/product-service'
const PRODUCT_PREFIX: string = '/products'

export const searchProducts = async (query: string): Promise<ReadProductSearchResponse> => {
  try {
    const { data } = await defaultAxiosInstance.get(
      `${PRODUCT_SERVICE_PREFIX}${PRODUCT_PREFIX}/search`,
      {
        params: { query: query }
      }
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          await warningModal('알림', error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        }
        if (error.response.status >= 500) {
          openInternalServerErrorNotification()
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}

export const getProductSlice = async (
  brandId: number | null,
  categoryId: number | null,
  gender: string | null,
  lowPrice: number | null,
  highPrice: number | null,
  query: string | null,
  page: number,
  sort: string,
  direction: string
): Promise<ReadProductSliceResponse> => {
  try {
    const params: any = { page: page, sort: sort, direction: direction }
    if (brandId !== null) params.brandId = brandId
    if (categoryId !== null) params.categoryId = categoryId
    if (gender !== null) params.gender = gender
    if (lowPrice !== null) params.lowPrice = lowPrice
    if (highPrice !== null) params.highPrice = highPrice
    if (query !== null) params.query = query
    const { data } = await defaultAxiosInstance.get(`${PRODUCT_SERVICE_PREFIX}${PRODUCT_PREFIX}`, {
      params: params
    })
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          await warningModal('알림', error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        }
        if (error.response.status >= 500) {
          openInternalServerErrorNotification()
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}
export const getProductDetail = async (productId: number): Promise<ReadProductDetailResponse> => {
  try {
    const { data } = await defaultAxiosInstance.get(
      `${PRODUCT_SERVICE_PREFIX}${PRODUCT_PREFIX}/id/${productId}`
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          await warningModal('알림', error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        }
        if (error.response.status >= 500) {
          openInternalServerErrorNotification()
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}

export const getNewProducts = async (): Promise<ReadCacheProductListResponse> => {
  try {
    const { data } = await defaultAxiosInstance.get(
      `${PRODUCT_SERVICE_PREFIX}${PRODUCT_PREFIX}/new`
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          await warningModal('알림', error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        }
        if (error.response.status >= 500) {
          openInternalServerErrorNotification()
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}

export const getBestProducts = async (): Promise<ReadCacheProductListResponse> => {
  try {
    const { data } = await defaultAxiosInstance.get(
      `${PRODUCT_SERVICE_PREFIX}${PRODUCT_PREFIX}/best`
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          await warningModal('알림', error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        }
        if (error.response.status >= 500) {
          openInternalServerErrorNotification()
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}
