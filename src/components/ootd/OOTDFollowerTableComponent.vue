<script setup lang='ts'>

import { ref } from 'vue'
import type { FollowerResponse, FollowingResponse } from '@/apis/ootd/FollowDto'
import { type FollowerPageResponse } from '@/apis/ootd/FollowDto'
import { getFollowers } from '@/apis/ootd/FollowService'
import { onBeforeMount, watch } from 'vue'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import { useFollowStore } from '@/stores/follow/FollowStore'

const props = defineProps({
  addedFollowings: {
    type: Array<FollowingResponse>,
    require: true
  }
})

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const requestPage = ref<number>(0)
const followers = ref<Array<FollowerResponse>>()
const totalPages = ref<number>()
const totalElements = ref<number>()

const followStore = useFollowStore()
const follows = followStore.follows

const fetchDefaultData = async (): Promise<FollowerPageResponse<FollowerResponse>> => {
  const followerPageResponse = await getFollowers(0, 5, 'createdAt,desc')
  followers.value = followerPageResponse.followers
  totalPages.value = followerPageResponse.totalPages
  totalElements.value = followerPageResponse.totalElements

  return followerPageResponse
}

onBeforeMount(async () => {
  await fetchDefaultData()
})

const onChangePage = async (page: number) => {
  if (page >= 0 && page < totalPages.value!) {
    requestPage.value = page
  }
}

watch(requestPage, async (afterPage, beforePage) => {
  if (afterPage < totalPages.value!) {
    const followerPageResponse = await getFollowers(afterPage, 5, 'createdAt,desc')
    followers.value = followerPageResponse.followers
    totalPages.value = followerPageResponse.totalPages
    totalElements.value = followerPageResponse.totalElements
  }
})

const followButtonClickListener = (followerId: number, isFollowing: boolean | undefined) => {

  // 이미 팔로잉하는 상태라면
  if(isFollowing) {
    // 언팔로우
    if(!follows.has(followerId)) {
      followers.value?.forEach((follower) => {
        if(follower.id === followerId) {
          props.addedFollowings!.push({
            id: follower.id,
            nickname: follower.nickname,
            profileImgUrl: follower.profileImgUrl,
            isFollowing: follower.isFollowing
          })
        }
      })
    }
    // 팔로우
    else {
      const indexToRemove = props.addedFollowings!.findIndex((following) => following.id === followerId)
      if (indexToRemove !== -1) {
        props.addedFollowings?.splice(indexToRemove, 1)
      }
    }
  }
  // 아니라면
  else {
    // 언팔로우
    if(follows.has(followerId)) {
      const indexToRemove = props.addedFollowings!.findIndex((following) => following.id === followerId)
      if (indexToRemove !== -1) {
        props.addedFollowings?.splice(indexToRemove, 1)
      }
    }
    // 팔로우
    else {
      followers.value?.forEach((follower) => {
        if(follower.id === followerId) {
          props.addedFollowings!.push({
            id: follower.id,
            nickname: follower.nickname,
            profileImgUrl: follower.profileImgUrl,
            isFollowing: follower.isFollowing
          })
        }
      })
    }
  }
  follows.has(followerId) ? follows.delete(followerId) : follows.add(followerId)
}

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
      height: img.value[0]!.height,
    }
  }
}
</script>

<template>
  <div class='follow-row-container'>
    <div v-for='follower in followers' :key='follower.id' class='follow-row'>
      <RouterLink :to='`/ootds/profile/${follower.id}`' class='follow-img-wrapper'>
        <img v-if='imageSize.width === 0 || imageSize.height === 0' class='follow-img' ref='img' @load='getImageSize'
             src='@/assets/images/loading.gif' />
        <img v-else class='follow-img' ref='img' @load='getImageSize'
             :src='`${VITE_STATIC_IMG_URL}${follower.profileImgUrl}?w=${imageSize.width}&h=${imageSize.height}`' />
      </RouterLink>
      <div class='nickname-wrapper'>
        <RouterLink class='nickname' :to='`/ootds/profile/${follower.id}`'>
          {{ follower.nickname }}
        </RouterLink>
      </div>
      <div v-if='follows.has(follower.id) ? !follower.isFollowing : follower.isFollowing'
           class='follow-btn following'
           @click='followButtonClickListener(follower.id, follower.isFollowing)'>
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
           @click='followButtonClickListener(follower.id, follower.isFollowing)'>+팔로우
      </div>
    </div>
  </div>
  <PaginationComponent :onChangePage='onChangePage' :requestPage='requestPage' :totalPages='totalPages' />
</template>

<style scoped>
@import "@/assets/css/follow.css";
</style>