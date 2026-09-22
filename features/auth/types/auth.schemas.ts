import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "emailRequired")
    .email("emailInvalid"),
  password: z
    .string()
    .min(1, "passwordRequired")
    .min(6, "passwordMinLength"),
});

export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, "emailRequired")
    .email("emailInvalid"),
});

export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .length(6, "otpRequired")
    .regex(/^\d{6}$/, "otpRequired"),
});

export type SignInSchemaType = typeof signInSchema;
export type SignUpSchemaType = typeof signUpSchema;
export type VerifyEmailSchemaType = typeof verifyEmailSchema;
