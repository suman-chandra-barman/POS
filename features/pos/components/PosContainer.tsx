"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  POS_VIEWS,
  PosView,
  PosBranch,
  PosUser,
} from "../types/pos.types";
import { MOCK_BRANCHES, MOCK_POS_USERS } from "../data/posMockData";
import { PosPrimaryNavbar } from "./PosPrimaryNavbar";
import { PosSecondaryToolbar } from "./PosSecondaryToolbar";
import { PosBranchesView } from "./PosBranchesView";
import { PosUnlockView } from "./PosUnlockView";
import { PosPinModal } from "./PosPinModal";
import { PosTerminalView } from "./PosTerminalView";

export const PosContainer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL-driven view state
  const viewParam = (searchParams.get("view") as PosView) || POS_VIEWS.BRANCHES;
  const branchIdParam = searchParams.get("branchId") || "";

  const [activeView, setActiveView] = useState<PosView>(viewParam);
  const [selectedBranch, setSelectedBranch] = useState<PosBranch | null>(
    MOCK_BRANCHES.find((b) => b.id === branchIdParam) || MOCK_BRANCHES[0]
  );
  const [selectedCashier, setSelectedCashier] = useState<PosUser>(
    MOCK_POS_USERS[0]
  );
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Synchronize URL
  const updateUrl = (view: PosView, branchId?: string) => {
    const params = new URLSearchParams();
    if (view !== POS_VIEWS.BRANCHES) params.set("view", view);
    if (branchId) params.set("branchId", branchId);
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  };

  // Step 1: Branch selected -> Image 2 (Unlock view)
  const handleSelectBranch = (branch: PosBranch) => {
    setSelectedBranch(branch);
    setActiveView(POS_VIEWS.UNLOCK);
    updateUrl(POS_VIEWS.UNLOCK, branch.id);
  };

  // Step 2: Unlock clicked -> Image 3 (PIN Modal)
  const handleUnlockClick = () => {
    setIsPinModalOpen(true);
  };

  // Step 3 & 4: PIN entered successfully -> Image 5 (Terminal)
  const handlePinSuccess = (user: PosUser) => {
    setSelectedCashier(user);
    setIsPinModalOpen(false);
    setActiveView(POS_VIEWS.TERMINAL);
    updateUrl(POS_VIEWS.TERMINAL, selectedBranch?.id);
  };

  // Terminal Lock button clicked -> back to Image 2 (Unlock view)
  const handleLockTerminal = () => {
    setActiveView(POS_VIEWS.UNLOCK);
    updateUrl(POS_VIEWS.UNLOCK, selectedBranch?.id);
  };

  // Back to branches list
  const handleBackToBranches = () => {
    setActiveView(POS_VIEWS.BRANCHES);
    updateUrl(POS_VIEWS.BRANCHES);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb] flex flex-col">
      {/* 1. View: Branches Selection (Image 1) */}
      {activeView === POS_VIEWS.BRANCHES && (
        <>
          <PosPrimaryNavbar />
          <PosSecondaryToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <main className="flex-1 w-full">
            <PosBranchesView
              branches={MOCK_BRANCHES}
              searchQuery={searchQuery}
              onSelectBranch={handleSelectBranch}
            />
          </main>
        </>
      )}

      {/* 2. View: Unlock State (Image 2) */}
      {activeView === POS_VIEWS.UNLOCK && (
        <PosUnlockView
          branch={selectedBranch}
          onBack={handleBackToBranches}
          onUnlockClick={handleUnlockClick}
        />
      )}

      {/* 3. View: Terminal Sales Register (Image 5) */}
      {activeView === POS_VIEWS.TERMINAL && (
        <PosTerminalView
          branch={selectedBranch}
          cashier={selectedCashier}
          onLock={handleLockTerminal}
          onBackToBranches={handleBackToBranches}
        />
      )}

      {/* PIN Authentication Modal (Image 3 & 4) */}
      {isPinModalOpen && (
        <PosPinModal
          users={MOCK_POS_USERS}
          selectedUser={selectedCashier}
          onSelectUser={setSelectedCashier}
          onSuccess={handlePinSuccess}
          onClose={() => setIsPinModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PosContainer;
