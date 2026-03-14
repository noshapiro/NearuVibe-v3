"use client";

import { useState } from "react";

const EMOTION_COLORS: Record<string, string> = {
  Happy: "#f59e0b",
  Calm: "#38bdf8",
  Neutral: "#6b7280",
  Fearful: "#a78bfa",
  Angry: "#ef4444",
  Surprised: "#ec4899",
};

const DEMO_HEATMAP = {
  voice: [
    { e: "calm", v: 0.65 }, { e: "calm", v: 0.68 }, { e: "calm", v: 0.72 }, { e: "calm", v: 0.7 }, { e: "calm", v: 0.68 },
    { e: "angry", v: 0.75 }, { e: "angry", v: 0.82 }, { e: "angry", v: 0.78 }, { e: "calm", v: 0.72 }, { e: "calm", v: 0.74 },
    { e: "calm", v: 0.76 }, { e: "calm", v: 0.73 }, { e: "happy", v: 0.78 }, { e: "happy", v: 0.8 }, { e: "calm", v: 0.71 },
  ],
  words: [
    { e: "calm", v: 0.7 }, { e: "calm", v: 0.72 }, { e: "calm", v: 0.68 }, { e: "calm", v: 0.66 }, { e: "calm", v: 0.64 },
    { e: "calm", v: 0.55 }, { e: "calm", v: 0.58 }, { e: "calm", v: 0.6 }, { e: "calm", v: 0.68 }, { e: "calm", v: 0.72 },
    { e: "calm", v: 0.7 }, { e: "neutral", v: 0.58 }, { e: "neutral", v: 0.6 }, { e: "neutral", v: 0.58 }, { e: "calm", v: 0.65 },
  ],
  face: [
    { e: "surprised", v: 0.6 }, { e: "surprised", v: 0.55 }, { e: "calm", v: 0.62 }, { e: "calm", v: 0.65 }, { e: "calm", v: 0.63 },
    { e: "fearful", v: 0.68 }, { e: "fearful", v: 0.72 }, { e: "fearful", v: 0.7 }, { e: "happy", v: 0.65 }, { e: "happy", v: 0.68 },
    { e: "happy", v: 0.66 }, { e: "fearful", v: 0.72 }, { e: "fearful", v: 0.75 }, { e: "fearful", v: 0.7 }, { e: "calm", v: 0.65 },
  ],
};

const DEMO_TRANSCRIPT = [
  {
    id: 1,
    speaker: "A",
    start: "0:05",
    end: "0:18",
    text: "Hi, let's get started. I wanted to walk you through the proposal.",
    tags: [
      { label: "Introduction", color: "teal" },
      { label: "Agenda setting", color: "blue" },
    ],
    voice: { emotion: "Calm", pct: 74 },
    words: { emotion: "Calm", pct: 70 },
    face: { emotion: "Surprised", pct: 62 },
  },
  {
    id: 2,
    speaker: "B",
    start: "0:22",
    end: "0:35",
    text: "That's not what was agreed. We were very clear about the deadline.",
    tags: [
      { label: "Disagreement", color: "purple" },
      { label: "Deadline mentioned", color: "amber" },
      { label: "Escalation signal", color: "gray" },
    ],
    voice: { emotion: "Angry", pct: 82 },
    words: { emotion: "Calm", pct: 55 },
    face: { emotion: "Fearful", pct: 70 },
  },
  {
    id: 3,
    speaker: "A",
    start: "0:38",
    end: "0:51",
    text: "I hear you. Let me pull up the original timeline and we'll sort this out now.",
    tags: [
      { label: "De-escalation", color: "green" },
      { label: "Action mentioned", color: "teal" },
      { label: "Problem solving", color: "blue" },
    ],
    voice: { emotion: "Calm", pct: 76 },
    words: { emotion: "Calm", pct: 72 },
    face: { emotion: "Happy", pct: 68 },
  },
  {
    id: 4,
    speaker: "B",
    start: "0:54",
    end: "1:08",
    text: "Sure, yes. That sounds fine I suppose. Whatever works for the team.",
    tags: [
      { label: "Agreement", color: "green" },
      { label: "Low commitment", color: "gray" },
      { label: "Passive response", color: "purple" },
    ],
    voice: { emotion: "Happy", pct: 80 },
    words: { emotion: "Neutral", pct: 60 },
    face: { emotion: "Fearful", pct: 75 },
  },
];

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  blue: { bg: "rgba(56,189,248,0.12)", color: "#7dd3fc" },
  green: { bg: "rgba(34,197,94,0.12)", color: "#86efac" },
  purple: { bg: "rgba(167,139,250,0.14)", color: "#c4b5fd" },
  amber: { bg: "rgba(245,158,11,0.12)", color: "#fcd34d" },
  gray: { bg: "rgba(107,114,128,0.14)", color: "#9ca3af" },
  teal: { bg: "rgba(32,128,141,0.14)", color: "#5eead4" },
};

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function EmotionHeatmap() {
  const rows = [
    { key: "voice" as const, label: "Voice" },
    { key: "words" as const, label: "Words" },
    { key: "face" as const, label: "Face" },
  ];
  const legendEmotions = ["Calm", "Happy", "Angry", "Fearful", "Surprised", "Neutral"];

  return (
    <div className="rounded-2xl border border-[#1e1e1e] bg-bg1 px-[18px] py-3.5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-t1">Emotional Timeline</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
            <span className="text-[10px] text-[#555555]">Calm dominant</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
            <span className="text-[10px] text-[#555555]">1 conflict peak</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6b7280]" />
            <span className="text-[10px] text-[#555555]">766 points</span>
          </div>
        </div>
      </div>
      {rows.map(({ key, label }) => (
        <div key={key} className="mb-1.5 flex items-center gap-2">
          <span className="w-10 text-right text-[10px] font-semibold uppercase text-[#555555]">
            {label}
          </span>
          <div className="flex flex-1 gap-0.5">
            {DEMO_HEATMAP[key].map((cell, i) => {
              const emotionKey = cell.e.charAt(0).toUpperCase() + cell.e.slice(1);
              const hex = EMOTION_COLORS[emotionKey] || "#6b7280";
              const opacity = 0.15 + cell.v * 0.65;
              return (
                <div
                  key={i}
                  className="flex-1 cursor-pointer rounded-sm transition-transform hover:scale-y-[1.15]"
                  style={{
                    height: 18,
                    background: hexToRgba(hex, opacity),
                  }}
                  title={`${emotionKey} ${Math.round(cell.v * 100)}%`}
                />
              );
            })}
          </div>
        </div>
      ))}
      <div className="grid grid-cols-5 gap-2 pl-[48px] text-[9px] text-[#555555]">
        <span className="text-center">0:00</span>
        <span className="text-center">0:20</span>
        <span className="text-center">0:40</span>
        <span className="text-center">1:00</span>
        <span className="text-center">1:16</span>
      </div>
      <div className="flex flex-wrap gap-3 border-t border-[#1a1a1a] pt-2.5 pb-0.5">
        {legendEmotions.map((em) => (
          <div key={em} className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: EMOTION_COLORS[em] }}
            />
            <span className="text-[10px] text-[#555555]">{em}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimelineView() {
  const [currentTime, setCurrentTime] = useState(38);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const totalSec = 76;
  const currentSec = Math.round((currentTime / 100) * totalSec);
  const timeStr = `${Math.floor(currentSec / 60)}:${String(currentSec % 60).padStart(2, "0")}`;
  const totalStr = "1:16";

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setCurrentTime(pct);
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto">
      <section>
        <EmotionHeatmap />
      </section>

      <section className="flex items-center gap-2.5 rounded-xl border border-[#1e1e1e] bg-bg1 px-[18px] py-2.5">
        <svg
          width={14}
          height={14}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          className="shrink-0 text-acc"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <div
          className="relative h-1 flex-1 cursor-pointer rounded-sm bg-[#222222]"
          onClick={handleScrub}
          role="slider"
          aria-valuenow={currentTime}
        >
          <div
            className="h-full rounded-sm bg-acc transition-[width] duration-200"
            style={{ width: `${currentTime}%` }}
          />
          <div
            className="absolute top-[-3px] h-2.5 w-2.5 rounded-full bg-white transition-[left] duration-200"
            style={{ left: `calc(${currentTime}% - 5px)` }}
          />
        </div>
        <span className="min-w-[70px] text-right text-[11px] text-[#a0a0a0]">
          {timeStr} / {totalStr}
        </span>
      </section>

      <section className="flex flex-col gap-2">
        {DEMO_TRANSCRIPT.map((card) => {
          const isActive = activeCardId === card.id;
          const speakerColor = card.speaker === "A" ? "#38bdf8" : "#a78bfa";
          const speakerBg = card.speaker === "A" ? "rgba(56,189,248,0.1)" : "rgba(167,139,250,0.1)";
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveCardId(card.id)}
              className={`grid cursor-pointer grid-cols-[1fr_auto] gap-3 rounded-[10px] border border-[#1e1e1e] px-3.5 py-3 text-left transition-colors hover:bg-bg3 ${
                isActive ? "bg-bg3" : "bg-bg2"
              }`}
            >
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="rounded-[20px] px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{ background: speakerBg, color: speakerColor }}
                  >
                    Speaker {card.speaker}
                  </span>
                  <span className="text-[11px] text-[#555555]">
                    {card.start} – {card.end}
                  </span>
                </div>
                <p className="mb-2 text-[13px] leading-relaxed text-white">
                  {card.text}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="rounded-md px-2.5 py-0.5 text-[11px] font-medium"
                      style={{
                        background: TAG_STYLES[tag.color]?.bg ?? TAG_STYLES.gray.bg,
                        color: TAG_STYLES[tag.color]?.color ?? TAG_STYLES.gray.color,
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex w-[96px] flex-col justify-center gap-1.5">
                {[
                  { key: "V" as const, data: card.voice },
                  { key: "W" as const, data: card.words },
                  { key: "F" as const, data: card.face },
                ].map(({ key, data }) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className="w-2.5 text-[9px] font-semibold uppercase text-[#555555]">
                      {key}
                    </span>
                    <div className="flex-1 overflow-hidden rounded-sm bg-[#2a2a2a]" style={{ height: 3 }}>
                      <div
                        className="h-full rounded-sm transition-[width] duration-300"
                        style={{
                          width: `${data.pct}%`,
                          background: EMOTION_COLORS[data.emotion] ?? "#6b7280",
                        }}
                      />
                    </div>
                    <span
                      className="min-w-[42px] text-right text-[9px] font-semibold"
                      style={{ color: EMOTION_COLORS[data.emotion] ?? "#6b7280" }}
                    >
                      {data.emotion}
                    </span>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}
