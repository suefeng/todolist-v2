import { z } from 'zod';

export const Frequency = z.object({
  id: z.number(),
  name: z.string(),
});
