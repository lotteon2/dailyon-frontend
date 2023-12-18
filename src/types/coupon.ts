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
