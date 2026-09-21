"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PosNoteDialogProps {
  isOpen: boolean;
  initialNote: string;
  onSaveNote: (note: string) => void;
  onClose: () => void;
}

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

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl rounded-3xl bg-white p-6 shadow-2xl border border-neutral-200/90 [&>button:last-child]:hidden">
        {/* Title (Matching Image 2) */}
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-bold text-neutral-900 tracking-tight text-left">
            Customer note
          </DialogTitle>
        </DialogHeader>

        {/* Textarea (Matching Image 2) */}
        <div className="py-2">
          <textarea
            rows={5}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your customer's words..."
            className="w-full h-36 p-4 text-sm rounded-xl border border-neutral-200 bg-white text-neutral-800 placeholder:text-neutral-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all resize-none"
            autoFocus
          />
        </div>

        {/* Footer Buttons (Matching Image 2) */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 h-11 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] active:bg-[#075985] text-white text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PosNoteDialog;
