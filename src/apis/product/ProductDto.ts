export interface ReadProductSliceResponse {
  hasNext: boolean
  productResponses: ReadProductResponse[]
}

export interface ExtendedReadProductResponse extends ReadProductResponse {
  categoryId: number
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
  createdAt: string
  coupons?: CouponInfoItemResponse[]
}

export interface CouponInfoItemResponse {
  couponInfoId: number
  appliesToType: string
  appliedToId: number
  discountType: string
  discountValue: number
  minPurchaseAmount: number // 0이상 number minPurchaseAmount 이상 구매해야 쿠폰 적용가능
  maxDiscountAmount: number | null // null이면 maxDiscountAmount 한계가 없다는 뜻
}

export interface ReadProductDetailResponse {
  categoryId: number
  brandId: number
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
  categoryId: Number | null
  sizeId: Number
  sizeName: String
  orderPrice: number
  quantity: number
  couponInfoId: number | null
  discountAmount: number | null
}

export interface ReadCacheProductListResponse {
  responses: ReadCacheProductResponse[]
}

export interface ExtendedReadCacheProductResponse extends ReadCacheProductResponse {
  avgRating: number
  reviewCount: number
  coupons: CouponInfoItemResponse[]
}

export interface ReadCacheProductResponse {
  id: number
  brandName: string
  categoryId: number
  categoryName: string
  price: number
  name: string
  code: string
  imgUrl: string
}
