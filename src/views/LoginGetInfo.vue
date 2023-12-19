<script setup lang="ts">
import { authAxiosInstance } from '@/apis/utils';
import router from '@/router';
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';
import { useMemberStore } from '@/stores/member/MemberStore';

const getMember = async () => {
  try {
    const response = await authAxiosInstance.get('/member-service/members');
    return response.data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
};

onMounted(async () => {
  const route = useRoute()
  const accessToken = route.query.token as string
  localStorage.setItem("accessToken", accessToken)

  const memberStore = useMemberStore() as any;
  const memberInfo = await getMember()
 
  memberStore.setMemberInfo(memberInfo);
  redirectToMainPage();
});

const redirectToMainPage = () => {
  router.push({ name: 'home' });
};
</script>
