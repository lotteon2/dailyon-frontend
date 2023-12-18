<script setup lang="ts">
import { ref } from 'vue';
import ModalView from './AddressModal.vue';

const isModalVisible = ref(false);

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};
</script>

<template>
  <div class="user-info-container">
    <div class="container-title">회원정보 수정</div>
    <div class="container-line"></div>
    <div class="user-info-first-row">
      <div class="container-inner-title">기본 정보</div>
      <div class="modify-button-wrapper">
        <div class="modify-white">초기화</div>
        <div class="modify-white modify-black">
          수정 완료
        </div>
      </div>
    </div>
    <div class="user-info-second-row">
      <div class="user-info-second-row-first-col">
        <svg
          class="profile-circle"
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
          viewBox="0 0 150 150"
          fill="none"
        >
          <circle cx="75" cy="75" r="75" fill="#D9D9D9" />
        </svg>
        <div class="profile-change-button">프로필 변경</div>
      </div>
      <div class="user-info-second-row-second-col">
        <span>이메일</span>
        <span>닉네임</span>
        <span>기본 배송지</span>
      </div>
      <div class="user-info-second-row-third-col">
        <span>이메일</span>
        <span class="info-underline">닉네임</span>
        <span class="info-underline">기본 주소</span>
      </div>
      <div class="user-info-second-row-fourth-col">
        <div class="place-choice-button">배송지 선택</div>
      </div>
    </div>
    <div class="container-inner-title">배송지 관리</div>
    <div class="place-add-button">
      <button @click="openModal">배송지 추가</button>
      <ModalView v-if="isModalVisible" :closeModal="closeModal" />
    </div>
    <table>
      <col width="80px" />
      <col width="100px" />
      <col width="150px" />
      <col width="400px" />
      <col width="80px" />
      <tr class="place-font memberinfo-table-data1">
        <td class="padding-left-10">선택</td>
        <td>배송지명</td>
        <td>이름</td>
        <td>배송지 주소</td>
        <td class="text-align-right">
          <div class="place-choice-button-wrapper">
            <div class="place-white-button">
              전체 선택
            </div>
            <div class="place-white-button">
              선택 삭제
            </div>
            <div class="place-white-button">
              전체 삭제
            </div>
          </div>
        </td>
      </tr>
      <tr class="place-font memberinfo-table-data1">
        <td class="padding-left-10">
          <input
            class="basket-checkbox"
            type="checkbox"
          />
        </td>
        <td>배송지명</td>
        <td>이름</td>
        <td>배송지 주소</td>
        <td>
          <div class="close-button-div">
            <svg
              class="margin-right-10"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M19.2798 17.2911C19.544 17.5553 19.6924 17.9136 19.6924 18.2872C19.6924 18.6608 19.544 19.0191 19.2798 19.2833C19.0156 19.5475 18.6573 19.6959 18.2837 19.6959C17.9101 19.6959 17.5518 19.5475 17.2876 19.2833L9.84736 11.8407L2.40478 19.281C2.1406 19.5451 1.7823 19.6936 1.40869 19.6936C1.03508 19.6936 0.676776 19.5451 0.412596 19.281C0.148415 19.0168 3.9366e-09 18.6585 0 18.2849C-3.9366e-09 17.9113 0.148415 17.5529 0.412596 17.2888L7.85517 9.84853L0.414939 2.40595C0.150759 2.14177 0.0023438 1.78347 0.0023438 1.40986C0.00234381 1.03625 0.150759 0.677948 0.414939 0.413767C0.67912 0.149587 1.03743 0.00117168 1.41103 0.00117168C1.78464 0.00117167 2.14295 0.149587 2.40713 0.413767L9.84736 7.85635L17.2899 0.412595C17.5541 0.148415 17.9124 -6.22431e-09 18.286 0C18.6596 6.22431e-09 19.0179 0.148415 19.2821 0.412595C19.5463 0.676776 19.6947 1.03508 19.6947 1.40869C19.6947 1.7823 19.5463 2.1406 19.2821 2.40478L11.8395 9.84853L19.2798 17.2911Z"
                fill="black"
              />
            </svg>
          </div>
        </td>
      </tr>
      <tr class="place-font memberinfo-table-data2">
        <td class="padding-left-10">
          <input
            class="basket-checkbox"
            type="checkbox"
          />
        </td>
        <td>배송지명</td>
        <td>이름</td>
        <td>배송지 주소</td>
        <td>
          <div class="close-button-div">
            <svg
              class="margin-right-10"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M19.2798 17.2911C19.544 17.5553 19.6924 17.9136 19.6924 18.2872C19.6924 18.6608 19.544 19.0191 19.2798 19.2833C19.0156 19.5475 18.6573 19.6959 18.2837 19.6959C17.9101 19.6959 17.5518 19.5475 17.2876 19.2833L9.84736 11.8407L2.40478 19.281C2.1406 19.5451 1.7823 19.6936 1.40869 19.6936C1.03508 19.6936 0.676776 19.5451 0.412596 19.281C0.148415 19.0168 3.9366e-09 18.6585 0 18.2849C-3.9366e-09 17.9113 0.148415 17.5529 0.412596 17.2888L7.85517 9.84853L0.414939 2.40595C0.150759 2.14177 0.0023438 1.78347 0.0023438 1.40986C0.00234381 1.03625 0.150759 0.677948 0.414939 0.413767C0.67912 0.149587 1.03743 0.00117168 1.41103 0.00117168C1.78464 0.00117167 2.14295 0.149587 2.40713 0.413767L9.84736 7.85635L17.2899 0.412595C17.5541 0.148415 17.9124 -6.22431e-09 18.286 0C18.6596 6.22431e-09 19.0179 0.148415 19.2821 0.412595C19.5463 0.676776 19.6947 1.03508 19.6947 1.40869C19.6947 1.7823 19.5463 2.1406 19.2821 2.40478L11.8395 9.84853L19.2798 17.2911Z"
                fill="black"
              />
            </svg>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
@import "@/assets/css/member-info.css";
</style>

