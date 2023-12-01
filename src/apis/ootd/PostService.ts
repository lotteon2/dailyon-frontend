import { authAxiosInstance } from '@/apis/utils'
import type {
  OOTDPostPageResponse,
  OOTDPostResponse, PostCreateRequest, PostCreateResponse, PostImageProductDetailCreateRequest,
  PostLikePageResponse, PostLikeResponse,
  PostPageResponse,
  PostResponse
} from '@/apis/ootd/PostDto'
import type { AxiosResponse } from 'axios'
import { AxiosError } from 'axios'

const SNS_SERVICE_PREFIX_PATH = '/sns-service'

export const getPosts = async (page: number, size: number, sort: string): Promise<PostPageResponse<PostResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(`/posts`, {
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

export const getMyPosts = async (page: number, size: number, sort: string): Promise<OOTDPostPageResponse<OOTDPostResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(`/my-posts`, {
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

export const getMemberPosts = async (postMemberId: number, page: number, size: number, sort: string)
  : Promise<OOTDPostPageResponse<OOTDPostResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(`/member-posts`, {
      params: {
        postMemberId: postMemberId,
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

export const getPostLikes = async (page: number, size: number, sort: string): Promise<PostLikePageResponse<PostLikeResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(`/posts/likes`, {
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

export const createPost = async (postCreateRequest: PostCreateRequest<PostImageProductDetailCreateRequest>)
  : Promise<PostCreateResponse> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.post(`/posts`, postCreateRequest)
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