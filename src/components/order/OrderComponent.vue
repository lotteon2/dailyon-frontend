<script setup lang='ts'>
import { ref } from 'vue'
import OrderDetailComponent from '@/components/order/orderDetail/OrderDetailComponent.vue'
import type { OrderDetailResponse } from '@/apis/order/orderDto'

const emit = defineEmits(['showModal'])
const props = defineProps({
  orders: {
    type: Array as () => Array<any>,
    default: () => [],
    required: true
  }
})

const selectedRowIndex = ref<any>(null)

const toggleCard = async (orderNo: string) => {
  emit('showModal', orderNo)
}
</script>

<template v-if='props.orders'>
  <tbody v-for='(order, index) in props.orders' :key="'row-' + index">
  <tr @click='toggleCard(order.orderNo)' class='table-inner-header'>
    <th>{{ order.orderNo }}</th>
    <th>{{ order.productsName }}</th>
    <th>{{ order.totalAmount }}</th>
    <th>{{ order.status }}</th>
    <th>{{ order.createdAt }}</th>
  </tr>

  <tr v-if='selectedRowIndex === order.orderNo' :key="'card-' + index">
    <td colspan='6'>
      <div class='order-history'>
        <OrderDetailComponent :orderNo='order.orderNo' />
      </div>
    </td>
  </tr>
  </tbody>
</template>

<style scoped>
@import '@/assets/css/order/order-history.css';
</style>
