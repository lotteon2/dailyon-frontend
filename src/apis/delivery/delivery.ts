import { authAxiosInstance } from '@/apis/utils'
import { AxiosError } from 'axios'
import type { CreateDeliveryDto } from './deliveryDto'
import { openInternalServerErrorNotification } from '@/utils/Toast'
import { warningModal } from '@/utils/Modal'

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
          await warningModal('알림', error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        }
        if (error.response.status >= 500) {
          openInternalServerErrorNotification()
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}
