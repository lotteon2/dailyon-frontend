import { defaultAxiosInstance } from '@/apis/utils'
import type {
  ReadBreadCrumbResponse,
  ReadChildrenCategoryResponse
} from '@/apis/category/CategoryDto'
import { AxiosError } from 'axios'
import { warningModal } from '@/utils/Modal'
import { openInternalServerErrorNotification } from '@/utils/Toast'

const PRODUCT_SERVICE_PREFIX: string = '/product-service'
const CATEGORY_PREFIX: string = '/categories'

export const getChildCategories = async (
  id: number | null
): Promise<ReadChildrenCategoryResponse> => {
  try {
    const { data } = await defaultAxiosInstance.get(
      `${PRODUCT_SERVICE_PREFIX}${CATEGORY_PREFIX}/master`,
      {
        params: { id: id }
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

export const getBreadCrumbs = async (
  categoryId: number | null
): Promise<ReadBreadCrumbResponse | null> => {
  try {
    if (categoryId !== null) {
      const { data } = await defaultAxiosInstance.get(
        `${PRODUCT_SERVICE_PREFIX}${CATEGORY_PREFIX}/breadcrumb/${categoryId}`
      )
      return data
    }
    return null
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
