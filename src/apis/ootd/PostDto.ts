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

export interface PostCreateRequest<T extends PostImageProductDetailCreateRequest> {
  title: string;
  description: string;
  stature?: number;
  weight?: number;
  hashTagNames: Array<string>;
  postThumbnailImgName: string;
  postImgName: string;
  postImageProductDetails: Array<T>
}

export interface TemporaryCreateTagProduct {
  id: number;
  imgUrl: string;
  name: string;
  brandName: string;
  sizeName: string;
  leftGapPercent: number;
  topGapPercent: number;
}

export interface TemporaryUpdateTagProduct {
  id: number;
  productId: number;
  imgUrl: string;
  name: string;
  brandName: string;
  sizeName: string;
  leftGapPercent: number;
  topGapPercent: number;
}

export interface PostImageProductDetailCreateRequest {
  productId: number;
  productSize: string;
  leftGapPercent: number;
  topGapPercent: number;
}

export interface PostCreateResponse {
  id: number;
  thumbnailImgPreSignedUrl: string;
  imgPreSignedUrl: string;
}

export interface ProductSearchPageResponse<T extends ProductSearchResponse> {
  hasNext: boolean;
  products: Array<T>;
}

export interface ProductSearchResponse {
  id: number;
  imgUrl: string;
  name: string;
  brandName: string;
  sizeNames: Array<string>;
}

export interface PostDetailResponse {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  stature?: number;
  weight?: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLike?: boolean;
  createdAt: Date;
  member: PostDetailMemberResponse;
  hashTags: Array<PostDetailHashTagResponse>;
  postImageProductDetails: Array<PostImageProductDetailResponse>;
}

export interface PostDetailMemberResponse {
  id: number;
  nickname: string;
  profileImgUrl: string;
  code: string;
  isFollowing?: boolean;
}

export interface PostDetailHashTagResponse {
  id: number;
  name: string;
}

export interface PostImageProductDetailResponse {
  id: number;
  productId: number;
  name: string;
  brandName: string;
  price: number;
  imgUrl: string;
  size: string;
  leftGapPercent: number;
  topGapPercent: number;
  hasAvailableCoupon?: boolean
}

export interface PostUpdateRequest {
  title: string;
  description: string;
  stature?: number;
  weight?: number;
  hashTags: Array<PostUpdateHashTagRequest>;
  postThumbnailImgName: string;
  postImgName: string;
  postImageProductDetails: Array<PostImageProductDetailUpdateRequest>
}

export interface PostUpdateResponse {
  id: number;
  thumbnailImgPreSignedUrl: string;
  imgPreSignedUrl: string;
}

export interface PostUpdateHashTagRequest {
  id: number;
  name: string;
}

export interface PostImageProductDetailUpdateRequest {
  id: number;
  productId: number;
  productSize: string;
  leftGapPercent: number;
  topGapPercent: number;
}