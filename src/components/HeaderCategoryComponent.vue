<script setup lang="ts">
import { getChildCategories } from "@/apis/product/category/CategoryClient";
import type { Category } from "@/apis/product/category/CategoryDto";
import type { AxiosResponse } from "axios";
import { ref } from "vue";

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

const childCategories = ref<Category[]>([])
const showChildDropdown = ref<boolean>(false)

const setChildCategories = (id: number) => {
  getChildCategories(id)
      .then((axiosResponse: AxiosResponse) => {
        childCategories.value = axiosResponse.data.categoryResponses
      })
      .catch((error: any) => {
        alert(error.response!.data!.message)
      })
}

const mouseOver = (id: number) => {
  showChildDropdown.value = true
  setChildCategories(id)
}
</script>

<template>
  <div v-if="categories.length > 0" class="category-dropdown-content">
    <div class="category-content"
         v-for="category in props.categories"
         :key="category.id"
         @mouseover="mouseOver(category.id)"
         @mouseleave="showChildDropdown = false"
    >
      {{ category.name }}
    </div>
    <HeaderCategoryComponent
        class="child-category"
        :style="{ left: 100+'%' }"
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

  width: 200px;
  height: 600px;
}

.category-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;

  font-family: TheJamsil;
}

.child-category {
  top: 0;
  position: absolute;

  font-family: TheJamsil;
}
</style>