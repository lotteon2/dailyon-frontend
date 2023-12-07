<script setup lang='ts'>

import { reactive, ref } from 'vue'
import OOTDFollowerTableComponent from '@/components/ootd/OOTDFollowerTableComponent.vue'
import OOTDFollowingTableComponent from '@/components/ootd/OOTDFollowingTableComponent.vue'
import { useFollowStore } from '@/stores/follow/FollowStore'
import { toggleFollow } from '@/apis/ootd/FollowService'
import { onBeforeRouteLeave } from 'vue-router'
import type { FollowingResponse } from '@/apis/ootd/FollowDto'

const followStore = useFollowStore()
const follows = followStore.follows

const tabOptions = reactive([
  { label: '팔로워', value: 'follower' },
  { label: '팔로잉', value: 'following' }
])
const requestTab = ref<string>(tabOptions[0].value)
const addedFollowings = ref<Array<FollowingResponse>>(new Array<FollowingResponse>())

const onTabChange = async (tabOption: string) => {
  requestTab.value = tabOption
}

const flushFollowStore = async () => {
  const followingIds: number[] = []
  follows.forEach((followingId: number) => {
    followingIds.push(followingId)
  })
  await toggleFollow(followingIds)
  follows.clear()
}

// 페이지 이동 시 이벤트
onBeforeRouteLeave(async (to, from) => {
  await flushFollowStore()
})

// 새로고침 or 브라우저 창 닫을 때 이벤트
window.onbeforeunload = function() {
  flushFollowStore()
}

</script>

<template>
  <div class='follow-container'>
    <div class='container-title'>팔로잉/팔로워 관리</div>
    <div class='container-line'></div>
    <div class='follow-text-container'>
      <div v-for='tabOption in tabOptions' :key='tabOption.value'
           class='follow-text' :class="{ 'selected': requestTab === tabOption.value }"
           @click='onTabChange(tabOption.value)'>
        {{ tabOption.label }}
      </div>
    </div>
    <OOTDFollowerTableComponent
      v-if='requestTab === tabOptions[0].value' :addedFollowings='addedFollowings' />
    <OOTDFollowingTableComponent
      v-if='requestTab === tabOptions[1].value' :addedFollowings='addedFollowings' />
  </div>
</template>

<style scoped>
@import "@/assets/css/follow.css";
</style>