import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 disabled:before:hidden active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-l from-sapphire via-sapphire to-sapphire-strong text-white shadow-md shadow-sapphire/25 hover:shadow-lg hover:shadow-sapphire/40 hover:-translate-y-0.5 before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:skew-x-12 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:-translate-x-[150%] hover:before:translate-x-[350%] before:transition-transform before:duration-700 before:ease-out",

        secondary:
          "border border-border bg-white text-obsidian hover:bg-muted hover:-translate-y-0.5",

        ghost:
          "hover:bg-muted",

        dark:
          "bg-gradient-to-l from-obsidian via-obsidian to-obsidian-soft text-white shadow-md shadow-obsidian/30 hover:shadow-lg hover:shadow-obsidian/50 hover:-translate-y-0.5 before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:skew-x-12 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-[150%] hover:before:translate-x-[350%] before:transition-transform before:duration-700 before:ease-out",

        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5",
      },

      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-lg",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function AppButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: AppButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}