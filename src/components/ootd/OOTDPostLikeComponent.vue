<script setup lang='ts'>

import { inject, onBeforeMount, reactive, type Ref, ref, watch } from 'vue'
import type { OOTDPostPageResponse, OOTDPostResponse, PostLikePageResponse, PostLikeResponse } from '@/apis/ootd/PostDto'
import { getMyPosts, getPostLikes } from '@/apis/ootd/PostService'
import OOTDPostCardComponent from '@/components/ootd/OOTDPostCardComponent.vue'
import OOTDSortComponent from '@/components/ootd/OOTDSortComponent.vue'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import { usePostLikeStore } from '@/stores/postlike/PostLikeStore'
import { togglePostLike } from '@/apis/ootd/PostLikeService'

const sortOptions = reactive([
  { label: '조회순', value: 'viewCount,desc' },
  { label: '최신순', value: 'createdAt,desc' },
  { label: '인기순', value: 'likeCount,desc' }
])
const requestPage = ref<number>(0)
const requestSize = ref<number>(6)
const requestSort = ref<string>(sortOptions[0].value)
const posts = ref<Array<PostLikeResponse>>()
const totalPages = ref<number>()
const totalElements = ref<number>()

const postLikeStore = usePostLikeStore()
const postLikes = postLikeStore.postLikes

const fetchDefaultData = async (): Promise<PostLikePageResponse<PostLikeResponse>> => {
  const postPageResponse = await getPostLikes(0, 6, sortOptions[0].value)
  posts.value = postPageResponse.posts
  totalPages.value = postPageResponse.totalPages

  return postPageResponse
}

onBeforeMount(async () => {
  await fetchDefaultData()
})

const onChangeSort = async (sort: string) => {
  postLikes.forEach((postId: number) => {
    togglePostLike(postId)
  })
  postLikes.clear()

  requestSort.value = sort
}

watch(requestSort, async (afterSort, beforeSort) => {
  requestPage.value = 0
  if (beforeSort !== afterSort) {
    const postPageResponse = await getPostLikes(requestPage.value, requestSize.value, afterSort)
    posts.value = postPageResponse.posts
  }
})

const onChangePage = async (page: number) => {
  if (page >= 0 && page < totalPages.value!) {
    postLikes.forEach((postId: number) => {
      togglePostLike(postId)
    })
    postLikes.clear()

    requestPage.value = page
  }
}

watch(requestPage, async (afterPage, beforePage) => {
  if (afterPage < totalPages.value!) {
    const postPageResponse = await getPostLikes(afterPage, requestSize.value, requestSort.value)
    posts.value = postPageResponse.posts
    totalPages.value = postPageResponse.totalPages
    totalElements.value = postPageResponse.totalElements
  }
})

</script>

<template>
  <div class='ootd-container'>
    <div class='ootd-header-container'>
      <div class='ootd-header-bar-wrapper'>
        <OOTDSortComponent :onChangeSort='onChangeSort' :requestSort='requestSort' :sortOptions='sortOptions' />
        <div class='blank-gap'></div>
      </div>
    </div>
    <OOTDPostCardComponent :posts='posts' />
    <PaginationComponent :requestPage='requestPage' :totalPages='totalPages' :onChangePage='onChangePage' />
  </div>
</template>

<style scoped>
@import "@/assets/css/ootd/my-ootd-post.css";
</style>