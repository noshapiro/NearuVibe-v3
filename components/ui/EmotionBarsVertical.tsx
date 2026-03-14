"use client";

import { EMOTION_COLORS } from "@/lib/data";
import type { EmotionData, EmotionLabel } from "@/types";

interface EmotionBarsVerticalProps {
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

export function EmotionBarsVertical({ data }: EmotionBarsVerticalProps) {
  return (
    <div className="grid h-[180px] grid-cols-4 gap-2">
      {channels.map(({ ch, pctKey, emotionKey }) => {
        const pct = data[pctKey];
        const emotion = data[emotionKey] as EmotionLabel;
        const color =
          emotionKey === "combined"
            ? data.color || EMOTION_COLORS[emotion]
            : EMOTION_COLORS[emotion] || "#6b7280";
        return (
          <div key={ch} className="flex h-full flex-col items-center gap-1">
            <div className="flex min-h-0 flex-1 w-full items-end justify-center">
              <div
                className="w-full rounded-t-md transition-[height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  height: `${Math.round(pct)}%`,
                  background: `${color}33`,
                  border: `1.5px solid ${color}`,
                  borderRadius: "6px 6px 0 0",
                }}
              />
            </div>
            <span
              className="text-[15px] font-bold"
              style={{ color }}
            >
              {Math.round(pct)}%
            </span>
            <span className="text-[11px] text-[#a0a0a0]">{emotion}</span>
            <span className="text-[9px] font-medium uppercase tracking-wider text-[#555555]">
              {ch}
            </span>
          </div>
        );
      })}
    </div>
  );
}
