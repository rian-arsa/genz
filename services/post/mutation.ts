import { useMutation } from "@tanstack/react-query";
import { createPost, likePostById, postComment, PostCommentPayload, PostPayload } from "./api";

export const usePostMutation = () => {
  return useMutation({
    mutationKey: ['post'],
    mutationFn: async (data: PostPayload) => {
      const res = await createPost(data);
      return res;
    },
  });
}

export const usePostLikeMutation = () => {
  return useMutation({
    mutationKey: ['postLike'],
    mutationFn: async (postId: string) => {
      const res = await likePostById(postId);
      return res;
    },
  });
}

export const usePostCommentMutation = () => {
  return useMutation({
    mutationKey: ['postComment'],
    mutationFn: async (payload: PostCommentPayload) => {
      const res = await postComment(payload);
      return res;
    },
  });
}