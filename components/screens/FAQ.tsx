"use client";

import { useState, useMemo } from "react";
import { Topbar } from "../Topbar";
import { FAQS_DATA } from "@/lib/data";

export function FAQ() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return FAQS_DATA;
    return FAQS_DATA.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.tag.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Topbar
        title="FAQ"
        subtitle=" — Help & Documentation"
      />
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-6 py-5">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-1 max-w-[480px] rounded-rs border border-bg4 bg-bg2 px-3.5 py-2.5 text-[13px] text-t1 outline-none placeholder:text-t3 focus:border-acc"
        />
        {filtered.length === 0 ? (
          <div className="py-6 text-[13px] text-t3">
            No results for &quot;{search}&quot;
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((f, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={`${f.tag}-${f.question}`}
                  className="overflow-hidden rounded-rm border border-[#1e1e1e] bg-bg1"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-4 py-3.5 text-left text-[13px] font-semibold text-t1 transition-colors duration-[0.13s] hover:bg-bg2"
                  >
                    <span>
                      <span className="mr-1.5 inline-block rounded-[20px] bg-acc/15 px-2.5 py-0.5 text-[11px] font-semibold text-acc">
                        {f.tag}
                      </span>
                      {f.question}
                    </span>
                    <span
                      className={`ml-3 shrink-0 text-[11px] text-t3 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-[#1a1a1a] px-4 py-3 pb-3.5 text-[13px] text-t2 leading-[1.65]">
                      {f.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
