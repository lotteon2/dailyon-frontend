<template>
  <div v-if="isNotificationVisible" class="notification-dropdown">
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
          <div @click="markNotificationAsRead(notification.id)" class="notification-message">
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

const notificationStore = useNotificationStore()
const { notifications, notificationCount } = storeToRefs(notificationStore)

// Reactive references from the store
const isNotificationVisible = ref(true) // This might come from some other reactive property or store

const markNotificationAsRead = async (notificationId: string) => {
  await notificationStore.markAsRead(notificationId)
}

const markAllNotificationsAsRead = async () => {
  await notificationStore.markAllAsRead()
}

const deleteNotification = async (notificationId: string) => {
  await notificationStore.deleteNotif(notificationId)
}

const deleteAllNotifications = async () => {
  await notificationStore.deleteAllNotifs()
}
</script>

<style scoped>
@import url('@/assets/css/notification/notification-component.css');
</style>
