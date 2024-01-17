<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { getOrders } from '@/apis/order/order'
import type { OrderResponse } from '@/apis/order/orderDto'
import PaginationComponent from '../ootd/PaginationComponent.vue'
import OrderComponent from './OrderComponent.vue'
import OrderDetailComponent from '@/components/order/orderDetail/OrderDetailComponent.vue'
import WhitePageComponent from '../wishcart/WhitePageComponent.vue'
import { Select, SelectOption, type SelectProps } from 'ant-design-vue'
import type { DefaultOptionType, SelectValue } from 'ant-design-vue/es/select'

const requestPage = ref<number>(0)
const totalElements = ref<Number | null>(0)
const totalPages = ref<number>()
const orders = ref<Array<OrderResponse>>([])
const orderNo = ref<string>('')
const showModal = ref<boolean>(false)

const defaultOption = ref({
  value: 'SINGLE',
  label: '일반주문'
})
const options = ref<SelectProps['options']>([
  {
    value: 'SINGLE',
    label: '일반주문'
  },
  {
    value: 'AUCTION',
    label: '경매주문'
  }
])

const selectedOption = ref<string>('SINGLE')

onBeforeMount(async () => {
  await fetchDefaultData(0, defaultOption.value.value)
})

const fetchDefaultData = async (requestPage: number, type: string): Promise<void> => {
  const data = await getOrders(requestPage, type)
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

watch(requestPage, async (afterPage, beforePage) => {
  if (afterPage < totalPages.value!) {
    fetchDefaultData(requestPage.value, selectedOption.value), requestPage.value
  }
})

// TODO: Select 옵션 변경 이벤트
const handleSelectedOptionChange = async (
  value: SelectValue,
  option: DefaultOptionType | DefaultOptionType[]
) => {
  selectedOption.value = String(value)
  await fetchDefaultData(0, selectedOption.value)
}
</script>
<template>
  <div class="order-check-container">
    <div class="container-title">주문/배송 조회</div>
    <div class="container-line"></div>
    <div v-if="orders.length !== 0">
      <div class="container-inner-line"></div>
      <div class="inner-title-container">
        <div class="container-inner-title">주문 내역&nbsp;&nbsp;</div>
      </div>
      <div class="order-type-select-wrapper">
        <Select
          class="order-type-select"
          @change="handleSelectedOptionChange"
          v-model:value="defaultOption"
          :options="options"
        >
        </Select>
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
    <div v-else>
      <WhitePageComponent message="주문 내역이 없습니다" />
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/order/order-history.css';
</style>
