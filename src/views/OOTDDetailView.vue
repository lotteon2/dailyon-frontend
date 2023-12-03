<script setup lang='ts'>

import { onBeforeMount, ref } from 'vue'
import type { PostDetailResponse } from '@/apis/ootd/PostDto'
import { useRoute } from 'vue-router'
import { getPostDetail } from '@/apis/ootd/PostService'
import OOTDPostCommentComponent from '@/components/ootd/OOTDPostCommentComponent.vue'

const route = useRoute()
const postId = ref<number>(Number(route.params.id))
const post = ref<PostDetailResponse>()
const fetchDefaultData = async (): Promise<PostDetailResponse> => {
  const postDetailResponse = await getPostDetail(postId.value)
  post.value = postDetailResponse

  return postDetailResponse
}

onBeforeMount(async () => {
  // await fetchDefaultData()
})
</script>

<template>
  <div class='ootd-detail-container'>
    <div class='ootd-detail-body'>
      <div class='ootd-detail-content-body'>
        <div class='ootd-detail-header'>
          <div class='ootd-detail-header-top'>
            <div class='ootd-detail-header-title-wrapper'>
              <div class='ootd-detail-header-title-text'>
                게시글 제목
              </div>
            </div>
            <div class='ootd-detail-header-control-button-wrapper'>
              <div class='ootd-detail-header-edit-button-wrapper'>
                <div class='ootd-detail-header-edit-button-text'>
                  수정
                </div>
              </div>
              <div class='ootd-detail-header-delete-button-wrapper'>
                <div class='ootd-detail-header-delete-button-text'>
                  삭제
                </div>
              </div>
            </div>
          </div>
          <div class='ootd-detail-header-middle'>
            <div class='ootd-detail-header-content-info-wrapper'>
              <div class='ootd-detail-header-writer-profile-image-wrapper'>
                <img src='@/assets/images/default-profile-image.png' class='ootd-detail-header-writer-profile-image'>
              </div>
              <div class='ootd-detail-header-writer-info-wrapper'>
                <div class='ootd-detail-header-writer-nickname-wrapper'>
                  <div class='ootd-detail-header-writer-nickname-text'>
                    작성자 닉네임
                  </div>
                </div>
                <div class='ootd-detail-header-content-created-date-wrapper'>
                  <div class='ootd-detail-header-content-created-date-text'>
                    작성일
                  </div>
                </div>
              </div>
            </div>
            <div class='ootd-detail-header-follow-wrapper'>
              <div class='ootd-detail-header-follow'>
                <div class='ootd-detail-header-follow-text'>
                  +팔로우
                </div>
              </div>
              <div class='ootd-detail-header-following'>
                <svg class='ootd-detail-header-following-icon' xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M4.91678 9.5L0.690186 5.27341L1.29739 4.66706L4.91678 8.28645L12.7032 0.5L13.3096 1.10635L4.91678 9.5Z" fill="#C6C6C6"/>
                </svg>
                <div class='ootd-detail-header-following-text'>
                  팔로잉
                </div>
              </div>
            </div>
          </div>
          <div class='ootd-detail-header-bottom'>
            <div class='ootd-detail-fashion-info-wrapper'>
              <div class='ootd-detail-size-info-wrapper'>
                <div class='ootd-detail-size-info-text-wrapper'>
                  <div class='ootd-detail-size-info-text'>키/몸무게</div>
                </div>
                <div class='ootd-detail-size-info-text-wrapper'>
                  <div class='ootd-detail-size-real-info-text'>165/53</div>
                </div>
              </div>
              <div class='ootd-detail-fashion-size-info-wrapper'>
                <div class='ootd-detail-fashion-size-info-text-wrapper'>
                  <div class='ootd-detail-fashion-size-info-text'>
                    사이즈
                  </div>
                </div>
                <div class='ootd-detail-fashion-size-info-text-wrapper'>
                  <div class='ootd-detail-fashion-size-real-info-text'>
                    상품명 - 사이즈
                  </div>
                </div>
              </div>
            </div>
            <div class='ootd-detail-tag-info-wrapper'>
              <div class='ootd-detail-tag-title-wrapper'>
                <div class='ootd-detail-tag-title-text'>
                  태그
                </div>
              </div>
              <div class='ootd-detail-tag-content-wrapper'>
                <div v-for='n in 3' class='ootd-detail-tag-button-wrapper'>
                  <div class='ootd-detail-tag-button-text'>
                    태그 {{ n }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='ootd-detail-content'>
          <div class='ootd-detail-content-description-wrapper'>
            <div class='ootd-detail-content-description-text'>
              게시글 내용
            </div>
          </div>
          <div class='ootd-detail-content-image-wrapper'>
            <img class='ootd-detail-content-image' src='@/assets/images/ootd-detail-image-example.png'>
            <div class='product-detail-tag-wrapper'>
              <svg class='product-detail-tag' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM16.029 6.50025C20.0424 6.50025 23.2947 9.7544 23.2947 13.7677C23.2947 17.781 20.0424 21.0333 16.029 21.0333C14.8145 21.0333 13.6699 20.7362 12.6636 20.2094C12.6646 20.214 12.6662 20.2194 12.6672 20.224L9.38965 23.4998L6.70533 20.8136L9.86573 17.6514C9.87095 17.649 9.87698 17.6482 9.8822 17.6459C9.17253 16.5236 8.7616 15.1937 8.7616 13.7677C8.7616 9.75438 12.0157 6.50025 16.029 6.50025ZM16.029 9.7284C13.7987 9.7284 11.9898 11.5374 11.9898 13.7677C11.9898 15.998 13.7987 17.8052 16.029 17.8052C18.2594 17.8052 20.0665 15.998 20.0665 13.7677C20.0665 11.5374 18.2594 9.7284 16.029 9.7284Z" fill="#C22727"/>
              </svg>
              <div class='product-detail-tag-dropdown-wrapper'>
                <svg class='product-detail-tag-dropdown-pointer' xmlns="http://www.w3.org/2000/svg" width="33" height="36" viewBox="0 0 33 36" fill="none">
                  <path d="M16.4974 0L32.0884 35.25H0.911499L16.4974 0Z" fill="white"/>
                </svg>
                <div class='product-detail-tag-dropdown-box'></div>
                <div class='product-image-wrapper'>
                  <img class='product-image' src='@/assets/images/product-detail-example.png'>
                </div>
                <div class='product-image-brand-and-name-wrapper'>
                  <div class='product-image-brand'>BRAND</div>
                  <div class='product-image-name'>상품명</div>
                </div>
                <div class='product-image-price-wrapper'>
                  <div class='product-image-price'>
                    가격
                  </div>
                </div>
              </div>
            </div>
            <div class='product-detail-tag-wrapper-2'>
              <svg class='product-detail-tag' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM16.029 6.50025C20.0424 6.50025 23.2947 9.7544 23.2947 13.7677C23.2947 17.781 20.0424 21.0333 16.029 21.0333C14.8145 21.0333 13.6699 20.7362 12.6636 20.2094C12.6646 20.214 12.6662 20.2194 12.6672 20.224L9.38965 23.4998L6.70533 20.8136L9.86573 17.6514C9.87095 17.649 9.87698 17.6482 9.8822 17.6459C9.17253 16.5236 8.7616 15.1937 8.7616 13.7677C8.7616 9.75438 12.0157 6.50025 16.029 6.50025ZM16.029 9.7284C13.7987 9.7284 11.9898 11.5374 11.9898 13.7677C11.9898 15.998 13.7987 17.8052 16.029 17.8052C18.2594 17.8052 20.0665 15.998 20.0665 13.7677C20.0665 11.5374 18.2594 9.7284 16.029 9.7284Z" fill="#C22727"/>
              </svg>
              <div class='product-detail-tag-dropdown-wrapper'>
                <svg class='product-detail-tag-dropdown-pointer' xmlns="http://www.w3.org/2000/svg" width="33" height="36" viewBox="0 0 33 36" fill="none">
                  <path d="M16.4974 0L32.0884 35.25H0.911499L16.4974 0Z" fill="white"/>
                </svg>
                <div class='product-detail-tag-dropdown-box-2'></div>
                <div class='product-image-wrapper'>
                  <img class='product-image' src='@/assets/images/product-detail-example.png'>
                </div>
                <div class='product-image-brand-and-name-wrapper'>
                  <div class='product-image-brand'>BRAND</div>
                  <div class='product-image-name'>상품명</div>
                </div>
                <div class='product-image-price-wrapper'>
                  <div class='product-image-price'>
                    가격
                  </div>
                </div>
                <div class='product-coupon-wrapper'>
                  <div class='product-coupon-text'>
                    사용할 수 있는 쿠폰이 있어요!
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='ootd-detail-content-product-list-wrapper'>
            <div class='ootd-detail-content-product-list-back-button-wrapper'>
              <svg class='ootd-detail-content-product-list-back-button' xmlns="http://www.w3.org/2000/svg" width="18" height="31" viewBox="0 0 18 31" fill="none">
                <path d="M15.4865 30.1775C15.2899 30.1799 15.0951 30.1412 14.9144 30.0638C14.7338 29.9863 14.5713 29.872 14.4375 29.728L0.951015 16.2415C0.351615 15.6421 0.351615 14.713 0.951015 14.1136L14.4375 0.65707C15.0369 0.0576694 15.966 0.0576694 16.5654 0.65707C17.1648 1.25647 17.1648 2.18554 16.5654 2.78494L4.12784 15.1925L16.5654 27.6301C17.1648 28.2295 17.1648 29.1586 16.5654 29.758C16.2657 30.0577 15.8761 30.2075 15.5164 30.2075L15.4865 30.1775Z" fill="black"/>
              </svg>
            </div>
            <div class='ootd-detail-content-product-list-image-wrapper'>
              <div class='ootd-detail-content-product-image-wrapper' v-for='n in 4'>
                <img class='ootd-detail-content-product-image' src='@/assets/images/ootd-detail-product-example.png'>
              </div>
            </div>
            <div class='ootd-detail-content-product-list-forward-button-wrapper'>
              <svg class='ootd-detail-content-product-list-forward-button' xmlns="http://www.w3.org/2000/svg" width="17" height="31" viewBox="0 0 17 31" fill="none">
                <path d="M1.51339 30.2074C1.31686 30.2098 1.122 30.1711 0.941349 30.0936C0.760696 30.0162 0.598245 29.9018 0.464441 29.7579C-0.134957 29.1585 -0.134957 28.2294 0.464441 27.63L12.902 15.1925L0.464441 2.78493C-0.134957 2.18553 -0.134957 1.25647 0.464441 0.657068C1.06384 0.0576699 1.99291 0.0576699 2.59231 0.657068L16.0488 14.1735C16.6482 14.7729 16.6482 15.702 16.0488 16.3014L2.56234 29.7579C2.26264 30.0576 1.87303 30.2074 1.51339 30.2074Z" fill="black"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class='ootd-detail-footer-left'>
        <div class='ootd-detail-footer-count-wrapper'>
          <div class='ootd-detail-footer-like-count-wrapper'>
            <div class='ootd-detail-footer-like-count'>
              좋아요 N
            </div>
          </div>
          <div class='ootd-detail-footer-comment-count-wrapper'>
            <div class='ootd-detail-footer-comment-count'>
              댓글 N
            </div>
          </div>
          <div class='ootd-detail-footer-view-count-wrapper'>
            <div class='ootd-detail-footer-view-count'>
              조회 N
            </div>
          </div>
        </div>
        <div class='ootd-detail-footer-writer-detail-wrapper'>
          <div class='ootd-detail-footer-writer-detail-left-wrapper'>
            <img class='ootd-detail-footer-writer-profile-image' src='@/assets/images/default-profile-image.png'>
            <div class='ootd-detail-footer-writer-detail-wrapper'>
              <div class='ootd-detail-footer-writer-nickname-wrapper'>
                <div class='ootd-detail-footer-writer-nickname'>
                  작성자 닉네임
                </div>
              </div>
              <div class='ootd-detail-footer-created-date-wrapper'>
                <div class='ootd-detail-footer-created-date'>
                  작성일
                </div>
              </div>
            </div>
            <div class='ootd-detail-footer-follow-wrapper'>
              <div class='ootd-detail-footer-follow'>
                <div class='ootd-detail-footer-follow-text'>
                  +팔로우
                </div>
              </div>
              <div class='ootd-detail-footer-following'>
                <svg class='ootd-detail-footer-following-icon' xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M4.91678 9.5L0.690186 5.27341L1.29739 4.66706L4.91678 8.28645L12.7032 0.5L13.3096 1.10635L4.91678 9.5Z" fill="#C6C6C6"/>
                </svg>
                <div class='ootd-detail-footer-following-text'>
                  팔로잉
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='ootd-detail-divide-line-wrapper'>
        <div class='ootd-detail-divide-line'></div>
      </div>
      <OOTDPostCommentComponent />
    </div>
    <div class='ootd-detail-like-button-wrapper'>
      <div class='ootd-detail-like-button'>
        <svg class='ootd-detail-like-button-icon' xmlns="http://www.w3.org/2000/svg" width="40" height="37" viewBox="0 0 40 37" fill="none">
          <path d="M20 36.7L17.1 34.06C6.8 24.72 0 18.54 0 11C0 4.82 4.84 0 11 0C14.48 0 17.82 1.62 20 4.16C22.18 1.62 25.52 0 29 0C35.16 0 40 4.82 40 11C40 18.54 33.2 24.72 22.9 34.06L20 36.7Z" fill="#C6C6C6"/>
        </svg>
      </div>
      <div class='ootd-detail-like-text-wrapper'>
        <div class='ootd-detail-like-text'>
          999+
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/ootd/ootd-detail.css";
</style>