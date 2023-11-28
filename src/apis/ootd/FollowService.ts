import { authAxiosInstance } from '@/apis/utils'
import { AxiosError, type AxiosResponse } from 'axios'
import type {
  FollowerPageResponse,
  FollowerResponse,
  FollowingPageResponse,
  FollowingResponse
} from '@/apis/ootd/FollowDto'

const SNS_SERVICE_PREFIX_PATH = '/sns-service'

export const getFollowers = async (page: number, size: number, sort: string): Promise<FollowerPageResponse<FollowerResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(`/follows/followers`, {
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

export const getFollowings = async (page: number, size: number, sort: string): Promise<FollowingPageResponse<FollowingResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(`/follows/followings`, {
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

export const toggleFollow = async (followingId: number): Promise<void> => {
  try {
    await authAxiosInstance.put(`/follows/${followingId}`)
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