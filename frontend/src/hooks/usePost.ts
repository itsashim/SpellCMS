import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPosts, deletePosts, getPosts, getPostsById, updatePosts } from '../api/posts';
import { toast } from 'sonner';

export interface Post {
  id: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  content: string;
  coverImage?: string;
}

interface UpdatePostVariables {
  id: string;
  data: Post; 
}

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

// Get Posts by Id
export const usePostsById = (id:string) => {
  return useQuery({
    queryKey: ['posts',{id}],
    queryFn: ()=> getPostsById(id),
    staleTime: 1000 * 60 * 5,
  });
};

// Update Posts
export const useUpdatePosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }:UpdatePostVariables) =>  updatePosts({  id, data}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success("Posts updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update Posts");
    }
  });
};

// Delete Posts
export const useDeletePost = ()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id:string) => deletePosts(id),
    onSuccess: ()=>{
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  })
}