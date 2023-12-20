import { type AxiosResponse } from "axios";
import { authAxiosInstance } from "@/apis/utils";
import { useMemberStore } from '@/stores/member/MemberStore';


const MEMBER_SERVICE_PREFIX: string = "/member-service"
const memberStore = useMemberStore();


export const getMember = async () => {
    try {
      const response = await authAxiosInstance.get(`${MEMBER_SERVICE_PREFIX}/members`);
      memberStore.setMemberInfo(response.data);
      return response.data;
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };



  


  export const getMemberAddressT = async (page : Number) => {
    try {
      const response = await authAxiosInstance.get('/member-service/addresses/test', {
        params: {
          page: page,
          size: 5,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };