import { authAxiosInstance } from '@/apis/utils'
import { AxiosError } from 'axios'
import type { CreateDeliveryDto } from './deliveryDto'

const ORDER_SERVICE_PREFIX_PATH = '/order-service'

export const createDelivery = async (deliveryDto: CreateDeliveryDto): Promise<void> => {
  try {
    const { data } = await authAxiosInstance.post(
      `${ORDER_SERVICE_PREFIX_PATH}/gifts/accept`,
      deliveryDto
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        }
        if (error.response.status >= 500) {
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}
