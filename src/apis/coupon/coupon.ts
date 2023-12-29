import axios, { AxiosError } from 'axios'
import { authAxiosInstance } from '@/apis/utils/index'
import type {
  CouponInfoItemWithAvailabilityResponse,
  ProductCategoryPair,
  CheckoutCouponApplicationResponse,
  CouponInfoItemResponse
} from '@/apis/coupon/CouponItemDto'

const PROMOTION_PREFIX_PATH = '/promotion-service'
const COUPON_DOMAIN_PREFIX_PATH = '/coupons'

export const getCouponsWithAvailibilityForProductDetail = async (
  productId: number,
  categoryId: number
): Promise<CouponInfoItemWithAvailabilityResponse[]> => {
  try {
    const response = await authAxiosInstance.get(
      `${PROMOTION_PREFIX_PATH}${COUPON_DOMAIN_PREFIX_PATH}/single-product/with-availability`,
      {
        params: {
          productId,
          categoryId
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching coupons:', error)
    throw error
  }
}

export const downloadCoupon = async (couponInfoId: number): Promise<string> => {
  try {
    let url = `${PROMOTION_PREFIX_PATH}${COUPON_DOMAIN_PREFIX_PATH}/${couponInfoId}/download`
    const response = await authAxiosInstance.post(url)
    alert('쿠폰을 다운로드 했습니다.')
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          alert('쿠폰을 다운로드 하지 못했습니다.' + error.response.data.message)
          // alert(error.response.data.message)
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

export const getCouponsForCheckout = async (
  productCategoryPairs: ProductCategoryPair[]
): Promise<CheckoutCouponApplicationResponse> => {
  try {
    const response = await authAxiosInstance.post(
      `${PROMOTION_PREFIX_PATH}${COUPON_DOMAIN_PREFIX_PATH}/retrieve-applicable`,
      { products: productCategoryPairs }
    )
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          alert('적용가능한 쿠폰을 가져오지 못했습니다.' + error.response.data.message)
          // alert(error.response.data.message)
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
