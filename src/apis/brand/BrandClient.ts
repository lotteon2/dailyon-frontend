import type { ReadBrandListResponse } from '@/apis/brand/BrandDto'
import { AxiosError } from 'axios'
import { warningModal } from '@/utils/Modal'
import { openInternalServerErrorNotification } from '@/utils/Toast'
import { defaultAxiosInstance } from '@/apis/utils'

const PRODUCT_SERVICE_PREFIX: string = '/product-service'
const BRAND_PREFIX: string = '/brands'

export const getBrands = async (): Promise<ReadBrandListResponse> => {
  try {
    const { data } = await defaultAxiosInstance.get(`${PRODUCT_SERVICE_PREFIX}${BRAND_PREFIX}`)
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
