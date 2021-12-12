// ets_tracing: off

import { Case } from "@effect-ts/core/Case"
import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import type { NonEmptyArray } from "@effect-ts/core/Collections/Immutable/NonEmptyArray"
import * as T from "@effect-ts/core/Effect"
import { not, pipe } from "@effect-ts/core/Function"
import type { Has } from "@effect-ts/core/Has"
import type { Option } from "@effect-ts/core/Option"
import * as O from "@effect-ts/core/Option"

import type { FigFont } from "../FigFont"
import * as FigletClient from "../FigletClient"
import type { FigletException } from "../FigletException"
import type { Figure } from "../Figure"
import * as Fig from "../Figure"
import type { InternalFont } from "../Internal"
import { RenderOptions } from "../RenderOptions"
import type { HorizontalLayout } from "../RenderOptions/HorizontalLayout"
import * as HL from "../RenderOptions/HorizontalLayout"
import type { Justification } from "../RenderOptions/Justification"
import * as J from "../RenderOptions/Justification"
import type { PrintDirection } from "../RenderOptions/PrintDirection"
import * as PD from "../RenderOptions/PrintDirection"
import type { BuilderAction } from "./BuilderAction"
import * as Actions from "./BuilderAction"

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * Represents a collection of rendering options.
 *
 * This builder works by recording what settings a user wants to use instead of
 * applying the setting immediately when calling a method. This allows for a
 * fail-safe behaviour when, for instance, a user wants to load a file but the
 * file is missing. Instead of receiving an exception when calling
 * `OptionsBuilder.withFont`, the builder will simply record the desire of to
 * load a file. The actual loading, and failure, will happen and be handled when
 * calling `OptionsBuilder.compile()`.
 */
export class OptionsBuilder {
  constructor(
    /**
     * The list of actions that will be executed to obtain the final
     * configuration.
     */
    readonly actions: Chunk<BuilderAction> = C.empty()
  ) {}
}

export class BuildData extends Case<{
  readonly font: Option<FigFont>
  readonly horizontalLayout: HorizontalLayout
  readonly justification: Justification
  readonly maxWidth: Option<number>
  readonly printDirection: PrintDirection
  readonly text: string
}> {}

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/**
 * Creates a new `OptionsBuilder` with default settings.
 */
export function builder(): OptionsBuilder {
  return new OptionsBuilder()
}

/**
 * Creates a new `OptionsBuilder` with default settings and using an initial
 * action.
 */
export function withInitialAction(initialAction: BuilderAction): OptionsBuilder {
  return new OptionsBuilder(C.single(initialAction))
}

/**
 * Create a new instance of `BuildData` using the provided parameters.
 */
export function buildData(
  params: Partial<{
    font: Option<FigFont>
    horizontalLayout: HorizontalLayout
    justification: Justification
    maxWidth: Option<number>
    printDirection: PrintDirection
    text: string
  }> = {}
): BuildData {
  return new BuildData({
    font: O.none,
    horizontalLayout: new HL.FontDefault(),
    justification: new J.FontDefault(),
    maxWidth: O.none,
    printDirection: new PD.FontDefault(),
    text: "",
    ...params
  })
}

// -----------------------------------------------------------------------------
// Combinators
// -----------------------------------------------------------------------------

/**
 * Set the text to render.
 */
export function text_(self: OptionsBuilder, text: string): OptionsBuilder {
  return addAction(self, new Actions.SetText({ text }))
}

/**
 * Set the text to render.
 *
 * @ets_data_first text_
 */
export function text(text: string) {
  return (self: OptionsBuilder): OptionsBuilder => text_(self, text)
}

/**
 * Use the default `FigFont` to render the text.
 */
export function withDefaultFont(self: OptionsBuilder): OptionsBuilder {
  return addAction(self, new Actions.DefaultFont())
}

/**
 * Use one of the internal fonts to render the text.
 *
 * The loading of the font is performed when the `RenderOptions` is built.
 */
export function withInternalFont_(
  self: OptionsBuilder,
  font: InternalFont
): OptionsBuilder {
  return addAction(self, new Actions.LoadInternalFont({ font }))
}

/**
 * Use one of the internal fonts to render the text.
 *
 * The loading of the font is performed when the `RenderOptions` is built.
 *
 * @ets_data_first withInternalFont_
 */
export function withInternalFont(font: InternalFont) {
  return (self: OptionsBuilder): OptionsBuilder => withInternalFont_(self, font)
}

/**
 * Use a font loaded from a Figlet file to render the text.
 *
 * The loading of the font is performed when the `RenderOptions` is built.
 */
export function withFont_(self: OptionsBuilder, fontPath: string): OptionsBuilder {
  return addAction(self, new Actions.LoadFont({ fontPath }))
}

/**
 * Use a font loaded from a Figlet file to render the text.
 *
 * The loading of the font is performed when the `RenderOptions` is built.
 *
 * @ets_data_first withFont_
 */
export function withFont(fontPath: string) {
  return (self: OptionsBuilder): OptionsBuilder => withFont_(self, fontPath)
}

/**
 * Use a font that has already been loaded to render the text.
 */
export function withFigFont_(self: OptionsBuilder, font: FigFont): OptionsBuilder {
  return addAction(self, new Actions.SetFont({ font }))
}

/**
 * Use a font that has already been loaded to render the text.
 *
 * @ets_data_first withFigFont_
 */
export function withFigFont(font: FigFont) {
  return (self: OptionsBuilder) => withFigFont_(self, font)
}

/**
 * Use the default horizontal layout to render the text.
 */
export function withDefaultHorizontalLayout(self: OptionsBuilder): OptionsBuilder {
  return addAction(self, new Actions.DefaultHorizontalLayout())
}

/**
 * Use the specified `HorizontalLayout` to render the text.
 */
export function withHorizontalLayout_(
  self: OptionsBuilder,
  layout: HorizontalLayout
): OptionsBuilder {
  return addAction(self, new Actions.SetHorizontalLayout({ layout }))
}

/**
 * Use the specified `HorizontalLayout` to render the text.
 *
 * @ets_data_first withHorizontalLayout_
 */
export function withHorizontalLayout(layout: HorizontalLayout) {
  return (self: OptionsBuilder): OptionsBuilder => withHorizontalLayout_(self, layout)
}

/**
 * Use the default maximum width to render the text.
 */
export function withDefaultMaxWidth(self: OptionsBuilder): OptionsBuilder {
  return addAction(self, new Actions.DefaultMaxWidth())
}

/**
 * Use the specified maximum width to render the text.
 */
export function withMaxWidth_(self: OptionsBuilder, maxWidth: number): OptionsBuilder {
  return addAction(self, new Actions.SetMaxWidth({ maxWidth }))
}

/**
 * Use the specified maximum width to render the text.
 *
 * @ets_data_first withMaxWidth_
 */
export function withMaxWidth(maxWidth: number) {
  return (self: OptionsBuilder): OptionsBuilder => withMaxWidth_(self, maxWidth)
}

/**
 * Use the default print direction to render the text.
 *
 * **NOTE**: This feature is not yet implemented and will have no effect.
 */
export function withDefaultPrintDirection(self: OptionsBuilder): OptionsBuilder {
  return addAction(self, new Actions.DefaultPrintDirection())
}

/**
 * Use the specified print direction to render the text.
 *
 * **NOTE**: This feature is not yet implemented and will have no effect.
 */
export function withPrintDirection_(
  self: OptionsBuilder,
  direction: PrintDirection
): OptionsBuilder {
  return addAction(self, new Actions.SetPrintDirection({ direction }))
}

/**
 * Use the specified print direction to render the text.
 *
 * **NOTE**: This feature is not yet implemented and will have no effect.
 *
 * @ets_data_first withPrintDirection_
 */
export function withPrintDirection(direction: PrintDirection) {
  return (self: OptionsBuilder): OptionsBuilder => withPrintDirection_(self, direction)
}

/**
 * Use the default justification to render the text.
 *
 * **NOTE**: This feature is not yet implemented and will have no effect.
 */
export function withDefaultJustification(self: OptionsBuilder): OptionsBuilder {
  return addAction(self, new Actions.DefaultJustification())
}

/**
 * Use the specified justification to render the text.
 *
 * **NOTE**: This feature is not yet implemented and will have no effect.
 */
export function withJustification_(
  self: OptionsBuilder,
  justification: Justification
): OptionsBuilder {
  return addAction(self, new Actions.SetJustification({ justification }))
}

/**
 * Use the specified justification to render the text.
 *
 * **NOTE**: This feature is not yet implemented and will have no effect.
 *
 * @ets_data_first withJustification_
 */
export function withJustification(justification: Justification) {
  return (self: OptionsBuilder): OptionsBuilder =>
    withJustification_(self, justification)
}

// -----------------------------------------------------------------------------
// Destructors
// -----------------------------------------------------------------------------

export function toBuildData(
  self: OptionsBuilder
): T.Effect<Has<FigletClient.FigletClient>, NonEmptyArray<FigletException>, BuildData> {
  return T.chain_(FigletClient.defaultFont, (defaultFont) =>
    C.reduceM_(self.actions, buildData(), (data, action) => {
      return pipe(
        action,
        T.matchTag({
          // Fonts
          DefaultFont: () =>
            pipe(
              FigletClient.loadFontInternal(defaultFont),
              T.map((font) => data.copy({ font: O.some(font) }))
            ),
          SetFont: (_) => T.succeed(data.copy({ font: O.some(_.font) })),
          LoadFont: (_) =>
            pipe(
              FigletClient.loadFont(_.fontPath),
              T.map((font) => data.copy({ font: O.some(font) }))
            ),
          LoadInternalFont: (_) =>
            pipe(
              FigletClient.loadFontInternal(_.font),
              T.map((font) => data.copy({ font: O.some(font) }))
            ),

          // Horizontal Layout
          DefaultHorizontalLayout: () =>
            T.succeed(data.copy({ horizontalLayout: new HL.FontDefault() })),
          SetHorizontalLayout: (_) =>
            T.succeed(data.copy({ horizontalLayout: _.layout })),

          // Justification
          DefaultJustification: () =>
            T.succeed(data.copy({ justification: new J.FontDefault() })),
          SetJustification: (_) =>
            T.succeed(data.copy({ justification: _.justification })),

          // Max Width
          DefaultMaxWidth: () => T.succeed(data.copy({ maxWidth: O.none })),
          SetMaxWidth: (_) => T.succeed(data.copy({ maxWidth: O.some(_.maxWidth) })),

          // Print Direction
          DefaultPrintDirection: () =>
            T.succeed(data.copy({ printDirection: new PD.FontDefault() })),
          SetPrintDirection: (_) =>
            T.succeed(data.copy({ printDirection: _.direction })),

          // Text
          SetText: (_) => T.succeed(data.copy({ text: _.text }))
        })
      )
    })
  )
}

export function toRenderOptions(
  self: OptionsBuilder
): T.Effect<
  Has<FigletClient.FigletClient>,
  NonEmptyArray<FigletException>,
  RenderOptions
> {
  return pipe(
    T.do,
    T.bind("options", () => toBuildData(self)),
    T.bind("font", ({ options }) =>
      pipe(
        options.font,
        O.fold(
          () => pipe(FigletClient.defaultFont, T.chain(FigletClient.loadFontInternal)),
          T.succeed
        )
      )
    ),
    T.bind("maxWidth", ({ options }) =>
      pipe(
        options.maxWidth,
        O.fold(() => FigletClient.defaultMaxWidth, T.succeed)
      )
    ),
    T.map(
      ({ font, maxWidth, options }) =>
        new RenderOptions({
          font,
          maxWidth,
          horizontalLayout: options.horizontalLayout,
          justification: options.justification,
          printDirection: options.printDirection
        })
    )
  )
}

export function toString(
  self: OptionsBuilder
): T.Effect<Has<FigletClient.FigletClient>, NonEmptyArray<FigletException>, string> {
  return T.map_(toFigure(self), Fig.showFigure.show)
}

export function toFigure(
  self: OptionsBuilder
): T.Effect<Has<FigletClient.FigletClient>, NonEmptyArray<FigletException>, Figure> {
  return T.gen(function* (_) {
    const buildOptions = yield* _(toBuildData(self))
    const renderOptions = yield* _(toRenderOptions(self))
    return yield* _(FigletClient.renderString(buildOptions.text, renderOptions))
  })
}

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

function addAction(self: OptionsBuilder, action: BuilderAction): OptionsBuilder {
  return new OptionsBuilder(
    pipe(self.actions, C.filter(not(Actions.sameGroupAs(action))), C.prepend(action))
  )
}
