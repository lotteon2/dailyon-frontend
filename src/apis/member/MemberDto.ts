export interface MemberInfoDto {
    birth : string
    gender : string
    nickname : string

  }
  
  export interface PaymentResponse {
    status: string
    method: string
    totalAmount: number
    createdAt: string
  }
  
  export interface PaymentPageResponse<T extends PaymentResponse> {
    payments: Array<T>
    totalPages: number
    totalElements: number
  }
  