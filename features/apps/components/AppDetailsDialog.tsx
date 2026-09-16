"use client";

import React from "react";
import { Check, Download, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { type DirectoryAppItem } from "../data/appsDirectoryData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AppDetailsDialogProps {
  app: DirectoryAppItem | null;
  onClose: () => void;
  onToggleInstall: (appId: string) => void;
}

export const AppDetailsDialog: React.FC<AppDetailsDialogProps> = ({
  app,
  onClose,
  onToggleInstall,
}) => {
  if (!app) return null;

  return (
    <Dialog
      open={Boolean(app)}
      onOpenChange={(open: boolean) => !open && onClose()}
    >
      <DialogContent className="sm:max-w-md rounded-2xl bg-white p-6">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-xl",
                app.bgClass
              )}
            >
              <Info className="size-6 stroke-[1.8]" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-neutral-900">
                {app.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-neutral-500">
                {app.categoryLabel} • {app.pricing}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-3 text-xs text-neutral-600 leading-relaxed">
          {app.description ||
            "Full-featured business module optimized for fast workflows and seamless reporting."}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="rounded-xl text-xs cursor-pointer"
          >
            Close
          </Button>
          <Button
            size="sm"
            onClick={() => onToggleInstall(app.id)}
            className={cn(
              "rounded-xl text-xs cursor-pointer font-medium",
              app.isInstalled
                ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                : "bg-[#0095FF] text-white hover:bg-sky-600"
            )}
          >
            {app.isInstalled ? (
              <>
                <Check className="size-3.5 mr-1.5" />
                Installed
              </>
            ) : (
              <>
                <Download className="size-3.5 mr-1.5" />
                Install Now
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
