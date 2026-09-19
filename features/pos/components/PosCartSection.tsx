"use client";

import React, { useState } from "react";
import { User, FileText, UserCheck, MoreHorizontal, Trash2 } from "lucide-react";
import {
  PosCartItem,
  PosCustomer,
  PosKeypadMode,
  POS_KEYPAD_MODES,
} from "../types/pos.types";
import { PosCartTable } from "./PosCartTable";
import { PosKeypad } from "./PosKeypad";
import { PosCustomerModal } from "./PosCustomerModal";

interface PosCartSectionProps {
  items: PosCartItem[];
  customer: PosCustomer;
  note: string;
  terminalMode?: "catalog" | "payment";
  onCustomerChange: (c: PosCustomer) => void;
  onNoteChange: (note: string) => void;
  onUpdateItemQuantity: (id: string, qty: number) => void;
  onUpdateItemDiscount: (id: string, discountPercent: number) => void;
  onUpdateItemPrice: (id: string, price: number) => void;
  onClearCart: () => void;
  onOpenPayment?: () => void;
  onBackToCatalog?: () => void;
  onValidatePayment?: () => void;
  onAddQuickCash?: (amount: number) => void;
}

export const PosCartSection: React.FC<PosCartSectionProps> = ({
  items,
  customer,
  note,
  terminalMode = "catalog",
  onCustomerChange,
  onNoteChange,
  onUpdateItemQuantity,
  onUpdateItemDiscount,
  onUpdateItemPrice,
  onClearCart,
  onOpenPayment,
  onBackToCatalog,
  onValidatePayment,
  onAddQuickCash,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    items[0]?.id || null
  );
  const [keypadMode, setKeypadMode] = useState<PosKeypadMode>(
    POS_KEYPAD_MODES.QTY
  );
  const [keypadInput, setKeypadInput] = useState<string>("");
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Calculations
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const total = items.reduce((acc, i) => acc + i.total, 0);
  const totalDiscount = Math.max(0, subtotal - total);

  // Auto-select latest item if selected item is removed
  const activeItem = items.find((i) => i.id === selectedItemId) || items[0];

  const handleDigitPress = (digit: string) => {
    if (!activeItem) return;
    const newInput = keypadInput + digit;
    setKeypadInput(newInput);
    applyKeypadValue(newInput);
  };

  const handleToggleSign = () => {
    if (!activeItem || !keypadInput) return;
    const newInput = keypadInput.startsWith("-")
      ? keypadInput.slice(1)
      : `-${keypadInput}`;
    setKeypadInput(newInput);
    applyKeypadValue(newInput);
  };

  const handleBackspace = () => {
    if (!activeItem) return;
    const newInput = keypadInput.slice(0, -1);
    setKeypadInput(newInput);
    applyKeypadValue(newInput || "0");
  };

  const applyKeypadValue = (val: string) => {
    if (!activeItem) return;
    const num = parseFloat(val) || 0;
    if (keypadMode === POS_KEYPAD_MODES.QTY) {
      onUpdateItemQuantity(activeItem.id, Math.max(0, Math.floor(num)));
    } else if (keypadMode === POS_KEYPAD_MODES.DISCOUNT) {
      onUpdateItemDiscount(activeItem.id, Math.min(100, Math.max(0, num)));
    } else if (keypadMode === POS_KEYPAD_MODES.PRICE) {
      onUpdateItemPrice(activeItem.id, Math.max(0, num));
    }
  };

  const handleModeChange = (newMode: PosKeypadMode) => {
    setKeypadMode(newMode);
    setKeypadInput("");
  };

  const handlePromptNote = () => {
    const current = note || "";
    const res = window.prompt("Add Order Note:", current);
    if (res !== null) {
      onNoteChange(res);
    }
  };

  return (
    <div className="w-full lg:w-96 xl:w-105 bg-white border-r border-neutral-200 flex flex-col h-full shrink-0">
      {/* 1. Upper Table: Items List */}
      <PosCartTable
        items={items}
        selectedItemId={activeItem?.id || null}
        discountAmount={totalDiscount}
        onSelectItem={(id) => {
          setSelectedItemId(id);
          setKeypadInput("");
        }}
      />

      {/* 2. Middle Row: Quick Action Buttons (Customer, Note, Sales, ...) */}
      <div className="flex items-center gap-1.5 p-2 border-t border-neutral-200/80 bg-neutral-50/60 select-none">
        {/* Customer Button */}
        <button
          type="button"
          onClick={() => setCustomerModalOpen(true)}
          className="flex-1 h-9 px-2.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer truncate shadow-2xs"
        >
          <User className="size-3.5 text-neutral-500 shrink-0" />
          <span className="truncate">{customer.name}</span>
        </button>

        {/* Note Button */}
        <button
          type="button"
          onClick={handlePromptNote}
          className="h-9 px-3 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <FileText className="size-3.5 text-neutral-500" />
          <span>Note</span>
        </button>

        {/* Sales Button */}
        <button
          type="button"
          className="h-9 px-3 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <UserCheck className="size-3.5 text-neutral-500" />
          <span>Sales</span>
        </button>

        {/* More Actions Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMoreMenuOpen((v) => !v)}
            aria-label="More actions"
            className="size-9 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
          >
            <MoreHorizontal className="size-4" />
          </button>

          {moreMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setMoreMenuOpen(false)}
              />
              <div className="absolute right-0 bottom-full mb-1 w-36 bg-white rounded-xl shadow-lg border border-neutral-200 py-1 z-40 animate-in fade-in duration-100">
                <button
                  type="button"
                  onClick={() => {
                    setMoreMenuOpen(false);
                    onClearCart();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="size-3.5" />
                  <span>Clear Cart</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3. Lower Section: 4x4 Keypad */}
      <PosKeypad
        currentMode={keypadMode}
        keypadType={terminalMode === "payment" ? "payment" : "sales"}
        onModeChange={handleModeChange}
        onDigitPress={handleDigitPress}
        onAddQuickCash={onAddQuickCash}
        onToggleSign={handleToggleSign}
        onBackspace={handleBackspace}
      />

      {/* 4. Bottom Action Buttons (Matching Images 1, 3 & 4) */}
      <div className="p-2 bg-neutral-50/80 border-t border-neutral-200">
        {terminalMode === "catalog" ? (
          <button
            type="button"
            onClick={onOpenPayment}
            disabled={items.length === 0}
            className="w-full h-12 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] active:bg-[#075985] text-white text-base font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Payment</span>
            {total > 0 && (
              <span className="text-sm font-semibold opacity-90">
                ({total.toLocaleString("en-US")} ৳)
              </span>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToCatalog}
              className="flex-1 h-12 rounded-xl bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 text-neutral-900 text-sm font-bold flex items-center justify-center transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={onValidatePayment}
              disabled={items.length === 0}
              className="flex-1 h-12 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] active:bg-[#075985] text-white text-sm font-bold flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
            >
              Validate
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {customerModalOpen && (
        <PosCustomerModal
          selectedCustomer={customer}
          onSelectCustomer={onCustomerChange}
          onClose={() => setCustomerModalOpen(false)}
        />
      )}
    </div>
  );
};
