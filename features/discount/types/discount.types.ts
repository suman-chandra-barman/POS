import { z } from "zod";

export const DISCOUNT_VIEW_MODES = {
  CARD: "card", // Card grid view
  LIST: "list",  // Table view
  CREATE: "create",
} as const;
export type DiscountViewMode =
  (typeof DISCOUNT_VIEW_MODES)[keyof typeof DISCOUNT_VIEW_MODES];

export const DISCOUNT_CHANNELS = {
  POS: "pos",
  SALES: "sales",
  WEBSITE: "website",
} as const;
export type DiscountChannel =
  (typeof DISCOUNT_CHANNELS)[keyof typeof DISCOUNT_CHANNELS];

export const DISCOUNT_VALUE_TYPES = {
  PERCENTAGE: "percentage",
  FIXED: "fixed",
} as const;
export type DiscountValueType =
  (typeof DISCOUNT_VALUE_TYPES)[keyof typeof DISCOUNT_VALUE_TYPES];

export const DISCOUNT_APPLIES_TO = {
  ALL_PRODUCTS: "all_products",
  SPECIFIC_COLLECTION: "specific_collection",
  SELECTED_PRODUCTS: "selected_products",
} as const;
export type DiscountAppliesTo =
  (typeof DISCOUNT_APPLIES_TO)[keyof typeof DISCOUNT_APPLIES_TO];

export const DISCOUNT_ELIGIBILITY = {
  ALL_CUSTOMERS: "all_customers",
  SPECIFIC_CUSTOMER: "specific_customer",
} as const;
export type DiscountEligibility =
  (typeof DISCOUNT_ELIGIBILITY)[keyof typeof DISCOUNT_ELIGIBILITY];

export const MINIMUM_REQUIREMENT_TYPES = {
  NONE: "none",
  AMOUNT: "amount",
} as const;
export type MinimumRequirementType =
  (typeof MINIMUM_REQUIREMENT_TYPES)[keyof typeof MINIMUM_REQUIREMENT_TYPES];

export const DISCOUNT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;
export type DiscountStatus =
  (typeof DISCOUNT_STATUS)[keyof typeof DISCOUNT_STATUS];

export interface DiscountItem {
  id: string;
  title: string;
  coupons?: string;
  eligibility: DiscountEligibility;
  eligibilityLabel: string;
  typeTime: string;
  status: DiscountStatus;
  usedCount: number;
  valueType: DiscountValueType;
  value: number;
}

export interface SelectedTagItem {
  id: string;
  name: string;
}

export const discountFormSchema = z.object({
  channels: z.array(z.string()).min(1, "Select at least one channel"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  posBranch: z.string().min(1, "Select a Point of sale"),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
  hasEndDate: z.boolean(),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  valueType: z.enum(["percentage", "fixed"]),
  discountValue: z
    .string()
    .min(1, "Discount value is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Please enter a valid positive number",
    }),
  appliesTo: z.enum(["all_products", "specific_collection", "selected_products"]),
  selectedProducts: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  eligibility: z.enum(["all_customers", "specific_customer"]),
  selectedCustomers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  minRequirementType: z.enum(["none", "amount"]),
  minPurchaseAmount: z.string().optional(),
  limitTotalUses: z.boolean(),
  totalUsesCount: z.string().optional(),
  limitOnePerCustomer: z.boolean(),
});

export type DiscountFormValues = z.infer<typeof discountFormSchema>;

