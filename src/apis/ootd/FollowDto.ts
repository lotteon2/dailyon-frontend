export interface FollowerPageResponse<T extends FollowerResponse> {
  totalPages: number;
  totalElements: number;
  followers: Array<T>;
}

export interface FollowerResponse {
  id: number;
  nickname: string;
  profileImgUrl: string;
  isFollowing: boolean;
}

export interface FollowingPageResponse<T extends FollowingResponse> {
  totalPages: number;
  totalElements: number;
  followings: Array<T>;
}

export interface FollowingResponse {
  id: number;
  nickname: string;
  profileImgUrl: string;
  isFollowing: boolean;
}