<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product/ProductStore'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const productStore = useProductStore()
const { products, orderType, giftInfo } = storeToRefs(productStore)

const deleteItem = async (index: number) => {}
</script>
<template>
  <div class="purchase-list-container" v-if="products.length">
    <div class="container-title">주문상품 정보</div>
    <div class="line"></div>
    <div class="shop-wrapper" v-for="(product, index) in products" :key="index">
      <div class="shop-name-div">
        <span v-if="orderType === 'GIFT'">받는 사람 : {{ giftInfo.receiverName }}</span>
        <span>배송: 배송비</span>
      </div>
      <div class="shop-prod-div">
        <svg
          class="prod-delete-button"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          @click="deleteItem(index)"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.488464 0.508303C0.800696 0.196165 1.22412 0.0208154 1.66561 0.0208154C2.10711 0.0208154 2.53053 0.196165 2.84276 0.508303L9.99057 7.65611L17.1384 0.508303C17.292 0.349279 17.4757 0.222436 17.6788 0.135175C17.882 0.0479149 18.1004 0.00198396 18.3215 6.28652e-05C18.5426 -0.00185823 18.7618 0.0402685 18.9665 0.123986C19.1711 0.207703 19.357 0.331334 19.5133 0.487664C19.6696 0.643995 19.7933 0.829895 19.877 1.03452C19.9607 1.23914 20.0028 1.45838 20.0009 1.67946C19.999 1.90054 19.9531 2.11902 19.8658 2.32215C19.7785 2.52529 19.6517 2.70901 19.4927 2.8626L12.3449 10.0104L19.4927 17.1582C19.796 17.4722 19.9638 17.8928 19.96 18.3294C19.9562 18.7659 19.7811 19.1835 19.4724 19.4922C19.1637 19.8009 18.7461 19.976 18.3095 19.9798C17.873 19.9836 17.4524 19.8158 17.1384 19.5125L9.99057 12.3647L2.84276 19.5125C2.52874 19.8158 2.10816 19.9836 1.6716 19.9798C1.23505 19.976 0.817448 19.8009 0.508745 19.4922C0.200043 19.1835 0.0249367 18.7659 0.0211432 18.3294C0.0173496 17.8928 0.185172 17.4722 0.488464 17.1582L7.63627 10.0104L0.488464 2.8626C0.176326 2.55037 0.000976562 2.12695 0.000976562 1.68545C0.000976562 1.24396 0.176326 0.820534 0.488464 0.508303Z"
            fill="#808080"
          />
        </svg>
        <div class="shop-prod-inner-div">
          <h1>{{ product.productName }}</h1>
          <div class="shop-prod-inner-info">
            <img class="info-img" src="@/assets/images/prod-img.png" alt="" />
            <div class="info-first-col">
              <div class="info-first-col-first-row">
                <div class="button1">옵션</div>
                {{ product.sizeName }}
              </div>
              <div class="info-first-col-first-row">
                <div class="button1">수량</div>
                {{ product.quantity }}
              </div>
              <div class="button2"><span>옵션/수량 변경</span></div>
            </div>
            <div class="info-second-col">
              <span>상품금액</span>
              <span>할인금액</span>
              <span>할인적용금액</span>
            </div>
            <div class="info-third-col">
              <span>{{ product.orderPrice.toLocaleString() }} 원</span>
              <span><div class="highlight1">{{}}</div></span>
              <span> <div class="highlight2">{{}}</div></span>
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
