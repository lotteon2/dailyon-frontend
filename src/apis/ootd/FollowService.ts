import { authAxiosInstance } from '@/apis/utils'
import { AxiosError, type AxiosResponse } from 'axios'
import type {
  FollowerPageResponse,
  FollowerResponse,
  FollowingPageResponse,
  FollowingResponse
} from '@/apis/ootd/FollowDto'
import { openInternalServerErrorNotification } from '@/utils/Toast'
import { warningModal } from '@/utils/Modal'

const SNS_SERVICE_PREFIX_PATH = '/sns-service'

export const getFollowers = async (page: number, size: number, sort: string): Promise<FollowerPageResponse<FollowerResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(`${SNS_SERVICE_PREFIX_PATH}/follows/followers`, {
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

export const getFollowings = async (page: number, size: number, sort: string): Promise<FollowingPageResponse<FollowingResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(`${SNS_SERVICE_PREFIX_PATH}/follows/followings`, {
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

export const toggleFollow = async (followingIds: Array<number>): Promise<void> => {
  try {
    await authAxiosInstance.put(`${SNS_SERVICE_PREFIX_PATH}/follows`, null, {
      params: {
        followingIds: followingIds.join(',')
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