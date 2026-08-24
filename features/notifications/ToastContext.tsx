"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Check, Heart, Info, ShoppingCart, Trash2, X } from "lucide-react";

type ToastVariant = "cart" | "wishlist" | "remove" | "info";

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  notify: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_ICON: Record<ToastVariant, typeof Check> = {
  cart: ShoppingCart,
  wishlist: Heart,
  remove: Trash2,
  info: Info,
};

const VARIANT_ACCENT: Record<ToastVariant, string> = {
  cart: "text-sapphire",
  wishlist: "text-champagne",
  remove: "text-obsidian/50",
  info: "text-sapphire",
};

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, variant }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  function dismiss(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}

      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[200] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:items-end">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  // Driven manually (rather than a Tailwind animate-in utility) so the
  // entrance transition reliably plays regardless of whether the animation
  // plugin's keyframes are active — a toast that never visually enters is
  // worse than one that just appears instantly.
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const Icon = VARIANT_ICON[toast.variant];

  return (
    <div
      className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-xl shadow-obsidian/10 transition-all duration-300 ${
        entered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted ${VARIANT_ACCENT[toast.variant]}`}>
        <Icon className="h-4 w-4" fill={toast.variant === "wishlist" ? "currentColor" : "none"} />
      </span>

      <p className="flex-1 text-sm font-medium text-obsidian">
        {toast.message}
      </p>

      <button
        onClick={onDismiss}
        className="shrink-0 rounded-lg p-1 text-obsidian/30 transition hover:bg-muted hover:text-obsidian"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return ctx;
}
