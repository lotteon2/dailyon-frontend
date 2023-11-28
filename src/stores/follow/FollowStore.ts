import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFollowStore
  = defineStore('follow', () => {
  const follows = ref<Set<number>>(new Set<number>())
  return { follows }
})