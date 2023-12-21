import { defineStore } from 'pinia';

interface MemberInfo {
  memberId: Number | null;
  birth: string | null;
  email: string | null;
  gender: string | null;
  nickname: string | null;
  point: number | null;
  profileImgUrl: string | null;
}

export const useMemberStore = defineStore({
  id: 'member',
  state: (): MemberInfo => ({
    memberId: null,
    birth: null,
    email: null,
    gender: null,
    nickname: null,
    point: null,
    profileImgUrl: null,
  }),
  actions: {
    setMemberInfo(info: MemberInfo) {
      this.memberId = info.memberId;
      this.birth = info.birth;
      this.email = info.email;
      this.gender = info.gender;
      this.nickname = info.nickname;  
      this.point = info.point;
      this.profileImgUrl = info.profileImgUrl;
    },
    getMemberInfo(): MemberInfo {
      return {
        memberId: this.memberId,
        birth: this.birth,
        email: this.email,
        gender: this.gender,
        nickname: this.nickname,
        point: this.point,
        profileImgUrl: this.profileImgUrl,
      };
    },
  },
  persist: true,
});
