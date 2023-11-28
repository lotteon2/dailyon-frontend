export interface PostPageResponse<T extends PostResponse> {
  hasNext: boolean,
  posts: Array<T>
}

export interface PostResponse {
  id: number;
  thumbnailImgUrl: string;
  likeCount: number;
  viewCount: number;
  isLike?: boolean;
}