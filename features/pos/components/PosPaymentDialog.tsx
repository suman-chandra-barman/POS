"use client";

import React, { useState } from "react";
import {
  X,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  Printer,
} from "lucide-react";
import {
  POS_PAYMENT_METHODS,
  PosPaymentMethod,
  PosCartItem,
  PosCustomer,
} from "../types/pos.types";
import { cn } from "@/lib/utils";

interface PosPaymentDialogProps {
  orderNumber: string;
  items: PosCartItem[];
  customer: PosCustomer;
  subtotal: number;
  discount: number;
  total: number;
  onCompleteSale: () => void;
  onClose: () => void;
}

export const PosPaymentDialog: React.FC<PosPaymentDialogProps> = ({
  orderNumber,
  items,
  customer,
  subtotal,
  discount,
  total,
  onCompleteSale,
  onClose,
}) => {
  const [method, setMethod] = useState<PosPaymentMethod>(
    POS_PAYMENT_METHODS.CASH
  );
  const [tenderedAmount, setTenderedAmount] = useState<string>(
    total > 0 ? total.toString() : "0"
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const tenderedNum = parseFloat(tenderedAmount) || 0;
  const change = Math.max(0, tenderedNum - total);

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const handleFinishAndNext = () => {
    onCompleteSale();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-neutral-200/80 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              {isCompleted ? "Payment Successful" : "Checkout & Payment"}
            </h3>
            <p className="text-xs text-neutral-500 font-mono">
              Order #{orderNumber}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="size-4.5" />
          </button>
        </div>

        {/* Modal Content */}
        {!isCompleted ? (
          <div className="p-6 space-y-5">
            {/* Amount Due Big Banner */}
            <div className="bg-[#f0f9ff] rounded-2xl border border-[#bae6fd] p-4 text-center">
              <span className="text-xs font-semibold text-[#0369a1] uppercase tracking-wider">
                Total Amount Due
              </span>
              <p className="text-3xl font-extrabold text-[#0284c7] mt-0.5">
                {total.toLocaleString("en-US", { minimumFractionDigits: 2 })} ৳
              </p>
              <div className="flex items-center justify-center gap-3 text-xs text-neutral-500 mt-2">
                <span>Subtotal: {subtotal.toLocaleString("en-US")} ৳</span>
                {discount > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-emerald-600 font-medium">
                      Disc: -{discount.toLocaleString("en-US")} ৳
                    </span>
                  </>
                )}
                <span>•</span>
                <span>Items: {items.reduce((s, i) => s + i.quantity, 0)}</span>
                <span>•</span>
                <span>{customer.name}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setMethod(POS_PAYMENT_METHODS.CASH)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                    method === POS_PAYMENT_METHODS.CASH
                      ? "border-[#0284c7] bg-[#f0f9ff] text-[#0284c7] shadow-2xs"
                      : "border-neutral-200 hover:bg-neutral-50 text-neutral-700"
                  )}
                >
                  <Banknote className="size-5 mb-1.5" />
                  <span>Cash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod(POS_PAYMENT_METHODS.PUBALI_BANK)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                    method === POS_PAYMENT_METHODS.PUBALI_BANK
                      ? "border-[#0284c7] bg-[#f0f9ff] text-[#0284c7] shadow-2xs"
                      : "border-neutral-200 hover:bg-neutral-50 text-neutral-700"
                  )}
                >
                  <CreditCard className="size-5 mb-1.5" />
                  <span>Pubali Bank</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod(POS_PAYMENT_METHODS.BKASH)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                    method === POS_PAYMENT_METHODS.BKASH
                      ? "border-[#0284c7] bg-[#f0f9ff] text-[#0284c7] shadow-2xs"
                      : "border-neutral-200 hover:bg-neutral-50 text-neutral-700"
                  )}
                >
                  <Smartphone className="size-5 mb-1.5" />
                  <span>bKash</span>
                </button>
              </div>
            </div>

            {/* Cash Tendered & Change Calculation */}
            {method === POS_PAYMENT_METHODS.CASH && (
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-700">
                    Tendered Cash (৳):
                  </span>
                  <input
                    type="number"
                    value={tenderedAmount}
                    onChange={(e) => setTenderedAmount(e.target.value)}
                    className="w-32 h-8 px-2.5 text-right font-bold text-xs bg-white border border-neutral-300 rounded-lg focus:outline-hidden focus:border-[#0284c7]"
                  />
                </div>

                {/* Quick amount shortcuts */}
                <div className="flex items-center gap-1.5 justify-end">
                  <button
                    type="button"
                    onClick={() => setTenderedAmount(total.toString())}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-neutral-200 rounded-md hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                  >
                    Exact
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setTenderedAmount((Math.ceil(total / 500) * 500).toString())
                    }
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-neutral-200 rounded-md hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                  >
                    Round 500
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setTenderedAmount(
                        (Math.ceil(total / 1000) * 1000).toString()
                      )
                    }
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-neutral-200 rounded-md hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                  >
                    Round 1000
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-200/80">
                  <span className="text-xs font-semibold text-neutral-800">
                    Change to return:
                  </span>
                  <span className="text-sm font-bold text-emerald-600">
                    {change.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    ৳
                  </span>
                </div>
              </div>
            )}

            {/* Validate Action */}
            <button
              type="button"
              onClick={handleComplete}
              disabled={total <= 0}
              className="w-full py-3.5 bg-[#0284c7] hover:bg-[#0369a1] active:bg-[#075985] text-white rounded-xl text-sm font-bold shadow-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Validate & Complete Sale
            </button>
          </div>
        ) : (
          /* Payment Complete / Receipt Screen */
          <div className="p-6 text-center space-y-5">
            <div className="size-16 rounded-full bg-emerald-50 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="size-10" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-neutral-900">
                Payment Completed!
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                Order #{orderNumber} has been processed successfully.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 text-left space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Customer:</span>
                <span className="font-semibold text-neutral-900">
                  {customer.name}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Payment Method:</span>
                <span className="font-semibold uppercase text-neutral-900">
                  {method.replace("_", " ")}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Total Paid:</span>
                <span className="font-bold text-[#0284c7]">
                  {total.toLocaleString("en-US", { minimumFractionDigits: 2 })} ৳
                </span>
              </div>
              {method === POS_PAYMENT_METHODS.CASH && change > 0 && (
                <div className="flex justify-between text-neutral-600">
                  <span>Change Given:</span>
                  <span className="font-bold text-emerald-600">
                    {change.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    ৳
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="size-4" />
                <span>Print Receipt</span>
              </button>
              <button
                type="button"
                onClick={handleFinishAndNext}
                className="flex-1 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                New Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
