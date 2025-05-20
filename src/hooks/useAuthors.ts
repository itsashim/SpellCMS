import { useQuery } from '@tanstack/react-query';
import { getAuthors } from '../api/authors';

export const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: getAuthors,
    staleTime: 1000 * 60 * 5,
  });
};