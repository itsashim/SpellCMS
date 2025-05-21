import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPosts, getPosts } from '../api/posts';


// Get Posts
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 1000 * 60 * 5,
  });
};

// Create Posts
export const usePostsMutation = ()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPosts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  })
}