// ets_tracing: off

import type { Equal } from "@effect-ts/core/Equal"
import * as Eq from "@effect-ts/core/Equal"
import * as Structural from "@effect-ts/core/Structural"

import type { FigFont } from "./definition.js"

// -----------------------------------------------------------------------------
// Equals
// -----------------------------------------------------------------------------

export const equalFigFont: Equal<FigFont> = Eq.makeEqual(Structural.equals)
