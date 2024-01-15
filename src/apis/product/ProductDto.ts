export interface ReadProductSliceResponse {
  hasNext: boolean
  productResponses: ReadProductResponse[]
}

export interface ReadProductResponse {
  id: number
  brandName: string
  categoryName: string
  name: string
  code: string
  price: number
  imgUrl: string
  avgRating: number
  reviewCount: number
  coupons: CouponInfoItemResponse[]
}

export interface CouponInfoItemResponse {
  couponInfoId: number
  appliesToType: string
  appliedToId: number
  discountType: string
  discountValue: number
  maxPurchaseAmount: number | null
  minPurchaseAmount: number
}

export interface ReadProductDetailResponse {
  categoryId: number
  brandName: string
  name: string
  imgUrl: string
  price: number
  gender: string
  avgRating: number
  reviewCount: number
  productStocks: ReadProductStockResponse[]
  describeImgUrls: String[]
}

export interface ReadProductStockResponse {
  productSizeId: number
  productSizeName: string
  quantity: number
}

export interface ProductInfo {
  productId: Number
  productName: String
  imgUrl: String
  categoryId: Number
  sizeId: Number
  sizeName: String
  orderPrice: number
  quantity: number
  couponInfoId: number | null
  discountAmount: number | null
}
