export interface HomeAppItem {
  id: string;
  name: string;
  iconName: string;
  bgClass: string;
  iconColorClass: string;
  isMarked?: boolean;
  hasStarOutline?: boolean;
  href?: string;
  category?: string;
}

export const MARKED_APPS: HomeAppItem[] = [
  {
    id: "pos",
    name: "POS",
    iconName: "ShoppingBag",
    bgClass: "bg-[#FFE8EC] text-[#FF426F]",
    iconColorClass: "text-[#FF426F]",
    isMarked: true,
    href: "/pos",
    category: "sales",
  },
  {
    id: "purchase",
    name: "Purchase",
    iconName: "FileSpreadsheet",
    bgClass: "bg-[#FFF4D6] text-[#EAB308]",
    iconColorClass: "text-[#EAB308]",
    isMarked: true,
    href: "/purchase",
    category: "supply_chain",
  },
  {
    id: "inventory",
    name: "Inventory",
    iconName: "Warehouse",
    bgClass: "bg-[#DCFCE7] text-[#22C55E]",
    iconColorClass: "text-[#22C55E]",
    isMarked: true,
    href: "/inventory",
    category: "supply_chain",
  },
  {
    id: "accounting",
    name: "Accounting",
    iconName: "Calculator",
    bgClass: "bg-[#FFEDD5] text-[#F97316]",
    iconColorClass: "text-[#F97316]",
    isMarked: true,
    href: "/accounting",
    category: "finance",
  },
  {
    id: "product",
    name: "Product",
    iconName: "Tag",
    bgClass: "bg-[#E0EAFF] text-[#3B82F6]",
    iconColorClass: "text-[#3B82F6]",
    isMarked: true,
    href: "/product",
    category: "productivity",
  },
  {
    id: "employee",
    name: "Employee",
    iconName: "Users",
    bgClass: "bg-[#CCFBF1] text-[#0D9488]",
    iconColorClass: "text-[#0D9488]",
    isMarked: true,
    href: "/employee",
    category: "human_resource",
  },
  {
    id: "payroll",
    name: "Payroll",
    iconName: "CreditCard",
    bgClass: "bg-[#FCE7F3] text-[#DB2777]",
    iconColorClass: "text-[#DB2777]",
    isMarked: true,
    href: "/payroll",
    category: "human_resource",
  },
];

export const ALL_APPS: HomeAppItem[] = [
  {
    id: "documents",
    name: "Documents",
    iconName: "FileText",
    bgClass: "bg-[#E0F2FE] text-[#0284C7]",
    iconColorClass: "text-[#0284C7]",
    href: "/documents",
    category: "productivity",
  },
  {
    id: "report-1",
    name: "Report",
    iconName: "FileSpreadsheet",
    bgClass: "bg-[#FEF9C3] text-[#A3E635]",
    iconColorClass: "text-[#84CC16]",
    hasStarOutline: true,
    href: "/report",
    category: "finance",
  },
  {
    id: "conversation",
    name: "Conversation",
    iconName: "MessageSquare",
    bgClass: "bg-[#F3E8FF] text-[#A855F7]",
    iconColorClass: "text-[#A855F7]",
    href: "/chat",
    category: "productivity",
  },
  {
    id: "marketing",
    name: "Marketing",
    iconName: "Globe",
    bgClass: "bg-[#D1FAE5] text-[#10B981]",
    iconColorClass: "text-[#10B981]",
    href: "/marketing",
    category: "marketing",
  },
  {
    id: "contact",
    name: "Contact",
    iconName: "BookUser",
    bgClass: "bg-[#F5D0FE] text-[#C026D3]",
    iconColorClass: "text-[#C026D3]",
    href: "/contact",
    category: "human_resource",
  },
  {
    id: "discount",
    name: "Discount",
    iconName: "BadgePercent",
    bgClass: "bg-[#FFE4E6] text-[#F43F5E]",
    iconColorClass: "text-[#F43F5E]",
    href: "/discount",
    category: "sales",
  },
  {
    id: "report-2",
    name: "Report",
    iconName: "FileSearch",
    bgClass: "bg-[#FEF9C3] text-[#A3E635]",
    iconColorClass: "text-[#84CC16]",
    hasStarOutline: true,
    href: "/report",
    category: "finance",
  },
  {
    id: "documents-2",
    name: "Documents",
    iconName: "FileSpreadsheet",
    bgClass: "bg-[#ECFCCB] text-[#65A30D]",
    iconColorClass: "text-[#65A30D]",
    href: "/documents",
    category: "productivity",
  },
];
