<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { pointPaymentReady } from '@/apis/payment/payment'
import type { PointPaymentDto } from '@/apis/payment/paymentDto'
import { useMemberStore } from '@/stores/member/MemberStore'
import { useNotificationStore } from '@/stores/notification/NotificationStore'
import { getMember } from '@/apis/member/member'
import { successModal, warningModal } from '@/utils/Modal'
import { storeToRefs } from 'pinia'
import { Select, SelectOption } from 'ant-design-vue'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)
const memberStore = useMemberStore()
const notificationStore = useNotificationStore()
const { shouldSubscribeToSSE } = storeToRefs(notificationStore)
const router = useRouter()
const redirectUrl = ref('')
const displayModal = ref(false)
const selectedAmount = ref('')
const inputAmount = ref('')
const paymentDto = ref<PointPaymentDto>({
  method: 'KAKAOPAY',
  totalAmount: 0
})
const newWindow = ref<any>()
watch(selectedAmount, () => {
  if (selectedAmount.value) {
    inputAmount.value = ''
  }
})

watch(inputAmount, () => {
  if (inputAmount.value) {
    selectedAmount.value = ''
  }
})

const validateInput = () => {
  if (!/^\d*$/.test(inputAmount.value)) {
    warningModal('알림', '숫자만 입력 가능합니다.')
    inputAmount.value = ''
    return
  } else if (inputAmount.value.length > 9) {
    inputAmount.value = inputAmount.value.slice(0, 9)
  }
}

const open = () => {
  inputClear()
  displayModal.value = true
}

const inputClear = () => {
  inputAmount.value = ''
  selectedAmount.value = ''
}

const logout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('member')

  // 알림 clean로직
  notificationStore.unsubscribeFromNotifications()
  notificationStore.clearNotificationForLogout()

  // memberStroe clean 로직
  memberStore.clearMemberInfo()

  router.push({ name: 'home' })
  successModal('알림', '로그아웃 완료')
}

const modify = () => {
  router.push({ name: 'memberInfo' })
}

const processPayment = async () => {
  const amount = Number(selectedAmount.value || inputAmount.value)
  if (!amount) {
    await warningModal('알림', '0원은 충전할 수 없습니다.')
    inputAmount.value = ''
    return
  }

  paymentDto.value.totalAmount = amount

  redirectUrl.value = await pointPaymentReady(paymentDto.value)

  if (redirectUrl.value) {
    shouldSubscribeToSSE.value = false
    const width = 500
    const height = 500
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    newWindow.value = window.open(
      redirectUrl.value,
      'orders',
      `width=${width},height=${height},top=${top},left=${left}`
    )
  }
  displayModal.value = false
}

const handleMessage = async (event: MessageEvent) => {
  const { routeName } = event.data

  if (routeName) {
    await getMember() // // polling시 계속 발동하지 않고, 실제 이벤트 발생했을때 발동
  }
  window.scrollTo(0, 0)
  router.replace({ name: routeName })
}

onMounted(async () => {
  await getMember()
  const memberInfo = memberStore.getMemberInfo()
  // eventListener는 window가 아직 열리기 전이어도 해당 이벤트가 발생했는지 해당 이벤트에 대해 polling을 계속 합니다.
  // handleMessage 함수는 계속 발동됩니다.
  window.addEventListener('message', handleMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})
</script>

<template>
  <div class="user-container">
    <div class="user-info-container">
      <svg class="profile-circle" width="50" height="50" viewBox="0 0 150 150" fill="none">
        <circle cx="75" cy="75" r="75" fill="#D9D9D9" />
        <mask id="circle-mask">
          <circle cx="75" cy="75" r="75" fill="white" />
        </mask>
        <image
          :href="`${VITE_STATIC_IMG_URL}${memberStore.profileImgUrl}` || undefined"
          x="0"
          y="0"
          width="150"
          height="150"
          mask="url(#circle-mask)"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
      <div class="user-name-container">
        <div class="user-name-container-first-line">
          <h1>
            {{ memberStore.nickname }}&nbsp;
            <h2>님, 반갑습니다!</h2>
          </h1>
        </div>
        <h3>{{ memberStore.email }}</h3>
      </div>
    </div>
    <div class="user-container-point-container">
      <div class="point-wrapper">
        포인트
        <h1>{{(memberStore.point ?? 0).toLocaleString() }}</h1>
        점
      </div>
      <button class="payment-modal-button" @click="open">결제하기</button>
      <div v-if="displayModal" class="payment-modal">
        <div class="modal-content">
          <span class="close-wrapper">
            <div class="close-space"></div>
            <div @click="displayModal = false" class="close">&times;</div>
          </span>
          <p>결제 금액을 선택하거나 입력해주세요.</p>
          <Select v-model:value='selectedAmount' class="select"
                  :disabled="inputAmount !== ''">
            <SelectOption disabled value='' hidden>선택해주세요</SelectOption>
            <SelectOption value='10000'></SelectOption>
            <SelectOption value='30000'></SelectOption>
            <SelectOption value='50000'></SelectOption>
            <SelectOption value='100000'></SelectOption>
          </Select>
          <input
            class='point-input'
            type="text"
            v-model="inputAmount"
            @input="validateInput"
            placeholder="원하는 금액 입력"
          />
          <button class="process-button" @click="processPayment">결제 진행</button>
        </div>
      </div>
    </div>
    <div class="user-info-change-btn-wrapper">
      <div class="modify-button" @click="modify()">정보 수정</div>
      <div class="logout-button" @click="logout()">로그아웃</div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/mypage-header.css';
</style>
