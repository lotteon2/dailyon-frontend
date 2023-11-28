<script setup lang='ts'>

</script>

<template>
  <div class="user-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
    >
      <circle cx="75" cy="75" r="75" fill="#D9D9D9" />
    </svg>
    <div class="user-name-container">
      <div class="user-name-container-first-line">
        <h1>
          닉네임&nbsp;
          <h2>님, 반갑습니다!</h2>
        </h1>
      </div>
      <h3>이메일 주소</h3>
    </div>
    <div class="user-container-point-container">
      포인트
      <h1>0</h1>
      점
    </div>
    <div class="modify-button">정보 수정</div>
    <div class="logout-button">로그아웃</div>
  </div>
</template>

<style scoped>
@import "@/assets/css/mypage-header.css";
</style>