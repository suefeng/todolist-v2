import { z, ZodTypeAny } from 'zod';

export function generateTLMock<T extends ZodTypeAny>(zodRef: T) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async () => {
    const { generateMock: generateMockZod } = await import('@anatine/zod-mock');
    const { faker } = await import('@faker-js/faker/locale/en');

    return {
      data: generateMockZod(zodRef, { faker }) as z.infer<typeof zodRef>,
      error: null,
    };
  };
}
