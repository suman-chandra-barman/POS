"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Link as LinkIcon,
  Pin,
  Plus,
  Send,
  FileText,
  Download,
} from "lucide-react";
import { EmployeeChatPopup } from "./EmployeeChatPopup";

interface ChatMessage {
  id: string;
  sender: string;
  role: string;
  time: string;
  avatarUrl?: string;
  avatarIcon?: boolean;
  content?: string;
  isBubble?: boolean;
  isDateDivider?: boolean;
  attachment?: {
    name: string;
    size: string;
  };
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "Flores, Juanita",
    role: "Sales man",
    time: "07:12 pm",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    content: "Could you provide a detailed overview of this subject?",
    isBubble: true,
  },
  {
    id: "msg-2",
    sender: "Flores, Juanita",
    role: "Sales man",
    time: "07:12 pm",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    content: "Would you be able to share a comprehensive summary of this topic?",
    isBubble: true,
  },
  {
    id: "msg-3",
    sender: "Henry, Arthur",
    role: "Administer",
    time: "07:12 pm",
    avatarIcon: true,
    content: "Could you present a full description of the subject matter?",
  },
  {
    id: "msg-4",
    sender: "Henry, Arthur",
    role: "Administer",
    time: "07:12 pm",
    avatarIcon: true,
    content: "Can you give an in-depth account of this topic?",
  },
  {
    id: "divider-1",
    sender: "",
    role: "",
    time: "",
    content: "Today May 12, 2026",
    isDateDivider: true,
  },
  {
    id: "msg-5",
    sender: "Henry, Arthur",
    role: "Administer",
    time: "07:12 pm",
    avatarIcon: true,
    content: "Can you provide a detailed explanation of this subject?",
  },
  {
    id: "msg-6",
    sender: "Flores, Juanita",
    role: "Sales man",
    time: "07:12 pm",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    content: "Would you mind offering a thorough summary of this topic?",
    isBubble: true,
  },
  {
    id: "msg-7",
    sender: "Henry, Arthur",
    role: "Administer",
    time: "07:12 pm",
    avatarIcon: true,
    attachment: {
      name: "my-cv.pdf",
      size: "60 KB of 120 KB",
    },
  },
];

interface EmployeeChatFeedProps {
  employeeName?: string;
}

export const EmployeeChatFeed: React.FC<EmployeeChatFeedProps> = ({
  employeeName = "Henry, Arthur",
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: employeeName,
      role: "Sales Person",
      time: "Just now",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      content: text,
      isBubble: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  return (
    <div className="relative w-full bg-white rounded-3xl border border-neutral-200/90 shadow-xs flex flex-col h-[calc(100vh-140px)] min-h-175 overflow-hidden">
      {/* ── 1. CHAT HEADER (Matching Image 2) ── */}
      <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between shrink-0">
        {/* Left: Avatar + Name + Sublabel */}
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-full overflow-hidden relative border border-neutral-200 bg-neutral-100">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
              alt={employeeName}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-bold text-neutral-900">
              {employeeName}
            </span>
            <span className="text-[11px] text-neutral-400 font-normal">
              (Sublabel)
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 text-neutral-500">
          <button
            type="button"
            aria-label="Search messages"
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Attach link"
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
          >
            <LinkIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsPopupOpen((prev) => !prev)}
            aria-label="Toggle conversations popup"
            title="Conversations Popup"
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-sky-600 transition-colors cursor-pointer relative"
          >
            <Pin className="size-4" />
            <span className="absolute top-1 right-1 size-1.5 rounded-full bg-sky-500" />
          </button>
        </div>
      </div>

      {/* Floating Popup (Triggered by pin/conversation icon) */}
      <EmployeeChatPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />

      {/* ── 2. MESSAGE FEED (Matching Image 2) ── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg) => {
          if (msg.isDateDivider) {
            return (
              <div
                key={msg.id}
                className="flex items-center justify-center py-2"
              >
                <span className="text-[11px] font-medium text-neutral-400 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-100">
                  {msg.content}
                </span>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex items-start gap-2.5">
              {/* Avatar */}
              <div className="size-8 rounded-full overflow-hidden shrink-0 relative bg-neutral-100 flex items-center justify-center">
                {msg.avatarUrl ? (
                  <Image
                    src={msg.avatarUrl}
                    alt={msg.sender}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                ) : (
                  <div className="size-full bg-indigo-600 flex items-center justify-center text-white">
                    {/* Stylized asterisk/flower icon matching Arthur Henry's purple avatar */}
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-xs font-bold text-neutral-900">
                    {msg.sender}
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    {msg.role} • {msg.time}
                  </span>
                </div>

                {/* Bubble or Text */}
                {msg.isBubble ? (
                  <div className="inline-block max-w-lg bg-sky-50/80 border border-sky-200/70 rounded-2xl rounded-tl-xs px-3.5 py-2 text-xs text-neutral-800 leading-relaxed shadow-2xs">
                    {msg.content}
                  </div>
                ) : msg.attachment ? (
                  /* Attachment Card (Matching Image 2 my-cv.pdf) */
                  <div className="max-w-md bg-white border border-neutral-200 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="size-8 rounded-lg bg-rose-50 border border-rose-200/80 flex items-center justify-center shrink-0">
                        <FileText className="size-4 text-rose-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-neutral-900 truncate">
                          {msg.attachment.name}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          {msg.attachment.size} •
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Download attachment"
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      <Download className="size-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    {msg.content}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 3. CHAT INPUT (Matching Image 2) ── */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-white border-t border-neutral-100 flex items-center gap-2 shrink-0"
      >
        {/* Plus Button */}
        <button
          type="button"
          aria-label="Add attachment"
          className="size-9 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-2xs"
        >
          <Plus className="size-4.5" />
        </button>

        {/* Input */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Massage... #important @slyam"
          className="flex-1 h-9.5 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:border-sky-500 focus:outline-none transition-all"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim()}
          aria-label="Send message"
          className="size-9 rounded-xl bg-neutral-100 hover:bg-sky-500 hover:text-white disabled:opacity-40 disabled:hover:bg-neutral-100 disabled:hover:text-neutral-400 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-2xs"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
};

export default EmployeeChatFeed;
