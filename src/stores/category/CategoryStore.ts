import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CategoryTree, ReadChildrenCategoryResponse } from '@/apis/category/CategoryDto'
import { getChildCategories } from '@/apis/category/CategoryClient'

export const useCategoryStore = defineStore(
  'category',
  () => {
    const categoryTrees = ref<CategoryTree[]>([])

    const findCategoryTree = (id: number | null): CategoryTree | undefined => {
      return categoryTrees.value.find(
        (category: CategoryTree) => category.id === (id === null ? 0 : id)
      )
    }

    const setCategoryTree = async (id: number | null) => {
      if (findCategoryTree(id) === undefined) {
        const response: ReadChildrenCategoryResponse = await getChildCategories(id)
        categoryTrees.value.push({
          id: id === null ? 0 : id,
          categories: response.categoryResponses
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
