import { authAxiosInstance } from '@/apis/utils'
import { AxiosError } from 'axios'
import type { PointPaymentDto, PaymentPageResponse, PaymentResponse } from './paymentDto'

const PAYMENT_SERVICE_PREFIX_PATH = '/payment-service'

export const pointPaymentReady = async (pointPaymentDto: PointPaymentDto): Promise<string> => {
  try {
    const { data } = await authAxiosInstance.post(`/payments/ready`, pointPaymentDto)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        }
        if (error.response.status < 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}

export const getPointPayments = async (
  paymentId: number | null,
  page: number
): Promise<PaymentPageResponse<PaymentResponse>> => {
  try {
    const { data } = await authAxiosInstance.get(`/payments`, {
      params: {
        paymentId: paymentId,
        page: page
      }
    })
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        }
        if (error.response.status < 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}
