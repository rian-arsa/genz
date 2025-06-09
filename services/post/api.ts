import { Post, PostFeed } from "@/types/post/post";
import axiosInstance from "@/lib/axios/axiosInstance";

import { TResponse } from "@/types/apiType";
import { LikeByPost } from "./type";

export interface PostPayload {
  text: string;
  media?: File[] | [];
  isAnonymous: boolean;
}

export interface PostResponse {
  success: boolean;
  message: string;
  post: Post;
}

export const createPost = async (data: PostPayload): Promise<PostResponse> => {
  const formData = new FormData();
  formData.append("text", data.text);
  if (Array.isArray(data.media) && data.media.length > 0) {
    data.media.forEach((file) => {
      formData.append("media", file);
    });
  }

  formData.append("isAnonymous", String(data.isAnonymous));

  const res = await axiosInstance.post<PostResponse>("/api/posts/upload", formData);

  return res.data;
};


// ==== GET POSTS ====
export interface GetFeedPostsPayload {
  type: string;
  cursor?: string;
  limit?: number;
}

export const fetchFeedPosts = async ({
  type,
  cursor,
  limit = 10,
}: GetFeedPostsPayload) => {
  const params: Record<string, any> = {
    type,
    limit,
  };
  if (cursor) {
    params.cursor = cursor;
  }
  const res = await axiosInstance.get<TResponse<PostFeed>>("/api/posts/feed", {
    params,
  });
  return res.data;
};


// ==== GET POST BY ID ====
export const fetchPostById = async (postId: string): Promise<TResponse<Post>> => {
  const res = await axiosInstance.get<TResponse<Post>>(`/api/posts/feed/${postId}`);
  return res.data;
};


// === POST LIKE POST ===
export const likePostById = async (postId: string): Promise<TResponse<LikeByPost>> => {
  const res = await axiosInstance.post<TResponse<LikeByPost>>(`/api/posts/${postId}/like`);
  return res.data;
}
