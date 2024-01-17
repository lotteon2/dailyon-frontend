import { authAxiosInstance } from '@/apis/utils'
import { useMemberStore } from '@/stores/member/MemberStore'
import { AxiosError } from 'axios'
import { openInternalServerErrorNotification } from '@/utils/Toast'
import { warningModal } from '@/utils/Modal'

const MEMBER_SERVICE_PREFIX: string = '/member-service'
const memberStore = useMemberStore()


export const getMember = async () => {
  try {
    const response = await authAxiosInstance.get(`${MEMBER_SERVICE_PREFIX}/members`)
    memberStore.setMemberInfo(response.data)
    return response.data
  } catch (error: any) {
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


export const setMember = async (memberStore: any) => {
  try {
    const response = await authAxiosInstance.put(`${MEMBER_SERVICE_PREFIX}/members`, memberStore)

  } catch (error: any) {
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


export const getMemberAddress = async (page: Number) => {
  try {
    const response = await authAxiosInstance.get(`${MEMBER_SERVICE_PREFIX}/addresses`, {
      params: {
        page: page,
        size: 5
      }
    })
    return response.data
  } catch (error: any) {
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

export const getDefaultAddress = async () => {
  try {
    const response = await authAxiosInstance.get(`${MEMBER_SERVICE_PREFIX}/addresses/default`)
    return response.data
  } catch (error: any) {
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

export const setDefaultAddress = async (addressId: number) => {
  try {
    const response = await authAxiosInstance.post(`${MEMBER_SERVICE_PREFIX}/addresses/default`, addressId)
    return response.data
  } catch (error: any) {
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

export const getMemberPoints = async (page: Number) => {
  try {
    const response = await authAxiosInstance.get(`${MEMBER_SERVICE_PREFIX}/points`, {
      params: {
        page: page,
        size: 6
      }
    })
    return response.data
  } catch (error: any) {
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

export const deleteAddress = async (addressId: number) => {
  try {
    const response = await authAxiosInstance.delete(`${MEMBER_SERVICE_PREFIX}/addresses/${addressId}`)
    const accessToken = localStorage.getItem('accessToken')
    return response.data
  } catch (error: any) {
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


export const getImgUrl = async (imgName : string) => {
  try {
    const response = await authAxiosInstance.get(`${MEMBER_SERVICE_PREFIX}/members/profileimg`, {
      headers: {
        'imgName': encodeURI(imgName)
      }
    });
    
    return response.data
  } catch (error: any) {
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


export const leaveMember = async () => {
  try {
    await authAxiosInstance.delete(`${MEMBER_SERVICE_PREFIX}/members`)
  } catch (error: any) {
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
