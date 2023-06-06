import { useQuery } from 'react-query';

import http from 'infrastructure/utilities/http';

export const useFrequencies = () => {
  return useQuery({
    queryKey: ['frequencies'],
    queryFn: () =>
      http.get(`/api/shell/frequencies`).then((response) => response.json()),
  });
};
