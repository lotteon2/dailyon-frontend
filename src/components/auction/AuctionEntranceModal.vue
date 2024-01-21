<script setup lang="ts">
import { ref, watch } from 'vue'
import { getAuctionDetail } from '@/apis/auction/AuctionClient'
import { useRouter } from 'vue-router'
import { useAuctionStore } from '@/stores/auction/AuctionStore'
import type { ReadAuctionDetailResponse } from '@/apis/auction/AuctionDto'
import { confirmModal, warningModal } from '@/utils/Modal'
import { useMemberStore } from '@/stores/member/MemberStore'

const auctionStore = useAuctionStore()
const memberStore = useMemberStore()

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)
const router = useRouter()
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  },
  auctionId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['close-modal'])

const auctionDetail = ref<ReadAuctionDetailResponse>({
  auctionResponse: {
    auctionName: '',
    auctionProductId: 0,
    startBidPrice: 0,
    askingPrice: 0,
    startAt: '',
    maximumWinner: 0,
    ended: false,
    started: false,
    id: ''
  },
  productDetailResponse: {
    gender: '',
    brandId: 0,
    categoryId: 0,
    brandName: '',
    avgRating: 0,
    describeImgUrls: [],
    imgUrl: '',
    name: '',
    price: 0,
    productStocks: [
      {
        productSizeName: '',
        productSizeId: 0,
        quantity: 0
      }
    ],
    reviewCount: 0
  }
})

const closeModal = () => {
  emits('close-modal')
}

const enterAuction = async () => {
  if (
    await confirmModal(
      '경매에 입장하시겠습니까?\n악성 입찰 방지를 위해 경매에 낙찰될 경우 포인트로 즉시 낙찰 가격의 5%가 결제됩니다\n'
    )
  ) {
    console.log(memberStore.getMemberInfo().point!)
    if (memberStore.getMemberInfo().point! >= auctionDetail.value.auctionResponse.startBidPrice) {
      auctionStore.setAuctionDetail(auctionDetail.value)
      router.push({ path: `/chat/${props.auctionId}` })
      emits('close-modal')
    } else {
      await warningModal('포인트가 부족합니다')
    }
  }
}

watch(
  () => props.showModal,
  async (newVal, oldVal) => {
    if (newVal) {
      auctionDetail.value = await getAuctionDetail(props.auctionId)
    }
  }
)
</script>

<template>
  <div v-if="showModal && auctionDetail" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-name">경매 입장</div>
        <div class="modal-close" @click="closeModal">&times;</div>
      </div>
      <div class="modal-super-container">
        <div class="modal-container">
          <div class="modal-main">
            <div class="modal-sub">
              <div class="modal-sub-items" style="justify-content: center">
                <img
                  :src="`${VITE_STATIC_IMG_URL}${auctionDetail.productDetailResponse.imgUrl}?w=200&h=200&q=70`"
                  alt="auction_product_img"
                />
              </div>
              <div class="modal-sub-items">
                <label class="modal-label">브랜드명</label
                >{{ auctionDetail.productDetailResponse.brandName }}
              </div>
              <div class="modal-sub-items">
                <label class="modal-label">상품명</label>
                {{ auctionDetail.productDetailResponse.name }}
              </div>
              <div class="modal-sub-items">
                <label class="modal-label">치수</label>
                {{ auctionDetail.productDetailResponse.productStocks[0].productSizeName }}
              </div>
              <div class="modal-sub-items">
                <label class="modal-label">정가</label>
                {{ auctionDetail.productDetailResponse.price.toLocaleString() }}원
              </div>
            </div>
          </div>
        </div>
        <div class="modal-container">
          <div class="modal-main">
            <div class="modal-sub">
              <div class="modal-sub-items">
                <label class="modal-label">경매 이름</label>
                {{ auctionDetail.auctionResponse.auctionName }}
              </div>
              <div class="modal-sub-items">
                <label class="modal-label">시작가</label>
                {{ auctionDetail.auctionResponse.startBidPrice.toLocaleString() }}원
              </div>
              <div class="modal-sub-items">
                <label class="modal-label">최대 낙찰자</label>
                {{ auctionDetail.auctionResponse.maximumWinner }}명
              </div>
            </div>
          </div>
          <div class="modal-button">
            <button
              class="createBtn"
              v-if="auctionDetail.auctionResponse.ended === false"
              @click="enterAuction"
            >
              경매 입장
            </button>
            <button class="disabledBtn" v-else>경매 종료</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1000;

  background-color: rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-name {
  font-family: 'TheJamsil';
  font-weight: 500;
  font-size: 20px;
}

.modal-close {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.modal-content {
  background-color: #ffffff;
  width: 50%;
  height: 60%;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal-super-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

.modal-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.modal-main {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.modal-sub {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal-sub-items {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
}

button {
  border: none;
  color: white;
  cursor: pointer;
  font-family: 'TheJamsil';
}

.modal-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.createBtn {
  width: 150px;
  height: 50px;
  font-size: 25px;
  background-color: black;
}

.disabledBtn {
  width: 150px;
  height: 50px;
  font-size: 25px;
  background-color: #808080;
}

.modal-label {
  justify-content: center;
  font-size: 20px;
  margin-left: 5%;
  width: 50%;
}
</style>
