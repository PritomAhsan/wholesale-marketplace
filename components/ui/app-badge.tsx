import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function AppBadge({
  children,
  className,
}: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        "border border-blue-200",
        "bg-blue-50",
        "px-4 py-2",
        "text-sm font-semibold text-blue-700",
        className
      )}
    >
      {children}
    </span>
  );
}