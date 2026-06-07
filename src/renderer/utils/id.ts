// Stable unique ids for new projects/tasks. Uses Web Crypto when available
// (secure context), with a harmless fallback for any non-secure context.
export function makeId(prefix: string): string {
  const uuid =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
  return `${prefix}_${uuid}`
}

// Today's date as YYYY-MM-DD, matching the stored date format.
export function today(): string {
  return new Date().toISOString().slice(0, 10)
}
