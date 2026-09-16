export interface BusinessApp {
  id: string;
  name: string;
  category: "sales" | "finance" | "productivity" | "supply_chain" | "marketing" | "human_resource";
  categoryLabel: string;
  isDefaultFree: boolean;
  iconName: string;
  bgClass: string;
  iconColorClass: string;
}

export interface AppCategoryGroup {
  id: "sales" | "finance" | "productivity" | "supply_chain" | "marketing" | "human_resource";
  title: string;
  apps: BusinessApp[];
}

export const BUSINESS_APPS: BusinessApp[] = [
  // Sales
  {
    id: "pos",
    name: "POS",
    category: "sales",
    categoryLabel: "Sales",
    isDefaultFree: true,
    iconName: "ShoppingBag",
    bgClass: "bg-red-50 text-red-500",
    iconColorClass: "text-red-500",
  },
  {
    id: "sales",
    name: "Sales",
    category: "sales",
    categoryLabel: "Sales",
    isDefaultFree: false,
    iconName: "Coins",
    bgClass: "bg-amber-50 text-amber-500",
    iconColorClass: "text-amber-500",
  },
  {
    id: "subscription",
    name: "Subscription",
    category: "sales",
    categoryLabel: "Sales",
    isDefaultFree: false,
    iconName: "RefreshCw",
    bgClass: "bg-emerald-50 text-emerald-500",
    iconColorClass: "text-emerald-500",
  },

  // Finance
  {
    id: "accounting",
    name: "Accounting",
    category: "finance",
    categoryLabel: "Finance",
    isDefaultFree: false,
    iconName: "Calculator",
    bgClass: "bg-orange-50 text-orange-500",
    iconColorClass: "text-orange-500",
  },
  {
    id: "billing",
    name: "Billing",
    category: "finance",
    categoryLabel: "Finance",
    isDefaultFree: false,
    iconName: "FileText",
    bgClass: "bg-sky-50 text-sky-500",
    iconColorClass: "text-sky-500",
  },

  // Productivity
  {
    id: "documents",
    name: "Documents",
    category: "productivity",
    categoryLabel: "Productivity",
    isDefaultFree: false,
    iconName: "Files",
    bgClass: "bg-pink-50 text-pink-500",
    iconColorClass: "text-pink-500",
  },
  {
    id: "conversation",
    name: "Conversation",
    category: "productivity",
    categoryLabel: "Productivity",
    isDefaultFree: false,
    iconName: "MessageSquare",
    bgClass: "bg-violet-50 text-violet-500",
    iconColorClass: "text-violet-500",
  },
  {
    id: "product",
    name: "Product",
    category: "productivity",
    categoryLabel: "Productivity",
    isDefaultFree: true,
    iconName: "Tag",
    bgClass: "bg-lime-50 text-lime-600",
    iconColorClass: "text-lime-600",
  },

  // Supply chain
  {
    id: "inventory",
    name: "Inventory",
    category: "supply_chain",
    categoryLabel: "Supply chain",
    isDefaultFree: true,
    iconName: "Package",
    bgClass: "bg-emerald-50 text-emerald-600",
    iconColorClass: "text-emerald-600",
  },
  {
    id: "manufacture",
    name: "Manufacture",
    category: "supply_chain",
    categoryLabel: "Supply chain",
    isDefaultFree: false,
    iconName: "Hammer",
    bgClass: "bg-amber-50 text-amber-600",
    iconColorClass: "text-amber-600",
  },
  {
    id: "purchase",
    name: "Purchase",
    category: "supply_chain",
    categoryLabel: "Supply chain",
    isDefaultFree: true,
    iconName: "Receipt",
    bgClass: "bg-teal-50 text-teal-600",
    iconColorClass: "text-teal-600",
  },

  // Marketing
  {
    id: "sms",
    name: "SMS",
    category: "marketing",
    categoryLabel: "Marketing",
    isDefaultFree: false,
    iconName: "Send",
    bgClass: "bg-teal-50 text-teal-500",
    iconColorClass: "text-teal-500",
  },
  {
    id: "survey",
    name: "Survey",
    category: "marketing",
    categoryLabel: "Marketing",
    isDefaultFree: false,
    iconName: "Compass",
    bgClass: "bg-rose-50 text-rose-500",
    iconColorClass: "text-rose-500",
  },
  {
    id: "email",
    name: "Email",
    category: "marketing",
    categoryLabel: "Marketing",
    isDefaultFree: false,
    iconName: "Mail",
    bgClass: "bg-emerald-50 text-emerald-500",
    iconColorClass: "text-emerald-500",
  },

  // Human resource
  {
    id: "employee",
    name: "Employee",
    category: "human_resource",
    categoryLabel: "Human resource",
    isDefaultFree: false,
    iconName: "User",
    bgClass: "bg-cyan-50 text-cyan-500",
    iconColorClass: "text-cyan-500",
  },
  {
    id: "recruitment",
    name: "Recruitment",
    category: "human_resource",
    categoryLabel: "Human resource",
    isDefaultFree: false,
    iconName: "Users",
    bgClass: "bg-blue-50 text-blue-500",
    iconColorClass: "text-blue-500",
  },
  {
    id: "contact",
    name: "Contact",
    category: "human_resource",
    categoryLabel: "Human resource",
    isDefaultFree: false,
    iconName: "Contact",
    bgClass: "bg-purple-50 text-purple-500",
    iconColorClass: "text-purple-500",
  },
];

export const APP_CATEGORIES: AppCategoryGroup[] = [
  {
    id: "sales",
    title: "Sales",
    apps: BUSINESS_APPS.filter((a) => a.category === "sales"),
  },
  {
    id: "finance",
    title: "Finance",
    apps: BUSINESS_APPS.filter((a) => a.category === "finance"),
  },
  {
    id: "productivity",
    title: "Productivity",
    apps: BUSINESS_APPS.filter((a) => a.category === "productivity"),
  },
  {
    id: "supply_chain",
    title: "Supply chain",
    apps: BUSINESS_APPS.filter((a) => a.category === "supply_chain"),
  },
  {
    id: "marketing",
    title: "Marketing",
    apps: BUSINESS_APPS.filter((a) => a.category === "marketing"),
  },
  {
    id: "human_resource",
    title: "Human resource",
    apps: BUSINESS_APPS.filter((a) => a.category === "human_resource"),
  },
];

export const DEFAULT_SELECTED_APP_IDS: string[] = ["pos", "product", "inventory", "purchase"];
