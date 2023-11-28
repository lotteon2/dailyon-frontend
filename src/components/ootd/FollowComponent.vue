<script setup lang='ts'>

</script>

<template>
  <div class="follow-container">
    <div class="container-title">팔로잉/팔로워 관리</div>
    <div class="container-line"></div>
    <div class="follow-text-container">
      <div class="follow-text">팔로잉</div>
      <div class="follow-text-ontap margin-both">|</div>
      <div class="follow-text-ontap">팔로워</div>
    </div>
    <div class="follow-row">
      <svg
        class="follow-img"
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <circle cx="40" cy="40" r="40" fill="#D9D9D9" />
      </svg>
      <div class="nickname">닉네임</div>
      <div class="following">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="9"
          viewBox="0 0 13 9"
          fill="none"
        >
          <path
            d="M4.22659 9L0 4.77341L0.6072 4.16706L4.22659 7.78645L12.013 0L12.6194 0.60635L4.22659 9Z"
            fill="#C6C6C6"
          />
        </svg>
        팔로잉
      </div>
    </div>
    <div class="follow-row">
      <svg
        class="follow-img"
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <circle cx="40" cy="40" r="40" fill="#D9D9D9" />
      </svg>
      <div class="nickname">닉네임</div>
      <div class="non-following">+팔로우</div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/follow.css";
</style>