<script setup lang='ts'>

import { inject, onBeforeMount, reactive, type Ref, ref, watch } from 'vue'
import { getPosts } from '@/apis/ootd/PostService'
import type { PostResponse } from '@/apis/ootd/PostDto'
import OOTDPostCardComponent from '@/components/ootd/OOTDPostCardComponent.vue'
import OOTDSortComponent from '@/components/ootd/OOTDSortComponent.vue'
import { debounce } from 'lodash'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'

const sortOptions = reactive([
  { label: '최신순', value: 'createdAt,desc' },
  { label: '조회순', value: 'viewCount,desc' },
  { label: '인기순', value: 'likeCount,desc' }
])
const requestPage = ref<number>(0)
const requestSize = ref<number>(8)
const requestSort = ref<string>(sortOptions[0].value)
const posts = ref<Array<PostResponse>>(new Array<PostResponse>())
const hasNext = ref<boolean>()

const fetchDefaultData = debounce(async () => {
  const postPageResponse = await getPosts(0, 8, sortOptions[0].value)
  posts.value = postPageResponse.posts
  hasNext.value = postPageResponse.hasNext
  return postPageResponse
}, 100)

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

    if(requestSort.value === 'viewCount') {
      posts.value.sort((a, b) => b.viewCount - a.viewCount)
    } else if(requestSort.value === 'likeCount') {
      posts.value.sort((a, b) => b.likeCount - a.likeCount)
    }
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
  <div class='ootd-container'>
    <div class='ootd-header-container'>
      <div class='ootd-header-title-wrapper'>
        <div class='ootd-header-title-text'>
          OOTD
        </div>
      </div>
      <div class='ootd-header-bar-wrapper'>
        <OOTDSortComponent :onChangeSort='onChangeSort' :requestSort='requestSort' :sortOptions='sortOptions' />
        <div class='ootd-header-write-btn-wrapper'>
          <RouterLink to='/ootds/create' class='ootd-header-write-btn'>글쓰기</RouterLink>
        </div>
      </div>
    </div>
    <WhitePageComponent v-if='posts.length === 0' message='작성된 게시글이 없습니다' />
    <OOTDPostCardComponent v-else :posts='posts' />
  </div>
</template>

<style scoped>
@import "@/assets/css/ootd/ootd.css";
</style>