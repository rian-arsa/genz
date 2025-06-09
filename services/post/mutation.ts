import { useMutation } from "@tanstack/react-query";
import { createPost, likePostById, PostPayload } from "./api";

export const usePostMutation = () => {
  return useMutation({
    mutationFn: async (data: PostPayload) => {
      const res = await createPost(data);
      return res;
    },
  });
}

export const usePostLikeMutation = () => {
  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await likePostById(postId);
      return res;
    },
  });
}