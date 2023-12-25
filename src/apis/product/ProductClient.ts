import type { AxiosResponse } from 'axios'
import { AxiosError } from 'axios'
import { defaultAxiosInstance } from '@/apis/utils'
import type { ReadProductDetailResponse } from './ProductDto'

const PRODUCT_SERVICE_PREFIX: string = '/product-service'
const PRODUCT_PREFIX: string = '/products'

export const getProductSlice = async (
  lastId: number,
  brandId: number | null,
  categoryId: number | null,
  gender: string | null,
  type: string | null
): Promise<AxiosResponse> => {
  const params: any = { lastId: lastId }
  if (brandId !== null) params.brandId = brandId
  if (categoryId !== null) params.categoryId = categoryId
  if (gender !== null) params.gender = gender
  if (type !== null) params.type = type
  return await defaultAxiosInstance.get(`${PRODUCT_SERVICE_PREFIX}${PRODUCT_PREFIX}`, {
    params: params
  })
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
