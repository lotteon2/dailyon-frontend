<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getBestProducts, getNewProducts } from '@/apis/product/ProductClient'
import type { ReadCacheProductResponse } from '@/apis/product/ProductDto'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const newProducts = ref<ReadCacheProductResponse[]>([
  {
    id: 0,
    brandName: '',
    code: '',
    categoryName: '',
    imgUrl: '',
    name: '',
    price: 0
  }
])

const bestProducts = ref<ReadCacheProductResponse[]>([
  {
    id: 0,
    brandName: '',
    code: '',
    categoryName: '',
    imgUrl: '',
    name: '',
    price: 0
  }
])

const fetchNewProduct = async () => {
  const newProductData = await getNewProducts()
  newProducts.value = newProductData.responses.slice(
    0,
    Math.min(newProductData.responses.length, 4)
  )
}

const fetchBestProduct = async () => {
  const bestProductData = await getBestProducts()
  bestProducts.value = bestProductData.responses.slice(
    0,
    Math.min(bestProductData.responses.length, 4)
  )
}

onBeforeMount(fetchBestProduct)
onBeforeMount(fetchNewProduct)
</script>

<template>
  <div class="main-container">
    <div class="md-container">
      <div class="md-prod-container">
        <div class="info-wrapper">
          <RouterLink class="banner" to="/auctions">
            <img class="banner-img" src="@/assets/images/bid-banner.png" alt="" />
          </RouterLink>
          <RouterLink class="banner" to="/ootds">
            <img class="banner-img" src="@/assets/images/ootd-banner.png" alt="" />
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="new-container">
      <h1>신상품</h1>
      <div class="new-more-wrapper">
        <RouterLink to="/new-products" class="new-more-btn-wrapper">
          <span>더보기</span>
          <svg
            width="11"
            height="20"
            viewBox="0 0 11 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.998998 19.9999C0.867977 20.0015 0.738073 19.9757 0.617638 19.9241C0.497202 19.8725 0.388901 19.7962 0.299699 19.7002C-0.0998997 19.3006 -0.0998997 18.6813 0.299699 18.2817L8.59138 9.98997L0.299699 1.71828C-0.0998997 1.31868 -0.0998997 0.699298 0.299699 0.299699C0.699298 -0.0998998 1.31868 -0.0998998 1.71828 0.299699L10.6893 9.31066C11.0889 9.71026 11.0889 10.3296 10.6893 10.7292L1.6983 19.7002C1.4985 19.9 1.23876 19.9999 0.998998 19.9999Z"
              fill="#C6C6C6"
            />
          </svg>
        </RouterLink>
      </div>
      <div class="new-prod-wrapper">
        <div class="new-prod-grid">
          <RouterLink
            v-for="(newProduct, index) in newProducts"
            :to="`/products/${newProduct.id}`"
            class="new-prod-info"
          >
            <img :src="`${VITE_STATIC_IMG_URL}${newProduct.imgUrl}?w=200&h=200&q=95`" alt="" />
            <h1>{{ newProduct.brandName }}</h1>
            <h2>{{ newProduct.name }}</h2>
            <h3>{{ newProduct.price.toLocaleString() }}원</h3>
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="new-container">
      <h1>베스트 상품</h1>
      <div class="new-more-wrapper">
        <RouterLink to="/best-products" class="new-more-btn-wrapper">
          <span>더보기</span>
          <svg
            width="11"
            height="20"
            viewBox="0 0 11 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.998998 19.9999C0.867977 20.0015 0.738073 19.9757 0.617638 19.9241C0.497202 19.8725 0.388901 19.7962 0.299699 19.7002C-0.0998997 19.3006 -0.0998997 18.6813 0.299699 18.2817L8.59138 9.98997L0.299699 1.71828C-0.0998997 1.31868 -0.0998997 0.699298 0.299699 0.299699C0.699298 -0.0998998 1.31868 -0.0998998 1.71828 0.299699L10.6893 9.31066C11.0889 9.71026 11.0889 10.3296 10.6893 10.7292L1.6983 19.7002C1.4985 19.9 1.23876 19.9999 0.998998 19.9999Z"
              fill="#C6C6C6"
            />
          </svg>
        </RouterLink>
      </div>
      <div class="new-prod-wrapper">
        <div class="new-prod-grid">
          <RouterLink
            v-for="(bestProduct, index) in bestProducts"
            :to="`/products/${bestProduct.id}`"
            class="new-prod-info"
          >
            <img :src="`${VITE_STATIC_IMG_URL}${bestProduct.imgUrl}?w=200&h=200&q=95`" alt="" />
            <h1>{{ bestProduct.brandName }}</h1>
            <h2>{{ bestProduct.name }}</h2>
            <h3>{{ bestProduct.price.toLocaleString() }}원</h3>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/home.css';
</style>
