// ets_tracing: off

import * as A from "@effect-ts/core/Collections/Immutable/Array"
import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as NA from "@effect-ts/core/Collections/Immutable/NonEmptyArray"
import * as E from "@effect-ts/core/Either"
import type { Equal } from "@effect-ts/core/Equal"
import * as Eq from "@effect-ts/core/Equal"
import { pipe } from "@effect-ts/core/Function"
import type { Option } from "@effect-ts/core/Option"
import * as O from "@effect-ts/core/Option"
import * as Structural from "@effect-ts/core/Structural"

import * as FullLayout from "../../FigHeader/FullLayout/index.js"
import type { FigHeader } from "../../FigHeader/index.js"
import * as OldLayout from "../../FigHeader/OldLayout/index.js"
import type { FigletResult } from "../../FigletException/index.js"
import { FigFontError } from "../../FigletException/index.js"
import type { HorizontalSmushingRule } from "../HorizontalSmushingRule/index.js"
import * as HSR from "../HorizontalSmushingRule/index.js"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

export type HorizontalLayout =
  | FullWidth
  | HorizontalFitting
  | UniversalSmushing
  | ControlledSmushing

export interface FullWidth {
  readonly _tag: "FullWidth"
}

export interface HorizontalFitting {
  readonly _tag: "HorizontalFitting"
}

export interface UniversalSmushing {
  readonly _tag: "UniversalSmushing"
}

export interface ControlledSmushing {
  readonly _tag: "ControlledSmushing"
  readonly rules: Chunk<HorizontalSmushingRule>
}

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

export const FullWidth: HorizontalLayout = {
  _tag: "FullWidth"
}

export const HorizontalFitting: HorizontalLayout = {
  _tag: "HorizontalFitting"
}

export const UniversalSmushing: HorizontalLayout = {
  _tag: "UniversalSmushing"
}

export function ControlledSmushing(
  rules: Chunk<HorizontalSmushingRule>
): HorizontalLayout {
  return {
    _tag: "ControlledSmushing",
    rules
  }
}

/**
 * Interprets the header settings and returns the selected `HorizontalLayout`.
 * Contrary to the Figlet font standard, if the header defines "fullLayout"
 * and then defines "oldLayout", "oldLayout" is effectively ignored.
 *
 * @param header The `FigHeader` where the `HorizontalLayout` is defined.
 * @returns A `FigletResult` containing the `HorizontalLayout`, or a list of
 * `FigletException`s accumulated during parsing.
 */
export function fromHeader(header: FigHeader): FigletResult<HorizontalLayout> {
  return pipe(
    E.tuple(fromOldLayout(header), fromFullLayout(header)),
    E.map(([oldHorizontal, fullHorizontal]) =>
      O.getOrElse_(fullHorizontal, () => oldHorizontal)
    )
  )
}

/**
 * Interprets the `fullLayout` header settings and returns the selected
 * `HorizontalLayout`.
 *
 * @param header The `FigHeader` where the `HorizontalLayout` is defined.
 * @returns A `FigletResult` containing the `HorizontalLayout`, or a list of
 * `FigletException`s accumulated during parsing.
 */
export function fromFullLayout(
  header: FigHeader
): FigletResult<Option<HorizontalLayout>> {
  return pipe(
    header.fullLayout,
    O.fold(
      () => E.right(O.emptyOf<HorizontalLayout>()),
      (settings) => {
        if (
          !hasFullLayout(settings, FullLayout.HorizontalFitting) &&
          !hasFullLayout(settings, FullLayout.HorizontalSmushing)
        ) {
          return E.right(O.some(FullWidth))
        }

        if (
          hasFullLayout(settings, FullLayout.HorizontalFitting) &&
          !hasFullLayout(settings, FullLayout.HorizontalSmushing)
        ) {
          return E.right(O.some(HorizontalFitting))
        }

        const selectedSmushingRules = A.intersection_(FullLayout.equalFullLayout)(
          C.toArray(settings),
          C.toArray(FullLayout.horizontalSmushingRules)
        )

        if (
          hasFullLayout(settings, FullLayout.HorizontalSmushing) &&
          !A.isEmpty(selectedSmushingRules)
        ) {
          return E.map_(HSR.fromFullLayout(header), (rules) =>
            O.some(ControlledSmushing(rules))
          )
        }

        return E.right(O.some(UniversalSmushing))
      }
    )
  )
}

/**
 * Interprets the `oldLayout` header settings and returns the selected
 * `HorizontalLayout`.
 *
 * @param header The `FigHeader` where the `HorizontalLayout` is defined.
 * @returns A `FigletResult` containing the `HorizontalLayout`, or a list of
 * `FigletException`s accumulated during parsing.
 */
export function fromOldLayout(header: FigHeader): FigletResult<HorizontalLayout> {
  const settings = C.toArray(header.oldLayout)
  const eqLayoutArray = A.getEqual(OldLayout.equalOldLayout)

  if (eqLayoutArray.equals(settings, A.single(OldLayout.FullWidth))) {
    return E.right(FullWidth)
  }

  if (eqLayoutArray.equals(settings, A.single(OldLayout.HorizontalFitting))) {
    return E.right(HorizontalFitting)
  }

  const hasOldLayout = A.elem_(OldLayout.equalOldLayout)

  if (
    !hasOldLayout(settings, OldLayout.FullWidth) &&
    !hasOldLayout(settings, OldLayout.HorizontalFitting)
  ) {
    return E.map_(HSR.fromOldLayout(header), ControlledSmushing)
  }

  return E.left(
    NA.single(
      new FigFontError({
        message:
          "Could not convert layout settings found in header to a " +
          `HorizontalLayout, received "${settings
            .map(({ value }) => value)
            .join(", ")}"`
      })
    )
  )
}

// -----------------------------------------------------------------------------
// Instances
// -----------------------------------------------------------------------------

export const equalHorizontalLayout: Equal<HorizontalLayout> = Eq.makeEqual(
  Structural.equals
)

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

function hasFullLayout(
  settings: Chunk<FullLayout.FullLayout>,
  layout: FullLayout.FullLayout
) {
  return C.elem_(settings, FullLayout.equalFullLayout, layout)
}
