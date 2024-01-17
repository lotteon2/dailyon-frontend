import { authAxiosInstance, defaultAxiosInstance } from '@/apis/utils'
import type {
  OOTDPostPageResponse,
  OOTDPostResponse,
  PostCreateRequest,
  PostCreateResponse,
  PostDetailResponse,
  PostImageProductDetailCreateRequest,
  PostLikePageResponse,
  PostLikeResponse,
  PostPageResponse,
  PostResponse,
  PostUpdateRequest,
  PostUpdateResponse,
  TOP4OOTDResponse
} from '@/apis/ootd/PostDto'
import type { AxiosResponse } from 'axios'
import { AxiosError } from 'axios'
import { openInternalServerErrorNotification } from '@/utils/Toast'
import { warningModal } from '@/utils/Modal'

const SNS_SERVICE_PREFIX_PATH = '/sns-service'

export const getPosts = async (
  page: number,
  size: number,
  sort: string
): Promise<PostPageResponse<PostResponse>> => {
  try {
    const response: AxiosResponse = await defaultAxiosInstance.get(
      `${SNS_SERVICE_PREFIX_PATH}/posts`,
      {
        params: {
          page: page,
          size: size,
          sort: sort
        }
      }
    )
    return response.data
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

export const getMyPosts = async (
  page: number,
  size: number,
  sort: string
): Promise<OOTDPostPageResponse<OOTDPostResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(
      `${SNS_SERVICE_PREFIX_PATH}/my-posts`,
      {
        params: {
          page: page,
          size: size,
          sort: sort
        }
      }
    )
    return response.data
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

export const getMemberPosts = async (
  postMemberId: number,
  page: number,
  size: number,
  sort: string
): Promise<OOTDPostPageResponse<OOTDPostResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(
      `${SNS_SERVICE_PREFIX_PATH}/member-posts`,
      {
        params: {
          postMemberId: postMemberId,
          page: page,
          size: size,
          sort: sort
        }
      }
    )
    return response.data
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

export const getPostLikes = async (
  page: number,
  size: number,
  sort: string
): Promise<PostLikePageResponse<PostLikeResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(
      `${SNS_SERVICE_PREFIX_PATH}/posts/likes`,
      {
        params: {
          page: page,
          size: size,
          sort: sort
        }
      }
    )
    return response.data
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

export const createPost = async (
  postCreateRequest: PostCreateRequest<PostImageProductDetailCreateRequest>
): Promise<PostCreateResponse> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.post(
      `${SNS_SERVICE_PREFIX_PATH}/posts`,
      postCreateRequest
    )
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          await warningModal('알림', error.response.data.message)
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

export const updatePost = async (
  postId: number,
  postUpdateRequest: PostUpdateRequest
): Promise<PostUpdateResponse> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.put(
      `${SNS_SERVICE_PREFIX_PATH}/posts/${postId}`,
      postUpdateRequest
    )
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          await warningModal('알림', error.response.data.message)
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

export const deletePost = async (postId: number): Promise<void> => {
  try {
    await authAxiosInstance.delete(`${SNS_SERVICE_PREFIX_PATH}/posts/${postId}`)
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          await warningModal('알림', error.response.data.message)
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

export const getPostDetail = async (postId: number): Promise<PostDetailResponse> => {
  try {
    const response: AxiosResponse = await defaultAxiosInstance.get(
      `${SNS_SERVICE_PREFIX_PATH}/posts/${postId}`
    )
    return response.data.post
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          await warningModal('알림', error.response.data.message)
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

export const addViewCount = async (postId: number): Promise<void> => {
  try {
    await defaultAxiosInstance.put(`${SNS_SERVICE_PREFIX_PATH}/posts/${postId}/view-count`)
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          await warningModal('알림', error.response.data.message)
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

export const getTOP4OOTD = async (productId: number): Promise<Array<TOP4OOTDResponse>> => {
  try {
    const response: AxiosResponse = await defaultAxiosInstance.get(
      `${SNS_SERVICE_PREFIX_PATH}/top4-posts`,
      {
        params: { productId: productId }
      }
    )
    return response.data.posts
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          await warningModal('알림', error.response.data.message)
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
