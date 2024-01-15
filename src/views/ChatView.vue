<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick, computed } from 'vue'
import { StatisticCountdown, message, Image, ImagePreviewGroup } from 'ant-design-vue'
import type { CreateBidRequest } from '@/apis/auction/AuctionDto'
import { createBid, enter } from '@/apis/auction/Auction'
import { useRoute } from 'vue-router'
import { useAuctionStore } from '@/stores/auction/AuctionStore'
import { useMemberStore } from '@/stores/member/MemberStore'
import { storeToRefs } from 'pinia'
const VITE_AUCTION_WS_URL: string = import.meta.env.VITE_AUCTION_WS_URL
const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)
const mebmerStore = useMemberStore()
const auctionStore = useAuctionStore()
const { auctionDetail } = storeToRefs(auctionStore)
const { nickname } = storeToRefs(mebmerStore)
// 더미데이터
interface userInfo {
  userId: number
  nickname: string | null
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
const showModal = ref(false)
const currentBid = ref<number>(0)
const roundDeadline = ref(0)
const countDeadline = ref(0)
const deadLine = ref(0)
const round = ref<string>('1')
const onFinish = () => {
  roundDeadline.value = 0
  countDeadline.value = 0
  deadLine.value = 0
}
// 더미데이터 끝
const userInfo = ref<userInfo>({
  userId: Math.floor(Math.random() * 10000),
  nickname: nickname.value
})
const route = useRoute()
const chatMessages = ref<any>(null)
const socket = ref<WebSocket | null>(null)
const connected = ref(false)
const messages = ref<Message[]>([])
const newMessage = ref<string>('')

// timer
const totalSeconds = ref(300) // 5분
const intervalId = ref<any>(null)

const minutes = ref(Math.floor(totalSeconds.value / 60))
const seconds = ref(totalSeconds.value % 60)

const isRoundEnd = ref(false)

const startTimer = () => {
  intervalId.value = setInterval(() => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--
      minutes.value = Math.floor(totalSeconds.value / 60)
      seconds.value = totalSeconds.value % 60
    } else {
      clearInterval(intervalId.value)
    }
  }, 1000)
  totalSeconds.value--
  minutes.value = Math.floor(totalSeconds.value / 60)
  seconds.value = totalSeconds.value % 60
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
const start = () => {
  startTimer()
  isRoundEnd.value = false
  deadLine.value = Date.now() + 1000 * 60 * 5
  roundDeadline.value = Date.now() + 1000 * 30
}

const roundFinish = () => {
  roundEnd()
}

const roundEnd = () => {
  isRoundEnd.value = true
  round.value = String(Number(round.value) + 1)
  countDeadline.value = Date.now() + 1000 * 30
}

const countFinish = () => {
  isRoundEnd.value = false
  roundDeadline.value = Date.now() + 1000 * 30
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
    auctionId: auctionDetail.value.auctionResponse.id,
    round: round.value,
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
            <StatisticCountdown :value="deadLine" @finish="onFinish" />
          </span>
          <button @click="start">start</button>
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
          <div class="next-round-timer-wrap" v-if="!isRoundEnd">
            <div class="next-round-timer-text">{{ `${round}` }} 라운드 종료까지</div>
            <div class="next-round-timer">
              <span><StatisticCountdown :value="roundDeadline" @finish="roundFinish" /></span>
            </div>
          </div>
          <div class="next-round-timer-wrap" v-else>
            <div class="next-round-timer-text">집계 시간</div>
            <div class="next-round-timer">
              <span><StatisticCountdown :value="countDeadline" @finish="countFinish" /></span>
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
  <!-- <div v-if="showModal" class="modal">
    <div class="modal-content" @click.stop>
      <div class="timer-header">
        <StatisticCountdown :value="countDeadline" @finish="countFinish" />
      </div>
      <div class="loader">
        <div class="circle" id="a"></div>
        <div class="circle" id="b"></div>
        <div class="circle" id="c"></div>
      </div>
      <div class="caption">
        <span>집계 중입니다...</span>
      </div>
    </div>
  </div> -->
</template>

<style scoped>
@import '@/assets/css/auction/chat.css';
</style>
