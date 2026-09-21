"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";

interface ConversationItem {
  id: string;
  name: string;
  role?: string;
  preview: string;
  avatarUrl?: string;
  initials?: string;
  hasCheck?: boolean;
}

const CONVERSATIONS: ConversationItem[] = [
  {
    id: "conv-1",
    name: "Insert title here",
    preview: "Kindly offer a detailed narrative in this section.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "conv-2",
    name: "Insert title here",
    preview: "Please present a full description in this area.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "conv-3",
    name: "Insert title here",
    preview: "It would be great to have an in-depth description provided here.",
    initials: "JB",
  },
  {
    id: "conv-4",
    name: "Insert title here",
    preview: "I'm looking for an extensive outline here.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "conv-5",
    name: "Insert title here",
    role: "Administer",
    preview: "Please give a complete account of the topic here.",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    hasCheck: true,
  },
  {
    id: "conv-6",
    name: "Insert title here",
    role: "Manager",
    preview: "I would appreciate a thorough explanation in this space.",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "conv-7",
    name: "Insert title here",
    role: "Sales man",
    preview: "Could you share a comprehensive overview here?",
    avatarUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
  },
];

interface EmployeeChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConversation?: (id: string) => void;
}

export const EmployeeChatPopup: React.FC<EmployeeChatPopupProps> = ({
  isOpen,
  onClose,
  onSelectConversation,
}) => {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filtered = CONVERSATIONS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.preview.toLowerCase().includes(search.toLowerCase()) ||
      (c.role && c.role.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      {/* Backdrop for closing */}
      <div
        className="fixed inset-0 z-40 bg-black/10 backdrop-blur-2xs"
        onClick={onClose}
      />

      {/* Floating Popup Card (Matching Image 2 Popup) */}
      <div className="absolute right-0 top-14 z-50 w-76 sm:w-80 bg-white rounded-3xl border border-neutral-200 shadow-2xl p-4 flex flex-col max-h-130 animate-in fade-in slide-in-from-top-2 duration-150">
        {/* Header / Search input */}
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
          <div className="relative flex-1">
            <Search className="size-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversation"
              className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50/80 border border-neutral-200/90 rounded-xl placeholder:text-neutral-400 text-neutral-800 focus:bg-white focus:outline-none focus:border-sky-500"
              autoFocus
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pt-2 pr-0.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectConversation?.(item.id);
                onClose();
              }}
              className="flex items-start gap-2.5 p-2 rounded-2xl hover:bg-neutral-50 transition-colors cursor-pointer group"
            >
              {/* Avatar */}
              <div className="size-9 rounded-full overflow-hidden shrink-0 relative bg-neutral-200 flex items-center justify-center">
                {item.avatarUrl ? (
                  <Image
                    src={item.avatarUrl}
                    alt={item.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold text-neutral-600">
                    {item.initials || "JB"}
                  </span>
                )}
                {item.hasCheck && (
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-sky-500 border border-white" />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-neutral-900 group-hover:text-sky-600 truncate">
                    {item.name}
                  </span>
                  {item.role && (
                    <span className="text-[10px] text-neutral-500 font-medium bg-neutral-100 px-1.5 py-0.5 rounded-md">
                      {item.role}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 leading-tight line-clamp-2 mt-0.5">
                  {item.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EmployeeChatPopup;
