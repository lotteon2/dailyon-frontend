<template>
  <div class="product-price">
    <template v-if="hasDiscount">
      <span class="product-price__original">
        <del>{{ originalPrice?.toLocaleString() }}원</del>
      </span>
      <span class="product-price__discount">{{ discountPercentage }}%</span>
    </template>
    <strong class="product-price__final">{{ finalPrice?.toLocaleString() }}원</strong>
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
  width: auto;
  height: auto;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  text-align: end; */
  font-family: 'TheJamsil';
}

.product-price {
  display: flex;
  align-items: center;
  font-size: 0; /* inline-block elements간의 의도하지않은 spacing방지용 */
}

.product-price__original,
.product-price__discount,
.product-price__final {
  font-size: 18px; /* 이 컴포넌트의 기본 폰트크기 */
  line-height: 24px; /* 가격은 좀 더 크게 뒀음. */
  display: inline-block;
}

.product-price__original {
  color: #888;
  text-decoration: line-through; /* 긋는 효과 */
  margin-right: 6px;
  font-size: 16px;
}

.product-price__discount {
  color: #c22727;
  margin-right: 7px;
}

.product-price__final {
  font-weight: 700;
  color: #000;
}
</style>
