import type { ProductInfo } from '@/apis/product/ProductDto'
import type { CouponInfoItemCheckoutResponse } from "@/apis/coupon/CouponItemDto"

export interface OrderItemDto {
  productName: string
  imgUrl: string

  productId: number
  categoryId: number

  originalPrice: number
  count: number // quantity?
}

export interface OrderItemWithCouponInfoIdDto {
  productId: number
  categoryId: number
  couponInfoId: number | null
}


export interface OrderItemWithCouponInfoDto extends ProductInfo {
  // couponInfoId: number // ProductInfo에도 존재. 중복된 필드명 있어서 아래처럼 타이핑
  couponInfoName: string | null

  appliesToType: string | null
  appliedToId: number | null

  discountType: `PERCENTAGE` | `FIXED_AMOUNT` | null
  discountValue: number | null

  endAt: string | null

  minPurchaseAmount?: number | null
  maxDiscountAmount?: number | null
}

