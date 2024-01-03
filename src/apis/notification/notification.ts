// src/apis/notification/notification.ts
import { AxiosError } from 'axios'
import { authAxiosInstance } from '@/apis/utils/index'
import type { Notification } from '@/types/notification' // Notification 타입을 정의해야 합니다.

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
  onError?: (event: Event) => void
): (() => void) => {
  const eventSource = new EventSource(
    `${NOTIFICATION_PREFIX_PATH}${NOTIFICATION_DOMAIN_PREFIX_PATH}/subscription`
  )

  eventSource.onmessage = (event) => {
    const notification: Notification = JSON.parse(event.data)
    onMessage(notification)
  }

  eventSource.onerror = (event) => {
    console.error('EventSource error:', event)
    if (onError) {
      onError(event)
    }
  }

  return () => {
    eventSource.close()
  }
}
