<script setup lang="ts">
import { ref, onBeforeMount, defineEmits } from 'vue'
import { storeToRefs } from 'pinia'
import { getOrderDetails, cancelOrderDetail } from '@/apis/order/order'
import { createReview } from '@/apis/review/review'
import { uploadImageToS3 } from '@/apis/s3/S3Client'
import { PlusOutlined } from '@ant-design/icons-vue'
import { Modal, Rate, Textarea, Upload, message } from 'ant-design-vue'
import { useMemberStore } from '@/stores/member/MemberStore'
import type { OrderDetailResponse } from '@/apis/order/orderDto'
import type { ReviewCreateRequest } from '@/apis/review/reviewDto'
import type { UploadProps, UploadChangeParam, UploadFile } from 'ant-design-vue'
const { nickname, profileImgUrl } = storeToRefs(useMemberStore())
const orderDetails = ref<Array<OrderDetailResponse>>([])
const emits = defineEmits(['closeModal'])
const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)
const props = defineProps({
  orderNo: {
    type: String,
    required: true
  }
})

// ant design modal
const open = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)

// 리뷰
const value = ref<number>(3)
const desc = ref<string[]>(['최악이예요', '별로예요', '무난해요', '좋아요', '최고예요'])
const reviewContent = ref<string>('')
const loading = ref<boolean>(false)
const imageUrl = ref<string>('')
const fileList = ref([])
const imageFile = ref<UploadFile>()
const index = ref<number>(-1)
onBeforeMount(() => {
  initData(props.orderNo)
})

const initData = async (orderNo: string) => {
  const data = await getOrderDetails(orderNo)
  orderDetails.value = data
}

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const showModal = async (idx: number) => {
  clear()
  index.value = idx
  open.value = true
}

const clear = () => {
  index.value = -1
  fileList.value = []
  imageFile.value = undefined
  reviewContent.value = ''
}
const handleOk = async () => {
  if (index.value === -1) {
    message.error('에러 발생')
    return
  }
  if (!reviewContent.value) {
    message.error('리뷰 내용은 필수입니다.')
    return
  }
  const reviewCreateDto: ReviewCreateRequest = {
    productId: orderDetails.value[index.value].productId,
    orderDetailNo: orderDetails.value[index.value].orderDetailNo,
    description: reviewContent.value,
    productSize: orderDetails.value[index.value].productSize,
    imgUrl: imageFile.value?.name ? imageFile.value.name : null,
    nickname: nickname.value,
    rating: value.value,
    profileImgUrl: profileImgUrl.value
  }
  const url = await createReview(reviewCreateDto)
  if (url) {
    uploadImageToS3(url, imageFile.value as any).catch((error: any) => {
      message.error('이미지 등록 중 에러 발생')
      return
    })
  }
  confirmLoading.value = true
  setTimeout(() => {
    message.success('등록되었습니다.')
    open.value = false
    confirmLoading.value = false
    orderDetails.value[index.value].reviewCheck = true
  }, 2000)
}

const handleChange = async (info: UploadChangeParam) => {
  imageFile.value = info.file
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }
  if (info.file.status === 'done') {
    if (info.file && info.file.originFileObj) {
      getBase64(info.file.originFileObj, (base64Url: string) => {
        imageUrl.value = base64Url
        loading.value = false
      })
    }
  }
}

const beforeUpload = (file: UploadFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('이미지 형식이 아닙니다.')
    fileList.value = []
  }
  const isLt2M = file.size ? file.size / 1024 / 1024 < 2 : false
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return false
}

const cancel = async (orderDetailNo: string) => {
  if (confirm('정말로 취소하시겠습니까?')) {
    await cancelOrderDetail(orderDetailNo)
    message.success('취소 되었습니다. 반영까지는 시간이 걸릴 수 있습니다.')
    emits('closeModal')
    return
  }
}
</script>
<template v-if="orderDetails.length">
  <div v-for="(orderDetail, index) in orderDetails" :key="index" class="order-detail-container">
    <div class="left-section">
      <div class="left-inner-status">
        <div class="product-status bold-text">{{ orderDetail.status }}</div>
      </div>
      <div class="left-inner-contents">
        <div class="product-thumbnail">
          <img class="image" :src="`${VITE_STATIC_IMG_URL}${orderDetail.thumbnail}`" />
        </div>
        <div class="text-contents">
          <div class="product-name">상품명 : {{ orderDetail.productName }}</div>
          <div class="product-price">
            가격 : {{ new Intl.NumberFormat('ko-KR').format(orderDetail.orderPrice) }}원
            <span class="gray-text mid-bar">|</span>
            {{ orderDetail.productQuantity }}개
          </div>
          <div>쿠폰이름 : {{ orderDetail.couponName }}</div>
          <div>쿠폰 적용 금액 : {{ orderDetail.couponDiscountPrice }}</div>
        </div>
      </div>
      <div class="left-inner-empty"></div>
    </div>
    <div class="right-section">
      <div v-if="orderDetail.reviewCheck === false">
        <div class="right-section-buttons">
          <div v-if="orderDetail.status !== '취소완료'" class="right-inner-button">
            <button class="black-button" @click="showModal(index)">리뷰 쓰기</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="right-section-buttons">
          <div class="right-inner-button">
            <button class="gray-button" disabled>적립 완료</button>
          </div>
        </div>
      </div>
      <div v-if="orderDetail.status == '배송전'">
        <div class="right-section-buttons">
          <div class="right-inner-button">
            <button class="white-button" @click="cancel(orderDetail.orderDetailNo)">
              주문 취소
            </button>
          </div>
        </div>
      </div>
      <div v-if="orderDetail.status == '취소완료'">
        <div class="right-section-buttons">
          <div class="right-inner-button">
            <button class="gray-cancel-button" disabled>
              {{ orderDetail.status }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model:open="open"
      title="리뷰 등록 하기"
      :confirm-loading="confirmLoading"
      @ok="handleOk()"
    >
      <span class="rate-span">
        <div class="clearfix">
          <Upload
            v-model:file-list="fileList"
            list-type="picture-card"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <div v-if="fileList !== undefined && fileList.length == 0">
              <plus-outlined />
              <div style="margin-top: 8px">Upload</div>
            </div>
          </Upload>
          <div class="rate-div">
            <Rate v-model:value="value" allow-half :tooltips="desc" />
          </div>
        </div>
        <div class="review-text" style="margin: 10px 0">
          <Textarea
            v-model:value="reviewContent"
            placeholder="내용을 입력 해주세요. "
            :auto-size="{ minRows: 6, maxRows: 4 }"
          />
        </div>
      </span>
    </Modal>
  </div>
</template>

<style scoped>
@import '@/assets/css/order/order-detail.css';
</style>
