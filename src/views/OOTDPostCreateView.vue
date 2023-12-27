<script setup lang='ts'>

import { reactive, ref, type Ref, watch } from 'vue'
import type { PostCreateRequest, PostImageProductDetailCreateRequest, TemporaryCreateTagProduct } from '@/apis/ootd/PostDto'
import OOTDProductSearchModalComponent from '@/components/ootd/OOTDProductSearchModalComponent.vue'
import { createPost } from '@/apis/ootd/PostService'
import { uploadImageToS3 } from '@/apis/ootd/FileService'
import router from '@/router'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const fileInput: Ref<HTMLInputElement | null> = ref(null)
const postCreateRequest = ref<PostCreateRequest<PostImageProductDetailCreateRequest>>({
  title: '',
  description: '',
  stature: undefined,
  weight: undefined,
  hashTagNames: [] as string[],
  postThumbnailImgName: '',
  postImgName: '',
  postImageProductDetails: [] as PostImageProductDetailCreateRequest[]
})

const validationMessage = reactive({
  stature: {
    number: {
      isValid: true,
      message: '키는 숫자로만 입력 가능합니다.'
    },
    size: {
      isValid: true,
      message: '키는 1부터 999까지 입력 가능합니다.'
    }
  },
  weight: {
    number: {
      isValid: true,
      message: '몸무게는 숫자로만 입력 가능합니다.'
    },
    size: {
      isValid: true,
      message: '몸무게는 1부터 999까지 입력 가능합니다.'
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
watch(postCreateRequest.value, async (afterPostCreateRequest, beforePostCreateRequest) => {
  const stature = afterPostCreateRequest.stature
  if (stature !== undefined && isNaN(Number(stature))) {
    afterPostCreateRequest.stature = undefined
    validationMessage.stature.number.isValid = false
  } else if (stature !== undefined && !isNaN(Number(stature))) {
    validationMessage.stature.number.isValid = true
    validationMessage.stature.size.isValid = true
    if(Number(stature) > 999) {
      validationMessage.stature.size.isValid = false
    } else {
      validationMessage.stature.size.isValid = true
    }
  }

  const weight = afterPostCreateRequest.weight
  if (weight !== undefined && isNaN(Number(weight))) {
    afterPostCreateRequest.weight = undefined
    validationMessage.weight.number.isValid = false
  } else if (weight !== undefined && !isNaN(Number(weight))) {
    validationMessage.weight.number.isValid = true
    validationMessage.weight.size.isValid = true
    if(Number(weight) > 999) {
      validationMessage.weight.size.isValid = false
    } else {
      validationMessage.weight.size.isValid = true
    }
  }
})

const openFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const inputPostImgFile = ref<File>()
const inputPostImg = ref<string>('')
const handlePostImgChange = async (event: Event) => {
  if (event.target !== null) {
    const fileInput = event.target as HTMLInputElement
    if (fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0]
      inputPostImgFile.value = file
      postCreateRequest.value.postImgName = file.name
      postCreateRequest.value.postThumbnailImgName = 'thumbnail-' + file.name
      if (file) {
        await readFile(file)
      }
    }
  }
}

const readFile = async (file: File) => {
  const reader = new FileReader()

  reader.onload = (e) => {
    if (e.target !== null && e.target.result !== null) {
      inputPostImg.value = e.target.result as string
    }
  }

  reader.readAsDataURL(file)
}

const hashTagInput = ref<string>('')
const addHashTag = async () => {
  const hashTagNames = postCreateRequest.value.hashTagNames
  if (hashTagNames.length < 3) {
    if (hashTagInput.value.length < 1 || hashTagInput.value.length > 10) {
      validationMessage.hashTag.size.isValid = false
    } else if (hashTagInput.value.length >= 1 && hashTagInput.value.length <= 10) {
      if (hashTagNames.indexOf(hashTagInput.value) !== -1) {
        alert('이미 추가된 해시태그 입니다.')
      } else {
        hashTagNames.push(hashTagInput.value)
        hashTagInput.value = ''
        validationMessage.hashTag.size.isValid = true
      }
    }
  } else {
    alert('해시태그는 최대 3개까지 입력 가능합니다.')
  }
}

const removeHashTag = async () => {
  if (postCreateRequest.value.hashTagNames
    && postCreateRequest.value.hashTagNames.length !== 0) {
    postCreateRequest.value.hashTagNames.pop()
  }
}

const isProductModalOpen = ref<boolean>(false)
const productModalControl = async () => {
  isProductModalOpen.value = !isProductModalOpen.value


}

const currentLeftGapPercent = ref<number>(0)
const currentTopGapPercent = ref<number>(0)
const onPostImgClick = async (event: any) => {
  if (temporaryTagProducts.value.length >= 5) {
    alert('상품 태그는 최대 5개까지 태그할 수 있습니다.')
  } else {
    // product search modal open
    isProductModalOpen.value = !isProductModalOpen.value

    const imgElement = event.target

    currentLeftGapPercent.value = (event.offsetX / imgElement.width) * 100
    currentTopGapPercent.value = (event.offsetY / imgElement.height) * 100
  }
}

const temporaryTagProducts = ref<Array<TemporaryCreateTagProduct>>(new Array<TemporaryCreateTagProduct>())
const onSelectBtnClick = async (
  productId: number, imgUrl: string, name: string, brandName: string, sizeName: string) => {
  if (temporaryTagProducts.value.length >= 5) {
    alert('상품 태그는 최대 5개까지 태그할 수 있습니다.')
  } else {
    const temporaryTagProductIndex = temporaryTagProducts.value
      .findIndex((temporaryTagProduct) =>
        (temporaryTagProduct.id === productId))
    if (temporaryTagProductIndex !== -1) {
      alert('이미 태그된 상품입니다.')
    } else {
      temporaryTagProducts.value.push({
        id: productId,
        imgUrl: imgUrl,
        name: name,
        brandName: brandName,
        sizeName: sizeName,
        leftGapPercent: currentLeftGapPercent.value,
        topGapPercent: currentTopGapPercent.value
      })
      isProductModalOpen.value = !isProductModalOpen.value
    }
  }
}

const removeTagProduct = async (productId: number, sizeName: string) => {
  const temporaryTagProductIndex = temporaryTagProducts.value
    .findIndex((temporaryTagProduct) => (temporaryTagProduct.id === productId && temporaryTagProduct.sizeName === sizeName))
  if (temporaryTagProductIndex !== -1) {
    temporaryTagProducts.value.splice(temporaryTagProductIndex, 1)
  }
}

const onSubmit = async () => {
  const hashTagNames = postCreateRequest.value.hashTagNames
  const title = postCreateRequest.value.title
  const description = postCreateRequest.value.description
  const postImgName = postCreateRequest.value.postImgName
  const postThumbnailImgName = postCreateRequest.value.postThumbnailImgName

  if (hashTagNames.length < 1 || hashTagNames.length > 3) {
    alert('해시태그는 최소 1개 최대 3개까지 입력 가능합니다.')
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

  if (postImgName === '' || postThumbnailImgName === '' || inputPostImgFile.value === undefined) {
    alert('게시글 이미지를 등록해주세요.')
    return
  }

  temporaryTagProducts.value.forEach((temporaryTagProduct) => {
    postCreateRequest.value.postImageProductDetails.push({
      productId: temporaryTagProduct.id,
      productSize: temporaryTagProduct.sizeName,
      leftGapPercent: temporaryTagProduct.leftGapPercent,
      topGapPercent: temporaryTagProduct.topGapPercent
    })
  })

  const postCreateResponse = await createPost(postCreateRequest.value)
  try {
    await uploadImageToS3(postCreateResponse.imgPreSignedUrl, inputPostImgFile.value)
    await uploadImageToS3(postCreateResponse.thumbnailImgPreSignedUrl, inputPostImgFile.value)
    alert('게시글 등록이 성공하였습니다.')
    await router.push({ path: `/ootds/${postCreateResponse.id}` })
  } catch (error: any) {
    alert('게시글 이미지 업로드중 오류가 발생했습니다.')
    console.error(error)
    throw error
  }
}

const onCancel = async () => {
  router.go(-1)
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
                   maxlength='3'
                   v-model='postCreateRequest.stature' placeholder='키 입력(선택사항)'>
            <div v-if='!validationMessage.stature.number.isValid' class='validation-wrapper'>
              {{ validationMessage.stature.number.message }}
            </div>
            <div v-if='!validationMessage.stature.size.isValid' class='validation-wrapper'>
              {{ validationMessage.stature.size.message }}
            </div>
          </div>
          <div class='div-5'>
            <div class='text-wrapper-4'>몸무게</div>
            <input class='rectangle' type='text'
                   maxlength='3'
                   v-model='postCreateRequest.weight' placeholder='몸무게 입력(선택사항)'>
            <div v-if='!validationMessage.weight.number.isValid' class='validation-wrapper'>
              {{ validationMessage.weight.number.message }}
            </div>
            <div v-if='!validationMessage.weight.size.isValid' class='validation-wrapper'>
              {{ validationMessage.weight.size.message }}
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
              <div class='div-10'>
                <div v-for='hashTagName in postCreateRequest.hashTagNames' class='div-wrapper-2'>
                  <div class='text-wrapper-5'>#{{ hashTagName }}</div>
                </div>
              </div>
              <div class='div-11'>
                <input class='div-wrapper-3' type='text'
                       v-if='postCreateRequest.hashTagNames.length < 3'
                       v-model='hashTagInput'
                       @keyup.enter='addHashTag'
                       placeholder='태그 입력'>
                <div v-if='postCreateRequest.hashTagNames.length < 3' class='div-wrapper-4 hashtag-add-btn'>
                  <div class='text-wrapper-7' @click='addHashTag'>추가</div>
                </div>
                <div v-if='postCreateRequest.hashTagNames.length !== 0' class='div-wrapper-4 hashtag-remove-btn'>
                  <div class='text-wrapper-7' @click='removeHashTag'>삭제</div>
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
               v-model='postCreateRequest.title'
               placeholder='제목을 입력해주세요.'>
      </div>
      <div v-if='postCreateRequest.postImgName !== ""' class='post-img-wrapper'>
        <img class='post-img' :src='inputPostImg' @click='onPostImgClick' />
        <div v-for='(temporaryTagProduct, index) in temporaryTagProducts'
             class='product-detail-tag-wrapper'
             :key='temporaryTagProduct.id'
             :style='{ left: `${temporaryTagProduct.leftGapPercent}%`, top: `${temporaryTagProduct.topGapPercent}%` }'>
          <svg class='product-detail-tag' xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'
               fill='none'>
            <path
              d='M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM16.029 6.50025C20.0424 6.50025 23.2947 9.7544 23.2947 13.7677C23.2947 17.781 20.0424 21.0333 16.029 21.0333C14.8145 21.0333 13.6699 20.7362 12.6636 20.2094C12.6646 20.214 12.6662 20.2194 12.6672 20.224L9.38965 23.4998L6.70533 20.8136L9.86573 17.6514C9.87095 17.649 9.87698 17.6482 9.8822 17.6459C9.17253 16.5236 8.7616 15.1937 8.7616 13.7677C8.7616 9.75438 12.0157 6.50025 16.029 6.50025ZM16.029 9.7284C13.7987 9.7284 11.9898 11.5374 11.9898 13.7677C11.9898 15.998 13.7987 17.8052 16.029 17.8052C18.2594 17.8052 20.0665 15.998 20.0665 13.7677C20.0665 11.5374 18.2594 9.7284 16.029 9.7284Z'
              fill='#C22727' />
          </svg>
          <div class='product-detail-tag-dropdown-wrapper' :style='{ zIndex: 5 - index }'>
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
                <div class='div-wrapper-4 hashtag-remove-btn'>
                  <div class='text-wrapper-7'
                       @click='removeTagProduct(temporaryTagProduct.id, temporaryTagProduct.sizeName)'>삭제
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
      <div v-else class='div-13'>
        <p class='p'>
          <span class='text-wrapper-9'>드래그 앤 드롭이나 추가하기 버튼으로</span>
          <br />
          <span class='text-wrapper-9'>OOTD 사진을 업로드해주세요</span>
          <br /><br />
          <span class='text-wrapper-10'>*권장 사이즈<br />너비 1000px 이하 높이 1000px 이하</span>
        </p>
        <div class='div-wrapper-6'>
          <input type='file' style='display:none;' ref='fileInput' @change='handlePostImgChange'>
          <div class='text-wrapper-11' @click='openFileInput'>OOTD 추가하기</div>
        </div>
      </div>
      <!-- modal control -->
      <OOTDProductSearchModalComponent
        :isProductModalOpen='isProductModalOpen'
        :productModalControl='productModalControl'
        :onSelectBtnClick='onSelectBtnClick' />
      <div class='div-wrapper-7'>
        <textarea class='text-wrapper-12'
                  v-model='postCreateRequest.description'
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
@import "@/assets/css/ootd/ootd-post-create.css";
</style>