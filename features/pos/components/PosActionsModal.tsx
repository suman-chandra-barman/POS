"use client";

import React from "react";

interface PosActionsModalProps {
  onClose: () => void;
  onOpenCustomerNote: () => void;
  onOpenDiscount: () => void;
  onOpenCoupon: () => void;
  onOpenInfo: () => void;
  onCancelOrder: () => void;
}

export const PosActionsModal: React.FC<PosActionsModalProps> = ({
  onClose,
  onOpenCustomerNote,
  onOpenDiscount,
  onOpenCoupon,
  onOpenInfo,
  onCancelOrder,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-3xl shadow-2xl border border-neutral-200/90 w-full max-w-220 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header (Matching Image 3) */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Actions
          </h2>
        </div>

        {/* Actions Grid (Matching Image 3 layout: 3 on top row, 2 on bottom row) */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-2">
            {/* Tile 1: Customer note */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCustomerNote();
              }}
              className="h-36 rounded-2xl border border-neutral-200 hover:border-amber-400 bg-white hover:bg-amber-50/20 hover:shadow-md p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              {/* Notepad Illustrated Icon */}
              <div className="size-16 relative flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-14 drop-shadow-sm"
                >
                  <rect
                    x="12"
                    y="10"
                    width="40"
                    height="48"
                    rx="6"
                    fill="#FFB703"
                  />
                  <rect
                    x="16"
                    y="14"
                    width="32"
                    height="40"
                    rx="4"
                    fill="#FFF3B0"
                  />
                  {/* Clip */}
                  <rect
                    x="25"
                    y="6"
                    width="14"
                    height="8"
                    rx="2"
                    fill="#219EBC"
                  />
                  <path
                    d="M29 6V4C29 3.44772 29.4477 3 30 3H34C34.5523 3 35 3.44772 35 4V6"
                    stroke="#023047"
                    strokeWidth="2"
                  />
                  {/* Lines */}
                  <line
                    x1="20"
                    y1="24"
                    x2="44"
                    y2="24"
                    stroke="#FB8500"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="20"
                    y1="31"
                    x2="40"
                    y2="31"
                    stroke="#FB8500"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="20"
                    y1="38"
                    x2="36"
                    y2="38"
                    stroke="#FB8500"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Folded Corner */}
                  <path
                    d="M48 48L40 48L48 56V48Z"
                    fill="#FB8500"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold text-neutral-900 group-hover:text-amber-700">
                Customer note
              </span>
            </button>

            {/* Tile 2: Discount */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDiscount();
              }}
              className="h-36 rounded-2xl border border-neutral-200 hover:border-sky-400 bg-white hover:bg-sky-50/20 hover:shadow-md p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              {/* Storefront Discount Illustrated Icon */}
              <div className="size-16 relative flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-14 drop-shadow-sm"
                >
                  {/* Roof Awning */}
                  <path
                    d="M10 24L16 12H48L54 24H10Z"
                    fill="#EF4444"
                  />
                  <path
                    d="M16 12L20 24H28L25 12H16Z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M39 12L36 24H44L48 12H39Z"
                    fill="#FFFFFF"
                  />
                  {/* Shop Building */}
                  <rect
                    x="14"
                    y="24"
                    width="36"
                    height="28"
                    rx="3"
                    fill="#38BDF8"
                  />
                  <rect
                    x="20"
                    y="30"
                    width="24"
                    height="14"
                    rx="2"
                    fill="#0284C7"
                  />
                  <text
                    x="32"
                    y="40"
                    fontSize="9"
                    fontWeight="bold"
                    fill="#FFFFFF"
                    textAnchor="middle"
                  >
                    SHOP
                  </text>
                  {/* Hanging Discount Tag */}
                  <circle
                    cx="48"
                    cy="45"
                    r="8"
                    fill="#FBBF24"
                    stroke="#D97706"
                    strokeWidth="1.5"
                  />
                  <text
                    x="48"
                    y="48"
                    fontSize="9"
                    fontWeight="bold"
                    fill="#78350F"
                    textAnchor="middle"
                  >
                    %
                  </text>
                </svg>
              </div>
              <span className="text-sm font-bold text-neutral-900 group-hover:text-sky-700">
                Discount
              </span>
            </button>

            {/* Tile 3: Coupon */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCoupon();
              }}
              className="h-36 rounded-2xl border border-neutral-200 hover:border-rose-400 bg-white hover:bg-rose-50/20 hover:shadow-md p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              {/* Coupon Illustrated Icon */}
              <div className="size-16 relative flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-14 drop-shadow-sm"
                >
                  {/* Ticket */}
                  <g transform="rotate(-15 32 32)">
                    <rect
                      x="14"
                      y="20"
                      width="36"
                      height="24"
                      rx="3"
                      fill="#F43F5E"
                    />
                    <rect
                      x="17"
                      y="23"
                      width="30"
                      height="18"
                      rx="2"
                      fill="#FB7185"
                    />
                    <text
                      x="32"
                      y="35"
                      fontSize="11"
                      fontWeight="bold"
                      fill="#FFFFFF"
                      textAnchor="middle"
                    >
                      %
                    </text>
                  </g>
                  {/* Scissors */}
                  <circle
                    cx="48"
                    cy="48"
                    r="5"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="40"
                    cy="52"
                    r="5"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="44"
                    y1="45"
                    x2="30"
                    y2="32"
                    stroke="#06B6D4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="38"
                    y1="49"
                    x2="26"
                    y2="38"
                    stroke="#06B6D4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold text-neutral-900 group-hover:text-rose-700">
                Coupon
              </span>
            </button>

            {/* Tile 4: Info */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenInfo();
              }}
              className="h-36 rounded-2xl border border-neutral-200 hover:border-emerald-400 bg-white hover:bg-emerald-50/20 hover:shadow-md p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              {/* Info Illustrated Icon */}
              <div className="size-16 relative flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-14 drop-shadow-sm"
                >
                  {/* Speech Bubble */}
                  <path
                    d="M14 28C14 18.0589 22.0589 10 32 10C41.9411 10 50 18.0589 50 28C50 37.9411 41.9411 46 32 46C28.4651 46 25.1633 44.9789 22.3789 43.2185L14 48L16.4828 39.8517C14.9292 36.3769 14 32.3023 14 28Z"
                    fill="#06B6D4"
                    stroke="#0891B2"
                    strokeWidth="2"
                  />
                  {/* 3D Question Mark */}
                  <path
                    d="M28 22C28 19.7909 29.7909 18 32 18C34.2091 18 36 19.7909 36 22C36 23.5 35 24.5 34 25.5C32.8 26.7 31.5 28 31.5 30H32.5"
                    stroke="#F59E0B"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="32"
                    cy="36"
                    r="2.5"
                    fill="#F59E0B"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700">
                Info
              </span>
            </button>

            {/* Tile 5: Cancel order */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onCancelOrder();
              }}
              className="h-36 rounded-2xl border border-neutral-200 hover:border-rose-400 bg-white hover:bg-rose-50/20 hover:shadow-md p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              {/* Cancel Bag Illustrated Icon */}
              <div className="size-16 relative flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-14 drop-shadow-sm"
                >
                  {/* Shopping Bag */}
                  <rect
                    x="16"
                    y="22"
                    width="32"
                    height="32"
                    rx="4"
                    fill="#67E8F9"
                  />
                  <path
                    d="M16 22L20 18H44L48 22H16Z"
                    fill="#A5F3FC"
                  />
                  {/* Handles */}
                  <path
                    d="M26 18V14C26 10.6863 28.6863 8 32 8C35.3137 8 38 10.6863 38 14V18"
                    stroke="#F43F5E"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Sparkles */}
                  <circle cx="24" cy="30" r="1.5" fill="#FFFFFF" />
                  <circle cx="40" cy="32" r="1.5" fill="#FFFFFF" />
                  <circle cx="30" cy="42" r="1.5" fill="#FFFFFF" />
                  {/* Yellow Circular Badge with X */}
                  <circle
                    cx="48"
                    cy="46"
                    r="9"
                    fill="#FBBF24"
                    stroke="#D97706"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M44 42L52 50M52 42L44 50"
                    stroke="#18181B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold text-neutral-900 group-hover:text-rose-700">
                Cancel order
              </span>
            </button>
          </div>
        </div>

        {/* Footer Cancel Button (Matching Image 3) */}
        <div className="p-6 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-12 rounded-2xl bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-800 text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PosActionsModal;
