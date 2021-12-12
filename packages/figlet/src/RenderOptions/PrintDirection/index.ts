// ets_tracing: off

import { Tagged } from "@effect-ts/core/Case"
import { matchTag_ } from "@effect-ts/core/Utils"

import type { FigFont } from "../../FigFont"
import * as FontDirection from "../../FigFont/PrintDirection"

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
export class LeftToRight extends Tagged("LeftToRight")<{}> {}

/**
 * Represents rendering text from right-to-left.
 */
export class RightToLeft extends Tagged("RightToLeft")<{}> {}

/**
 * Represents using the default value specified in a `FigFont` to render text.
 */
export class FontDefault extends Tagged("FontDefault")<{}> {}

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
    LeftToRight: () => new FontDirection.LeftToRight(),
    RightToLeft: () => new FontDirection.RightToLeft(),
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
