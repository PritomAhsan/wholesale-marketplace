import * as React from "react";
import { cn } from "@/lib/utils";

export interface AppInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function AppInput({
  className,
  ...props
}: AppInputProps) {
  return (
    <input
      className={cn(
        "h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-base shadow-sm outline-none transition-all",
        "placeholder:text-slate-400",
        "focus:border-blue-500 focus:ring-4 focus:ring-blue-100",
        className
      )}
      {...props}
    />
  );
}