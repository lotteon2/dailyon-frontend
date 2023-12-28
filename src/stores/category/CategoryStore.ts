import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  Category,
  CategoryTree,
  ReadChildrenCategoryResponse
} from '@/apis/category/CategoryDto'
import { getChildCategories } from '@/apis/category/CategoryClient'
import type { AxiosResponse } from 'axios'

export const useCategoryStore = defineStore(
  'category',
  () => {
    const categoryTrees = ref<CategoryTree[]>([])

    const findCategoryTree = (id: number | null): CategoryTree | undefined => {
      return categoryTrees.value.find(
        (category: CategoryTree) => category.id === (id === null ? 0 : id)
      )
    }

    const setCategoryTree = (id: number | null) => {
      if (findCategoryTree(id) === undefined) {
        getChildCategories(id)
          .then((axiosResponse: AxiosResponse) => {
            const response: ReadChildrenCategoryResponse = axiosResponse.data
            categoryTrees.value.push({
              id: id === null ? 0 : id,
              categories: response.categoryResponses
            })
          })
          .catch((error: any) => {
            alert(error.response!.data!.message)
          })
      }
    }

    return { categoryTrees, setCategoryTree, findCategoryTree }
  },
  {
    persist: {
      key: 'categories',
      storage: sessionStorage,
      paths: ['categoryTrees']
    }
  }
)
