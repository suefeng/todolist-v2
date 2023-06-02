import { z } from 'zod';

import { ResponseSuccess } from 'infrastructure/api/common';
import { generateTLMock } from 'infrastructure/services/http/httpMockGenerator';

export const Day = z.object({
  id: z.number(),
  name: z.enum([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]),
});

export const validateDay = <T,>(value: ResponseSuccess<T>) => {
  return Day.safeParse(value);
};

validateDay.mock = generateTLMock(Day);

export const DayIndex = z.array(Day);

export const validateDayIndex = <T,>(value: ResponseSuccess<T>) => {
  return DayIndex.safeParse(value);
};

validateDayIndex.mock = generateTLMock(DayIndex);
