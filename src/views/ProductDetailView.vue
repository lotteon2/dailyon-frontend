<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import ProductDetailCouponModal from '@/components/promotion/coupon/productdetail/ProductDetailCouponModal.vue'
import BreadCrumbComponent from '@/components/product/BreadCrumbComponent.vue'
import { useRoute } from 'vue-router'
import { getProductDetail } from '@/apis/product/ProductClient'
import type {
  ProductInfo,
  ReadProductDetailResponse,
  ReadProductStockResponse
} from '@/apis/product/ProductDto'
import DescribeImageComponent from '@/components/product/DescribeImageComponent.vue'
import ReviewComponent from '@/components/product/ReviewComponent.vue'
import { useProductStore } from '@/stores/product/ProductStore'
import router from '@/router'
import { upsertCart } from '@/apis/wishcart/CartClient'
import type { ReadWishListFromProduct } from '@/apis/wishcart/WishListDto'
import { readWishListFromProduct, toggleWishList } from '@/apis/wishcart/WishListClient'
import type { AxiosResponse } from 'axios'
import TOP4OOTDComponent from '@/components/ootd/TOP4OOTDComponent.vue'
import { Image, Select } from 'ant-design-vue'
import { confirmModal, errorModal, infoModal, warningModal } from '@/utils/Modal'
import { LOGIN_NEED_MSG } from '@/utils/CommonMessage'
import { SizeOrder } from '@/types/enums/SizeOrder'
import type { ProductStock } from '@/types/product/Product'
import { enrollRestockNotificaton } from '@/apis/notification/notification'
import type { EnrollRestockRequest } from '@/apis/notification/NotificationDto'

const productStore = useProductStore()

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const route = useRoute()
const product = ref<ReadProductDetailResponse>({
  name: '',
  gender: '',
  categoryId: 0,
  imgUrl: '',
  productStocks: [{ productSizeId: 0, productSizeName: '', quantity: 0 }],
  describeImgUrls: [],
  avgRating: 0,
  reviewCount: 0,
  brandName: '',
  brandId: 0,
  price: 0
})

const bestPromotionalPrice = ref<number>(0)
const bestPromotionalRate = ref<number>(0)

const referralCode = ref()

const isDescribeImages = ref<boolean>(true)
const productId = ref<number>(Number(route.params.id))
const productPriceValue = ref<number>(0)
const showCouponModal = ref<boolean>(false)

const isWishBtnEnabled = ref<boolean>(true)

const wishLists = ref<ReadWishListFromProduct[]>([])
const checkWishList = (): boolean => {
  if (selectedProductSize.value.productSizeId === 0) return false
  return !!wishLists.value.find(
    (wishList) =>
      wishList.productSizeId === selectedProductSize.value.productSizeId &&
      wishList.productId === productId.value
  )
}

const executeToggle = () => {
  if (selectedProductSize.value.productSizeId === 0 || productId.value === 0) {
    warningModal('알림', '치수를 선택해주세요')
    return
  }

  if (isWishBtnEnabled.value) {
    isWishBtnEnabled.value = false

    if (!localStorage.getItem('accessToken')) {
      infoModal('알림', LOGIN_NEED_MSG)
      isWishBtnEnabled.value = true
      return
    }

    toggleWishList({
      productId: productId.value,
      productSizeId: selectedProductSize.value.productSizeId
    })
      .then((axiosResponse: AxiosResponse) => {
        const toDelete = wishLists.value.findIndex(
          (wishList) =>
            wishList.productSizeId === selectedProductSize.value.productSizeId &&
            wishList.productId === productId.value
        )

        if (toDelete !== -1) {
          wishLists.value.splice(toDelete, 1)
        } else {
          wishLists.value.push({
            productId: productId.value,
            productSizeId: selectedProductSize.value.productSizeId
          })
        }
      })
      .catch((error: any) => {
        errorModal('오류', error.response!.data!.message)
      })
      .finally(() => {
        isWishBtnEnabled.value = true
      })
  }
}

const isCartBtnEnabled = ref<boolean>(true)

const selectedProductSize = ref<ReadProductStockResponse>({
  productSizeId: 0,
  productSizeName: '',
  quantity: 1
})
const selectedQuantity = ref<number>(0) // 최초개수 0개로 두고, init시에 1개 올려서 watch 통한 자동계산 발동
const selectedOriginalPrice = ref<number>(0)

const initData = async () => {
  product.value = await getProductDetail(Number(route.params.id))
  productPriceValue.value = product.value.price
  bestPromotionalPrice.value = product.value.price // product가 any라서 기본값 0으로 두고 초기화시 같이 init
  referralCode.value = route.query.code === null ? null : route.query.code
  if (localStorage.getItem('accessToken')) {
    wishLists.value = (await readWishListFromProduct(Number(route.params.id))).responses
  }
  if (mostStockedProductSize.value) {
    selectedProductSize.value = mostStockedProductSize.value
  }
}

const closeCouponModal = () => {
  showCouponModal.value = false
}
const openCouponModal = () => {
  if (!localStorage.getItem('accessToken')) {
    infoModal('알림', LOGIN_NEED_MSG)
  } else {
    showCouponModal.value = true
  }
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

const toggleOption = (option: boolean) => {
  if (option) {
    isDescribeImages.value = option
  } else {
    isDescribeImages.value = option
  }
}

const addToCart = () => {
  if (isCartBtnEnabled.value === true) {
    isCartBtnEnabled.value = false

    if (!localStorage.getItem('accessToken')) {
      warningModal('알림', LOGIN_NEED_MSG)
      isCartBtnEnabled.value = true
      return
    }

    if (selectedProductSize.value.productSizeId === 0) {
      warningModal('알림', '옵션을 지정해주세요')
      isCartBtnEnabled.value = true
      return
    }
    if (selectedQuantity.value === 0) {
      warningModal('알림', '개수를 추가해주세요')
      isCartBtnEnabled.value = true
      return
    }
    upsertCart({
      productId: productId.value,
      productSizeId: selectedProductSize.value.productSizeId,
      quantity: selectedQuantity.value,
      lastMemberCode: referralCode.value
    })
      .then(() => {
        infoModal('알림', '장바구니에 상품이 담겼습니다')
      })
      .catch((error: any) => {
        errorModal('오류', error.response!.data!.message)
      })
      .finally(() => {
        isCartBtnEnabled.value = true
      })
  }
}

const routeOrderSheet = async () => {
  if (validation()) {
    const productInfos: ProductInfo[] = [
      {
        productId: productId.value,
        productName: product.value.name,
        imgUrl: product.value.imgUrl,
        categoryId: product.value.categoryId,
        sizeId: selectedProductSize.value.productSizeId,
        sizeName: selectedProductSize.value.productSizeName,
        orderPrice: selectedOriginalPrice.value,
        quantity: selectedQuantity.value,
        couponInfoId: null,
        discountAmount: 0
      }
    ]
    productStore.setProducts(productInfos, 'SINGLE', referralCode.value, null)
    router.push('/orders')
  }
}

const routeToProductList = () => {
  router.push({ name: 'productList', query: { brand: product.value.brandId } })
}

const validation = (): boolean => {
  if (selectedQuantity.value === 0 || selectedOriginalPrice.value === 0) {
    warningModal('알림', '상품옵션과 수량을 선택해 주세요.')
    return false
  }
  return true
}

const bestPromotionalPriceUpdatedHandler = (maxDiscount: number) => {
  // ProductDetailCouponModal 모달에서 computed 변화시 함수 발동
  // -> life cycle상 bestPromotionalPrice가 init에서 product.value.price로 업데이트된 뒤에 다시 업데이트.
  if (bestPromotionalPrice && product.value.price) {
    // product.value.price로 zero division error 방지
    bestPromotionalPrice.value = product.value.price - maxDiscount
    bestPromotionalRate.value = Math.floor((maxDiscount / product.value.price) * 100)
  }
}

// const floorToTens = (n: number): number => Math.floor(n / 10) * 10

/**
 * 재입고 알림신청 관련
 */
const enrollRestockNotificationHandler = async () => {
  if (!localStorage.getItem('accessToken')) {
    infoModal('알림', LOGIN_NEED_MSG)
    return
  }

  if (selectedProductSize.value.quantity) {
    infoModal(
      '알림',
      '재고가 없는 사이즈의 알림 신청만 가능합니다. \n 재입고 알림을 받고싶은 사이즈 선택 후 눌러주세요.'
    )
    return
  }

  if (selectedProductSize.value.productSizeId <= 0) {
    warningModal('알림', '옵션을 지정해주세요.')
    return
  }

  const confirmed = await confirmModal(
    '재입고 알림 신청',
    `해당 상품 ${selectedProductSize.value.productSizeName}사이즈의 재입고 알림을 신청하시겠습니까?`
  )

  if (confirmed) {
    await postEnrollRestockNotification()
  }
}

const postEnrollRestockNotification = async () => {
  const enrollRestockRequest: EnrollRestockRequest = {
    productId: productId.value,
    sizeId: selectedProductSize.value.productSizeId
  }

  const restockId = await enrollRestockNotificaton(enrollRestockRequest)
  if (restockId) {
    infoModal('알림', '상품 재입고시, 신속하게 알려드리겠습니다.') // 이미 재입고 신청 취소도 가능해야하는지?
  }
}

const getOrder = (size: string): number => {
  // 상품 option 순서 맞추기
  const defaultOrder = 1000
  const normalizedSize = size.charAt(0).toUpperCase() + size.slice(1).toLowerCase()

  if (normalizedSize in SizeOrder) {
    return SizeOrder[normalizedSize as keyof typeof SizeOrder]
  }

  const numericSize = parseInt(size, 10)
  if (!isNaN(numericSize)) {
    if (numericSize >= 130) return SizeOrder.ShoeStart + numericSize
    if (numericSize >= 28 && numericSize <= 99)
      return SizeOrder.PantsStart + (numericSize - SizeOrder.PantsStart)
    if (numericSize >= 44 && numericSize <= 99)
      return SizeOrder.SkirtDressStart + (numericSize - SizeOrder.SkirtDressStart)
    return defaultOrder + numericSize
  }

  return defaultOrder
}

const sortedProductStocks = computed(() => {
  // computed로 사이즈끼리의 순서 맞춘걸 가짐
  return product.value.productStocks.slice().sort((a: ProductStock, b: ProductStock) => {
    const orderA = getOrder(a.productSizeName)
    const orderB = getOrder(b.productSizeName)
    return orderA - orderB
  })
})

const mostStockedProductSize = computed(() => {
  if (!product.value || !product.value.productStocks || product.value.productStocks.length === 0) {
    return null
  }
  return product.value.productStocks.reduce((maxStock: ProductStock, stock: ProductStock) =>
    maxStock.quantity > stock.quantity ? maxStock : stock
  )
})

onBeforeMount(async () => {
  await initData()
})

watch(selectedQuantity, () => {
  // 그 뒤 트리거 2
  selectedOriginalPrice.value = selectedQuantity.value * productPriceValue.value
})

watch(selectedProductSize, () => {
  // 먼저 트리거 1
  if (selectedProductSize.value.quantity >= 0) {
    selectedQuantity.value = 1
  }
})
</script>

<template v-if="product">
  <ProductDetailCouponModal
    v-if="product.categoryId"
    @close-coupon-modal="closeCouponModal"
    @total-price-updated="handleTotalPriceUpdated"
    @best-promotional-price-updated="bestPromotionalPriceUpdatedHandler"
    :showModal="showCouponModal"
    :productId="productId"
    :categoryId="product.categoryId"
    :productPriceValue="productPriceValue"
  ></ProductDetailCouponModal>
  <div class="main-container">
    <BreadCrumbComponent v-if="product.categoryId !== 0" :category="product.categoryId" />
    <div class="first-wrapper">
      <div class="prod-first-col">
        <Image
          class="img-big"
          :src="`${VITE_STATIC_IMG_URL}${product.imgUrl}?w=480&h=480&q=95`"
          :preview="true"
          alt="productImg"
        >
          <template #placeholder>
            <Image
              class="img-big"
              :src="`${VITE_STATIC_IMG_URL}${product.imgUrl}?w=480&h=480&q=0`"
              :preview="true"
            />
          </template>
        </Image>
      </div>
      <div class="prod-second-col">
        <div class="second-col-first-row">
          <div class="brand-prod-name">
            <h1 style="cursor: pointer" @click="routeToProductList">
              {{ product.brandName }}
            </h1>
            <h2>{{ product.name }}</h2>
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
              v-if="checkWishList()"
              cursor="pointer"
              d="M30 55.05L25.65 51.09C10.2 37.08 0 27.81 0 16.5C0 7.23 7.26 0 16.5 0C21.72 0 26.73 2.43 30 6.24C33.27 2.43 38.28 0 43.5 0C52.74 0 60 7.23 60 16.5C60 27.81 49.8 37.08 34.35 51.09L30 55.05Z"
              fill="#C22727"
              @click="executeToggle"
            />
            <path
              v-else
              cursor="pointer"
              d="M30 55.05L25.65 51.09C10.2 37.08 0 27.81 0 16.5C0 7.23 7.26 0 16.5 0C21.72 0 26.73 2.43 30 6.24C33.27 2.43 38.28 0 43.5 0C52.74 0 60 7.23 60 16.5C60 27.81 49.8 37.08 34.35 51.09L30 55.05Z"
              fill="#C6C6C6"
              @click="executeToggle"
            />
          </svg>
        </div>
        <div class="line"></div>
        <div class="price-info-container">
          <div class="price-info-row">
            <h1>데일리온가</h1>
            <h2>{{ Math.floor(bestPromotionalPrice).toLocaleString() }}</h2>
            <h3 v-show="bestPromotionalRate">{{ bestPromotionalRate }}%</h3>
          </div>
          <div v-if="bestPromotionalRate" class="price-info-row">
            <h1>&nbsp;</h1>
            <div
              v-show="productPriceValue !== bestPromotionalPrice"
              class="dash"
              style="text-decoration: line-through"
            >
              {{ productPriceValue.toLocaleString() }}
            </div>
          </div>
          <div v-else class="price-info-row">
            <h1>&nbsp;</h1>
            <div v-show="productPriceValue !== bestPromotionalPrice" class="dash">
              <s>{{ productPriceValue.toLocaleString() }}</s>
            </div>
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
            <span>상품 옵션</span>
            <select v-model.lazy.number="selectedProductSize">
              <option
                v-for="(productStock, index) in sortedProductStocks"
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
            <h2>{{ selectedOriginalPrice.toLocaleString() }} 원</h2>
          </div>
          <div class="line"></div>
          <div class="price-wrapper">
            <h1>총 합계금액</h1>
            <h2>{{ selectedOriginalPrice.toLocaleString() }} 원</h2>
          </div>

          <div class="buttons-wrapper">
            <div class="bell-box" @click="enrollRestockNotificationHandler">
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
            <div class="bucket-button" @click="addToCart">장바구니</div>
            <div class="purchase-button" @click="routeOrderSheet">바로 구매</div>
          </div>
        </div>
      </div>
    </div>
    <div class="second-wrapper">
      <div class="select-button-wrapper">
        <div
          :class="`${isDescribeImages ? 'selected-button' : 'non-selected-button'}`"
          @click="toggleOption(true)"
        >
          상세 정보
        </div>
        <div
          :class="`${!isDescribeImages ? 'selected-button' : 'non-selected-button'}`"
          @click="toggleOption(false)"
        >
          상품 후기
        </div>
      </div>
      <div class="line"></div>
      <div v-show="isDescribeImages">
        <DescribeImageComponent :describe-img-urls="product.describeImgUrls" />
      </div>
      <div v-show="!isDescribeImages">
        <ReviewComponent :productName="product.name" />
      </div>
    </div>
    <div class="third-wrapper">
      <div class="line"></div>
      <TOP4OOTDComponent :product-id="productId" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/product-detail.css');
</style>
