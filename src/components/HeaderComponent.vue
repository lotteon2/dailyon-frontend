<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onBeforeMount, onMounted, ref } from 'vue'
import type { Category } from '@/apis/category/CategoryDto'
import HeaderCategoryComponent from '@/components/HeaderCategoryComponent.vue'
import { getChildCategories } from '@/apis/category/CategoryClient'
import type { AxiosResponse } from 'axios'
import { useMemberStore } from '@/stores/member/MemberStore';

const isLoggedIn = () => {
  const token = localStorage.getItem('accessToken')
  const isLoggedIn = !!token
  return isLoggedIn
}

const showCategoryDropdown = ref<boolean>(true)
const rootCategories = ref<Category[]>([])

const memberStore = useMemberStore();
const memberInfo = memberStore.getMemberInfo(); 

onBeforeMount(() => {
  getChildCategories(null)
    .then((axiosResponse: AxiosResponse) => {
      rootCategories.value = axiosResponse.data.categoryResponses
    })
    .catch((error: any) => {
      alert(error.response!.data!.message)
    })
})
</script>

<template>
  <div class="header-top">
    <RouterLink to="/" class="logo-wrapper">
      <div class="logo-text">
        Daily
        <div class="logo-text-highlight">O</div>
        n
      </div>
    </RouterLink>
    <div class="search-wrapper">
      <div class="search-input-wrapper">
        <input class="search-input" placeholder="통합 검색" />
      </div>
      <div class="search-logo-wrapper">
        <svg
          class="search-logo"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
        >
          <path
            d="M23.9227 25.5015L14.367 15.9459C13.604 16.596 12.7266 17.099 11.7347 17.4551C10.7428 17.8111 9.74588 17.9892 8.74382 17.9892C6.30023 17.9892 4.23203 17.1433 2.53922 15.4515C0.846406 13.7587 0 11.691 0 9.2484C0 6.80583 0.845388 4.73712 2.53617 3.04227C4.22796 1.34641 6.29514 0.498474 8.73772 0.498474C11.1813 0.498474 13.2505 1.34488 14.9454 3.03769C16.6402 4.7305 17.4876 6.79921 17.4876 9.24382C17.4876 10.3039 17.2999 11.3298 16.9246 12.3217C16.5482 13.3136 16.0548 14.162 15.4444 14.867L25 24.4211L23.9211 25.5015H23.9227ZM8.74382 16.4617C10.7683 16.4617 12.4779 15.7648 13.8726 14.3711C15.2663 12.9774 15.9632 11.2678 15.9632 9.24229C15.9632 7.21784 15.2663 5.50875 13.8726 4.11503C12.4789 2.72131 10.7698 2.02445 8.74535 2.02445C6.72089 2.02445 5.01129 2.72131 3.61655 4.11503C2.22283 5.50875 1.52597 7.21784 1.52597 9.24229C1.52597 11.2668 2.22283 12.9758 3.61655 14.3696C5.01027 15.7633 6.71936 16.4617 8.74382 16.4617Z"
            fill="#C22727"
          />
        </svg>
      </div>
    </div>
    <div class="auth-wrapper">
    <RouterLink v-if="!isLoggedIn()" to="/login" class="login-text">Login</RouterLink>
    <div v-else class="login-text">
      <img v-if="memberInfo.profileImgUrl" :src="memberInfo.profileImgUrl" alt="Profile Image" class="profile-image" />
      <span v-if="memberInfo.email">{{ memberInfo.email }} 환영합니다!</span>
    </div>
    </div>
  </div>
  <div class="header-divide-line-wrapper">
    <div class="header-divide-line"></div>
  </div>
  <nav class="header-bottom">
    <div class="category-dropdown">
      <div
        class="category-select-wrapper"
        @mouseover="showCategoryDropdown = true"
        @mouseleave="showCategoryDropdown = false"
      >
        <div class="category-select-line-wrapper">
          <div class="category-select-line"></div>
        </div>
        <div class="category-select-line-wrapper">
          <div class="category-select-line"></div>
        </div>
        <div class="category-select-line-wrapper">
          <div class="category-select-line"></div>
        </div>
      </div>
      <HeaderCategoryComponent :show-dropdown="showCategoryDropdown" :categories="rootCategories" />
    </div>
    <div class="nav-tab-wrapper">
      <RouterLink to="/luxury" class="nav-tab-text" :class="{ selected: $route.path === '/luxury' }"
        >LUXURY</RouterLink
      >
    </div>
    <div class="nav-tab-wrapper">
      <RouterLink
        to="/fashions"
        class="nav-tab-text"
        :class="{ selected: $route.path === '/fashions' }"
        >FASHION</RouterLink
      >
    </div>
    <div class="nav-tab-wrapper">
      <RouterLink to="/ootds" class="nav-tab-text" :class="{ selected: $route.path === '/ootds' }"
        >OOTD</RouterLink
      >
    </div>
    <div class="nav-tab-wrapper">
      <RouterLink to="/events" class="nav-tab-text" :class="{ selected: $route.path === '/events' }"
        >EVENT</RouterLink
      >
    </div>
    <div class="nav-tab-wrapper">
      <RouterLink to="/notifications" class="nav-tab-icon">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="black">
          <g clip-path="url(#clip0_197_30)">
            <path
              class="nav-tab-icon"
              d="M32.51 27.83C31.5457 26.9704 30.7015 25.9849 30 24.9C29.2343 23.4026 28.7753 21.7673 28.65 20.09V15.15C28.6567 12.5156 27.7011 9.9695 25.9628 7.99C24.2245 6.0105 21.8232 4.73388 19.21 4.40002V3.11002C19.21 2.75596 19.0694 2.4164 18.819 2.16604C18.5687 1.91568 18.2291 1.77502 17.875 1.77502C17.521 1.77502 17.1814 1.91568 16.9311 2.16604C16.6807 2.4164 16.54 2.75596 16.54 3.11002V4.42002C13.9503 4.77795 11.578 6.06228 9.86258 8.03513C8.14713 10.008 7.20478 12.5357 7.21005 15.15V20.09C7.0848 21.7673 6.62583 23.4026 5.86005 24.9C5.17093 25.9824 4.34024 26.9678 3.39005 27.83C3.28338 27.9237 3.19789 28.0391 3.13927 28.1684C3.08064 28.2977 3.05023 28.438 3.05005 28.58V29.94C3.05005 30.2052 3.15541 30.4596 3.34294 30.6471C3.53048 30.8347 3.78483 30.94 4.05005 30.94H31.85C32.1153 30.94 32.3696 30.8347 32.5572 30.6471C32.7447 30.4596 32.85 30.2052 32.85 29.94V28.58C32.8499 28.438 32.8195 28.2977 32.7608 28.1684C32.7022 28.0391 32.6167 27.9237 32.51 27.83ZM5.13005 28.94C6.06046 28.0412 6.87965 27.034 7.57005 25.94C8.53466 24.1315 9.09748 22.136 9.22005 20.09V15.15C9.18039 13.9781 9.37697 12.8101 9.79809 11.7157C10.2192 10.6213 10.8563 9.62281 11.6713 8.77973C12.4863 7.93664 13.4627 7.26619 14.5422 6.8083C15.6218 6.3504 16.7824 6.11443 17.955 6.11443C19.1277 6.11443 20.2883 6.3504 21.3679 6.8083C22.4474 7.26619 23.4238 7.93664 24.2388 8.77973C25.0538 9.62281 25.6909 10.6213 26.112 11.7157C26.5331 12.8101 26.7297 13.9781 26.6901 15.15V20.09C26.8126 22.136 27.3754 24.1315 28.34 25.94C29.0305 27.034 29.8496 28.0412 30.7801 28.94H5.13005Z"
            />
            <path
              class="nav-tab-icon"
              d="M17.9999 34.28C18.6299 34.2655 19.2344 34.0287 19.7065 33.6114C20.1787 33.1942 20.4881 32.6234 20.5799 32H15.3199C15.4144 32.6403 15.7383 33.2245 16.2312 33.6439C16.7242 34.0633 17.3528 34.2894 17.9999 34.28Z"
            />
          </g>
          <defs>
            <clipPath id="clip0_197_30">
              <rect width="36" height="36" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </RouterLink>
    </div>
    <div class="nav-tab-wrapper">
      <RouterLink to="/carts" class="nav-tab-icon">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 24" fill="black">
          <path
            class="nav-tab-icon"
            d="M1.25954 10.1344L0.0147421 21.3344L1.60514 21.512L2.84994 10.3104L1.25954 10.1344ZM2.40034 24H18.0259V22.4H2.40034V24ZM20.4115 21.3344L19.1667 10.1344L17.5763 10.3104L18.8211 21.512L20.4115 21.3344ZM16.7795 8H3.64674V9.6H16.7827V8H16.7795ZM19.1667 10.1344C19.1014 9.54744 18.8219 9.00518 18.3818 8.61139C17.9416 8.2176 17.3701 7.99992 16.7795 8L16.7811 9.6C16.9781 9.59999 17.1681 9.67262 17.3148 9.804C17.4616 9.93537 17.5547 10.1163 17.5763 10.312L19.1667 10.1344ZM18.0259 24C18.3634 23.9998 18.6971 23.9285 19.0051 23.7906C19.3131 23.6528 19.5886 23.4515 19.8136 23.1999C20.0386 22.9484 20.208 22.6522 20.3107 22.3308C20.4135 22.0093 20.4489 21.6698 20.4115 21.3344L18.8211 21.512C18.8338 21.6239 18.8226 21.7357 18.7884 21.843C18.7542 21.9503 18.6977 22.0492 18.6226 22.1332C18.5476 22.2171 18.4556 22.2843 18.3528 22.3303C18.25 22.3763 18.1386 22.4 18.0259 22.4V24ZM0.0147421 21.3344C-0.0226202 21.6699 0.0112298 22.0096 0.114081 22.3311C0.216932 22.6527 0.38647 22.949 0.611618 23.2005C0.836766 23.4521 1.11246 23.6533 1.42068 23.7911C1.72891 23.9289 2.06273 24 2.40034 24V22.4C2.28786 22.4 2.17663 22.3763 2.07393 22.3304C1.97123 22.2845 1.87936 22.2175 1.80432 22.1337C1.72928 22.0499 1.67275 21.9512 1.63843 21.8441C1.60411 21.737 1.59277 21.6238 1.60514 21.512L0.0147421 21.336V21.3344ZM2.84994 10.3104C2.87197 10.1149 2.96524 9.93444 3.11193 9.8034C3.25862 9.67235 3.45004 9.59994 3.64674 9.6V8C3.05643 8.00031 2.48533 8.21817 2.04553 8.61192C1.60573 9.00568 1.32487 9.54771 1.25954 10.1344L2.84994 10.3104ZM6.21314 6.4V5.6H4.61314V6.4H6.21314ZM14.2131 5.6V6.4H15.8131V5.6H14.2131ZM10.2131 1.6C11.274 1.6 12.2914 2.02143 13.0416 2.77157C13.7917 3.52172 14.2131 4.53913 14.2131 5.6H15.8131C15.8131 4.11479 15.2231 2.69041 14.1729 1.6402C13.1227 0.589998 11.6984 0 10.2131 0V1.6ZM6.21314 5.6C6.21314 4.53913 6.63457 3.52172 7.38471 2.77157C8.13486 2.02143 9.15228 1.6 10.2131 1.6V0C8.72793 0 7.30355 0.589998 6.25334 1.6402C5.20314 2.69041 4.61314 4.11479 4.61314 5.6H6.21314Z"
          />
        </svg>
      </RouterLink>
    </div>
    <div class="nav-tab-wrapper">
      <RouterLink to="/wishlist" class="nav-tab-like-icon">
        <svg
          class="nav-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 19"
          fill="white"
          stroke="black"
        >
          <path
            class="nav-tab-like-icon"
            d="M9.05489 16.4754L9.05381 16.4744C6.46406 14.126 4.37492 12.2274 2.92445 10.4529C1.48222 8.68839 0.75 7.13843 0.75 5.5C0.75 2.82511 2.83332 0.75 5.5 0.75C7.01327 0.75 8.4781 1.45834 9.43087 2.56846L10 3.23157L10.5691 2.56846C11.5219 1.45834 12.9867 0.75 14.5 0.75C17.1667 0.75 19.25 2.82511 19.25 5.5C19.25 7.13843 18.5178 8.68839 17.0756 10.4529C15.6251 12.2274 13.5359 14.126 10.9462 16.4744L10.9451 16.4754L10 17.3358L9.05489 16.4754Z"
            stroke-width="1.5"
          />
        </svg>
      </RouterLink>
    </div>
    <div class="nav-tab-wrapper">
      <RouterLink to="/my-page" class="nav-tab-icon">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" fill="black">
          <path
            class="nav-tab-icon"
            d="M12.5 10.7143C11.0262 10.7143 9.76488 10.1893 8.71607 9.13929C7.66726 8.08929 7.14286 6.82857 7.14286 5.35714C7.14286 3.88333 7.66726 2.62143 8.71607 1.57143C9.76488 0.523809 11.0262 0 12.5 0C13.9738 0 15.2351 0.523809 16.2839 1.57143C17.3327 2.62143 17.8571 3.88333 17.8571 5.35714C17.8571 6.82976 17.3327 8.09048 16.2839 9.13929C15.2351 10.1881 13.9738 10.7131 12.5 10.7143ZM0 23.625V20.6875C0 19.9506 0.214286 19.2613 0.642857 18.6196C1.07262 17.9768 1.65 17.478 2.375 17.1232C4.06071 16.3149 5.74702 15.7089 7.43393 15.3054C9.12202 14.9006 10.8107 14.6982 12.5 14.6982C14.1905 14.6982 15.8792 14.9006 17.5661 15.3054C19.253 15.7101 20.9387 16.3161 22.6232 17.1232C23.3494 17.478 23.9268 17.9768 24.3554 18.6196C24.7851 19.2613 25 19.9506 25 20.6875V23.6268L0 23.625ZM1.78571 21.8393H23.2143V20.6857C23.2143 20.2905 23.0869 19.9185 22.8321 19.5696C22.5762 19.222 22.2226 18.928 21.7714 18.6875C20.3024 17.9756 18.7869 17.4304 17.225 17.0518C15.6655 16.672 14.0905 16.4821 12.5 16.4821C10.9107 16.4821 9.33571 16.672 7.775 17.0518C6.2131 17.4304 4.69762 17.9756 3.22857 18.6875C2.77619 18.928 2.42262 19.222 2.16786 19.5696C1.9131 19.9185 1.78571 20.2911 1.78571 20.6875V21.8393ZM12.5 8.92857C13.4821 8.92857 14.3232 8.57857 15.0232 7.87857C15.7232 7.17857 16.0726 6.3381 16.0714 5.35714C16.0714 4.375 15.7214 3.53393 15.0214 2.83393C14.3214 2.13393 13.481 1.78452 12.5 1.78571C11.5179 1.78571 10.6768 2.13512 9.97679 2.83393C9.27679 3.53274 8.92738 4.37381 8.92857 5.35714C8.92857 6.33929 9.27857 7.17976 9.97857 7.87857C10.6786 8.57738 11.519 8.92738 12.5 8.92857Z"
          />
        </svg>
      </RouterLink>
    </div>
  </nav>
  <div class="header-divide-line-wrapper">
    <div class="header-divide-bold-line"></div>
  </div>
</template>

<style scoped>
@import '@/assets/header.css';

</style>