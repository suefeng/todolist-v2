import { useMutation } from "react-query";
import http from "infrastructure/utilities/http";
import { z } from "zod";
import { RepeatingJoin } from "domain/server/RepeatingJoin";

export const useRepeatingJoinCreation = () =>
  useMutation({
    mutationFn: async (params: z.infer<typeof RepeatingJoin>) => {
      const response = await http.post(`/api/v1/repeating_joins`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();
      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });

export const useRepeatingJoinUpdate = () =>
  useMutation({
    mutationFn: async (params: z.infer<typeof RepeatingJoin>) => {
      const response = await http.put(
        `/api/v1/repeating_joins/${params.todo_id}`,
        {
          body: JSON.stringify({ ...params }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });
