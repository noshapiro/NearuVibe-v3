"use client";

interface NavItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

export function NavItem({ label, active, onClick, icon }: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-9 cursor-pointer select-none items-center gap-2.5 whitespace-nowrap rounded-rs px-2.5 text-[13px] font-medium transition-all duration-[0.14s] user-select-none ${
        active
          ? "bg-bg2 text-t1 [&_svg]:opacity-100"
          : "text-t2 hover:bg-bg3 hover:text-t1 [&_svg]:opacity-75"
      }`}
    >
      <span className="h-[15px] w-[15px] shrink-0">{icon}</span>
      {label}
    </button>
  );
}
