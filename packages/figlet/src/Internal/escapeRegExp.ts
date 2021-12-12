// ets_tracing: off

/**
 * Escapes characters in a string that have semantic meaning when used within a
 * regular expression.
 *
 * ```typescript
 * const s = "(hello)"
 * escapeRegExp(s)
 * // => "\(hello\)"
 * ```
 */
export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
