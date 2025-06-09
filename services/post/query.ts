import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchFeedPosts, fetchPostById } from './api';
import { TResponse } from '@/types/apiType';
import { Post, PostFeed } from '@/types/post/post';

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
