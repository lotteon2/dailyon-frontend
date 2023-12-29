<script setup lang="ts">
import MemberOOTDPostComponent from '@/components/ootd/MemberOOTDPostComponent.vue'
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import OOTDProfileCardComponent from '@/components/ootd/OOTDProfileCardComponent.vue'
import WishComponent from '@/components/wishcart/WishComponent.vue'

const route = useRoute()
const postMemberId = ref<number>(Number(route.params.id))
const headerOptions = reactive([
  { label: '게시글', value: 'posts' },
  { label: '위시리스트', value: 'wishlist' }
])
const requestHeaderOption = ref<string>(headerOptions[0].value)

const onChangeContent = async (headerOption: string) => {
  requestHeaderOption.value = headerOption
}
</script>

<template>
  <div class="main-container">
    <div class="left-container">
      <OOTDProfileCardComponent :postMemberId="postMemberId" />
    </div>
    <div class="right-container">
      <div class="content-header-wrapper">
        <div v-for="headerOption in headerOptions" class="content-nav-wrapper">
          <span
            class="content-nav-text"
            :class="{ selected: requestHeaderOption === headerOption.value }"
            @click="onChangeContent(headerOption.value)"
          >
            {{ headerOption.label }}
          </span>
        </div>
      </div>
      <MemberOOTDPostComponent
        v-if="requestHeaderOption === headerOptions[0].value"
        :postMemberId="postMemberId"
      />
      <WishComponent
        v-if="requestHeaderOption === headerOptions[1].value"
        :target-id="postMemberId"
      />
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/ootd/ootd-profile.css';
</style>
