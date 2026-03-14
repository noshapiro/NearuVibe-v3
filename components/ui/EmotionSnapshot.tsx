"use client";

import { EMOTION_COLORS } from "@/lib/data";
import type { EmotionLabel } from "@/types";

interface SnapshotRow {
  key: string;
  label: string;
  emotion: EmotionLabel;
  pct: number;
}

interface EmotionSnapshotProps {
  tone: EmotionLabel;
  tonePct: number;
  words: EmotionLabel;
  wordsPct: number;
  face: EmotionLabel;
  facePct: number;
  combinedLabel?: string;
  combinedPct?: number;
  waiting?: boolean;
}

export function EmotionSnapshot({
  tone,
  tonePct,
  words,
  wordsPct,
  face,
  facePct,
  combinedLabel,
  combinedPct = 0,
  waiting = true,
}: EmotionSnapshotProps) {
  const rows: SnapshotRow[] = [
    { key: "tone", label: "Tone", emotion: tone, pct: tonePct },
    { key: "words", label: "Words", emotion: words, pct: wordsPct },
    { key: "face", label: "Face", emotion: face, pct: facePct },
  ];

  const mainLabel = waiting ? "Waiting..." : combinedLabel || "—";
  const mainColor = waiting ? "var(--t3)" : (combinedLabel && EMOTION_COLORS[combinedLabel as EmotionLabel]) || "var(--t3)";

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-t3">
        This Session
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: mainColor }}
        />
        <span className="text-sm font-semibold text-t1">{mainLabel}</span>
        {!waiting && combinedPct > 0 && (
          <span className="ml-auto text-xs text-t2">{combinedPct}%</span>
        )}
      </div>
      {rows.map(({ key, label, emotion, pct }) => (
        <div key={key} className="flex items-center gap-1.5">
          <span className="w-11 shrink-0 text-[10px] font-medium uppercase tracking-wider text-t3">
            {label}
          </span>
          <div className="flex-1 overflow-hidden rounded-sm bg-bg4" style={{ height: 3 }}>
            <div
              className="h-full rounded-sm transition-[width] duration-500"
              style={{
                width: `${pct}%`,
                background: waiting ? "var(--t3)" : (EMOTION_COLORS[emotion] || "var(--t3)"),
              }}
            />
          </div>
          <span className="w-10 text-right text-[10px] text-t3">
            {waiting ? "—" : emotion}
          </span>
        </div>
      ))}
    </div>
  );
}
