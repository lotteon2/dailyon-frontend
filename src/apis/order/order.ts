import { authAxiosInstance } from '@/apis/utils'
import { AxiosError } from 'axios'
import type { OrderDetailResponse, OrderPageResponse, OrderResponse, OrderSheet } from './orderDto'

const ORDER_SERVICE_PREFIX_PATH = '/order-service'

export const order = async (orderSheet: OrderSheet): Promise<string> => {
  try {
    const { data } = await authAxiosInstance.post(`${ORDER_SERVICE_PREFIX_PATH}/orders`, orderSheet)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        } else if (error.response.status < 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}

export const getOrders = async (page: number): Promise<OrderPageResponse<OrderResponse>> => {
  try {
    const { data } = await authAxiosInstance.get(`${ORDER_SERVICE_PREFIX_PATH}/orders`, {
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
        } else if (error.response.status < 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}

export const getOrderDetails = async (orderNo: String): Promise<OrderDetailResponse[]> => {
  try {
    const { data } = await authAxiosInstance.get(`${ORDER_SERVICE_PREFIX_PATH}/orders/${orderNo}`)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        } else if (error.response.status < 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}
