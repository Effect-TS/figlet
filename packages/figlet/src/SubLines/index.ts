// ets_tracing: off

import * as A from "@effect-ts/core/Collections/Immutable/Array"
import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import type { Equal } from "@effect-ts/core/Equal"
import * as Eq from "@effect-ts/core/Equal"
import { pipe } from "@effect-ts/core/Function"
import * as O from "@effect-ts/core/Option"
import type { Show } from "@effect-ts/core/Show"
import { makeShow } from "@effect-ts/core/Show"
import * as String from "@effect-ts/core/String"
import * as Structural from "@effect-ts/core/Structural"

import { escapeRegExp, transpose } from "../Internal/index.js"
import type { SubColumns } from "../SubColumns/index.js"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * Represents the `SubLines` in Figlet which are the string that compose each
 * line of the `FIGure` or of a `FigCharacter`.
 *
 * @param value The collection of lines that compose the `SubLines`.
 */
export interface SubLines {
  readonly value: Chunk<string>
}

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/**
 * Create an instance of `SubLines` from a pure value.
 */
export function fromValue(value: Chunk<string>): SubLines {
  return { value }
}

/**
 * Create a zero-height `SubLines` object of the specified height.
 *
 * @param height The number of lines that compose this `SubLines` object.
 */
export function zero(height: number): SubLines {
  return { value: C.fill(height, () => "") }
}

// -----------------------------------------------------------------------------
// Operations
// -----------------------------------------------------------------------------

/**
 * Counts the number of columns that compose the provided `SubLines`.
 */
export function width(self: SubLines): number {
  return O.getOrElse_(C.head(C.map_(self.value, (_) => _.length)), () => 0)
}

/**
 * Transforms this `SubLines` into a `SubColumns`.
 */
export function toSubcolumns(self: SubLines): SubColumns {
  return {
    value: pipe(
      C.toArray(self.value),
      A.map(String.split("")),
      transpose,
      A.map(A.join("")),
      C.from
    )
  }
}

/**
 * Gets the length of the `SubLines`.
 */
export function length(self: SubLines): number {
  return self.value.length
}

/**
 * Apply a function to each element to obtain a new `SubLines`.
 */
export function map_(self: SubLines, f: (s: string) => string): SubLines {
  return fromValue(C.map_(self.value, f))
}

/**
 * Apply a function to each element to obtain a new `SubLines`.
 *
 * @ets_data_first map_
 */
export function map(f: (s: string) => string) {
  return (self: SubLines): SubLines => map_(self, f)
}

/**
 * Applies a function to each element of the `SubLines`.
 */
export function foreach_<U>(self: SubLines, f: (s: string) => U): void {
  return C.forEach_(self.value, f)
}

/**
 * Applies a function to each element of the `SubLines`.
 *
 * @ets_data_first foreach_
 */
export function foreach<U>(f: (s: string) => U) {
  return (self: SubLines): void => foreach_(self, f)
}

/**
 * Replaces a string value looking inside each element of the `SubLines`.
 */
export function replace_(self: SubLines, oldValue: string, newValue: string): SubLines {
  return pipe(
    self.value,
    C.map(String.replace(new RegExp(escapeRegExp(oldValue), "g"), newValue)),
    fromValue
  )
}

/**
 * Replaces a string value looking inside each element of the `SubLines`.
 *
 * @ets_data_first replace_
 */
export function replace(oldValue: string, newValue: string) {
  return (self: SubLines): SubLines => replace_(self, oldValue, newValue)
}

// -----------------------------------------------------------------------------
// Instances
// -----------------------------------------------------------------------------

export const equalSubLines: Equal<SubLines> = Eq.makeEqual((x, y) =>
  x[Structural.equalsSym](y)
)

export const showSubLines: Show<SubLines> = makeShow((x) =>
  pipe(
    x.value,
    C.map((_) => `|${_}|`),
    C.join("\n")
  )
)
