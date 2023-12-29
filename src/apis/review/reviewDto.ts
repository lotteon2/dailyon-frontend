export interface ReviewResponse {
  id: number
  productId: number
  productSize: string
  description: string
  rating: number
  imgUrl: string | null
  nickname: string
  profileImgUrl: string
  isWrittenByMe: boolean
}

export interface ReviewPageResponse<T extends ReviewResponse> {
  reviews: Array<T>
  totalPages: number
  totalElements: number
}

export interface ReviewCreateRequest {
  productId: number
  orderDetailNo: string
  description: string
  productSize: string
  imgUrl: string | null
  nickname: string | null
  rating: number
  profileImgUrl: string | null
}
