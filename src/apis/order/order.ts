import { authAxiosInstance } from '@/apis/utils'
import { AxiosError } from 'axios'
import type {
  OrderDetailResponse,
  OrderPageResponse,
  OrderResponse,
  OrderSheet,
  GiftInfo,
  GiftResponse,
  GiftPageResponse
} from './orderDto'
import { openInternalServerErrorNotification } from '@/utils/Toast'
import { warningModal } from '@/utils/Modal'

const ORDER_SERVICE_PREFIX_PATH = '/order-service'

export const getReceiverGifts = async (page: number): Promise<GiftPageResponse<GiftResponse>> => {
  try {
    const { data } = await authAxiosInstance.get(`${ORDER_SERVICE_PREFIX_PATH}/gifts/receiver`, {
      params: {
        page: page
      }
    })
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

export const getSenderGifts = async (page: number): Promise<GiftPageResponse<GiftResponse>> => {
  try {
    const { data } = await authAxiosInstance.get(`${ORDER_SERVICE_PREFIX_PATH}/gifts/sender`, {
      params: {
        page: page
      }
    })
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

export const order = async (orderSheet: OrderSheet): Promise<string> => {
  try {
    const { data } = await authAxiosInstance.post(`${ORDER_SERVICE_PREFIX_PATH}/orders`, orderSheet)
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

export const getOrderDetails = async (orderNo: String): Promise<OrderDetailResponse[]> => {
  try {
    const { data } = await authAxiosInstance.get(`${ORDER_SERVICE_PREFIX_PATH}/orders/${orderNo}`)
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

export const cancelOrderDetail = async (orderDetailNo: String) => {
  try {
    const response = await authAxiosInstance.delete(
      `${ORDER_SERVICE_PREFIX_PATH}/orders/order-details/${orderDetailNo}`
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          await warningModal('알림', error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        } else if (error.response.status < 500) {
          openInternalServerErrorNotification()
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}

export const gifts = async (giftInfo: GiftInfo): Promise<string> => {
  try {
    const { data } = await authAxiosInstance.post(`${ORDER_SERVICE_PREFIX_PATH}/gifts`, giftInfo)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          await warningModal('알림', error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        } else if (error.response.status < 500) {
          openInternalServerErrorNotification()
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}
