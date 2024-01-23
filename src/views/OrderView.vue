<script setup lang="ts">
import CheckoutCouponModal from '@/components/promotion/coupon/checkout/CheckoutCouponModal.vue'
import OrderSheetComponent from '@/components/order/OrderSheetComponent.vue'
import OrderPlaceComponent from '@/components/order/OrderPlaceComponent.vue'
import OrderPaymentComponent from '@/components/order/OrderPaymentComponent.vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { order, gifts } from '@/apis/order/order'
import type { OrderItemDto, OrderItemWithCouponInfoIdDto } from '@/types/coupon'
import type { ProductInfo } from '@/apis/product/ProductDto'
import type { DeliveryInfo, OrderSheet, OrderItem, GiftInfo } from '@/apis/order/orderDto'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product/ProductStore'
import { useMemberStore } from '@/stores/member/MemberStore'
import { useNotificationStore } from '@/stores/notification/NotificationStore'
import { useOrderStore } from '@/stores/order/OrderStore'
import router from '@/router'
import { warningModal } from '@/utils/Modal'
const productStore = useProductStore()
const orderStore = useOrderStore()
const { products, orderType, giftInfo, referralCode, auctionId } = storeToRefs(productStore)
const { point } = storeToRefs(useMemberStore())

const notificationStore = useNotificationStore()
const { shouldSubscribeToSSE } = storeToRefs(notificationStore)

const redirectUrl = ref('')
const newWindow = ref<any>()
const isCheckoutCouponModalOpen = ref(false)
const availableCouponsCount = ref(0)

const totalOrderPrice = computed((): number => {
  return products.value.reduce((prev: number, current: ProductInfo): number => {
    return prev + current.orderPrice
  }, 0)
})

const totalDiscountAmount = computed((): number => {
  return products.value.reduce((prev: number, current: ProductInfo): number => {
    return prev + (current.discountAmount ? current.discountAmount : 0)
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

const changeAvailableCouponsCount = (cnt: number) => {
  availableCouponsCount.value = cnt
}

const addDeliveryInfo = async (addressInfo: DeliveryInfo) => {
  deliveryInfo.value.postCode = addressInfo.postCode
  deliveryInfo.value.roadAddress = addressInfo.roadAddress
  deliveryInfo.value.detailAddress = addressInfo.detailAddress
}

const changeReceiver = async (input: string) => {
  deliveryInfo.value.receiver = input
}

const doOrder = async () => {
  if (orderType.value !== 'GIFT' && !validation()) {
    await warningModal('알림', '배송지 정보는 필수 입니다.')
    return
  }
  const orderItems: OrderItem[] = []
  products.value.forEach((product: any) => {
    const orderItem: OrderItem = {
      productId: product.productId,
      categoryId: product.categoryId,
      couponInfoId: product.couponInfoId,
      sizeId: product.sizeId,
      orderPrice: product.orderPrice,
      quantity: product.quantity
    }
    orderItems.push(orderItem)
  })

  const orderSheet: OrderSheet = {
    receiverId: giftInfo.value ? giftInfo.value.receiverId : null,
    receiverName: giftInfo.value ? giftInfo.value.receiverName : null,
    senderName: giftInfo.value ? giftInfo.value.senderName : null,
    usedPoints: usedPoints.value,
    type: orderType.value,
    deliveryFee: null,
    totalCouponDiscountPrice: null,
    orderItems: orderItems,
    deliveryInfo: orderType.value === 'GIFT' ? null : deliveryInfo.value,
    paymentType: 'KAKAOPAY',
    referralCode: referralCode.value,
    auctionId: auctionId.value
  }
  redirectUrl.value = await order(orderSheet)
  const orderInfo = {
    productName: products.value[0].productName,
    imgUrl: products.value[0].imgUrl,
    receiver: deliveryInfo.value.receiver,
    postCode: deliveryInfo.value.postCode,
    roadAddress: deliveryInfo.value.roadAddress,
    detailAddress: deliveryInfo.value.detailAddress,
    productPrice: totalOrderPrice.value,
    productId: products.value[0].productId
  }
  orderStore.setOrder(orderInfo)
  if (redirectUrl.value) {
    const width = 500
    const height = 500
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    shouldSubscribeToSSE.value = false // 새창 열기 전에 sessionStorage pinia값을 false로 만들고 new window에게 물려줌.

    newWindow.value = window.open(
      redirectUrl.value,
      'order',
      `width=${width},height=${height},top=${top},left=${left}`
    )

    if (!newWindow.value) {
      // 새 창이 차단되었거나 열리지 않았을 경우. SSE 재연결.
      shouldSubscribeToSSE.value = true
      notificationStore.subscribeToNotificationsHandler()
    }
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
  const { routeName, params } = event.data
  window.scrollTo(0, 0)

  if (routeName) {
    // polling시 계속 발동하지 않고, 실제 이벤트 발생했을때 발동
    shouldSubscribeToSSE.value = true
    notificationStore.subscribeToNotificationsHandler() // 구독 재활성화. 문제없을시 코드 삭제 😀
  }

  router.replace({ name: routeName, params: params })
}

const fetchDefaultAddress = (address: any) => {
  deliveryInfo.value.postCode = address.postCode
  deliveryInfo.value.roadAddress = address.roadAddress
  deliveryInfo.value.detailAddress = address.detailAddress
  deliveryInfo.value.phoneNumber = address.phoneNumber
}

onMounted(async () => {
  // eventListener는 window가 아직 열리기 전이어도 해당 이벤트가 발생했는지 해당 이벤트에 대해 polling을 계속 합니다.
  // handleMessage 함수는 계속 발동됩니다.
  window.addEventListener('message', handleMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})
</script>

<template>
  <CheckoutCouponModal
    :isCheckoutCouponModalOpen="isCheckoutCouponModalOpen"
    :orderItems="products"
    @close-checkout-coupon-modal="closeCheckoutCouponModal"
    @available-coupons-count="changeAvailableCouponsCount"
  ></CheckoutCouponModal>
  <div class="main-container">
    <h1 v-if="orderType !== 'GIFT'">주문/결제</h1>
    <h1 v-else>선물하기</h1>
    <div class="center-container">
      <div class="center-left-container">
        <OrderSheetComponent v-if="products.length" />
        <OrderPlaceComponent
          v-if="orderType !== 'GIFT'"
          @submit2="(deliveryInfo) => addDeliveryInfo(deliveryInfo)"
          @changeReceiver="(input) => changeReceiver(input)"
          @changePhoneNumber="(phone) => (deliveryInfo.phoneNumber = phone)"
          @fetchDefaultAddress="(address) => fetchDefaultAddress(address)"
        />
        <div class="discount-container" v-if="orderType !== 'AUCTION'">
          <div class="container-title">할인</div>
          <div class="line"></div>
          <div class="discount-info-container">
            <div class="discount-container-first-col">
              <span>할인쿠폰</span>
              <span>포인트</span>
            </div>
            <div class="discount-container-second-col">
              <div class="discount-container-row">
                {{ totalDiscountAmount.toLocaleString() }}원
                <div class="white-button" @click="openCheckoutCouponModal">쿠폰사용</div>
                <span>(보유 {{ availableCouponsCount }}장)</span>
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
          :totalDiscountAmount="totalDiscountAmount"
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
