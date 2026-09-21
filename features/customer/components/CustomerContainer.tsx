"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  CUSTOMER_VIEWS,
  CUSTOMER_TYPES,
  type CustomerView,
  type Customer,
  type CustomerFormData,
} from "../types/customer.types";
import {
  INITIAL_CUSTOMERS,
  DEFAULT_CUSTOMER_FORM_DATA,
} from "../data/customerMockData";
import { CustomerTopbar } from "./CustomerTopbar";
import { CustomerSecondaryHeader } from "./CustomerSecondaryHeader";
import { CustomerStatsCards } from "./CustomerStatsCards";
import { CustomerTable } from "./CustomerTable";
import { CustomerCardGrid } from "./CustomerCardGrid";
import { CustomerFormView } from "./CustomerFormView";

export const CustomerContainer: React.FC = () => {
  const [activeView, setActiveView] = useState<CustomerView>(CUSTOMER_VIEWS.TABLE);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [formData, setFormData] = useState<CustomerFormData>(DEFAULT_CUSTOMER_FORM_DATA);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleNewCustomer = () => {
    setEditingCustomerId(null);
    setFormData(DEFAULT_CUSTOMER_FORM_DATA);
    setActiveView(CUSTOMER_VIEWS.CREATE);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomerId(customer.id);
    setFormData({
      type: customer.type || CUSTOMER_TYPES.PERSON,
      name: customer.name,
      email: customer.email,
      phone: customer.phone.replace(/^\+?\d+\s*/, ""),
      countryCode: "+880",
      countryIso: "BD",
      avatarUrl: customer.avatarUrl || "",
      address: {
        state: customer.state || "Dhaka",
        city: customer.city || "Dhaka",
        zip: customer.zip || "1212",
        country: customer.country || "Bangladesh",
        countryIso: customer.countryIso || "BD",
      },
      discountType: customer.discountType || "Percentage",
      discountValue: customer.discountValue || "",
      minimumRequirements: {
        noMinimum: true,
        minimumAmount: false,
        minimumQuantity: false,
      },
      activeDates: {
        startDate: customer.activeDates?.startDate || "",
        setEndDate: !!customer.activeDates?.endDate,
        endDate: customer.activeDates?.endDate || "",
      },
      notes: customer.notes || "",
      tags: customer.tags || ["Loyally"],
    });
    setActiveView(CUSTOMER_VIEWS.EDIT);
  };

  const handleCancelForm = () => {
    setActiveView(CUSTOMER_VIEWS.TABLE);
  };

  const handleSaveCustomer = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter the customer name");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      if (editingCustomerId) {
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === editingCustomerId
              ? {
                  ...c,
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  avatarUrl: formData.avatarUrl || c.avatarUrl,
                  type: formData.type,
                  city: formData.address.city,
                  state: formData.address.state,
                  zip: formData.address.zip,
                  country: formData.address.country,
                  notes: formData.notes,
                  tags: formData.tags,
                }
              : c
          )
        );
        toast.success("Customer updated successfully!");
      } else {
        const newCustomer: Customer = {
          id: `cust-${Date.now()}`,
          name: formData.name,
          email: formData.email || "customer@example.com",
          phone: formData.phone || "+1 (555) 000-0000",
          orderCount: 0,
          dueAmount: 0,
          amountSpent: 0,
          avatarUrl: formData.avatarUrl,
          type: formData.type,
          city: formData.address.city,
          state: formData.address.state,
          zip: formData.address.zip,
          country: formData.address.country,
          notes: formData.notes,
          tags: formData.tags,
        };
        setCustomers((prev) => [newCustomer, ...prev]);
        toast.success("Customer created successfully!");
      }

      setIsSaving(false);
      setActiveView(CUSTOMER_VIEWS.TABLE);
    }, 350);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb] flex flex-col">
      {/* 1. Primary Topbar (Contact | Home Category Setup | Ask Ai Bell Sophia) */}
      <CustomerTopbar />

      {/* 2. Secondary Header (New Customer / Save & Cancel + Pagination + View Toggle) */}
      <CustomerSecondaryHeader
        onNewCustomer={handleNewCustomer}
        onSaveCustomer={handleSaveCustomer}
        onCancel={handleCancelForm}
        activeView={activeView}
        onViewChange={setActiveView}
        totalCustomers={customers.length}
        isSaving={isSaving}
      />

      {/* 3. Main Content Area */}
      <main className="flex-1 w-full px-4 sm:px-6 py-6 pb-28">
        {activeView === CUSTOMER_VIEWS.CREATE ||
        activeView === CUSTOMER_VIEWS.EDIT ? (
          /* Form View (Customer overview, Discount, Requirements, Dates, Notes, Tags) */
          <CustomerFormView formData={formData} onChange={setFormData} />
        ) : (
          /* List / Table / Card Views matching user's design image */
          <>
            {/* Top Stat Cards: All Customer (592) & Due Amount (৳26,658) */}
            <CustomerStatsCards
              totalCustomers={592}
              dueAmount={26658}
            />

            {/* Main Table or Card Grid */}
            {activeView === CUSTOMER_VIEWS.TABLE ? (
              <CustomerTable
                customers={customers}
                onSelectCustomer={handleEditCustomer}
              />
            ) : (
              <CustomerCardGrid
                customers={customers}
                onSelectCustomer={handleEditCustomer}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default CustomerContainer;
