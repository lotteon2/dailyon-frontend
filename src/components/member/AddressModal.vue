<script setup lang='ts'>
import { defineProps, ref, watch } from 'vue'
import { VueDaumPostcode } from 'vue-daum-postcode'
import { authAxiosInstance } from '@/apis/utils'
import { successModal, warningModal } from '@/utils/Modal'
import router from '@/router'

const props = defineProps(['closeModal', 'selectedAddress'])


const postOpen = ref(false)
const userName = ref('')
const useDefaultAddr = ref(false)
const postcode = ref('')
const roadAddr = ref('')
const detailAddr = ref('')
const phone = ref('')

const search = () => {
  postOpen.value = true
}


const onComplete = (result: any) => {
  if (result.userSelectedType === 'R') {
    roadAddr.value = result.roadAddress
  } else {
    roadAddr.value = result.jibunAddress
  }
  postcode.value = result.zonecode
  postOpen.value = false

}

const submitInProgress = ref(false)

const submitForm = async () => {
  if (submitInProgress.value) {
    return
  }

  try {
    submitInProgress.value = true

    if (!userName.value || !postcode.value || !detailAddr.value || !phone.value) {
      await warningModal('알림', '필수 입력 항목을 모두 입력하세요.')
      return
    }

    const endpoint = props.selectedAddress.id
      ? '/member-service/addresses'
      : '/member-service/addresses'

    const formData = {
      addressId: props.selectedAddress.id,
      isDefault: useDefaultAddr.value,
      name: userName.value,
      detailAddress: detailAddr.value,
      roadAddress: roadAddr.value,
      postCode: postcode.value,
      phoneNumber: phone.value
    }


    if (props.selectedAddress.id) {
      const response = await authAxiosInstance.put(endpoint, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else {
      const response = await authAxiosInstance.post(endpoint, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    props.closeModal()

    await successModal('알림', '배송지 저장이 완료되었습니다.')
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error)
  } finally {
    submitInProgress.value = false
  }
}


const limitInput = () => {
  let numericValue = phone.value.replace(/[^\d]/g, '')
  if (numericValue.length > 11) {
    numericValue = numericValue.slice(0, 11)
  }
  phone.value = numericValue
}

watch(() => props.selectedAddress, (newValue: any) => {
  userName.value = newValue.name
  useDefaultAddr.value = newValue.isDefault
  postcode.value = newValue.postCode
  roadAddr.value = newValue.roadAddress
  detailAddr.value = newValue.detailAddress
  phone.value = newValue.phoneNumber
}, { immediate: true })
</script>

<template>
  <div class='modal'>
    <div class='overlay' @click=props.closeModal()></div>
    <div class='modal-card'>
      <div class='modal-header'>
        <h2 class='headline'>배송 정보 입력</h2>
        <button class='close-btn' @click=props.closeModal()>X</button>
      </div>
      <div class='modal-body'>
        <table>
          <tr>
            <td class='label'>배송지명:</td>
            <td>
              <input type='text' class='input' name='userName' v-model='userName'
                     :class="{ 'is-invalid': !userName }" />
              <p v-if='!userName' class='alert-msg'>필수로 입력해주세요.</p>
            </td>
          </tr>
          <tr>
            <td class='label'>배송지</td>
            <td>
              <label for='useDefaultAddr'>
                <input
                  type='radio'
                  name='useDefaultAddr'
                  v-model='useDefaultAddr'
                  value='true'
                />기본</label>
              <label for='useDefaultAddr'>
                <input
                  type='radio'
                  name='useDefaultAddr'
                  v-model='useDefaultAddr'
                  value='false'
                />신규</label>
            </td>
          </tr>
          <tr>
            <td class='label'>도로명 주소</td>
            <td>
              <input type='text' class='input' name='roadAddr' v-model='roadAddr' style='background-color: #ccc;'
                     readonly />
            </td>
            <td>
              <button @click='search' class='search-button'>검색</button>
            </td>
          </tr>
          <tr>
            <td class='label'>우편번호</td>
            <td>
              <input type='text' class='input' name='postcode' v-model='postcode' style='background-color: #ccc;'
                     readonly />
              <p v-if='!postcode' class='alert-msg'>필수로 입력해주세요.</p>
            </td>
          </tr>
          <tr>
            <td class='label'>상세 주소</td>
            <td>
              <input type='text' class='input' name='detailAddr' v-model='detailAddr'
                     :class="{ 'is-invalid': !detailAddr }" />
              <p v-if='!detailAddr' class='alert-msg'>필수로 입력해주세요.</p>
            </td>
          </tr>
          <tr>
            <td class='label'>전화번호</td>
            <td>
              <input type='text' class='input' name='phone' v-model='phone' @input='limitInput'
                     :class="{ 'is-invalid': !phone }" />
              <p v-if='!phone' class='alert-msg'>필수로 입력해주세요.</p>
            </td>
          </tr>
          <button @click='submitForm' class='submit-button'>저장</button>
        </table>
      </div>
      <div class='post-box' v-if='postOpen'>
        <VueDaumPostcode @complete='onComplete' />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}

.overlay {
  opacity: 0.7;
  background-color: var(--Grayscale7, #000);
}

.modal-body {
  padding: 2em;
}

.modal-card {
  position: relative;
  max-width: 30%;
  max-height: 95%;
  margin: auto;
  margin-top: 1%;
  background-color: #f5f5f5;
  border-radius: 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;
  color: #333;

}


.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--Grayscale7, #000);
  color: white;
  padding: 1.5em;
  border-radius: 15px 15px 0 0;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
}

table {
  width: 100%;
  margin-top: 1em;
}

tr {
  display: flex;
  gap: 10px;
  margin-bottom: 1em;
}

td {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: start;
  min-width: 120px; /* 최소 너비 설정 */
}

.input {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.label {
  font-weight: bold;
  color: #333;
}

.headline {
  color: white;
  font-size: 2em;
}

.search-button {
  padding: 0.5em 1em;
  cursor: pointer;
  background-color: var(--Grayscale7, #000);
  color: white;
  border: none;
  border-radius: 5px;
}

.post-box {
  overflow-y: auto;
  max-height: 250px;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 1em;
  overflow-y: auto;
}

.submit-button {
  padding: 0.5em 1em;
  cursor: pointer;
  background-color: var(--Grayscale7, #000);
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 1em;
}

.is-invalid {
  border-color: red;
}

.alert-msg {
  color: red;
}

</style>
