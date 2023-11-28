<script setup lang='ts'>

import { reactive, ref } from 'vue'
import OOTDFollowerTableComponent from '@/components/ootd/OOTDFollowerTableComponent.vue'
import OOTDFollowingTableComponent from '@/components/ootd/OOTDFollowingTableComponent.vue'

const tabOptions = reactive([
  { label: '팔로워', value: 'follower' },
  { label: '팔로잉', value: 'following' }
])
const requestTab = ref<string>(tabOptions[0].value)

const onTabChange = async (tabOption: string) => {
  requestTab.value = tabOption
}
</script>

<template>
  <div class='follow-container'>
    <div class='container-title'>팔로잉/팔로워 관리</div>
    <div class='container-line'></div>
    <div class='follow-text-container'>
      <div v-for='tabOption in tabOptions' :key='tabOption.value'
           class='follow-text' :class="{ 'selected': requestTab === tabOption.value }" @click='onTabChange(tabOption.value)'>
        {{ tabOption.label }}
      </div>
    </div>
    <OOTDFollowerTableComponent v-if='requestTab === tabOptions[0].value'/>
    <OOTDFollowingTableComponent v-if='requestTab === tabOptions[1].value'/>
  </div>
</template>

<style scoped>
@import "@/assets/css/follow.css";
</style>