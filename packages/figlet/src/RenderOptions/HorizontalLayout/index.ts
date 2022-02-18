// ets_tracing: off

import { matchTag_ } from "@effect-ts/core/Utils"

import * as FontHorizontalLayout from "../../FigFont/HorizontalLayout/index.js"
import type { FigFont } from "../../FigFont/index.js"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

export type HorizontalLayout =
  | FullWidth
  | HorizontalFitting
  | HorizontalSmushing
  | ForceHorizontalSmushing
  | FontDefault

/**
 * Represents the display of all `FigCharacter`s at their full width, which may
 * be fixed or variable, depending on the font.
 */
export interface FullWidth {
  readonly _tag: "FullWidth"
}

/**
 * Represents the display of all `FigCharacter`s using a kerning strategy to
 * render the font text.
 *
 * A kerning strateg implies that as many blanks as possible are removed
 * between `FigCharacter`s, so that they touch, but the `FigCharacter`s
 * are not smushed.
 */
export interface HorizontalFitting {
  readonly _tag: "HorizontalFitting"
}

/**
 * Represents the display of all `FigCharacter`s as close together as possible,
 * and overlapping sub-characters are removed.
 *
 * Exactly which sub-characters count as overlapping depends on the font's
 * layout mode, which is defined by the font's author. It will not smush a font
 * whose author specified kerning or full width as the default layout mode
 */
export interface HorizontalSmushing {
  readonly _tag: "HorizontalSmushing"
}

/**
 * Represents the display of all `FigCharacter`s as close together as possible,
 * and overlapping sub-characters are removed.
 *
 * Exactly which sub-characters count as overlapping depends on the font's
 * layout mode, which is defined by the font's author. It will attempt to
 * smush the character even if the font author specified kerning or full width
 * as the default layout mode.
 */
export interface ForceHorizontalSmushing {
  readonly _tag: "ForceHorizontalSmushing"
}

/**
 * Use the default value specified in the `FigFont` for the `HorizontalLayout`.
 */
export interface FontDefault {
  readonly _tag: "FontDefault"
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

export const HorizontalSmushing: HorizontalLayout = {
  _tag: "HorizontalSmushing"
}

export const ForceHorizontalSmushing: HorizontalLayout = {
  _tag: "ForceHorizontalSmushing"
}

export const FontDefault: HorizontalLayout = {
  _tag: "FontDefault"
}

// -----------------------------------------------------------------------------
// Operations
// -----------------------------------------------------------------------------

/**
 * Converts the option `HorizontalLayout` into the `FigFont` parameter
 * `HorizontalLayout`.
 */
export function toInternalLayout_(
  self: HorizontalLayout,
  font: FigFont
): FontHorizontalLayout.HorizontalLayout {
  return matchTag_(self, {
    FullWidth: () => FontHorizontalLayout.FullWidth,
    HorizontalFitting: () => FontHorizontalLayout.HorizontalFitting,
    HorizontalSmushing: () => font.settings.hLayout,
    ForceHorizontalSmushing: () =>
      font.settings.hLayout._tag === "ControlledSmushing"
        ? font.settings.hLayout
        : FontHorizontalLayout.UniversalSmushing,
    FontDefault: () => font.settings.hLayout
  })
}

/**
 * Converts the option `HorizontalLayout` into the `FigFont` parameter
 * `HorizontalLayout`.
 *
 * @ets_data_first toInternalLayout_
 */
export function toInternalLayout(font: FigFont) {
  return (self: HorizontalLayout): FontHorizontalLayout.HorizontalLayout =>
    toInternalLayout_(self, font)
}
