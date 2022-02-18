// ets_tracing: off

import * as A from "@effect-ts/core/Collections/Immutable/Array"
import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as NA from "@effect-ts/core/Collections/Immutable/NonEmptyArray"
import * as E from "@effect-ts/core/Either"
import * as O from "@effect-ts/core/Option"
import { matchTag } from "@effect-ts/core/Utils"

import * as FullLayout from "../../FigHeader/FullLayout/index.js"
import type { FigHeader } from "../../FigHeader/index.js"
import type { FigletResult } from "../../FigletException/index.js"
import { FigFontError } from "../../FigletException/index.js"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * Represents rules for performing horizontal smushing for a Figlet font.
 *
 * See http://www.jave.de/figlet/figfont.html#smushingrules for more detail.
 */
export type HorizontalSmushingRule =
  | EqualCharacter
  | Underscore
  | Hierarchy
  | OppositePair
  | BigX
  | Hardblank

/**
 * Represents application of "equal" character horizontal smushing.
 *
 * **Horizontal Smushing Rule 1** (Code Value 1)
 *
 * Two sub-characters are smushed into a single sub-character if they are the
 * same. This rule does not smush hardblanks.
 */
export interface EqualCharacter {
  readonly _tag: "EqualCharacter"
}

/**
 * Represents application of "underscore" character horizontal smushing.
 *
 * **Horizontal Smushing Rule 2** (Code Value 2)
 *
 * An underscore ("_") will be replaced by any of: "|", "/", "\", "[", "]",
 * "{", "}", "(", ")", "<" or ">".
 */
export interface Underscore {
  readonly _tag: "Underscore"
}

/**
 * Represents application of "hierarchy" character horizontal smushing.
 *
 * **Horizontal Smushing Rule 3** (Code Value 4)
 *
 * A hierarchy of six classes is used: "|", "/\", "[]", "{}", "()", and "<>".
 * When two smushing sub-characters are from different classes, the one from
 * the latter class will be used.
 */
export interface Hierarchy {
  readonly _tag: "Hierarchy"
}

/**
 * Represents application of "opposite pair" character horizontal smushing.
 *
 * **Horizontal Smushing Rule 4** (Code Value 8)
 *
 * Smushes opposing brackets ("[]" or "]["), braces ("{}" or "}{") and
 * parentheses ("()" or ")(") together, replacing any such pair with a vertical
 * bar ("|").
 */
export interface OppositePair {
  readonly _tag: "OppositePair"
}

/**
 * Represents application of "big X" character horizontal smushing.
 *
 * **Horizontal Smushing Rule 5** (Code Value 16)
 *
 * Smushes "/\" into "|", "\/" into "Y", and "><" into "X". Note that "<>" is
 * not smushed in any way by this rule. The name "BIG X" is historical;
 * originally all three pairs were smushed into "X".
 */
export interface BigX {
  readonly _tag: "BigX"
}

/**
 * Represents application of "equal" character horizontal smushing.
 *
 * **Horizontal Smushing Rule 6** (Code Value 32)
 *
 * Smushes two hardblanks together, replacing them with a single hardblank.
 */
export interface Hardblank {
  readonly _tag: "Hardblank"
}

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

export const EqualCharacter: HorizontalSmushingRule = {
  _tag: "EqualCharacter"
}

export const Underscore: HorizontalSmushingRule = {
  _tag: "Underscore"
}

export const Hierarchy: HorizontalSmushingRule = {
  _tag: "Hierarchy"
}

export const OppositePair: HorizontalSmushingRule = {
  _tag: "OppositePair"
}

export const BigX: HorizontalSmushingRule = {
  _tag: "BigX"
}

export const Hardblank: HorizontalSmushingRule = {
  _tag: "Hardblank"
}

/**
 * Interprets the `fullLayout` header settings and returns the selected
 * `HorizontalSmushingRule`s.
 *
 * @param header The `FigHeader` where the `FullLayout` is defined.
 * @returns A `FigletResult` containing a list of `HorizontalSmushingRule`s, or
 * a list of `FigletException`s accumulated during parsing.
 */
export function fromFullLayout(
  header: FigHeader
): FigletResult<Chunk<HorizontalSmushingRule>> {
  return E.right(
    O.getOrElse_(
      O.map_(header.fullLayout, (settings) =>
        C.from(
          A.collect_(
            A.intersection_(FullLayout.equalFullLayout)(
              C.toArray(settings),
              C.toArray(FullLayout.horizontalSmushingRules)
            ),
            matchTag(
              {
                EqualCharacterHorizontalSmushing: () => O.some(EqualCharacter),
                UnderscoreHorizontalSmushing: () => O.some(Underscore),
                HierarchyHorizontalSmushing: () => O.some(Hierarchy),
                OppositePairHorizontalSmushing: () => O.some(OppositePair),
                BigXHorizontalSmushing: () => O.some(BigX),
                HardblankHorizontalSmushing: () => O.some(Hardblank)
              },
              () => O.emptyOf<HorizontalSmushingRule>()
            )
          )
        )
      ),
      () => C.empty<HorizontalSmushingRule>()
    )
  )
}

/**
 * Interprets the `oldLayout` header settings and returns the selected
 * `HorizontalSmushingRule`s.
 *
 * @param header The `FigHeader` where the `OldLayout` is defined.
 * @returns A `FigletResult` containing a list of `HorizontalSmushingRule`s, or
 * a list of `FigletException`s accumulated during parsing.
 */
export function fromOldLayout(
  header: FigHeader
): FigletResult<Chunk<HorizontalSmushingRule>> {
  const rules = C.from(
    A.collect_(
      C.toArray(header.oldLayout),
      matchTag(
        {
          EqualCharacterSmushing: () => O.some(EqualCharacter),
          UnderscoreSmushing: () => O.some(Underscore),
          HierarchySmushing: () => O.some(Hierarchy),
          OppositePairSmushing: () => O.some(OppositePair),
          BigXSmushing: () => O.some(BigX),
          HardblankSmushing: () => O.some(Hardblank)
        },
        () => O.emptyOf<HorizontalSmushingRule>()
      )
    )
  )

  if (C.isEmpty(rules)) {
    return E.left(
      NA.single(
        new FigFontError({
          message: `Header field "oldLayout" does not include any horizontal smushing rule`
        })
      )
    )
  }

  return E.right(rules)
}
