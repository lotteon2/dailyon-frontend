<script setup lang="ts">
import { ref } from 'vue'
import { Image } from 'ant-design-vue'
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
    <Image
      v-if="props.describeImgUrls && props.describeImgUrls.length > 0"
      v-for="url in props.describeImgUrls"
      :src="`${VITE_STATIC_IMG_URL}${url}?q=95`"
      :preview='false'
      alt="describeImg"
    >
      <template #placeholder>
        <Image
          v-if="props.describeImgUrls && props.describeImgUrls.length > 0"
          v-for="url in props.describeImgUrls"
          :src="`${VITE_STATIC_IMG_URL}${url}?q=0`"
          :preview='false'
          alt="describeImg"
        />
      </template>
    </Image>
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
