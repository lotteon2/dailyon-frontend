<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { VueDaumPostcode } from 'vue-daum-postcode'

const props = defineProps(['closeModal'])
const emit = defineEmits(['submit'])
const postOpen = ref(false)
const deliveryInfo = ref({
  postCode: '',
  roadAddress: '',
  detailAddress: '',
  phoneNumber: ''
})

const search = () => {
  postOpen.value = true
}

const onComplete = (result: any) => {
  if (result.userSelectedType === 'R') {
    deliveryInfo.value.roadAddress = result.roadAddress
  } else {
    deliveryInfo.value.roadAddress = result.jibunAddress
  }
  deliveryInfo.value.postCode = result.zonecode
  postOpen.value = false
}
const submit = async () => {
  if (
    !deliveryInfo.value.postCode ||
    !deliveryInfo.value.detailAddress ||
    !deliveryInfo.value.roadAddress ||
    !deliveryInfo.value.phoneNumber
  ) {
    alert('필수 입력 항목을 모두 입력하세요.')
    return
  }
  emit('submit', deliveryInfo.value)
  props.closeModal()
}

const limitInput = () => {
  let numericValue = deliveryInfo.value.phoneNumber.replace(/[^\d]/g, '')
  if (numericValue.length > 11) {
    numericValue = numericValue.slice(0, 11)
  }
  deliveryInfo.value.phoneNumber = numericValue
}
</script>

<template>
  <div class="address-modal">
    <div class="overlay" @click="props.closeModal()"></div>
    <div class="modal-card">
      <div class="modal-header">
        <h2 class="headline">배송 정보 입력</h2>
        <button class="close-btn" @click="props.closeModal()">X</button>
      </div>
      <table>
        <tr>
          <td class="label">도로명 주소</td>
          <td>
            <input
              type="text"
              class="input"
              name="roadAddr"
              v-model="deliveryInfo.roadAddress"
              style="background-color: #ccc"
              readonly
            />
          </td>
          <td>
            <button @click="search" class="search-button">검색</button>
          </td>
        </tr>
        <tr>
          <td class="label">우편번호</td>
          <td>
            <input
              type="text"
              class="input"
              name="postcode"
              v-model="deliveryInfo.postCode"
              style="background-color: #ccc"
              readonly
            />
            <p v-if="!deliveryInfo.postCode" class="alert-msg">필수로 입력해주세요.</p>
          </td>
        </tr>
        <tr>
          <td class="label">상세 주소</td>
          <td>
            <input
              type="text"
              class="input"
              name="detailAddr"
              v-model="deliveryInfo.detailAddress"
              :class="{ 'is-invalid': !deliveryInfo.detailAddress }"
            />
            <p v-if="!deliveryInfo.detailAddress" class="alert-msg">필수로 입력해주세요.</p>
          </td>
        </tr>
        <tr>
          <td class="label">전화번호</td>
          <td>
            <input
              type="text"
              class="input"
              name="phone"
              v-model="deliveryInfo.phoneNumber"
              @input="limitInput"
              :class="{ 'is-invalid': !deliveryInfo.phoneNumber }"
            />
            <p v-if="!deliveryInfo.phoneNumber" class="alert-msg">필수로 입력해주세요.</p>
          </td>
        </tr>
        <div class="submit-btn-div">
          <button @click="submit" class="submit-button">입력완료</button>
        </div>
      </table>
      <div class="post-box" v-if="postOpen">
        <VueDaumPostcode @complete="onComplete" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/order/order-place-modal.css';
</style>
