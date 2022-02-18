// ets_tracing: off

import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as NA from "@effect-ts/core/Collections/Immutable/NonEmptyArray"
import * as E from "@effect-ts/core/Either"
import type { Equal } from "@effect-ts/core/Equal"
import * as Eq from "@effect-ts/core/Equal"
import * as O from "@effect-ts/core/Option"
import * as Structural from "@effect-ts/core/Structural"

import type { FigHeader } from "../../FigHeader/index.js"
import type { FigletResult } from "../../FigletException/index.js"
import { FigHeaderError } from "../../FigletException/index.js"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * The `PrintDirection` parameter contained within a `FigHeader`.
 *
 * The `PrintDirection` is represented by a numeric value:
 * - `0` represents `LeftToRight`
 * - `1` represents `RightToLeft`
 */
export type PrintDirection = LeftToRight | RightToLeft

/**
 * Represents a left-to-right print direction.
 */
export interface LeftToRight {
  readonly _tag: "LeftToRight"
  readonly value: 0
}

/**
 * Represents a right-to-left print direction.
 */
export interface RightToLeft {
  readonly _tag: "RightToLeft"
  readonly value: 1
}

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

export const LeftToRight: PrintDirection = {
  _tag: "LeftToRight",
  value: 0
}

export const RightToLeft: PrintDirection = {
  _tag: "RightToLeft",
  value: 1
}

export const values: Chunk<PrintDirection> = C.from([LeftToRight, RightToLeft])

/**
 * Obtains the printing direction starting from the provided value.
 *
 * @param value The number representing the `PrintDirection`.
 * @returns The `PrintDirection` that corresponds to the given numeric value.
 */
export function fromValue(value: number): FigletResult<PrintDirection> {
  if (value === 0) {
    return E.right(LeftToRight)
  } else if (value === 1) {
    return E.right(RightToLeft)
  } else {
    return E.left(
      NA.single(
        new FigHeaderError({
          message: `Could not parse value "${value}" to a PrintDirection`
        })
      )
    )
  }
}

/**
 * Interprets the header settings and returns the selected `PrintDirection`.
 *
 * @param header The `FigHeader` where the print direction is defined.
 * @returns A `FigletResult` containing the `PrintDirection`.
 */
export function fromHeader(header: FigHeader): FigletResult<PrintDirection> {
  return O.fold_(header.printDirection, () => E.right(LeftToRight), E.right)
}

// -----------------------------------------------------------------------------
// Instances
// -----------------------------------------------------------------------------

export const equalPrintDirection: Equal<PrintDirection> = Eq.makeEqual(
  Structural.equals
)
