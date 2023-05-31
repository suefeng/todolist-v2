import { z } from "zod";

export const Day = z.object({
  id: z.number(),
  name: z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]),
});
