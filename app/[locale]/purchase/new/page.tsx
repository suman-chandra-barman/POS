"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { PurchaseTopbar } from "@/features/purchase/components/PurchaseTopbar";
import { NewPurchaseContainer } from "@/features/purchase/components/NewPurchaseContainer";

export default function NewPurchasePage() {
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb] flex flex-col">
      <PurchaseTopbar onBack={() => router.push(`/${locale}/purchase`)} />
      <main className="flex-1 w-full px-4 sm:px-6 py-4 pb-36">
        <NewPurchaseContainer
          onOrderCreated={() => router.push(`/${locale}/purchase`)}
          onCancel={() => router.push(`/${locale}/purchase`)}
        />
      </main>
    </div>
  );
}
