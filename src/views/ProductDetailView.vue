<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import ProductDetailCouponModal from '@/components/promotion/coupon/productdetail/ProductDetailCouponModal.vue'
import BreadCrumbComponent from '@/components/product/BreadCrumbComponent.vue'
import { useRoute } from 'vue-router'
import { getProductDetail } from '@/apis/product/ProductClient'
import type { AxiosResponse } from 'axios'
import type { ReadProductDetailResponse, ReadProductStockResponse } from '@/apis/product/ProductDto'
import DescribeImageComponent from '@/components/product/DescribeImageComponent.vue'
import ReviewComponent from '@/components/product/ReviewComponent.vue'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const route = useRoute()

const isDescribeImages = ref<boolean>(true)

const productId = ref<number>(0)
const categoryId = ref<number>(0)
const productPriceValue = ref<number>(0)
const showCouponModal = ref<boolean>(false)

const brandName = ref<string>('')
const gender = ref<string>('')
const productName = ref<string>('')
const imgUrl = ref<string>('')
const describeImgUrls = ref<String[]>([])

const productStocks = ref<ReadProductStockResponse[]>([])

const avgRating = ref<number>(0)
const reviewCount = ref<number>(0)

const selectedProductSize = ref<ReadProductStockResponse>({
  productSizeId: 0,
  productSizeName: '',
  quantity: 1
})
const selectedQuantity = ref<number>(0)
const selectedOriginalPrice = ref<number>(0)

const initData = () => {
  getProductDetail(Number(route.params.id))
    .then((axiosResponse: AxiosResponse) => {
      const response: ReadProductDetailResponse = axiosResponse.data

      productId.value = Number(route.params.id)
      categoryId.value = response.categoryId
      productPriceValue.value = response.price
      productName.value = response.name
      brandName.value = response.brandName
      gender.value = response.gender

      imgUrl.value = response.imgUrl
      describeImgUrls.value = response.describeImgUrls
      productStocks.value = response.productStocks

      avgRating.value = response.avgRating
      reviewCount.value = response.reviewCount
    })
    .catch((error: any) => {
      alert(error.response!.data!.message)
    })
}

const closeCouponModal = () => {
  showCouponModal.value = false
}
const openCouponModal = () => {
  showCouponModal.value = true
}

const handleTotalPriceUpdated = (newTotalPrice: number) => {
  // TODO: 종민님이 만드실때 레이아웃 맞춰서 화면에 넣겠습니다.
  // 기존 price와 같을때, 안보이고, 다를때 보여줄지? 아니면 이거 자체를 기준가로 해서 먼저
  // 보여주고 original 가격을 optional 하게 보여줄지?
  console.log(`혜택가 업데이트: ${newTotalPrice}`)
}

const plusQuantity = () => {
  if (
    selectedProductSize.value.productSizeId !== 0 &&
    selectedQuantity.value + 1 <= selectedProductSize.value.quantity
  ) {
    ++selectedQuantity.value
  }
}
const minusQuantity = () => {
  if (selectedProductSize.value.productSizeId !== 0 && selectedQuantity.value - 1 >= 0) {
    --selectedQuantity.value
  }
}

const toggleOption = () => {
  isDescribeImages.value = !isDescribeImages.value
}

const addToCart = () => {
  if (selectedProductSize.value.productSizeId === 0) {
    alert('옵션을 지정해주세요')
    return
  }
  if (selectedQuantity.value === 0) {
    alert('개수를 추가해주세요')
    return
  }
  alert(
    `장바구니 추가 : productId: ${productId.value}, productSizeId: ${selectedProductSize.value.productSizeId}, quantity: ${selectedQuantity.value}`
  )
}

onBeforeMount(initData)

watch(selectedQuantity, () => {
  selectedOriginalPrice.value = selectedQuantity.value * productPriceValue.value
})

watch(selectedProductSize, () => {
  selectedQuantity.value = 0
})
</script>

<template>
  <ProductDetailCouponModal
    @close-coupon-modal="closeCouponModal"
    @total-price-updated="handleTotalPriceUpdated"
    :showModal="showCouponModal"
    :productId="productId"
    :categoryId="categoryId"
    :productPriceValue="productPriceValue"
  ></ProductDetailCouponModal>
  <div class="main-container">
    <BreadCrumbComponent v-if="categoryId !== 0" :category="categoryId" />
    <div class="first-wrapper">
      <div class="prod-first-col">
        <img class="img-big" :src="`${VITE_STATIC_IMG_URL}${imgUrl}?w=200&h=200`" alt="" />
      </div>
      <div class="prod-second-col">
        <div class="second-col-first-row">
          <div class="brand-prod-name">
            <h1>{{ brandName }}</h1>
            <h2>{{ productName }}</h2>
          </div>
          <div v-if="selectedProductSize.quantity === 0" class="sold-out">품절</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="56"
            viewBox="0 0 60 56"
            fill="none"
          >
            <path
              d="M30 55.05L25.65 51.09C10.2 37.08 0 27.81 0 16.5C0 7.23 7.26 0 16.5 0C21.72 0 26.73 2.43 30 6.24C33.27 2.43 38.28 0 43.5 0C52.74 0 60 7.23 60 16.5C60 27.81 49.8 37.08 34.35 51.09L30 55.05Z"
              fill="#C6C6C6"
            />
          </svg>
        </div>
        <div class="line"></div>
        <div class="price-info-container">
          <div class="price-info-row">
            <h1>데일리온가</h1>
            <!-- TODO : 여기에 할인 적용된 금액 들어가나요? -->
            <h2>{{ productPriceValue }}</h2>
            <!-- TODO : 여기에 최대 할인율? 할인 금액 나오는건가요? -->
            <h3>할인율</h3>
          </div>
          <div class="price-info-row">
            <h1>&nbsp;</h1>
            <div class="dash">{{ productPriceValue }}</div>
          </div>
          <div class="price-info-row">
            <h1>프로모션</h1>
            <h5>회원님을 위한 혜택</h5>
          </div>
          <div class="price-info-row">
            <h1>&nbsp;</h1>
            <div @click="openCouponModal" class="black-button">
              쿠폰 받기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.7069 11.293C15.8943 11.4805 15.9996 11.7348 15.9996 12C15.9996 12.2652 15.8943 12.5195 15.7069 12.707L10.0499 18.364C9.95761 18.4595 9.84726 18.5357 9.72526 18.5881C9.60326 18.6405 9.47204 18.6681 9.33926 18.6692C9.20648 18.6704 9.0748 18.6451 8.9519 18.5948C8.829 18.5445 8.71735 18.4703 8.62346 18.3764C8.52957 18.2825 8.45531 18.1708 8.40503 18.048C8.35475 17.9251 8.32945 17.7934 8.3306 17.6606C8.33176 17.5278 8.35934 17.3966 8.41175 17.2746C8.46416 17.1526 8.54034 17.0422 8.63585 16.95L13.5859 12L8.63585 7.05C8.4537 6.8614 8.3529 6.60879 8.35518 6.3466C8.35746 6.0844 8.46263 5.83359 8.64804 5.64818C8.83344 5.46277 9.08426 5.3576 9.34645 5.35532C9.60865 5.35305 9.86125 5.45384 10.0499 5.636L15.7069 11.293Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div class="price-info-row">
            <h1>&nbsp;</h1>
            <div class="black-button">
              이벤트 참여하기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.7069 11.293C15.8943 11.4805 15.9996 11.7348 15.9996 12C15.9996 12.2652 15.8943 12.5195 15.7069 12.707L10.0499 18.364C9.95761 18.4595 9.84726 18.5357 9.72526 18.5881C9.60326 18.6405 9.47204 18.6681 9.33926 18.6692C9.20648 18.6704 9.0748 18.6451 8.9519 18.5948C8.829 18.5445 8.71735 18.4703 8.62346 18.3764C8.52957 18.2825 8.45531 18.1708 8.40503 18.048C8.35475 17.9251 8.32945 17.7934 8.3306 17.6606C8.33176 17.5278 8.35934 17.3966 8.41175 17.2746C8.46416 17.1526 8.54034 17.0422 8.63585 16.95L13.5859 12L8.63585 7.05C8.4537 6.8614 8.3529 6.60879 8.35518 6.3466C8.35746 6.0844 8.46263 5.83359 8.64804 5.64818C8.83344 5.46277 9.08426 5.3576 9.34645 5.35532C9.60865 5.35305 9.86125 5.45384 10.0499 5.636L15.7069 11.293Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div class="price-info-row">
            <span>상품 옵션</span>
            <select v-model.lazy.number="selectedProductSize">
              <option
                v-for="(productStock, index) in productStocks"
                :key="index"
                :value="productStock"
              >
                {{ productStock.productSizeName }}
                {{ productStock.quantity <= 100 ? ' - ' + productStock.quantity + '개' : '' }}
              </option>
            </select>
          </div>
          <div class="option-container">
            <div class="plus-minus-wrapper">
              <div class="count-button" @click="minusQuantity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="2"
                  viewBox="0 0 18 2"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1C18 1.26522 17.8946 1.51957 17.7071 1.70711C17.5196 1.89464 17.2652 2 17 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span>{{ selectedQuantity }}</span>
              <div class="count-button" @click="plusQuantity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M13 8H8V13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13V8H1C0.734784 8 0.48043 7.89464 0.292893 7.70711C0.105357 7.51957 0 7.26522 0 7C0 6.73478 0.105357 6.48043 0.292893 6.29289C0.48043 6.10536 0.734784 6 1 6H6V1C6 0.734784 6.10536 0.480429 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0C7.26522 0 7.51957 0.105357 7.70711 0.292893C7.89464 0.480429 8 0.734784 8 1V6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7C14 7.26522 13.8946 7.51957 13.7071 7.70711C13.5196 7.89464 13.2652 8 13 8Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <h2>{{ selectedOriginalPrice }} 원</h2>
          </div>
          <div class="line"></div>
          <div class="price-wrapper">
            <h1>총 합계금액</h1>
            <!-- TODO : 할인률 적용된 금액 -->
            <h2>{{ selectedOriginalPrice }} 원</h2>
          </div>

          <div class="buttons-wrapper">
            <div class="bell-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
              >
                <path
                  d="M52.5 47.5V50H7.5V47.5L12.5 42.5V27.5C12.5 19.75 17.575 12.925 25 10.725V10C25 8.67392 25.5268 7.40215 26.4645 6.46447C27.4021 5.52678 28.6739 5 30 5C31.3261 5 32.5979 5.52678 33.5355 6.46447C34.4732 7.40215 35 8.67392 35 10V10.725C42.425 12.925 47.5 19.75 47.5 27.5V42.5L52.5 47.5ZM35 52.5C35 53.8261 34.4732 55.0979 33.5355 56.0355C32.5979 56.9732 31.3261 57.5 30 57.5C28.6739 57.5 27.4021 56.9732 26.4645 56.0355C25.5268 55.0979 25 53.8261 25 52.5"
                  fill="#C22727"
                />
              </svg>
            </div>
            <!-- TODO : 장바구니 개발 이후 추가 동작 개발 -->
            <div class="bucket-button" @click="addToCart">장바구니</div>
            <!-- TODO : 버튼 클릭 시 주문 페이지  (가주문 X) 생성 -->
            <div class="purchase-button">바로 구매</div>
          </div>
        </div>
      </div>
    </div>
    <div class="second-wrapper">
      <div class="select-button-wrapper">
        <div
          :class="`${isDescribeImages === true ? 'selected-button' : 'non-selected-button'}`"
          @click="toggleOption"
        >
          상세 정보
        </div>
        <div
          :class="`${isDescribeImages === false ? 'selected-button' : 'non-selected-button'}`"
          @click="toggleOption"
        >
          상품 후기
        </div>
      </div>
      <div class="line"></div>
      <DescribeImageComponent
        v-if="isDescribeImages"
        :is-describe-images="isDescribeImages"
        :describe-img-urls="describeImgUrls"
      />
      <ReviewComponent v-if="!isDescribeImages" />
    </div>
    <div class="third-wrapper">
      <div class="line"></div>
      <div class="top4-ootd-wrapper">
        <div class="top4-ootd-title-wrapper">
          <div class="top4-ootd-title-text">TOP 4 OOTD</div>
        </div>
        <div class="top4-ootd-list-wrapper">
          <div v-for="n in 4" class="top4-ootd-post-card-image-wrapper">
            <img
              class="top4-ootd-post-card-image"
              src="@/assets/images/ootd-detail-image-example.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/product-detail.css');
</style>
