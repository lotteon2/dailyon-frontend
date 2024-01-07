<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import AddressModal from '@/components/order/OrderAddressModal.vue'
import { getDefaultAddress } from '@/apis/member/member'
const emit = defineEmits(['submit2', 'changeReceiver', 'changePhoneNumber', 'fetchDefaultAddress'])
const isModalVisible = ref(false)
const openModal = () => {
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}

const address = ref({
  receiver: '',
  postCode: '',
  roadAddress: '',
  detailAddress: '',
  phoneNumber: ''
})

const fill = (addressInfo: any) => {
  address.value.postCode = addressInfo.postCode
  address.value.roadAddress = addressInfo.roadAddress
  address.value.detailAddress = addressInfo.detailAddress
  emit('submit2', addressInfo)
}

const limitInput = () => {
  let numericValue = address.value.phoneNumber.replace(/[^\d]/g, '')
  if (numericValue.length > 11) {
    numericValue = numericValue.slice(0, 11)
  }
  address.value.phoneNumber = numericValue
  emit('changePhoneNumber', address.value.phoneNumber)
}

const limitReceiver = () => {
  let temp = address.value.receiver
  if (temp.length > 7) {
    temp = temp.slice(0, 7)
  }
  address.value.receiver = temp
  emit('changeReceiver', address.value.receiver)
}

const fetchDefaultAddress = async () => {
  const data = await getDefaultAddress()
  if (!data) {
    alert('기본 배송지가 설정 되어있지 않습니다.')
    return
  }
  address.value = data
  emit('fetchDefaultAddress', address.value)
}
</script>

<template>
  <div class="place-container">
    <AddressModal
      v-if="isModalVisible"
      :closeModal="closeModal"
      @submit="(deliveryInfo) => fill(deliveryInfo)"
    />
    <div class="place-first-row">
      <div class="container-title">배송지</div>
      <div class="place-button-wrapper">
        <div class="black-button" @click="fetchDefaultAddress"><span>주문자 정보와 동일</span></div>
      </div>
    </div>
    <div class="line"></div>
    <div class="user-info-wrapper">
      <div class="user-info-first-col">
        <span>받는분 성함</span>
        <span>받는분 주소</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>받는분 휴대폰</span>
      </div>
      <div class="user-info-second-col">
        <input type="text" v-model="address.receiver" placeholder="성함" @input="limitReceiver" />
        <input type="text" v-model="address.postCode" placeholder="우편번호" disabled />
        <input type="text" v-model="address.roadAddress" placeholder="주소" disabled />
        <input type="text" v-model="address.detailAddress" placeholder="상세주소" disabled />
        <input type="text" v-model="address.phoneNumber" @input="limitInput" placeholder="휴대폰" />
      </div>
      <div class="place-third-col">
        <span>&nbsp;</span>
        <div class="black-button" @click="openModal"><span>검색</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/order/order-place.css';
</style>
