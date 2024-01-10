import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

export const useFollowStore
  = defineStore('follow', () => {
  const follows: Ref<number[]> = ref<number[]>([])

  const toggleFollows = async (followingId: number) => {
    const findIndex = follows.value.indexOf(followingId)
    if (findIndex === -1) {
      follows.value.push(followingId)
    } else {
      follows.value.splice(findIndex, 1)
    }
  }

  const hasFollowingId = (followingId: number) => {
    return follows.value.includes(followingId)
  }

  const clearFollows = async () => {
    follows.value = []
  }

  return { follows, clearFollows, hasFollowingId, toggleFollows }
}, {
  persist: {
    key: 'follows',
    storage: localStorage,
    paths: ['follows']
  }
})