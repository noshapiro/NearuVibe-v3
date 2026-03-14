"use client";

import { StatusBadge } from "./ui/StatusBadge";

type StatusType = "ready" | "listening" | "thinking" | "responding";

interface TopbarProps {
  title: string;
  subtitle?: string;
  statusLabel?: string;
  statusType?: StatusType;
}

export function Topbar({
  title,
  subtitle,
  statusLabel,
  statusType = "ready",
}: TopbarProps) {
  return (
    <header className="flex h-[52px] shrink-0 items-center gap-2.5 border-b border-[#191919] px-5">
      <span className="text-[15px] font-semibold text-t1">{title}</span>
      {subtitle != null && (
        <span className="text-sm font-normal text-t3">{subtitle}</span>
      )}
      <div className="ml-auto flex items-center gap-2">
        {statusLabel != null && (
          <StatusBadge label={statusLabel} statusType={statusType} />
        )}
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-rs text-t2 transition-colors duration-[0.14s] hover:bg-bg2"
          aria-label="Search"
        >
          <svg
            width={16}
            height={16}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx={11} cy={11} r={8} />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </div>
    </header>
  );
}
