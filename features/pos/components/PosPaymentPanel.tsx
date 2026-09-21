"use client";

import React from "react";
import { PosPaymentMethod, PosPaymentStep } from "../types/pos.types";
import { PosPaymentAmountDisplay } from "./PosPaymentAmountDisplay";
import { PosPaymentLinesList } from "./PosPaymentLinesList";

interface PosPaymentPanelProps {
  payableAmount: number;
  selectedMethod: PosPaymentMethod;
  onSelectMethod: (method: PosPaymentMethod) => void;
  tenderedAmount: number;
  onClearMethod: () => void;
  paymentStep?: PosPaymentStep;
}

export const PosPaymentPanel: React.FC<PosPaymentPanelProps> = ({
  payableAmount,
  selectedMethod,
  onSelectMethod,
  tenderedAmount,
  onClearMethod,
  paymentStep = 1,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-white p-6 sm:p-10 select-none overflow-y-auto">
      {paymentStep === 1 ? (
        /* Window 1 (Image 2): Large amount centered on clean white canvas */
        <div className="flex-1 flex flex-col items-center justify-center -mt-16">
          <PosPaymentAmountDisplay amount={payableAmount} />
        </div>
      ) : (
        /* Window 2 (Image 3): Large amount at top, followed by payment breakdown cards and change */
        <div className="w-full flex flex-col items-center pt-4 sm:pt-8">
          <PosPaymentAmountDisplay amount={payableAmount} className="mb-4" />
          <PosPaymentLinesList
            payableAmount={payableAmount}
            selectedMethod={selectedMethod}
            tenderedAmount={tenderedAmount}
            onSelectMethod={onSelectMethod}
            onClearMethod={onClearMethod}
          />
        </div>
      )}
    </div>
  );
};
