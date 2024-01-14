<script setup lang='ts'>
import { RouterLink, RouterView } from 'vue-router'
import { provide, ref } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { debounce } from 'lodash'
import { notification } from 'ant-design-vue'

let isScrollEnd = ref<boolean>(false)

const onScroll = debounce(async (event: any) => {
  const { scrollHeight, scrollTop, clientHeight } = event.target
  // 스크롤이 끝에 닿으면 데이터를 추가로 로드
  if (scrollHeight - 10 <= scrollTop + clientHeight) {
    isScrollEnd.value = !isScrollEnd.value
  }
}, 200)

provide('isScrollEnd', isScrollEnd)

const openInternalServerErrorNotification = () => {
  notification['error']({
    message: '서버 내부 오류',
    description:
      '서버에 문제가 발생했습니다.'
  })
}
provide('openInternalServerErrorNotification', openInternalServerErrorNotification)
</script>

<template>
  <div class='container' @scroll='onScroll'>
    <header>
      <HeaderComponent />
    </header>
    <main class='main'>
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
