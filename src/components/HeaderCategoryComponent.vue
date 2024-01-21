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
  router.push({ name: 'productList', query: { category: id } })
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
      <a :href="`/product-list?category=${category.id}`">
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
  padding: 12px 20px;
  z-index: 1;

  position: absolute;
  top: 100%;
  left: 0;

  width: 12vw;
  height: 64vh;
}

.category-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 10px 5px 10px 5px;
  width: 100%;

  cursor: pointer;

  font-size: 1vw;
  font-family: 'TheJamsil';
  font-weight: 400;
}

.category-content > a {
  color: inherit;
  text-decoration: none;
}

.category-content:hover {
  color: #c22727;
}

.child-category {
  top: 0;
  position: absolute;

  font-family: 'TheJamsil';
  font-weight: 400;
  font-size: 1vw;
}
</style>
