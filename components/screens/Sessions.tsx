"use client";

import { useState, useMemo } from "react";
import { Topbar } from "../Topbar";
import { SESSIONS_DATA, EMOTION_COLORS, ICON_SVG_MAP } from "@/lib/data";
import type { SessionRecord } from "@/types";

type Filter = "all" | "live" | "offline";

function SessionCard({ s }: { s: SessionRecord }) {
  const ec = EMOTION_COLORS[s.emotion] || "#6b7280";
  const iconSvg = ICON_SVG_MAP[s.icon] || ICON_SVG_MAP.target;
  const bars = [
    { lbl: "Tone", pct: s.tonePct, color: EMOTION_COLORS[s.tone] || "#6b7280" },
    { lbl: "Words", pct: s.wordsPct, color: EMOTION_COLORS[s.words] || "#6b7280" },
    { lbl: "Face", pct: s.facePct, color: EMOTION_COLORS[s.face] || "#6b7280" },
  ];

  return (
    <div className="flex cursor-pointer flex-col gap-2 rounded-rm border border-[#1e1e1e] bg-bg1 px-4 py-3.5 transition-all duration-[0.14s] hover:border-bg4 hover:bg-bg2">
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-rs text-[15px]"
          style={{ background: `${ec}20`, color: ec }}
          dangerouslySetInnerHTML={{ __html: iconSvg }}
        />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold text-t1">{s.title}</div>
          <div className="text-[11px] text-t3">{s.date}</div>
        </div>
        <span
          className="rounded-[20px] px-2.5 py-0.5 text-[11px] font-semibold"
          style={{ background: `${ec}18`, color: ec }}
        >
          {s.emotion}
        </span>
        <span className="ml-auto whitespace-nowrap text-[11px] text-t3">
          {s.duration}
        </span>
      </div>
      <div className="flex gap-2">
        {bars.map(({ lbl, pct, color }) => (
          <div key={lbl} className="flex flex-1 items-center gap-1">
            <span className="w-[34px] text-[10px] font-semibold uppercase tracking-wider text-t3">
              {lbl}
            </span>
            <div className="flex-1 overflow-hidden rounded-sm bg-bg4" style={{ height: 3 }}>
              <div
                className="h-full rounded-sm"
                style={{ width: `${Math.round(pct)}%`, background: color }}
              />
            </div>
            <span className="w-7 text-right text-[10px] text-t3">
              {Math.round(pct)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sessions() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = useMemo(
    () =>
      filter === "all"
        ? SESSIONS_DATA
        : SESSIONS_DATA.filter((s) => s.type === filter),
    [filter]
  );

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Topbar title="Sessions" subtitle=" — History" />
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5">
        <div className="mb-1 flex flex-wrap gap-2">
          {(["all", "live", "offline"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-[20px] border px-3.5 py-1 text-xs font-medium transition-all duration-[0.13s] ${
                filter === f
                  ? "border-acc bg-acc text-white"
                  : "border-bg4 bg-bg2 text-t2 hover:text-t1"
              }`}
            >
              {f === "all" ? "All" : f === "live" ? "Live Sessions" : "Offline Analysis"}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-10 py-10 text-[13px] text-t3">
            <svg
              width={32}
              height={32}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="text-t3"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            <span>No sessions found</span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((s) => (
              <SessionCard key={s.id} s={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
