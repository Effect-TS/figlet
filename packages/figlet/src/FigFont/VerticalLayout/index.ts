// ets_tracing: off

import * as A from "@effect-ts/core/Collections/Immutable/Array"
import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as E from "@effect-ts/core/Either"
import type { Equal } from "@effect-ts/core/Equal"
import * as Eq from "@effect-ts/core/Equal"
import { pipe } from "@effect-ts/core/Function"
import * as O from "@effect-ts/core/Option"
import * as Structural from "@effect-ts/core/Structural"

import * as FullLayout from "../../FigHeader/FullLayout/index.js"
import type { FigHeader } from "../../FigHeader/index.js"
import type { FigletResult } from "../../FigletException/index.js"
import type { VerticalSmushingRule } from "../VerticalSmushingRule/index.js"
import * as VSR from "../VerticalSmushingRule/index.js"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

export type VerticalLayout =
  | FullHeight
  | VerticalFitting
  | UniversalSmushing
  | ControlledSmushing

export interface FullHeight {
  readonly _tag: "FullHeight"
}

export interface VerticalFitting {
  readonly _tag: "VerticalFitting"
}

export interface UniversalSmushing {
  readonly _tag: "UniversalSmushing"
}

export interface ControlledSmushing {
  readonly _tag: "ControlledSmushing"
  readonly rules: Chunk<VerticalSmushingRule>
}

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

export const FullHeight: VerticalLayout = {
  _tag: "FullHeight"
}

export const VerticalFitting: VerticalLayout = {
  _tag: "VerticalFitting"
}

export const UniversalSmushing: VerticalLayout = {
  _tag: "UniversalSmushing"
}

export function ControlledSmushing(rules: Chunk<VerticalSmushingRule>): VerticalLayout {
  return {
    _tag: "ControlledSmushing",
    rules
  }
}

/**
 * Interprets the header settings and returns the selected `VerticalLayout`.
 *
 * @param header The `FigHeader` where the vertical layout is defined.
 * @returns A `FigletResult` containing the new `VerticalLayout`, or
 * a list of `FigletException`s that occurred during parsing.
 */
export function fromHeader(header: FigHeader): FigletResult<VerticalLayout> {
  return pipe(
    header.fullLayout,
    O.map((settings) => {
      if (
        !hasLayout(settings, FullLayout.VerticalFitting) &&
        !hasLayout(settings, FullLayout.VerticalSmushing)
      ) {
        return E.right(FullHeight)
      }

      if (
        hasLayout(settings, FullLayout.VerticalFitting) &&
        !hasLayout(settings, FullLayout.VerticalSmushing)
      ) {
        return E.right(VerticalFitting)
      }

      const selectedSmushingRules = A.intersection_(FullLayout.equalFullLayout)(
        C.toArray(settings),
        C.toArray(FullLayout.verticalSmushingRules)
      )

      if (
        hasLayout(settings, FullLayout.VerticalSmushing) &&
        !A.isEmpty(selectedSmushingRules)
      ) {
        return E.map_(VSR.fromHeader(header), ControlledSmushing)
      }

      return E.right(UniversalSmushing)
    }),
    O.getOrElse(() => E.right(FullHeight))
  )
}

// -----------------------------------------------------------------------------
// Instances
// -----------------------------------------------------------------------------

export const equalVerticalLayout: Equal<VerticalLayout> = Eq.makeEqual(
  Structural.equals
)

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

function hasLayout(
  settings: Chunk<FullLayout.FullLayout>,
  layout: FullLayout.FullLayout
) {
  return C.elem_(settings, FullLayout.equalFullLayout, layout)
}
