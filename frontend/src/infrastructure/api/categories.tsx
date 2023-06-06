import { useQuery } from 'react-query';

import http from 'infrastructure/utilities/http';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      http.get(`/api/shell/categories`).then((response) => response.json()),
  });
};
