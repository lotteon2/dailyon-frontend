
import { type AxiosResponse } from "axios";
import { authAxiosInstance } from "@/apis/utils";
import { useMemberStore } from '@/stores/member/MemberStore';
import { uploadImageToS3 } from '@/apis/ootd/FileService'
import axios from 'axios'

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


  export const setMember = async (memberStore : any) => {
    try {
      const response = await authAxiosInstance.put(`${MEMBER_SERVICE_PREFIX}/members`, memberStore);
      
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };




  export const getMemberAddress = async (page : Number) => {
    try {
      const response = await authAxiosInstance.get(`${MEMBER_SERVICE_PREFIX}/addresses`, {
        params: {
          page: page,
          size: 5,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  export const getDefaultAddress = async () => {
    try {
      const response = await authAxiosInstance.get(`${MEMBER_SERVICE_PREFIX}/addresses/default`);
      return response.data;
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

    export const setDefaultAddress = async (addressId: number) => {
      try {
        const response = await authAxiosInstance.post(`${MEMBER_SERVICE_PREFIX}/addresses/default`, addressId);
        return response.data;
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
  };

  export const getMemberPoints = async (page : Number) => {
    try {
      const response = await authAxiosInstance.get(`${MEMBER_SERVICE_PREFIX}/points`, {
        params: {
          page: page,
          size: 6,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  export const deleteAddress = async (addressId: number) => {
    try {
      const response = await authAxiosInstance.delete(`${MEMBER_SERVICE_PREFIX}/addresses/${addressId}`);
      const accessToken = localStorage.getItem('accessToken')
      return response.data;
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
};


export const getImgUrl = async () => {
  try {
    const response = await authAxiosInstance.get(`${MEMBER_SERVICE_PREFIX}/members/profileimg`);
    return response.data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
};