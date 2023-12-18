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
