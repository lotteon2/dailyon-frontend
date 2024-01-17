import { authAxiosInstance } from '@/apis/utils'
import { AxiosError } from 'axios'
import { openInternalServerErrorNotification } from '@/utils/Toast'
import { warningModal } from '@/utils/Modal'

const SNS_SERVICE_PREFIX_PATH = '/sns-service'

export const togglePostLike = async (postIds: Array<number>): Promise<void> => {
  try {
    await authAxiosInstance.put(`${SNS_SERVICE_PREFIX_PATH}/posts/likes`, null, {
      params: {
        postIds: postIds.join(',')
      }
    })
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