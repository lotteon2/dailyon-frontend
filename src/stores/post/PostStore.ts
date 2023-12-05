import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PostUpdateRequest, TemporaryCreateTagProduct, TemporaryUpdateTagProduct } from '@/apis/ootd/PostDto'
import type { PostImageProductDetailUpdateRequest, PostUpdateHashTagRequest } from '@/apis/ootd/PostDto'

export const usePostStore
  = defineStore('post', () => {

  const postUpdateRequest = ref<PostUpdateRequest>({
    title: '',
    description: '',
    stature: undefined,
    weight: undefined,
    hashTags: [] as PostUpdateHashTagRequest[],
    postThumbnailImgName: '',
    postImgName: '',
    postImageProductDetails: [] as PostImageProductDetailUpdateRequest[]
  })

  const temporaryUpdateTagProducts = ref<Array<TemporaryUpdateTagProduct>>(new Array<TemporaryUpdateTagProduct>())

  const setPostUpdateRequest = async (post: PostUpdateRequest) => {
    postUpdateRequest.value = post
    sessionStorage.setItem('postUpdateRequest', JSON.stringify(post))
  }

  const setTemporaryTagProducts = async (tagProducts: Array<TemporaryUpdateTagProduct>) => {
    temporaryUpdateTagProducts.value = tagProducts
    sessionStorage.setItem('temporaryTagProducts', JSON.stringify(tagProducts))
  }

  const getPostUpdateRequest = async () => {
    const storedPostUpdateRequest = sessionStorage.getItem('postUpdateRequest')
    if (storedPostUpdateRequest) {
      postUpdateRequest.value = JSON.parse(storedPostUpdateRequest)
    }

    return postUpdateRequest
  }

  const getTemporaryTagProducts = async () => {
    const storedTemporaryTagProducts = sessionStorage.getItem('temporaryTagProducts')
    if (storedTemporaryTagProducts) {
      temporaryUpdateTagProducts.value = JSON.parse(storedTemporaryTagProducts)
    }

    return temporaryUpdateTagProducts
  }

  const clearPostUpdateRequest = async () => {
    sessionStorage.removeItem('postUpdateRequest')
  }

  const clearTemporaryTagProducts = async () => {
    sessionStorage.removeItem('temporaryTagProducts')
  }

  return {
    setPostUpdateRequest, getPostUpdateRequest, setTemporaryTagProducts,
    getTemporaryTagProducts, clearPostUpdateRequest, clearTemporaryTagProducts
  }
})