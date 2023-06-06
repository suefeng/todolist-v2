import { useMutation } from 'react-query';
import { z } from 'zod';

import { FrequencyJoin } from 'domain/server/FrequencyJoin';
import http from 'infrastructure/utilities/http';

export const useFrequencyJoinCreation = () =>
  useMutation({
    mutationFn: async (params: z.infer<typeof FrequencyJoin>) => {
      const response = await http.post(`/api/shell/frequency_joins`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();
      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });

export const useFrequencyJoinUpdate = () =>
  useMutation({
    mutationFn: async (params: z.infer<typeof FrequencyJoin>) => {
      const response = await http.put(
        `/api/shell/frequency_joins/${params.todo_id}`,
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
