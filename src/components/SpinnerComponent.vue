<script setup lang="ts"></script>

<template>
  <div class="spinner" />
</template>

<style scoped>
.spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #c22727;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  background-color: rgba(0, 0, 0, 0.1);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
