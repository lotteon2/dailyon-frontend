<script setup lang="ts">
import { ref } from 'vue'
import type { PostResponse } from '@/apis/ootd/PostDto'
import { usePostLikeStore } from '@/stores/postlike/PostLikeStore'
import { onBeforeRouteLeave } from 'vue-router'
import { storeToRefs } from 'pinia'
import { togglePostLike } from '@/apis/ootd/PostLikeService'
import { infoModal } from '@/utils/Modal'
import { LOGIN_NEED_MSG } from '@/utils/CommonMessage'
import { usePostStore } from '@/stores/post/PostStore'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const props = defineProps({
  posts: {
    type: Array as () => Array<PostResponse>,
    default: () => [],
    required: true
  }
})

const postLikeStore = usePostLikeStore()
const postStore = usePostStore()
const { postLikes } = storeToRefs(postLikeStore)

const likeButtonClickListener = async (postId: number, isLike: boolean | undefined) => {
  if (isLike === undefined) {
    await infoModal('알림', LOGIN_NEED_MSG)
  } else {
    const postIndex = props.posts.findIndex((post) => post.id === postId)
    if (postIndex !== -1) {
      await postLikeStore.togglePostLikes(postId)
    }
  }
}

const flushLikeStore = async () => {
  const postIds: number[] = []
  postLikes.value.forEach((storedPostLike) => {
    postIds.push(storedPostLike)
  })

  if (postIds.length !== 0) {
    await togglePostLike(postIds)
    await postLikeStore.clearPostLikes()
  }
}

// 페이지 이동 시 이벤트
onBeforeRouteLeave(async (to, from) => {
  await flushLikeStore()
  await postStore.renewPostView()
})

const img = ref<Array<HTMLImageElement>>(new Array<HTMLImageElement>())
const imageSize = ref({
  width: 0,
  height: 0
})

const getImageSize = async () => {
  if (img.value[0]) {
    await handleImageLoad()
  } else {
    ;(img.value[0] as HTMLImageElement).onload = handleImageLoad
  }
}

const handleImageLoad = async () => {
  if (img.value) {
    imageSize.value = {
      width: img.value[0]!.width,
      height: img.value[0]!.height
    }
  }
}
</script>

<template>
  <div class="ootd-body-container">
    <div v-for="post in posts" class="ootd-post-card-wrapper">
      <div class="ootd-post-card-image-wrapper">
        <RouterLink :to="`/ootds/${post.id}`">
          <img
            v-if="imageSize.width === 0 || imageSize.height === 0"
            class="ootd-post-card-image"
            ref="img"
            @load="getImageSize"
            src="@/assets/images/loading.gif"
            alt="게시글 이미지"
          />
          <img
            v-else
            class="ootd-post-card-image"
            ref="img"
            @load="getImageSize"
            :src="`${VITE_STATIC_IMG_URL}${post.thumbnailImgUrl}?w=${imageSize.width}&h=${imageSize.height}&q=95`"
            alt="게시글 이미지"
          />
        </RouterLink>
        <div
          class="ootd-post-card-like-wrapper"
          @click="likeButtonClickListener(post.id, post.isLike)"
        >
          <svg
            class="ootd-post-card-like"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 44 42"
            fill="none"
          >
            <path
              class="ootd-post-card-like-icon"
              :class="{
                selected:
                  post.isLike === undefined
                    ? false
                    : postLikeStore.hasPostLike(post.id)
                      ? !post.isLike
                      : post.isLike
              }"
              d="M21.3268 39.4395L22 40.0523L22.6732 39.4395L25.5717 36.8008C25.5718 36.8007 25.5719 36.8007 25.572 36.8006C30.7022 32.1485 35.0416 28.2134 38.0868 24.4879C41.143 20.7488 43 17.0988 43 13C43 6.26652 37.7111 1 31 1C27.6025 1 24.3411 2.41653 22 4.70025C19.6589 2.41653 16.3975 1 13 1C6.28891 1 1 6.26652 1 13C1 17.0988 2.85704 20.7488 5.91324 24.4879C8.9584 28.2134 13.2978 32.1485 18.428 36.8006C18.4281 36.8007 18.4282 36.8007 18.4283 36.8008L21.3268 39.4395Z"
              fill="#DADADA"
              fill-opacity="0.4"
              stroke="white"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
      <div class="ootd-post-card-view-wrapper">
        <div class="ootd-post-card-like-view-wrapper">
          <svg
            class="ootd-post-card-like-count-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 17 15"
            fill="none"
          >
            <path
              d="M8.82563 15L7.64035 13.921C3.43054 10.1035 0.651245 7.57766 0.651245 4.49591C0.651245 1.97003 2.62945 0 5.14716 0C6.5695 0 7.93462 0.662125 8.82563 1.70027C9.71664 0.662125 11.0818 0 12.5041 0C15.0218 0 17 1.97003 17 4.49591C17 7.57766 14.2207 10.1035 10.0109 13.921L8.82563 15Z"
              fill="#FF0000"
            />
          </svg>
          <div v-if="post.likeCount <= 999" class="ootd-post-card-like-view-count-text">
            <div
              v-if="post.isLike !== undefined && postLikeStore.hasPostLike(post.id) && post.isLike"
            >
              {{ post.likeCount - 1 }}
            </div>
            <div
              v-else-if="
                post.isLike !== undefined && postLikeStore.hasPostLike(post.id) && !post.isLike
              "
            >
              {{ post.likeCount + 1 }}
            </div>
            <div v-else>
              {{ post.likeCount }}
            </div>
          </div>
          <div v-else class="ootd-post-card-like-view-count-text">999+</div>
        </div>
        <div class="ootd-post-card-count-view-wrapper">
          <svg
            class="ootd-post-card-view-count-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 15"
            fill="none"
          >
            <path
              d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
              fill="#C6C6C6"
            />
          </svg>
          <div v-if="post.viewCount <= 999" class="ootd-post-card-count-view-count-text">
            {{ post.viewCount }}
          </div>
          <div v-else class="ootd-post-card-count-view-count-text">999+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/ootd/ootd-post-card.css';
</style>
