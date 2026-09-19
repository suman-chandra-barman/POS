"use client";

import React, { useState } from "react";
import { User, FileText, UserCheck, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import {
  PosCartItem,
  PosCustomer,
  PosKeypadMode,
  POS_KEYPAD_MODES,
  PosSalesEmployee,
} from "../types/pos.types";
import { PosCartTable } from "./PosCartTable";
import { PosKeypad } from "./PosKeypad";
import { PosCustomerSelectModal } from "./PosCustomerSelectModal";
import { PosNoteDialog } from "./PosNoteDialog";
import { PosSalesEmployeeModal } from "./PosSalesEmployeeModal";
import { PosActionsModal } from "./PosActionsModal";
import { PosCouponDialog } from "./PosCouponDialog";
import { PosInfoDialog } from "./PosInfoDialog";

interface PosCartSectionProps {
  items: PosCartItem[];
  customer: PosCustomer;
  note: string;
  orderNumber?: string;
  cashierName?: string;
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
  orderNumber = "60001",
  cashierName = "Aminul Huq",
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

  // Modals state
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  const [actionsModalOpen, setActionsModalOpen] = useState(false);
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [selectedSalesperson, setSelectedSalesperson] =
    useState<PosSalesEmployee | null>(null);

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

  const handleCustomerSelected = (newCustomer: PosCustomer) => {
    onCustomerChange(newCustomer);
    // Apply customer discount if customer has discount and items exist
    if ((newCustomer.discountPercent || 0) > 0 && items.length > 0) {
      items.forEach((it) => {
        onUpdateItemDiscount(it.id, newCustomer.discountPercent || 0);
      });
      toast.info(
        `Applied customer's ${newCustomer.discountPercent}% discount to cart items.`
      );
    }
  };

  const handleApplyCoupon = (code: string, discountPercent: number) => {
    if (items.length === 0) {
      toast.error("Add items to cart before applying coupon.");
      return;
    }
    items.forEach((it) => {
      onUpdateItemDiscount(it.id, discountPercent);
    });
  };

  const handleCancelOrder = () => {
    if (items.length === 0) {
      toast.info("Cart is already empty.");
      return;
    }
    onClearCart();
    onNoteChange("");
    toast.success("Order has been cancelled and cart cleared.");
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
        {/* Customer Button (Matching requested "Customer" label and Image 1 modal) */}
        <button
          type="button"
          onClick={() => setCustomerModalOpen(true)}
          title={customer?.name ? `Customer: ${customer.name}` : "Customer"}
          className="flex-1 h-9 px-2.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer truncate shadow-2xs"
        >
          <User className="size-3.5 text-neutral-500 shrink-0" />
          <span className="truncate">Customer</span>
        </button>

        {/* Note Button (Matching requested Shadcn dialog with textarea) */}
        <button
          type="button"
          onClick={() => setNoteDialogOpen(true)}
          className={`h-9 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs relative ${
            note
              ? "border-amber-300 bg-amber-50/70 text-amber-900"
              : "border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800"
          }`}
        >
          <FileText
            className={`size-3.5 ${
              note ? "text-amber-600" : "text-neutral-500"
            }`}
          />
          <span>Note</span>
          {note && (
            <span className="size-1.5 rounded-full bg-amber-500 absolute top-1.5 right-1.5" />
          )}
        </button>

        {/* Sales Button (Matching Image 2 modal) */}
        <button
          type="button"
          onClick={() => setSalesModalOpen(true)}
          className={`h-9 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs ${
            selectedSalesperson
              ? "border-blue-300 bg-blue-50/70 text-blue-900"
              : "border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800"
          }`}
        >
          <UserCheck
            className={`size-3.5 ${
              selectedSalesperson ? "text-blue-600" : "text-neutral-500"
            }`}
          />
          <span className="truncate">
            {selectedSalesperson ? selectedSalesperson.name.split(" ")[0] : "Sales"}
          </span>
        </button>

        {/* Three-Dot Actions Button (Matching Image 3 modal) */}
        <button
          type="button"
          onClick={() => setActionsModalOpen(true)}
          aria-label="More actions"
          className="size-9 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
        >
          <MoreHorizontal className="size-4" />
        </button>
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

      {/* 4. Bottom Action Buttons */}
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

      {/* 1st Image Modal: Customer Select Modal */}
      {customerModalOpen && (
        <PosCustomerSelectModal
          selectedCustomer={customer}
          onSelectCustomer={handleCustomerSelected}
          onClose={() => setCustomerModalOpen(false)}
        />
      )}

      {/* Note Shadcn Dialog */}
      <PosNoteDialog
        isOpen={noteDialogOpen}
        initialNote={note}
        onSaveNote={onNoteChange}
        onClose={() => setNoteDialogOpen(false)}
      />

      {/* 2nd Image Modal: Sales Employee Modal */}
      {salesModalOpen && (
        <PosSalesEmployeeModal
          selectedSalesperson={selectedSalesperson}
          onSelectSalesperson={setSelectedSalesperson}
          onClose={() => setSalesModalOpen(false)}
        />
      )}

      {/* 3rd Image Modal: Actions Modal */}
      {actionsModalOpen && (
        <PosActionsModal
          onClose={() => setActionsModalOpen(false)}
          onOpenCustomerNote={() => setNoteDialogOpen(true)}
          onOpenDiscount={() => {
            setKeypadMode(POS_KEYPAD_MODES.DISCOUNT);
            toast.info("Switched to Discount mode. Enter percent on the keypad.");
          }}
          onOpenCoupon={() => setCouponDialogOpen(true)}
          onOpenInfo={() => setInfoDialogOpen(true)}
          onCancelOrder={handleCancelOrder}
        />
      )}

      {/* Feature Dialog: Coupon Modal */}
      <PosCouponDialog
        isOpen={couponDialogOpen}
        onApplyCoupon={handleApplyCoupon}
        onClose={() => setCouponDialogOpen(false)}
      />

      {/* Feature Dialog: Order & Register Info Modal */}
      <PosInfoDialog
        isOpen={infoDialogOpen}
        orderNumber={orderNumber}
        itemCount={items.length}
        totalAmount={total}
        cashierName={cashierName}
        onClose={() => setInfoDialogOpen(false)}
      />
    </div>
  );
};

export default PosCartSection;
