"use client";

export interface ChatMessage {
  role: "user" | "nearu";
  text: string;
  follow?: string;
}

interface ChatPanelProps {
  messages: ChatMessage[];
  emptyLabel?: string;
}

export function ChatPanel({
  messages,
  emptyLabel = "Start talking to begin",
}: ChatPanelProps) {
  return (
    <div className="flex flex-1 flex-col min-h-0">
      <div className="mb-1.5 flex items-center gap-2">
        <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-bg3">
          <svg
            width={14}
            height={14}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="text-acc"
          >
            <rect x={3} y={8} width={18} height={12} rx={3} />
            <path d="M12 8V5M9 5h6M7 12h.01M17 12h.01M9 15h6" />
            <circle cx={12} cy={3} r={1} fill="currentColor" stroke="none" />
          </svg>
        </div>
        <span className="text-[13px] font-semibold text-t1">Chat with Nearu</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {messages.length === 0 ? (
          <span className="text-xs text-t3">{emptyLabel}</span>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[90%] rounded-rm px-2.5 py-2 text-xs leading-normal break-words ${
                m.role === "user"
                  ? "self-end rounded-br-sm bg-acc text-white"
                  : "self-start rounded-bl-sm bg-bg2 text-t1"
              }`}
            >
              {m.text}
              {m.follow && (
                <div className="mt-0.5 text-[10px] italic text-acc">{m.follow}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
