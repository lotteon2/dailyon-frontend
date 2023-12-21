export interface CommentPageResponse<T extends CommentResponse> {
  totalPages: number;
  totalElements: number;
  comments: Array<T>;
}

export interface CommentResponse {
  id: number;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  member: MemberResponse;
  replyComments?: Array<CommentResponse>
}

export interface MemberResponse {
  id: number;
  nickname: string;
  profileImgUrl: string;
}

export interface CreateCommentRequest {
  description: string;
}

export interface CreateReplyCommentRequest {
  description: string;
}