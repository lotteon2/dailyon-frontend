<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="white-page">
    <h1>{{ props.message }}</h1>
  </div>
</template>

<style scoped>
.white-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;

  padding-top: 50px;
}

.white-page > h1 {
  font-family: TheJamsil;
  font-size: 1.5vw;
  font-style: normal;
  font-weight: 400;
  color: #808080;
}
</style>
