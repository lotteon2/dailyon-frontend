import type { PostPageResponse, PostResponse } from '@/apis/ootd/PostDto'
import { AxiosError, type AxiosResponse } from 'axios'
import { authAxiosInstance } from '@/apis/utils'
import type { CommentPageResponse, CommentResponse } from '@/apis/ootd/CommentDto'

const SNS_SERVICE_PREFIX_PATH = '/sns-service'

export const getComments = async (postId: number, page: number, size: number, sort: string)
  : Promise<CommentPageResponse<CommentResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(`/posts/${postId}/comments`, {
      params: {
        page: page,
        size: size,
        sort: sort
      }
    })
    return response.data
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