<script setup lang="ts">
import { readWishListPage } from '@/apis/wishcart/WishListClient'
import { onBeforeMount, ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type { ReadWishListPageResponse, ReadWishListResponse } from '@/apis/wishcart/WishListDto'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const requestSize: number = 5
const requestPage = ref<number>(0)

const totalPages = ref<number>(0)
const totalElements = ref<number>(0)
const isMine = ref<boolean>(false)
const wishLists = ref<ReadWishListResponse[]>([])

// TODO : OOTD랑 얘기해서 targetId 연계해야 함
const initData = () => {
  readWishListPage(null, requestPage.value, requestSize)
    .then((axiosResponse: AxiosResponse) => {
      const response: ReadWishListPageResponse = axiosResponse.data
      totalPages.value = response.totalPages
      totalElements.value = response.totalElements
      isMine.value = response.isMine
      wishLists.value = response.responses
    })
    .catch()
}

onBeforeMount(initData)
</script>

<template>
  <div class="jjim-prod-container">
    <div class="container-title">찜한 상품</div>
    <div class="container-line"></div>
    <table>
      <tr class="wish-table-data1">
        <td class="left-margin"></td>
        <td class="left-align">브랜드</td>
        <td class="left-align">상품명</td>
        <td class="center-text">판매 가격</td>
        <td></td>
      </tr>
      <tr v-for="(wishList, idx) in wishLists" :key="idx" class="wish-table-data2">
        <td class="left-margin">
          <img class="basket-img" :src="`${VITE_STATIC_IMG_URL}${wishList.imgUrl}`" alt="" />
        </td>
        <td class="left-align">{{ wishList.brandName }}</td>
        <td class="left-align">
          <div class="basket-column">
            <h1>{{ wishList.productName }}</h1>
            <h2>{{ wishList.productSizeName }}</h2>
          </div>
        </td>
        <td class="center-text">
          <span class="prod-price">{{ wishList.productPrice }}</span>
        </td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
@import '@/assets/css/wish.css';
</style>