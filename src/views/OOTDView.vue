<script setup lang='ts'>

import { inject, onBeforeMount, reactive, type Ref, ref, watch } from 'vue'
import { getPosts } from '@/apis/ootd/PostService'
import type { PostPageResponse, PostResponse } from '@/apis/ootd/PostDto'
import OOTDCardComponent from '@/components/ootd/OOTDCardComponent.vue'

const sortOptions = reactive([
  { label: '조회순', value: 'viewCount,desc' },
  { label: '최신순', value: 'createdAt,desc' },
  { label: '인기순', value: 'likeCount,desc' }
])
const requestPage = ref<number>(0)
const requestSize = ref<number>(8)
const requestSort = ref<string>(sortOptions[0].value)
const posts = ref<Array<PostResponse>>()
const hasNext = ref<boolean>()

const fetchDefaultData = async (): Promise<PostPageResponse<PostResponse>> => {
  const postPageResponse = await getPosts(0, 8, sortOptions[0].value)
  posts.value = postPageResponse.posts
  hasNext.value = postPageResponse.hasNext

  return postPageResponse
}

onBeforeMount(async () => {
  await fetchDefaultData()
})

const onChangeSort = async (sort: string) => {
  requestSort.value = sort
}

watch(requestSort, async (afterSort, beforeSort) => {
  requestPage.value = 0
  if (beforeSort !== afterSort) {
    const postPageResponse = await getPosts(requestPage.value, requestSize.value, afterSort)
    posts.value = postPageResponse.posts
  }
})

const onChangePage = async (page: number) => {
  requestPage.value = page
}

watch(requestPage, async (afterPage, beforePage) => {
  if (afterPage !== 0 && beforePage !== afterPage && hasNext.value) {
    const postPageResponse = await getPosts(afterPage, requestSize.value, requestSort.value)
    postPageResponse.posts.forEach((post) => {
      posts.value?.push(post)
    })
  }
})

const isScrollEnd = inject<Ref<boolean | undefined>>('isScrollEnd') as Ref<boolean | undefined>
watch(isScrollEnd, async (afterScrollEnd, beforeScrollEnd) => {
  if (afterScrollEnd !== beforeScrollEnd) {
    const currentPage = requestPage.value
    if (hasNext.value) {
      await onChangePage(currentPage + 1)
    }
  }
})
</script>

<template>
  <OOTDCardComponent :posts='posts' :onChangeSort='onChangeSort' :requestSort='requestSort'
                     :sortOptions='sortOptions' />
</template>

<style scoped>
@import "@/assets/ootd.css";
</style>