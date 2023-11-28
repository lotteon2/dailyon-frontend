<script setup lang='ts'>

import { onBeforeMount, reactive, ref, watch } from 'vue'
import type { FollowerPageResponse, FollowerResponse } from '@/services/ootd/FollowDto'
import { getFollowers } from '@/services/ootd/FollowService'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const tabOptions = reactive([
  { label: '팔로워', value: 'follower' },
  { label: '팔로잉', value: 'following' }
])
const requestTab = ref<string>(tabOptions[0].value)
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
  if(page >= 0 && page < totalPages.value!) {
    requestPage.value = page
  }
}

watch(requestPage, async (afterPage, beforePage) => {
  if(afterPage < totalPages.value!) {
    const followerPageResponse = await getFollowers(afterPage, 5, 'createdAt,desc')
    followers.value = followerPageResponse.followers
    totalPages.value = followerPageResponse.totalPages
    totalElements.value = followerPageResponse.totalElements
  }
})
</script>

<template>
  <div class='follow-container'>
    <div class='container-title'>팔로잉/팔로워 관리</div>
    <div class='container-line'></div>
    <div class='follow-text-container'>
      <div v-for='tabOption in tabOptions' :key='tabOption.value'
           class='follow-text' :class="{ 'selected': requestTab === tabOption.value }">{{ tabOption.label }}</div>
    </div>
    <div class='follow-row-container'>
      <div v-for='follower in followers' :key='follower.id' class='follow-row'>
        <img class='follow-img' :src='`${VITE_STATIC_IMG_URL}${follower.profileImgUrl}`'/>
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
    <div class='pagination-wrapper'>
      <div class='back-button-wrapper' @click='onChangePage(requestPage - 1)'
           :class="{ 'disabled': requestPage === 0 }">
        <svg class='back-button' :class="{ 'disabled': requestPage === 0 }" xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
          <path d="M7.41563 13.3557C7.33046 13.3567 7.24602 13.3399 7.16774 13.3064C7.08946 13.2728 7.01906 13.2232 6.96108 13.1609L1.11692 7.3167C0.857184 7.05696 0.857184 6.65437 1.11692 6.39463L6.96108 0.563458C7.22082 0.303717 7.62342 0.303717 7.88316 0.563458C8.1429 0.823198 8.1429 1.22579 7.88316 1.48554L2.49355 6.86216L7.88316 12.2518C8.1429 12.5115 8.1429 12.9141 7.88316 13.1738C7.75329 13.3037 7.58446 13.3687 7.42861 13.3687L7.41563 13.3557Z"/>
        </svg>
      </div>
      <div class='page-button-wrapper' v-for='page in totalPages'
           @click='onChangePage(page - 1)' :class="{ 'selected': requestPage === page - 1 }">
        <div class='page-button' :class="{ 'selected': requestPage === page - 1 }">
          {{ page }}
        </div>
      </div>
      <div class='front-button-wrapper' @click='onChangePage(requestPage + 1)'
           :class="{ 'disabled': requestPage + 1 === totalPages }">
        <svg class='front-button' :class="{ 'disabled': requestPage + 1 === totalPages }" xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
          <path d="M1.57794 13.3686C1.49277 13.3696 1.40834 13.3528 1.33005 13.3193C1.25177 13.2858 1.18137 13.2362 1.12339 13.1738C0.863654 12.9141 0.863654 12.5115 1.12339 12.2517L6.51299 6.86214L1.12339 1.48553C0.863654 1.22579 0.863654 0.823196 1.12339 0.563457C1.38313 0.303718 1.78573 0.303718 2.04547 0.563457L7.87662 6.42058C8.13636 6.68032 8.13636 7.08291 7.87662 7.34265L2.03248 13.1738C1.90261 13.3037 1.73378 13.3686 1.57794 13.3686Z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/follow.css";
</style>