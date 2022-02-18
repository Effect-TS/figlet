import * as T from "@effect-ts/core/Effect"
import { pipe } from "@effect-ts/core/Function"
import * as TE from "@effect-ts/jest/Test"
import * as Path from "path"

import { defaultMaxWidth, LiveFigletClient } from "../src/FigletClient"
import { LiveFontFileReader } from "../src/FontFileReader"
import * as OptionsBuilder from "../src/OptionsBuilder"
import * as HorizontalLayout from "../src/RenderOptions/HorizontalLayout"
import * as Justification from "../src/RenderOptions/Justification"
import * as PrintDirection from "../src/RenderOptions/PrintDirection"

describe("OptionsBuilder", () => {
  const { it } = TE.runtime((_) =>
    _[">+>"](LiveFontFileReader[">>>"](LiveFigletClient))
  )

  describe("Text", () => {
    it("should set the text to render", () =>
      T.gen(function* (_) {
        const expected = "Hello World!"
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.text(expected),
          OptionsBuilder.renderToFigure
        )
        const computed = yield* _(builder)

        expect(computed.value).toBe(expected)
      }))

    it("should use the latest text value", () =>
      T.gen(function* (_) {
        const expected = "William Shakespeare"
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.text(
            "All the world’s a stage, and all the men and women merely players."
          ),
          OptionsBuilder.text(expected),
          OptionsBuilder.renderToFigure
        )
        const computed = yield* _(builder)

        expect(computed.value).toBe(expected)
      }))
  })

  describe("Fonts", () => {
    it("should set and load the default font", () =>
      T.gen(function* (_) {
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withDefaultFont,
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.font.name).toBe("standard")
      }))

    it("should set and load an internal font", () =>
      T.gen(function* (_) {
        const expected = "standard"
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withInternalFont(expected),
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.font.name).toBe(expected)
      }))

    it("should use the last font set", () =>
      T.gen(function* (_) {
        const expected = "standard"
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withInternalFont("shadow"),
          OptionsBuilder.withDefaultFont,
          OptionsBuilder.withInternalFont(expected),
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.font.name).toBe(expected)
      }))

    it("should set and load a font from a file", () =>
      T.gen(function* (_) {
        const expected = "alligator"
        const fontPath = Path.join(
          __dirname,
          "..",
          "src",
          "Internal",
          "fonts",
          `${expected}.flf`
        )
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withFont(fontPath),
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.font.name).toBe(expected)
      }))
  })

  describe("Horizontal Layout", () => {
    it("should set the horizontal layout to the font default", () =>
      T.gen(function* (_) {
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withDefaultHorizontalLayout,
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.horizontalLayout).equals(HorizontalLayout.FontDefault)
      }))

    it("should set a horizontal layout", () =>
      T.gen(function* (_) {
        const expected = HorizontalLayout.HorizontalFitting
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withHorizontalLayout(expected),
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.horizontalLayout).equals(expected)
      }))

    it("should use the latest horizontal layout", () =>
      T.gen(function* (_) {
        const expected = HorizontalLayout.HorizontalFitting
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withHorizontalLayout(HorizontalLayout.HorizontalSmushing),
          OptionsBuilder.withDefaultHorizontalLayout,
          OptionsBuilder.withHorizontalLayout(expected),
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.horizontalLayout).equals(expected)
      }))
  })

  describe("Max Width", () => {
    it("should set the maxWidth to the default value", () =>
      T.gen(function* (_) {
        const expected = yield* _(defaultMaxWidth)
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withDefaultMaxWidth,
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.maxWidth).toBe(expected)
      }))

    it("should set a maxWidth", () =>
      T.gen(function* (_) {
        const expected = 42
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withMaxWidth(expected),
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.maxWidth).toBe(expected)
      }))

    it("should use the latest maxWidth", () =>
      T.gen(function* (_) {
        const expected = 42
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withMaxWidth(120),
          OptionsBuilder.withDefaultMaxWidth,
          OptionsBuilder.withMaxWidth(expected),
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.maxWidth).toBe(expected)
      }))
  })

  describe("Justification", () => {
    it("should set the justification to the font default", () =>
      T.gen(function* (_) {
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withDefaultJustification,
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.justification).equals(Justification.FontDefault)
      }))

    it("should set a justification", () =>
      T.gen(function* (_) {
        const expected = Justification.Center
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withJustification(expected),
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.justification).equals(expected)
      }))

    it("should use the latest justification", () =>
      T.gen(function* (_) {
        const expected = Justification.Center
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withJustification(Justification.FlushRight),
          OptionsBuilder.withDefaultJustification,
          OptionsBuilder.withJustification(expected),
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.justification).equals(expected)
      }))
  })

  describe("Print Direction", () => {
    it("should set the print direction to the font default", () =>
      T.gen(function* (_) {
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withDefaultPrintDirection,
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.printDirection).equals(PrintDirection.FontDefault)
      }))

    it("should set a print direction", () =>
      T.gen(function* (_) {
        const expected = PrintDirection.RightToLeft
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withPrintDirection(expected),
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.printDirection).equals(expected)
      }))

    it("should use the latest print direction", () =>
      T.gen(function* (_) {
        const expected = PrintDirection.RightToLeft
        const builder = pipe(
          OptionsBuilder.builder(),
          OptionsBuilder.withPrintDirection(PrintDirection.LeftToRight),
          OptionsBuilder.withDefaultPrintDirection,
          OptionsBuilder.withPrintDirection(expected),
          OptionsBuilder.toRenderOptions
        )
        const computed = yield* _(builder)

        expect(computed.printDirection).equals(expected)
      }))
  })
})
