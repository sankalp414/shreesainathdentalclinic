// components/chat/RealtimeChatPanel.tsx
"use client";

import React, { useEffect, useState } from "react";
import Ably from "ably";

export function RealtimeChatPanel({ currentUserId }: { currentUserId: string }) {
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/conversations")
      .then((r) => r.json())
      .then(async (data) => {
        if (data.conversations && data.conversations.length > 0) {
          setConversations(data.conversations);
          setActiveConvId(data.conversations[0].conversation.id);
        } else {
          // Automatically provision authorized patient-doctor conversation if none exists
          const createRes = await fetch("/api/conversations", {
            method: "POST",
          });
          if (createRes.ok) {
            const created = await createRes.json();
            setActiveConvId(created.conversation.id);
          }
        }
      });
  }, []);

  useEffect(() => {
    if (!activeConvId) return;
    fetch(`/api/conversations/${activeConvId}/messages`)
      .then((r) => r.json())
      .then((d) => setMessages(d.messages || []));
  }, [activeConvId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !activeConvId) return;
    const res = await fetch(`/api/conversations/${activeConvId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    if (res.ok) {
      const data = await res.json();
      setMessages((prev) => [...prev, data.message]);
      setText("");
    }
  };

  return (
    <div className="rounded-3xl border border-brand-secondary bg-white shadow-card overflow-hidden">
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 text-xs text-amber-900">
        <strong>Clinical Notice:</strong> Patient–doctor chat is for non-emergency
        follow-up communication and does not replace an in-person clinical
        examination.
      </div>

      <div className="p-6 h-96 overflow-y-auto space-y-3 bg-brand-warm/40">
        {messages.map((m) => {
          const isMe = m.senderId === currentUserId;
          return (
            <div
              key={m.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md rounded-2xl px-4 py-2.5 text-xs ${
                  isMe
                    ? "bg-brand-primary text-white"
                    : "bg-white border border-brand-secondary text-brand-text"
                }`}
              >
                <p>{m.message}</p>
                <span className="mt-1 block text-[10px] opacity-70">
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={sendMessage}
        className="flex gap-3 border-t border-brand-secondary p-4 bg-white"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message to your doctor..."
          className="flex-1 rounded-xl border border-brand-secondary px-4 py-2.5 text-xs"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand-primary px-6 py-2.5 text-xs font-bold text-white"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}