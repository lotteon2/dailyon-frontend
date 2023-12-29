<script setup lang="ts">
import { ref } from 'vue'
const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const props = defineProps({
  describeImgUrls: {
    type: Array<String>,
    required: false
  }
})
</script>

<template>
  <div class="describe-image-container">
    <img
      v-if="props.describeImgUrls && props.describeImgUrls.length > 0"
      v-for="url in props.describeImgUrls"
      :src="`${VITE_STATIC_IMG_URL}${url}`"
      alt="describeImg"
    />
  </div>
</template>

<style scoped>
.describe-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}
</style>
