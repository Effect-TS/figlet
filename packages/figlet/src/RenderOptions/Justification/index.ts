// ets_tracing: off

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * Represents an option to choose the justification of the font text.
 */
export type Justification = Center | FlushLeft | FlushRight | FontDefault

/**
 * Renders the font output centered horizontally.
 */
export interface Center {
  readonly _tag: "Center"
}

/**
 * Renders the font output flush to the left.
 */
export interface FlushLeft {
  readonly _tag: "FlushLeft"
}

/**
 * Renders the font output flush to the right.
 */
export interface FlushRight {
  readonly _tag: "FlushRight"
}

/**
 * Uses the default value specified in the `FigFont` to render the font.
 */
export interface FontDefault {
  readonly _tag: "FontDefault"
}

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

export const Center: Justification = {
  _tag: "Center"
}

export const FlushLeft: Justification = {
  _tag: "FlushLeft"
}

export const FlushRight: Justification = {
  _tag: "FlushRight"
}

export const FontDefault: Justification = {
  _tag: "FontDefault"
}
