// services/follow/mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { followUserToggle } from "./api";

export function useMutationFollow(postId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => followUserToggle(userId),
    onMutate: async (userId: string) => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });

      const previous = queryClient.getQueryData<any>(["feed"]);

      // Optimistically update the follow status
      queryClient.setQueryData(["feed"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              posts: page.data.posts.map((post: any) =>
                post.userId === userId
                  ? { ...post, isFollowing: !post.isFollowing }
                  : post
              ),
            },
          })),
        };
      });

      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["feed"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
}
