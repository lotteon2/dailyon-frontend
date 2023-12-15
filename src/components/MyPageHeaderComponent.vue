<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { pointPaymentReady } from '@/apis/payment/payment'
import type { PointPaymentDto } from '@/apis/payment/paymentDto'
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
// 선택한 값이 변경되면 입력값을 초기화
watch(selectedAmount, () => {
  if (selectedAmount.value) {
    inputAmount.value = ''
  }
})

// 입력값이 변경되면 선택한 값을 초기화
watch(inputAmount, () => {
  if (inputAmount.value) {
    selectedAmount.value = ''
  }
})

const validateInput = () => {
  // 입력값이 숫자가 아니라면, 마지막 입력값을 제거
  if (!/^\d*$/.test(inputAmount.value)) {
    alert('숫자만 입력 가능합니다.')
    inputAmount.value = ''
    return
  }

  // 입력값이 5자리를 초과하면, 마지막 입력값을 제거
  else if (inputAmount.value.length > 9) {
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
  localStorage.removeItem('accessToken');
  router.push({ name: 'home' });
  alert("로그아웃 완료")
};

const processPayment = async () => {
  const amount = Number(selectedAmount.value || inputAmount.value)
  if (!amount) {
    alert('0원은 충전할 수 없습니다.')
    inputAmount.value = ''
    return
  }

  paymentDto.value.totalAmount = amount

  redirectUrl.value = await pointPaymentReady(paymentDto.value)

  if (redirectUrl.value) {
    const width = 500
    const height = 500
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    newWindow.value = window.open(
      redirectUrl.value,
      'payment',
      `width=${width},height=${height},top=${top},left=${left}`
    )
  }
  displayModal.value = false
}

const handleMessage = (event: MessageEvent) => {
  const { routeName } = event.data
  window.scrollTo(0, 0)
  router.push({ name: routeName })
}

onMounted(async () => {
  window.addEventListener('message', handleMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})
</script>

<template>
  <div class="user-container">
    <div class='user-info-container'>
      <img class='user-profile-img' src='@/assets/images/default-profile-image.png' />
      <div class="user-name-container">
        <div class="user-name-container-first-line">
          <h1>
            닉네임&nbsp;
            <h2>님, 반갑습니다!</h2>
          </h1>
        </div>
        <h3>이메일 주소</h3>
      </div>
    </div>
    <div class="user-container-point-container">
      <div class='point-wrapper'>
        포인트<h1>0</h1>점
      </div>
      <button class="payment-modal-button" @click="open">결제하기</button>
      <div v-if="displayModal" class="payment-modal">
        <div class="modal-content">
          <span @click="displayModal = false" class="close">&times;</span>
          <p>결제 금액을 선택하거나 입력해주세요.</p>
          <select v-model="selectedAmount" class="select">
            <option disabled value="">선택해주세요</option>
            <option>10000</option>
            <option>30000</option>
            <option>50000</option>
            <option>100000</option>
          </select>
          <input
            type="text"
            v-model="inputAmount"
            @input="validateInput"
            placeholder="원하는 금액 입력"
          />
          <button class="process-button" @click="processPayment">결제 진행</button>
        </div>
      </div>
    </div>
    <div class='user-info-change-btn-wrapper'>
      <div class="modify-button">정보 수정</div>
      <div class="logout-button" @click="logout()">로그아웃</div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/mypage-header.css';
</style>
