import clsx, { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function isPlaceholder(value?: string): boolean {
  if (!value) return true;
  return value.startsWith("[ADD_") || value === "TODO" || value.includes("TODO");
}
