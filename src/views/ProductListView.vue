<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import type { AxiosResponse } from 'axios'
import { useRoute } from 'vue-router'
import type { ReadProductResponse, ReadProductSliceResponse } from '@/apis/product/ProductDto'
import { getProductSlice } from '@/apis/product/ProductClient'
import BreadCrumbComponent from '@/components/product/BreadCrumbComponent.vue'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const route = useRoute()

const categoryId = ref<number | null>(null)
const brandId = ref<number | null>(null)
const gender = ref<string | null>(null)
const type = ref<string | null>(null)

const hasNext = ref<boolean>(true)
const lastId = ref<number>(0)
const products = ref<ReadProductResponse[]>([])

const initData = () => {
  if (route.query.brand) {
    brandId.value = Number(route.query.brand)
  }

  if (route.query.gender) {
    gender.value = String(route.query.gender)
  }

  if (route.query.type) {
    type.value = String(route.query.type)
  }

  if (route.query.category) {
    categoryId.value = Number(route.query.category)
  }

  getProductSlice(lastId.value, brandId.value, categoryId.value, gender.value, type.value)
    .then((axiosResponse: AxiosResponse) => {
      const response: ReadProductSliceResponse = axiosResponse.data
      hasNext.value = response.hasNext
      lastId.value = response.productResponses[response.productResponses.length - 1].id
      products.value = [...products.value, ...response.productResponses]
    })
    .catch((error: any) => {
      alert(error.response!.data!.message)
    })
}

onBeforeMount(initData)
</script>

<template>
  <div style="width: 50vw">
    <BreadCrumbComponent :category="categoryId" />
    <div class="product-list-container">
      <a
        v-for="(product, index) in products"
        :key="product.id"
        class="prod-info"
        :href="`/products/${product.id}`"
      >
        <img :src="`${VITE_STATIC_IMG_URL}${product.imgUrl}`" alt="productImg" />
        <h1>{{ product.brandName }}</h1>
        <h2>{{ product.name }}</h2>
        <h3>{{ product.price }}원</h3>
      </a>
    </div>
  </div>
</template>

<style scoped>
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
  flex-basis: calc(25% - 20px);
  margin: 10px;
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

.prod-info > h3 {
  display: flex;
  width: 100%;
  justify-content: end;
  color: var(--Grayscale7, #000);
  text-align: right;
  font-family: TheJamsil;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 120% */
}
</style>