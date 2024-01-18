import axios, { AxiosError } from 'axios'
import { authAxiosInstance, defaultAxiosInstance } from '@/apis/utils/index'
import type {
  CouponInfoItemWithAvailabilityResponse,
  ProductCategoryPair,
  CheckoutCouponApplicationResponse,
  CouponInfoItemResponse,
  MultipleCouponDownloadResponse,
  MultipleProductsCouponRequest,
  MultipleProductCouponsResponse
} from '@/apis/coupon/CouponItemDto'
import { openInternalServerErrorNotification } from '@/utils/Toast'
import { warningModal } from '@/utils/Modal'

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

export const downloadCoupon = async (couponInfoId: number): Promise<string> => {
  try {
    let url = `${PROMOTION_PREFIX_PATH}${COUPON_DOMAIN_PREFIX_PATH}/${couponInfoId}/download`
    const response = await authAxiosInstance.post(url)
    return response.data
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

export const downloadMultipleCoupons = async (
  couponInfoIds: number[]
): Promise<MultipleCouponDownloadResponse> => {
  try {
    const response = await authAxiosInstance.post<MultipleCouponDownloadResponse>(
      `${PROMOTION_PREFIX_PATH}${COUPON_DOMAIN_PREFIX_PATH}/download-multiple`,
      couponInfoIds
    )
    return response.data
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

export const getMyCoupons = async (page: Number) => {
  try {
    const response = await authAxiosInstance.get(
      `${PROMOTION_PREFIX_PATH}${COUPON_DOMAIN_PREFIX_PATH}/my-coupons`,
      {
        params: {
          page: page,
          size: 10
        }
      }
    )
    return response.data
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

export const getMultipleProductsCoupons = async (
  requestPayload: MultipleProductsCouponRequest
): Promise<MultipleProductCouponsResponse> => {
  try {
    const response = await defaultAxiosInstance.post(
      `${PROMOTION_PREFIX_PATH}${COUPON_DOMAIN_PREFIX_PATH}/multiple-products`,
      requestPayload
    )
    return response.data
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
