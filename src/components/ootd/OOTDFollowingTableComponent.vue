<script setup lang='ts'>

import { onBeforeMount, ref, watch } from 'vue'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import type { FollowingResponse } from '@/apis/ootd/FollowDto'
import { getFollowings } from '@/apis/ootd/FollowService'
import { useFollowStore } from '@/stores/follow/FollowStore'
import { storeToRefs } from 'pinia'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'

const props = defineProps({
  addedFollowings: {
    type: Array<FollowingResponse>,
    require: true
  }
})

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const requestPage = ref<number>(0)
const followings = ref<Array<FollowingResponse>>(new Array<FollowingResponse>())
const totalPages = ref<number>()
const totalElements = ref<number>()

const followStore = useFollowStore()
const { follows } = storeToRefs(followStore)

const fetchDefaultData = async () => {
  const followingPageResponse = await getFollowings(0, 5, 'createdAt,desc')
  followings.value = followingPageResponse.followings
  totalPages.value = followingPageResponse.totalPages
  totalElements.value = followingPageResponse.totalElements
}

onBeforeMount(async () => {
  await fetchDefaultData()
  props.addedFollowings!.forEach((addedFollowing: FollowingResponse) => {
    const duplicatedIndex = followings.value!.findIndex((following) => following.id === addedFollowing.id)
    if (duplicatedIndex === -1) {
      followings.value?.unshift(addedFollowing!)
    } else {
      followings.value?.splice(duplicatedIndex, 1)
    }
  })
})

const onChangePage = async (page: number) => {
  if (page >= 0 && page < totalPages.value!) {
    requestPage.value = page
  }
}

watch(requestPage, async (afterPage, beforePage) => {
  if (afterPage < totalPages.value!) {
    const followingPageResponse = await getFollowings(afterPage, 5, 'createdAt,desc')
    followings.value = followingPageResponse.followings
    totalPages.value = followingPageResponse.totalPages
    totalElements.value = followingPageResponse.totalElements
  }
})

const followButtonClickListener = (followingId: number, isFollowing: boolean | undefined) => {
  followStore.toggleFollows(followingId)
}

const followingEmits = defineEmits(['followings'])
followingEmits('followings', followings)

const img = ref<Array<HTMLImageElement>>(new Array<HTMLImageElement>())
const imageSize = ref({
  width: 0,
  height: 0
})

const getImageSize = async () => {
  if (img.value[0]) {
    await handleImageLoad()
  } else {
    (img.value[0] as HTMLImageElement).onload = handleImageLoad
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
  <WhitePageComponent v-if='followings.length === 0' message='팔로잉이 없습니다' />
  <div v-else>
    <div class='follow-row-container'>
      <div v-for='following in followings' :key='following.id' class='follow-row'>
        <RouterLink :to='`/ootds/profile/${following.id}`'>
          <img v-if='imageSize.width === 0 || imageSize.height === 0' class='follow-img' ref='img' @load='getImageSize'
               src='@/assets/images/loading.gif' />
          <img v-else class='follow-img' ref='img' @load='getImageSize'
               :src='`${VITE_STATIC_IMG_URL}${following.profileImgUrl}?w=${imageSize.width}&h=${imageSize.height}`' />
        </RouterLink>
        <div class='nickname-wrapper'>
          <RouterLink class='nickname' :to='`/ootds/profile/${following.id}`'>
            {{ following.nickname }}
          </RouterLink>
        </div>
        <div v-if='followStore.hasFollowingId(following.id) ? !following.isFollowing : following.isFollowing'
             class='follow-btn following'
             @click='followButtonClickListener(following.id, following.isFollowing)'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='13'
            height='9'
            viewBox='0 0 13 9'
            fill='none'
          >
            <path
              d='M4.22659 9L0 4.77341L0.6072 4.16706L4.22659 7.78645L12.013 0L12.6194 0.60635L4.22659 9Z'
              fill='#C6C6C6'
            />
          </svg>
          팔로잉
        </div>
        <div v-else class='follow-btn non-following'
             @click='followButtonClickListener(following.id, following.isFollowing)'>+팔로우
        </div>
      </div>
    </div>
    <PaginationComponent :onChangePage='onChangePage' :requestPage='requestPage' :totalPages='totalPages' />
  </div>
</template>

<style scoped>
@import "@/assets/css/follow.css";
</style>