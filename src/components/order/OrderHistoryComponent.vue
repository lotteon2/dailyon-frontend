<script setup lang="ts">
import { ref, onBeforeMount, watchEffect } from 'vue'
import { getOrders, getOrderDetails } from '@/apis/order/order'
import type { OrderPageResponse, OrderResponse } from '@/apis/order/orderDto'
import PaginationComponent from '../ootd/PaginationComponent.vue'
import OrderComponent from './OrderComponent.vue'
import OrderDetailComponent from '@/components/order/orderDetail/OrderDetailComponent.vue'

const requestPage = ref<number>(0)
const totalElements = ref<Number | null>(0)
const totalPages = ref<number>()
const orders = ref<Array<OrderResponse>>([])
const orderNo = ref<string>('')
const showModal = ref<boolean>(false)

onBeforeMount(async () => {
  await fetchDefaultData(0)
})

const fetchDefaultData = async (requestPage: number): Promise<void> => {
  const data = await getOrders(requestPage)
  orders.value = data.orders
  totalElements.value = data.totalElements
  totalPages.value = data.totalPages
}

const open = async (index: string) => {
  orderNo.value = index
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const onChangePage = async (page: number) => {
  if (page >= 0 && page < totalPages.value!) {
    requestPage.value = page
  }
}

watchEffect(() => {
  fetchDefaultData(requestPage.value), requestPage.value
})
</script>
<template>
  <div class="order-check-container">
    <div class="container-title">주문/배송 조회</div>
    <div class="container-line"></div>
    <div class="container-inner-line"></div>
    <div class="inner-title-container">
      <div class="container-inner-title">주문 내역&nbsp;&nbsp;</div>
    </div>
    <div class="order-type-select-wrapper">
      <select class="order-type-select">
        <option disabled value="">주문 타입을 선택해주세요</option>
        <option value="일반주문">일반주문</option>
        <option value="경매">경매</option>
        <option value="응모">응모</option>
      </select>
    </div>
    <table>
      <col width="200px" />
      <col width="200px" />
      <col width="200px" />
      <col width="200px" />
      <col width="200px" />
      <tr class="table-header">
        <th>주문번호</th>
        <th>상품명</th>
        <th>결제금액</th>
        <th>주문상태</th>
        <th>결제일시</th>
      </tr>
      <OrderComponent :orders="orders" @showModal="(index) => open(index)" />
    </table>
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <OrderDetailComponent :orderNo="orderNo" @closeModal="closeModal" />
      </div>
    </div>
    <PaginationComponent
      :onChangePage="onChangePage"
      :requestPage="requestPage"
      :totalPages="totalPages"
    />
  </div>
</template>

<style scoped>
@import '@/assets/css/order/order-history.css';
</style>
