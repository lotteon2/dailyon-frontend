import type { AxiosResponse } from 'axios'
import { authAxiosInstance } from '@/apis/utils'
import type {
  ReadWishListPageResponse,
  ReadWishListsFromProduct,
  ToggleWishListRequest
} from '@/apis/wishcart/WishListDto'
import { AxiosError } from 'axios'
import { openInternalServerErrorNotification } from '@/utils/Toast'
import { warningModal } from '@/utils/Modal'

const WISH_CART_SERVICE_PREFIX: string = '/wish-cart-service'
const WISH_LIST_PREFIX: string = '/wish-list'

export const readWishListPage = async (
  targetId: number | null,
  page: number,
  size: number
): Promise<ReadWishListPageResponse> => {
  try {
    const { data } = await authAxiosInstance.get(`${WISH_CART_SERVICE_PREFIX}${WISH_LIST_PREFIX}`, {
      params: { page: page, size: size },
      headers: { targetId: targetId }
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

export const readWishListFromProduct = async (
  productId: number
): Promise<ReadWishListsFromProduct> => {
  try {
    const { data } = await authAxiosInstance.get(
      `${WISH_CART_SERVICE_PREFIX}${WISH_LIST_PREFIX}/${productId}`
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

export const toggleWishList = async (request: ToggleWishListRequest): Promise<AxiosResponse> => {
  return authAxiosInstance.put(`${WISH_CART_SERVICE_PREFIX}${WISH_LIST_PREFIX}`, request)
}
