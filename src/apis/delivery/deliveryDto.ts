export interface CreateDeliveryDto {
  orderNo: string
  receiver: string
  postCode: string
  roadAddress: string
  detailAddress: string
  phoneNumber: string
}

export interface DeliveryResponse {
  receiver: string
  postCode: string
  roadAddress: string
  detailAddress: string
  phoneNumber: string | null
  status: string
}
