<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getBestProducts, getNewProducts } from '@/apis/product/ProductClient'
import type {
  ProductCategoryPair,
  MultipleProductsCouponRequest,
  CouponInfoItemResponse
} from '@/apis/coupon/CouponItemDto'
import type {
  ReadCacheProductResponse,
  ExtendedReadCacheProductResponse
} from '@/apis/product/ProductDto'
import { getMultipleProductsCoupons } from '@/apis/coupon/coupon'
import ProductListPriceDisplay from '@/components/product/ProductListPriceDisplay.vue'
import { getFloorDiscountPercentage, getFinalPrice } from '@/utils/UtilFunc'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const newProducts = ref<ExtendedReadCacheProductResponse[]>([
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

async function fetchProductsAndCoupons(
  fetchProductsFunc: Function,
  outputArray: typeof newProducts | typeof bestProducts
) {
  const productData = await fetchProductsFunc()
  if (productData.responses) {
    const productsWithCoupons = await fetchCoupons(productData.responses)
    outputArray.value = productsWithCoupons.slice(0, Math.min(productsWithCoupons.length, 4))
  }
}

const fetchNewProductsAndCoupons = async () => {
  await fetchProductsAndCoupons(getNewProducts, newProducts)
}

const fetchBestProductsAndCoupons = async () => {
  await fetchProductsAndCoupons(getBestProducts, bestProducts)
}

onBeforeMount(fetchNewProductsAndCoupons)
onBeforeMount(fetchBestProductsAndCoupons)
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
            <ProductListPriceDisplay
              :original-price="newProduct.price"
              :discount-percentage="getFloorDiscountPercentage(newProduct)"
              :final-price="getFinalPrice(newProduct)"
            />
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
            <ProductListPriceDisplay
              :original-price="bestProduct.price"
              :discount-percentage="getFloorDiscountPercentage(bestProduct)"
              :final-price="getFinalPrice(bestProduct)"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/home.css';
</style>
