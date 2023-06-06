import { useMutation } from 'react-query';
import { z } from 'zod';

import { CategoryJoin } from 'domain/server/CategoryJoin';
import http from 'infrastructure/utilities/http';

export const useCategoryJoinCreation = () =>
  useMutation({
    mutationFn: async (params: z.infer<typeof CategoryJoin>) => {
      const response = await http.post(`/api/shell/category_joins`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();
      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });

export const useCategoryJoinUpdate = () =>
  useMutation({
    mutationFn: async (params: z.infer<typeof CategoryJoin>) => {
      const response = await http.put(
        `/api/shell/category_joins/${params.todo_id}`,
        {
          body: JSON.stringify({ ...params }),
        },
      );
      const result = await response.json();

      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });
