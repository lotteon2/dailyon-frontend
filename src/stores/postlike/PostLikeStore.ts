import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostLikeStore
  = defineStore('postLike', () => {
  const postLikes = ref<Set<number>>(new Set<number>())
  return { postLikes }
})