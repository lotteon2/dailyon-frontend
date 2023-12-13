import { authAxiosInstance } from '@/apis/utils'
import { AxiosError } from 'axios'
import type { OrderPageResponse, OrderResponse } from './orderDto'

const ORDER_SERVICE_PREFIX_PATH = '/order-service'

export const getOrders = async (page: number): Promise<OrderPageResponse<OrderResponse>> => {
  try {
    const { data } = await authAxiosInstance.get(`/orders`, {
      params: {
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
