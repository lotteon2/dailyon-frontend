<script setup lang='ts'>

import { ref } from 'vue'
import type { FollowerResponse } from '@/apis/ootd/FollowDto'
import { type FollowerPageResponse } from '@/apis/ootd/FollowDto'
import { getFollowers } from '@/apis/ootd/FollowService'
import { onBeforeMount, watch } from 'vue'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const requestPage = ref<number>(0)
const followers = ref<Array<FollowerResponse>>()
const totalPages = ref<number>()
const totalElements = ref<number>()

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
</script>

<template>
  <div class='follow-row-container'>
    <div v-for='follower in followers' :key='follower.id' class='follow-row'>
      <img class='follow-img' :src='`${VITE_STATIC_IMG_URL}${follower.profileImgUrl}`' />
      <div class='nickname'>{{ follower.nickname }}</div>
      <div v-if='follower.isFollowing' class='follow-btn following'>
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
      <div v-else class='follow-btn non-following'>+팔로우</div>
    </div>
  </div>
  <PaginationComponent :onChangePage='onChangePage' :requestPage='requestPage' :totalPages='totalPages' />
</template>

<style scoped>
@import "@/assets/css/follow.css";
</style>