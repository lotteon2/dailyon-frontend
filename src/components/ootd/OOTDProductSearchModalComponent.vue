<script setup lang='ts'>

import { type PropType, ref, watch } from 'vue'
import type { ProductSearchResponse } from '@/apis/ootd/PostDto'
import { searchProductFromOOTD } from '@/apis/ootd/ProductSearchService'
import { debounce } from 'lodash'

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

const products = ref<Array<ProductSearchResponse>>(new Array<ProductSearchResponse>())
const hasNext = ref<boolean>(false)

const query = ref<string>('')
const lastId = ref<number>(0)

const clearProductData = async () => {
  products.value = new Array<ProductSearchResponse>()
  lastId.value = 0
}

const isCurrentlySearched = ref<boolean>(false)
const searchProducts = debounce(async () => {
  if (query.value !== '' && !isCurrentlySearched.value) {
    isCurrentlySearched.value = true

    await clearProductData()

    const productSearchPageResponse = await searchProductFromOOTD(query.value, lastId.value)
    products.value = productSearchPageResponse.products
    hasNext.value = productSearchPageResponse.hasNext

    query.value = ''

    isCurrentlySearched.value = false
  }
}, 500)

const isScrollEnd = ref<boolean>(false)
const onScroll = debounce(async (event: any) => {
  const { scrollHeight, scrollTop, clientHeight } = event.target
  // 스크롤이 끝에 닿으면 데이터를 추가로 로드
  if (scrollHeight - 10 <= scrollTop + clientHeight) {
    isScrollEnd.value = !isScrollEnd.value
  }
}, 200)

watch(isScrollEnd, async (afterScrollEnd, beforeScrollEnd) => {
  if (afterScrollEnd !== beforeScrollEnd) {
    if (hasNext.value) {
      await onChangePage()
    }
  }
})

watch(lastId, async (afterLastId, beforeLastId) => {
  if (afterLastId !== 0 && beforeLastId !== afterLastId && hasNext.value) {
    const productSearchPageResponse = await searchProductFromOOTD(query.value, lastId.value)
    productSearchPageResponse.products.forEach((product) => {
      products.value?.push(product)
    })
  }
})

watch(() => props.isProductModalOpen, (afterIsProductModalOpen, beforeIsProductModalOpen) => {
  if (afterIsProductModalOpen !== beforeIsProductModalOpen) {
    clearProductData()
    query.value = ''
  }
})

const onChangePage = async () => {
  lastId.value = products.value[products.value.length - 1].id
}
</script>

<template>
  <div class='product-search-modal-wrapper' v-show='isProductModalOpen'>
    <div class='search-container'>
      <div class='header-container'>
        <input class='search-input' type='text' v-model='query'
               @keyup.enter='searchProducts'
               placeholder='상품명, 상품코드로 검색'>
        <div class='cancel-button' @click='productModalControl'>취소</div>
      </div>
      <div class='content-container' @scroll='onScroll'>
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
                product.id, product.imgUrl, product.name, product.brandName, sizeName)'>선택
              </div>
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