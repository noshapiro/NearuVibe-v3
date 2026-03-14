"use client";

type StatusType = "ready" | "listening" | "thinking" | "responding";

interface StatusBadgeProps {
  label: string;
  statusType?: StatusType;
}

const dotColors: Record<StatusType, string> = {
  ready: "#555555",
  listening: "#22c55e",
  thinking: "#3b82f6",
  responding: "#22c55e",
};

export function StatusBadge({ label, statusType = "ready" }: StatusBadgeProps) {
  const dotColor = dotColors[statusType];
  const pulseDuration = statusType === "thinking" ? "1s" : "1.5s";
  const isPulse = statusType === "listening" || statusType === "thinking";

  return (
    <div className="flex items-center gap-1.5 rounded-[20px] border border-bg4 bg-bg2 px-3 py-1 text-xs font-medium text-t2">
      <div
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{
          background: dotColor,
          animation: isPulse ? `pulse-dot ${pulseDuration} infinite` : undefined,
        }}
      />
      <span>{label}</span>
    </div>
  );
}
