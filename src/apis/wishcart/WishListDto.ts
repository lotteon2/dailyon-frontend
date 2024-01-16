export interface ToggleWishListRequest {
  productId: number
  productSizeId: number
}

export interface ReadWishListPageResponse {
  mine: boolean
  totalElements: number
  totalPages: number
  responses: ReadWishListResponse[]
}

export interface ReadWishListResponse {
  productId: number
  productSizeId: number
  categoryId: number
  productName: string
  productSizeName: string
  brandName: string
  gender: 'MALE' | 'FEMALE' | 'COMMON'
  imgUrl: string
  productPrice: number
}

export interface ReadWishListsFromProduct {
  responses: Array<ReadWishListFromProduct>
}

export interface ReadWishListFromProduct {
  productId: number
  productSizeId: number
}
