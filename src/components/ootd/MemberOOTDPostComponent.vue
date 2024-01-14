<script setup lang='ts'>
import { inject, onBeforeMount, reactive, ref, watch } from 'vue'
import type { OOTDPostResponse } from '@/apis/ootd/PostDto'
import { getMemberPosts } from '@/apis/ootd/PostService'
import OOTDPostCardComponent from '@/components/ootd/OOTDPostCardComponent.vue'
import OOTDSortComponent from '@/components/ootd/OOTDSortComponent.vue'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'
import { AxiosError } from 'axios'

const openInternalServerErrorNotification: Function | undefined = inject('openInternalServerErrorNotification')

const props = defineProps({
  postMemberId: {
    type: Number,
    require: true
  }
})

const sortOptions = reactive([
  { label: '조회순', value: 'viewCount,desc' },
  { label: '최신순', value: 'createdAt,desc' },
  { label: '인기순', value: 'likeCount,desc' }
])
const requestPage = ref<number>(0)
const requestSize = ref<number>(6)
const requestSort = ref<string>(sortOptions[0].value)
const posts = ref<Array<OOTDPostResponse>>(new Array<OOTDPostResponse>())
const totalPages = ref<number>()
const totalElements = ref<number>()

const fetchDefaultData = async () => {
  const postPageResponse = await getMemberPosts(props.postMemberId!, 0, 6, sortOptions[0].value)
  posts.value = postPageResponse.posts
  totalPages.value = postPageResponse.totalPages
  totalElements.value = postPageResponse.totalElements
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
    const postPageResponse = await getMemberPosts(
      props.postMemberId!,
      requestPage.value,
      requestSize.value,
      afterSort
    )
    posts.value = postPageResponse.posts
  }
})

const onChangePage = async (page: number) => {
  if (page >= 0 && page < totalPages.value!) {
    requestPage.value = page
  }
}

watch(requestPage, async (afterPage, beforePage) => {
  if (afterPage < totalPages.value!) {
    const postPageResponse = await getMemberPosts(
      props.postMemberId!,
      afterPage,
      requestSize.value,
      requestSort.value
    )
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
        <OOTDSortComponent
          :onChangeSort='onChangeSort'
          :requestSort='requestSort'
          :sortOptions='sortOptions'
        />
        <div class='blank-gap'></div>
      </div>
    </div>
    <WhitePageComponent v-if='posts.length === 0' message='작성된 게시글이 없습니다' />
    <div v-else style='width: 100%'>
      <OOTDPostCardComponent :posts='posts' />
      <PaginationComponent
        :requestPage='requestPage'
        :totalPages='totalPages'
        :onChangePage='onChangePage'
      />
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/ootd/member-ootd-post.css';
</style>
