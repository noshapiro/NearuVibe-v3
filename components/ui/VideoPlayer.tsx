"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { EmotionData } from "@/types";

interface VideoPlayerProps {
  totalDurationSec?: number;
  demoData: EmotionData[];
  onTimeUpdate?: (dataIndex: number, progressPct: number) => void;
}

const SPEEDS = [1, 1.5, 2, 0.5];

export function VideoPlayer({
  totalDurationSec = 76,
  demoData,
  onTimeUpdate,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const speed = SPEEDS[speedIndex];
  const currentSec = Math.round((progress / 100) * totalDurationSec);
  const timeStr = `${Math.floor(currentSec / 60)}:${(currentSec % 60).toString().padStart(2, "0")}`;
  const totalStr = `01:${(totalDurationSec % 60).toString().padStart(2, "0")}`;

  const tick = useCallback(() => {
    setProgress((p) => {
      const next = p + (speed * 100) / (totalDurationSec * 10);
      if (next >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setPlaying(false);
        return 0;
      }
      const dataIndex = Math.min(
        Math.floor((next / 100) * demoData.length),
        demoData.length - 1
      );
      onTimeUpdate?.(dataIndex, next);
      return next;
    });
  }, [speed, totalDurationSec, demoData.length, onTimeUpdate]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(tick, 100);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [playing, tick]);

  const togglePlay = () => {
    setPlaying((p) => !p);
  };

  const cycleSpeed = () => {
    setSpeedIndex((i) => (i + 1) % SPEEDS.length);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setProgress(pct);
    const dataIndex = Math.min(Math.floor((pct / 100) * demoData.length), demoData.length - 1);
    onTimeUpdate?.(dataIndex, pct);
  };

  return (
    <div className="overflow-hidden rounded-rm border border-[#1a1a1a] bg-bg1">
      <div className="relative flex w-full flex-col items-center justify-center gap-2 bg-bg2 aspect-video">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bg3">
          <svg
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="text-t2"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
        <span className="text-[11px] text-t3">Video preview</span>
        <div className="absolute left-2 top-2 rounded bg-bg2 px-1.5 py-0.5 text-[10px] text-t3">
          {timeStr.replace(/^0/, "")} / 1:16
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-[#1a1a1a] px-3.5 py-2.5">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-acc text-white"
        >
          {playing ? (
            <svg width={9} height={9} fill="currentColor" viewBox="0 0 24 24">
              <rect x={6} y={4} width={4} height={16} />
              <rect x={14} y={4} width={4} height={16} />
            </svg>
          ) : (
            <svg width={9} height={9} fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
        <div
          className="relative h-1 flex-1 cursor-pointer rounded-sm bg-bg3"
          onClick={handleSeek}
          role="slider"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-sm bg-acc transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{ left: `${progress}%` }}
          />
        </div>
        <span className="min-w-[68px] text-right text-[10px] text-t3 tabular-nums">
          {timeStr} / {totalStr}
        </span>
        <button
          type="button"
          onClick={cycleSpeed}
          className="rounded bg-bg3 px-1.5 py-0.5 text-[10px] text-t2"
        >
          {speed}x
        </button>
      </div>
    </div>
  );
}
