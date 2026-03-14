"use client";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  "aria-label"?: string;
}

export function Toggle({
  checked,
  onChange,
  "aria-label": ariaLabel,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      className={`relative h-[21px] w-[38px] shrink-0 rounded-[11px] border-none transition-[background] duration-[0.18s] ${
        checked ? "bg-acc" : "bg-bg4"
      }`}
      style={checked ? {} : { background: "var(--bg4)" }}
      onClick={() => onChange(!checked)}
    >
      <span
        className="pointer-events-none absolute top-[3px] h-[15px] w-[15px] rounded-full bg-white transition-transform duration-[0.18s]"
        style={{
          left: checked ? "17px" : "3px",
        }}
      />
    </button>
  );
}
