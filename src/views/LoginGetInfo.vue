<script setup lang="ts">

import { authAxiosInstance } from '@/apis/utils';
import router from '@/router';
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';

const getMember = async () => {
  try {
    const response = await authAxiosInstance.get('/member-service/members');
    console.log(response.data);

  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
};




onMounted(() => {
  const route = useRoute()
  const accessToken = route.query.token as string
  localStorage.setItem("accessToken", accessToken)
  getMember();
  redirectToMainPage();
});

const redirectToMainPage = () => {
  router.push({ name: 'home' });
};
</script>