import type { AxiosResponse } from 'axios'
import { defaultAxiosInstance } from '@/apis/utils'

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

export const getProductDetail = async (productId: number): Promise<AxiosResponse> => {
  return await defaultAxiosInstance.get(
    `${PRODUCT_SERVICE_PREFIX}${PRODUCT_PREFIX}/id/${productId}`
  )
}
