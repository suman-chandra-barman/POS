export const INVENTORY_TABS = {
  ALL: "all",
  INACTIVE: "inactive",
  ARCHIVED: "archived",
} as const;

export type InventoryTab = (typeof INVENTORY_TABS)[keyof typeof INVENTORY_TABS];

export const INVENTORY_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  ARCHIVED: "archived",
} as const;

export type InventoryStatus =
  (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS];

export const BULK_ACTIONS = {
  ARCHIVE: "archive",
  DUPLICATE: "duplicate",
  COLLECTION: "collection",
  EXPORT_PDF: "export_pdf",
  EDIT_PRODUCT: "edit_product",
  PRINT_LABEL: "print_label",
} as const;

export type BulkActionType =
  (typeof BULK_ACTIONS)[keyof typeof BULK_ACTIONS];

export interface InventoryItem {
  id: string;
  name: string;
  barcode: string;
  sellingPrice: number;
  unitCost: number;
  stock: number;
  unit: string;
  totalValue: number;
  profitMargin: number;
  location: string;
  category: string;
  subcategory: string;
  status: InventoryStatus;
  thumbnail?: string;
}

export interface InventoryCategoryNode {
  id: string;
  name: string;
  children?: {
    id: string;
    name: string;
  }[];
}

export interface InventoryLocationNode {
  id: string;
  name: string;
  count?: number;
}
