import { Suspense } from "react";
import { PurchaseContainer } from "@/features/purchase/components/PurchaseContainer";

export default function PurchasePage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-neutral-400">Loading purchase...</div>}>
      <PurchaseContainer />
    </Suspense>
  );
}
