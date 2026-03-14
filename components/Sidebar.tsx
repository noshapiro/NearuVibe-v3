"use client";

import Image from "next/image";
import { NavItem } from "./ui/NavItem";
import type { Screen } from "@/types";

interface SidebarProps {
  activeScreen: Screen;
  setActiveScreen: (s: Screen) => void;
}

const liveIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx={12} cy={12} r={3} />
    <path d="M12 2a10 10 0 0 1 10 10M12 2a10 10 0 0 0-10 10" />
  </svg>
);
const offlineIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x={3} y={3} width={18} height={14} rx={2} />
    <path d="M7 21h10M12 17v4" />
  </svg>
);
const sessionsIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
  </svg>
);
const faqIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx={12} cy={12} r={10} />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
  </svg>
);
const settingsIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx={12} cy={12} r={3} />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15z" />
  </svg>
);

export function Sidebar({ activeScreen, setActiveScreen }: SidebarProps) {
  return (
    <aside className="flex w-[188px] min-w-[188px] flex-col gap-0.5 border-r border-[#191919] bg-bg1 px-2 pb-3 pt-4">
      <div className="relative px-2.5 pb-3.5 pt-1">
        <Image
          src="/name.png"
          alt="Nearu"
          width={50}
          height={14}
          className="h-3.5 w-auto object-contain object-left"
          priority
        />
      </div>
      <div className="px-2.5 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-t3">
        WORKSPACE
      </div>
      <NavItem
        label="Live Session"
        active={activeScreen === "live"}
        onClick={() => setActiveScreen("live")}
        icon={liveIcon}
      />
      <NavItem
        label="Offline Analysis"
        active={activeScreen === "offline"}
        onClick={() => setActiveScreen("offline")}
        icon={offlineIcon}
      />
      <NavItem
        label="Sessions"
        active={activeScreen === "sessions"}
        onClick={() => setActiveScreen("sessions")}
        icon={sessionsIcon}
      />
      <div className="px-2.5 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-t3">
        SUPPORT
      </div>
      <NavItem
        label="FAQ"
        active={activeScreen === "faq"}
        onClick={() => setActiveScreen("faq")}
        icon={faqIcon}
      />
      <NavItem
        label="Settings"
        active={activeScreen === "settings"}
        onClick={() => setActiveScreen("settings")}
        icon={settingsIcon}
      />
      <div className="flex-1" />
      <div className="mt-1.5 flex items-center gap-2 border-t border-[#191919] pt-2.5">
        <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-acc2 text-[11px] font-semibold text-white">
          N
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-t1">Nearu User</span>
          <span className="text-[11px] text-t3">Web</span>
        </div>
      </div>
    </aside>
  );
}
