"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "visited-cows";
const listeners = new Set<() => void>();

function readVisitedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function emitChange() {
  for (const listener of listeners) listener();
}

function getServerSnapshot() {
  return false;
}

export function useVisited(id: string) {
  const visited = useSyncExternalStore(
    subscribe,
    () => readVisitedSet().has(id),
    getServerSnapshot,
  );

  const markVisited = useCallback(() => {
    try {
      const set = readVisitedSet();
      set.add(id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
    } catch {
      // localStorage unavailable (private mode, disabled storage) -- skip persistence
    }
    emitChange();
  }, [id]);

  return { visited, markVisited };
}
