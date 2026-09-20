"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  EMPLOYEE_VIEWS,
  EMPLOYEE_TABS,
  EMPLOYEE_CATEGORIES,
  type EmployeeView,
  type EmployeeTab,
  type EmployeeCategory,
  type Employee,
  type EmployeeFormData,
} from "../types/employee.types";
import {
  INITIAL_EMPLOYEES,
  DEFAULT_EMPLOYEE_FORM_DATA,
} from "../data/employeeMockData";
import { EmployeeTopbar } from "./EmployeeTopbar";
import { EmployeeSecondaryHeader } from "./EmployeeSecondaryHeader";
import { EmployeeFormSecondaryHeader } from "./EmployeeFormSecondaryHeader";
import { EmployeeSidebarFilter } from "./EmployeeSidebarFilter";
import { EmployeeCardGrid } from "./EmployeeCardGrid";
import { EmployeeListView } from "./EmployeeListView";
import { EmployeeDetailsCard } from "./EmployeeDetailsCard";

export const EmployeeContainer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state
  const viewParam =
    (searchParams.get("view") as EmployeeView) || EMPLOYEE_VIEWS.GRID;
  const tabParam =
    (searchParams.get("tab") as EmployeeTab) || EMPLOYEE_TABS.WORK;

  const [activeView, setActiveView] = useState<EmployeeView>(viewParam);
  const [activeTab, setActiveTab] = useState<EmployeeTab>(tabParam);
  const [selectedCategory, setSelectedCategory] = useState<EmployeeCategory>(
    EMPLOYEE_CATEGORIES.ALL
  );
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [formData, setFormData] = useState<EmployeeFormData>(
    DEFAULT_EMPLOYEE_FORM_DATA
  );
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);

  // Sync state with URL params
  const updateUrl = (
    view: EmployeeView,
    tab: EmployeeTab = activeTab
  ) => {
    const params = new URLSearchParams();
    if (view !== EMPLOYEE_VIEWS.GRID) params.set("view", view);
    if (view === EMPLOYEE_VIEWS.CREATE && tab !== EMPLOYEE_TABS.WORK) {
      params.set("tab", tab);
    }
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  };

  const handleViewChange = (newView: EmployeeView) => {
    setActiveView(newView);
    updateUrl(newView, activeTab);
  };

  const handleTabChange = (newTab: EmployeeTab) => {
    setActiveTab(newTab);
    updateUrl(activeView, newTab);
  };

  const handleNewEmployee = () => {
    setEditingEmployeeId(null);
    setFormData(DEFAULT_EMPLOYEE_FORM_DATA);
    setActiveTab(EMPLOYEE_TABS.WORK);
    setActiveView(EMPLOYEE_VIEWS.CREATE);
    updateUrl(EMPLOYEE_VIEWS.CREATE, EMPLOYEE_TABS.WORK);
  };

  const handleEditEmployee = (emp: Employee) => {
    setEditingEmployeeId(emp.id);
    setFormData({
      ...DEFAULT_EMPLOYEE_FORM_DATA,
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      countryCode: emp.countryCode,
      tag: emp.tag,
      avatarUrl: emp.avatarUrl,
      work: {
        ...DEFAULT_EMPLOYEE_FORM_DATA.work,
        workLocation: emp.location,
        jobTitle: emp.role,
      },
    });
    setActiveTab(EMPLOYEE_TABS.WORK);
    setActiveView(EMPLOYEE_VIEWS.CREATE);
    updateUrl(EMPLOYEE_VIEWS.CREATE, EMPLOYEE_TABS.WORK);
  };

  const handleCancelForm = () => {
    setActiveView(EMPLOYEE_VIEWS.GRID);
    updateUrl(EMPLOYEE_VIEWS.GRID);
  };

  const handleSaveEmployee = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter the employee name");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      if (editingEmployeeId) {
        // Update existing employee
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === editingEmployeeId
              ? {
                  ...emp,
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  tag: formData.tag,
                  avatarUrl:
                    formData.avatarUrl ||
                    emp.avatarUrl,
                  role: formData.work.jobTitle || emp.role,
                  location:
                    formData.work.workLocation || emp.location,
                }
              : emp
          )
        );
        toast.success("Employee updated successfully!");
      } else {
        // Create new employee
        const newEmp: Employee = {
          id: `emp-${Date.now()}`,
          name: formData.name,
          role: formData.work.jobTitle || "Sales Specialist",
          location: formData.work.workLocation || "Banasree",
          salesCount: "0.0K",
          branch: "Sales",
          avatarUrl:
            formData.avatarUrl ||
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
          email: formData.email || "employee@pos.com",
          phone: formData.phone || "(555) 000-0000",
          countryCode: formData.countryCode,
          tag: formData.tag.length > 0 ? formData.tag : ["Team Member"],
          category: EMPLOYEE_CATEGORIES.BANANI,
          socials: {
            instagram: formData.personal.instagram || "https://instagram.com",
            linkedin: formData.personal.linkedin || "https://linkedin.com",
            facebook: formData.personal.facebook || "https://facebook.com",
          },
        };
        setEmployees((prev) => [newEmp, ...prev]);
        toast.success("Employee created successfully!");
      }

      setIsSaving(false);
      setActiveView(EMPLOYEE_VIEWS.GRID);
      updateUrl(EMPLOYEE_VIEWS.GRID);
    }, 400);
  };

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    if (selectedCategory === EMPLOYEE_CATEGORIES.ALL) {
      return employees;
    }
    return employees.filter((emp) => emp.category === selectedCategory);
  }, [employees, selectedCategory]);

  // Location counts for sidebar
  const locationCounts = useMemo(() => {
    return {
      banani: employees.filter(
        (e) => e.category === EMPLOYEE_CATEGORIES.BANANI
      ).length,
      mirpur: employees.filter(
        (e) => e.category === EMPLOYEE_CATEGORIES.MIRPUR
      ).length,
      gulshan: employees.filter(
        (e) => e.category === EMPLOYEE_CATEGORIES.GULSHAN
      ).length,
    };
  }, [employees]);

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb] flex flex-col">
      {/* ── 1. PRIMARY HEADER (TOPBAR) ── */}
      <EmployeeTopbar
        onBack={() => {
          if (activeView === EMPLOYEE_VIEWS.CREATE) {
            handleCancelForm();
          } else {
            router.push("/apps");
          }
        }}
      />

      {/* ── 2. CONTEXTUAL SECONDARY HEADER ── */}
      {activeView === EMPLOYEE_VIEWS.CREATE ? (
        <EmployeeFormSecondaryHeader
          onSave={handleSaveEmployee}
          onCancel={handleCancelForm}
          isSaving={isSaving}
        />
      ) : (
        <EmployeeSecondaryHeader
          onNewEmployee={handleNewEmployee}
          activeView={activeView}
          onViewChange={handleViewChange}
          totalEmployees={employees.length}
        />
      )}

      {/* ── 3. MAIN CONTENT BODY ── */}
      <main className="flex-1 w-full px-4 sm:px-6 py-6 pb-28">
        {activeView === EMPLOYEE_VIEWS.CREATE ? (
          /* Multi-Tab Employee Form View */
          <EmployeeDetailsCard
            formData={formData}
            onChange={setFormData}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        ) : (
          /* List / Grid View with Left Sidebar Filter */
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Left Filter Sidebar */}
            <EmployeeSidebarFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              locationCounts={locationCounts}
            />

            {/* Right Employee Cards / Table */}
            <div className="flex-1 w-full min-w-0">
              {activeView === EMPLOYEE_VIEWS.GRID ? (
                <EmployeeCardGrid
                  employees={filteredEmployees}
                  onEditEmployee={handleEditEmployee}
                />
              ) : (
                <EmployeeListView
                  employees={filteredEmployees}
                  onEditEmployee={handleEditEmployee}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmployeeContainer;
