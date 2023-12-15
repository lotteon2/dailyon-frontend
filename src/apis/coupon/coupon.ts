import axios, { AxiosError } from 'axios'
import { authAxiosInstance } from '@/apis/utils/index'
import type { CouponInfoItemWithAvailabilityResponse } from '@/apis/coupon/CouponItemDto'

const PROMOTION_PREFIX_PATH = '/promotion-service'
const COUPON_DOMAIN_PREFIX_PATH = '/coupons'

export const getCouponsWithAvailibilityForProductDetail = async (
  productId: number,
  categoryId: number
): Promise<CouponInfoItemWithAvailabilityResponse[]> => {
  try {
    const response = await authAxiosInstance.post(
      `${PROMOTION_PREFIX_PATH}${COUPON_DOMAIN_PREFIX_PATH}/single-product/with-availability`,
      null,
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
    const response = await authAxiosInstance.post(
      `${PROMOTION_PREFIX_PATH}${COUPON_DOMAIN_PREFIX_PATH}/${couponInfoId}/download`
    )
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          alert('쿠폰을 다운로드 하지 못했습니다.' + error.response.data.message)
          // alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        }
        if (error.response.status < 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}
