<script setup lang="ts">
import { authAxiosInstance } from '@/apis/utils'
import router from '@/router'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useMemberStore } from '@/stores/member/MemberStore'
import { useNotificationStore } from '@/stores/notification/NotificationStore'
import { warningModal } from '@/utils/Modal'

const getMember = async () => {
  try {
    const response = await authAxiosInstance.get('/member-service/members')
    return response.data
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error)
  }
}

onMounted(async () => {
  const route = useRoute()
  const accessToken = route.query.token as string
  localStorage.setItem('accessToken', accessToken)

  const notificationStore = useNotificationStore()
  const memberStore = useMemberStore() as any
  const memberInfo = await getMember()

  const deletedValue: boolean = memberInfo.deleted

  if (deletedValue) {
    localStorage.clear()
    await warningModal('알림', '이미 탈퇴한 계정입니다.')
    router.push({ name: 'login' })
  } else {
    memberStore.setMemberInfo(memberInfo)

    notificationStore.subscribeToNotificationsHandler()
    await notificationStore.fetchUnreadNotificationCount()
    await notificationStore.fetchRecentNotifications()
    redirectToMainPage()
  }
})

const redirectToMainPage = () => {
  router.push({ name: 'home' })
}
</script>
