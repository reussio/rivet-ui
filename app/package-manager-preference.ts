"use client";

import { useSyncExternalStore } from "react";

type PackageManager = "bun" | "pnpm" | "yarn" | "npm";

const packageManagerStorageKey = "rivet-ui:package-manager:v1";
const packageManagerChangeEvent = "rivet-ui:package-manager-change";
const defaultPackageManager: PackageManager = "bun";
let inMemoryPackageManager: PackageManager = defaultPackageManager;

function usePackageManagerPreference() {
  return useSyncExternalStore(
    subscribeToPackageManager,
    getPackageManagerSnapshot,
    getServerPackageManagerSnapshot,
  );
}

function subscribeToPackageManager(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(packageManagerChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(packageManagerChangeEvent, onStoreChange);
  };
}

function getPackageManagerSnapshot() {
  try {
    const storedValue = window.localStorage.getItem(packageManagerStorageKey);
    return isPackageManager(storedValue) ? storedValue : inMemoryPackageManager;
  } catch {
    return inMemoryPackageManager;
  }
}

function getServerPackageManagerSnapshot() {
  return defaultPackageManager;
}

function setPackageManagerPreference(value: PackageManager) {
  inMemoryPackageManager = value;

  try {
    window.localStorage.setItem(packageManagerStorageKey, value);
  } catch {
    // Keep the current page functional when persistent storage is unavailable.
  }

  window.dispatchEvent(new Event(packageManagerChangeEvent));
}

function isPackageManager(value: string | null): value is PackageManager {
  return value === "bun" || value === "pnpm" || value === "yarn" || value === "npm";
}

export type { PackageManager };
export { isPackageManager, setPackageManagerPreference, usePackageManagerPreference };
