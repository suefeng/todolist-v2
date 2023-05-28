import { useMutation } from "react-query";
import http from "infrastructure/utilities/http";
import { CategoryJoin } from "domain/server/CategoryJoin";
import { z } from "zod";

export const useCategoryJoinCreation = () =>
  useMutation({
    mutationFn: async (params: z.infer<typeof CategoryJoin>) => {
      const response = await http.post(`/api/v1/category_joins`, {
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
        `/api/v1/category_joins/${params.todo_id}`,
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
