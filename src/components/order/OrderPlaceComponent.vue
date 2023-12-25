<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import AddressModal from '@/components/order/OrderAddressModal.vue'

const emit = defineEmits(['submit', 'changeReceiver'])
const isModalVisible = ref(false)

const receiver = ref<string>('')

const openModal = () => {
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}

const address = ref({
  postCode: '',
  roadAddress: '',
  detailAddress: ''
})

const fill = (addressInfo: any) => {
  address.value = addressInfo
  emit('submit', addressInfo)
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
        <div class="black-button"><span>주문자 정보와 동일</span></div>
        <div class="black-button"><span>배송지 목록 조회</span></div>
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
        <input
          type="text"
          v-model="receiver"
          @change="emit('changeReceiver', receiver)"
          placeholder="성함"
        />
        <input type="text" :value="address.postCode" placeholder="우편번호" disabled />
        <input type="text" :value="address.roadAddress" placeholder="주소" disabled />
        <input type="text" :value="address.detailAddress" placeholder="상세주소" disabled />
        <input type="text" placeholder="휴대폰" />
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
