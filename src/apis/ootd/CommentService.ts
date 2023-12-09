import { AxiosError, type AxiosResponse } from 'axios'
import { authAxiosInstance } from '@/apis/utils'
import type {
  CommentPageResponse,
  CommentResponse,
  CreateCommentRequest,
  CreateReplyCommentRequest
} from '@/apis/ootd/CommentDto'

const SNS_SERVICE_PREFIX_PATH = '/sns-service'

export const getComments = async (postId: number, page: number, size: number, sort: string)
  : Promise<CommentPageResponse<CommentResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(`${SNS_SERVICE_PREFIX_PATH}/posts/${postId}/comments`, {
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

export const createComment = async (postId: number, createCommentRequest: CreateCommentRequest)
  : Promise<void> => {
  try {
    await authAxiosInstance.post(`${SNS_SERVICE_PREFIX_PATH}/posts/${postId}/comments`, createCommentRequest)
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

export const createReplyComment = async (postId: number, commentId: number, createReplyCommentRequest: CreateReplyCommentRequest)
  : Promise<void> => {
  try {
    await authAxiosInstance.post(`${SNS_SERVICE_PREFIX_PATH}/posts/${postId}/comments/${commentId}`, createReplyCommentRequest)
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

export const deleteComment = async (postId: number, commentId: number)
  : Promise<void> => {
  try {
    await authAxiosInstance.delete(`${SNS_SERVICE_PREFIX_PATH}/posts/${postId}/comments/${commentId}`)
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