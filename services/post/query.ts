import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchFeedPosts, fetchPostById, getComment } from './api';
import { TResponse } from '@/types/apiType';
import { Post, PostFeed } from '@/types/post/post';
import { CommentPost, CommentPostResponse } from './type';

export const useQueryFeed = (type: string) =>
  useInfiniteQuery<TResponse<PostFeed>, Error>({
    queryKey: ['feed', type],
    queryFn: ({ pageParam }: { pageParam: unknown }) => fetchFeedPosts({ type, cursor: pageParam as string }),
    getNextPageParam: (lastPage) => lastPage.data.hasMore ? lastPage.data.nextCursor : null,
    staleTime: 1000 * 60 * 3,
    initialPageParam: null,
  });

export const useQueryFeedById = (id: string) =>
  useQuery<TResponse<Post>, Error>({
    queryKey: ['feed', id],
    queryFn: () => fetchPostById(id),
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
    retry: 1,
  });

export const useQueryComment = (postId: string, isOpen: boolean, cursor: string | undefined) =>
  useQuery<TResponse<CommentPostResponse>, Error>({
    queryKey: ['feed', 'comment', postId],
    queryFn: () => getComment({ postId, cursor }),
    staleTime: 1000 * 60 * 3,
    enabled: !!postId && isOpen,
  });
