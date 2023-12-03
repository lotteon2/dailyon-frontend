<script setup lang='ts'>

import { type PropType, ref } from 'vue'
import type { ProductSearchResponse } from '@/apis/ootd/PostDto'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const props = defineProps({
  isProductModalOpen: {
    type: Boolean,
    required: true,
    default: false
  },
  productModalControl: {
    type: Function as PropType<() => void>,
    required: true
  },
  onSelectBtnClick: {
    type: Function,
    required: true
  }
})

// TODO: 상품 검색 API 필요
const products = ref<Array<ProductSearchResponse>>([
  {
    id: 101,
    imgUrl: "/product-img/default-product-img.png",
    name: "상품명1",
    brandName: "BRAND1",
    sizeNames: ["사이즈1", "사이즈2", "사이즈3"]
  },
  {
    id: 102,
    imgUrl: "/product-img/default-product-img.png",
    name: "상품명2",
    brandName: "BRAND2",
    sizeNames: ["사이즈1", "사이즈2", "사이즈3"]
  },
  {
    id: 103,
    imgUrl: "/product-img/default-product-img.png",
    name: "상품명3",
    brandName: "BRAND3",
    sizeNames: ["사이즈1", "사이즈2", "사이즈3"]
  }
])
const hasNext = ref<boolean>(false)

</script>

<template>
  <div class='product-search-modal-wrapper' v-show='isProductModalOpen'>
    <div class='search-container'>
      <div class='header-container'>
        <input class='search-input' type='text' placeholder='상품명, 상품코드로 검색'>
        <div class='cancel-button' @click='productModalControl'>취소</div>
      </div>
      <div class='content-container'>
        <ul v-for='product in products' :key='product.id' class='content-list'>
          <li v-for='sizeName in product.sizeNames' :key='sizeName' class='content-wrapper'>
            <div class='product-wrapper'>
              <img class='product-img' :src='`${VITE_STATIC_IMG_URL}${product.imgUrl}`'>
              <div class='product-info-wrapper'>
                <div class='product-brand'>{{ product.brandName }}</div>
                <div class='product-name'>{{ product.name }}</div>
              </div>
              <div class='product-size'>{{ sizeName }}</div>
            </div>
            <div class='select-btn'>
              <div class='select-btn-text' @click='onSelectBtnClick(
                product.id, product.imgUrl, product.name, product.brandName, sizeName)'>선택</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/ootd/ootd-product-search-modal.css";
</style>