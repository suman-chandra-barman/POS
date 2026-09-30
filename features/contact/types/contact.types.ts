export const CONTACT_VIEWS = {
  TABLE: "table",
  CARD: "card",
  CREATE: "create",
  EDIT: "edit",
} as const;

export type ContactView = (typeof CONTACT_VIEWS)[keyof typeof CONTACT_VIEWS];

export const CONTACT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
} as const;

export type ContactStatus =
  (typeof CONTACT_STATUS)[keyof typeof CONTACT_STATUS];

export const CONTACT_TYPES = {
  PERSON: "person",
  COMPANY: "company",
} as const;

export type ContactType =
  (typeof CONTACT_TYPES)[keyof typeof CONTACT_TYPES];

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  dueAmount: number; // 0 if none
  amountSpent: number;
  avatarUrl?: string;
  type?: ContactType;
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

export interface ContactFormData {
  type: ContactType;
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
