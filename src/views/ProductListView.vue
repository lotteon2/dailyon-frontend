<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Category } from '@/apis/category/CategoryDto'
import { getBreadCrumbs } from '@/apis/category/CategoryClient'
import type { AxiosResponse } from 'axios'
import { useRoute, useRouter } from 'vue-router'
import type { ReadProductResponse, ReadProductSliceResponse } from '@/apis/product/ProductDto'
import { getProductSlice } from '@/apis/product/ProductClient'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const breadCrumbs = ref<Category[]>([])

const route = useRoute()
const router = useRouter()

const categoryId = ref<number | null>(null)
const brandId = ref<number | null>(null)
const gender = ref<string | null>(null)
const type = ref<string | null>(null)

const hasNext = ref<boolean>(true)
const lastId = ref<number>(0)
const products = ref<ReadProductResponse[]>([])

const initData = () => {
  if (route.query.category !== null) {
    categoryId.value = Number(route.query.category)
    getBreadCrumbs(categoryId.value)
      .then((axiosResponse: AxiosResponse) => {
        breadCrumbs.value = axiosResponse.data.breadCrumbs
      })
      .catch((error: any) => {
        alert(error.response!.data!.message)
      })
  }

  if (route.query.brand) {
    brandId.value = Number(route.query.brand)
  }

  if (route.query.gender) {
    gender.value = String(route.query.gender)
  }

  if (route.query.type) {
    type.value = String(route.query.type)
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

onMounted(initData)

/*watch([categoryId, brandId, gender, type, lastId], (nv, ov) => {
  if (nv.some((value, index) => value !== ov[index])) {
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
})*/
</script>

<template>
  <div style="width: 50vw">
    <div class="breadcrumb-container">
      <a href="/" style="font-family: TheJamsil">홈</a>
      <div class="breadcrumbs" v-for="category in breadCrumbs">
        <p style="padding-right: 5px; padding-left: 5px">></p>
        <a :href="`/product-list?category=${category.id}&type=NORMAL`">
          {{ category.name }}
        </a>
      </div>
    </div>
    <div class="product-list-container">
      <div v-for="(product, index) in products" :key="product.id" class="prod-info">
        <img :src="`${VITE_STATIC_IMG_URL}${product.imgUrl}`" alt="productImg" />
        <h1>{{ product.brandName }}</h1>
        <h2>{{ product.name }}</h2>
        <h3>{{ product.price }}원</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-items: center;

  padding-left: 10px;
  padding-bottom: 20px;

  width: 100%;
}

.breadcrumbs {
  display: flex;
  align-items: flex-start;
  justify-items: center;

  font-family: TheJamsil;
}

.breadcrumbs > a {
  color: inherit;
  text-decoration: none;
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
