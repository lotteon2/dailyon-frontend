import type { ReadProductResponse, ReadProductSliceResponse } from '@/apis/product/ProductDto'

/**
 혜택가 관련 계산입니다.
 */
export const getFloorDiscountPercentage = (product: ReadProductResponse) => {
  const { maxDiscountPercentageBeforeFlooring, maxDiscountPercentageAfterFlooring } =
    getProductMaxDiscountPercentage(product)
  return Math.floor(maxDiscountPercentageAfterFlooring)
}

export const getFinalPrice = (product: ReadProductResponse) => {
  const { maxDiscountPercentageBeforeFlooring, maxDiscountPercentageAfterFlooring } =
    getProductMaxDiscountPercentage(product)
  return Math.floor(product.price - (product.price * maxDiscountPercentageBeforeFlooring) / 100)
}

const getProductMaxDiscountPercentage = (product: ReadProductResponse) => {
  let maxDiscountPercentageBeforeFlooring = 0 // 가격을 따로 정확히 보여주기 위한 보존값
  let maxDiscountPercentageAfterFlooring = 0

  // product.coupons 없을시, for Each 발동안함. 0, 0 return
  if (!product.coupons) {
    return { maxDiscountPercentageBeforeFlooring, maxDiscountPercentageAfterFlooring }
  }
  product.coupons.forEach((coupon) => {
    if (product.price >= coupon.minPurchaseAmount) {
      // Listview에서는 일단 1개 구매를 기준으로 display
      // N개 이상 구매했을때를 가정한 최적 할인율과 해당 쿠폰 적용환경의 최소개수도 구할까 고민중임.
      let discountPercentage = 0

      if (coupon.discountType === 'PERCENTAGE') {
        discountPercentage = coupon.discountValue
      } else if (coupon.discountType === 'FIXED_AMOUNT') {
        discountPercentage = (coupon.discountValue / product.price) * 100
      }

      // 쿠폰별 maxDiscount cap 적용해서 갱신
      if (coupon.maxDiscountAmount !== null) {
        const maxDiscountValue = (coupon.maxDiscountAmount / product.price) * 100
        discountPercentage = Math.min(discountPercentage, maxDiscountValue)
      }

      // 직전 iteration과 비교 갱신
      maxDiscountPercentageBeforeFlooring = Math.max(
        // 가격을 따로 정확히 보여주기 위한 보존값
        maxDiscountPercentageBeforeFlooring,
        discountPercentage
      )
      maxDiscountPercentageAfterFlooring = Math.max(
        maxDiscountPercentageAfterFlooring,
        Math.floor(discountPercentage)
      )
    }
  })

  return { maxDiscountPercentageBeforeFlooring, maxDiscountPercentageAfterFlooring }
}
