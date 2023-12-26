<script setup lang="ts">
import { readWishListPage, toggleWishList } from '@/apis/wishcart/WishListClient'
import { onBeforeMount, ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type { ReadWishListPageResponse, ReadWishListResponse } from '@/apis/wishcart/WishListDto'

const props = defineProps({
  targetId: {
    type: Number,
    required: false,
    default: null
  }
})

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const requestSize: number = 5
const requestPage = ref<number>(0)

const totalPages = ref<number>(0)
const totalElements = ref<number>(0)
const isMine = ref<boolean>(false)
const wishLists = ref<ReadWishListResponse[]>([])

const isBtnEnabled = ref<boolean>(true)

// TODO : OOTD랑 얘기해서 targetId 연계해야 함
const initData = () => {
  readWishListPage(props.targetId, requestPage.value, requestSize)
    .then((axiosResponse: AxiosResponse) => {
      const response: ReadWishListPageResponse = axiosResponse.data
      totalPages.value = response.totalPages
      totalElements.value = response.totalElements
      isMine.value = response.mine
      wishLists.value = response.responses
    })
    .catch((error: any) => {
      alert(error.response!.data!.message)
    })
}

const executeDelete = (index: number) => {
  if (isBtnEnabled.value === true && confirm('삭제하시겠습니까?')) {
    isBtnEnabled.value = false
    toggleWishList({
      productId: wishLists.value[index].productId,
      productSizeId: wishLists.value[index].productSizeId
    })
      .then((axiosResponse: AxiosResponse) => {
        wishLists.value.splice(index, 1)
      })
      .catch((error: any) => {
        alert(error.response!.data!.message)
      })
      .finally(() => {
        isBtnEnabled.value = true
      })
  }
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
        <td class="center-text"></td>
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
          <span class="prod-price">{{ wishList.productPrice.toLocaleString() }}</span>
        </td>
        <td>
          <button class="wishBtn" v-if="isMine" @click="executeDelete(idx)">삭제</button
          ><button class="wishBtn" v-else>선물</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
@import '@/assets/css/wish.css';
</style>
