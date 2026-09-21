export const POS_VIEWS = {
  BRANCHES: "branches",
  UNLOCK: "unlock",
  PIN: "pin",
  TERMINAL: "terminal",
} as const;

export type PosView = (typeof POS_VIEWS)[keyof typeof POS_VIEWS];

export const POS_KEYPAD_MODES = {
  QTY: "qty",
  DISCOUNT: "discount",
  PRICE: "price",
} as const;

export type PosKeypadMode = (typeof POS_KEYPAD_MODES)[keyof typeof POS_KEYPAD_MODES];

export const POS_TERMINAL_VIEWS = {
  CATALOG: "catalog",
  PAYMENT: "payment",
} as const;

export type PosTerminalViewMode = (typeof POS_TERMINAL_VIEWS)[keyof typeof POS_TERMINAL_VIEWS];

export const POS_PAYMENT_STEPS = {
  SELECT: 1,
  VALIDATE: 2,
} as const;

export type PosPaymentStep = (typeof POS_PAYMENT_STEPS)[keyof typeof POS_PAYMENT_STEPS];

export const POS_PAYMENT_METHODS = {
  CUSTOMER_ACCOUNT: "customer_account",
  CASH: "cash",
  BRAC_BANK: "brac_bank",
  BKASH: "bkash",
  CITY_BANK: "city_bank",
  PUBALI_BANK: "pubali_bank",
} as const;

export type PosPaymentMethod = (typeof POS_PAYMENT_METHODS)[keyof typeof POS_PAYMENT_METHODS];

export interface PosBranch {
  id: string;
  name: string;
  date: string;
  openingBalance: number;
  sold: number;
}

export interface PosUser {
  id: string;
  name: string;
  initial: string;
  role: string;
  pin: string;
  avatarUrl?: string;
}

export interface PosProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  sku: string;
}

export interface PosCartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  discountPercent: number;
  total: number;
}

export interface PosCustomer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  points?: number;
  type?: "Customer" | "Supplier";
  discountPercent?: number;
  initials?: string;
  avatarColor?: string;
}

export interface PosSalesEmployee {
  id: string;
  name: string;
  role: string;
  todayOrders: number;
  amount: string;
  avatarUrl: string;
  bannerGradient: string;
}

export interface PosOrder {
  id: string;
  orderNumber: string;
  branchId: string;
  cashierId: string;
  items: PosCartItem[];
  customer?: PosCustomer;
  note?: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod?: PosPaymentMethod;
  createdAt: string;
}
