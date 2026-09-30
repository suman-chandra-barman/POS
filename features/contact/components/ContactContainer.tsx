"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  CONTACT_VIEWS,
  CONTACT_TYPES,
  type ContactView,
  type Contact,
  type ContactFormData,
} from "../types/contact.types";
import {
  INITIAL_CONTACTS,
  DEFAULT_CONTACT_FORM_DATA,
} from "../data/contactMockData";
import { ContactTopbar } from "./ContactTopbar";
import { ContactSecondaryHeader } from "./ContactSecondaryHeader";
import { ContactStatsCards } from "./ContactStatsCards";
import { ContactTable } from "./ContactTable";
import { ContactCardGrid } from "./ContactCardGrid";
import { ContactFormView } from "./ContactFormView";

export const ContactContainer: React.FC = () => {
  const [activeView, setActiveView] = useState<ContactView>(CONTACT_VIEWS.TABLE);
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [formData, setFormData] = useState<ContactFormData>(DEFAULT_CONTACT_FORM_DATA);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleNewContact = () => {
    setEditingContactId(null);
    setFormData(DEFAULT_CONTACT_FORM_DATA);
    setActiveView(CONTACT_VIEWS.CREATE);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContactId(contact.id);
    setFormData({
      type: contact.type || CONTACT_TYPES.PERSON,
      name: contact.name,
      email: contact.email,
      phone: contact.phone.replace(/^\+?\d+\s*/, ""),
      countryCode: "+880",
      countryIso: "BD",
      avatarUrl: contact.avatarUrl || "",
      address: {
        state: contact.state || "Dhaka",
        city: contact.city || "Dhaka",
        zip: contact.zip || "1212",
        country: contact.country || "Bangladesh",
        countryIso: contact.countryIso || "BD",
      },
      discountType: contact.discountType || "Percentage",
      discountValue: contact.discountValue || "",
      minimumRequirements: {
        noMinimum: true,
        minimumAmount: false,
        minimumQuantity: false,
      },
      activeDates: {
        startDate: contact.activeDates?.startDate || "",
        setEndDate: !!contact.activeDates?.endDate,
        endDate: contact.activeDates?.endDate || "",
      },
      notes: contact.notes || "",
      tags: contact.tags || ["Loyally"],
    });
    setActiveView(CONTACT_VIEWS.EDIT);
  };

  const handleCancelForm = () => {
    setActiveView(CONTACT_VIEWS.TABLE);
  };

  const handleSaveContact = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter the contact name");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      if (editingContactId) {
        setContacts((prev) =>
          prev.map((c) =>
            c.id === editingContactId
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
        toast.success("Contact updated successfully!");
      } else {
        const newContact: Contact = {
          id: `cont-${Date.now()}`,
          name: formData.name,
          email: formData.email || "contact@example.com",
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
        setContacts((prev) => [newContact, ...prev]);
        toast.success("Contact created successfully!");
      }

      setIsSaving(false);
      setActiveView(CONTACT_VIEWS.TABLE);
    }, 350);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb] flex flex-col">
      {/* 1. Primary Topbar */}
      <ContactTopbar />

      {/* 2. Secondary Header */}
      <ContactSecondaryHeader
        onNewContact={handleNewContact}
        onSaveContact={handleSaveContact}
        onCancel={handleCancelForm}
        activeView={activeView}
        onViewChange={setActiveView}
        totalContacts={contacts.length}
        isSaving={isSaving}
      />

      {/* 3. Main Content Area */}
      <main className="flex-1 w-full px-4 sm:px-6 py-6 pb-28">
        {activeView === CONTACT_VIEWS.CREATE ||
        activeView === CONTACT_VIEWS.EDIT ? (
          /* Form View */
          <ContactFormView formData={formData} onChange={setFormData} />
        ) : (
          /* List / Table / Card Views */
          <>
            {/* Top Stat Cards: All Contacts (592) & Due Amount (৳26,658) */}
            <ContactStatsCards
              totalContacts={592}
              dueAmount={26658}
            />

            {/* Main Table or Card Grid */}
            {activeView === CONTACT_VIEWS.TABLE ? (
              <ContactTable
                contacts={contacts}
                onSelectContact={handleEditContact}
              />
            ) : (
              <ContactCardGrid
                contacts={contacts}
                onSelectContact={handleEditContact}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ContactContainer;
