<script setup lang="ts">
import { ref, watch } from 'vue'

const redirectUrl = ref('')
const displayModal = ref(false)
const selectedAmount = ref('')
const inputAmount = ref('')

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
    inputAmount.value = inputAmount.value.slice(0, -1)
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

const processPayment = () => {
  const amount = selectedAmount.value || inputAmount.value
  console.log('결제 금액: ', amount)
  displayModal.value = false

  const width = 500
  const height = 500
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2

  redirectUrl.value = ''
  window.open(
    redirectUrl.value,
    'payment',
    `width=${width},height=${height},top=${top},left=${left}`
  )
}
</script>

<template>
  <div class="user-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
    >
      <circle cx="75" cy="75" r="75" fill="#D9D9D9" />
    </svg>
    <div class="user-name-container">
      <div class="user-name-container-first-line">
        <h1>
          닉네임&nbsp;
          <h2>님, 반갑습니다!</h2>
        </h1>
      </div>
      <h3>이메일 주소</h3>
    </div>
    <div class="user-container-point-container">
      포인트
      <h1>0</h1>
      점
      <!-- 시작한다!!!! -->
      <button class="payment-modal-button" @click="open">결제하기</button>
      <div v-if="displayModal" class="payment-modal">
        <div class="modal-content">
          <span @click="displayModal = false" class="close">&times;</span>
          <p>결제 금액을 선택하거나 입력해주세요.</p>
          <select v-model="selectedAmount">
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
    <div class="modify-button">정보 수정</div>
    <div class="logout-button">로그아웃</div>
  </div>
</template>

<style scoped>
@import '@/assets/css/mypage-header.css';
</style>
