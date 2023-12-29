<script setup lang="ts">
import { readWishListPage, toggleWishList } from '@/apis/wishcart/WishListClient'
import { onBeforeMount, ref, watch } from 'vue'
import type { AxiosResponse } from 'axios'
import type { ReadWishListPageResponse, ReadWishListResponse } from '@/apis/wishcart/WishListDto'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'

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

const onChangePage = async (page: number) => {
  if (0 <= page && page < totalPages.value) {
    requestPage.value = page
  }
}

watch(requestPage, async (afterPage: number, beforePage: number) => {
  if (afterPage < totalPages.value) {
    readWishListPage(props.targetId, afterPage, requestSize)
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
})
</script>

<template>
  <div v-if="wishLists.length > 0" class="jjim-prod-container">
    <div class="container-title">찜한 상품</div>
    <div class="container-line"></div>
    <table>
      <tr class="wish-table-data1">
        <td class="left-margin"></td>
        <td class="center-text">브랜드</td>
        <td class="center-text">상품명</td>
        <td class="center-text">판매 가격</td>
        <td></td>
      </tr>
      <tr v-for="(wishList, idx) in wishLists" :key="idx" class="wish-table-data2">
        <td class="left-margin">
          <img
            class="basket-img"
            :src="`${VITE_STATIC_IMG_URL}${wishList.imgUrl}?w=100&h=100`"
            alt=""
          />
        </td>
        <td class="center-text">{{ wishList.brandName }}</td>
        <td class="center-text">
          <div class="basket-column">
            <h1>{{ wishList.productName }}</h1>
            <h2>{{ wishList.productSizeName }}</h2>
          </div>
        </td>
        <td class="center-text">
          <span class="prod-price">{{ wishList.productPrice.toLocaleString() }}원</span>
        </td>
        <td>
          <button class="wishBtn" v-if="isMine" @click="executeDelete(idx)">삭제</button
          ><button class="wishBtn" v-else>선물</button>
        </td>
      </tr>
    </table>
    <div style="padding-top: 10px" />
    <PaginationComponent
      :on-change-page="onChangePage"
      :total-pages="totalPages"
      :request-page="requestPage"
    />
  </div>
  <WhitePageComponent v-else message="찜한 상품이 없습니다" />
</template>

<style scoped>
@import '@/assets/css/wish.css';
</style>
