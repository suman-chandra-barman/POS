"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GiftIllustrationProps {
  className?: string;
}

export const GiftIllustration: React.FC<GiftIllustrationProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "relative w-48 sm:w-56 md:w-64 h-36 sm:h-40 flex items-center justify-center select-none",
        className
      )}
    >
      <svg
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        {/* Floating Coin Top Left */}
        <g transform="translate(145, 30) rotate(-15)">
          <circle cx="10" cy="10" r="9" fill="#FBBF24" stroke="#18181B" strokeWidth="1.8" />
          <text
            x="10"
            y="13.5"
            fontSize="10"
            fontWeight="bold"
            fill="#18181B"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            $
          </text>
        </g>

        {/* Floating Coin Bottom Left */}
        <g transform="translate(138, 98) rotate(12)">
          <circle cx="10" cy="10" r="8" fill="#FBBF24" stroke="#18181B" strokeWidth="1.8" />
          <text
            x="10"
            y="13"
            fontSize="9"
            fontWeight="bold"
            fill="#18181B"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            $
          </text>
        </g>

        {/* Small Gift Box (Top Left, tilted) */}
        <g transform="translate(135, 20) rotate(-18)">
          {/* Box Body */}
          <rect
            x="10"
            y="22"
            width="38"
            height="32"
            rx="2"
            fill="#F59E0B"
            stroke="#18181B"
            strokeWidth="2"
          />
          {/* Vertical Ribbon */}
          <rect
            x="24"
            y="22"
            width="10"
            height="32"
            fill="#FEF3C7"
            stroke="#18181B"
            strokeWidth="1.8"
          />
          {/* Box Lid */}
          <rect
            x="7"
            y="16"
            width="44"
            height="8"
            rx="1.5"
            fill="#D97706"
            stroke="#18181B"
            strokeWidth="2"
          />
          <rect
            x="24"
            y="16"
            width="10"
            height="8"
            fill="#FEF3C7"
            stroke="#18181B"
            strokeWidth="1.8"
          />
          {/* Ribbon Bow */}
          <path
            d="M 23 16 C 16 10, 16 4, 25 10 C 27 12, 28 14, 29 16 Z"
            fill="#FEF3C7"
            stroke="#18181B"
            strokeWidth="1.8"
          />
          <path
            d="M 35 16 C 42 10, 42 4, 33 10 C 31 12, 30 14, 29 16 Z"
            fill="#FEF3C7"
            stroke="#18181B"
            strokeWidth="1.8"
          />
        </g>

        {/* T-Shirt Hanging Out */}
        <g transform="translate(155, 12)">
          {/* Shirt Body */}
          <path
            d="M 28 8 L 38 18 L 32 23 L 28 18 L 28 42 L 6 42 L 6 18 L 2 23 L -4 18 L 6 8 C 12 12, 22 12, 28 8 Z"
            fill="#FEF3C7"
            stroke="#18181B"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Horizontal Stripes on Shirt */}
          <path d="M 6 22 L 28 22" stroke="#D97706" strokeWidth="2" strokeDasharray="2 2" />
          <path d="M 6 28 L 28 28" stroke="#D97706" strokeWidth="2" strokeDasharray="2 2" />
          <path d="M 6 34 L 28 34" stroke="#D97706" strokeWidth="2" strokeDasharray="2 2" />
        </g>

        {/* Main Large Gift Box (Center / Right) */}
        <g transform="translate(142, 60)">
          {/* Box base */}
          <rect
            x="14"
            y="28"
            width="64"
            height="52"
            rx="3"
            fill="#D97706"
            stroke="#18181B"
            strokeWidth="2.2"
          />
          {/* Shadow/highlight panel */}
          <rect
            x="14"
            y="28"
            width="32"
            height="52"
            fill="#F59E0B"
            stroke="#18181B"
            strokeWidth="2"
          />
          {/* Vertical Ribbon Center */}
          <rect
            x="40"
            y="28"
            width="14"
            height="52"
            fill="#FFFBEB"
            stroke="#18181B"
            strokeWidth="2"
          />
          {/* Horizontal Ribbon */}
          <rect
            x="14"
            y="48"
            width="64"
            height="12"
            fill="#FFFBEB"
            stroke="#18181B"
            strokeWidth="2"
          />

          {/* Box Lid (Tilted Open slightly) */}
          <g transform="rotate(-6, 10, 20)">
            <rect
              x="10"
              y="18"
              width="72"
              height="14"
              rx="2"
              fill="#F59E0B"
              stroke="#18181B"
              strokeWidth="2.2"
            />
            <rect
              x="39"
              y="18"
              width="14"
              height="14"
              fill="#FFFBEB"
              stroke="#18181B"
              strokeWidth="2"
            />
            {/* Ribbon Loops on Top Lid */}
            <path
              d="M 39 18 C 28 6, 26 -4, 42 6 C 45 9, 46 14, 46 18 Z"
              fill="#FFFBEB"
              stroke="#18181B"
              strokeWidth="2"
            />
            <path
              d="M 53 18 C 64 6, 66 -4, 50 6 C 47 9, 46 14, 46 18 Z"
              fill="#FFFBEB"
              stroke="#18181B"
              strokeWidth="2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
