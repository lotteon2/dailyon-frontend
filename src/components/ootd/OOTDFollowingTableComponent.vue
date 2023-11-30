<script setup lang='ts'>

import { onBeforeMount, ref, watch } from 'vue'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import type { FollowingPageResponse, FollowingResponse } from '@/apis/ootd/FollowDto'
import { getFollowings } from '@/apis/ootd/FollowService'
import { useFollowStore } from '@/stores/follow/FollowStore'

const props = defineProps({
  addedFollowings: {
    type: Array<FollowingResponse>,
    require: true
  }
})

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const requestPage = ref<number>(0)
const followings = ref<Array<FollowingResponse>>()
const totalPages = ref<number>()
const totalElements = ref<number>()

const followStore = useFollowStore()
const follows = followStore.follows

const fetchDefaultData = async (): Promise<FollowingPageResponse<FollowingResponse>> => {
  const followingPageResponse = await getFollowings(0, 5, 'createdAt,desc')
  followings.value = followingPageResponse.followings
  totalPages.value = followingPageResponse.totalPages
  totalElements.value = followingPageResponse.totalElements

  return followingPageResponse
}

onBeforeMount(async () => {
  await fetchDefaultData()
  props.addedFollowings!.forEach((addedFollowing: FollowingResponse) => {
    const duplicatedIndex = followings.value!.findIndex((following) => following.id === addedFollowing.id)
    if (duplicatedIndex === -1) {
      followings.value?.unshift(addedFollowing!)
    } else {
      followings.value?.splice(duplicatedIndex, duplicatedIndex + 1)
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
  follows.has(followingId) ? follows.delete(followingId) : follows.add(followingId)
}

const followingEmits = defineEmits(['followings'])
followingEmits('followings', followings)
</script>

<template>
  <div class='follow-row-container'>
    <div v-for='following in followings' :key='following.id' class='follow-row'>
      <RouterLink :to='`/ootds/profile/${following.id}`'>
        <img class='follow-img' :src='`${VITE_STATIC_IMG_URL}${following.profileImgUrl}`' />
      </RouterLink>
      <div class='nickname-wrapper'>
        <RouterLink class='nickname' :to='`/ootds/profile/${following.id}`'>
          {{ following.nickname }}
        </RouterLink>
      </div>
      <div v-if='follows.has(following.id) ? !following.isFollowing : following.isFollowing'
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
</template>

<style scoped>
@import "@/assets/css/follow.css";
</style>