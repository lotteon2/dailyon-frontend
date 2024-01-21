<script setup lang="ts">
import AuctionPageComponent from '@/components/auction/AuctionPageComponent.vue'
</script>

<template>
  <div class="auction-page-container">
    <div class="left-align">진행 중인 경매</div>
    <AuctionPageComponent :path="'current'" />
    <div class="left-align">진행 예정 경매</div>
    <AuctionPageComponent :path="'future'" />
    <div class="left-align">진행 완료 경매</div>
    <AuctionPageComponent :path="'past'" />
  </div>
</template>

<style scoped>
.auction-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72vw;
}

.left-align {
  display: flex;
  width: 54vw;
  justify-items: left;
  font-family: 'TheJamsil';
  font-weight: 400;
  font-size: 1.5vw;
  padding-top: 4vh;
}
</style>
