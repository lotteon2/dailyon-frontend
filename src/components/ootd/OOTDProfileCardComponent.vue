<script setup lang="ts">
import { onBeforeMount, ref, defineEmits } from 'vue'
import { getOOTDMemberProfile } from '@/apis/ootd/MemberService'
import type {
  OOTDMemberProfileResponse,
  OOTDMemberProfileResponseWrapper
} from '@/apis/ootd/MemberDto'
import { useFollowStore } from '@/stores/follow/FollowStore'
import { toggleFollow } from '@/apis/ootd/FollowService'
import { onBeforeRouteLeave } from 'vue-router'
import { useMemberStore } from '@/stores/member/MemberStore'
import type { GiftInfo } from '@/apis/order/orderDto'

const emit = defineEmits(['fetchData'])
const memberStore = useMemberStore()
const memberId = memberStore.getMemberInfo().memberId

const followStore = useFollowStore()
const follows = followStore.follows

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const props = defineProps({
  postMemberId: {
    type: Number,
    require: true
  }
})

const member = ref<OOTDMemberProfileResponse>({
  id: 0,
  nickname: '닉네임',
  profileImgUrl: '/member-img/default-profile-img.png',
  followingCount: 0,
  followerCount: 0,
  isFollowing: false
})

const fetchDefaultData = async (): Promise<
  OOTDMemberProfileResponseWrapper<OOTDMemberProfileResponse>
> => {
  const memberResponse = await getOOTDMemberProfile(props.postMemberId!)
  member.value = memberResponse.member
  const giftInfo: GiftInfo = {
    receiverId: member.value.id,
    receiverName: member.value.nickname,
    senderName: useMemberStore.name
  }
  emit('fetchData', giftInfo)
  return memberResponse
}

onBeforeMount(async () => {
  await fetchDefaultData()
})

const followButtonClickListener = (followingId: number, isFollowing: boolean | undefined) => {
  member.value!.isFollowing
    ? (member.value!.followerCount -= 1)
    : (member.value!.followerCount += 1)
  member.value!.isFollowing = !isFollowing
  follows.has(followingId) ? follows.delete(followingId) : follows.add(followingId)
}

const flushFollowStore = async () => {
  const followingIds: number[] = []
  follows.forEach((followingId: number) => {
    followingIds.push(followingId)
  })

  if (followingIds.length !== 0) {
    await toggleFollow(followingIds)
    follows.clear()
  }
}

// 페이지 이동 시 이벤트
onBeforeRouteLeave(async (to, from) => {
  await flushFollowStore()
})

// 새로고침 or 브라우저 창 닫을 때 이벤트
window.addEventListener('beforeunload', async (event) => {
  flushFollowStore()
    .then((res) => {
      window.location.reload()
    })
    .catch((error) => {
      console.error(error)
      event.preventDefault()
      event.returnValue = ''
    })
})

const img = ref<HTMLImageElement | null>(null)
const imageSize = ref({
  width: 0,
  height: 0
})

const getImageSize = async () => {
  console.log(img.value)
  if (img.value) {
    await handleImageLoad()
  } else {
    img.value!.onload = handleImageLoad
  }
}

const handleImageLoad = async () => {
  if (img.value) {
    imageSize.value = {
      width: img.value.width,
      height: img.value.height
    }
  }
}
</script>

<template>
  <div class="profile-card">
    <img
      v-if="imageSize.width === 0 || imageSize.height === 0"
      class="profile-img"
      ref="img"
      @load="getImageSize"
      src="@/assets/images/loading.gif"
    />
    <img
      v-else
      class="profile-img"
      ref="img"
      @load="getImageSize"
      :src="`${VITE_STATIC_IMG_URL}${member.profileImgUrl}?w=${imageSize.width}&h=${imageSize.height}`"
    />
    <div class="nickname">{{ member.nickname }}</div>
    <div class="follow-wrapper">
      팔로워 <span class="follow-count">{{ member.followerCount }}</span> | 팔로우
      <span class="follow-count">{{ member.followingCount }}</span>
    </div>
    <div v-if="member.id === memberId"></div>
    <div
      v-else-if="member.isFollowing"
      class="follow-inactive-btn"
      @click="followButtonClickListener(member.id, member.isFollowing)"
    >
      <svg
        class="follow-inactive-check-icon"
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
      <div class="follow-inactive-btn-text">팔로우</div>
    </div>
    <div
      v-else
      class="follow-active-btn"
      @click="followButtonClickListener(member.id, member.isFollowing)"
    >
      <div class="follow-active-btn-text">+팔로우</div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/ootd/ootd-profile-card.css';
</style>
