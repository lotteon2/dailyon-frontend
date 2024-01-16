import type { AxiosResponse } from 'axios'
import { authAxiosInstance } from '@/apis/utils'
import type {
  CreateCartRequest,
  DeleteCartListRequest,
  ReadCartPageResponse,
  UpdateCartRequest
} from '@/apis/wishcart/CartDto'
import { AxiosError } from 'axios'
import { warningModal } from '@/utils/Modal'
import { openInternalServerErrorNotification } from '@/utils/Toast'

const WISH_CART_SERVICE_PREFIX: string = '/wish-cart-service'
const CART_PREFIX: string = '/cart'

export const readCart = async (page: number, size: number): Promise<ReadCartPageResponse> => {
  try {
    const { data } = await authAxiosInstance.get(`${WISH_CART_SERVICE_PREFIX}${CART_PREFIX}`, {
      params: { page: page, size: size }
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

export const upsertCart = async (data: CreateCartRequest): Promise<AxiosResponse> => {
  return await authAxiosInstance.post(`${WISH_CART_SERVICE_PREFIX}${CART_PREFIX}`, data)
}

export const updateCart = async (data: UpdateCartRequest): Promise<AxiosResponse> => {
  return await authAxiosInstance.put(`${WISH_CART_SERVICE_PREFIX}${CART_PREFIX}`, data)
}

export const deleteCart = async (data: DeleteCartListRequest): Promise<AxiosResponse> => {
  return await authAxiosInstance.delete(`${WISH_CART_SERVICE_PREFIX}${CART_PREFIX}`, {
    data: data
  })
}
