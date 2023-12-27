<script setup lang='ts'>

import { onBeforeMount, ref } from 'vue'
import type { PostDetailHashTagResponse, PostDetailResponse, PostImageProductDetailResponse } from '@/apis/ootd/PostDto'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { addViewCount, deletePost, getPostDetail } from '@/apis/ootd/PostService'
import OOTDPostCommentComponent from '@/components/ootd/OOTDPostCommentComponent.vue'
import { usePostLikeStore } from '@/stores/postlike/PostLikeStore'
import router from '@/router'
import { togglePostLike } from '@/apis/ootd/PostLikeService'
import { useFollowStore } from '@/stores/follow/FollowStore'
import { toggleFollow } from '@/apis/ootd/FollowService'
import { usePostStore } from '@/stores/post/PostStore'
import { useMemberStore } from '@/stores/member/MemberStore'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const memberStore = useMemberStore()
const memberId = memberStore.getMemberInfo().memberId
const route = useRoute()
const postId = ref<number>(Number(route.params.id))
const post = ref<PostDetailResponse>({
  id: 0,
  title: '',
  description: '',
  imgUrl: '',
  stature: undefined,
  weight: undefined,
  viewCount: 0,
  likeCount: 0,
  commentCount: 0,
  isLike: undefined,
  createdAt: new Date(),
  member: {
    id: 0,
    nickname: '',
    profileImgUrl: '',
    code: '',
    isFollowing: false
  },
  hashTags: [] as PostDetailHashTagResponse[],
  postImageProductDetails: [] as PostImageProductDetailResponse[]
})

const fetchDefaultData = async (): Promise<PostDetailResponse> => {
  const postDetailResponse = await getPostDetail(postId.value)
  post.value = postDetailResponse

  return postDetailResponse
}

const formattedCreatedAt = ref<string>('')
const formatDate = async () => {
  const date: Date = new Date(post.value.createdAt)
  formattedCreatedAt.value = date.getFullYear() + '-' +
    (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + '-' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' +
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
}

const onAddViewCount = async () => {
  const postViews = await postStore.getPostViews()
  if(postViews.value.indexOf(postId.value) === -1) {
    await addViewCount(postId.value)
    await postStore.addPostView(postId.value)
  }
}

onBeforeMount(async () => {
  await onAddViewCount()
  await fetchDefaultData()
  await formatDate()
})

const postLikeStore = usePostLikeStore()
const postLikes = postLikeStore.postLikes
const likeButtonClickListener = (isLike: boolean | undefined) => {
  if (isLike === undefined) {
    alert('로그인이 필요합니다.')
  } else {
    if (postLikes.has(postId.value)) {
      post.value.isLike ? post.value.likeCount += 1 : post.value.likeCount -= 1
    } else {
      post.value.isLike ? post.value.likeCount -= 1 : post.value.likeCount += 1
    }
    postLikes.has(postId.value) ? postLikes.delete(postId.value) : postLikes.add(postId.value)
  }
}


const followStore = useFollowStore()
const follows = followStore.follows
const followButtonClickListener = (followingId: number, isFollowing: boolean | undefined) => {
  post.value.member.isFollowing = !isFollowing
  follows.has(followingId) ? follows.delete(followingId) : follows.add(followingId)
}

const flushFollowStore = async () => {
  const followingIds: number[] = []
  follows.forEach((followingId: number) => {
    followingIds.push(followingId)
  })

  if (followingIds.length !== 0) {
    await toggleFollow(followingIds)
    follows.clear()
  }
}

const flushLikeStore = async () => {
  const postIds: number[] = []
  postLikes.forEach((postLike) => {
    postIds.push(postLike)
  })

  if (postIds.length !== 0) {
    await togglePostLike(postIds)
    postLikes.clear()
  }
}

// 페이지 이동 시 이벤트
onBeforeRouteLeave(async (to, from) => {
  await flushLikeStore()
  await flushFollowStore()
})

// 새로고침 or 브라우저 창 닫을 때 이벤트
window.addEventListener('beforeunload', async (event) => {
  try {
    event.returnValue = ''
    flushFollowStore().then((res) => {
      flushLikeStore().then((res2) => {
        window.location.reload()
      })
    })
  } catch (error: any) {
    console.error(error)
    event.preventDefault()
    event.returnValue = ''
  }
})

const postStore = usePostStore()
const onUpdateBtnClick = async () => {
  await postStore.setPostUpdateRequest({
    title: post.value.title,
    description: post.value.description,
    stature: post.value.stature,
    weight: post.value.weight,
    hashTags: post.value.hashTags.map((hashTag) => {
      return {
        id: hashTag.id,
        name: hashTag.name
      }
    }),
    postThumbnailImgName: post.value.imgUrl,
    postImgName: post.value.imgUrl,
    postImageProductDetails: post.value.postImageProductDetails.map((postImageProductDetail) => {
      return {
        id: postImageProductDetail.id,
        productId: postImageProductDetail.productId,
        productSize: postImageProductDetail.size,
        leftGapPercent: postImageProductDetail.leftGapPercent,
        topGapPercent: postImageProductDetail.topGapPercent
      }
    })
  })
  await postStore.setTemporaryTagProducts(post.value.postImageProductDetails.map((postImageProductDetail) => {
    return {
      id: postImageProductDetail.id,
      productId: postImageProductDetail.productId,
      imgUrl: postImageProductDetail.imgUrl!,
      name: postImageProductDetail.name!,
      brandName: postImageProductDetail.brandName!,
      sizeName: postImageProductDetail.size!,
      leftGapPercent: postImageProductDetail.leftGapPercent,
      topGapPercent: postImageProductDetail.topGapPercent
    }
  }))
  await router.push({ path: `/ootds/${postId.value}/edit` })
}

const onDeleteBtnClick = async () => {
  const isConfirmed = confirm("게시글을 삭제하시겠습니까?")
  if(isConfirmed) {
    await deletePost(postId.value)
    alert('게시글이 삭제되었습니다.')
    await router.push({ path: '/ootds' })
  }
}
</script>

<template>
  <div class='ootd-detail-container'>
    <div class='ootd-detail-content-body'>
      <div class='ootd-detail-header'>
        <div class='ootd-detail-header-top'>
          <div class='ootd-detail-header-title-wrapper'>
            <div class='ootd-detail-header-title-text'>
              {{ post.title }}
            </div>
          </div>
          <div v-if='post.member.id === memberId' class='ootd-detail-header-control-button-wrapper'>
            <div class='ootd-detail-header-edit-button-wrapper' @click='onUpdateBtnClick'>
              <div class='ootd-detail-header-edit-button-text'>
                수정
              </div>
            </div>
            <div class='ootd-detail-header-delete-button-wrapper' @click='onDeleteBtnClick'>
              <div class='ootd-detail-header-delete-button-text'>
                삭제
              </div>
            </div>
          </div>
        </div>
        <div class='ootd-detail-header-middle'>
          <div class='member-info-wrapper'>
            <RouterLink :to='`/ootds/profile/${post.member.id}`'
                        class='ootd-detail-header-writer-profile-image-wrapper'>
              <img :src='`${VITE_STATIC_IMG_URL}${post.member.profileImgUrl}`'
                   class='ootd-detail-header-writer-profile-image'>
            </RouterLink>
            <div class='ootd-detail-header-writer-info-wrapper'>
              <div class='ootd-detail-header-writer-info-top-wrapper'>
                <RouterLink :to='`/ootds/profile/${post.member.id}`' class='ootd-detail-header-writer-nickname-wrapper'>
                  <div class='ootd-detail-header-writer-nickname-text'>
                    {{ post.member.nickname }}
                  </div>
                </RouterLink>
                <div class='ootd-detail-header-follow-wrapper'>
                  <div v-if='post.member.id === memberId'></div>
                  <div v-else-if='!post.member.isFollowing'
                       @click='followButtonClickListener(post.member.id, post.member.isFollowing)'
                       class='ootd-detail-header-follow'>
                    <div class='ootd-detail-header-follow-text'>
                      +팔로우
                    </div>
                  </div>
                  <div v-else class='ootd-detail-header-following'
                       @click='followButtonClickListener(post.member.id, post.member.isFollowing)'>
                    <svg class='ootd-detail-header-following-icon' xmlns='http://www.w3.org/2000/svg'
                         viewBox='0 0 14 10' fill='none'>
                      <path
                        d='M4.91678 9.5L0.690186 5.27341L1.29739 4.66706L4.91678 8.28645L12.7032 0.5L13.3096 1.10635L4.91678 9.5Z'
                        fill='#C6C6C6' />
                    </svg>
                    <div class='ootd-detail-header-following-text'>
                      팔로잉
                    </div>
                  </div>
                </div>
              </div>
              <div class='ootd-detail-header-content-created-date-wrapper'>
                <div class='ootd-detail-header-content-created-date-text'>
                  {{ formattedCreatedAt }}
                </div>
              </div>
            </div>
          </div>
          <div class='ootd-detail-like-button-wrapper'>
            <div class='ootd-detail-like-button' @click='likeButtonClickListener(post.isLike)'>
              <svg
                :class="{ 'selected': post.isLike === undefined ? false : (postLikes.has(post.id) ? !post.isLike : post.isLike) }"
                class='ootd-detail-like-button-icon' xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 40 37' fill='none'>
                <path
                  d='M20 36.7L17.1 34.06C6.8 24.72 0 18.54 0 11C0 4.82 4.84 0 11 0C14.48 0 17.82 1.62 20 4.16C22.18 1.62 25.52 0 29 0C35.16 0 40 4.82 40 11C40 18.54 33.2 24.72 22.9 34.06L20 36.7Z' />
              </svg>
            </div>
            <div class='ootd-detail-like-text-wrapper'>
              <div v-if='post.likeCount <= 999' class='ootd-detail-like-text'>
                {{ post.likeCount }}
              </div>
              <div v-else class='ootd-detail-like-text'>
                999+
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
                <div class='ootd-detail-size-real-info-text'>
                  <span v-if='post.stature !== undefined'>{{ post.stature }}</span>
                  <span v-else>비공개</span>
                  /
                  <span v-if='post.weight !== undefined'>{{ post.weight }}</span>
                  <span v-else>비공개</span>
                </div>
              </div>
            </div>
            <div class='ootd-detail-fashion-size-info-wrapper'>
              <div class='ootd-detail-fashion-size-info-text-wrapper'>
                <div class='ootd-detail-fashion-size-info-text'>
                  사이즈
                </div>
              </div>
              <div v-for='postImageProductDetail in post.postImageProductDetails'
                   :key='postImageProductDetail.id' class='ootd-detail-fashion-size-info-text-wrapper'>
                <div v-if='postImageProductDetail.name !== undefined'
                     class='ootd-detail-fashion-size-real-info-text'>
                  {{ postImageProductDetail.name }} - {{ postImageProductDetail.size }}
                </div>
                <div v-else
                     class='ootd-detail-fashion-size-real-info-text'>
                  상품 정보를 불러올 수 없습니다.
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
              <div v-for='hashTag in post.hashTags' :key='hashTag.id' class='ootd-detail-tag-button-wrapper'>
                <div class='ootd-detail-tag-button-text'>
                  #{{ hashTag.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='ootd-detail-content'>
        <div class='ootd-detail-content-description-wrapper'>
          <div class='ootd-detail-content-description-text'>
            {{ post.description }}
          </div>
        </div>
        <div class='ootd-detail-content-image-container'>
          <div class='ootd-detail-content-image-wrapper'>
            <img class='ootd-detail-content-image' :src='`${VITE_STATIC_IMG_URL}${post.imgUrl}`'>
            <div v-for='(postImageProductDetail, index) in post.postImageProductDetails' :key='postImageProductDetail.id'
                 class='product-detail-tag-wrapper'
                 :style='{ left: `${postImageProductDetail.leftGapPercent}%`, top: `${postImageProductDetail.topGapPercent}%` }'>
              <svg class='product-detail-tag' xmlns='http://www.w3.org/2000/svg'
                   viewBox='0 0 30 30' fill='none'>
                <path
                  d='M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM16.029 6.50025C20.0424 6.50025 23.2947 9.7544 23.2947 13.7677C23.2947 17.781 20.0424 21.0333 16.029 21.0333C14.8145 21.0333 13.6699 20.7362 12.6636 20.2094C12.6646 20.214 12.6662 20.2194 12.6672 20.224L9.38965 23.4998L6.70533 20.8136L9.86573 17.6514C9.87095 17.649 9.87698 17.6482 9.8822 17.6459C9.17253 16.5236 8.7616 15.1937 8.7616 13.7677C8.7616 9.75438 12.0157 6.50025 16.029 6.50025ZM16.029 9.7284C13.7987 9.7284 11.9898 11.5374 11.9898 13.7677C11.9898 15.998 13.7987 17.8052 16.029 17.8052C18.2594 17.8052 20.0665 15.998 20.0665 13.7677C20.0665 11.5374 18.2594 9.7284 16.029 9.7284Z'
                  fill='#C22727' />
              </svg>
              <div class='product-detail-tag-dropdown-wrapper'
                   :style='{ zIndex: 5 - index }'>
                <svg class='product-detail-tag-dropdown-pointer' xmlns='http://www.w3.org/2000/svg' width='33'
                     height='36' viewBox='0 0 33 36' fill='none'>
                  <path d='M16.4974 0L32.0884 35.25H0.911499L16.4974 0Z' fill='white' />
                </svg>
                <RouterLink
                  v-if='postImageProductDetail.name !== undefined'
                  :to='{ path: `/products/${postImageProductDetail.productId}`, query: { code: post.member.code }}'>
                  <div class='product-detail-tag-dropdown-box'>
                    <img class='product-image'
                         :src='`${VITE_STATIC_IMG_URL}${postImageProductDetail.imgUrl}`'>
                    <div class='product-image-brand-and-name-wrapper'>
                      <div class='product-image-brand'>
                        {{ postImageProductDetail.brandName }}
                      </div>
                      <div class='product-image-name'>
                        {{ postImageProductDetail.name }}
                      </div>
                      <div class='product-image-price-wrapper'>
                        <div class='product-image-price'>
                          {{ postImageProductDetail.price }}원
                        </div>
                      </div>
                    </div>
                  </div>
                </RouterLink>
                <div v-else class='product-detail-tag-dropdown-box-none'>
                  <div class='product-image-name'>
                    상품 정보를 불러올 수 없습니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='ootd-detail-content-product-list-wrapper'>
            <div class='ootd-detail-content-product-list-image-wrapper'>
              <div v-for='postImageProductDetail in post.postImageProductDetails'>
                <RouterLink class='ootd-detail-content-product-image-wrapper'
                            v-if='postImageProductDetail.imgUrl !== undefined'
                            :to='{ path: `/products/${postImageProductDetail.productId}`, query: { code: post.member.code }}'>
                  <img class='ootd-detail-content-product-image'
                       :src='`${VITE_STATIC_IMG_URL}${postImageProductDetail.imgUrl}`'>
                </RouterLink>
                <div class='ootd-detail-content-product-image-wrapper'
                     v-else>
                  <img class='ootd-detail-content-product-image'
                       :src='`${VITE_STATIC_IMG_URL}${postImageProductDetail.imgUrl}`'>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='ootd-detail-footer-left'>
      <div class='ootd-detail-footer-count-wrapper'>
        <div class='ootd-detail-footer-like-count-wrapper'>
          <div class='ootd-detail-footer-like-count'>
            좋아요 <span class='count-wrapper'>{{ post.likeCount }}</span>
          </div>
        </div>
        <div class='ootd-detail-footer-comment-count-wrapper'>
          <div class='ootd-detail-footer-comment-count'>
            댓글 <span class='count-wrapper'>{{ post.commentCount }}</span>
          </div>
        </div>
        <div class='ootd-detail-footer-view-count-wrapper'>
          <div class='ootd-detail-footer-view-count'>
            조회 <span class='count-wrapper'>{{ post.viewCount }}</span>
          </div>
        </div>
      </div>
      <div class='ootd-detail-footer-writer-detail-wrapper'>
        <div class='member-info-wrapper'>
          <RouterLink :to='`/ootds/profile/${post.member.id}`'
                      class='ootd-detail-header-writer-profile-image-wrapper'>
            <img :src='`${VITE_STATIC_IMG_URL}${post.member.profileImgUrl}`'
                 class='ootd-detail-header-writer-profile-image'>
          </RouterLink>
          <div class='ootd-detail-header-writer-info-wrapper'>
            <div class='ootd-detail-header-writer-info-top-wrapper'>
              <RouterLink :to='`/ootds/profile/${post.member.id}`' class='ootd-detail-header-writer-nickname-wrapper'>
                <div class='ootd-detail-header-writer-nickname-text'>
                  {{ post.member.nickname }}
                </div>
              </RouterLink>
              <div class='ootd-detail-header-follow-wrapper'>
                <div v-if='!post.member.isFollowing'
                     @click='followButtonClickListener(post.member.id, post.member.isFollowing)'
                     class='ootd-detail-header-follow'>
                  <div class='ootd-detail-header-follow-text'>
                    +팔로우
                  </div>
                </div>
                <div v-else class='ootd-detail-header-following'
                     @click='followButtonClickListener(post.member.id, post.member.isFollowing)'>
                  <svg class='ootd-detail-header-following-icon' xmlns='http://www.w3.org/2000/svg'
                       viewBox='0 0 14 10' fill='none'>
                    <path
                      d='M4.91678 9.5L0.690186 5.27341L1.29739 4.66706L4.91678 8.28645L12.7032 0.5L13.3096 1.10635L4.91678 9.5Z'
                      fill='#C6C6C6' />
                  </svg>
                  <div class='ootd-detail-header-following-text'>
                    팔로잉
                  </div>
                </div>
              </div>
            </div>
            <div class='ootd-detail-header-content-created-date-wrapper'>
              <div class='ootd-detail-header-content-created-date-text'>
                {{ formattedCreatedAt }}
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
</template>

<style scoped>
@import "@/assets/css/ootd/ootd-detail.css";
</style>