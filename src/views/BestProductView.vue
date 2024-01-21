<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getBestProducts } from '@/apis/product/ProductClient'
import type {
  ProductCategoryPair,
  MultipleProductsCouponRequest,
  CouponInfoItemResponse
} from '@/apis/coupon/CouponItemDto'
import type {
  ReadCacheProductResponse,
  ExtendedReadCacheProductResponse
} from '@/apis/product/ProductDto'
import { Image } from 'ant-design-vue'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'
import ProductListPriceDisplay from '@/components/product/ProductListPriceDisplay.vue'
import { getFloorDiscountPercentage, getFinalPrice } from '@/utils/UtilFunc'
import { getMultipleProductsCoupons } from '@/apis/coupon/coupon'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const bestProducts = ref<ExtendedReadCacheProductResponse[]>([
  {
    id: 0,
    brandName: '',
    code: '',
    categoryId: 0,
    categoryName: '',
    imgUrl: '',
    name: '',
    price: 0,
    avgRating: 0,
    reviewCount: 0,
    coupons: []
  }
])

const fetchCoupons = async (
  products: ReadCacheProductResponse[]
): Promise<ExtendedReadCacheProductResponse[]> => {
  // product-service에서 조회해온 products를 이용해서 productCategoryPairs 가공
  const productCategoryPairs = products.map<ProductCategoryPair>((product) => ({
    productId: product.id,
    categoryId: product.categoryId
  }))

  // request payload 가공
  const couponRequest: MultipleProductsCouponRequest = {
    products: productCategoryPairs
  }

  // promotion-service 조회요청
  const couponsResponse = await getMultipleProductsCoupons(couponRequest)
  const couponsMap = couponsResponse.coupons

  // products결과와 coupons 결과 합쳐서 ReadProductResponse 가공
  return products.map<ExtendedReadCacheProductResponse>((product: ReadCacheProductResponse) => {
    const productCoupons: CouponInfoItemResponse[] = couponsMap[product.id] || []
    return {
      ...product,
      coupons: productCoupons,
      avgRating: 0, // 상품 캐싱정보에는 avgRating, reviewCount 정보가 없음.
      reviewCount: 0
    } as ExtendedReadCacheProductResponse
  })
}

const fetchBestProductsAndCoupons = async () => {
  const bestProductData = await getBestProducts()
  if (bestProductData.responses) {
    const productsWithCoupons = await fetchCoupons(bestProductData.responses)
    bestProducts.value = productsWithCoupons
  }
}

onBeforeMount(fetchBestProductsAndCoupons)
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
        <ProductListPriceDisplay
          :original-price="product.price"
          :discount-percentage="getFloorDiscountPercentage(product)"
          :final-price="getFinalPrice(product)"
        />
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
  font-family: 'TheJamsil';
  font-style: normal;
  font-weight: 700;
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
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
}

.prod-info > h2 {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--Grayscale7, #000);
  font-family: 'TheJamsil';
  font-size: 1.1vw;
  font-style: normal;
  font-weight: 300;
  line-height: 30px;
}

.product-third-info {
  display: flex;
  width: 100%;
  justify-content: end;
  color: var(--Grayscale7, #000);
  font-family: 'TheJamsil';
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 120% */
}

.product-img {
  width: 10vw;
  height: 19.5vh;
}
</style>
