import { Suspense } from "react";
import { CustomerContainer } from "@/features/customer/components/CustomerContainer";

export default function CustomerPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-xs text-neutral-400">Loading customers...</div>
      }
    >
      <CustomerContainer />
    </Suspense>
  );
}
