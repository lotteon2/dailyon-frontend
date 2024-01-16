<script setup lang="ts">
import type { ReadAuctionPageResponse, ReadAuctionResponse } from '@/apis/auction/AuctionDto'
import { onBeforeMount, ref, watch } from 'vue'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import { getAuctionPage } from '@/apis/auction/AuctionClient'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'
import AuctionEntranceModal from '@/components/auction/AuctionEntranceModal.vue'

const props = defineProps({
  path: {
    type: String,
    required: true
  }
})

const isModalVisible = ref<boolean>(false)
const selectedAuctionId = ref<string>('')

const openModal = (auctionId: string) => {
  selectedAuctionId.value = auctionId
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}

let customMessage: string = '기본 메시지'
if (props.path === 'future') {
  customMessage = '진행 예정 경매가 없습니다'
} else if (props.path === 'current') {
  customMessage = '진행 중인 경매가 없습니다'
} else if (props.path === 'past') {
  customMessage = '진행 완료 경매가 없습니다'
}

const requestSize: number = 4
const requestPage = ref<number>(0)
const totalPages = ref<number>(0)
const totalElements = ref<number>(0)
const auctions = ref<ReadAuctionResponse[]>([])

const formatDate = (localDateTime: string) => {
  // Assuming localDateTime is in ISO string format, adjust as necessary
  return localDateTime.replace(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*$/,
    '$1년 $2월 $3일 $4:$5'
  )
}

const onChangePage = async (page: number) => {
  if (0 <= page && page < totalPages.value) {
    requestPage.value = page
  }
}

watch(requestPage, async (afterPage: number, beforePage: number) => {
  if (afterPage < totalPages.value) {
    const response: ReadAuctionPageResponse = await getAuctionPage(
      props.path,
      afterPage,
      requestSize
    )

    totalElements.value = response.totalElements
    totalPages.value = response.totalPages
    auctions.value = response.responses
  }
})

const initData = async () => {
  const response: ReadAuctionPageResponse = await getAuctionPage(
    props.path,
    requestPage.value,
    requestSize
  )
  totalElements.value = response.totalElements
  totalPages.value = response.totalPages
  auctions.value = response.responses
}

onBeforeMount(initData)
</script>

<template>
  <AuctionEntranceModal
    :auction-id="selectedAuctionId"
    :show-modal="isModalVisible"
    @close-modal="closeModal"
  />
  <div v-if="auctions && auctions.length > 0" class="auction-container">
    <div class="table-block">
      <table>
        <thead>
          <tr>
            <th>경매 이름</th>
            <th>입찰 시작가</th>
            <th>최대 낙찰자</th>
            <th>경매 시작 시각</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(auction, index) in auctions" :key="index" @click="openModal(auction.id)">
            <td>{{ auction.auctionName }}</td>
            <td>{{ auction.startBidPrice.toLocaleString() }}원</td>
            <td>{{ auction.maximumWinner }}명</td>
            <td>{{ formatDate(auction.startAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationComponent
      :on-change-page="onChangePage"
      :request-page="requestPage"
      :total-pages="totalPages"
    />
  </div>
  <div v-else style="height: 20vh">
    <WhitePageComponent :message="customMessage" />
  </div>
</template>

<style scoped>
.auction-container {
  width: 54vw;
  display: flex;
  flex-direction: column;
  padding: 10px;

  font-family: 'The Jamsil 2 Light';
}

.table-block {
  padding-bottom: 10px;

  & table {
    width: 100%;

    & thead {
      font-size: 1.25vw;
      font-weight: bold;
      border-top: black 2px solid;
      border-bottom: black 1px solid;

      & tr {
        & th {
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
    }

    & tbody {
      & tr {
        border-bottom: 1px solid #c6c6c6;

        & td {
          font-size: 1vw;
          padding-top: 10px;
          padding-bottom: 10px;
          text-align: center;
        }
      }

      & tr:hover {
        background-color: rgba(0, 0, 0, 0.1);
        cursor: pointer;
      }
    }
  }
}

th:nth-child(1),
td:nth-child(1) {
  width: 30%;
}

th:nth-child(2),
td:nth-child(2),
th:nth-child(3),
td:nth-child(3) {
  width: 20%;
}

th:nth-child(4),
td:nth-child(4) {
  width: 30%;
}
</style>