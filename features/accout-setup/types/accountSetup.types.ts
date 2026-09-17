import { z } from "zod";

export const step1Schema = z.object({
  logo: z.string().optional(),
  businessName: z.string().min(1, "Business name is required"),
  category: z.string().min(1, "Please select a category"),
  subcategory: z.string().min(1, "Please select a subcategory"),
  employ: z.string().min(1, "Please select employee count"),
});

export const step2Schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  country: z.string().min(1, "Please select a country"),
  language: z.string().min(1, "Please select a language"),
});

export const accountSetupSchema = step1Schema.merge(step2Schema);

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type AccountSetupFormData = z.infer<typeof accountSetupSchema>;

export const ACCOUNT_SETUP_STEPS = {
  EMPTY: "empty",
  STEP1: "step1",
  STEP2: "step2",
  APP_SELECTION: "app-selection",
  CREATING: "creating",
  COMPLETED: "completed",
} as const;

export type AccountSetupStep =
  (typeof ACCOUNT_SETUP_STEPS)[keyof typeof ACCOUNT_SETUP_STEPS];
