export const CUSTOMER_VIEWS = {
  TABLE: "table",
  CARD: "card",
  CREATE: "create",
  EDIT: "edit",
} as const;

export type CustomerView = (typeof CUSTOMER_VIEWS)[keyof typeof CUSTOMER_VIEWS];

export const CUSTOMER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
} as const;

export type CustomerStatus =
  (typeof CUSTOMER_STATUS)[keyof typeof CUSTOMER_STATUS];

export const CUSTOMER_TYPES = {
  PERSON: "person",
  COMPANY: "company",
} as const;

export type CustomerType =
  (typeof CUSTOMER_TYPES)[keyof typeof CUSTOMER_TYPES];

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  dueAmount: number; // 0 if none
  amountSpent: number;
  avatarUrl?: string;
  type?: CustomerType;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  countryIso?: string;
  discountType?: string;
  discountValue?: string;
  notes?: string;
  tags?: string[];
  activeDates?: {
    startDate: string;
    endDate?: string;
  };
}

export interface CustomerFormData {
  type: CustomerType;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  countryIso: string;
  avatarUrl: string;
  address: {
    state: string;
    city: string;
    zip: string;
    country: string;
    countryIso?: string;
  };
  discountType: string;
  discountValue: string;
  minimumRequirements: {
    noMinimum: boolean;
    minimumAmount: boolean;
    minimumQuantity: boolean;
  };
  activeDates: {
    startDate: string;
    setEndDate: boolean;
    endDate?: string;
  };
  notes: string;
  tags: string[];
}
