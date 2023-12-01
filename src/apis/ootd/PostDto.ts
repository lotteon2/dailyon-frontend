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
  stature: number;
  weight: number;
  hashTagNames: Array<string>;
  postThumbnailImgName: string;
  postImgName: string;
  postImageProductDetails: Array<T>
}

export interface PostImageProductDetailCreateRequest {
  productId: number;
  productSize: string;
  leftGapPercent: number;
  topGapPercent: number;
}

export interface PostCreateResponse {
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