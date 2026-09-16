export interface CategoryOption {
  id: string;
  label: string;
  subcategories: string[];
}

export interface OptionItem {
  value: string;
  label: string;
}

export const DEMO_CATEGORIES: CategoryOption[] = [
  {
    id: "retail",
    label: "Retail & E-commerce",
    subcategories: [
      "Clothing & Apparel",
      "Footwear & Bags",
      "Electronics & Gadgets",
      "Grocery & Supermarket",
      "Jewelry & Watches",
      "Home & Lifestyle",
    ],
  },
  {
    id: "photography",
    label: "Photography & Creative Studio",
    subcategories: [
      "Portrait & Family Studio",
      "Wedding & Event Photography",
      "Commercial & Advertising",
      "Fashion & Model Agency",
      "Product & E-Commerce Shoots",
    ],
  },
  {
    id: "food_beverage",
    label: "Restaurant & Food Service",
    subcategories: [
      "Café & Coffee Shop",
      "Fast Food & Casual Dining",
      "Fine Dining Restaurant",
      "Bakery & Confectionery",
      "Bar & Lounge",
    ],
  },
  {
    id: "services",
    label: "Professional Services",
    subcategories: [
      "Consulting & Advisory",
      "IT & Software Services",
      "Digital Marketing Agency",
      "Legal & Financial Services",
    ],
  },
  {
    id: "health_beauty",
    label: "Health & Beauty Care",
    subcategories: [
      "Salon & Spa",
      "Pharmacy & Medicine",
      "Dental Clinic",
      "Fitness & Gym Center",
    ],
  },
];

export const DEMO_EMPLOY_OPTIONS: OptionItem[] = [
  { value: "1-5", label: "1 - 5 Employees" },
  { value: "6-15", label: "6 - 15 Employees" },
  { value: "16-50", label: "16 - 50 Employees" },
  { value: "51-200", label: "51 - 200 Employees" },
  { value: "201+", label: "201+ Employees" },
];

export interface CountryOption {
  code: string;
  name: string;
  callingCode: string;
}

export const DEMO_COUNTRIES: CountryOption[] = [
  { code: "BD", name: "Bangladesh", callingCode: "+880" },
  { code: "US", name: "United States", callingCode: "+1" },
  { code: "GB", name: "United Kingdom", callingCode: "+44" },
  { code: "CA", name: "Canada", callingCode: "+1" },
  { code: "AU", name: "Australia", callingCode: "+61" },
  { code: "DE", name: "Germany", callingCode: "+49" },
  { code: "AE", name: "United Arab Emirates", callingCode: "+971" },
  { code: "IN", name: "India", callingCode: "+91" },
  { code: "SG", name: "Singapore", callingCode: "+65" },
];

export const DEMO_LANGUAGES: OptionItem[] = [
  { value: "en", label: "English" },
  { value: "bn", label: "Bengali" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ar", label: "Arabic" },
];

export const INITIAL_STEP1_VALUES = {
  logo: "",
  businessName: "",
  category: "",
  subcategory: "",
  employ: "",
};

export const INITIAL_STEP2_VALUES = {
  email: "hello@alignui.com",
  phone: "+15550000000",
  country: "Bangladesh",
  language: "English",
};
