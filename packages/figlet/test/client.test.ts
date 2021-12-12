import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as NA from "@effect-ts/core/Collections/Immutable/NonEmptyArray"
import * as T from "@effect-ts/core/Effect"
import * as Ex from "@effect-ts/core/Effect/Exit"
import { pipe } from "@effect-ts/core/Function"
import * as TE from "@effect-ts/jest/Test"
import * as path from "path"

import * as FigletClient from "../src/FigletClient"
import * as Figure from "../src/Figure"
import { LiveFontFileReader } from "../src/FontFileReader"
import * as OptionsBuilder from "../src/OptionsBuilder"
import * as SubLines from "../src/SubLines"
import {
  standardBuilder,
  standardInput,
  standardLines
} from "./fixtures/StandardTestData"

describe("Client", () => {
  const { it } = TE.runtime((_) =>
    _[">+>"](LiveFontFileReader[">>>"](FigletClient.LiveFigletClient))
  )

  describe("Rendering APIs", () => {
    it("should print the same data as it renders", () =>
      T.gen(function* (_) {
        const builder = pipe(standardBuilder, OptionsBuilder.text(standardInput))
        const options = yield* _(OptionsBuilder.toRenderOptions(builder))
        const figure = new Figure.Figure({
          font: options.font,
          columns: C.single(SubLines.toSubcolumns(standardLines)),
          value: standardInput
        })
        const computed = yield* _(OptionsBuilder.renderToString(builder))

        expect(Figure.showFigure.show(figure)).toBe(computed)
      }))
  })

  describe("Internal Fonts API", () => {
    jest.setTimeout(20000)

    it("should print the list of internal fonts containing at least the 'standard' font", () =>
      T.gen(function* (_) {
        const fonts = yield* _(FigletClient.internalFonts)
        const defaultFont = yield* _(FigletClient.defaultFont)

        expect(C.toArray(fonts)).toContain(defaultFont)
      }))

    it("should load all internal fonts successfully", () =>
      T.gen(function* (_) {
        const fonts = yield* _(FigletClient.internalFonts)
        const result = yield* _(
          T.result(T.collectAllPar(C.map_(fonts, FigletClient.loadFontInternal)))
        )

        expect(Ex.succeeded(Ex.untraced(result))).toBeTruthy()
      }))

    it("should return a FigletException when trying to load an internal font that does not exist", () =>
      T.gen(function* (_) {
        const result = yield* _(
          pipe(
            // @ts-expect-error - Invalid `InternalFont` specified
            FigletClient.loadFontInternal("non-existent"),
            T.mapError((errors) => {
              const error = NA.head(errors)
              return `${error._tag} - ${error.message}`
            }),
            T.result
          )
        )

        expect(Ex.untraced(result)).equals(
          Ex.fail(
            "FigletFileError - Unable to locate internal font file for 'non-existent'"
          )
        )
      }))
  })

  describe("Fonts API", () => {
    it("should load a Figlet font file", () =>
      T.gen(function* (_) {
        const fontPath = path.join(
          __dirname,
          "..",
          "src",
          "Internal",
          "fonts",
          "alligator.flf"
        )
        const result = yield* _(T.result(FigletClient.loadFont(fontPath)))

        expect(Ex.succeeded(Ex.untraced(result))).toBeTruthy()
      }))

    it("should return a FigletException when trying to load a font that does not exist", () =>
      T.gen(function* (_) {
        const effect = pipe(
          FigletClient.loadFont("non-existent"),
          T.mapError((_) =>
            _.some(
              (_) =>
                _._tag === "FigletFileError" &&
                _.message.includes("ENOENT: no such file or directory")
            )
          ),
          T.result
        )
        const result = yield* _(effect)

        expect(Ex.untraced(result)).equals(Ex.fail(true))
      }))
  })
})
