<script setup lang="ts">

import { authAxiosInstance } from '@/apis/utils';
import router from '@/router';

const getMember = async () => {
  try {
    const response = await authAxiosInstance.get('/member-service/members');
    console.log(response.data);
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
};



import { onMounted } from 'vue';
onMounted(() => {
  getMember();
  //redirectToMainPage();
});

const redirectToMainPage = () => {
  router.push({ name: 'home' });
};
</script>