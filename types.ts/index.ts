import * as z from "zod";
import { store } from "@/store";
import { loginFormSchema } from "@/app/login/validation";

export const GlobalDataSchema = z.object({
  cif: z.string(),
});

const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.string(),
  clusterId: z.string(),
  token: z.string(),
  ttl: z.number(),
  refreshToken: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type GlobalStateType = z.infer<typeof GlobalDataSchema>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type LoginFormData = z.infer<typeof loginFormSchema>;
