"use client";

import { EMOTION_COLORS } from "@/lib/data";
import type { EmotionData, EmotionLabel } from "@/types";

interface EmotionBarsProps {
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

export function EmotionBars({ data }: EmotionBarsProps) {
  return (
    <div className="grid h-[130px] grid-cols-4 items-end gap-1.5">
      {channels.map(({ ch, pctKey, emotionKey }) => {
        const pct = data[pctKey];
        const emotion = data[emotionKey] as EmotionLabel;
        const barColor = emotionKey === "combined" ? (data.color || EMOTION_COLORS[emotion]) : EMOTION_COLORS[emotion] || "#6b7280";
        return (
          <div
            key={ch}
            className="flex h-full flex-col items-center gap-1"
          >
            <div className="flex flex-1 w-full items-end justify-center">
              <div
                className="w-[34px] rounded-t transition-[height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  height: `${Math.round(pct)}%`,
                  background: `${barColor}26`,
                  border: `1.5px solid ${barColor}`,
                }}
              />
            </div>
            <span
              className="text-[11px] font-bold text-center"
              style={{ color: barColor }}
            >
              {Math.round(pct)}%
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-t3 text-center">
              {emotion}
            </span>
            <span className="text-[9px] text-t3 text-center">{ch}</span>
          </div>
        );
      })}
    </div>
  );
}
