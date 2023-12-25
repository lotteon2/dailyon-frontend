<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { VueDaumPostcode } from 'vue-daum-postcode'

const props = defineProps(['closeModal'])
const emit = defineEmits(['submit'])
const postOpen = ref(false)
const deliveryInfo = ref({
  postCode: '',
  roadAddress: '',
  detailAddress: ''
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
    !deliveryInfo.value.roadAddress
  ) {
    alert('필수 입력 항목을 모두 입력하세요.')
    return
  }
  emit('submit', deliveryInfo.value)
  props.closeModal()
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
          <button @click="search" class="search-button">검색</button>
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
            />
          </td>
        </tr>
      </table>
      <div class="submit-btn-div">
        <button @click="submit" class="submit-button">입력완료</button>
      </div>
      <div class="post-box" v-if="postOpen">
        <VueDaumPostcode @complete="onComplete" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/order/order-place-modal.css';
</style>
