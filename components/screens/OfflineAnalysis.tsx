"use client";

import { useState, useRef, useEffect } from "react";
import { Topbar } from "../Topbar";
import { EmotionBarsVertical } from "../ui/EmotionBarsVertical";
import { TimelineView } from "./offline/TimelineView";
import { EmotionGrid } from "../ui/EmotionGrid";
import { StackedEmotionChart } from "../ui/StackedEmotionChart";
import { VideoPlayer } from "../ui/VideoPlayer";
import { DEMO_EMOTION_DATA } from "@/lib/data";
import type { AnalysisStage } from "@/types";

const STEPS = [
  "Extracting audio tracks",
  "Analyzing acoustic emotion",
  "Processing facial expressions",
  "Fusing emotion signals",
];
const STEP_DELAYS = [0, 1400, 2800, 4000];
const STEP_DONE_DELAY = 1100;
const TOTAL_PROCESS_MS = 5400;

export function OfflineAnalysis() {
  const [stage, setStage] = useState<AnalysisStage>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [activeStep, setActiveStep] = useState(-1);
  const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set());
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [playbackTab, setPlaybackTab] = useState<"tl" | "pb">("pb");
  const [emotionView, setEmotionView] = useState<"grid" | "bars">("grid");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
      setFileSize(`${(f.size / 1024 / 1024).toFixed(1)} MB`);
    }
  };

  const loadDemo = () => {
    setFile(null);
    setFileName("demo_interview_recording.mp4");
    setFileSize("76.5 MB (demo)");
  };

  const removeFile = () => {
    setFile(null);
    setFileName("");
    setFileSize("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startAnalysis = () => {
    setStage("processing");
    setActiveStep(-1);
    setDoneSteps(new Set());
    STEP_DELAYS.forEach((d, i) => {
      setTimeout(() => setActiveStep(i), d);
      setTimeout(() => setDoneSteps((s) => new Set(s).add(i)), d + STEP_DONE_DELAY);
    });
    setTimeout(() => {
      setStage("results");
      setCurrentDataIndex(0);
    }, TOTAL_PROCESS_MS);
  };

  const resetAnalysis = () => {
    setStage("upload");
    setFile(null);
    setFileName("");
    setFileSize("");
    setCurrentDataIndex(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const currentData = DEMO_EMOTION_DATA[currentDataIndex] ?? DEMO_EMOTION_DATA[0];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Topbar
        title="Video Analysis"
        subtitle=" — Upload"
        statusLabel="Ready"
        statusType="ready"
      />
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
        {stage === "upload" && (
          <div className="rounded-rl border border-[#1e1e1e] bg-bg1 p-6">
            <div className="mb-1 text-sm font-semibold text-t1">
              Analyze a video recording
            </div>
            <div className="mb-4 text-xs text-t3">
              Upload a video file to run emotion analysis across voice, facial
              expressions, and language.
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-rs bg-acc px-4 py-2 text-[13px] font-medium text-white transition-colors duration-[0.14s] hover:bg-acc2"
              >
                <svg
                  width={14}
                  height={14}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
                Upload video
              </button>
              <button
                type="button"
                onClick={loadDemo}
                className="rounded-rs border border-bg4 bg-bg2 px-4 py-2 text-[13px] font-medium text-t1 transition-colors duration-[0.14s] hover:bg-bg3"
              >
                Try demo file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
            <div className="mt-2.5 text-[11px] text-t3">
              Supports MP4, MOV, WebM — up to 500 MB
            </div>
            {(fileName || file) && (
              <>
                <div className="mt-3.5 flex items-center gap-3 rounded-rm border border-[#1e1e1e] bg-bg2 px-3.5 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-rs bg-bg3">
                    <svg
                      width={16}
                      height={16}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className="text-acc"
                    >
                      <rect x={3} y={3} width={18} height={14} rx={2} />
                      <path d="M7 21h10M12 17v4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-t1">
                      {fileName}
                    </div>
                    <div className="text-[11px] text-t3">{fileSize}</div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="ml-auto rounded-md px-2 py-1 text-[11px] text-t3 transition-colors duration-[0.14s] hover:bg-bg4 hover:text-t1"
                  >
                    Remove
                  </button>
                </div>
                <button
                  type="button"
                  onClick={startAnalysis}
                  className="mt-3.5 rounded-rs bg-acc px-5 py-2 text-[13px] font-medium text-white transition-colors duration-[0.14s] hover:bg-acc2"
                >
                  Run Analysis →
                </button>
              </>
            )}
          </div>
        )}

        {stage === "processing" && (
          <div className="flex flex-col items-center gap-3.5 rounded-rl border border-[#1e1e1e] bg-bg1 px-6 py-9">
            <div
              className="h-[30px] w-[30px] rounded-full border-2 border-bg4 border-t-acc animate-spin-slow"
              style={{ borderTopColor: "var(--acc)" }}
            />
            <div className="text-sm font-semibold text-t1">
              Analyzing your video...
            </div>
            <div className="text-xs text-t3">
              This usually takes 10–30 seconds
            </div>
            <div className="mt-1.5 flex max-w-[260px] flex-col gap-1.5">
              {STEPS.map((label, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 text-xs ${
                    doneSteps.has(i) ? "text-t3" : activeStep === i ? "text-t2" : "text-t3"
                  }`}
                >
                  <div
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      doneSteps.has(i)
                        ? "bg-[#22c55e]"
                        : activeStep === i
                          ? "bg-acc"
                          : "bg-bg4"
                    }`}
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>
        )}

        {stage === "results" && (
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center gap-2 rounded-rm border border-[#1a1a1a] bg-bg1 px-3.5 py-2.5">
              <svg
                width={14}
                height={14}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="shrink-0 text-acc"
              >
                <rect x={3} y={3} width={18} height={14} rx={2} />
              </svg>
              <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-semibold text-t1">
                {fileName || "demo_video.mp4"}
              </span>
              <span className="whitespace-nowrap text-[11px] text-t3">
                76.5s · 766 data points
              </span>
              <div className="flex gap-0.5 rounded-md bg-bg2 p-0.5">
                <button
                  type="button"
                  onClick={() => setPlaybackTab("tl")}
                  className={`rounded-[5px] px-3 py-1 text-xs font-medium transition-all duration-[0.13s] ${
                    playbackTab === "tl"
                      ? "bg-bg4 text-t1"
                      : "bg-transparent text-t2"
                  }`}
                >
                  Timeline
                </button>
                <button
                  type="button"
                  onClick={() => setPlaybackTab("pb")}
                  className={`rounded-[5px] px-3 py-1 text-xs font-medium transition-all duration-[0.13s] ${
                    playbackTab === "pb"
                      ? "bg-bg4 text-t1"
                      : "bg-transparent text-t2"
                  }`}
                >
                  Playback
                </button>
              </div>
              <button
                type="button"
                onClick={resetAnalysis}
                className="whitespace-nowrap rounded-rs border border-bg4 bg-bg2 px-3 py-1.5 text-xs text-t1"
              >
                ← New Analysis
              </button>
            </div>
            {playbackTab === "tl" ? (
              <TimelineView />
            ) : (
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3">
                <VideoPlayer
                  totalDurationSec={76}
                  demoData={DEMO_EMOTION_DATA}
                  onTimeUpdate={(dataIndex) => setCurrentDataIndex(dataIndex)}
                />
              </div>
              <div className="col-span-2 rounded-rm border border-[#1a1a1a] bg-bg1 p-3.5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-[13px] font-semibold text-t1">
                    Current Emotions
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-t3 font-mono">
                      {(() => {
                        const totalSec = Math.round(
                          (currentDataIndex / Math.max(1, DEMO_EMOTION_DATA.length - 1)) * 76
                        );
                        const m = Math.floor(totalSec / 60);
                        const s = totalSec % 60;
                        return `${m}:${String(s).padStart(2, "0")}`;
                      })()}
                    </span>
                    <button
                      type="button"
                      onClick={() => setEmotionView("grid")}
                      className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[#222222] ${
                        emotionView === "grid" ? "bg-bg4 text-t1" : "bg-transparent text-[#555555]"
                      }`}
                      aria-label="Grid view"
                    >
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <rect x={3} y={3} width={7} height={7} />
                        <rect x={14} y={3} width={7} height={7} />
                        <rect x={3} y={14} width={7} height={7} />
                        <rect x={14} y={14} width={7} height={7} />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmotionView("bars")}
                      className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[#222222] ${
                        emotionView === "bars" ? "bg-bg4 text-t1" : "bg-transparent text-[#555555]"
                      }`}
                      aria-label="Bars view"
                    >
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <rect x={3} y={12} width={4} height={9} />
                        <rect x={10} y={7} width={4} height={14} />
                        <rect x={17} y={4} width={4} height={17} />
                      </svg>
                    </button>
                  </div>
                </div>
                {emotionView === "grid" ? (
                  <EmotionGrid data={currentData} />
                ) : (
                  <EmotionBarsVertical data={currentData} />
                )}
              </div>
              <div className="col-span-5">
                <StackedEmotionChart />
              </div>
            </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
