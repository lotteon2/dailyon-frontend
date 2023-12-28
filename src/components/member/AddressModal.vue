<script setup lang="ts">
import { ref, defineProps, computed} from 'vue';
import { VueDaumPostcode } from 'vue-daum-postcode';
import { authAxiosInstance } from '@/apis/utils';

const props = defineProps(['closeModal']);

const postOpen = ref(false);
const userName = ref('');
const useDefaultAddr = ref(false);
const postcode = ref('');
const roadAddr = ref('');
const detailAddr = ref('');
const phone = ref('');

const search = () => {
  postOpen.value = true;
};

const onComplete = (result: any) => {
  if (result.userSelectedType === 'R') {
    roadAddr.value = result.roadAddress;
  } else {
    roadAddr.value = result.jibunAddress;
  }
  postcode.value = result.zonecode;
  postOpen.value = false;
  
};
const submitForm = async () => {
  if (!userName.value || !postcode.value || !detailAddr.value || !phone.value) {
    alert('필수 입력 항목을 모두 입력하세요.');
    return;
  }

  try {
    const formData = {
      isDefault: useDefaultAddr.value,
      name: userName.value,
      detailAddress: detailAddr.value,
      roadAddress: roadAddr.value,
      postCode: postcode.value,
      phoneNumber: phone.value,
    };

    const response = await authAxiosInstance.post('/member-service/addresses', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    props.closeModal();
    alert("배송지 저장이 완료되었습니다.");
    window.location.reload()
    
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
}

const limitInput = () => {
  let numericValue = phone.value.replace(/[^\d]/g, "");
  if (numericValue.length > 11) {
    numericValue = numericValue.slice(0, 11);
  }
  phone.value = numericValue;
};
</script>

<template>
  <div class="modal">
    <div class="overlay" @click=props.closeModal()></div>
    <div class="modal-card">
      <div class="modal-header">
        <h2 class="headline">배송 정보 입력</h2>
        <button class="close-btn" @click=props.closeModal()>X</button>
      </div>
      <table>
        <tr>
          <td class="label">배송지명:</td>
          <td>
            <input type="text" class="input" name="userName" v-model="userName" :class="{ 'is-invalid': !userName }" />
            <p v-if="!userName" class="alert-msg">필수로 입력해주세요.</p>
          </td>
        </tr>
        <tr>
          <td class="label">배송지</td>
          <td>
            <label for="useDefaultAddr">
              <input
                type="radio"
                name="useDefaultAddr"
                v-model="useDefaultAddr"
                value=true
              />기본</label>
            <label for="useDefaultAddr">
              <input
                type="radio"
                name="useDefaultAddr"
                v-model="useDefaultAddr"
                value=false
              />신규</label>
          </td>
        </tr>
        <tr>
          <td class="label">도로명 주소</td>
          <td>
            <input type="text" class="input" name="roadAddr" v-model="roadAddr" style="background-color: #ccc;"  readonly />
          </td>
          <td>
            <button @click="search" class="search-button">검색</button>
          </td>
        </tr>
        <tr>
          <td class="label">우편번호</td>
          <td>
            <input type="text" class="input" name="postcode" v-model="postcode" style="background-color: #ccc;"  readonly />
            <p v-if="!postcode" class="alert-msg">필수로 입력해주세요.</p>
          </td>
        </tr>
        <tr>
          <td class="label">상세 주소</td>
          <td>
            <input type="text" class="input" name="detailAddr" v-model="detailAddr" :class="{ 'is-invalid': !detailAddr }" />
            <p v-if="!detailAddr" class="alert-msg">필수로 입력해주세요.</p>
          </td>
        </tr>
        <tr>
          <td class="label">전화번호</td>
          <td>
            <input type="text" class="input" name="phone" v-model="phone" @input="limitInput" :class="{ 'is-invalid': !phone }"/>
            <p v-if="!phone" class="alert-msg">필수로 입력해주세요.</p>
          </td>
        </tr>
        <button @click="submitForm" class="submit-button">저장</button>
      </table>
      <div class="post-box" v-if="postOpen">
        <VueDaumPostcode @complete="onComplete" />
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
.modal-card {
  position: relative;
  max-width: 30%;
  max-height: 90%;
  margin: auto;
  margin-top: 5%;
  padding: 2em;
  background-color: #f5f5f5;
  border-radius: 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;
  color: #333;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--Grayscale7, #000);
  color: white;
  padding: 1em;
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
  font-size: 1.5em;
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
  max-height: 300px;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 1em;
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
