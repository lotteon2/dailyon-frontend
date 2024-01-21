<script setup lang="ts">
import { inject, onBeforeMount, onMounted, onUnmounted, type Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { ReadProductResponse, ReadProductSliceResponse } from '@/apis/product/ProductDto'
import { getProductSlice } from '@/apis/product/ProductClient'
import BreadCrumbComponent from '@/components/product/BreadCrumbComponent.vue'
import ProductListPriceDisplay from '@/components/product/ProductListPriceDisplay.vue'
import { useBrandStore } from '@/stores/brand/BrandStore'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const route = useRoute()
const brandStore = useBrandStore()

const categoryId = ref<number | null>(null)
const brandId = ref<number | null>(null)
const gender = ref<string | null>(null)

const lowPrice = ref<number | null>(null)
const highPrice = ref<number | null>(null)
const query = ref<string | null>(null)
const sort = ref<string>('createdAt')
const direction = ref<string>('desc')

const page = ref<number>(0)
const hasNext = ref<boolean>(true)
const products = ref<ReadProductResponse[]>([])

const initData = async () => {
  if (route.query.brand) {
    brandId.value = Number(route.query.brand)
  }

  if (route.query.category) {
    categoryId.value = Number(route.query.category)
  }

  if (route.query.query) {
    query.value = String(route.query.query)
  }

  const response: ReadProductSliceResponse = await getProductSlice(
    brandId.value,
    categoryId.value,
    gender.value,
    lowPrice.value,
    highPrice.value,
    query.value,
    page.value,
    sort.value,
    direction.value
  )

  page.value++
  hasNext.value = response.hasNext
  products.value = response.productResponses
}

onBeforeMount(initData)

const scrollToTop = () => {
  alert('to top')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const changeBrand = (idx: number) => {
  // 한 번 누른거 또 누르면 브랜드 선택 해제
  if (brandId.value === brandStore.brandList[idx].id) {
    brandId.value = null
  } else {
    brandId.value = brandStore.brandList[idx].id
  }
}

const changeSortAndDir = (sortVal: string, dirVal: string) => {
  sort.value = sortVal
  direction.value = dirVal
}

const changeGender = (genderVal: string) => {
  if (gender.value === genderVal) {
    gender.value = null
  } else {
    gender.value = genderVal
  }
}

// 검색 버튼 클릭 시 다시 조회
const changeQuery = async () => {
  const response: ReadProductSliceResponse = await getProductSlice(
    brandId.value,
    categoryId.value,
    gender.value,
    lowPrice.value,
    highPrice.value,
    query.value,
    (page.value = 0),
    sort.value,
    direction.value
  )

  page.value++
  hasNext.value = response.hasNext
  products.value = response.productResponses
}

// 정렬 기준 변경 시 다시 조회
watch(sort, async (newSort, oldSort) => {
  const response: ReadProductSliceResponse = await getProductSlice(
    brandId.value,
    categoryId.value,
    gender.value,
    lowPrice.value,
    highPrice.value,
    query.value,
    (page.value = 0),
    newSort,
    direction.value
  )

  page.value++
  hasNext.value = response.hasNext
  products.value = response.productResponses
})

watch(direction, async (newDirection, oldDirection) => {
  const response: ReadProductSliceResponse = await getProductSlice(
    brandId.value,
    categoryId.value,
    gender.value,
    lowPrice.value,
    highPrice.value,
    query.value,
    (page.value = 0),
    sort.value,
    newDirection
  )

  page.value++
  hasNext.value = response.hasNext
  products.value = response.productResponses
})

// 브랜드 변경 시 다시 조회
watch(brandId, async (newBrand, oldBrand) => {
  const response: ReadProductSliceResponse = await getProductSlice(
    newBrand,
    categoryId.value,
    gender.value,
    lowPrice.value,
    highPrice.value,
    query.value,
    (page.value = 0),
    sort.value,
    direction.value
  )

  page.value++
  hasNext.value = response.hasNext
  products.value = response.productResponses
})

// 성별 변경 시 다시 조회
watch(gender, async (newGender, oldGender) => {
  const response: ReadProductSliceResponse = await getProductSlice(
    brandId.value,
    categoryId.value,
    newGender,
    lowPrice.value,
    highPrice.value,
    query.value,
    (page.value = 0),
    sort.value,
    direction.value
  )

  page.value++
  hasNext.value = response.hasNext
  products.value = response.productResponses
})

// 무한 스크롤
const isScrollEnd = inject<Ref<boolean | undefined>>('isScrollEnd') as Ref<boolean | undefined>
watch(isScrollEnd, async (after, before) => {
  if (after !== before && hasNext.value) {
    const response: ReadProductSliceResponse = await getProductSlice(
      brandId.value,
      categoryId.value,
      gender.value,
      lowPrice.value,
      highPrice.value,
      query.value,
      page.value,
      sort.value,
      direction.value
    )

    page.value++
    hasNext.value = response.hasNext
    products.value = [...products.value, ...response.productResponses]
  }
})

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
  <div style="width: 50vw">
    <BreadCrumbComponent :category="categoryId" />
    <div class="sort-container">
      <div
        class="sort-item"
        :class="{ selected: sort === 'createdAt' }"
        @click="changeSortAndDir('createdAt', 'desc')"
      >
        최신 등록 순
      </div>
      <div
        class="sort-item"
        :class="{ selected: sort === 'review' }"
        @click="changeSortAndDir('review', 'desc')"
      >
        리뷰 많은 순
      </div>
      <div
        class="sort-item"
        :class="{ selected: sort === 'rating' }"
        @click="changeSortAndDir('rating', 'desc')"
      >
        별점 높은 순
      </div>
      <div
        class="sort-item"
        :class="{ selected: sort === 'price' && direction === 'asc' }"
        @click="changeSortAndDir('price', 'asc')"
      >
        낮은 가격 순
      </div>
      <div
        class="sort-item"
        :class="{ selected: sort === 'price' && direction === 'desc' }"
        @click="changeSortAndDir('price', 'desc')"
      >
        높은 가격 순
      </div>
    </div>
    <div class="filter-container">
      <div class="brand-filter-item">
        <div class="brand-filter-item-key">브랜드</div>
        <div class="brand-filter-item-value">
          <div
            class="brand-info"
            :class="{ selected: brandId === brand.id }"
            v-for="(brand, index) in brandStore.brandList"
            @click="changeBrand(index)"
          >
            {{ brand.name }}
          </div>
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-key">성별</div>
        <div class="filter-item-value">
          <div
            class="sort-item"
            :class="{ selected: gender === 'MALE' }"
            @click="changeGender('MALE')"
          >
            남성
          </div>
          <div
            class="sort-item"
            :class="{ selected: gender === 'FEMALE' }"
            @click="changeGender('FEMALE')"
          >
            여성
          </div>
          <div
            class="sort-item"
            :class="{ selected: gender === 'COMMON' }"
            @click="changeGender('COMMON')"
          >
            공용
          </div>
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-key">가격</div>
        <div class="filter-item-value">
          <div style="padding-right: 10px" />
          <input
            class="select-block-input"
            v-model.lazy.number="lowPrice"
            placeholder="최소 가격"
          />
          <div style="padding-right: 10px" />
          <input
            class="select-block-input"
            v-model.lazy.number="highPrice"
            placeholder="최대 가격"
          />
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-key">검색</div>
        <div class="filter-item-value">
          <div style="padding-right: 10px" />
          <div>
            <input
              class="select-block-input"
              type="text"
              v-model.lazy="query"
              placeholder="상품명 또는 코드로 검색"
              @keyup.enter="changeQuery"
            />
          </div>
          <div style="padding-right: 10px" />
          <div>
            <button class="search-button" @click="changeQuery">검색</button>
          </div>
        </div>
      </div>
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
      <WhitePageComponent message="상품이 존재하지 않습니다" />
    </div>
  </div>
</template>

<style scoped>
.product-list-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
}

.sort-container {
  display: flex;
  padding-bottom: 20px;
}

.sort-item {
  font-family: 'TheJamsil2Light';
  font-size: 1vw;
  padding: 10px;
  cursor: pointer;
}

.sort-item:hover {
  color: #c22727;
}

.sort-item.selected {
  color: #c22727;
}

.filter-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
}

.brand-filter-item {
  display: flex;
  height: 70%;
  justify-content: space-between;
}

.brand-filter-item-key {
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c6c6c6;

  font-family: 'TheJamsil4Medium';
  font-size: 1vw;
}

.brand-filter-item-value {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  font-family: 'TheJamsil3Regular';

  overflow-x: auto;
  width: 100%;
  height: 100%;
}

.brand-info {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  flex: 0 0 calc(20% - 40px);
  margin-left: 10px;
  margin-right: 10px;
  height: 10%;
  font-size: 14px;
  cursor: pointer;
}

.brand-info:hover {
  color: #c22727;
}

.brand-info.selected {
  color: #c22727;
}

.filter-item {
  display: flex;
  height: 10%;
  justify-content: flex-start;
}

.filter-item-key {
  display: flex;
  width: 13%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #c6c6c6;
  font-family: 'TheJamsil4Medium';
  font-size: 1vw;
}

.filter-item-value {
  display: flex;
  width: 87%;
  justify-content: flex-start;
  align-items: center;
}

.select-block-input {
  font-family: 'TheJamsil';
  font-weight: 400;
  font-size: 12px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.search-button {
  width: 60px;
  height: 30px;
  font-size: 16px;
  color: white;
  border: none;
  background-color: black;
  cursor: pointer;
  font-family: 'TheJamsil';
  font-weight: 400;
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
  font-family: 'TheJamsil3Regular';
  font-size: 1.1vw;
  /*font-style: normal;*/
  font-weight: 400;
  line-height: 30px;
}

.prod-info > h2 {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--Grayscale7, #000);
  font-family: 'TheJamsil2Light';
  font-size: 1.1vw;
  /*font-style: normal;*/
  font-weight: 300;
  line-height: 30px;
}

.product-third-info {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: end;
  color: var(--Grayscale7, #000);
  font-family: 'TheJamsil2Light';
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 400;
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
