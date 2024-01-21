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
  orderDetailNo: string
  productId: number
  productSize: string
  productName: string
  productQuantity: number
  thumbnail: string
  orderPrice: number
  couponName: string | undefined | null
  couponDiscountPrice: number | undefined | null
  status: string
  reviewCheck: boolean
}

export interface OrderSheet {
  receiverId: number | null
  receiverName: string | null
  senderName: string | null
  usedPoints: Number | null
  type: String
  deliveryFee: Number | null
  totalCouponDiscountPrice: Number | null
  orderItems: OrderItem[]
  deliveryInfo: DeliveryInfo | null
  paymentType: String
  referralCode: String | null
  auctionId: String | null
}

export interface OrderItem {
  productId: Number
  categoryId: Number
  sizeId: Number
  orderPrice: Number
  quantity: Number
  couponInfoId: Number | null
}

export interface DeliveryInfo {
  receiver: string
  postCode: string
  roadAddress: string
  detailAddress: string
  phoneNumber: string | null
}

export interface GiftInfo {
  receiverId: number
  receiverName: string
  senderName: string
}

export interface GiftResponse {
  orderNo: string
  senderName: string
  receiverName: string
  status: string
  productName: string
  imgUrl: string
}

export interface GiftPageResponse<T extends GiftResponse> {
  gifts: Array<T>
  totalPages: number
  totalElements: number
}
