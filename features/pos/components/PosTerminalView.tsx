"use client";

import React, { useState } from "react";
import {
  PosBranch,
  PosUser,
  PosProduct,
  PosCartItem,
  PosCustomer,
} from "../types/pos.types";
import { MOCK_CUSTOMERS, MOCK_POS_PRODUCTS } from "../data/posMockData";
import { PosTerminalHeader } from "./PosTerminalHeader";
import { PosCartSection } from "./PosCartSection";
import { PosProductCatalog } from "./PosProductCatalog";

interface PosTerminalViewProps {
  branch: PosBranch | null;
  cashier: PosUser | null;
  onLock: () => void;
  onBackToBranches: () => void;
}

export const PosTerminalView: React.FC<PosTerminalViewProps> = ({
  branch,
  cashier,
  onLock,
  onBackToBranches,
}) => {
  const [orderNumber, setOrderNumber] = useState("60001");
  const [searchQuery, setSearchQuery] = useState("");
  const [customer, setCustomer] = useState<PosCustomer>(MOCK_CUSTOMERS[0]);
  const [note, setNote] = useState("");
  const [cartItems, setCartItems] = useState<PosCartItem[]>([]);

  // Add Product to Cart
  const handleAddToCart = (product: PosProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price * (1 - item.discountPercent / 100),
              }
            : item
        );
      } else {
        const newItem: PosCartItem = {
          id: `item-${Date.now()}-${product.id}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          discountPercent: 0,
          total: product.price,
        };
        return [...prev, newItem];
      }
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, qty: number) => {
    setCartItems((prev) => {
      if (qty <= 0) {
        return prev.filter((i) => i.id !== id);
      }
      return prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: qty,
              total: qty * item.price * (1 - item.discountPercent / 100),
            }
          : item
      );
    });
  };

  // Update item discount
  const handleUpdateDiscount = (id: string, discountPercent: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              discountPercent,
              total: item.quantity * item.price * (1 - discountPercent / 100),
            }
          : item
      )
    );
  };

  // Update item price
  const handleUpdatePrice = (id: string, price: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              price,
              total: item.quantity * price * (1 - item.discountPercent / 100),
            }
          : item
      )
    );
  };

  // Clear Cart
  const handleClearCart = () => {
    setCartItems([]);
    setNote("");
  };

  // Complete sale and start fresh ticket
  const handleCompleteSale = () => {
    setCartItems([]);
    setNote("");
    setCustomer(MOCK_CUSTOMERS[0]);
    // increment order number
    const nextNum = parseInt(orderNumber, 10) + 1;
    setOrderNumber(nextNum.toString());
  };

  const handleNewTicket = () => {
    const nextNum = parseInt(orderNumber, 10) + 1;
    setOrderNumber(nextNum.toString());
    setCartItems([]);
    setNote("");
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-[#f8f9fb]">
      {/* 1. Terminal Topbar */}
      <PosTerminalHeader
        currentBranch={branch}
        currentUser={cashier}
        orderNumber={orderNumber}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLock={onLock}
        onNewTicket={handleNewTicket}
        onOpenMenu={onBackToBranches}
      />

      {/* 2. Main 2-Column Register Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Cart & Numpad */}
        <PosCartSection
          orderNumber={orderNumber}
          items={cartItems}
          customer={customer}
          note={note}
          onCustomerChange={setCustomer}
          onNoteChange={setNote}
          onUpdateItemQuantity={handleUpdateQuantity}
          onUpdateItemDiscount={handleUpdateDiscount}
          onUpdateItemPrice={handleUpdatePrice}
          onClearCart={handleClearCart}
          onCompleteSale={handleCompleteSale}
        />

        {/* Right Column: Product Grid */}
        <PosProductCatalog
          products={MOCK_POS_PRODUCTS}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};
