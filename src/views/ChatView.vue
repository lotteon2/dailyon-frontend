<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { StatisticCountdown, message, Image, ImagePreviewGroup } from 'ant-design-vue'
import type { CreateBidRequest } from '@/apis/auction/AuctionDto'
import { createBid, enter } from '@/apis/auction/Auction'
import { useRoute } from 'vue-router'
import { useAuctionStore } from '@/stores/auction/AuctionStore'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '@/components/auction/LoadingSpinner.vue'
const VITE_AUCTION_WS_URL: string = import.meta.env.VITE_AUCTION_WS_URL
const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)
const auctionStore = useAuctionStore()
const { auctionDetail } = storeToRefs(auctionStore)
// 더미데이터
interface userInfo {
  userId: number
  nickname: string
}

interface Message extends userInfo {
  message: string
}

interface Bid {
  rank: number
  nickname: string
  amount: number
}

const bids = ref<Bid[]>([
  {
    rank: 1,
    nickname: 'test1232131231',
    amount: 500000
  },
  {
    rank: 2,
    nickname: 'test2',
    amount: 400000
  },
  {
    rank: 3,
    nickname: 'test3',
    amount: 300000
  }
])

const isLoading = ref<boolean>(true)
const showModal = ref(false)
const currentBid = ref<number>(200000)
const countingTime = ref<number>(15)
const AuctionDeadline = Date.now() + 1000 * 60 * 5
const roundDeadline = Date.now() + 1000 * 30
const round = ref<Number>(1)
const onFinish = () => {
  console.log('finished!')
}
// 더미데이터 끝
const userInfo = ref<userInfo>({
  userId: Math.floor(Math.random() * 10000),
  nickname: 'test:' + Math.floor(Math.random() * 100)
})
const route = useRoute()
const chatMessages = ref<any>(null)
const socket = ref<WebSocket | null>(null)

const connected = ref(false)
const messages = ref<Message[]>([])
const newMessage = ref<string>('')

const closeModal = () => {
  showModal.value = false
}
onMounted(async () => {
  const response = await enter(String(route.params.auctionId))
  console.log(auctionDetail.value)
  auctionStore.setToken(response.data)
  currentBid.value = auctionDetail.value.auctionResponse.startBidPrice
  await connect()
})
onUnmounted(() => {
  disconnect()
})
const connect = async () => {
  const websocketUrl = `${VITE_AUCTION_WS_URL}/chat?id=${userInfo.value.userId}`
  socket.value = new WebSocket(websocketUrl)
  socket.value.onopen = () => {
    console.log(`connected`)
    connected.value = true
  }
  socket.value.onerror = (error) => {
    console.log(`could not connect `)
    console.error(error)
  }

  socket.value.onmessage = (message) => {
    if (message.data) {
      messages.value.push(JSON.parse(message.data))
      scrollDown()
    }
  }

  socket.value.onclose = (error) => {
    console.log(`disconnected `)
    connected.value = false
    if (error instanceof CloseEvent) {
      console.log(`CloseEvent code: ${error.code}, reason: ${error.reason}`)
    } else {
      console.error(error)
    }
  }
}

const disconnect = () => {
  if (socket.value) {
    console.log('소켓 연결 해제중....')
    socket.value.close()
  }
}

const send = () => {
  if (!newMessage.value) {
    return
  }
  if (connected.value && socket.value) {
    const message: Message = {
      userId: userInfo.value.userId,
      nickname: userInfo.value.nickname,
      message: newMessage.value
    }
    socket.value.send(JSON.stringify(message))
    newMessage.value = ''
    scrollDown()
  }
}

const bidding = async () => {
  const dummyBidAmount: number = 10000
  const data: CreateBidRequest = {
    auctionId: '1',
    round: '1',
    bidAmount: dummyBidAmount
  }

  const response = await createBid(data)
  console.log(response)
}

const scrollDown = () => {
  nextTick(() => {
    if (chatMessages.value) {
      chatMessages.value.scrollTop = chatMessages.value.scrollHeight
    }
  })
}
</script>

<template>
  <div class="auction-container">
    <div class="left-wrap">
      <div class="product-img-wrap">
        <!-- 대표 썸네일 들어갈 곳 -->
        <div class="thumbnail">
          <img
            class="product-img"
            :src="`${VITE_STATIC_IMG_URL}${auctionDetail.productDetailResponse.imgUrl}`"
            alt="Product Image"
          />
        </div>
        <!-- 상세 이미지들 -->
        <div
          class="detail-img-wrap"
          v-for="(imgUrl, index) in auctionDetail.productDetailResponse.describeImgUrls"
          :key="index"
        >
          <img class="detail-img" :src="`${VITE_STATIC_IMG_URL}${imgUrl}`" alt="Product Image" />
        </div>
        <!-- 상품 detail 이미지 끝 -->

        <!-- 경매 정보 (시작가, 현재 입찰가, 남은시간) -->
        <div class="auction-bid-detail-wrap">
          <span class="auction-starting-price">
            시작가 {{ auctionDetail.auctionResponse.startBidPrice.toLocaleString() }} 원
          </span>
          <span class="current-bid"> 현재 입찰가 {{ currentBid.toLocaleString() }} 원 </span>
          <span class="remain-time">
            <span class="remain-time-span"> 남은 시간 : </span>
            <StatisticCountdown :value="AuctionDeadline" @finish="onFinish" />
          </span>
        </div>
        <!-- 경매 정보 끝 -->
      </div>
    </div>

    <!-- 오른쪽 section -->
    <div class="right-wrap">
      <!-- 채팅 화면, 채팅참여 유저 리스트 -->
      <div class="chat-window">
        <div class="chat-messages" ref="chatMessages">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message', userInfo.userId == message.userId ? 'mine' : 'theirs']"
          >
            <div class="nickname">{{ message.nickname }}</div>
            <div class="text">{{ message.message }}</div>
          </div>
        </div>
        <div class="user-list-wrap">
          <div class="rank-info-wrap">
            <div class="rank-info">
              <div class="nickname-info">닉네임</div>
              <div class="bid-amount-info">입찰금액</div>
            </div>
            <div class="rank">
              <div class="bid-rank" v-for="(bid, index) in bids" :key="index">
                <span class="rank-index">{{ index + 1 }}등 </span>
                <span class="rank-user"> {{ bid.nickname }}</span>
                <span class="rank-user-amount"> {{ bid.amount.toLocaleString() }} 원</span>
              </div>
            </div>
          </div>
          <div class="next-round-timer-wrap">
            <div class="next-round-timer-text">{{ `${round}` }} 라운드 종료까지</div>
            <div class="next-round-timer">
              <span><StatisticCountdown :value="roundDeadline" @finish="onFinish" /></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 현재 낙찰가 + 버튼 , 사용자 입력 금액 버튼 -->
      <div class="bid-button-wrap">
        <button class="currnt-winning-bid-btn" @click="bidding">현재 낙찰 가의 {{}}원</button>
        <button class="input-btn">사용자 입력 금액</button>
      </div>
      <!-- 채팅 입력창 들어갈 자리 -->
      <div class="chat-input">
        <input type="text" v-model="newMessage" class="send-message-text" @keyup.enter="send" />
        <div class="send-message-btn"><span class="btn-text" @click="send">보내기</span></div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="modal">
    <div class="modal-content" @click.stop>
      <LoadingSpinner id="imgLoading" v-if="isLoading" />
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/auction/chat.css';
.modal {
  display: block;
  position: fixed;
  z-index: 5;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #fefefe;
  position: fixed;
  top: 20%;
  padding: 20px;
  border: 1px solid var(--Grayscale4, #c6c6c6);
  border-radius: 15px;
  left: 25%;
  width: 50%;
  height: 500px;
  overflow-y: scroll;
}

.modal-content {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.modal-content::-webkit-scrollbar {
  display: none;
}

.close {
  right: 23.5%;
  top: 11%;
  position: fixed;
  color: #aaa;
  float: right;
  font-size: 25px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
