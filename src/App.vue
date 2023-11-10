<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import GuguQuiz from '@/components/GuguQuiz.vue'
import { ref } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const quiz = ref<string>("hello")
const receivedEmit = (sendNumber: number) => {
  console.log(sendNumber)
}
</script>

<template>
  <div class='container'>
    <header>
      <HeaderComponent />
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <FooterComponent />
    </footer>
  </div>

</template>

<style>
@import "@/assets/main.css";
</style>
