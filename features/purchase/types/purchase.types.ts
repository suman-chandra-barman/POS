export const PURCHASE_VIEWS = {
  LIST: "list",
  GRID: "grid",
  DETAILS: "details",
  NEW: "new",
} as const;

export type PurchaseView = (typeof PURCHASE_VIEWS)[keyof typeof PURCHASE_VIEWS];

export const PURCHASE_TABS = {
  ALL: "all",
  PENDING: "pending",
  DRAFT: "draft",
} as const;

export type PurchaseTab = (typeof PURCHASE_TABS)[keyof typeof PURCHASE_TABS];

export const PURCHASE_STATUS = {
  CONFIRMED: "Confirmed",
  PENDING: "Pending",
  CANCEL: "Cancel",
  DRAFT: "Draft",
} as const;

export type PurchaseStatus = (typeof PURCHASE_STATUS)[keyof typeof PURCHASE_STATUS];

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  imageUrl: string;
  demand?: number;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  difference?: number;
  category?: string;
  subcategory?: string;
}

export interface PurchaseOrder {
  id: string;
  orderId: string;
  vendorName: string;
  vendorAvatar?: string;
  buyerName: string;
  date: string;
  totalAmount: number;
  status: PurchaseStatus;
  receivedCount?: number;
  totalCount?: number;
  supplierDetails?: string;
  destination?: string;
  taxPercent?: number;
  items?: PurchaseOrderItem[];
}

export interface CatalogProduct {
  id: string;
  sku: string;
  name: string;
  code: string;
  price: number;
  onHand: number;
  imageUrl: string;
  category: string;
  subcategory: string;
  isStarred?: boolean;
}
