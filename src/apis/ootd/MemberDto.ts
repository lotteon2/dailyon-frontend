export interface OOTDMemberProfileResponseWrapper<T extends OOTDMemberProfileResponse> {
  member: T;
}

export interface OOTDMemberProfileResponse {
  id: number;
  nickname: string;
  profileImgUrl: string;
  followingCount: number;
  followerCount: number;
  isFollowing: boolean;
}