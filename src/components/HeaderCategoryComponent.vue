<script setup lang="ts">
import { getChildCategories } from "@/apis/product/category/CategoryClient";
import type { Category } from "@/apis/product/category/CategoryDto";
import type { AxiosResponse } from "axios";
import { ref, watch } from "vue";

const props = defineProps({
  showDropdown: {
    type: Boolean,
    required: true
  },
  categories: {
    type: Array<Category>,
    required: true,
    default: false
  }
})

const childCategories = ref<Category[]>([])
const showChildDropdown = ref<boolean>(false)

const setChildCategories = (id: number) => {
  getChildCategories(id)
      .then((axiosResponse: AxiosResponse) => {
        console.log(`from dropdown ${id}`, axiosResponse.data.categoryResponses)
        childCategories.value = axiosResponse.data.categoryResponses
      })
      .catch((error: any) => {
        alert(error.response!.data!.message)
      })
}

watch(() => props.showDropdown, (newVal, oldVal) => {
  if(newVal) {
    childCategories.value = props.categories
    console.log("child category set", childCategories.value)
  }
})

const mouseOver = (id: number) => {
  console.log(`div event on ${id}`)
  setChildCategories(id)
  showChildDropdown.value = true
}
</script>

<template>
  <div class="category-dropdown-content">
    <div
         v-if="categories.length > 0"
         v-for="category in childCategories"
         :key="category.id"
         @mouseover="mouseOver(category.id)"
         @mouseleave="showChildDropdown = false"
    >
      {{ category.name }}
      <HeaderCategoryComponent
          :show-dropdown="showChildDropdown"
          :categories="childCategories"
      />
    </div>
  </div>
</template>

<style scoped>
.category-dropdown-content {
  display: flex;
  flex-direction: column;

  position: relative;

  background-color: #f9f9f9;
  color: black;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;

  width: 200px;
  height: 200px;
}

/*.category-dropdown-content > div {
  position: absolute;
  left: 100%;
  top: 0;

  width: 200px;
  height: 200px;
}*/
</style>