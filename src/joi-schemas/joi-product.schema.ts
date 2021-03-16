import { number, object, string } from 'joi';

export const JoiProductSchema = object({
  title: string().min(3).max(256).required(),
  price: number().integer().min(0).max(10000).required(),
});
