import * as T from "@effect-ts/core/Effect"
import { pipe } from "@effect-ts/core/Function"
import { runMain } from "@effect-ts/node/Runtime"

import * as FigletClient from "../../src/FigletClient"
import * as FontFileReader from "../../src/FontFileReader"
import { RenderOptions } from "../../src/RenderOptions"
import * as HorizontalLayout from "../../src/RenderOptions/HorizontalLayout"
import * as Justification from "../../src/RenderOptions/Justification"
import * as PrintDirection from "../../src/RenderOptions/PrintDirection"

const renderOptions = pipe(
  T.struct({
    font: FigletClient.loadFontInternal("slant"),
    maxWidth: T.succeed(120),
    horizontalLayout: T.succeed(HorizontalLayout.HorizontalSmushing),
    justification: T.succeed(Justification.FontDefault),
    printDirection: T.succeed(PrintDirection.LeftToRight)
  }),
  T.map((_) => new RenderOptions(_))
)

pipe(
  renderOptions,
  T.map((options) => FigletClient.renderToString("Hello, World!", options)),
  T.chain((output) =>
    T.succeedWith(() => {
      console.log(output)
    })
  ),
  T.provideSomeLayer(
    FontFileReader.LiveFontFileReader[">>>"](FigletClient.LiveFigletClient)
  ),
  runMain
)

/**
 *     __  __     ____           _       __           __    ____
 *    / / / /__  / / /___       | |     / /___  _____/ /___/ / /
 *   / /_/ / _ \/ / / __ \      | | /| / / __ \/ ___/ / __  / /
 *  / __  /  __/ / / /_/ /      | |/ |/ / /_/ / /  / / /_/ /_/
 * /_/ /_/\___/_/_/\____( )     |__/|__/\____/_/  /_/\__,_(_)
 *                      |/
 */
