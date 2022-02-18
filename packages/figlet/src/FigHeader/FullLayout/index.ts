// ets_tracing: off

import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as NA from "@effect-ts/core/Collections/Immutable/NonEmptyArray"
import * as E from "@effect-ts/core/Either"
import type { Equal } from "@effect-ts/core/Equal"
import { makeEqual } from "@effect-ts/core/Equal"
import * as O from "@effect-ts/core/Option"

import type { FigletResult } from "../../FigletException/index.js"
import { FigHeaderError } from "../../FigletException/index.js"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * The `FullLayout` parameter contained within a `FigHeader`.
 *
 * The `value` of a `FullLayout` is the numeric value of the `FullLayout`
 * contained in the Figlet font header.
 */
export type FullLayout =
  | EqualCharacterHorizontalSmushing
  | UnderscoreHorizontalSmushing
  | HierarchyHorizontalSmushing
  | OppositePairHorizontalSmushing
  | BigXHorizontalSmushing
  | HardblankHorizontalSmushing
  | HorizontalFitting
  | HorizontalSmushing
  | EqualCharacterVerticalSmushing
  | UnderscoreVerticalSmushing
  | HierarchyVerticalSmushing
  | HorizontalLineVerticalSmushing
  | VerticalLineSupersmushing
  | VerticalFitting
  | VerticalSmushing

export interface EqualCharacterHorizontalSmushing {
  readonly _tag: "EqualCharacterHorizontalSmushing"
  readonly value: 1
}

export interface UnderscoreHorizontalSmushing {
  readonly _tag: "UnderscoreHorizontalSmushing"
  readonly value: 2
}

export interface HierarchyHorizontalSmushing {
  readonly _tag: "HierarchyHorizontalSmushing"
  readonly value: 4
}

export interface OppositePairHorizontalSmushing {
  readonly _tag: "OppositePairHorizontalSmushing"
  readonly value: 8
}

export interface BigXHorizontalSmushing {
  readonly _tag: "BigXHorizontalSmushing"
  readonly value: 16
}

export interface HardblankHorizontalSmushing {
  readonly _tag: "HardblankHorizontalSmushing"
  readonly value: 32
}

export interface HorizontalFitting {
  readonly _tag: "HorizontalFitting"
  readonly value: 64
}

export interface HorizontalSmushing {
  readonly _tag: "HorizontalSmushing"
  readonly value: 128
}

export interface EqualCharacterVerticalSmushing {
  readonly _tag: "EqualCharacterVerticalSmushing"
  readonly value: 256
}

export interface UnderscoreVerticalSmushing {
  readonly _tag: "UnderscoreVerticalSmushing"
  readonly value: 512
}

export interface HierarchyVerticalSmushing {
  readonly _tag: "HierarchyVerticalSmushing"
  readonly value: 1024
}

export interface HorizontalLineVerticalSmushing {
  readonly _tag: "HorizontalLineVerticalSmushing"
  readonly value: 2048
}

export interface VerticalLineSupersmushing {
  readonly _tag: "VerticalLineSupersmushing"
  readonly value: 4096
}

export interface VerticalFitting {
  readonly _tag: "VerticalFitting"
  readonly value: 8192
}

export interface VerticalSmushing {
  readonly _tag: "VerticalSmushing"
  readonly value: 16384
}

export const EqualCharacterHorizontalSmushing: FullLayout = {
  _tag: "EqualCharacterHorizontalSmushing",
  value: 1
}

export const UnderscoreHorizontalSmushing: FullLayout = {
  _tag: "UnderscoreHorizontalSmushing",
  value: 2
}

export const HierarchyHorizontalSmushing: FullLayout = {
  _tag: "HierarchyHorizontalSmushing",
  value: 4
}

export const OppositePairHorizontalSmushing: FullLayout = {
  _tag: "OppositePairHorizontalSmushing",
  value: 8
}

export const BigXHorizontalSmushing: FullLayout = {
  _tag: "BigXHorizontalSmushing",
  value: 16
}

export const HardblankHorizontalSmushing: FullLayout = {
  _tag: "HardblankHorizontalSmushing",
  value: 32
}

export const HorizontalFitting: FullLayout = {
  _tag: "HorizontalFitting",
  value: 64
}

export const HorizontalSmushing: FullLayout = {
  _tag: "HorizontalSmushing",
  value: 128
}

export const EqualCharacterVerticalSmushing: FullLayout = {
  _tag: "EqualCharacterVerticalSmushing",
  value: 256
}

export const UnderscoreVerticalSmushing: FullLayout = {
  _tag: "UnderscoreVerticalSmushing",
  value: 512
}

export const HierarchyVerticalSmushing: FullLayout = {
  _tag: "HierarchyVerticalSmushing",
  value: 1024
}

export const HorizontalLineVerticalSmushing: FullLayout = {
  _tag: "HorizontalLineVerticalSmushing",
  value: 2048
}

export const VerticalLineSupersmushing: FullLayout = {
  _tag: "VerticalLineSupersmushing",
  value: 4096
}

export const VerticalFitting: FullLayout = {
  _tag: "VerticalFitting",
  value: 8192
}

export const VerticalSmushing: FullLayout = {
  _tag: "VerticalSmushing",
  value: 16384
}

export const values = C.from([
  EqualCharacterHorizontalSmushing,
  UnderscoreHorizontalSmushing,
  HierarchyHorizontalSmushing,
  OppositePairHorizontalSmushing,
  BigXHorizontalSmushing,
  HardblankHorizontalSmushing,
  HorizontalFitting,
  HorizontalSmushing,
  EqualCharacterVerticalSmushing,
  UnderscoreVerticalSmushing,
  HierarchyVerticalSmushing,
  HorizontalLineVerticalSmushing,
  VerticalLineSupersmushing,
  VerticalFitting,
  VerticalSmushing
])

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/**
 * Obtains the list of requested settings starting from the provided value.
 *
 * @param requestedSettings The number representing the `FullLayout`
 * @return The `FullLayout` that corresponds to the given numeric value.
 */
export function fromValue(requestedSettings: number): FigletResult<Chunk<FullLayout>> {
  if (requestedSettings < 0 || requestedSettings > 32767) {
    return E.left(
      NA.single(
        new FigHeaderError({
          message: `FullLayout needs a value between 0 and 32767, inclusive, but received "${requestedSettings}"`
        })
      )
    )
  }

  const result = C.collect_(values, (setting) =>
    (setting.value & requestedSettings) !== 0 ? O.some(setting) : O.none
  )

  return E.right(result)
}

/**
 * The settings that correspond to horizontal smushing.
 */
export const horizontalSmushingRules: Chunk<FullLayout> = C.from([
  EqualCharacterHorizontalSmushing,
  UnderscoreHorizontalSmushing,
  HierarchyHorizontalSmushing,
  OppositePairHorizontalSmushing,
  BigXHorizontalSmushing,
  HardblankHorizontalSmushing
])

/**
 * The settings that correspond to vertical smushing.
 */
export const verticalSmushingRules: Chunk<FullLayout> = C.from([
  EqualCharacterVerticalSmushing,
  UnderscoreVerticalSmushing,
  HierarchyVerticalSmushing,
  HorizontalLineVerticalSmushing,
  VerticalLineSupersmushing
])

// -----------------------------------------------------------------------------
// Instances
// -----------------------------------------------------------------------------

export const equalFullLayout: Equal<FullLayout> = makeEqual(
  (x, y) => x._tag === y._tag && x.value === y.value
)
