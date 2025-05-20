import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/posts';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 1000 * 60 * 5,
  });
};