"use client";

import { useState } from "react";
import { Topbar } from "../Topbar";
import { Toggle } from "../ui/Toggle";

export function Settings() {
  const [avatarEnabled, setAvatarEnabled] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);
  const [ttsVoice, setTtsVoice] = useState("nova");

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Topbar title="Settings" />
      <div className="flex flex-1 justify-center overflow-y-auto px-5 py-7">
        <div className="flex w-full max-w-[640px] flex-col gap-3.5">
          <div className="mb-1 text-xl font-semibold text-t1">Settings</div>
          <div className="rounded-rm border border-[#1e1e1e] bg-bg1 p-4">
            <div className="flex items-start justify-between gap-3.5">
              <div>
                <div className="mb-0.5 text-sm font-semibold text-t1">
                  Enable Avatar
                </div>
                <div className="text-xs text-t3 leading-normal">
                  Animated avatar with lip-synced speech via LiveAvatar. When
                  off, static image + OpenAI TTS is used.
                </div>
              </div>
              <Toggle
                checked={avatarEnabled}
                onChange={setAvatarEnabled}
                aria-label="Enable Avatar"
              />
            </div>
          </div>
          <div className="rounded-rm border border-[#1e1e1e] bg-bg1 p-4">
            <div className="mb-0.5 text-sm font-semibold text-t1">TTS Voice</div>
            <div className="mb-3 text-xs text-t3">
              OpenAI TTS voice for spoken responses.
            </div>
            <div className="flex items-center gap-2.5">
              <select
                value={ttsVoice}
                onChange={(e) => setTtsVoice(e.target.value)}
                className="w-[180px] cursor-pointer rounded-rs border border-bg4 bg-bg2 px-2.5 py-1.5 text-[13px] text-t1 outline-none"
              >
                <option value="nova">nova</option>
                <option value="alloy">alloy</option>
                <option value="echo">echo</option>
                <option value="fable">fable</option>
                <option value="onyx">onyx</option>
                <option value="shimmer">shimmer</option>
              </select>
              <button
                type="button"
                className="whitespace-nowrap rounded-rs border border-bg4 bg-bg2 px-3 py-1.5 text-xs text-t1 transition-colors duration-[0.13s] hover:bg-bg3"
              >
                ▶ Preview
              </button>
            </div>
          </div>
          <div className="rounded-rm border border-[#1e1e1e] bg-bg1 p-4">
            <div className="mb-0.5 text-sm font-semibold text-t1">
              Privacy & Memory
            </div>
            <div className="h-px bg-[#1a1a1a]" />
            <div className="flex items-center justify-between gap-3.5 py-3">
              <div className="text-[13px] font-medium text-t1">
                Save conversation history
              </div>
              <Toggle
                checked={saveHistory}
                onChange={setSaveHistory}
                aria-label="Save conversation history"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-rs border border-bg4 bg-bg2 px-3 py-1.5 text-xs text-t1 transition-colors duration-[0.13s] hover:bg-bg3"
              >
                Clear current session
              </button>
              <button
                type="button"
                className="rounded-rs border border-red-500/25 bg-red-500/10 px-3 py-1.5 text-xs text-[#ef4444] transition-colors duration-[0.13s] hover:bg-red-500/20"
              >
                Clear all memory
              </button>
            </div>
            <div className="mt-3 text-xs text-t3 leading-normal">
              Emotion signals are approximate and optional. Camera processing is
              local — webcam frames are never stored. Only transcripts and
              emotion summaries are saved.
            </div>
          </div>
          <div className="rounded-rm border border-[#1e1e1e] bg-bg1 p-4">
            <div className="mb-0.5 text-sm font-semibold text-t1">Access</div>
            <div className="h-px bg-[#1a1a1a]" />
            <button
              type="button"
              className="mt-3 rounded-rs border border-bg4 bg-bg2 px-3 py-1.5 text-xs text-t1 transition-colors duration-[0.13s] hover:bg-bg3"
            >
              Sign out (clear invite key)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
