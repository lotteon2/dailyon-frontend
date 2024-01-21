<script setup lang="ts">
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import { onBeforeMount, ref, watch } from 'vue'
import type {
  ReadAuctionHistoryPageResponse,
  ReadAuctionHistoryResponse
} from '@/apis/auction/AuctionDto'
import type { ProductInfo } from '@/apis/product/ProductDto'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'
import { getAuctionHistory } from '@/apis/auction/AuctionClient'
import { useProductStore } from '@/stores/product/ProductStore'
import router from '@/router'
const productStore = useProductStore()
const requestSize: number = 4
const requestPage = ref<number>(0)
const totalPages = ref<number>(0)
const totalElements = ref<number>(0)
const histories = ref<ReadAuctionHistoryResponse[]>([])

const fetchData = async () => {
  const response: ReadAuctionHistoryPageResponse = await getAuctionHistory(
    requestPage.value,
    requestSize
  )
  totalPages.value = response.totalPages
  totalElements.value = response.totalElements
  histories.value = response.responses
}

const onChangePage = async (page: number) => {
  if (0 <= page && page < totalPages.value) {
    requestPage.value = page
  }
}

watch(requestPage, async (afterPage: number, beforePage: number) => {
  if (afterPage < totalPages.value) {
    const response: ReadAuctionHistoryPageResponse = await getAuctionHistory(afterPage, requestSize)
    totalPages.value = response.totalPages
    totalElements.value = response.totalElements
    histories.value = response.responses
  }
})

const orderAuctionProduct = async (history: ReadAuctionHistoryResponse) => {
  const productInfo: ProductInfo[] = [
    {
      productId: history.auctionProductId,
      productName: history.auctionProductName,
      categoryId: null,
      imgUrl: history.auctionProductImg,
      sizeId: history.auctionProductSizeId,
      sizeName: history.auctionProductSizeName,
      orderPrice: history.auctionWinnerBid,
      quantity: 1,
      couponInfoId: null,
      discountAmount: 0
    }
  ]
  await productStore.setProducts(productInfo, 'AUCTION', null, history.auctionId)
  router.push('/orders')
}

const formatDate = (localDateTime: string) => {
  // Assuming localDateTime is in ISO string format, adjust as necessary
  return localDateTime.replace(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*$/,
    '$1년 $2월 $3일 $4:$5'
  )
}

onBeforeMount(fetchData)
</script>

<template>
  <div class="event-container" v-if="histories && histories.length > 0">
    <div class="container-title">이벤트 관리</div>
    <div class="container-line"></div>
    <div class="table-block">
      <table>
        <thead>
          <tr>
            <th>경매 이름</th>
            <th>경매 상품명</th>
            <th>진행 일자</th>
            <th>내 최고 입찰금액</th>
            <th>낙찰 금액</th>
            <th>낙찰 여부</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(history, idx) in histories" :key="idx">
            <td>{{ history.auctionName }}</td>
            <td>{{ history.auctionProductName }}</td>
            <td>{{ formatDate(history.createdAt) }}</td>
            <td>{{ history.memberHighestBid.toLocaleString() }} 원</td>
            <td>{{ history.auctionWinnerBid.toLocaleString() }} 원</td>
            <td>{{ history.winner === true ? 'T' : 'F' }}</td>
            <td>
              <div
                class="use-button"
                v-if="history.winner && !history.paid"
                @click="orderAuctionProduct(histories[idx])"
              >
                결제하기
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationComponent
      :total-pages="totalPages"
      :request-page="requestPage"
      :on-change-page="onChangePage"
    />
  </div>
  <div v-else style="height: 20vh">
    <WhitePageComponent message="참여한 경매가 없습니다" />
  </div>
</template>

<style scoped>
@import '@/assets/css/event.css';
</style>
