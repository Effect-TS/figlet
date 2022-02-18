// ets_tracing: off

import { matchTag_ } from "@effect-ts/core/Utils"

import type { FigFont } from "../../FigFont/index.js"
import * as FontDirection from "../../FigFont/PrintDirection/index.js"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * Represents the option to choose the rendering direction of the font text.
 */
export type PrintDirection = LeftToRight | RightToLeft | FontDefault

/**
 * Represents rendering text from left-to-right.
 */
export interface LeftToRight {
  readonly _tag: "LeftToRight"
}

/**
 * Represents rendering text from right-to-left.
 */
export interface RightToLeft {
  readonly _tag: "RightToLeft"
}

/**
 * Represents using the default value specified in a `FigFont` to render text.
 */
export interface FontDefault {
  readonly _tag: "FontDefault"
}

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

export const LeftToRight: PrintDirection = {
  _tag: "LeftToRight"
}

export const RightToLeft: PrintDirection = {
  _tag: "RightToLeft"
}

export const FontDefault: PrintDirection = {
  _tag: "FontDefault"
}

// -----------------------------------------------------------------------------
// Operations
// -----------------------------------------------------------------------------

/**
 * Converts the option `PrintDirection` into the `FigFont` parameter
 * `PrintDirection`.
 */
export function toInternalLayout_(
  self: PrintDirection,
  font: FigFont
): FontDirection.PrintDirection {
  return matchTag_(self, {
    LeftToRight: () => FontDirection.LeftToRight,
    RightToLeft: () => FontDirection.RightToLeft,
    FontDefault: () => font.settings.printDirection
  })
}

/**
 * Converts the option `PrintDirection` into the `FigFont` parameter
 * `PrintDirection`.
 *
 * @ets_data_first toInternalLayout_
 */
export function toInternalLayout(font: FigFont) {
  return (self: PrintDirection): FontDirection.PrintDirection =>
    toInternalLayout_(self, font)
}
