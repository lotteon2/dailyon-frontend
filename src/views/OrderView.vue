<script setup lang="ts">
import CheckoutCouponModal from '@/components/promotion/coupon/checkout/CheckoutCouponModal.vue'
import OrderSheetComponent from '@/components/order/OrderSheetComponent.vue'
import OrderPlaceComponent from '@/components/order/OrderPlaceComponent.vue'
import OrderPaymentComponent from '@/components/order/OrderPaymentComponent.vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { order } from '@/apis/order/order'
import type { OrderItemDto, OrderItemWithCouponInfoIdDto } from '@/types/coupon'
import type { ProductInfo } from '@/apis/product/ProductDto'
import type { DeliveryInfo, OrderSheet, OrderItem, OrderInfo } from '@/apis/order/orderDto'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product/ProductStore'
import { useMemberStore } from '@/stores/member/MemberStore'
import router from '@/router'
const productStore = useProductStore()
const { products, orderType } = storeToRefs(productStore)
const { point } = storeToRefs(useMemberStore())

const redirectUrl = ref('')
const newWindow = ref<any>()
const isCheckoutCouponModalOpen = ref(false)
const orderItemWithCouponInfoIdList = ref<OrderItemWithCouponInfoIdDto[]>([])

const totalOrderPrice = computed((): number => {
  return products.value.reduce((prev: number, current: ProductInfo): number => {
    return prev + current.orderPrice
  }, 0)
})

const usedPoints = ref<number>(0)
const usePoints = async () => {
  usedPoints.value = Math.min(Number(point.value), totalOrderPrice.value)
}

const deliveryInfo = ref<DeliveryInfo>({
  receiver: '',
  postCode: '',
  roadAddress: '',
  detailAddress: '',
  phoneNumber: null
})

const usePointsCancel = () => {
  usedPoints.value = 0
}

const totalPaymentPrice = computed(() => {
  return totalOrderPrice.value - usedPoints.value
})
const openCheckoutCouponModal = () => {
  isCheckoutCouponModalOpen.value = true
}
const closeCheckoutCouponModal = () => {
  isCheckoutCouponModalOpen.value = false
}
const applyCoupons = (couponSelections: OrderItemWithCouponInfoIdDto[]) => {
  orderItemWithCouponInfoIdList.value = couponSelections
}

const addDeliveryInfo = async (addressInfo: DeliveryInfo) => {
  deliveryInfo.value = addressInfo
}

const changeReceiver = async (input: string) => {
  deliveryInfo.value.receiver = input
}
const orderItems = [
  {
    productName: '나이키 에어포스1',
    imgUrl: '',
    productId: 1,
    categoryId: 1,
    count: 1,
    originalPrice: 10000
  },
  {
    productName: '준지 189',
    imgUrl: 'https://blog.kakaocdn.net/dn/bvusF3/btqDn1mPRqa/lk6VdECDc10kixNhnBHxL1/img.jpg',
    productId: 2,
    categoryId: 1,
    count: 2,
    originalPrice: 20000
  },
  {
    productName: 'IAB Studio',
    imgUrl: 'https://iab-studio.com/media/pages/about/aa600c7d43-1694580757/aboutus.jpg',
    productId: 3,
    categoryId: 2,
    count: 1,
    originalPrice: 15000
  }
]

const doOrder = async () => {
  if (!validation()) {
    alert('배송지 정보는 필수 입니다.')
    return
  }
  const orderItems: OrderItem[] = []
  products.value.forEach((product: any) => {
    const orderItem: OrderItem = {
      productId: product.productId,
      categoryId: product.categoryId,
      couponInfoId: null,
      sizeId: product.sizeId,
      orderPrice: product.orderPrice,
      quantity: product.quantity,
      referralCode: product.referralCode
    }
    orderItems.push(orderItem)
  })

  const orderInfo: OrderInfo = {
    usedPoints: usedPoints.value,
    type: orderType.value,
    deliveryFee: null,
    totalCouponDiscountPrice: null
  }

  const orderSheet: OrderSheet = {
    orderItems: orderItems,
    orderInfo: orderInfo,
    deliveryInfo: deliveryInfo.value,
    paymentType: 'KAKAOPAY'
  }
  redirectUrl.value = await order(orderSheet)

  if (redirectUrl.value) {
    const width = 500
    const height = 500
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    newWindow.value = window.open(
      redirectUrl.value,
      'order',
      `width=${width},height=${height},top=${top},left=${left}`
    )
  }
}

const validation = (): boolean => {
  if (
    !deliveryInfo.value.postCode ||
    !deliveryInfo.value.roadAddress ||
    !deliveryInfo.value.detailAddress ||
    !deliveryInfo.value.receiver
  ) {
    return false
  }
  return true
}

const handleMessage = (event: MessageEvent) => {
  console.log(event.data)
  const { routeName, params } = event.data
  window.scrollTo(0, 0)
  router.replace({ name: routeName, params: params })
}

onMounted(async () => {
  window.addEventListener('message', handleMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})
</script>

<template>
  <CheckoutCouponModal
    :isCheckoutCouponModalOpen="isCheckoutCouponModalOpen"
    :orderItems="orderItems"
    @close-checkout-coupon-modal="closeCheckoutCouponModal"
    @apply-coupons="applyCoupons"
  ></CheckoutCouponModal>
  <div class="main-container">
    <h1>주문/결제</h1>
    <div class="center-container">
      <div class="center-left-container">
        <OrderSheetComponent v-if="products.length" />
        <OrderPlaceComponent
          @submit="(deliveryInfo) => addDeliveryInfo(deliveryInfo)"
          @changeReceiver="(input) => changeReceiver(input)"
        />
        <div class="discount-container">
          <div class="container-title">할인</div>
          <div class="line"></div>
          <div class="discount-info-container">
            <div class="discount-container-first-col">
              <span>할인쿠폰</span>
              <span>포인트</span>
            </div>
            <div class="discount-container-second-col">
              <div class="discount-container-row">
                N원
                <div class="white-button">쿠폰사용</div>
                <span>(보유 N장)</span>
              </div>
              <div class="discount-container-row">
                {{ usedPoints?.toLocaleString() }}원
                <div v-if="!usedPoints" class="white-button" @click="usePoints">전체 사용</div>
                <div v-else class="white-button" @click="usePointsCancel">취소</div>
                <span>(보유 포인트: {{ point?.toLocaleString() }} 원)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center-right-container">
        <OrderPaymentComponent
          :totalOrderPrice="totalOrderPrice"
          :usedPoints="usedPoints"
          :totalPaymentPrice="totalPaymentPrice"
          @doOrder="doOrder"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/order/order.css';
.discount-container-row .white-button:hover {
  cursor: pointer;
}
</style>
