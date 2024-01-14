<script setup lang='ts'>

import { inject, onBeforeMount, reactive, ref, watch } from 'vue'
import type {
  PostImageProductDetailUpdateRequest,
  PostUpdateHashTagRequest,
  PostUpdateRequest,
  TemporaryUpdateTagProduct
} from '@/apis/ootd/PostDto'
import { createPost, updatePost } from '@/apis/ootd/PostService'
import router from '@/router'
import OOTDProductSearchModalComponent from '@/components/ootd/OOTDProductSearchModalComponent.vue'
import { usePostStore } from '@/stores/post/PostStore'
import { useRoute } from 'vue-router'
import { uploadImageToS3 } from '@/apis/ootd/FileService'
import { AxiosError } from 'axios'

const openInternalServerErrorNotification: Function | undefined = inject('openInternalServerErrorNotification')

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const route = useRoute()
const postId = ref<number>(Number(route.params.id))

const postStore = usePostStore()
const postUpdateRequest = ref<PostUpdateRequest>({
  title: '',
  description: '',
  stature: undefined,
  weight: undefined,
  hashTags: [] as PostUpdateHashTagRequest[],
  postThumbnailImgName: '',
  postImgName: '',
  postImageProductDetails: [] as PostImageProductDetailUpdateRequest[]
})
const temporaryTagProducts = ref<Array<TemporaryUpdateTagProduct>>(new Array<TemporaryUpdateTagProduct>())

onBeforeMount(async () => {
  postUpdateRequest.value = (await postStore.getPostUpdateRequest()).value
  temporaryTagProducts.value = (await postStore.getTemporaryTagProducts()).value
})

const validationMessage = reactive({
  stature: {
    number: {
      isValid: true,
      message: '키는 숫자로만 입력 가능합니다.'
    }
  },
  weight: {
    number: {
      isValid: true,
      message: '몸무게는 숫자로만 입력 가능합니다.'
    }
  },
  hashTag: {
    size: {
      isValid: true,
      message: '해시태그는 최소 1글자에서 최대 10글자까지 입력 가능합니다.'
    }
  },
  title: {
    size: {
      isValid: true,
      message: '게시글 제목은 최소 5글자에서 최대 50글자 사이로 입력할 수 있습니다.'
    }
  }
})
watch(postUpdateRequest.value, async (afterPostUpdateRequest, beforePostUpdateRequest) => {
  const stature = afterPostUpdateRequest.stature
  if (stature !== undefined && isNaN(Number(stature))) {
    afterPostUpdateRequest.stature = undefined
    validationMessage.stature.number.isValid = false
  } else if (stature !== undefined && !isNaN(Number(stature))) {
    validationMessage.stature.number.isValid = true
  }

  const weight = afterPostUpdateRequest.weight
  if (weight !== undefined && isNaN(Number(weight))) {
    afterPostUpdateRequest.weight = undefined
    validationMessage.weight.number.isValid = false
  } else if (weight !== undefined && !isNaN(Number(weight))) {
    validationMessage.weight.number.isValid = true
  }
})

const isHashTagInputOpen = ref<Set<number>>(new Set<number>())
const updateHashTag = async (hashTagId: number) => {
  !isHashTagInputOpen.value.has(hashTagId)
    ? isHashTagInputOpen.value.add(hashTagId) : isHashTagInputOpen.value.delete(hashTagId)
}

const finishUpdateHashTag = async (hashTagId: number, name: string) => {
  let isValidHashTagName = true
  postUpdateRequest.value.hashTags.forEach((hashTag) => {
    if(hashTag.id !== hashTagId && hashTag.name === name) {
      alert("이미 존재하는 해시태그 입니다.")
      isValidHashTagName = false
      return
    }
  })
  if(isValidHashTagName) {
    if (name.length < 1 || name.length > 10) {
      validationMessage.hashTag.size.isValid = false
    } else if (name.length >= 1 && name.length <= 10) {
      validationMessage.hashTag.size.isValid = true
      isHashTagInputOpen.value.delete(hashTagId)
    }
  }

}

const isProductModalOpen = ref<boolean>(false)
const productModalControl = async () => {
  isProductModalOpen.value = !isProductModalOpen.value
}

const temporaryUpdateTagProductId = ref<number>(0)
const onSelectBtnClick = async (
  productId: number, imgUrl: string, name: string, brandName: string, sizeName: string) => {
  const temporaryTagProductIndex = temporaryTagProducts.value
    .findIndex((temporaryTagProduct) =>
      ((temporaryTagProduct.productId === productId && temporaryTagProduct.sizeName === sizeName
        && temporaryTagProduct.id === temporaryUpdateTagProductId.value)
        || (temporaryTagProduct.productId === productId && temporaryTagProduct.id !== temporaryUpdateTagProductId.value)))
  if (temporaryTagProductIndex !== -1) {
    alert('이미 태그된 상품입니다.')
  } else {
    temporaryTagProducts.value.forEach((temporaryTagProduct) => {
      if (temporaryTagProduct.id === temporaryUpdateTagProductId.value) {
        temporaryTagProduct.productId = productId
        temporaryTagProduct.imgUrl = imgUrl
        temporaryTagProduct.name = name
        temporaryTagProduct.brandName = brandName
        temporaryTagProduct.sizeName = sizeName
      }
    })
    isProductModalOpen.value = !isProductModalOpen.value
  }
}

const updateTagProduct = async (id: number) => {
  isProductModalOpen.value = !isProductModalOpen.value
  temporaryUpdateTagProductId.value = id
}

const onSubmit = async () => {
  const isConfirmed = confirm("작성을 완료하시겠습니까?")
  if(isConfirmed) {
    const title = postUpdateRequest.value.title
    const description = postUpdateRequest.value.description

    if(isHashTagInputOpen.value.size !== 0) {
      alert("해시태그 작성을 완성해주세요.")
      return
    }

    if (title.length < 5 || title.length > 50) {
      alert('게시글 제목은 최소 5글자에서 최대 50글자 사이로 입력할 수 있습니다.')
      return
    }

    if (description.length > 300) {
      alert('게시글 본문은 최대 300글자 까지 입력할 수 있습니다.')
      return
    }

    temporaryTagProducts.value.forEach((temporaryTagProduct) => {
      postUpdateRequest.value.postImageProductDetails.forEach((postImageProductDetail) => {
        if (temporaryTagProduct.id === postImageProductDetail.id) {
          postImageProductDetail.productId = temporaryTagProduct.productId
          postImageProductDetail.productSize = temporaryTagProduct.sizeName
          postImageProductDetail.leftGapPercent = temporaryTagProduct.leftGapPercent
          postImageProductDetail.topGapPercent = temporaryTagProduct.topGapPercent
        }
      })
    })

    try {
      const postUpdateResponse = await updatePost(postId.value, postUpdateRequest.value)
      alert('게시글 수정이 성공하였습니다.')
      await postStore.clearPostUpdateRequest()
      await postStore.clearTemporaryTagProducts()
      await router.push({ path: `/ootds/${postUpdateResponse.id}` })
    } catch(error) {
      if (error instanceof AxiosError) {
        if(error.response !== undefined) {
          if(error.response.status >= 500) {
            if(openInternalServerErrorNotification !== undefined) {
              openInternalServerErrorNotification()
            }
          }
        }
      }
    }
  }
}

const onCancel = async () => {
  const isConfirmed = confirm("작성을 취소하시겠습니까?")
  if(isConfirmed) {
    router.go(-1)
  }
}
</script>

<template>
  <div class='frame'>
    <div class='div'>
      <p class='OOTD'>
        <span class='text-wrapper'>데일리온 </span>
        <span class='span'>OOTD</span>
        <span class='text-wrapper'> 작성 가이드</span>
      </p>
      <ul class='text-wrapper-2'>
        <li>썸네일 이미지는 1개 업로드할 수 있습니다.</li>
        <li>이미지는 착용샷에 해당하는 이미지를 1개 업로드할 수 있습니다.</li>
        <li>이미지를 업로드하고 이미지의 특정 부분을 탭하여 상품을 태그할 수 있습니다.</li>
        <li>상품 태그는 최대 5개까지 태그할 수 있습니다.</li>
        <li>상품 상세 태그에 대한 치수는 사용자가 등록하도록 한다.</li>
        <li>상품은 상품 코드나 상품명으로 검색하여 태그할 수 있습니다.</li>
        <li>상품을 태그하지 않아도 게시글을 등록할 수 있습니다.</li>
        <li>상품을 태그하면 해당 상품 상세의 대표 이미지가 나열됩니다.</li>
        <li>키/몸무게 정보와 입은 옷의 사이즈 정보를 올릴 수 있습니다.</li>
        <li>게시글 제목은 최소 5글자에서 최대 50글자 사이로 입력할 수 있습니다.</li>
        <li>게시글 본문은 최대 300글자 까지 입력할 수 있습니다.</li>
        <li>해시태그는 최소 1개부터 최대 3개까지 등록 가능합니다.</li>
        <li>해시태그는 최소 1글자에서 최대 10글자까지 작성할 수 있습니다.</li>
      </ul>
    </div>
    <div class='div-2'>
      <div class='div-2-text-wrapper'>
        <div class='text-wrapper-3'>필수 정보 입력</div>
        <div class='div-3'>
          <div class='div-4'>
            <div class='text-wrapper-4'>키</div>
            <input class='rectangle' type='text'
                   v-model='postUpdateRequest.stature' placeholder='키 입력(선택사항)'>
            <div v-if='!validationMessage.stature.number.isValid' class='validation-wrapper'>
              {{ validationMessage.stature.number.message }}
            </div>

          </div>
          <div class='div-5'>
            <div class='text-wrapper-4'>몸무게</div>
            <input class='rectangle' type='text'
                   v-model='postUpdateRequest.weight' placeholder='몸무게 입력(선택사항)'>
            <div v-if='!validationMessage.weight.number.isValid' class='validation-wrapper'>
              {{ validationMessage.weight.number.message }}
            </div>
          </div>
          <div class='div-6'>
            <div class='text-wrapper-4'>상품정보</div>
            <div class='div-7'>
              <div v-for='temporaryTagProduct in temporaryTagProducts' class='div-wrapper'>
                <div class='text-wrapper-5'><span>{{ temporaryTagProduct.name
                  }}</span>-<span>{{ temporaryTagProduct.sizeName }}</span></div>
              </div>
            </div>
          </div>
          <div class='div-8'>
            <div class='text-wrapper-4'>태그</div>
            <div class='div-9'>
              <div v-for='hashTag in postUpdateRequest.hashTags' :key='hashTag.id'
                   class='hashtag-wrapper'>
                <div v-if='!isHashTagInputOpen.has(hashTag.id)' class='div-wrapper'>
                  <div class='text-wrapper-5'>#{{ hashTag.name }}</div>
                </div>
                <input class='div-wrapper-3' type='text'
                       v-if='isHashTagInputOpen.has(hashTag.id)'
                       @keyup.enter='finishUpdateHashTag(hashTag.id, hashTag.name)'
                       v-model='hashTag.name'
                       placeholder='태그 입력'>
                <div v-if='isHashTagInputOpen.has(hashTag.id)' class='div-wrapper-4 hashtag-finish-btn'
                     @click='finishUpdateHashTag(hashTag.id, hashTag.name)'>
                  <div class='text-wrapper-7'>완료</div>
                </div>
                <div v-else class='div-wrapper-4 hashtag-update-btn' @click='updateHashTag(hashTag.id)'>
                  <div class='text-wrapper-7'>수정</div>
                </div>
              </div>
            </div>
            <div v-if='!validationMessage.hashTag.size.isValid' class='validation-wrapper'>
              {{ validationMessage.hashTag.size.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='div-12'>
      <div class='div-wrapper-5'>
        <input class='text-wrapper-8'
               v-model='postUpdateRequest.title'
               placeholder='제목을 입력해주세요.'>
      </div>
      <div class='post-img-wrapper'>
        <img class='post-img' :src='`${VITE_STATIC_IMG_URL}${postUpdateRequest.postImgName}`' />
        <div v-for='temporaryTagProduct in temporaryTagProducts'
             class='product-detail-tag-wrapper'
             :style='{ left: `${temporaryTagProduct.leftGapPercent}%`, top: `${temporaryTagProduct.topGapPercent}%` }'>
          <svg class='product-detail-tag' xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'
               fill='none'>
            <path
              d='M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM16.029 6.50025C20.0424 6.50025 23.2947 9.7544 23.2947 13.7677C23.2947 17.781 20.0424 21.0333 16.029 21.0333C14.8145 21.0333 13.6699 20.7362 12.6636 20.2094C12.6646 20.214 12.6662 20.2194 12.6672 20.224L9.38965 23.4998L6.70533 20.8136L9.86573 17.6514C9.87095 17.649 9.87698 17.6482 9.8822 17.6459C9.17253 16.5236 8.7616 15.1937 8.7616 13.7677C8.7616 9.75438 12.0157 6.50025 16.029 6.50025ZM16.029 9.7284C13.7987 9.7284 11.9898 11.5374 11.9898 13.7677C11.9898 15.998 13.7987 17.8052 16.029 17.8052C18.2594 17.8052 20.0665 15.998 20.0665 13.7677C20.0665 11.5374 18.2594 9.7284 16.029 9.7284Z'
              fill='#C22727' />
          </svg>
          <div class='product-detail-tag-dropdown-wrapper'>
            <svg class='product-detail-tag-dropdown-pointer' xmlns='http://www.w3.org/2000/svg' width='33' height='36'
                 viewBox='0 0 33 36' fill='none'>
              <path d='M16.4974 0L32.0884 35.25H0.911499L16.4974 0Z' fill='white' />
            </svg>
            <div class='product-detail-tag-dropdown-box'>
              <img class='product-image' :src='`${VITE_STATIC_IMG_URL}${temporaryTagProduct.imgUrl}`'>
              <div class='product-image-brand-and-name-wrapper'>
                <div class='product-image-brand'>{{ temporaryTagProduct.brandName }}</div>
                <div class='product-image-name'>{{ temporaryTagProduct.name }}</div>
              </div>
              <div class='left-wrapper'>
                <div class='div-wrapper-4 tag-product-update-btn'>
                  <div class='text-wrapper-7'
                       @click='updateTagProduct(temporaryTagProduct.id)'>수정
                  </div>
                </div>
                <div class='product-size'>
                  {{ temporaryTagProduct.sizeName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- modal control -->
      <OOTDProductSearchModalComponent
        :isProductModalOpen='isProductModalOpen'
        :productModalControl='productModalControl'
        :onSelectBtnClick='onSelectBtnClick' />
      <div class='div-wrapper-7'>
        <textarea class='text-wrapper-12'
                  v-model='postUpdateRequest.description'
                  placeholder='내용을 입력해주세요'></textarea>
      </div>
    </div>
    <div class='button-container'>
      <div class='cancel-button'>
        <span class='cancel-button-text' @click='onCancel'>
          작성 취소
        </span>
      </div>
      <div class='submit-button' @click='onSubmit'>
        <span class='submit-button-text'>
          작성 완료
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/ootd/ootd-post-update.css";
</style>