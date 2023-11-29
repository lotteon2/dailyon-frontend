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

export interface OOTDPostPageResponse<T extends OOTDPostResponse> {
  totalPages: number;
  totalElements: number;
  posts: Array<T>;
}

export interface OOTDPostResponse {
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