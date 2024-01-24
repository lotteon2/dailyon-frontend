<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { ReadProductResponse, ReadProductSearchResponse } from '@/apis/product/ProductDto'
import { searchProducts } from '@/apis/product/ProductClient'
import ProductListPriceDisplay from '@/components/product/ProductListPriceDisplay.vue'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const route = useRoute()

const query = ref<string | null>(null)
const products = ref<ReadProductResponse[]>([])

const loading = ref<boolean>(true)

const initData = async () => {
  if (route.query.query) {
    query.value = String(route.query.query)
  }

  const response: ReadProductSearchResponse = await searchProducts(query.value)

  products.value = response.productResponses

  loading.value = false
}

onMounted(initData)

const img = ref<Array<HTMLImageElement>>(new Array<HTMLImageElement>())
const imageSize = ref({
  width: 0,
  height: 0
})

const getImageSize = async () => {
  if (img.value[0]) {
    await handleImageLoad()
  } else {
    ;(img.value[0] as HTMLImageElement).onload = handleImageLoad
  }
}

const handleImageLoad = async () => {
  if (img.value) {
    imageSize.value = {
      width: img.value[0]!.width,
      height: img.value[0]!.height
    }
  }
}

/**
 혜택가 관련 계산입니다.
 */
const getFloorDiscountPercentage = (product: ReadProductResponse) => {
  const { maxDiscountPercentageBeforeFlooring, maxDiscountPercentageAfterFlooring } =
    getProductMaxDiscountPercentage(product)
  return Math.floor(maxDiscountPercentageAfterFlooring)
}

const getFinalPrice = (product: ReadProductResponse) => {
  const { maxDiscountPercentageBeforeFlooring, maxDiscountPercentageAfterFlooring } =
    getProductMaxDiscountPercentage(product)
  return Math.floor(product.price - (product.price * maxDiscountPercentageBeforeFlooring) / 100)
}

const getProductMaxDiscountPercentage = (product: ReadProductResponse) => {
  let maxDiscountPercentageBeforeFlooring = 0 // 가격을 따로 정확히 보여주기 위한 보존값
  let maxDiscountPercentageAfterFlooring = 0

  product.coupons?.forEach((coupon) => {
    if (product.price >= coupon.minPurchaseAmount) {
      // Listview에서는 일단 1개 구매를 기준으로 display
      // N개 이상 구매했을때를 가정한 최적 할인율과 해당 쿠폰 적용환경의 최소개수도 구할까 고민중임.
      let discountPercentage = 0

      if (coupon.discountType === 'PERCENTAGE') {
        discountPercentage = coupon.discountValue
      } else if (coupon.discountType === 'FIXED_AMOUNT') {
        discountPercentage = (coupon.discountValue / product.price) * 100
      }

      // 쿠폰별 maxDiscount cap 적용해서 갱신
      if (coupon.maxDiscountAmount !== null) {
        const maxDiscountValue = (coupon.maxDiscountAmount / product.price) * 100
        discountPercentage = Math.min(discountPercentage, maxDiscountValue)
      }

      // 직전 iteration과 비교 갱신
      maxDiscountPercentageBeforeFlooring = Math.max(
        // 가격을 따로 정확히 보여주기 위한 보존값
        maxDiscountPercentageBeforeFlooring,
        discountPercentage
      )
      maxDiscountPercentageAfterFlooring = Math.max(
        maxDiscountPercentageAfterFlooring,
        Math.floor(discountPercentage)
      )
    }
  })

  return { maxDiscountPercentageBeforeFlooring, maxDiscountPercentageAfterFlooring }
}
</script>

<template>
  <div v-if="loading">
    <SpinnerComponent />
  </div>
  <div v-else>
    <div class="product-search-container">
      <div class="product-search-result">
        <p class="search-label">{{ query }}의 검색 결과입니다</p>
      </div>
      <div style="padding: 1vh" />
      <div class="product-list-container" v-if="products.length > 0">
        <RouterLink
          class="prod-info"
          v-for="(product, index) in products"
          :to="`/products/${product.id}`"
          :key="product.id"
        >
          <img
            v-if="imageSize.width === 0 || imageSize.height === 0"
            class="product-img"
            ref="img"
            @load="getImageSize"
            src="@/assets/images/loading.gif"
            alt="상품 이미지"
          />
          <img
            v-else
            class="product-img"
            ref="img"
            @load="getImageSize"
            :src="`${VITE_STATIC_IMG_URL}${product.imgUrl}?w=${imageSize.width}&h=${imageSize.height}&q=95`"
            alt="상품 이미지"
          />
          <h1>{{ product.brandName }}</h1>
          <h2>{{ product.name }}</h2>
          <ProductListPriceDisplay
            :original-price="product.price"
            :discount-percentage="getFloorDiscountPercentage(product)"
            :final-price="getFinalPrice(product)"
          />
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
          </div>
        </RouterLink>
      </div>
      <div class="product-list-container" v-else>
        <WhitePageComponent message="해당하는 상품이 존재하지 않습니다" />
      </div>
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
  width: 50vw;
  padding: 20px;
}

.product-list-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
}

.search-label {
  font-family: 'TheJamsil';
  font-style: normal;
  font-weight: 700;
  font-size: 2vw;
}

.prod-info {
  display: flex;
  flex-direction: column;
  flex-basis: calc(25% - 40px);
  width: 10vw;
  margin: 20px;
}

.prod-info > h1 {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--Grayscale7, #000);
  font-family: 'TheJamsil';
  font-size: 1.1vw;
  /*font-style: normal;*/
  font-weight: 300;
  line-height: 30px;
}

.prod-info > h2 {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--Grayscale7, #000);
  font-family: 'TheJamsil';
  font-size: 1.1vw;
  /*font-style: normal;*/
  font-weight: 200;
  line-height: 30px;
}

.product-third-info {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: end;
  color: var(--Grayscale7, #000);
  font-family: 'TheJamsil';
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 200;
  line-height: 30px;
}

.product-aggregate {
  display: flex;
  align-items: center;
}

.product-img {
  width: 10vw;
  height: 19.5vh;
}
</style>
