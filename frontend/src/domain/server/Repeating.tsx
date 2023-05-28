import { z } from "zod";

export const Repeating = z.object({
  id: z.number(),
  name: z.string(),
});
