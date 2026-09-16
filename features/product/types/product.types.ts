export type ProductTab = "all" | "draft" | "archived";

export type ProductViewMode = "list" | "history" | "location";

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
  status: "active" | "draft" | "archived";
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
  status: "Done" | "Pending" | "Cancelled";
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
