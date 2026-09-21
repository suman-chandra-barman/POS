"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Percent,
  Plus,
  Search,
  Check,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CustomerFormData,
  CUSTOMER_TYPES,
  type CustomerType,
} from "../types/customer.types";
import { AVAILABLE_TAGS } from "../data/customerMockData";
import { CustomerPhoneInput } from "./CustomerPhoneInput";
import { CustomerCountrySelect } from "./CustomerCountrySelect";

interface CustomerFormViewProps {
  formData: CustomerFormData;
  onChange: React.Dispatch<React.SetStateAction<CustomerFormData>>;
}

export const CustomerFormView: React.FC<CustomerFormViewProps> = ({
  formData,
  onChange,
}) => {
  const [discountOpen, setDiscountOpen] = useState(true);
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onChange((prev) => ({ ...prev, avatarUrl: url }));
    }
  };

  const toggleTag = (tag: string) => {
    onChange((prev) => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists
          ? prev.tags.filter((t) => t !== tag)
          : [...prev.tags, tag],
      };
    });
  };

  const filteredTags = AVAILABLE_TAGS.filter((t) =>
    t.toLowerCase().includes(tagSearch.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* ── LEFT COLUMN: 2 COLS WIDE (~68%) ── */}
      <div className="lg:col-span-2 space-y-5">
        {/* 1. Customer Overview Card */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs space-y-6">
          {/* Header row with Person / Company radio buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-neutral-900">
              Customer overview
            </h2>

            <div className="flex items-center gap-4 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer text-neutral-800 font-medium">
                <input
                  type="radio"
                  name="customerType"
                  value={CUSTOMER_TYPES.PERSON}
                  checked={formData.type === CUSTOMER_TYPES.PERSON}
                  onChange={() =>
                    onChange((prev) => ({
                      ...prev,
                      type: CUSTOMER_TYPES.PERSON,
                    }))
                  }
                  className="size-3.5 text-neutral-900 focus:ring-neutral-800"
                />
                <span>Person</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-neutral-500 hover:text-neutral-800">
                <input
                  type="radio"
                  name="customerType"
                  value={CUSTOMER_TYPES.COMPANY}
                  checked={formData.type === CUSTOMER_TYPES.COMPANY}
                  onChange={() =>
                    onChange((prev) => ({
                      ...prev,
                      type: CUSTOMER_TYPES.COMPANY,
                    }))
                  }
                  className="size-3.5 text-neutral-900 focus:ring-neutral-800"
                />
                <span>Company/Supplier</span>
              </label>
            </div>
          </div>

          {/* Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Image Box + Upload Button */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="size-24 rounded-2xl overflow-hidden relative bg-neutral-100/80 border border-neutral-200/80 flex items-center justify-center">
                {formData.avatarUrl ? (
                  <Image
                    src={formData.avatarUrl}
                    alt="Customer"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-neutral-400">
                    <ImageIcon className="size-8 stroke-[1.5]" />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-[11px] font-medium text-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                Upload Image
              </button>
            </div>

            {/* Inputs: Name, E-mail, Phone */}
            <div className="flex-1 w-full space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    onChange((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e. g. Mahijul Alam"
                  className="w-full h-9 px-3 text-xs rounded-xl border border-neutral-200/90 bg-white placeholder:text-neutral-400 text-neutral-800 focus:outline-none focus:ring-1.5 focus:ring-sky-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      onChange((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="hello@alignui.com"
                    className="w-full h-9 px-3 text-xs rounded-xl border border-neutral-200/90 bg-white placeholder:text-neutral-400 text-neutral-800 focus:outline-none focus:ring-1.5 focus:ring-sky-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Phone
                  </label>
                  <CustomerPhoneInput
                    country={(formData.countryIso as any) || "BD"}
                    phoneNumber={formData.phone}
                    onCountryChange={(c, code) => {
                      onChange((prev) => ({
                        ...prev,
                        countryIso: c,
                        countryCode: code,
                      }));
                    }}
                    onPhoneNumberChange={(num) => {
                      onChange((prev) => ({
                        ...prev,
                        phone: num,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Subsection */}
          <div className="pt-4 border-t border-neutral-100 space-y-3">
            <h3 className="text-xs font-bold text-neutral-800">Address</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  value={formData.address.state}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      address: { ...prev.address, state: e.target.value },
                    }))
                  }
                  placeholder="State"
                  className="w-full h-9 px-3 text-xs rounded-xl border border-neutral-200/90 bg-white placeholder:text-neutral-400 text-neutral-800 focus:outline-none focus:ring-1.5 focus:ring-sky-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      address: { ...prev.address, city: e.target.value },
                    }))
                  }
                  placeholder="City"
                  className="w-full h-9 px-3 text-xs rounded-xl border border-neutral-200/90 bg-white placeholder:text-neutral-400 text-neutral-800 focus:outline-none focus:ring-1.5 focus:ring-sky-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={formData.address.zip}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      address: { ...prev.address, zip: e.target.value },
                    }))
                  }
                  placeholder="Zip"
                  className="w-full h-9 px-3 text-xs rounded-xl border border-neutral-200/90 bg-white placeholder:text-neutral-400 text-neutral-800 focus:outline-none focus:ring-1.5 focus:ring-sky-300"
                />
              </div>
            </div>

            <div>
              <CustomerCountrySelect
                selectedCountry={formData.address.countryIso || "BD"}
                onSelect={(countryName, countryCode) => {
                  onChange((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      country: countryName,
                      countryIso: countryCode,
                    },
                  }));
                }}
              />
            </div>
          </div>
        </div>

        {/* 2. Discount Value Collapsible Card */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs">
          <button
            type="button"
            onClick={() => setDiscountOpen((v) => !v)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <h3 className="text-xs font-bold text-neutral-800">Discount value</h3>
            {discountOpen ? (
              <ChevronUp className="size-4 text-neutral-500" />
            ) : (
              <ChevronDown className="size-4 text-neutral-500" />
            )}
          </button>

          {discountOpen && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <select
                  value={formData.discountType}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      discountType: e.target.value,
                    }))
                  }
                  className="w-full h-9 px-3 pr-8 text-xs rounded-xl border border-neutral-200/90 bg-white text-neutral-800 appearance-none focus:outline-none focus:ring-1.5 focus:ring-sky-300 cursor-pointer"
                >
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed Amount">Fixed Amount</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col pointer-events-none text-neutral-400">
                  <ChevronUp className="size-2.5 -mb-0.5" />
                  <ChevronDown className="size-2.5" />
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={formData.discountValue}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      discountValue: e.target.value,
                    }))
                  }
                  placeholder="Percentage"
                  className="w-full h-9 pl-3 pr-8 text-xs rounded-xl border border-neutral-200/90 bg-white placeholder:text-neutral-400 text-neutral-800 focus:outline-none focus:ring-1.5 focus:ring-sky-300"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 font-semibold text-xs">
                  %
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Minimum Purchase Requirements */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-neutral-800">
            Minimum purchase requirements
          </h3>

          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
              <input
                type="checkbox"
                checked={formData.minimumRequirements.noMinimum}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    minimumRequirements: {
                      ...prev.minimumRequirements,
                      noMinimum: e.target.checked,
                    },
                  }))
                }
                className="rounded-md border-neutral-300 text-sky-500 focus:ring-sky-400 size-4 cursor-pointer"
              />
              <span>No minimum requirements</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
              <input
                type="checkbox"
                checked={formData.minimumRequirements.minimumAmount}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    minimumRequirements: {
                      ...prev.minimumRequirements,
                      minimumAmount: e.target.checked,
                    },
                  }))
                }
                className="rounded-md border-neutral-300 text-sky-500 focus:ring-sky-400 size-4 cursor-pointer"
              />
              <span>Minimum purchase amount (৳)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
              <input
                type="checkbox"
                checked={formData.minimumRequirements.minimumQuantity}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    minimumRequirements: {
                      ...prev.minimumRequirements,
                      minimumQuantity: e.target.checked,
                    },
                  }))
                }
                className="rounded-md border-neutral-300 text-sky-500 focus:ring-sky-400 size-4 cursor-pointer"
              />
              <span>Minimum quantity of items</span>
            </label>
          </div>
        </div>

        {/* 4. Active Dates */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-neutral-800">Active dates</h3>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Start date
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.activeDates.startDate}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    activeDates: {
                      ...prev.activeDates,
                      startDate: e.target.value,
                    },
                  }))
                }
                placeholder="DD / MM / YYYY"
                className="w-full h-9 pl-3 pr-9 text-xs rounded-xl border border-neutral-200/90 bg-white placeholder:text-neutral-400 text-neutral-800 focus:outline-none focus:ring-1.5 focus:ring-sky-300"
              />
              <Calendar className="size-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
              <input
                type="checkbox"
                checked={formData.activeDates.setEndDate}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    activeDates: {
                      ...prev.activeDates,
                      setEndDate: e.target.checked,
                    },
                  }))
                }
                className="rounded-md border-neutral-300 text-sky-500 focus:ring-sky-400 size-4 cursor-pointer"
              />
              <span>Set end date</span>
            </label>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN: 1 COL WIDE (~32%) ── */}
      <div className="space-y-5">
        {/* 1. Notes Card */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs space-y-2.5">
          <h3 className="text-xs font-bold text-neutral-800">Notes</h3>
          <textarea
            rows={4}
            value={formData.notes}
            onChange={(e) =>
              onChange((prev) => ({ ...prev, notes: e.target.value }))
            }
            placeholder="Write your note"
            className="w-full p-3 text-xs rounded-xl border border-neutral-200/90 bg-white placeholder:text-neutral-400 text-neutral-800 focus:outline-none focus:ring-1.5 focus:ring-sky-300 resize-none"
          />
        </div>

        {/* 2. Tags Card with Interactive Popover (media_1790000711697.png) */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs space-y-3 relative">
          <h3 className="text-xs font-bold text-neutral-800">Tags</h3>

          <div className="relative">
            {/* Tag Button Container */}
            <div
              onClick={() => setTagDropdownOpen((v) => !v)}
              className="min-h-9 w-full p-1.5 rounded-xl border border-neutral-200/90 bg-white flex flex-wrap items-center gap-1.5 cursor-pointer hover:border-neutral-300 transition-colors"
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-medium transition-colors"
              >
                <Plus className="size-3 text-neutral-500" />
                <span>Tag</span>
              </button>

              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-md text-[11px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Tag Dropdown matching image media_1790000711697.png */}
            {tagDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setTagDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-neutral-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Search Input */}
                  <div className="relative mb-2">
                    <Search className="size-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={tagSearch}
                      onChange={(e) => setTagSearch(e.target.value)}
                      placeholder="Search"
                      className="w-full h-8 pl-8 pr-3 text-xs rounded-lg bg-neutral-50 border border-neutral-200/80 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-sky-300"
                    />
                  </div>

                  {/* Tag List with Checkboxes */}
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {filteredTags.length === 0 ? (
                      <p className="p-2 text-center text-xs text-neutral-400">
                        No tag found
                      </p>
                    ) : (
                      filteredTags.map((tag) => {
                        const isSelected = formData.tags.includes(tag);
                        return (
                          <div
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-neutral-50 cursor-pointer text-xs text-neutral-700"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="rounded border-neutral-300 text-sky-500 focus:ring-sky-400 size-3.5 cursor-pointer"
                            />
                            <span>{tag}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFormView;
