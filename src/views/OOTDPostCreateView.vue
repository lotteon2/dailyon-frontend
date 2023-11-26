<link rel='stylesheet' href='../assets/ootd-post-create.css'>
<script setup lang='ts'>

import { ref, type Ref } from 'vue';

const fileInput: Ref<HTMLInputElement | null> = ref(null);
const openFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileChange = () => {

};
</script>

<template>
  <div class='frame'>
    <div class='div'>
      <p class='OOTD'>
        <span class='text-wrapper'>데일리온 </span>
        <span class='span'>OOTD</span>
        <span class='text-wrapper'> 작성 가이드</span>
      </p>
      <div class='text-wrapper-2'>작성 가이드 내용</div>
    </div>
    <div class='div-2'>
      <div class='text-wrapper-3'>필수 정보 입력</div>
      <div class='div-3'>
        <div class='div-4'>
          <div class='text-wrapper-4'>키</div>
          <input class='rectangle' type='number'>
        </div>
        <div class='div-5'>
          <div class='text-wrapper-4'>몸무게</div>
          <input class='rectangle' type='number'>
        </div>
        <div class='div-6'>
          <div class='text-wrapper-4'>상품정보</div>
          <div class='div-7'>
            <div v-for='n in 3' class='div-wrapper'>
              <div class='text-wrapper-5'>상품 - 옵션</div>
            </div>
          </div>
        </div>
        <div class='div-8'>
          <div class='text-wrapper-4'>태그</div>
          <div class='div-9'>
            <div class='div-10'>
              <div v-for='n in 3' class='div-wrapper-2'>
                <div class='text-wrapper-5'>태그 {{ n }}</div>
              </div>
            </div>
            <div class='div-11'>
              <input class='div-wrapper-3' placeholder='태그 입력'>
              <div class='div-wrapper-4'>
                <div class='text-wrapper-7'>추가</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='div-12'>
      <div class='div-wrapper-5'>
        <input class='text-wrapper-8' placeholder='제목을 입력해주세요.'>
      </div>
      <div class='div-13'>
        <p class='p'>
          <span class='text-wrapper-9'>드래그 앤 드롭이나 추가하기 버튼으로</span>
          <br />
          <span class='text-wrapper-9'>OOTD 사진을 업로드해주세요</span>
          <br /><br />
          <span class='text-wrapper-10'>*권장 사이즈<br />권장사이즈 내용</span>
        </p>
        <div class='div-wrapper-6'>
          <input type='file' style="display:none;" ref="fileInput" @change="handleFileChange">
          <div class='text-wrapper-11' @click="openFileInput">OOTD 추가하기</div>
        </div>
      </div>
      <div class='div-wrapper-7'>
        <textarea class='text-wrapper-12' placeholder='내용을 입력해주세요'></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/ootd-post-create.css";
</style>