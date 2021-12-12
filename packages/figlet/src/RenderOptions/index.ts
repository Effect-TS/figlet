// ets_tracing: off

import { Case } from "@effect-ts/core/Case"

import type { FigFont } from "../FigFont"
import type { HorizontalLayout } from "./HorizontalLayout"
import type { Justification } from "./Justification"
import type { PrintDirection } from "./PrintDirection"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * The rendering options for a `FigFont`, including the `FigFont` to use.
 */
export class RenderOptions extends Case<{
  /**
   * The `FigFont` to use to render the text.
   */
  readonly font: FigFont
  /**
   * The maximum width of the rendered text.
   */
  readonly maxWidth: number
  /**
   * The desired horizontal layout to use to render the text.
   */
  readonly horizontalLayout: HorizontalLayout
  /**
   * The desired print direction to use to render the text.
   */
  readonly printDirection: PrintDirection
  /**
   * The desired text justification to use to render the text.
   */
  readonly justification: Justification
}> {}
