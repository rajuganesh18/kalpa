"use client";

import { useCallback, useEffect, useState } from "react";
import { Flags } from "./types";

/**
 * Reader state, persisted per-series in localStorage.
 * Swap the load/persist internals for Supabase (reader_state table) later —
 * the component API stays identical.
 */
export interface SeriesState {
  flags: Flags;
  done: number[];
}

const key = (slug: string) => `kalpa:${slug}:v1`;

function read(slug: string): SeriesState {
  if (typeof window === "undefined") return { flags: {}, done: [] };
  try {
    const raw = window.localStorage.getItem(key(slug));
    if (raw) {
      const p = JSON.parse(raw);
      return { flags: p.flags ?? {}, done: p.done ?? [] };
    }
  } catch { /* corrupted or unavailable — start fresh */ }
  return { flags: {}, done: [] };
}

function write(slug: string, st: SeriesState) {
  try { window.localStorage.setItem(key(slug), JSON.stringify(st)); } catch { /* private mode */ }
}

export function useSeriesState(slug: string) {
  const [state, setState] = useState<SeriesState>({ flags: {}, done: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { setState(read(slug)); setHydrated(true); }, [slug]);

  const setFlag = useCallback((flag: string, value: boolean) => {
    setState(prev => {
      if (prev.flags[flag] === true || prev.flags[flag] === false) return prev; // choices are final
      const next = { ...prev, flags: { ...prev.flags, [flag]: value } };
      write(slug, next);
      return next;
    });
  }, [slug]);

  const markDone = useCallback((ep: number) => {
    setState(prev => {
      if (prev.done.includes(ep)) return prev;
      const next = { ...prev, done: [...prev.done, ep] };
      write(slug, next);
      return next;
    });
  }, [slug]);

  const reset = useCallback(() => {
    const next = { flags: {}, done: [] };
    write(slug, next);
    setState(next);
  }, [slug]);

  return { ...state, hydrated, setFlag, markDone, reset };
}
