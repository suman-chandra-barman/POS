"use client";

import React, { useState } from "react";
import {
  PosBranch,
  PosUser,
  PosProduct,
  PosCartItem,
  PosCustomer,
  PosPaymentMethod,
  POS_PAYMENT_METHODS,
  POS_TERMINAL_VIEWS,
  PosTerminalViewMode,
} from "../types/pos.types";
import { MOCK_CUSTOMERS, MOCK_POS_PRODUCTS } from "../data/posMockData";
import { PosTerminalHeader } from "./PosTerminalHeader";
import { PosCartSection } from "./PosCartSection";
import { PosProductCatalog } from "./PosProductCatalog";
import { PosPaymentPanel } from "./PosPaymentPanel";

interface PosTerminalViewProps {
  branch: PosBranch | null;
  cashier: PosUser | null;
  onLock: () => void;
  onBackToBranches: () => void;
}

interface OrderState {
  items: PosCartItem[];
  customer: PosCustomer;
  note: string;
}

// Initial mock cart items matching Image 1 & 2
const INITIAL_ORDER_60001: PosCartItem[] = [
  {
    id: "item-init-1",
    productId: "prod-1",
    name: "Men's Denim Trousers (Navy)",
    price: 1250,
    quantity: 2,
    discountPercent: 0,
    total: 2500,
  },
  {
    id: "item-init-2",
    productId: "prod-2",
    name: "Baby Pant",
    price: 1250,
    quantity: 3,
    discountPercent: 0,
    total: 3750,
  },
  {
    id: "item-init-3",
    productId: "prod-3",
    name: "Girl's Frok",
    price: 1250,
    quantity: 1,
    discountPercent: 50,
    total: 625,
  },
  {
    id: "item-init-4",
    productId: "prod-4",
    name: "Baby Pant",
    price: 5000,
    quantity: 1,
    discountPercent: 0,
    total: 5000,
  },
];

export const PosTerminalView: React.FC<PosTerminalViewProps> = ({
  branch,
  cashier,
  onLock,
  onBackToBranches,
}) => {
  // Order Tabs State (e.g. 60001, 60002)
  const [orderTabs, setOrderTabs] = useState<string[]>(["60001", "60002"]);
  const [activeOrder, setActiveOrder] = useState<string>("60001");
  const [activeHeaderTab, setActiveHeaderTab] = useState<"sale" | "report">("sale");

  // Terminal View Mode: catalog vs payment (Image 1 vs Image 3 & 4)
  const [terminalMode, setTerminalMode] = useState<PosTerminalViewMode>(
    POS_TERMINAL_VIEWS.CATALOG
  );

  // Search Query
  const [searchQuery, setSearchQuery] = useState("");

  // Orders State Map
  const [ordersMap, setOrdersMap] = useState<Record<string, OrderState>>({
    "60001": {
      items: INITIAL_ORDER_60001,
      customer: MOCK_CUSTOMERS[0],
      note: "",
    },
    "60002": {
      items: [],
      customer: MOCK_CUSTOMERS[1],
      note: "",
    },
  });

  // Current active order state
  const currentOrder = ordersMap[activeOrder] || {
    items: [],
    customer: MOCK_CUSTOMERS[0],
    note: "",
  };

  // Payment Mode State (Images 3 & 4)
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PosPaymentMethod>(POS_PAYMENT_METHODS.CUSTOMER_ACCOUNT);
  const [tenderedAmount, setTenderedAmount] = useState<number>(2000.0);

  // Helpers to update current order state
  const updateCurrentOrder = (updater: (prev: OrderState) => OrderState) => {
    setOrdersMap((prev) => ({
      ...prev,
      [activeOrder]: updater(prev[activeOrder] || {
        items: [],
        customer: MOCK_CUSTOMERS[0],
        note: "",
      }),
    }));
  };

  // Cart operations
  const handleAddToCart = (product: PosProduct) => {
    updateCurrentOrder((order) => {
      const existing = order.items.find((item) => item.productId === product.id);
      if (existing) {
        return {
          ...order,
          items: order.items.map((item) =>
            item.productId === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  total:
                    (item.quantity + 1) *
                    item.price *
                    (1 - item.discountPercent / 100),
                }
              : item
          ),
        };
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
        return {
          ...order,
          items: [...order.items, newItem],
        };
      }
    });
  };

  const handleRemoveFromCart = (product: PosProduct) => {
    updateCurrentOrder((order) => {
      const existing = order.items.find((item) => item.productId === product.id);
      if (!existing) return order;
      if (existing.quantity <= 1) {
        return {
          ...order,
          items: order.items.filter((item) => item.productId !== product.id),
        };
      }
      return {
        ...order,
        items: order.items.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity - 1,
                total:
                  (item.quantity - 1) *
                  item.price *
                  (1 - item.discountPercent / 100),
              }
            : item
        ),
      };
    });
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    updateCurrentOrder((order) => ({
      ...order,
      items:
        qty <= 0
          ? order.items.filter((i) => i.id !== id)
          : order.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: qty,
                    total:
                      qty * item.price * (1 - item.discountPercent / 100),
                  }
                : item
            ),
    }));
  };

  const handleUpdateDiscount = (id: string, discountPercent: number) => {
    updateCurrentOrder((order) => ({
      ...order,
      items: order.items.map((item) =>
        item.id === id
          ? {
              ...item,
              discountPercent,
              total:
                item.quantity * item.price * (1 - discountPercent / 100),
            }
          : item
      ),
    }));
  };

  const handleUpdatePrice = (id: string, price: number) => {
    updateCurrentOrder((order) => ({
      ...order,
      items: order.items.map((item) =>
        item.id === id
          ? {
              ...item,
              price,
              total:
                item.quantity * price * (1 - item.discountPercent / 100),
            }
          : item
      ),
    }));
  };

  const handleClearCart = () => {
    updateCurrentOrder((order) => ({
      ...order,
      items: [],
      note: "",
    }));
  };

  // Add new tab (+)
  const handleNewTicket = () => {
    const highestNum = orderTabs.reduce((max, num) => {
      const parsed = parseInt(num, 10);
      return isNaN(parsed) ? max : Math.max(max, parsed);
    }, 60000);
    const newNum = (highestNum + 1).toString();
    setOrderTabs((prev) => [...prev, newNum]);
    setOrdersMap((prev) => ({
      ...prev,
      [newNum]: {
        items: [],
        customer: MOCK_CUSTOMERS[0],
        note: "",
      },
    }));
    setActiveOrder(newNum);
    setTerminalMode(POS_TERMINAL_VIEWS.CATALOG);
  };

  // Calculate current totals
  const subtotal = currentOrder.items.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );
  const discountTotal = currentOrder.items.reduce(
    (acc, i) => acc + (i.price * i.quantity * i.discountPercent) / 100,
    0
  );
  const payableAmount = Math.max(0, subtotal - discountTotal);

  // Mode switching: Open payment
  const handleOpenPayment = () => {
    setTerminalMode(POS_TERMINAL_VIEWS.PAYMENT);
    setTenderedAmount(
      payableAmount > 0 ? Math.ceil(payableAmount / 100) * 100 : 0
    );
  };

  const handleBackToCatalog = () => {
    setTerminalMode(POS_TERMINAL_VIEWS.CATALOG);
  };

  // Quick cash additions (+10, +20, +50 in Image 3 & 4)
  const handleAddQuickCash = (amount: number) => {
    setTenderedAmount((prev) => prev + amount);
  };

  // Validate sale
  const handleValidateSale = () => {
    // Reset completed order and return to catalog
    updateCurrentOrder(() => ({
      items: [],
      customer: MOCK_CUSTOMERS[0],
      note: "",
    }));
    setTerminalMode(POS_TERMINAL_VIEWS.CATALOG);
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-[#f8f9fb]">
      {/* 1. Terminal Topbar with Multi-tabs (Images 1-4) */}
      <PosTerminalHeader
        currentBranch={branch}
        currentUser={cashier}
        orderTabs={orderTabs}
        activeOrder={activeOrder}
        onSelectOrder={(num) => {
          setActiveOrder(num);
          setTerminalMode(POS_TERMINAL_VIEWS.CATALOG);
        }}
        activeTab={activeHeaderTab}
        onTabChange={setActiveHeaderTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLock={onLock}
        onNewTicket={handleNewTicket}
        onOpenMenu={onBackToBranches}
      />

      {/* 2. Main 2-Column POS Register Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Cart, Actions, Keypad, and Payment/Validate */}
        <PosCartSection
          items={currentOrder.items}
          customer={currentOrder.customer}
          note={currentOrder.note}
          orderNumber={activeOrder}
          cashierName={cashier?.name}
          terminalMode={terminalMode}
          onCustomerChange={(cust) =>
            updateCurrentOrder((ord) => ({ ...ord, customer: cust }))
          }
          onNoteChange={(n) =>
            updateCurrentOrder((ord) => ({ ...ord, note: n }))
          }
          onUpdateItemQuantity={handleUpdateQuantity}
          onUpdateItemDiscount={handleUpdateDiscount}
          onUpdateItemPrice={handleUpdatePrice}
          onClearCart={handleClearCart}
          onOpenPayment={handleOpenPayment}
          onBackToCatalog={handleBackToCatalog}
          onValidatePayment={handleValidateSale}
          onAddQuickCash={handleAddQuickCash}
        />

        {/* Right Column: Dynamic Switcher (Product Catalog vs Payment Panel) */}
        {terminalMode === POS_TERMINAL_VIEWS.CATALOG ? (
          <PosProductCatalog
            products={MOCK_POS_PRODUCTS}
            cartProductIds={currentOrder.items.map((i) => i.productId)}
            searchQuery={searchQuery}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ) : (
          <PosPaymentPanel
            payableAmount={payableAmount}
            selectedMethod={selectedPaymentMethod}
            onSelectMethod={setSelectedPaymentMethod}
            tenderedAmount={tenderedAmount}
            onClearMethod={() => setTenderedAmount(0)}
          />
        )}
      </div>
    </div>
  );
};
