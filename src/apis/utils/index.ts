import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const axiosApi = (baseURL: string) => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true
  })

  instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  })

  return instance
}

const axiosAuthApi = (baseURL: string) => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true
  })

  instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const newToken = await refreshToken()

          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return axios(originalRequest)
          } else {
            // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트 또는 다른 적절한 조치 수행
            localStorage.clear()
            showAlert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.(code1)')
            window.location.href = '/login'
            return Promise.reject(error)
          }
        } catch (refreshError) {
          // 토큰 갱신 중에 오류가 발생한 경우
          console.error('Error while refreshing token:', refreshError)
          return Promise.reject(error)
        }
      }

      return Promise.reject(error)
    }
  )

  return instance
}

const axiosChatAuthApi = (baseURL: string) => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true
  })

  instance.interceptors.request.use((config) => {
    const data = sessionStorage.getItem('auctions')
    const jsonObject = JSON.parse(data!)
    if (jsonObject) {
      config.headers.Authorization = `Bearer ${jsonObject.chatToken}`
    }

    return config
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config

      if (error.response.status === 401) {
        originalRequest._retry = true
        showAlert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.(code1)')
        window.location.href = '/login'
      }

      return Promise.reject(error)
    }
  )

  return instance
}

const refreshToken = async () => {
  try {
    const memberString = localStorage.getItem('member')

    if (memberString) {
      const member = JSON.parse(memberString)
      const memberId = member.memberId

      const response = await axios.post(
        `${BASE_URL}/auth-service/auth/refresh-token`,
        {
          accessToken: localStorage.getItem('accessToken')
        },
        {
          headers: {
            MemberId: memberId
          }
        }
      )

      const newAccessToken = response.data.accessToken
      if (newAccessToken) {
        delete axios.defaults.headers.common['MemberId']
        localStorage.setItem('accessToken', newAccessToken)
        return newAccessToken
      } else {
        return null
      }
    } else {
      console.error('Member object not found in localStorage')
      return null
    }
  } catch (error) {
    if (
      (error as any)?.response?.status === 401 &&
      (error as any)?.response?.data === 'RefreshToken expired'
    ) {
      showAlert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.(code2)')
      window.location.href = '/login'
    } else {
      // 기타 예외 처리
      console.error('Error:', error)
    }
  }
}

let lastAlertTime: number | null = null

const showAlert = (message: string): void => {
  const now: number = Date.now()
  const timeSinceLastAlert: number = now - (lastAlertTime || 0)

  if (lastAlertTime === null || timeSinceLastAlert > 5000) {
    // 5000ms = 5s
    alert(message)
    lastAlertTime = now
  }
}

export const defaultAxiosInstance: AxiosInstance = axiosApi(BASE_URL)
export const authAxiosInstance: AxiosInstance = axiosAuthApi(BASE_URL)
export const chatAuthAxiosInstance: AxiosInstance = axiosChatAuthApi(BASE_URL)
