<template>
  <div>
    <h1>구구단을 외자</h1>
    <span>{{ quiz }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const myProps = defineProps(['quiz'])
// 부모 컴포넌트로 발생할 이벤트를 정의
const myEmits = defineEmits(['solved'])
// 부모 컴포넌트로 이벤트 발행
myEmits('solved', 123)

const num1 = Math.random() * 9 + 1
const num2 = Math.random() * 9 + 1
const result = ref('0')
const solve = () => {
  alert(result.value)
}
</script>

<style scoped>
h1 {
  text-decoration: underline;
}
</style>
