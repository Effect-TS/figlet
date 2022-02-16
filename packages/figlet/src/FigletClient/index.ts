// ets_tracing: off

import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import type { NonEmptyArray } from "@effect-ts/core/Collections/Immutable/NonEmptyArray"
import * as NA from "@effect-ts/core/Collections/Immutable/NonEmptyArray"
import * as T from "@effect-ts/core/Effect"
import * as L from "@effect-ts/core/Effect/Layer"
import * as S from "@effect-ts/core/Effect/Stream"
import * as Sink from "@effect-ts/core/Effect/Stream/Sink"
import * as Transducer from "@effect-ts/core/Effect/Stream/Transducer"
import { pipe } from "@effect-ts/core/Function"
import type { Has } from "@effect-ts/core/Has"
import { service, tag } from "@effect-ts/core/Has"
import * as O from "@effect-ts/core/Option"
import type { _A } from "@effect-ts/core/Utils"
import type { Byte } from "@effect-ts/node/Byte"
import * as NodeJSFileSystem from "fs"
import * as NodeJSPath from "path"

import type { FigFont } from "../FigFont/index.js"
import * as FF from "../FigFont/index.js"
import type { FigletException } from "../FigletException/index.js"
import { FigletFileError } from "../FigletException/index.js"
import type { Figure } from "../Figure/index.js"
import * as Fig from "../Figure/index.js"
import { FontFileReader } from "../FontFileReader/index.js"
import type { InternalFont } from "../Internal/index.js"
import { splitLines, utf8Decode } from "../Internal/Transducers/index.js"
import * as Rendering from "../Rendering/index.js"
import type { RenderOptions } from "../RenderOptions/index.js"

// -----------------------------------------------------------------------------
// Figlet Client
// -----------------------------------------------------------------------------

export const FigletClientId = Symbol()
export type FigletClientId = typeof FigletClientId

export const makeFigletClient = T.gen(function* (_) {
  const { read } = yield* _(FontFileReader)

  const fontsPath = NodeJSPath.join(__dirname, "..", "Internal", "fonts")
  const fontFiles = yield* _(listFontFiles(fontsPath))

  return service({
    defaultFont: "standard" as const,
    defaultMaxWidth: 80,
    internalFonts: pipe(
      fontFiles,
      C.map((file) => NodeJSPath.basename(file).replace(".flf", "") as InternalFont)
    ),
    loadFont: (path: string) => read(path, createFigFont),
    loadFontInternal: (name: InternalFont) =>
      pipe(
        fontFiles,
        C.find((file) => NodeJSPath.basename(file) === `${name}.flf`),
        O.fold(
          () =>
            T.fail(
              NA.single(
                new FigletFileError({
                  message: `Unable to locate internal font file for '${name}'`
                })
              )
            ),
          (filepath) => read(filepath, createFigFont)
        )
      )
  })
})

export interface FigletClient extends _A<typeof makeFigletClient> {}

export const FigletClient = tag<FigletClient>(FigletClientId)

export type HasFigletClient = Has<FigletClient>

export const LiveFigletClient = L.fromEffect(FigletClient)(makeFigletClient)

export const {
  defaultFont,
  defaultMaxWidth,
  internalFonts,
  loadFont,
  loadFontInternal
} = T.deriveLifted(FigletClient)(["loadFont", "loadFontInternal"], [] as never, [
  "defaultFont",
  "defaultMaxWidth",
  "internalFonts"
])

function createFigFont(
  file: string,
  buffer: S.IO<FigletException, Byte>
): T.IO<NonEmptyArray<FigletException>, FigFont> {
  const transducer = Transducer.then(splitLines)(utf8Decode)
  return pipe(
    buffer,
    S.aggregate(transducer),
    S.run(Sink.collectAll()),
    T.mapError(NA.single),
    T.chain((lines) => T.fromEither(() => FF.fromFile(file, lines)))
  )
}

// -----------------------------------------------------------------------------
// Operations
// -----------------------------------------------------------------------------

/**
 * Render the specified text to a `Figure` using the provided `RenderOptions`.
 */
export function renderToFigure(text: string, options: RenderOptions): Figure {
  return Rendering.render(text, options)
}

/**
 * Render the specified text to a string using the provided `RenderOptions`.
 */
export function renderToString(text: string, options: RenderOptions): string {
  return Fig.showFigure.show(renderToFigure(text, options))
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

function listFontFiles(path: string): T.IO<FigletException, Chunk<string>> {
  return T.effectAsync((resume) => {
    NodeJSFileSystem.readdir(path, { withFileTypes: true }, (err, dirents) => {
      if (err) {
        resume(T.fail(new FigletFileError({ message: err.message })))
      } else {
        resume(
          pipe(
            C.from(dirents),
            C.forEachF(T.Applicative)((dirent) => {
              const fullPath = NodeJSPath.resolve(path, dirent.name)
              return dirent.isDirectory()
                ? listFontFiles(fullPath)
                : dirent.name.endsWith(".flc")
                ? T.succeed(C.empty<InternalFont>())
                : T.succeed(C.single(fullPath))
            }),
            T.map(C.flatten)
          )
        )
      }
    })
  })
}
