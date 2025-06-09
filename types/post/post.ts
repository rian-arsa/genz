export type PostType = "PUBLIC" | "ANONYMOUS" | "GROUP";
export type PostStatus = "APPROVED" | "PENDING" | "REJECTED";
export type MediaType = "IMAGE" | "VIDEO";

export interface Media {
  id: string;
  postId: string;
  type: MediaType;
  url: string;
  previewImageUrl?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  text: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  reportCount: number;
  postType: PostType;
  status: PostStatus;
  comunityId?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    avatarUrl?: string;
    username: string;
    verifiedStatus: string;
    role: string
  };
  medias: {
    id: string;
    url: string;
    type: string; // e.g., "image", "video"
  }[] | [];
  isFollowing: boolean;
  isLiked: boolean;
  isSaved: boolean;
  isOwner: boolean;
  isAnonymous: boolean;
}

export interface PostFeed {
  posts: Post[];
  nextCursor?: string;
  hasMore: boolean;
}