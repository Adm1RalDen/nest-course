import { object, string } from 'joi';

export const JoiLoginSchema = object({
  email: string().email().required(),
  password: string().min(3).max(256).required(),
});

export const JoiRegisterSchema = JoiLoginSchema.keys({
  name: string().min(3).max(256).required(),
});
