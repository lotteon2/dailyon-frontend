export interface PostPageResponse<T extends PostResponse> {
  hasNext: boolean;
  posts: Array<T>;
}

export interface PostResponse {
  id: number;
  thumbnailImgUrl: string;
  likeCount: number;
  viewCount: number;
  isLike?: boolean;
}

export interface MyPostPageResponse<T extends MyPostResponse> {
  totalPages: number;
  totalElements: number;
  posts: Array<T>;
}

export interface MyPostResponse {
  id: number;
  thumbnailImgUrl: string;
  likeCount: number;
  viewCount: number;
  isLike: boolean;
}

export interface PostLikePageResponse<T extends PostLikeResponse> {
  totalPages: number;
  totalElements: number;
  posts: Array<T>;
}

export interface PostLikeResponse {
  id: number;
  thumbnailImgUrl: string;
  likeCount: number;
  viewCount: number;
  isLike: boolean;
}