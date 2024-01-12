// src/stores/notification/NotificationStore.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Notification } from '@/types/notification' // Notification 타입을 정의해야 합니다.
import { notification as notiPopUp } from 'ant-design-vue'

import * as notificationApi from '@/apis/notification/notification'

export const useNotificationStore = defineStore(
  'notification',
  () => {
    const notifications = ref<Notification[]>([])
    const unreadNotificationCount = ref(0)
    // let unsubscribe: (() => void) | null = null
    let eventSourceUnsubscribe: (() => void) | null = null

    // 새 알림 가져오기 (unread 최근 5개)
    const fetchRecentNotifications = async () => {
      try {
        console.log('notification store: 최근 5개 안읽은 알림을 가져옵니다.')
        notifications.value = await notificationApi.getRecentNotifications()
      } catch (error) {
        console.error('최근 알림 조회 도중 오류 발생:', error)
      }
    }

    // 모든 알림 가져오기 ( unread/read 모두 )
    const fetchAllNotifications = async () => {
      try {
        notifications.value = await notificationApi.getAllNotifications()
      } catch (error) {
        console.error('모든 알림 조회 도중 오류 발생:', error)
      }
    }

    // 알림 개수 업데이트
    const fetchUnreadNotificationCount = async () => {
      try {
        unreadNotificationCount.value = await notificationApi.getUnreadNotificationCount()
      } catch (error) {
        console.error('알림 개수 업데이트 도중 오류 발생:', error)
      }
    }

    const increaseNotificationCount = () => {
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
    const unsubscribeFromNotifications = () => {
      if (eventSourceUnsubscribe) {
        eventSourceUnsubscribe()
        eventSourceUnsubscribe = null
      }
    }

    const subscribeToNotificationsHandler = () => {
      console.log('subscribeToNotificationsHandler를 발동')
      unsubscribeFromNotifications() // 이전 구독이 있다면 해제

      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        console.error('accessToken이 없습니다.')
        return
      }
      // console.error('subscribeToNotificationsHandler accessToken 검증 통과.')

      eventSourceUnsubscribe = notificationApi.subscribeToNotifications(
        (notification: Notification) => {
          console.log('구독 후 알림을 받았습니다..')
          console.log('토스트 알림을 띄웁니다.')
          notifications.value.unshift(notification)
          unreadNotificationCount.value++
          notiPopUp.open({
            message: notification.message,
            description: '새로운 알림이 도착했습니다.',
            placement: 'bottomRight',
            duration: 5
          })
        },
        (errorEvent) => {
          console.error('Error while subscribing to notifications:', errorEvent)
        }
      )
    }

    const handleNewNotification = (notificationData: Notification): void => {
      console.log('토스트 알림을 띄웁니다2.')
      notiPopUp.open({
        message: notificationData.message,
        description: '새로운 알림이 도착했습니다.', // Customize as needed
        placement: 'bottomRight',
        duration: 5 // notification will be closed automatically after 5 seconds
      })
    }

    const clearNotificationForLogout = () => {
      notifications.value = []
      unreadNotificationCount.value = 0
    }

    watch(
      () => localStorage.getItem('accessToken'),
      (newToken) => {
        if (newToken) {
          // console.log(
          //   "localStorage.getItem('accessToken') 토큰 변경 감지 subscribeToNotificationsHandler발동 전"
          // )
          subscribeToNotificationsHandler()
        } else {
          // console.log('토큰이 없어졌음. 구독 해제 직전.')
          unsubscribeFromNotifications()
        }
      },
      { immediate: true }
    )

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
      subscribeToNotificationsHandler,
      unsubscribeFromNotifications,
      handleNewNotification,
      clearNotificationForLogout
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
