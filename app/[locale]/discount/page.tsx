import { Suspense } from "react";
import { DiscountContainer } from "@/features/discount";

export const metadata = {
  title: "Discount | POS",
  description: "Manage discounts, offers, and coupons",
};

export default function DiscountPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-xs text-neutral-400">Loading discount...</div>
      }
    >
      <DiscountContainer />
    </Suspense>
  );
}
