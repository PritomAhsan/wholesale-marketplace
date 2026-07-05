import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function GlassCard({
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/40",
        "bg-white/70 backdrop-blur-xl",
        "shadow-[0_20px_80px_rgba(15,23,42,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}