"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Topbar } from "../Topbar";
import { EmotionSnapshot } from "../ui/EmotionSnapshot";
import { ChatPanel, type ChatMessage } from "../ui/ChatPanel";
import { EMOTION_COLORS } from "@/lib/data";
import type { SessionState } from "@/types";

const statusMap: Record<SessionState, string> = {
  idle: "Ready",
  listening: "Listening",
  thinking: "Thinking",
  responding: "Responding",
};

export function LiveSession() {
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [emotionTag, setEmotionTag] = useState<string | null>(null);
  const [emotionConfidence, setEmotionConfidence] = useState<number | null>(null);
  const [snapshot, setSnapshot] = useState<{
    tone: string;
    tonePct: number;
    words: string;
    wordsPct: number;
    face: string;
    facePct: number;
    combined: string;
    combinedPct: number;
    faceColor?: string;
  } | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addMessage = useCallback((role: "user" | "nearu", text: string, follow?: string) => {
    setMessages((m) => [...m, { role, text, follow }]);
  }, []);

  const cycleSession = useCallback(() => {
    if (sessionState === "idle") {
      setSessionState("listening");
      setEmotionTag(null);
      setEmotionConfidence(null);
      setSnapshot(null);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSessionState("thinking");
        timeoutRef.current = setTimeout(() => {
          setSessionState("responding");
          setEmotionTag("Happy");
          setEmotionConfidence(85);
          setSnapshot({
            tone: "Happy",
            tonePct: 90,
            words: "Happy",
            wordsPct: 80,
            face: "Surprised",
            facePct: 40,
            combined: "Happy",
            combinedPct: 85,
            faceColor: "#ec4899",
          });
          addMessage("user", "Hi Nearu, how are you?");
          timeoutRef.current = setTimeout(() => {
            addMessage(
              "nearu",
              "I'm doing wonderful, thank you for asking! It's great to hear from you. How is your day going so far?",
              "How is your day going so far?"
            );
            setSessionState("idle");
          }, 3200);
        }, 2000);
      }, 2800);
    } else if (sessionState === "listening") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setSessionState("thinking");
      timeoutRef.current = setTimeout(() => {
        setSessionState("responding");
        setEmotionTag("Happy");
        setEmotionConfidence(85);
        setSnapshot({
          tone: "Happy",
          tonePct: 90,
          words: "Happy",
          wordsPct: 80,
          face: "Surprised",
          facePct: 40,
          combined: "Happy",
          combinedPct: 85,
          faceColor: "#ec4899",
        });
        addMessage("user", "Hi Nearu, how are you?");
        timeoutRef.current = setTimeout(() => {
          addMessage(
            "nearu",
            "I'm doing wonderful, thank you for asking! It's great to hear from you. How is your day going so far?",
            "How is your day going so far?"
          );
          setSessionState("idle");
        }, 3200);
      }, 2000);
    }
  }, [sessionState, addMessage]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        cycleSession();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycleSession]);

  const ringClass =
    sessionState === "listening"
      ? "absolute inset-[-5px] rounded-full border-2.5 border-[#22c55e] pointer-events-none transition-[border-color] duration-300 animate-ring-pulse"
      : sessionState === "thinking"
        ? "absolute inset-[-5px] rounded-full border-2.5 border-[#3b82f6] pointer-events-none transition-[border-color] duration-300"
        : sessionState === "responding"
          ? "absolute inset-[-5px] rounded-full border-2.5 border-acc pointer-events-none transition-[border-color] duration-300"
          : "absolute inset-[-5px] rounded-full border-2.5 border-transparent pointer-events-none transition-[border-color] duration-300";

  const statusText =
    sessionState === "idle"
      ? "Press Space to start"
      : sessionState === "listening"
        ? "Nearu is listening..."
        : sessionState === "thinking"
          ? "Nearu is thinking..."
          : "Nearu is responding...";

  const showDots = sessionState === "listening" || sessionState === "responding";

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Topbar
        title="Live Session"
        subtitle=" — Session"
        statusLabel={statusMap[sessionState]}
        statusType={sessionState === "idle" ? "ready" : sessionState}
      />
      <div className="flex min-w-0 flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto p-4 min-w-0">
          <div className="flex flex-col items-center gap-3.5 rounded-rl border border-[#1a1a1a] bg-bg1 px-5 pb-5 pt-7 relative">
            <button
              type="button"
              className="absolute right-3 top-3 flex h-[26px] w-[26px] items-center justify-center rounded-md border border-bg4 bg-bg3 text-t2 text-[11px]"
              aria-label="Close"
            >
              <svg width={10} height={10} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="relative">
              <div className="relative h-[130px] w-[130px] overflow-hidden rounded-full border-2 border-bg4 bg-bg3">
                <Image
                  src="/nearu-avatar.png"
                  alt="Nearu avatar"
                  fill
                  className="object-cover"
                  sizes="130px"
                  priority
                />
              </div>
              <div className={ringClass} />
            </div>
            <div className="text-[13px] text-t2">
              {showDots && (
                <span className="mr-1 inline-flex gap-0.5 align-middle">
                  <span className="inline-block h-1 w-1 rounded-full bg-acc animate-[dots-bounce_0.8s_infinite]" />
                  <span className="inline-block h-1 w-1 rounded-full bg-acc animate-[dots-bounce_0.8s_infinite]" style={{ animationDelay: "0.15s" }} />
                  <span className="inline-block h-1 w-1 rounded-full bg-acc animate-[dots-bounce_0.8s_infinite]" style={{ animationDelay: "0.3s" }} />
                </span>
              )}
              {statusText}
            </div>
            <button
              type="button"
              onClick={cycleSession}
              className={`flex items-center gap-1.5 rounded-[24px] px-5 py-2 text-[13px] font-medium text-white transition-all duration-[0.14s] select-none ${
                sessionState === "listening"
                  ? "bg-[#ef4444]"
                  : "bg-acc hover:bg-acc2"
              }`}
            >
              <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
              </svg>
              <span>{sessionState === "listening" ? "Release to send" : "Talk to Nearu"}</span>
            </button>
          </div>
          <div className="flex items-center gap-2.5 rounded-rm border border-[#1a1a1a] bg-bg1 px-4 py-3">
            <span className="text-xs font-medium text-t2">Detected emotion</span>
            {emotionTag ? (
              <span
                className="rounded-[20px] px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  background: `${EMOTION_COLORS[emotionTag as keyof typeof EMOTION_COLORS]}26`,
                  color: EMOTION_COLORS[emotionTag as keyof typeof EMOTION_COLORS],
                }}
              >
                {emotionTag}
              </span>
            ) : (
              <span className="text-xs text-t3">Waiting for input...</span>
            )}
            {emotionConfidence != null && (
              <span className="text-xs text-t3">{emotionConfidence}% confidence</span>
            )}
          </div>
          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-t3">
              Quick Tools
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {[
                {
                  icon: "target",
                  color: "var(--acc)",
                  title: "Pitch Practice",
                  desc: "Refine clarity & presence",
                },
                {
                  icon: "users",
                  color: "#a78bfa",
                  title: "Difficult Conversations",
                  desc: "Navigate tension precisely",
                },
                {
                  icon: "chat",
                  color: "#38bdf8",
                  title: "Investor Q&A",
                  desc: "Practice tough questions",
                },
                {
                  icon: "heart",
                  color: "#ef4444",
                  title: "Heart-to-Heart",
                  desc: "Open emotional space",
                },
              ].map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="flex cursor-pointer flex-col rounded-rm border border-[#1e1e1e] bg-bg2 p-3 text-left transition-all duration-[0.14s] hover:border-bg4 hover:bg-bg3"
                >
                  <span className="mb-2.5 block h-[22px] w-[22px]" style={{ color: item.color }}>
                    {item.icon === "target" && (
                      <svg width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx={12} cy={12} r={10} />
                        <circle cx={12} cy={12} r={3} />
                        <line x1={12} y1={2} x2={12} y2={5} />
                        <line x1={12} y1={19} x2={12} y2={22} />
                        <line x1={2} y1={12} x2={5} y2={12} />
                        <line x1={19} y1={12} x2={22} y2={12} />
                      </svg>
                    )}
                    {item.icon === "users" && (
                      <svg width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx={9} cy={7} r={4} />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                    {item.icon === "chat" && (
                      <svg width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    )}
                    {item.icon === "heart" && (
                      <svg width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    )}
                  </span>
                  <div className="text-[13px] font-semibold text-t1">{item.title}</div>
                  <div className="text-[11px] text-t3">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-[256px] min-w-[256px] flex-col gap-3.5 overflow-y-auto border-l border-[#191919] bg-bg1 p-4 pl-3.5">
          <div>
            <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-t3">
              Emotion Snapshot
            </div>
            <div className="flex flex-col gap-2 rounded-rm bg-bg2 p-3">
              <EmotionSnapshot
                tone={snapshot?.tone as any || "Neutral"}
                tonePct={snapshot?.tonePct ?? 0}
                words={snapshot?.words as any || "Neutral"}
                wordsPct={snapshot?.wordsPct ?? 0}
                face={snapshot?.face as any || "Neutral"}
                facePct={snapshot?.facePct ?? 0}
                combinedLabel={snapshot?.combined}
                combinedPct={snapshot?.combinedPct}
                waiting={!snapshot}
              />
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <ChatPanel messages={messages} />
          </div>
        </div>
      </div>
    </div>
  );
}
