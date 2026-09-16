import {
  INITIAL_PRODUCTS,
  INITIAL_HISTORY_ITEMS,
  INITIAL_LOCATION_ITEMS,
} from "../data/productMockData";
import {
  type ProductItem,
  type ProductHistoryItem,
  type ProductLocationItem,
  type ProductTab,
} from "../types/product.types";

/**
 * Product API Service
 * Configured with standard Async API contracts for future RTK Query / Backend API integration.
 */
export const productApi = {
  getProducts: async (tab: ProductTab = "all", query?: string): Promise<ProductItem[]> => {
    let list = [...INITIAL_PRODUCTS];
    if (tab === "draft") {
      list = list.filter((p) => p.status === "draft");
    } else if (tab === "archived") {
      list = list.filter((p) => p.status === "archived");
    }
    if (query?.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  },

  getProductHistory: async (productId?: string): Promise<ProductHistoryItem[]> => {
    if (!productId) return INITIAL_HISTORY_ITEMS;
    return INITIAL_HISTORY_ITEMS.filter((h) => h.productId === productId);
  },

  getProductLocations: async (productId?: string): Promise<ProductLocationItem[]> => {
    if (!productId) return INITIAL_LOCATION_ITEMS;
    return INITIAL_LOCATION_ITEMS.filter((l) => l.productId === productId);
  },
};
