
export type TAuthor = {
  name: string;
  username: string;
  avatar: string;
  status: string;
  isFollowing: boolean;
  badge: TVerifiedTier | "";
};

export type TPost = {
  id: string;
  author: TAuthor;
  html: string;
  images: string[];
  video?: string;
  pdf?: string[];
  audience: "public" | "connections" | "private";
  date: string;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isSaved: boolean;
};

export type TVerifiedTier = "basic" | "premium" | "admin" | "presiden";
