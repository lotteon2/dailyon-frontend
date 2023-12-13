<script setup lang="ts">
import { ref } from 'vue'
import OrderDetailComponent from './OrderDetailComponent.vue'

const props = defineProps({
  orders: {
    type: Array as () => Array<any>,
    default: () => [],
    required: true
  }
})

const orderDetails = ref<any>([
  {
    id: 1,
    orderNo: '20231213-0001',
    productName: '상품명1',
    productQuantity: 1,
    thumbnail: '상품이미지URL1',
    orderPrice: 100000,
    status: '배송준비중'
  },
  {
    id: 2,
    orderNo: '20231213-0002',
    productName: '상품명2',
    productQuantity: 2,
    thumbnail: '상품이미지URL2',
    orderPrice: 200000,
    status: '배송중'
  },
  {
    id: 3,
    orderNo: '20231213-0003',
    productName: '상품명3',
    productQuantity: 3,
    thumbnail: '상품이미지URL3',
    orderPrice: 300000,
    status: '배송완료'
  }
])

const selectedRowIndex = ref<any>(null)

const toggleCard = (index: any) => {
  selectedRowIndex.value = selectedRowIndex.value === index ? null : index
}
</script>

<template v-if="props.orders">
  <tbody v-for="(order, index) in props.orders" :key="'row-' + index">
    <tr @click="toggleCard(index)" class="table-inner-header">
      <th>{{ order.orderNumber }}</th>
      <th>{{ order.productName }}</th>
      <th>{{ order.price }}</th>
      <th>{{ order.status }}</th>
      <th>{{ order.paymentDate }}</th>
    </tr>

    <tr v-if="selectedRowIndex === index" :key="'card-' + index">
      <td colspan="6">
        <div class="order-history">
          <OrderDetailComponent :orderDetails="orderDetails" />
        </div>
      </td>
    </tr>
  </tbody>
</template>

<style scoped>
@import '@/assets/css/order-history.css';
</style>
