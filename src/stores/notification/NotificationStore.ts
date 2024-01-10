// src/stores/notification/NotificationStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Notification } from '@/types/notification' // Notification 타입을 정의해야 합니다.
import { notification as notiPopUp } from 'ant-design-vue'

import * as notificationApi from '@/apis/notification/notification'

export const useNotificationStore = defineStore(
  'notification',
  () => {
    const notifications = ref<Notification[]>([])
    const unreadNotificationCount = ref(0)

    // 새 알림 가져오기 (unread 최근 5개)
    const fetchRecentNotifications = async () => {
      notifications.value = await notificationApi.getRecentNotifications()
    }

    // 모든 알림 가져오기 ( unread/read 모두 )
    const fetchAllNotifications = async () => {
      notifications.value = await notificationApi.getAllNotifications()
    }

    // 알림 개수 업데이트
    const fetchUnreadNotificationCount = async () => {
      unreadNotificationCount.value = await notificationApi.getUnreadNotificationCount()
    }

    const increaseNotificationCount = async () => {
      unreadNotificationCount.value++
    }

    const markAsRead = async (notificationId: string) => {
      await notificationApi.markNotificationAsRead(notificationId)

      const notification = notifications.value.find((n) => n.id === notificationId)
      if (notification) {
        notification.read = true // 'read' status in the local state 변경
      }
      await fetchUnreadNotificationCount()
    }

    const markAllAsRead = async () => {
      await notificationApi.markAllNotificationsAsRead()
      for (const notification of notifications.value) {
        notification.read = true
      }
      await fetchUnreadNotificationCount()
    }

    const deleteNotif = async (notificationId: string) => {
      await notificationApi.deleteNotification(notificationId)
      notifications.value = notifications.value.filter((n) => n.id !== notificationId)
      await fetchUnreadNotificationCount()
    }

    const deleteAllNotifs = async () => {
      await notificationApi.deleteAllNotifications()
      notifications.value = []
      unreadNotificationCount.value = 0
    }

    /**
     * 아래는 구독관련 로직
     * unsubscribe -> 함수 형태이거나 null 값. 구독상태에 따라 토글됨
     */
    let unsubscribe: (() => void) | null = null

    function subscribeToNotifications(): () => void {
      const unsubscribe = notificationApi.subscribeToNotifications(
        (notification) => {
          console.log('notificationApi.subscribeToNotifications 통해 새 알림 도착')
          notifications.value.unshift(notification)
          unreadNotificationCount.value++
          handleNewNotification(notification)
        },
        (errorEvent) => {
          console.error('Error while subscribing to notifications:', errorEvent)
        }
      )
      return unsubscribe
    }

    const unsubscribeFromNotifications = () => {
      if (unsubscribe) {
        unsubscribe()
        unsubscribe = null
      }
    }

    const handleNewNotification = (notificationData: Notification): void => {
      notiPopUp.open({
        message: notificationData.message,
        description: '새로운 알림이 도착했습니다.', // Customize as needed
        placement: 'bottomRight',
        duration: 5 // notification will be closed automatically after 5 seconds
      })
    }

    return {
      notifications,
      unreadNotificationCount,
      fetchRecentNotifications,
      fetchAllNotifications,
      fetchUnreadNotificationCount,
      increaseNotificationCount,
      markAsRead,
      markAllAsRead,
      deleteNotif,
      deleteAllNotifs,
      subscribeToNotifications,
      unsubscribeFromNotifications
    }
  },
  {
    persist: {
      key: 'notificationState',
      storage: window.sessionStorage,
      paths: ['notifications', 'unreadNotificationCount']
    }
  }
)
