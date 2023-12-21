<script setup lang='ts'>

defineProps({
  sortOptions: {
    type: Array as () => Array<{ value: string, label: string }>,
    required: true
  },
  requestSort: {
    type: String,
    required: true
  },
  onChangeSort: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class='ootd-header-sort-wrapper'>
    <div v-for='sortOption in sortOptions' :key='sortOption.value' class='ootd-sort-wrapper'>
      <div class='ootd-sort-text' @click='onChangeSort(sortOption.value)'
           :class="{ 'selected': requestSort === sortOption.value }">
        {{ sortOption.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/ootd/sort.css";
</style>