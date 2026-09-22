import { z } from "zod";
import {
  signInSchema,
  signUpSchema,
  verifyEmailSchema,
} from "./auth.schemas";

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export const AUTH_ROUTES = {
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
  VERIFY_EMAIL: "/verify-email",
  ACCOUNT_SETUP: "/account-setup",
} as const;

export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];
