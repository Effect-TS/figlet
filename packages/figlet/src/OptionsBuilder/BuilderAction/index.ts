// ets_tracing: off

import { Tagged } from "@effect-ts/core/Case"
import * as Equal from "@effect-ts/core/Equal"

import type { FigFont } from "../../FigFont/index.js"
import type { InternalFont } from "../../Internal/index.js"
import type { HorizontalLayout } from "../../RenderOptions/HorizontalLayout/index.js"
import type { Justification } from "../../RenderOptions/Justification/index.js"
import type { PrintDirection } from "../../RenderOptions/PrintDirection/index.js"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * The `BuilderAction` data structure is used to defer the call of the
 * FigFont API at rendering time, to avoid dealing with calls that might fai,
 * such as loading a font, as well as the management of effects, while the user
 * is constructing the the font options.
 */
export type BuilderAction =
  | DefaultFont
  | DefaultHorizontalLayout
  | DefaultJustification
  | DefaultMaxWidth
  | DefaultPrintDirection
  | LoadFont
  | LoadInternalFont
  | SetFont
  | SetHorizontalLayout
  | SetJustification
  | SetMaxWidth
  | SetPrintDirection
  | SetText

export class DefaultFont extends Tagged("DefaultFont")<{}> {
  _actionTag = "Font"
}

export class DefaultHorizontalLayout extends Tagged("DefaultHorizontalLayout")<{}> {
  _actionTag = "HorizontalLayout"
}

export class DefaultJustification extends Tagged("DefaultJustification")<{}> {
  _actionTag = "Justification"
}

export class DefaultMaxWidth extends Tagged("DefaultMaxWidth")<{}> {
  _actionTag = "MaxWidth"
}

export class DefaultPrintDirection extends Tagged("DefaultPrintDirection")<{}> {
  _actionTag = "PrintDirection"
}

export class LoadFont extends Tagged("LoadFont")<{
  readonly fontPath: string
}> {
  _actionTag = "Font"
}

export class LoadInternalFont extends Tagged("LoadInternalFont")<{
  readonly font: InternalFont
}> {
  _actionTag = "Font"
}

export class SetFont extends Tagged("SetFont")<{
  readonly font: FigFont
}> {
  _actionTag = "Font"
}

export class SetHorizontalLayout extends Tagged("SetHorizontalLayout")<{
  readonly layout: HorizontalLayout
}> {
  _actionTag = "HorizontalLayout"
}

export class SetJustification extends Tagged("SetJustification")<{
  readonly justification: Justification
}> {
  _actionTag = "Justification"
}

export class SetMaxWidth extends Tagged("SetMaxWidth")<{
  readonly maxWidth: number
}> {
  _actionTag = "MaxWidth"
}

export class SetPrintDirection extends Tagged("SetPrintDirection")<{
  readonly direction: PrintDirection
}> {
  _actionTag = "PrintDirection"
}

export class SetText extends Tagged("SetText")<{
  readonly text: string
}> {
  _actionTag = "Text"
}

// -----------------------------------------------------------------------------
// Operations
// -----------------------------------------------------------------------------

/**
 * Determines if two actions belong to the same group by using the action's
 * `ActionTag`.
 */
export function sameGroupAs_(a: BuilderAction, b: BuilderAction): boolean {
  return Equal.string.equals(a._actionTag, b._actionTag)
}

/**
 * Determines if two actions belong to the same group by using the action's
 * `ActionTag`.
 *
 * @ets_data_first sameGroupAs_
 */
export function sameGroupAs(b: BuilderAction) {
  return (a: BuilderAction): boolean => sameGroupAs_(a, b)
}
