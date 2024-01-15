// src/apis/notification/notification.ts
import { AxiosError } from 'axios'
import { authAxiosInstance } from '@/apis/utils/index'
import type { Notification } from '@/types/notification'
import { NotificationType } from '@/types/notification'
import { EventSourcePolyfill } from 'event-source-polyfill'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const NOTIFICATION_PREFIX_PATH = '/notification-service'
const NOTIFICATION_DOMAIN_PREFIX_PATH = '/notifications'

// 새 알림 가져오기 (unread 최근 5개)
export const getRecentNotifications = async () => {
  const response = await authAxiosInstance.get<Notification[]>(
    `${NOTIFICATION_PREFIX_PATH}${NOTIFICATION_DOMAIN_PREFIX_PATH}/all`
  )
  return response.data
}

// 모든 알림 가져오기 ( unread/read 모두 )
export const getAllNotifications = async () => {
  const response = await authAxiosInstance.get<Notification[]>(
    `${NOTIFICATION_PREFIX_PATH}${NOTIFICATION_DOMAIN_PREFIX_PATH}/all`
  )
  return response.data
}

// 알림 개수 업데이트
export const getUnreadNotificationCount = async () => {
  const response = await authAxiosInstance.get<number>(
    `${NOTIFICATION_PREFIX_PATH}${NOTIFICATION_DOMAIN_PREFIX_PATH}/count`
  )
  return response.data
}

// 개별 알림 읽음 처리
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  await authAxiosInstance.put(
    `${NOTIFICATION_PREFIX_PATH}${NOTIFICATION_DOMAIN_PREFIX_PATH}/${notificationId}/read`
  )
}

// 모든 알림 읽음 처리
export const markAllNotificationsAsRead = async (): Promise<void> => {
  await authAxiosInstance.put(
    `${NOTIFICATION_PREFIX_PATH}${NOTIFICATION_DOMAIN_PREFIX_PATH}/read/all`
  )
}

// 개별 알림 삭제
export const deleteNotification = async (notificationId: string): Promise<void> => {
  await authAxiosInstance.delete(
    `${NOTIFICATION_PREFIX_PATH}${NOTIFICATION_DOMAIN_PREFIX_PATH}/${notificationId}`
  )
}

// 모든 알림 삭제
export const deleteAllNotifications = async (): Promise<void> => {
  await authAxiosInstance.delete(`${NOTIFICATION_PREFIX_PATH}${NOTIFICATION_DOMAIN_PREFIX_PATH}`)
}

// 알림 구독
export const subscribeToNotifications = (
  onMessage: (notification: Notification) => void,
  onError?: (event: Event | MessageEvent) => void
): (() => void) => {
  // console.log('src/apis/notification/notification.ts에서 SSE connection을 시도합니다.')
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken === null) {
    console.log('accessToken을 찾을 수 없습니다.')
    return () => {
      console.log('No active SSE connection to close because accessToken was null.')
    }
  }

  const eventSource = new EventSourcePolyfill(
    `${BASE_URL}${NOTIFICATION_PREFIX_PATH}${NOTIFICATION_DOMAIN_PREFIX_PATH}/subscription`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  eventSource.onopen = (event) => {
    // console.log('SSE connection이 연결되었습니다.', event)
  }

  eventSource.onmessage = (event) => {
    const notification: Notification = JSON.parse(event.data)

    if (notification.notificationType === NotificationType.HEARTBEAT) {
      // console.log('하트비트 수신')
      return // 하트비트일 경우 처리하지 않음
    } else if (notification.notificationType === NotificationType.WELCOME) {
      return
    } else {
      // console.log('하트비트 외 모든 메세지 수신')
    }

    console.log('새로운 메세지가 도착했습니다.')
    console.log(event.data)
    console.log(event)

    onMessage(notification)
  }

  eventSource.onerror = (event) => {
    console.error('EventSource error:', event)
    if (onError) {
      onError(event as Event)
    }
  }

  return () => {
    // console.log('SSE connection을 해제합니다.')
    eventSource.close()
    console.log('SSE connection이 해제되었습니다.')
  }
}
