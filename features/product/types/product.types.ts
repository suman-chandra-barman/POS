export const PRODUCT_TABS = {
  ALL: "all",
  DRAFT: "draft",
  ARCHIVED: "archived",
} as const;

export type ProductTab = (typeof PRODUCT_TABS)[keyof typeof PRODUCT_TABS];

export const PRODUCT_VIEW_MODES = {
  LIST: "list",
  HISTORY: "history",
  LOCATION: "location",
} as const;

export type ProductViewMode =
  (typeof PRODUCT_VIEW_MODES)[keyof typeof PRODUCT_VIEW_MODES];

export const PRODUCT_STATUS = {
  ACTIVE: "active",
  DRAFT: "draft",
  ARCHIVED: "archived",
} as const;

export type ProductStatus =
  (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];

export const HISTORY_STATUS = {
  DONE: "Done",
  PENDING: "Pending",
  CANCELLED: "Cancelled",
} as const;

export type HistoryStatus =
  (typeof HISTORY_STATUS)[keyof typeof HISTORY_STATUS];

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  thumbnail: string;
  sellingPrice: number | null;
  category: string;
  subcategory?: string;
  inventory: number;
  cost: number;
  status: ProductStatus;
}

export interface ProductHistoryItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  thumbnail: string;
  date: string;
  reference: "POS" | "Transferred" | "Purchase" | string;
  from: string;
  to: string;
  doneBy: string;
  quantity: number;
  status: HistoryStatus;
}

export interface ProductLocationItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  location: string;
  category: string;
  subcategory?: string;
  value: number;
  inventory: number;
}

export interface ProductColumnVisibility {
  category: boolean;
  subcategory: boolean;
  location: boolean;
  history: boolean;
  sellingPrice: boolean;
  inventory: boolean;
  cost: boolean;
}

export interface HistoryColumnVisibility {
  status: boolean;
  doneBy: boolean;
  reference: boolean;
  from: boolean;
  to: boolean;
  quantity: boolean;
}

export interface LocationColumnVisibility {
  category: boolean;
  subcategory: boolean;
  value: boolean;
  history: boolean;
  inventory: boolean;
}
