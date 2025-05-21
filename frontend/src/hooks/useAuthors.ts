import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAuthors, getAuthors, getAuthorById, updateAuthor, deleteAuthors } from '../api/authors';
import { toast } from 'sonner';

// Define Author interface
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

// Variables for update mutation
interface UpdateAuthorVariables {
  id: string;
  data: Omit<Author, 'id'>;
}

// Get Authors
export const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: getAuthors,
    staleTime: 1000 * 60 * 5,
  });
};

// Get Authors By Id
export const useAuthorById = (id:string) => {
  return useQuery({
    queryKey: ['authors',{id}],
    queryFn: ()=> getAuthorById(id),
    staleTime: 1000 * 60 * 5,
  });
};

// Update Authors
export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation<Author, Error, UpdateAuthorVariables>({
    mutationFn: ({ id, data }) => updateAuthor({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['authors']});
      toast.success('Author updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update author');
    },
  });
};


// Delete Authors
export const useDeleteAuthor = ()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id:string) => deleteAuthors(id),
    onSuccess: ()=>{
    queryClient.invalidateQueries({ queryKey: ['authors'] });
    }
  })
}


// Create Authors
export const useAuthorMutation = ()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAuthors,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  })
}