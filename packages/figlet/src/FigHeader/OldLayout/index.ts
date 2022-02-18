// ets_tracing: off

import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as NA from "@effect-ts/core/Collections/Immutable/NonEmptyArray"
import * as E from "@effect-ts/core/Either"
import type { Equal } from "@effect-ts/core/Equal"
import { pipe } from "@effect-ts/core/Function"
import { makeEqual } from "@effect-ts/system/Equal"

import type { FigletResult } from "../../FigletException/index.js"
import { FigHeaderError } from "../../FigletException/index.js"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * The `OldLayout` parameter contained within a `FigHeader`.
 *
 * The value of an `OldLayout` is the numeric value of the `OldLayout`
 * contained in the Figlet font header.
 */
export type OldLayout =
  | FullWidth
  | HorizontalFitting
  | EqualCharacterSmushing
  | UnderscoreSmushing
  | HierarchySmushing
  | OppositePairSmushing
  | BigXSmushing
  | HardblankSmushing

export interface FullWidth {
  readonly _tag: "FullWidth"
  readonly value: -1
}

export interface HorizontalFitting {
  readonly _tag: "HorizontalFitting"
  readonly value: 0
}

export interface EqualCharacterSmushing {
  readonly _tag: "EqualCharacterSmushing"
  readonly value: 1
}

export interface UnderscoreSmushing {
  readonly _tag: "UnderscoreSmushing"
  readonly value: 2
}

export interface HierarchySmushing {
  readonly _tag: "HierarchySmushing"
  readonly value: 4
}

export interface OppositePairSmushing {
  readonly _tag: "OppositePairSmushing"
  readonly value: 8
}

export interface BigXSmushing {
  readonly _tag: "BigXSmushing"
  readonly value: 16
}

export interface HardblankSmushing {
  readonly _tag: "HardblankSmushing"
  readonly value: 32
}

export const FullWidth: OldLayout = {
  _tag: "FullWidth",
  value: -1
}

export const HorizontalFitting: OldLayout = {
  _tag: "HorizontalFitting",
  value: 0
}

export const EqualCharacterSmushing: OldLayout = {
  _tag: "EqualCharacterSmushing",
  value: 1
}

export const UnderscoreSmushing: OldLayout = {
  _tag: "UnderscoreSmushing",
  value: 2
}

export const HierarchySmushing: OldLayout = {
  _tag: "HierarchySmushing",
  value: 4
}

export const OppositePairSmushing: OldLayout = {
  _tag: "OppositePairSmushing",
  value: 8
}

export const BigXSmushing: OldLayout = {
  _tag: "BigXSmushing",
  value: 16
}

export const HardblankSmushing: OldLayout = {
  _tag: "HardblankSmushing",
  value: 32
}

export const values: Chunk<OldLayout> = C.from([
  FullWidth,
  HorizontalFitting,
  EqualCharacterSmushing,
  UnderscoreSmushing,
  HierarchySmushing,
  OppositePairSmushing,
  BigXSmushing,
  HardblankSmushing
])

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/**
 * Obtains the list of requested settings starting from the provided value.
 *
 * @param requestedSettings The number representing the `OldLayout`.
 * @return The `OldLayout` that corresponds to the given numeric value.
 */
export function fromValue(requestedSettings: number): FigletResult<Chunk<OldLayout>> {
  if (requestedSettings < -1 || requestedSettings > 63) {
    return E.left(
      NA.single(
        new FigHeaderError({
          message: `OldLayout needs a value between 1 and 63, inclusive, received "${requestedSettings}"`
        })
      )
    )
  }

  if (requestedSettings === -1) {
    return E.right(C.single(FullWidth))
  }

  if (requestedSettings === 0) {
    return E.right(C.single(HorizontalFitting))
  }

  const result = pipe(
    values,
    C.filter((setting) => setting.value !== 0),
    C.chain((setting) =>
      (requestedSettings & setting.value) === setting.value
        ? C.single(setting)
        : C.empty<OldLayout>()
    )
  )

  return E.right(result)
}

// -----------------------------------------------------------------------------
// Instances
// -----------------------------------------------------------------------------

export const equalOldLayout: Equal<OldLayout> = makeEqual(
  (x, y) => x._tag === y._tag && x.value === y.value
)
