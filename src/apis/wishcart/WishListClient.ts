import type { AxiosResponse } from 'axios'
import { authAxiosInstance } from '@/apis/utils'
import type { ToggleWishListRequest } from '@/apis/wishcart/WishListDto'

const WISH_CART_SERVICE_PREFIX: string = '/wish-cart-service'
const WISH_LIST_PREFIX: string = '/wish-list'

export const readWishListPage = async (
  targetId: number | null,
  page: number,
  size: number
): Promise<AxiosResponse> => {
  return authAxiosInstance.get(`${WISH_CART_SERVICE_PREFIX}${WISH_LIST_PREFIX}`, {
    params: { page: page, size: size },
    headers: { targetId: targetId }
  })
}

export const readWishListFromProduct = async (
  memberId: number,
  productId: number
): Promise<AxiosResponse> => {
  return authAxiosInstance.get(`${WISH_CART_SERVICE_PREFIX}${WISH_LIST_PREFIX}/${productId}`)
}

export const toggleWishList = async (request: ToggleWishListRequest): Promise<AxiosResponse> => {
  return authAxiosInstance.put(`${WISH_CART_SERVICE_PREFIX}${WISH_LIST_PREFIX}`, request)
}
