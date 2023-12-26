export interface ToggleWishListRequest {
  productId: number
  productSizeId: number
}

export interface ReadWishListPageResponse {
  isMine: boolean
  totalElements: number
  totalPages: number
  responses: Array<ReadWishListResponse>
}

export interface ReadWishListResponse {
  productId: number
  productSizeId: number
  productName: string
  productSizeName: string
  brandName: string
  gender: 'MALE' | 'FEMALE' | 'COMMON'
  imgUrl: string
  productPrice: number
}
