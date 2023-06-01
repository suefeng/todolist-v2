import { z } from 'zod';

export const Category = z.object({
  id: z.number(),
  name: z.string(),
});
