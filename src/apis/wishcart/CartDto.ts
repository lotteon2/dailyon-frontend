export interface ReadCartPageResponse {
  totalElements: number
  totalPages: number
  responses: Array<ReadCartResponse>
}

export interface ReadCartResponse {
  productId: number
  productSizeId: number
  quantity: number
  lastMemberCode: string
  productSizeName: string
  productName: string
  brandName: string
  gender: 'MALE' | 'FEMALE' | 'COMMON'
  productQuantity: number
  productPrice: number
  imgUrl: string
}

export interface CreateCartRequest {
  productId: number
  productSizeId: number
  quantity: number
  lastMemberCode: string | null
}

export interface UpdateCartRequest {
  productId: number
  productSizeId: number
  quantity: number
}

export interface DeleteCartListRequest {
  requests: Array<DeleteCartRequest>
}

export interface DeleteCartRequest {
  productId: number
  productSizeId: number
}
