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
