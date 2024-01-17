<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { StatisticCountdown, message, Image, ImagePreviewGroup, Modal } from 'ant-design-vue'
import type { CreateBidRequest, ReadAuctionResponse } from '@/apis/auction/AuctionDto'
import type { ReadProductDetailResponse } from '@/apis/product/ProductDto'
import { createBid, enter, startBid } from '@/apis/auction/Auction'
import { useRoute } from 'vue-router'
import { useAuctionStore } from '@/stores/auction/AuctionStore'
import { useMemberStore } from '@/stores/member/MemberStore'
import { storeToRefs } from 'pinia'
import router from '@/router'
const VITE_AUCTION_WS_URL: string = import.meta.env.VITE_AUCTION_WS_URL
const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)
const mebmerStore = useMemberStore()
const auctionStore = useAuctionStore()
const { nickname } = storeToRefs(mebmerStore)
const auctionDetail = ref<ReadAuctionResponse>()
const productDetail = ref<ReadProductDetailResponse>()
// 더미데이터
interface userInfo {
  userId: number
  nickname: string | null
}

interface Message extends userInfo {
  message: string
}

interface Bid {
  memberId: number
  nickname: string
  bidAmount: number
}

const bids = ref<Bid[]>([])
// const showModal = ref(false)
const currentBid = ref<number>(0)
const myBidPrice = ref<number>(0)
const deadLine = ref(0)
const round = ref<string>('1')
const isEnd = ref(false)
const isButtonDisabled = ref(false)
const onFinish = async () => {
  isEnd.value = true
  isButtonDisabled.value = true
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

const open = ref<boolean>(false)
const biddingInput = ref<number>(0)

const showModal = () => {
  biddingInput.value = 0
  open.value = true
}

const handleOk = async () => {
  if (biddingInput.value < currentBid.value) {
    message.error('입찰 금액은 현재 낙찰 금액보다 작을 수 없습니다.')
    return
  }
  if (biddingInput.value > productDetail.value!.price) {
    message.error('상품 가격보다 높게 입찰 할 수 없습니다.')
  }
  if (!auctionDetail.value?.started) {
    message.error('아직 경매가 시작되지 않았습니다.')
    open.value = false
    return
  }
  isButtonDisabled.value = true
  const data: CreateBidRequest = {
    auctionId: auctionDetail.value!.id,
    round: round.value,
    bidAmount: biddingInput.value,
    nickname: nickname.value ? nickname.value : ''
  }
  const response = await createBid(data)
  myBidPrice.value = response

  setTimeout(() => {
    isButtonDisabled.value = false // 3초 후에 버튼을 다시 활성화합니다.
  }, 2000)
  open.value = false
}

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
  const res = await enter(String(route.params.auctionId))
  auctionDetail.value = res.readAuctionDetailResponse.auctionResponse
  productDetail.value = res.readAuctionDetailResponse.productDetailResponse
  auctionStore.setToken(res.token)
  currentBid.value = auctionDetail.value.startBidPrice
  await connect()
})

onUnmounted(() => {
  disconnect()
})

const connect = async () => {
  const websocketUrl = `${VITE_AUCTION_WS_URL}/chat`
  socket.value = new WebSocket(websocketUrl)

  socket.value.onopen = () => {
    console.log(`connected`)
    connected.value = true
  }

  socket.value.addEventListener

  socket.value.onerror = (error) => {
    console.log(`could not connect `)
    console.error(error)
  }

  socket.value.onmessage = (payload) => {
    const data = JSON.parse(payload.data)
    switch (data.command) {
      case 'MESSAGE':
        messages.value.push(data.data)
        break
      case 'START':
        start()
        break
      case 'BIDDING':
        bids.value = data.data
        currentBid.value = bids.value[bids.value.length - 1].bidAmount
    }
    scrollDown()
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
  auctionDetail.value!.started = true
  deadLine.value = Date.now() + 1000 * 60 * 5
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
    const payload = {
      command: 'MESSAGE',
      data: message
    }
    socket.value.send(JSON.stringify(payload))
    newMessage.value = ''
    scrollDown()
  }
}

const bidding = async () => {
  const bidAmount: number = currentBid.value + auctionDetail.value!.askingPrice
  if (!validation(bidAmount)) {
    return
  }
  isButtonDisabled.value = true
  const data: CreateBidRequest = {
    auctionId: auctionDetail.value!.id,
    round: round.value,
    bidAmount: bidAmount,
    nickname: nickname.value ? nickname.value : ''
  }
  console.log(data)
  const response = await createBid(data)
  myBidPrice.value = response

  setTimeout(() => {
    isButtonDisabled.value = false
  }, 2000)
}

const scrollDown = () => {
  nextTick(() => {
    if (chatMessages.value) {
      chatMessages.value.scrollTop = chatMessages.value.scrollHeight
    }
  })
}

const test = async () => {
  const response = await startBid()
}

const validation = (bidAmount: number): boolean => {
  if (bidAmount > productDetail.value!.price) {
    message.error('상품 가격보다 높은 가격으로 입찰할 수 없습니다')
    return false
  }

  if (!auctionDetail.value?.started) {
    message.error('아직 경매가 시작되지 않았습니다.')
    return false
  }

  if (auctionDetail.value?.ended) {
    message.error('이미 끝난 경매 입니다.')
    router.push('/')
    return false
  }
  return true
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
            :src="`${VITE_STATIC_IMG_URL}${productDetail?.imgUrl}`"
            alt="Product Image"
          />
        </div>
        <!-- 상세 이미지들 -->
        <div
          class="detail-img-wrap"
          v-for="(imgUrl, index) in productDetail?.describeImgUrls"
          :key="index"
        >
          <img class="detail-img" :src="`${VITE_STATIC_IMG_URL}${imgUrl}`" alt="Product Image" />
        </div>
        <!-- 상품 detail 이미지 끝 -->

        <!-- 경매 정보 (시작가, 현재 입찰가, 내 입찰 가격, 남은시간) -->
        <div class="auction-bid-detail-wrap">
          <span class="my-current-bid" v-if="myBidPrice"
            >내 입찰 가격 : {{ myBidPrice.toLocaleString() }}</span
          >
          <span class="auction-starting-price">
            시작가 {{ auctionDetail?.startBidPrice.toLocaleString() }} 원
          </span>
          <span class="current-bid"> 현재 입찰가 {{ currentBid.toLocaleString() }} 원 </span>
          <span>상품 정가 : {{ productDetail?.price }}</span>
          <span>최대 낙찰 인원 : {{ auctionDetail?.maximumWinner }} 명</span>
          <button @click="test">start</button>
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
                <span class="rank-user-amount"> {{ bid.bidAmount.toLocaleString() }} 원</span>
              </div>
            </div>
          </div>
          <div class="next-round-timer-wrap">
            <div class="next-round-timer-text">남은 시간</div>
            <div class="next-round-timer">
              <StatisticCountdown :value="deadLine" @finish="onFinish" />
            </div>
          </div>
        </div>
      </div>

      <!-- 현재 낙찰가 + 버튼 , 사용자 입력 금액 버튼 -->
      <div class="bid-button-wrap">
        <button
          :disabled="isButtonDisabled"
          :class="{ 'disabled-button': isButtonDisabled }"
          class="currnt-winning-bid-btn"
          @click="bidding"
        >
          현재 낙찰 가의 {{ auctionDetail?.askingPrice.toLocaleString() }} 원
        </button>
        <button
          @click="showModal"
          class="input-btn"
          :class="{ 'disabled-button2': isButtonDisabled }"
        >
          사용자 입력 금액
        </button>
        <Modal v-model:open="open" title="입찰 가격 입력" @ok="handleOk">
          <input type="number" v-model="biddingInput" />
        </Modal>
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
