"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { LiveSession } from "./screens/LiveSession";
import { OfflineAnalysis } from "./screens/OfflineAnalysis";
import { Sessions } from "./screens/Sessions";
import { FAQ } from "./screens/FAQ";
import { Settings } from "./screens/Settings";
import type { Screen } from "@/types";

export function AppShell() {
  const [activeScreen, setActiveScreen] = useState<Screen>("live");

  return (
    <div className="flex h-screen overflow-hidden bg-bg0">
      <Sidebar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
      />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {activeScreen === "live" && <LiveSession />}
        {activeScreen === "offline" && <OfflineAnalysis />}
        {activeScreen === "sessions" && <Sessions />}
        {activeScreen === "faq" && <FAQ />}
        {activeScreen === "settings" && <Settings />}
      </main>
    </div>
  );
}
