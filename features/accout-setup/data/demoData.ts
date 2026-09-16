import { countries } from "countries-list";
import ISO6391 from "iso-639-1";

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
  label: string;
  value: string;
  callingCode: string;
}

// Generate full list of countries from npm package `countries-list`
export const DEMO_COUNTRIES: CountryOption[] = Object.entries(countries)
  .map(([code, data]) => ({
    code,
    name: data.name,
    label: data.name,
    value: data.name,
    callingCode: data.phone && data.phone[0] ? `+${data.phone[0]}` : "",
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Generate full list of languages from npm package `iso-639-1`
export const DEMO_LANGUAGES: OptionItem[] = ISO6391.getAllCodes()
  .map((code) => {
    const englishName = ISO6391.getName(code);
    const nativeName = ISO6391.getNativeName(code);
    return {
      value: englishName,
      label: nativeName && nativeName !== englishName
        ? `${englishName} (${nativeName})`
        : englishName,
    };
  })
  .sort((a, b) => a.value.localeCompare(b.value));

export const INITIAL_STEP1_VALUES = {
  logo: "",
  businessName: "",
  category: "",
  subcategory: "",
  employ: "",
};

export const INITIAL_STEP2_VALUES = {
  email: "hello@pos.com",
  phone: "", // Default empty so placeholder is visible
  country: "Bangladesh", // Default Bangladesh
  language: "English", // Default English
};
