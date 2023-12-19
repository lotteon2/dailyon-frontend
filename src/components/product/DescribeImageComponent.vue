<script setup lang="ts">
import { ref } from 'vue'
const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const props = defineProps({
  describeImgUrls: {
    type: [],
    required: false
  },
  isDescribeImages: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <img
    v-if="props.describeImgUrls.length > 0"
    v-for="url in props.describeImgUrls"
    :src="`${VITE_STATIC_IMG_URL}${url}`"
    alt="describeImg"
  />
</template>

<style scoped></style>
