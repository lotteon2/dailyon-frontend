<script setup lang="ts">
import { getMemberPoints } from '@/apis/member/member'
import { ref, onMounted, watch, onBeforeMount } from 'vue'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import type { Point } from '@/apis/member/MemberDto'
import WhitePageComponent from '@/components/wishcart/WhitePageComponent.vue'

const points = ref<Point[]>([])
const requestPage = ref<number>(0)
const totalPages = ref<number>()
const totalElements = ref<number>()

const onChangePage = async (page: number) => {
  if (page >= 0 && page < totalPages.value!) {
    requestPage.value = page
  }
}

onBeforeMount(async () => {
  const response = await getMemberPoints(0)
  updatePoints(response)
})

watch(requestPage, async (afterPage, beforePage) => {
  if (afterPage < totalPages.value!) {
    const response = await getMemberPoints(afterPage)
    updatePoints(response)
  }
})

const updatePoints = (response: any) => {
  points.value = response.content
  totalPages.value = response.totalPages
  totalElements.value = response.totalElements
}
</script>

<template>
  <div class="point-container">
    <div class="container-title">포인트 사용 내역</div>
    <div class="container-line"></div>

    <template v-if="points.length > 0">
      <table>
        <col width="400px" />
        <col width="150px" />
        <col width="150px" />
        <col width="150px" />
        <col width="100px" />
        <tr class="point-table-data1">
          <td class="left-margin">일시</td>
          <td>출처</td>
          <td>사용처</td>
          <td>금액</td>
          <td>상태</td>
        </tr>
        <tr v-for="(point, index) in points" :key="index" class="point-table-data2">
          <td>{{ point.createdAt }}</td>
          <td>{{ point.source }}</td>
          <td>{{ point.utilize }}</td>
          <td>{{ point.amount.toLocaleString() }} 원</td>
          <td>{{ point.status ? '사용' : '적립' }}</td>
        </tr>
      </table>

      <div class="pagination">
        <PaginationComponent
          :onChangePage="onChangePage"
          :requestPage="requestPage"
          :totalPages="totalPages"
        />
      </div>
    </template>
    <template v-else>
      <WhitePageComponent message="포인트 내역이 없습니다"/>
    </template>
  </div>
</template>

<style scoped>
@import '@/assets/css/point-history.css';
</style>
