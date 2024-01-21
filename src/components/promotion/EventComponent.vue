<script setup lang="ts">
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import { onBeforeMount, ref, watch } from 'vue'
import type {
  ReadAuctionHistoryPageResponse,
  ReadAuctionHistoryResponse
} from '@/apis/auction/AuctionDto'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'
import { getAuctionHistory } from '@/apis/auction/AuctionClient'

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

  // dummy data
  // totalElements.value = 3
  // totalPages.value = 1
  // histories.value = [
  //   {
  //     id: 'AH1',
  //     memberId: '1',
  //     auctionId: 'A1',
  //     auctionName: 'A1',
  //     auctionProductId: 101,
  //     auctionProductImg: 'https://dummyimage.com/200',
  //     auctionProductName: '상품A',
  //     auctionProductSizeId: 1,
  //     auctionProductSizeName: '소형',
  //     winner: true,
  //     paid: false,
  //     amountToPay: 10000,
  //     memberHighestBid: 12000,
  //     auctionWinnerBid: 10000,
  //     createdAt: '2024-02-01T00:00:00'
  //   },
  //   {
  //     id: 'AH2',
  //     memberId: '1',
  //     auctionId: 'A2',
  //     auctionName: 'A2',
  //     auctionProductId: 102,
  //     auctionProductImg: 'https://dummyimage.com/200',
  //     auctionProductName: '상품B',
  //     auctionProductSizeId: 2,
  //     auctionProductSizeName: '중형',
  //     winner: false,
  //     paid: false,
  //     amountToPay: 20000,
  //     memberHighestBid: 22000,
  //     auctionWinnerBid: 20000,
  //     createdAt: '2024-02-01T00:00:00'
  //   },
  //   {
  //     id: 'AH3',
  //     memberId: '1',
  //     auctionId: 'A3',
  //     auctionName: 'A3',
  //     auctionProductId: 103,
  //     auctionProductImg: 'https://dummyimage.com/200',
  //     auctionProductName: '상품C',
  //     auctionProductSizeId: 3,
  //     auctionProductSizeName: '대형',
  //     winner: true,
  //     paid: true,
  //     amountToPay: 30000,
  //     memberHighestBid: 33000,
  //     auctionWinnerBid: 30000,
  //     createdAt: '2024-02-01T00:00:00'
  //   }
  // ]
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

const orderAuctionProduct = (history: ReadAuctionHistoryResponse) => {
  console.log(history)
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
