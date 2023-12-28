<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/category/CategoryStore'
import type { Category } from '@/apis/category/CategoryDto'

const props = defineProps({
  showDropdown: {
    type: Boolean,
    required: true
  },
  categories: {
    type: Array<Category>,
    required: true,
    default: []
  }
})

const showChildDropdown = ref<boolean>(false)
const categoryStore = useCategoryStore()
const childCategories = ref<Category[]>([])
const router = useRouter()

const mouseOver = (id: number) => {
  showChildDropdown.value = true
  categoryStore.setCategoryTree(id)
  childCategories.value = categoryStore.findCategoryTree(id)!.categories
}

const toProductList = (id: number) => {
  router.push({ name: 'productList', query: { category: id, type: 'NORMAL' } })
}
</script>

<template>
  <div v-if="props.categories.length > 0" class="category-dropdown-content">
    <div
      class="category-content"
      v-for="category in props.categories"
      :key="category.id"
      @mouseover="mouseOver(category.id)"
      @mouseleave="showChildDropdown = false"
      @click="toProductList(category.id)"
    >
      <a :href="`/product-list?category=${category.id}&type=NORMAL`">
        {{ category.name }}
      </a>
    </div>
    <HeaderCategoryComponent
      class="child-category"
      :style="{ left: 100 + '%' }"
      :show-dropdown="showChildDropdown"
      :categories="childCategories"
    />
  </div>
</template>

<style scoped>
.category-dropdown-content {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f9f9f9;
  color: black;
  border-bottom: #808080 solid 1px;
  border-right: #808080 solid 1px;
  border-left: #808080 solid 1px;
  padding: 12px 16px;
  z-index: 1;

  position: absolute;
  top: 100%;
  left: 0;

  width: 200px;
  height: 600px;
}

.category-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;

  cursor: pointer;

  font-family: TheJamsil;
}

.category-content > a {
  color: inherit;
  text-decoration: none;
}

.child-category {
  top: 0;
  position: absolute;

  font-family: TheJamsil;
}
</style>
