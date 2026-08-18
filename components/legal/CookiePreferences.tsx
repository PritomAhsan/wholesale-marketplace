"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "bulkare_cookie_prefs";

export default function CookiePreferences() {
  const [analytics, setAnalytics] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setAnalytics(Boolean(parsed.analytics));
      }
    } catch {
      // ignore malformed storage
    }
    setLoaded(true);
  }, []);

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!loaded) return null;

  return (
    <div className="mt-6 rounded-2xl border border-border bg-ivory p-6">
      <p className="text-sm font-semibold text-obsidian">
        Cookie preference center
      </p>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3">
          <div>
            <p className="text-sm font-medium text-obsidian">Essential</p>
            <p className="text-xs text-obsidian/50">Always active — required to use the marketplace.</p>
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-obsidian/50">
            On
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3">
          <div>
            <p className="text-sm font-medium text-obsidian">Analytics</p>
            <p className="text-xs text-obsidian/50">Not currently loaded on Bulkare. Your preference is saved for when it is.</p>
          </div>
          <button
            type="button"
            onClick={() => setAnalytics((v) => !v)}
            className={`h-6 w-11 rounded-full transition ${
              analytics ? "bg-sapphire" : "bg-border"
            }`}
          >
            <span
              className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition ${
                analytics ? "translate-x-[22px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={save}
        className="mt-4 rounded-xl bg-obsidian px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-obsidian-soft"
      >
        {saved ? "Saved" : "Save preferences"}
      </button>
    </div>
  );
}
