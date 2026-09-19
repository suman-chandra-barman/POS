"use client";

import React, { useState } from "react";
import { FileText, Save, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PosNoteDialogProps {
  isOpen: boolean;
  initialNote: string;
  onSaveNote: (note: string) => void;
  onClose: () => void;
}

const QUICK_NOTE_SUGGESTIONS = [
  "Gift receipt requested",
  "Special discount applied",
  "Handle with care (Fragile)",
  "Store pick-up later",
  "Customer loyalty member",
];

export const PosNoteDialog: React.FC<PosNoteDialogProps> = ({
  isOpen,
  initialNote,
  onSaveNote,
  onClose,
}) => {
  const [noteText, setNoteText] = useState(initialNote);
  const [prevInitialNote, setPrevInitialNote] = useState(initialNote);

  if (initialNote !== prevInitialNote) {
    setPrevInitialNote(initialNote);
    setNoteText(initialNote);
  }

  const handleSave = () => {
    onSaveNote(noteText.trim());
    onClose();
  };

  const handleClear = () => {
    setNoteText("");
    onSaveNote("");
    onClose();
  };

  const handleAddQuickTag = (tag: string) => {
    setNoteText((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return tag;
      if (trimmed.includes(tag)) return trimmed;
      return `${trimmed}, ${tag}`;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-neutral-200">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
              <FileText className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-neutral-900">
                Order Note
              </DialogTitle>
              <DialogDescription className="text-xs text-neutral-500">
                Add special instructions or comments for this receipt.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <label htmlFor="order-note-input" className="sr-only">
            Order Note Content
          </label>
          <textarea
            id="order-note-input"
            rows={4}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Type customer or order notes here..."
            className="w-full p-3 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all resize-none"
            autoFocus
          />

          {/* Quick Tags */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
              Quick Suggestions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_NOTE_SUGGESTIONS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleAddQuickTag(tag)}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium transition-colors cursor-pointer"
                >
                  +{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between pt-2 border-t border-neutral-100">
          <div>
            {noteText && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="size-3.5" />
                <span>Clear Note</span>
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs cursor-pointer rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              className="bg-[#0080ff] hover:bg-[#0070e0] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="size-3.5" />
              <span>Save Note</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PosNoteDialog;
