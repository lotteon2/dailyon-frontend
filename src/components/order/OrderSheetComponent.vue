<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product/ProductStore'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const productStore = useProductStore()
const { products, orderType, giftInfo } = storeToRefs(productStore)
</script>
<template>
  <div class="purchase-list-container" v-if="products.length">
    <div class="container-title">주문상품 정보</div>
    <div class="line"></div>
    <div class="shop-wrapper" v-for="(product, index) in products" :key="index">
      <div class="shop-name-div">
        <span v-if="orderType === 'GIFT'">받는 사람 : {{ giftInfo.receiverName }}</span>
        <span></span>
      </div>
      <div class="shop-prod-div">
        <div class="shop-prod-inner-div">
          <h1>{{ product.productName }}</h1>
          <div class="shop-prod-inner-info">
            <img class="info-img" :src="`${VITE_STATIC_IMG_URL}${product.imgUrl}`" alt="" />
            <div class="info-first-col">
              <div class="info-first-col-first-row">
                <div class="button1">옵션</div>
                {{ product.sizeName }}
              </div>
              <div class="info-first-col-first-row">
                <div class="button1">수량</div>
                {{ product.quantity }}
              </div>
            </div>
            <div class="info-second-col">
              <span>상품금액</span>
              <span>할인금액</span>
              <span>할인적용금액</span>
            </div>
            <div class="info-third-col">
              <span>{{ product.orderPrice.toLocaleString() }} 원</span>
              <span
                ><div class="highlight1">
                  {{ product.discountAmount.toLocaleString() }} 원
                </div></span
              >
              <span>
                <div class="highlight2">
                  {{ (product.orderPrice - product.discountAmount).toLocaleString() }} 원
                </div></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/order/order-sheet.css';
</style>
