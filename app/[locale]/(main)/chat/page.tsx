"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center p-6 text-center pb-28">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 mb-3.5 shadow-xs border border-purple-100">
        <MessageSquare className="size-7 stroke-[1.8]" />
      </div>
      <h2 className="text-lg font-bold text-neutral-900">Conversations & Chat</h2>
      <p className="mt-1 text-xs text-neutral-500 max-w-sm">
        Connect with team members and customers directly within your workspace.
      </p>
    </div>
  );
}
