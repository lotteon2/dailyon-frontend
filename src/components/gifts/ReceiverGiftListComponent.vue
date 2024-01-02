<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { List, ListItem, ListItemMeta, Button } from 'ant-design-vue'
import { getReceiverGifts } from '@/apis/order/order'
import { createDelivery } from '@/apis/delivery/delivery'
import type { GiftPageResponse, GiftResponse } from '@/apis/order/orderDto'
import type { CreateDeliveryDto } from '@/apis/delivery/deliveryDto'
import GiftAddressModal from './GiftAddressModal.vue'
const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)
const gifts = ref<GiftResponse[]>([])
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
        <Button v-else>배송 확인</Button>
      </ListItem>
    </template>
  </List>
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
</style>
