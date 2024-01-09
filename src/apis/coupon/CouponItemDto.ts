export interface CouponInfoItemWithAvailabilityResponse extends CouponInfoItemResponse {
  isDownloadable: boolean
}

export interface CouponInfoItemResponse {
  couponInfoId: number

  appliesToType: string
  appliedToId: number

  discountType: `PERCENTAGE` | `FIXED_AMOUNT`
  discountValue: number

  endAt: string

  minPurchaseAmount?: number
  maxDiscountAmount?: number
}

export interface CheckoutCouponApplicationResponse {
  nestedCouponInfoItemResponses: CouponInfoItemCheckoutResponse[][]
}

export interface ProductCategoryPair {
  productId: number
  categoryId: number
}

export interface MultipleCouponDownloadResponse {
  successfulIds: number[]
  failedIds: number[]
}

export interface CouponInfoItemCheckoutResponse {
  couponInfoId: number
  couponInfoName: string

  appliesToType: string
  appliedToId: number

  discountType: `PERCENTAGE` | `FIXED_AMOUNT`
  discountValue: number

  endAt: string

  minPurchaseAmount?: number
  maxDiscountAmount?: number
}

export interface Coupon {
  id: number
  name: string
  discountType: string
  discountValue: number
  startAt: string
  targetImgUrl: string
  appliesToName: string
  endAt: string
}

export interface Coupons {
  memberId: number
  memberCouponInfoReadItemResponse: Coupon[]
  totalCounts: number
}
