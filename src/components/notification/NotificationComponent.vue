<template>
  <div
    class="notification-dropdown"
    @mouseover="$emit('mouse-enter-dropdown')"
    @mouseleave="$emit('mouse-exit-dropdown')"
  >
    <div class="notification-list">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'notification-item',
          notification.read ? 'notification-read' : 'notification-unread'
        ]"
      >
        <div class="flex-row-space-btw">
          <div @click="notificationClickHandler(notification)" class="notification-message">
            {{ notification.message }}
          </div>

          <div @click="deleteNotification(notification.id)" class="close">&times;</div>
        </div>
      </div>
    </div>
    <div v-if="notifications.length === 0" class="notification-empty">알림 내역이 없습니다.</div>
    <div class="notification-footer">
      <button @click="markAllNotificationsAsRead">전체 읽기</button>
      <button @click="deleteAllNotifications">전체 삭제</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification/NotificationStore'
import type { Notification } from '@/types/notification'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'

const notificationStore = useNotificationStore()
const { notifications, unreadNotificationCount } = storeToRefs(notificationStore)

const markNotificationAsRead = async (notificationId: string) => {
  await notificationStore.markAsRead(notificationId)
}

const markAllNotificationsAsRead = async () => {
  if(notifications.value.length !== 0) {
    await notificationStore.markAllAsRead()
  }
}

const deleteNotification = async (notificationId: string) => {
  await notificationStore.deleteNotif(notificationId)
}

const deleteAllNotifications = async () => {
  if(notifications.value.length !== 0) {
    await notificationStore.deleteAllNotifs()
  }
}

const notificationClickHandler = (clickedNotification: Notification) => {
  // console.log(
  //   clickedNotification.id,
  //   clickedNotification.linkUrl,
  //   clickedNotification.message,
  //   clickedNotification.notificationType,
  //   clickedNotification.read
  // )

  if (clickedNotification.linkUrl !== '') {
    router.push(clickedNotification.linkUrl)
  }
  markNotificationAsRead(clickedNotification.id)
}
</script>

<style scoped>
@import url('@/assets/css/notification/notification-component.css');
</style>
