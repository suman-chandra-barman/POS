import { Suspense } from "react";
import { PosContainer } from "@/features/pos/components/PosContainer";

export default function PosPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center bg-[#f8f9fb] text-xs text-neutral-400">
          Loading POS...
        </div>
      }
    >
      <PosContainer />
    </Suspense>
  );
}
