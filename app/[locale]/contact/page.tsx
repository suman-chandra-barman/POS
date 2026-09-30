import { Suspense } from "react";
import { ContactContainer } from "@/features/contact/components/ContactContainer";

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-xs text-neutral-400">Loading contacts...</div>
      }
    >
      <ContactContainer />
    </Suspense>
  );
}
