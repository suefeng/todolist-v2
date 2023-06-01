import { z } from 'zod';

export const FrequencyJoin = z.object({
  frequency_id: z.number(),
  todo_id: z.number(),
});
