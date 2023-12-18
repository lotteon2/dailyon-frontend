<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { Category } from '@/apis/category/CategoryDto'
import { getBreadCrumbs } from '@/apis/category/CategoryClient'
import type { AxiosResponse } from 'axios'

const route = useRoute()
const breadCrumbs = ref<Category[]>([])
const initData = () => {
  if (route.query.category !== null) {
    getBreadCrumbs(Number(route.query.category))
      .then((axiosResponse: AxiosResponse) => {
        breadCrumbs.value = axiosResponse.data.breadCrumbs
      })
      .catch((error: any) => {
        alert(error.response!.data!.message)
      })
  }
}

onMounted(initData)
</script>

<template>
  <div class="breadcrumb-container">
    <a href="/" style="font-family: TheJamsil">홈</a>
    <div class="breadcrumbs" v-for="category in breadCrumbs">
      <p style="padding-right: 5px; padding-left: 5px">></p>
      <a :href="`/product-list?category=${category.id}&type=NORMAL`">
        {{ category.name }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-items: center;

  padding-left: 10px;
  padding-bottom: 20px;

  width: 100%;
}

.breadcrumbs {
  display: flex;
  align-items: flex-start;
  justify-items: center;

  font-family: TheJamsil;
}

.breadcrumbs > a {
  color: inherit;
  text-decoration: none;
}
</style>
