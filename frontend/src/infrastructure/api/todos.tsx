import { useMutation, useQuery } from 'react-query';
import { z } from 'zod';

import { CreateTodo, Todo } from 'domain/server/Todo/todo';
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
        .get(`/api/shell/todos${filterParam}`)
        .then((response) => response.json()),
  });
};

export const useTodoShow = (todoId: number) => {
  return useQuery({
    queryKey: ['todos', todoId],
    queryFn: () =>
      http
        .get(`/api/shell/todos/${todoId}`)
        .then((response) => response.json()),
  });
};

export const useTodosCreate = () =>
  useMutation({
    mutationFn: async (params: z.infer<typeof CreateTodo>) => {
      const response = await http.post(`/api/shell/todos`, {
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
    mutationFn: async (params: z.infer<typeof Todo>) => {
      const response = await http.put(`/api/shell/todos/${params.id}`, {
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
    mutationFn: async (todoId: number) => {
      const response = await http.delete(`/api/shell/todos/${todoId}`, {
        body: {},
      });
      const result = await response.json();

      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });
