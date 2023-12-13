<script setup lang="ts">
import { ref } from 'vue'
import OrderDetailComponent from './OrderDetailComponent.vue'
import { getOrderDetails } from '@/apis/order/order'
import type { OrderDetailResponse } from '@/apis/order/orderDto'
const props = defineProps({
  orders: {
    type: Array as () => Array<any>,
    default: () => [],
    required: true
  }
})
const orderDetails = ref<Array<OrderDetailResponse>>([])

const selectedRowIndex = ref<any>(null)

const toggleCard = async (index: string) => {
  const data = await getOrderDetails(index)
  orderDetails.value = data
  selectedRowIndex.value = selectedRowIndex.value === index ? null : index
}
</script>

<template v-if="props.orders">
  <tbody v-for="(order, index) in props.orders" :key="'row-' + index">
    <tr @click="toggleCard(order.orderNo)" class="table-inner-header">
      <th>{{ order.orderNo }}</th>
      <th>{{ order.productsName }}</th>
      <th>{{ order.totalAmount }}</th>
      <th>{{ order.status }}</th>
      <th>{{ order.createdAt }}</th>
    </tr>

    <tr v-if="selectedRowIndex === order.orderNo" :key="'card-' + index">
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
