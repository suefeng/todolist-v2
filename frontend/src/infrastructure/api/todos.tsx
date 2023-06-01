import { useMutation, useQuery } from 'react-query';
import { z } from 'zod';

import { CreateTodo, DestroyTodoList, TodoList } from 'domain/server/Todo/todo';
import http from 'infrastructure/utilities/http';

export const useTodos = ({
  filter = '',
  type = '',
  addId,
}: {
  filter?: string;
  type?: string;
  addId?: number;
}) => {
  const filterParam = filter !== '' ? `?filter=${filter}&type=${type}` : '';

  return useQuery({
    queryKey: ['todos', filter, addId],
    queryFn: () =>
      http
        .get(`/api/v1/todos${filterParam}`)
        .then((response) => response.json()),
  });
};

export const useTodoShow = (todoId: number) => {
  return useQuery({
    queryKey: ['todos', todoId],
    queryFn: () =>
      http.get(`/api/v1/todos/${todoId}`).then((response) => response.json()),
  });
};

export const useTodosCreate = () =>
  useMutation({
    mutationFn: async (params: z.infer<typeof CreateTodo>) => {
      const response = await http.post(`/api/v1/todos`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();
      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });

export const useTodosUpdate = () =>
  useMutation({
    mutationFn: async (params: z.infer<typeof TodoList>) => {
      const response = await http.put(`/api/v1/todos/${params.id}`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();

      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });

export const useTodosDestroy = () =>
  useMutation({
    mutationFn: async (params: z.infer<typeof DestroyTodoList>) => {
      const response = await http.delete(`/api/v1/todos/${params.id}`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();

      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });
