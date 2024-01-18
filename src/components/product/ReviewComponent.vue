<script setup lang="ts">
import { ref, onBeforeMount, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getProductReviews } from '@/apis/review/review'
import type { ReviewResponse } from '@/apis/review/reviewDto'
import { Rate, Avatar } from 'ant-design-vue'
import PaginationComponent from '../ootd/PaginationComponent.vue'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'
const props = defineProps({
  productName: {
    type: String,
    required: true
  }
})
const requestPage = ref<any>({
  page: 0,
  sort: 'DESC',
  order: 'RECENT'
})
const route = useRoute()

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const productId = ref<number>(Number(route.params.id))
const reviews = ref<ReviewResponse[]>()
const totalElements = ref<number>()
const totalPages = ref<number>()

const fetchDefaultData = async (requestPage: any, productId: number): Promise<void> => {
  const data = await getProductReviews(requestPage.value, productId)
  reviews.value = data.reviews
  totalElements.value = data.totalElements
  totalPages.value = data.totalPages
}

const onChangePage = async (page: number) => {
  if (page >= 0 && page < totalPages.value!) {
    requestPage.value.page = page
  }
}

watchEffect(() => {
  fetchDefaultData(requestPage, productId.value), requestPage.value
})
</script>

<template>
  <WhitePageComponent v-if='reviews?.length === 0' message="등록된 상품 후기가 없습니다" />
  <div v-else>
    <div class="review-container" v-if="reviews?.length">
      <div class="container-title">전체 ({{ totalElements }})</div>
      <div class="container-line"></div>
      <div v-for="(review, index) in reviews" :key="index" class="review-row">
        <div class="review-row-left">
          <div class="review-row-left-col"></div>
          <Avatar :src="`${VITE_STATIC_IMG_URL}${review.profileImgUrl}`" :size="85"></Avatar>
          <div class="review-first-column">
            <span>{{ review.nickname }}</span>
            <div class="review-star-container">
              <Rate class="star-rating" v-model:value="review.rating" allow-half disabled />
            </div>
          </div>
          <div class="review-second-column">
            <div class="review-text-container1">
              <h1>상품 명 : {{ props.productName }} - 상품 옵션 : {{ review.productSize }}</h1>
              <h2>작성일 : {{ review.createdAt }}</h2>
            </div>
            <span>{{ review.description }}</span>
          </div>
        </div>
        <div class="review-row-right">
          <div v-if='review.imgUrl === null' class="review-prod-img">이미지 없음</div>
          <img v-else class="review-prod-img" :src="`${VITE_STATIC_IMG_URL}${review.imgUrl}`" alt="" />
        </div>
      </div>
    </div>
    <PaginationComponent
      :onChangePage="onChangePage"
      :requestPage="requestPage.page"
      :totalPages="totalPages"
    />
  </div>
</template>

<style scoped>
@import '@/assets/css/review.css';
.ant-avatar {
  margin-right: 10px;
}
</style>
