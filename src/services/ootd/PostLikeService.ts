import { authAxiosInstance } from '@/apis/utils'
import type { PostPageResponse, PostResponse } from '@/services/ootd/PostDto'
import type { AxiosResponse } from 'axios'
import { AxiosError } from 'axios'

const SNS_SERVICE_PREFIX_PATH = '/sns-service'

export const togglePostLike = async (postId: number): Promise<void> => {
  try {
    await authAxiosInstance.put(`/posts/${postId}/likes`)
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