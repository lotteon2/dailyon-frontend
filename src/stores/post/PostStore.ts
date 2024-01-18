import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  PostImageProductDetailUpdateRequest,
  PostUpdateHashTagRequest,
  PostUpdateRequest,
  TemporaryUpdateTagProduct
} from '@/apis/ootd/PostDto'

export const usePostStore = defineStore('post', () => {
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

  const temporaryUpdateTagProducts = ref<Array<TemporaryUpdateTagProduct>>(
    new Array<TemporaryUpdateTagProduct>()
  )

  const postViews = ref({
    value: [] as number[],
    expiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
  })

  const setPostUpdateRequest = async (post: PostUpdateRequest) => {
    postUpdateRequest.value = post
    sessionStorage.setItem('postUpdateRequest', JSON.stringify(post))
  }

  const setTemporaryTagProducts = async (tagProducts: Array<TemporaryUpdateTagProduct>) => {
    temporaryUpdateTagProducts.value = tagProducts
    sessionStorage.setItem('temporaryTagProducts', JSON.stringify(tagProducts))
  }

  const addPostView = async (postId: number) => {
    postViews.value.value.push(postId)
  }

  const hasPostView = async (postId: number) => {
    return postViews.value.value.includes(postId)
  }

  const renewPostView = async () => {
    const expiryDate: Date = postViews.value.expiry
    if (expiryDate < new Date()) {
      const newPostViews = {
        value: [] as number[],
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
      postViews.value.value = []
      postViews.value.expiry = new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
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
    postViews,
    setPostUpdateRequest,
    getPostUpdateRequest,
    setTemporaryTagProducts,
    hasPostView,
    addPostView,
    renewPostView,
    getTemporaryTagProducts,
    clearPostUpdateRequest,
    clearTemporaryTagProducts
  }
}, {
  persist: {
    key: 'postViews',
    storage: localStorage,
    paths: ['postViews']
  }
})
