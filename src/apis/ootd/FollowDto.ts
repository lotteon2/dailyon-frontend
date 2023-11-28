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