"use client";

import React, { useMemo } from "react";
import { PosBranch } from "../types/pos.types";
import { PosBranchCard } from "./PosBranchCard";

interface PosBranchesViewProps {
  branches: PosBranch[];
  searchQuery: string;
  onSelectBranch: (branch: PosBranch) => void;
}

export const PosBranchesView: React.FC<PosBranchesViewProps> = ({
  branches,
  searchQuery,
  onSelectBranch,
}) => {
  const filteredBranches = useMemo(() => {
    if (!searchQuery.trim()) return branches;
    return branches.filter((b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [branches, searchQuery]);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredBranches.map((branch) => (
          <PosBranchCard
            key={branch.id}
            branch={branch}
            onSelect={onSelectBranch}
          />
        ))}
      </div>

      {filteredBranches.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-neutral-500">
            No branches found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </div>
  );
};
