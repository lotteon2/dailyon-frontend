<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getBestProducts } from '@/apis/product/ProductClient'
import type { ReadCacheProductResponse } from '@/apis/product/ProductDto'
import { Image } from 'ant-design-vue'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

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
  const bestProductData = await getBestProducts()
  bestProducts.value = bestProductData.responses
}

onBeforeMount(fetchNewProduct)
</script>

<template>
  <div class="product-search-container">
    <div class="product-search-result">
      <p class="search-label">베스트 상품</p>
    </div>
    <div v-if="bestProducts.length !== 0" class="product-list-container">
      <RouterLink
        class="prod-info"
        v-for="(product, index) in bestProducts"
        :to="`/products/${product.id}`"
        :key="product.id"
      >
        <Image
          class="product-img"
          :src="`${VITE_STATIC_IMG_URL}${product.imgUrl}?w=200&h=200&q=95`"
          :preview="false"
          alt="productImg"
        >
          <template #placeholder>
            <Image
              class="product-img"
              :src="`${VITE_STATIC_IMG_URL}${product.imgUrl}?w=200&h=200&q=0`"
              :preview="false"
            />
          </template>
        </Image>
        <h1>{{ product.brandName }}</h1>
        <h2>{{ product.name }}</h2>
        <div class="product-third-info">
          <h3>{{ product.price.toLocaleString() }}원</h3>
        </div>
      </RouterLink>
    </div>
    <WhitePageComponent v-else message="결과가 없습니다" />
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
  padding: 20px;
}

.search-label {
  font-family: TheJamsil;
  font-style: normal;
  font-weight: bold;
  font-size: 2vw;
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
  justify-content: end;
  color: var(--Grayscale7, #000);
  font-family: TheJamsil;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 120% */
}

.product-img {
  width: 10vw;
  height: 19.5vh;
}
</style>
