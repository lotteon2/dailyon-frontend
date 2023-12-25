import { AxiosError } from 'axios'
import { defaultAxiosInstance, authAxiosInstance } from '@/apis/utils'
import type { ReviewPageResponse, ReviewResponse } from './reviewDto'
const REVIEW_SERVICE_PREFIX: string = '/reivew-service'

export const getProductReviews = async (
  pageRequest: any,
  productId: Number
): Promise<ReviewPageResponse<ReviewResponse>> => {
  try {
    const { data } = await defaultAxiosInstance.get(
      `${REVIEW_SERVICE_PREFIX}/reviews/${productId}`,
      {
        params: pageRequest
      }
    )
    return data
  } catch (error) {
    console.log(error)
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
