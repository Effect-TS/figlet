// ets_tracing: off

import { Case } from "@effect-ts/core/Case"
import type { Equal } from "@effect-ts/core/Equal"
import * as Eq from "@effect-ts/core/Equal"
import * as Structural from "@effect-ts/core/Structural"

import type { HorizontalLayout } from "../HorizontalLayout/index.js"
import type { PrintDirection } from "../PrintDirection/index.js"
import type { VerticalLayout } from "../VerticalLayout/index.js"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * Default settings of a FigFont.
 *
 * @param hLayout The default horizontal layout of the FigFont.
 * @param vLayout The default vertical layout of the FigFont.
 * @param printDirection The default print direction of the FigFont.
 */
export class FigFontSettings extends Case<{
  readonly hLayout: HorizontalLayout
  readonly vLayout: VerticalLayout
  readonly printDirection: PrintDirection
}> {}

// -----------------------------------------------------------------------------
// Instances
// -----------------------------------------------------------------------------

export const equalFigFontSettings: Equal<FigFontSettings> = Eq.makeEqual(
  Structural.equals
)
