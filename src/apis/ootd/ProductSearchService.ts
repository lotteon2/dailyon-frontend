import type { ProductSearchPageResponse, ProductSearchResponse } from '@/apis/ootd/PostDto'
import { AxiosError, type AxiosResponse } from 'axios'
import { authAxiosInstance } from '@/apis/utils'

export const searchProductFromOOTD = async (lastId: number, query: string)
  : Promise<ProductSearchPageResponse<ProductSearchResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(`/products/search/ootd`, {
      params: {
        lastId: lastId,
        query: query
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