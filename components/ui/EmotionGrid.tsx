"use client";

import { EMOTION_COLORS } from "@/lib/data";
import type { EmotionData, EmotionLabel } from "@/types";

interface EmotionGridProps {
  data: EmotionData;
}

const channels: {
  ch: string;
  pctKey: "voicePct" | "wordsPct" | "facePct" | "combinedPct";
  emotionKey: "voice" | "words" | "face" | "combined";
}[] = [
  { ch: "VOICE", pctKey: "voicePct", emotionKey: "voice" },
  { ch: "WORDS", pctKey: "wordsPct", emotionKey: "words" },
  { ch: "FACE", pctKey: "facePct", emotionKey: "face" },
  { ch: "COMBINED", pctKey: "combinedPct", emotionKey: "combined" },
];

export function EmotionGrid({ data }: EmotionGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {channels.map(({ ch, pctKey, emotionKey }) => {
        const pct = data[pctKey];
        const emotion = data[emotionKey] as EmotionLabel;
        const color =
          emotionKey === "combined"
            ? data.color || EMOTION_COLORS[emotion]
            : EMOTION_COLORS[emotion] || "#6b7280";
        const isCombined = emotionKey === "combined";
        return (
          <div
            key={ch}
            className="rounded-[10px] px-3.5 py-3"
            style={{
              background: isCombined ? "#222222" : "#181818",
              ...(isCombined ? { border: "1px solid #2a2a2a" } : {}),
            }}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#555555]">
                {ch}
              </span>
              <span
                className="text-[18px] font-bold"
                style={{ color }}
              >
                {Math.round(pct)}%
              </span>
            </div>
            <div className="mb-2 text-xs text-[#a0a0a0]">{emotion}</div>
            <div className="h-[3px] overflow-hidden rounded-sm bg-[#2a2a2a]">
              <div
                className="h-full rounded-sm transition-[width] duration-300"
                style={{
                  width: `${Math.round(pct)}%`,
                  background: color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
