import { AxiosError, type AxiosResponse } from 'axios'
import { authAxiosInstance } from '@/apis/utils'
import type { OOTDMemberProfileResponse, OOTDMemberProfileResponseWrapper } from '@/apis/ootd/MemberDto'

const SNS_SERVICE_PREFIX_PATH = '/sns-service'

export const getOOTDMemberProfile = async (ootdMemberId: number)
  : Promise<OOTDMemberProfileResponseWrapper<OOTDMemberProfileResponse>> => {
  try {
    const response: AxiosResponse = await authAxiosInstance.get(`${SNS_SERVICE_PREFIX_PATH}/members/${ootdMemberId}`)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          alert(error.response.data.message)
          console.error(`Client Error=${error.response.data.message}`)
        }
        if (error.response.status >= 500) {
          alert('서버 내부 오류')
          console.error('Internal Server Error')
        }
      }
    }
    throw error
  }
}