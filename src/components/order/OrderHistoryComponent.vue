<script setup lang="ts">
import { ref, onBeforeMount, watchEffect } from 'vue'
import { getOrders } from '@/apis/order/order'
import type { OrderPageResponse, OrderResponse } from '@/apis/order/orderDto'
import PaginationComponent from '../ootd/PaginationComponent.vue'
import OrderHistoryComponent from './OrderComponent.vue'

const requestPage = ref<number>(0)
const totalElements = ref<Number | null>(0)
const totalPages = ref<number>()
const orders = ref<Array<OrderResponse>>([])

const fetchDefaultData = async (requestPage: number): Promise<void> => {
  const data = await getOrders(requestPage)
  orders.value = data.orders
  totalElements.value = data.totalElements
  totalPages.value = data.totalPages
}

onBeforeMount(async () => {
  await fetchDefaultData(0)
})

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
    <div class="inner-title-container">
      <div class="container-inner-title">주문 상태</div>
      <div class="container-inner-title2">(최근 한 달 기준)</div>
    </div>
    <div class="process-container">
      <div class="process-column">
        <h1>0</h1>
        <h2>입금 확인 중</h2>
        <h3>
          입금 확인이 되지 않은 상태입니다. <br />안내된 시간 이내 미입금 시 <br />주문이 자동
          취소됩니다.
        </h3>
        <h4>- 주문취소 가능</h4>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="30"
        viewBox="0 0 17 30"
        fill="none"
      >
        <path
          d="M1.4985 29.9999C1.30197 30.0023 1.10711 29.9635 0.926456 29.8861C0.745803 29.8087 0.583352 29.6943 0.449549 29.5503C-0.14985 28.951 -0.14985 28.0219 0.449549 27.4225L12.8871 14.985L0.449549 2.57741C-0.14985 1.97801 -0.14985 1.04895 0.449549 0.449549C1.04895 -0.14985 1.97802 -0.14985 2.57741 0.449549L16.0339 13.966C16.6333 14.5654 16.6333 15.4944 16.0339 16.0938L2.54744 29.5503C2.24774 29.85 1.85814 29.9999 1.4985 29.9999Z"
          fill="#C6C6C6"
        />
      </svg>
      <div class="process-column">
        <h1>0</h1>
        <h2>배송 준비중</h2>
        <h3>물류센터에서 <br />주문하신 상품을 준비 중입니다.</h3>
        <h4>- 배송지 변경, 주문취소 가능</h4>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="30"
        viewBox="0 0 17 30"
        fill="none"
      >
        <path
          d="M1.4985 29.9999C1.30197 30.0023 1.10711 29.9635 0.926456 29.8861C0.745803 29.8087 0.583352 29.6943 0.449549 29.5503C-0.14985 28.951 -0.14985 28.0219 0.449549 27.4225L12.8871 14.985L0.449549 2.57741C-0.14985 1.97801 -0.14985 1.04895 0.449549 0.449549C1.04895 -0.14985 1.97802 -0.14985 2.57741 0.449549L16.0339 13.966C16.6333 14.5654 16.6333 15.4944 16.0339 16.0938L2.54744 29.5503C2.24774 29.85 1.85814 29.9999 1.4985 29.9999Z"
          fill="#C6C6C6"
        />
      </svg>
      <div class="process-column">
        <h1>0</h1>
        <h2>배송중</h2>
        <h3>택배사에 상품이 접수되어 <br />고객님께 배송 중입니다. 취소됩니다.</h3>
        <h4>- 주문취소 불가</h4>
        <h4>- 운송장번호 조회 가능</h4>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="30"
        viewBox="0 0 17 30"
        fill="none"
      >
        <path
          d="M1.4985 29.9999C1.30197 30.0023 1.10711 29.9635 0.926456 29.8861C0.745803 29.8087 0.583352 29.6943 0.449549 29.5503C-0.14985 28.951 -0.14985 28.0219 0.449549 27.4225L12.8871 14.985L0.449549 2.57741C-0.14985 1.97801 -0.14985 1.04895 0.449549 0.449549C1.04895 -0.14985 1.97802 -0.14985 2.57741 0.449549L16.0339 13.966C16.6333 14.5654 16.6333 15.4944 16.0339 16.0938L2.54744 29.5503C2.24774 29.85 1.85814 29.9999 1.4985 29.9999Z"
          fill="#C6C6C6"
        />
      </svg>
      <div class="process-column">
        <h1>0</h1>
        <h2>배송 완료</h2>
        <h3>상품이 고객님께 전달 완료되었습니다.</h3>
        <h4>- 교환/환불/AS 신청 가능</h4>
      </div>
    </div>
    <div class="container-inner-line"></div>
    <div class="inner-title-container">
      <div class="container-inner-title">주문 내역&nbsp;&nbsp;</div>
      <div class="container-inner-title3">주문내역입니다.</div>
    </div>
    <!-- v-model="selectedOrderType" @change="filterOrders" -->
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
      <OrderHistoryComponent :orders="orders" />
    </table>
    <PaginationComponent
      :onChangePage="onChangePage"
      :requestPage="requestPage"
      :totalPages="totalPages"
    />
    <!-- <div class="button-container">
      <div class="button-row">
        <div class="grey-button2">주문 취소</div>
      </div>
      <div class="button-row">
        <div class="black-button">배송지 변경</div>
        <div class="grey-button2">주문 취소</div>
      </div>
      <div class="button-row">
        <div class="black-button">운송장번호 조회</div>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
@import '@/assets/css/order-history.css';
</style>
