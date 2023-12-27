<script setup lang="ts">
import { Result, Button } from 'ant-design-vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const orderId = ref(route.params.orderId)
</script>
<template>
  <Result
    status="success"
    title="주문접수가 완료 되었습니다."
    :sub-title="`주문 번호 : ${orderId} 최종 주문완료까지는 1 ~ 5분정도 걸릴 수 있습니다.`"
  >
    <template #extra>
      <Button Button key="console" type="primary">주문내역 조회하기</Button>
    </template>
  </Result>
</template>

<style></style>
