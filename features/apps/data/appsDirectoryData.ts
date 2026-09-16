export interface DirectoryAppItem {
  id: string;
  name: string;
  pricing: "Free" | "Paid";
  category: "sale" | "documents" | "accounting" | "supply_chain";
  categoryLabel: string;
  iconName: string;
  bgClass: string;
  iconColorClass: string;
  isInstalled: boolean;
  description?: string;
}

export interface AppCategoryFilter {
  id: string;
  name: string;
  count: number;
  iconName: string;
}

export const APPS_DIRECTORY_ITEMS: DirectoryAppItem[] = [
  {
    id: "inventory",
    name: "Inventory",
    pricing: "Free",
    category: "supply_chain",
    categoryLabel: "Supply chain",
    iconName: "Warehouse",
    bgClass: "bg-[#DCFCE7] text-[#22C55E]",
    iconColorClass: "text-[#22C55E]",
    isInstalled: true,
    description: "Manage real-time inventory, stock tracking and warehouses.",
  },
  {
    id: "purchase",
    name: "Purchase",
    pricing: "Free",
    category: "supply_chain",
    categoryLabel: "Supply chain",
    iconName: "FileSpreadsheet",
    bgClass: "bg-[#FFF4D6] text-[#EAB308]",
    iconColorClass: "text-[#EAB308]",
    isInstalled: true,
    description: "Handle purchase orders, suppliers, and incoming inventory.",
  },
  {
    id: "pos",
    name: "POS",
    pricing: "Free",
    category: "sale",
    categoryLabel: "Sale",
    iconName: "ShoppingBag",
    bgClass: "bg-[#FFE8EC] text-[#FF426F]",
    iconColorClass: "text-[#FF426F]",
    isInstalled: true,
    description: "Point of Sale interface for fast checkouts and sales registers.",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    pricing: "Paid",
    category: "accounting",
    categoryLabel: "Accounting",
    iconName: "Database",
    bgClass: "bg-[#FEF3C7] text-[#D97706]",
    iconColorClass: "text-[#D97706]",
    isInstalled: false,
    description: "Executive business intelligence, visual KPIs, and real-time revenue analytics.",
  },
  {
    id: "product",
    name: "Product",
    pricing: "Free",
    category: "sale",
    categoryLabel: "Sale",
    iconName: "Tag",
    bgClass: "bg-[#E0EAFF] text-[#3B82F6]",
    iconColorClass: "text-[#3B82F6]",
    isInstalled: true,
    description: "Product catalog, variants, barcode generation and pricing rules.",
  },
  {
    id: "employee",
    name: "Employee",
    pricing: "Paid",
    category: "accounting",
    categoryLabel: "Accounting",
    iconName: "Users",
    bgClass: "bg-[#CCFBF1] text-[#0D9488]",
    iconColorClass: "text-[#0D9488]",
    isInstalled: false,
    description: "Human resources, staff shifts, attendance and performance logs.",
  },
  {
    id: "accounting",
    name: "Accounting",
    pricing: "Free",
    category: "accounting",
    categoryLabel: "Accounting",
    iconName: "Calculator",
    bgClass: "bg-[#FFEDD5] text-[#F97316]",
    iconColorClass: "text-[#F97316]",
    isInstalled: true,
    description: "General ledger, journal vouchers, profit & loss, and balance sheets.",
  },
  {
    id: "payroll",
    name: "Payroll",
    pricing: "Paid",
    category: "accounting",
    categoryLabel: "Accounting",
    iconName: "CreditCard",
    bgClass: "bg-[#FCE7F3] text-[#DB2777]",
    iconColorClass: "text-[#DB2777]",
    isInstalled: false,
    description: "Automated monthly salary disbursement, bonuses and tax deductions.",
  },
  {
    id: "marketing",
    name: "Marketing",
    pricing: "Paid",
    category: "sale",
    categoryLabel: "Sale",
    iconName: "Globe",
    bgClass: "bg-[#D1FAE5] text-[#10B981]",
    iconColorClass: "text-[#10B981]",
    isInstalled: false,
    description: "SMS, email campaigns, customer engagement and promotional coupons.",
  },
  {
    id: "contact",
    name: "Contact",
    pricing: "Free",
    category: "documents",
    categoryLabel: "Documents",
    iconName: "BookUser",
    bgClass: "bg-[#F5D0FE] text-[#C026D3]",
    iconColorClass: "text-[#C026D3]",
    isInstalled: false,
    description: "Unified customer & vendor address book with complete interaction history.",
  },
  {
    id: "documents",
    name: "Documents",
    pricing: "Paid",
    category: "documents",
    categoryLabel: "Documents",
    iconName: "FileText",
    bgClass: "bg-[#E0F2FE] text-[#0284C7]",
    iconColorClass: "text-[#0284C7]",
    isInstalled: false,
    description: "Cloud storage for business contracts, tax invoices, and compliance files.",
  },
  {
    id: "discount",
    name: "Discount",
    pricing: "Free",
    category: "sale",
    categoryLabel: "Sale",
    iconName: "BadgePercent",
    bgClass: "bg-[#FFE4E6] text-[#F43F5E]",
    iconColorClass: "text-[#F43F5E]",
    isInstalled: false,
    description: "Automated discount tiers, seasonal offers, and clearance rules.",
  },
];

export const APP_SIDEBAR_CATEGORIES: AppCategoryFilter[] = [
  {
    id: "sale",
    name: "Sale",
    count: 3,
    iconName: "ShoppingBag",
  },
  {
    id: "documents",
    name: "Documents",
    count: 3,
    iconName: "FileText",
  },
  {
    id: "accounting",
    name: "Accounting",
    count: 12,
    iconName: "Tag",
  },
  {
    id: "supply_chain",
    name: "Supply chain",
    count: 2,
    iconName: "Warehouse",
  },
];
