<script setup lang="ts">
import { ref, onMounted, computed, watch, onBeforeMount } from 'vue'
import ModalView from './AddressModal.vue'
import { useMemberStore } from '@/stores/member/MemberStore'
import {
  getMember,
  setMember,
  getMemberAddress,
  getDefaultAddress,
  setDefaultAddress,
  getImgUrl,
  leaveMember
} from '@/apis/member/member'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import type { MemberInfoDto } from '@/apis/member/MemberDto'
import { deleteAddress } from '@/apis/member/member'
import { uploadImageToS3 } from '@/apis/s3/S3Client'

const isModalVisible = ref(false)
const addresses = ref([])

const memberStore = useMemberStore()
const memberInfo = memberStore.getMemberInfo()
const defaultAddress = ref()

const requestPage = ref<number>(0)
const totalPages = ref<number>()
const totalElements = ref<number>()

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const openModal = () => {
  selectedAddress.value = {isDefault: false};
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}

const setDefault = async (addressId: number) => {
  setDefaultAddress(addressId)
  alert('기본 배송지가 저장되었습니다.')

  window.location.reload()
}

const deleteAdd = async (addressId: number) => {
  if (confirm("정말로 삭제하시겠습니까?")) {
    deleteAddress(addressId)
    alert('배송지가 삭제되었습니다.')
    window.location.reload()
    }
 
}

onMounted(async () => {
  await getMember()
  const addressData = await getDefaultAddress()
  defaultAddress.value = await getDefaultAddress()
})

const formattedAddresses = computed(() => {
  return (addresses.value as any[]).map((address) => {
    const deliveryName = `${address.roadAddress} ${address.detailAddress} ${address.postCode}`
    return { ...address, deliveryName }
  })
})

const onChangePage = async (page: number) => {
  if (page >= 0 && page < totalPages.value!) {
    requestPage.value = page
  }
}

onBeforeMount(async () => {
  const response = await getMemberAddress(0)
  addresses.value = response.content
  totalPages.value = response.totalPages
  totalElements.value = response.totalElements
})

watch(requestPage, async (afterPage, beforePage) => {
  if (afterPage < totalPages.value!) {
    const response = await getMemberAddress(afterPage)
    addresses.value = response.content
    totalPages.value = response.totalPages
    totalElements.value = response.totalElements
  }
})

onMounted(async () => {
  await getMember()
  const addressData = await getDefaultAddress()
  defaultAddress.value = await getDefaultAddress()
})

const selectedAddress = ref({});



const openModalWithAddress = (address: any) => {
  selectedAddress.value = address;
  isModalVisible.value = true;
}



const setMemberInfo = async () => {
  const memberDto: MemberInfoDto = {
    nickname: memberInfo.nickname ?? "",
    birth: memberInfo.birth ?? "",
    gender: memberInfo.gender ?? "",
  }

  if (confirm("수정된 정보를 저장하시겠습니까?")) {
    setMember(memberDto);
    await getMember()
    alert("수정이 완료되었습니다!")
    window.location.reload();

    }
}

const leave = async() => {
  if (confirm("정말 탈퇴하시겠습니까?")) {
    await leaveMember();
    alert("정상적으로 탈퇴 되었습니다.")
    localStorage.clear();
    window.location.href = '/login';
  }
}

const fileInput = ref<HTMLInputElement | null>(null);
const inputPostImgFile = ref<File>()
const formData = new FormData();

const openFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}


const handleFileChange = async (event: Event) => {
  const imgPreSignedUrl = await getImgUrl();
  
    const fileInput = event.target as HTMLInputElement
    if (fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0]
      inputPostImgFile.value = file
      
      await uploadImageToS3(imgPreSignedUrl, inputPostImgFile.value)
      await getMember()
      window.location.reload();
    }
}



</script>

<template>
  <div class="user-info-container">
    <div class="container-title">회원정보 수정</div>
    <div class="container-line"></div>
    <div class="user-info-first-row">
      <div class="container-inner-title">기본 정보</div>
      <div class="modify-button-wrapper">
        <div class="modify-white leave-red" @click="leave">회원 탈퇴</div>
        <div class="modify-white modify-black" @click="setMemberInfo">수정 완료</div>
      </div>
    </div>
    <div class="user-info-second-row">
      <div class="user-info-second-row-first-col">
        <svg class="profile-circle" width="150" height="150" viewBox="0 0 150 150" fill="none">
          <circle cx="75" cy="75" r="75" fill="#D9D9D9" />
          <mask id="circle-mask">
            <circle cx="75" cy="75" r="75" fill="white" />
          </mask>
          <image
            :href="`${VITE_STATIC_IMG_URL}${memberInfo.profileImgUrl}` || undefined"
            x="0"
            y="0"
            width="150"
            height="150"
            mask="url(#circle-mask)"
            preserveAspectRatio="xMidYMid slice"
          />
        </svg>
        <div class="profile-change-button" @click="openFileInput">프로필 변경</div>
        <input ref="fileInput" type="file" style="display: none" @change="handleFileChange">
      </div>
      <div class="user-info-second-row-second-col">
        <span>이메일</span>
        <span>닉네임</span>
        <span>성별</span>
        <span>연령대</span>
        <span>기본 배송지</span>
      </div>
      <div class="user-info-second-row-third-col">
        <span>{{ memberInfo.email }} </span>
        <input type="text" v-model="memberInfo.nickname" class="info-underline" />
        <select v-model="memberInfo.gender" class="info-underline">
            <option value="" disabled hidden>{{memberInfo.gender ? memberInfo.gender : "선택해주세요"}}</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
        </select>
        <select v-model="memberInfo.birth" class="info-underline">
            <option value="" disabled hidden>{{memberInfo.birth ? memberInfo.birth : "선택해주세요"}}</option>
            <option value="0~9">0~9</option>
            <option value="10~19">10~19</option>
            <option value="20~29">20~29</option>
            <option value="30~39">30~39</option>
            <option value="40~49">40~49</option>
            <option value="50~59">50~59</option>
            <option value="60+">60+</option>
        </select>
        <span class="info-underline">{{
          defaultAddress?.roadAddress && defaultAddress?.detailAddress
            ? defaultAddress.roadAddress + ' ' + defaultAddress.detailAddress
            : '기본 배송지가 없습니다.'
        }}</span>
      </div>
    </div>
    <div class="container-inner-title">배송지 관리</div>
    <div class="place-add-button" @click="openModal">배송지 추가</div>
    <ModalView v-if="isModalVisible" :closeModal="closeModal" :selectedAddress="selectedAddress" />
    <table v-if="formattedAddresses.length > 0">
      <col width="150px" />
      <col width="200px" />
      <col width="400px" />
      <col width="50px" />
      <col width="50px" />
      <col width="50px" />
      <tr class="place-font memberinfo-table-data1">
        <td class="padding-left-10">배송지명</td>
        <td>전화번호</td>
        <td>배송지 주소</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr
        v-for="(address, index) in formattedAddresses"
        :key="index"
        class="place-font memberinfo-table-data1"
      >
        <td class="padding-left-10">{{ address.name }}</td>
        <td>{{ address.phoneNumber }}</td>
        <td>{{ address.roadAddress + ' ' + address.detailAddress + ' ' + address.postCode }}</td>
        <td>
          <div
            class="place-add-button"
            @click="!address.isDefault && setDefault(address.id)"
            :class="{ 'default-button': address.isDefault }"
          >
            {{ address.isDefault ? '기본' : '기본 지정' }}
          </div>
        </td>
        <td>
          <div class="close-button-div" @click="openModalWithAddress(address)" >
            <svg
              class="margin-right-10"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M7.29289 12.2929L1.70711 17.8787C1.31658 18.2692 0.683417 18.2692 0.292893 17.8787C-0.0976308 17.4882 -0.0976308 16.855 0.292893 16.4645L5.87868 10.8787L15.7071 1.05025C16.0976 0.659728 16.7308 0.659728 17.1213 1.05025C17.5118 1.44077 17.5118 2.07393 17.1213 2.46446L7.29289 12.2929Z"
                fill="black"
              />
              <path
                d="M6.41421 13.1716L7.17157 12.4142L8.82843 14.0711L8.07107 14.8284L6.41421 13.1716Z"
                fill="black"
              />
            </svg>
          </div>
        </td>
        
        <td>
          <div class="close-button-div" @click="deleteAdd(address.id)">
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
    <br />
    <div class="pagination">
      <PaginationComponent
        :onChangePage="onChangePage"
        :requestPage="requestPage"
        :totalPages="totalPages"
      />
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/member-info.css';
</style>
