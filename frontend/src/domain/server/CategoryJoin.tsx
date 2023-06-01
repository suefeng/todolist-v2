import { z } from 'zod';

export const CategoryJoin = z.object({
  category_id: z.number(),
  todo_id: z.number(),
});
