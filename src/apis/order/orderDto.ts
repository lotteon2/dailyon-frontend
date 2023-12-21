export interface OrderResponse {
  orderNo: string
  productsName: string
  totalAmount: number
  status: string
  createdAt: string
}

export interface OrderPageResponse<T extends OrderResponse> {
  orders: Array<T>
  totalPages: number
  totalElements: number
}

export interface OrderDetailResponse {
  id: number
  orderNo: string
  productName: string
  productQuantity: number
  thumbnail: string
  orderPrice: number
  couponName: string | undefined | null
  couponDiscountPrice: number | undefined | null
  status: string
}
