<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { List, ListItem, ListItemMeta } from 'ant-design-vue'
import { getSenderGifts } from '@/apis/order/order'
import type { GiftPageResponse, GiftResponse } from '@/apis/order/orderDto'
const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)
const gifts = ref<GiftResponse[]>()
const pagination = {
  onChange: async (page: number) => {
    const data = await getSenderGifts(page - 1)
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
  const data = await getSenderGifts(0)
  gifts.value = data.gifts
  pagination.total = data.totalElements
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
    <template #renderItem="{ item }">
      <ListItem key="item.index">
        <template #extra>
          <img alt="productImg" :src="`${VITE_STATIC_IMG_URL}${item.imgUrl}?w=200&h=190`" />
        </template>
        <ListItemMeta>
          <template #title>
            <a>주문 번호 : {{ item.orderNo }}</a>
            <div class="product-name">상품 이름 : {{ item.productName }}</div>
          </template>
        </ListItemMeta>
        <div class="content">
          <div>받은 이: {{ item.receiverName }}</div>
          <span>상태 : {{ item.status }}</span>
        </div>
      </ListItem>
    </template>
  </List>
</template>

<style scoped>
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
