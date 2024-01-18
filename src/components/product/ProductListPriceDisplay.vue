<template>
  <div
    class="product-price"
    :class="hasDiscount ? 'product-price--has-discount' : 'product-price--no-discount'"
  >
    <div v-if="hasDiscount" class="product-price__original-and-discount">
      <div class="product-price__original">
        <del>{{ originalPrice?.toLocaleString() }}원</del>
      </div>
      <div class="product-price__discount-and-final">
        <span class="product-price__discount">{{ discountPercentage }}%</span>
        <strong class="product-price__final">{{ finalPrice?.toLocaleString() }}원</strong>
      </div>
    </div>
    <strong v-else class="product-price__final">{{ finalPrice?.toLocaleString() }}원</strong>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  originalPrice: Number,
  discountPercentage: {
    type: Number,
    default: 0
  },
  finalPrice: Number
})

const hasDiscount = computed(() => props.discountPercentage > 0)
</script>

<style scoped>
.product-price {
  display: flex;
  flex-direction: column;
}

.product-price__original-and-discount {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.product-price__discount-and-final {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* margin-left: auto; */
  /* margin-left 안넣는게 좋을까요? 😀 */
}

.product-price__original,
.product-price__discount,
.product-price__final {
  font-size: 18px;
  line-height: 24px;
}

.product-price__original {
  font-size: 16px;
  color: #888;
  text-decoration: line-through;
}

.product-price__discount {
  color: #c22727;
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px; /* Adjust spacing between discount and final price */
}

.product-price__final {
  font-weight: 700;
  color: #000;
}

.product-price--no-discount .product-price__final {
  margin-left: auto;
}
</style>
