import { z } from "zod";

export const RepeatingJoin = z.object({
  repeating_id: z.number(),
  todo_id: z.number(),
});
