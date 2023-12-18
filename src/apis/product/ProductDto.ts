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
