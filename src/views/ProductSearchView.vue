<script setup lang="ts">
import { inject, onBeforeMount, type Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { ReadProductResponse, ReadProductSliceResponse } from '@/apis/product/ProductDto'
import { searchProduct } from '@/apis/product/ProductClient'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const route = useRoute()

const hasNext = ref<boolean>(true)
const lastId = ref<number>(0)
const searchQuery = ref<string | null>(null)
const products = ref<ReadProductResponse[]>([])

const initData = async () => {
  if (route.query.query !== null) {
    searchQuery.value = String(route.query.query)
  }

  const response: ReadProductSliceResponse = await searchProduct(lastId.value, searchQuery.value)
  hasNext.value = response.hasNext
  lastId.value = response.productResponses[response.productResponses.length - 1].id
  products.value = [...products.value, ...response.productResponses]

  console.log(lastId.value)
}

onBeforeMount(initData)

const isScrollEnd = inject<Ref<boolean | undefined>>('isScrollEnd') as Ref<boolean | undefined>
watch(isScrollEnd, async (after, before) => {
  if (after !== before && hasNext.value) {
    const response: ReadProductSliceResponse = await searchProduct(lastId.value, searchQuery.value)
    hasNext.value = response.hasNext
    lastId.value = response.productResponses[response.productResponses.length - 1].id
    products.value = [...products.value, ...response.productResponses]
  }
})
</script>

<template>
  <div class="product-search-container">
    <div class="product-search-result">
      <p class="search-label">검색 결과</p>
      <p class="search-query">{{ searchQuery }}</p>
    </div>
    <div class="product-list-container">
      <RouterLink
        class="prod-info"
        v-for="(product, index) in products"
        :to="`/products/${product.id}`"
        :key="product.id"
      >
        <img
          class="product-img"
          :src="`${VITE_STATIC_IMG_URL}${product.imgUrl}?w=200&h=200`"
          alt="productImg"
        />
        <h1>{{ product.brandName }}</h1>
        <h2>{{ product.name }}</h2>
        <div class="product-third-info">
          <div class="product-aggregate">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20"
              height="20"
              style="padding-right: 3px"
            >
              <path
                fill="black"
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
              />
            </svg>
            <h1>{{ product.avgRating.toFixed(1) }} | ({{ product.reviewCount }})</h1>
          </div>
          <div>
            <h3>{{ product.price.toLocaleString() }}원</h3>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.product-search-container {
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-search-result {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 25vw;
  padding-bottom: 20px;
}

.search-label {
  font-family: TheJamsil;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5vw;
}

.search-query {
  font-family: TheJamsil;
  font-style: normal;
  font-size: 1.5vw;
}

.product-list-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
}

.prod-info {
  display: flex;
  flex-direction: column;
  flex-basis: calc(25% - 40px);
  margin: 20px;
}

.prod-info > h1 {
  color: var(--Grayscale7, #000);
  font-family: TheJamsil;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
}

.prod-info > h2 {
  color: var(--Grayscale7, #000);
  font-family: TheJamsil;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 30px;
}

.product-third-info {
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: var(--Grayscale7, #000);
  font-family: TheJamsil;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 120% */
}

.product-aggregate {
  display: flex;
  align-items: center;
}

.product-img {
  width: 200px;
  height: 200px;
}
</style>