<template>
  <div @click="applyCoupons" class="apply-button">쿠폰 적용</div>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (event: 'apply-coupons-and-close'): void
}>()

const applyCoupons = () => {
  emit('apply-coupons-and-close')
}
</script>
<style scoped>
@import url('@/assets/css/coupon/checkoutmodal/checkout-modal-footer.css');
</style>
