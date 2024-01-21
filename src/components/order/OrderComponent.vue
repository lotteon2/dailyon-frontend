<script setup lang="ts">
import { ref } from 'vue'
import OrderDetailComponent from '@/components/order/orderDetail/OrderDetailComponent.vue'
import type { OrderDetailResponse, OrderResponse } from '@/apis/order/orderDto'

const emit = defineEmits(['showModal'])
const props = defineProps({
  orders: {
    type: Array as () => Array<any>,
    default: () => [],
    required: true
  }
})

const selectedRowIndex = ref<any>(null)

const toggleCard = async (order: OrderResponse) => {
  emit('showModal', order)
}
</script>

<template v-if="props.orders">
  <tbody>
    <tr
      v-for="(order, index) in props.orders"
      :key="'row-' + index"
      @click="toggleCard(order)"
      class="table-inner-header"
    >
      <td>{{ order.orderNo }}</td>
      <td>{{ order.productsName }}</td>
      <td>{{ order.totalAmount.toLocaleString() }} 원</td>
      <td>{{ order.usedPoints.toLocaleString() }} 원</td>
      <td>{{ order.status }}</td>
      <td>{{ order.createdAt }}</td>
    </tr>
  </tbody>
</template>

<style scoped>
@import '@/assets/css/order/order-history.css';
</style>
