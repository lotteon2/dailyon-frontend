<script setup lang="ts">
import { getTOP4OOTD } from '@/apis/ootd/PostService'
import { onMounted, ref } from 'vue'
import type { TOP4OOTDResponse } from '@/apis/ootd/PostDto'

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const props = defineProps({
  productId: {
    type: Number,
    required: true
  }
})

const top4 = ref<TOP4OOTDResponse[]>([])

onMounted(async () => {
  top4.value = await getTOP4OOTD(props.productId)
})
</script>

<template>
  <div class="top4-ootd-wrapper">
    <div class="top4-ootd-title-wrapper">
      <div class="top4-ootd-title-text">TOP 4 OOTD</div>
    </div>
    <div class="top4-ootd-list-wrapper">
      <RouterLink
        class="top4-ootd-post-card-image-wrapper"
        v-for="(ootd, index) in top4"
        :to="`/ootds/${ootd.id}`"
        :key="index"
      >
        <img
          alt="top4-ootd-img"
          class="top4-ootd-post-card-image"
          :src="`${VITE_STATIC_IMG_URL}${ootd.thumbnailImgUrl}`"
        />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.top4-ootd-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /*gap: 1.1875rem;*/
  /*padding-top: 6rem;*/
  padding-bottom: 4rem;
}

.top4-ootd-title-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding-bottom: 2rem;
}

.top4-ootd-title-text {
  color: var(--Grayscale7, #000);
  font-family: TheJamsil;
  font-size: 1.85rem;
  font-style: normal;
  font-weight: 400;
  align-items: start;
  line-height: 1.875rem; /* 150% */
}

.top4-ootd-list-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 1.3125rem;
}

.top4-ootd-post-card-image-wrapper {
  display: flex;
  width: 12.5rem;
  height: 19.25rem;
  justify-content: center;
  align-items: center;
}

.top4-ootd-post-card-image-wrapper:hover {
  cursor: pointer;
}

.top4-ootd-post-card-image {
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 0.625rem;
}
</style>
