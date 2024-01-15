<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { List, ListItem, ListItemMeta, Button, Modal } from 'ant-design-vue'
import { getReceiverGifts } from '@/apis/order/order'
import { createDelivery, getDelivery } from '@/apis/delivery/delivery'
import type { GiftPageResponse, GiftResponse } from '@/apis/order/orderDto'
import type { CreateDeliveryDto, DeliveryResponse } from '@/apis/delivery/deliveryDto'
import GiftAddressModal from './GiftAddressModal.vue'
const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)
const gifts = ref<GiftResponse[]>([])
const deliveryInfo = ref<DeliveryResponse>()
const index = ref<number>()
const pagination = {
  onChange: async (page: number) => {
    const data = await getReceiverGifts(page - 1)
    gifts.value = data.gifts
    pagination.total = data.totalElements
  },
  pageSize: 4,
  total: 0
}

onBeforeMount(() => {
  initData()
})

const initData = async () => {
  const data = await getReceiverGifts(0)
  gifts.value = data.gifts
  pagination.total = data.totalElements
}

const emit = defineEmits(['submit', 'changeReceiver'])
const isModalVisible = ref(false)

const openModal = (idx: number) => {
  index.value = idx
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}

const showModal = async (idx: number) => {
  const orderNo = gifts.value[idx].orderNo
  deliveryInfo.value = await getDelivery(orderNo)
  open.value = true
}

const handleOk = (e: MouseEvent) => {
  open.value = false
}

const open = ref<boolean>(false)

const fill = async (addressInfo: any) => {
  if (index.value != undefined) {
    const deliveryDto: CreateDeliveryDto = {
      orderNo: gifts.value[index.value].orderNo,
      receiver: gifts.value[index.value].receiverName,
      postCode: addressInfo.postCode,
      roadAddress: addressInfo.roadAddress,
      detailAddress: addressInfo.detailAddress,
      phoneNumber: addressInfo.phoneNumber
    }
    await createDelivery(deliveryDto)
    gifts.value[index.value].status = '선물 수락'
  }
}
</script>

<template>
  <List
    v-if="gifts"
    item-layout="vertical"
    size="small"
    :pagination="pagination"
    :data-source="gifts"
  >
    <GiftAddressModal
      v-if="isModalVisible"
      :closeModal="closeModal"
      @submit="(deliveryInfo) => fill(deliveryInfo)"
    />
    <template #renderItem="{ item, index }">
      <ListItem :key="index">
        <template #extra>
          <img alt="productImg" :src="`${VITE_STATIC_IMG_URL}${item.imgUrl}?w=150&h=130`" />
        </template>
        <ListItemMeta>
          <template #title>
            <a>주문 번호 : {{ item.orderNo }}</a>
            <div class="product-name">상품 이름 : {{ item.productName }}</div>
          </template>
        </ListItemMeta>
        <div class="content">
          <div>보낸 이: {{ item.senderName }}</div>
          <span>상태 : {{ item.status }}</span>
        </div>
        <Button v-if="item.status === '주문 완료'" @click="openModal(index)">수락 하기</Button>
        <Button v-else @click="showModal(index)">배송 확인</Button>
      </ListItem>
    </template>
  </List>
  <Modal v-model:open="open" title="배송 조회" @ok="handleOk">
    <div class="delivery-modal-p">
      <p>받는이 : {{ deliveryInfo?.receiver }}</p>
      <p>우편번호 : {{ deliveryInfo?.postCode }}</p>
      <p>도로명 주소 : {{ deliveryInfo?.roadAddress }}</p>
      <p>상세 주소 : {{ deliveryInfo?.detailAddress }}</p>
      <p>핸드폰 번호 : {{ deliveryInfo?.phoneNumber }}</p>
      <p>배송 상태 : {{ deliveryInfo?.status }}</p>
    </div>
  </Modal>
</template>

<style scoped>
.line {
  padding-top: 10px;
  border-bottom: 1px solid #c6c6c6;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 15px;
}
.product-name {
  padding-top: 5px;
}

.delivery-modal-p {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}
</style>
