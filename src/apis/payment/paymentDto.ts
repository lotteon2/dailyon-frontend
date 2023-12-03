export interface PointPaymentDto {
  method: string
  totalAmount: number
}

export interface PaymentResponse {
  status: string
  method: string
  totalAmount: number
  createdAt: string
}

export interface PaymentPageResponse<T extends PaymentResponse> {
  payments: Array<T>
  hasNext: boolean
}
