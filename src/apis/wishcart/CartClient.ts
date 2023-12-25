import type { AxiosResponse } from 'axios'
import { authAxiosInstance } from '@/apis/utils'
import type {
  CreateCartRequest,
  DeleteCartListRequest,
  UpdateCartRequest
} from '@/apis/wishcart/CartDto'

const WISH_CART_SERVICE_PREFIX: string = '/wish-cart-service'
const CART_PREFIX: string = '/cart'

export const readCart = async (page: number): Promise<AxiosResponse> => {
  return await authAxiosInstance.get(`${WISH_CART_SERVICE_PREFIX}${CART_PREFIX}`, {
    params: { page: page }
  })
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
