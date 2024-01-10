import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

export const usePostLikeStore
  = defineStore('postLike', () => {

    const postLikes: Ref<number[]> = ref<number[]>([])

    const togglePostLikes = async (postId: number) => {
      const findIndex = postLikes.value.indexOf(postId)
      if (findIndex === -1) {
        postLikes.value.push(postId)
      } else {
        postLikes.value.splice(findIndex, 1)
      }
    }

    const hasPostLike = (postId: number) => {
      return postLikes.value.includes(postId)
    }

    const clearPostLikes = async () => {
      postLikes.value = []
    }

    return { postLikes, clearPostLikes, hasPostLike, togglePostLikes }
  }, {
    persist: {
      key: 'postLikes',
      storage: localStorage,
      paths: ['postLikes']
    }
  }
)
