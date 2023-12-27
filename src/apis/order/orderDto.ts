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

export interface OrderSheet {
  usedPoints: Number | null
  type: String
  deliveryFee: Number | null
  totalCouponDiscountPrice: Number | null
  orderItems: OrderItem[]
  deliveryInfo: DeliveryInfo
  paymentType: String
}

export interface OrderItem {
  productId: Number
  categoryId: Number
  sizeId: Number
  orderPrice: Number
  quantity: Number
  couponInfoId: Number | null
  referralCode: String | null
}

export interface DeliveryInfo {
  receiver: string
  postCode: string
  roadAddress: string
  detailAddress: string
  phoneNumber: string | null
}
