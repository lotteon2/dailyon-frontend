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
