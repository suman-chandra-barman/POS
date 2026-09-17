import { z } from "zod";

export const VariantTagSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Tag label is required"),
  colorClass: z.string().optional(),
});

export const VariantAttributeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Variant name is required"),
  tags: z.array(VariantTagSchema),
});

export const AddProductFormSchema = z.object({
  // Product Information
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  isSale: z.boolean(),
  isInventory: z.boolean(),
  isPOS: z.boolean(),

  // Stock / Inventory
  quantityOnHand: z.number().min(0),

  // Categories & Codes
  category: z.string().optional(),
  subcategory: z.string().optional(),
  collection: z.string().optional(),
  barcode: z.string().optional(),
  sku: z.string().optional(),

  // Price & Tax
  sellingPrice: z.number().min(0),
  taxPercent: z.number().min(0).max(100),
  cost: z.number().min(0),

  // Variants
  variants: z.array(VariantAttributeSchema),
});

export type AddProductFormData = z.infer<typeof AddProductFormSchema>;
export type VariantAttribute = z.infer<typeof VariantAttributeSchema>;
export type VariantTag = z.infer<typeof VariantTagSchema>;

export const ADD_PRODUCT_TABS = {
  PRODUCT: "product",
  PRICE_TAX: "price-tax",
  VARIANTS: "variants",
} as const;

export type AddProductActiveTab =
  (typeof ADD_PRODUCT_TABS)[keyof typeof ADD_PRODUCT_TABS];
