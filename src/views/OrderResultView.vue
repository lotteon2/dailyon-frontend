<script setup lang="ts">
import { Result, Button } from 'ant-design-vue'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product/ProductStore'
import { useMemberStore } from '@/stores/member/MemberStore'
import { useOrderStore } from '@/stores/order/OrderStore'
import { getMember } from '@/apis/member/member'
import router from '@/router'
import { storeToRefs } from 'pinia'

const baseImgUrl = import.meta.env.VITE_STATIC_IMG_URL
const memberStore = useMemberStore()
const orderStore = useOrderStore()
const productStore = useProductStore()
const route = useRoute()
const orderId = ref(route.params.orderId)
const { order } = storeToRefs(orderStore)
const { orderType } = storeToRefs(productStore)
onMounted(async () => {
  // productStore.deletePinia()
  await getMember()
})
const kakao = () => {
  console.log(baseImgUrl + order.value.imgUrl)
  window.Kakao.Link.sendCustom({
    templateId: 103359,
    templateArgs: {
      nickname: memberStore.nickname,
      productsName: order.value.productName,
      receiver: order.value.receiver,
      postCode: order.value.postCode,
      roadAddress: order.value.roadAddress,
      detailAddress: order.value.detailAddress,
      imgUrl: baseImgUrl + order.value.imgUrl + '?w=480&h=480&q=95&f=jpg',
      productPrice: order.value.totalOrderPrice,
      productId: order.value.productId
    }
  })
}
</script>
<template>
  <Result
    status="success"
    title="주문접수가 완료 되었습니다."
    :sub-title="`주문 번호 : ${orderId} 최종 주문완료까지는 1 ~ 5분정도 걸릴 수 있습니다.`"
  >
    <template #extra>
      <Button Button key="console" type="primary" @click="router.push('/order-history')"
        >주문내역 조회하기</Button
      >
      <Button v-if="orderType === 'SINGLE'" Button key="console" type="default" @click="kakao"
        >선물알림</Button
      >
    </template>
  </Result>
</template>

<style></style>
