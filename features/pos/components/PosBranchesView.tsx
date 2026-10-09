"use client";

import React, { useMemo } from "react";
import { PosBranch } from "../types/pos.types";
import { PosBranchCard } from "./PosBranchCard";

export interface PosBranchesViewProps {
  branches: PosBranch[];
  searchQuery: string;
  onSelectBranch: (branch: PosBranch) => void;
  viewMode?: "card" | "table";
}

export const PosBranchesView: React.FC<PosBranchesViewProps> = ({
  branches,
  searchQuery,
  onSelectBranch,
  viewMode = "card",
}) => {
  const filteredBranches = useMemo(() => {
    if (!searchQuery.trim()) return branches;
    return branches.filter((b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [branches, searchQuery]);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 py-6">
      {viewMode === "table" ? (
        <div className="w-full rounded-2xl bg-white border border-neutral-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200/80 bg-neutral-50/70 text-neutral-500 font-medium">
                  <th className="py-3 px-4">Branch</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Opening Balance</th>
                  <th className="py-3 px-4 text-right">Sold</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredBranches.map((branch) => (
                  <tr
                    key={branch.id}
                    className="hover:bg-neutral-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">
                      {branch.name}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">
                      {branch.date}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-700 text-right font-medium">
                      {branch.openingBalance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-[#0284c7] text-right font-semibold">
                      {branch.sold.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onSelectBranch(branch)}
                        className="px-3 py-1.5 rounded-lg bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                      >
                        Continue to sale
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredBranches.map((branch) => (
            <PosBranchCard
              key={branch.id}
              branch={branch}
              onSelect={onSelectBranch}
            />
          ))}
        </div>
      )}

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

