<script setup lang="ts">
import { ref, onMounted, computed} from 'vue';
import ModalView from './AddressModal.vue';
import { authAxiosInstance } from '@/apis/utils';
import { useMemberStore } from '@/stores/member/MemberStore';
import { getMember, getMemberAddressT } from '@/apis/member/member';


const isModalVisible = ref(false);
const addresses = ref([]);
const currentPage = ref(0);
const totalPages = ref(1);

const memberStore = useMemberStore();
const memberInfo = memberStore.getMemberInfo(); 

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const updatePage = async (page : any) => {
  currentPage.value = page;
  const response = await getMemberAddressT(page - 1);
  addresses.value = response.content;
  totalPages.value = response.totalPages;
};


onMounted(async () => {
  await getMember();
  await updatePage(currentPage.value);
});


const formattedAddresses = computed(() => {
  return (addresses.value as any[]).map((address) => {
    const deliveryName = `${address.roadAddress} ${address.detailAddress} ${address.postCode}`;
    return { ...address, deliveryName };
  });
});

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
        width="150"
        height="150"
        viewBox="0 0 150 150"
        fill="none"
      >
        <circle cx="75" cy="75" r="75" fill="#D9D9D9" />
        <mask id="circle-mask">
          <circle cx="75" cy="75" r="75" fill="white" />
        </mask>
        <image
          :href="memberInfo.profileImgUrl || undefined"
          x="0"
          y="0"
          width="150"
          height="150"
          mask="url(#circle-mask)"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
      <div class="profile-change-button">프로필 변경</div>
    </div>
      <div class="user-info-second-row-second-col">
        <span>이메일</span>
        <span>닉네임</span>
        <span>기본 배송지</span>
      </div>
      <div class="user-info-second-row-third-col">
        <span>{{ memberInfo.email }} </span>
        <span class="info-underline">닉네임</span>
        <span class="info-underline">기본 주소</span>
      </div>
      <div class="user-info-second-row-fourth-col">
        <div class="place-choice-button">배송지 선택</div>
      </div>
    </div>
    <div class="place-add-button" @click="openModal"> 배송지 추가</div>
          <ModalView v-if="isModalVisible" :closeModal="closeModal" />
    <div class="container-inner-title">배송지 관리</div>
    <table v-if="formattedAddresses.length > 0">
    <col width="80px" />
    <col width="100px" />
    <col width="150px" />
    <col width="400px" />
    <col width="80px" />
    <tr class="place-font memberinfo-table-data1">
      <td class="padding-left-10">선택</td>
      <td>배송지명</td>
      <td>전화번호</td>
      <td>배송지 주소</td>
      <td></td>
    </tr>
    <tr v-for="(address, index) in formattedAddresses" :key="index" class="place-font memberinfo-table-data1">
      <td class="padding-left-10">
        <input class="basket-checkbox" type="checkbox" />
      </td>
      <td>{{ address.name }}</td>
      <td>{{ address.phoneNumber }}</td>
      <td>{{ address.roadAddress + ' ' + address.detailAddress + ' ' + address.postCode }}</td>
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
  <div v-else>
      <p>배송지가 비어 있습니다. 배송지를 추가해주세요.</p>
  </div>
  <div class="pagination">
    <button @click="currentPage > 1 && updatePage(currentPage - 1)" class="pagination-button">이전</button>
    <button v-for="page in totalPages" :key="page" @click="updatePage(page)" class="pagination-button">
      {{ page }}
    </button>
    <button @click="currentPage < totalPages && updatePage(currentPage + 1)" class="pagination-button">다음</button>
  </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/member-info.css";
div[hidden] {
  display: none;
}
</style>

