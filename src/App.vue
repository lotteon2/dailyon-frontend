<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed, provide, ref } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { debounce } from 'lodash'
declare global {
  interface Window {
    Kakao: any
  }
}
const KAKAO_KEY = import.meta.env.VITE_KAKAO_KEY
window.Kakao.init(KAKAO_KEY)
let isScrollEnd = ref<boolean>(false)
const route = useRoute()
const displayHeader = computed(() => !route.path.startsWith('/order-success'))

const onScroll = debounce(async (event: any) => {
  const { scrollHeight, scrollTop, clientHeight } = event.target
  // 스크롤이 끝에 닿으면 데이터를 추가로 로드
  if (scrollHeight - 800 <= scrollTop + clientHeight) {
    isScrollEnd.value = !isScrollEnd.value
  }
}, 200)

provide('isScrollEnd', isScrollEnd)
</script>

<template>
  <div class="container" @scroll="onScroll">
    <header>
      <HeaderComponent v-if="displayHeader" />
    </header>
    <main class="main">
      <RouterView />
    </main>
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

<style>
@import '@/assets/main.css';

.main {
  width: 72vw;
  display: flex;
  justify-content: center;
}
</style>
