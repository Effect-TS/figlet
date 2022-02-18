import * as T from "@effect-ts/core/Effect"
import { pipe } from "@effect-ts/core/Function"
import { runMain } from "@effect-ts/node/Runtime"

import * as FigletClient from "../../src/FigletClient"
import * as FontFileReader from "../../src/FontFileReader"
import * as OptionsBuilder from "../../src/OptionsBuilder"
import * as HorizontalLayout from "../../src/RenderOptions/HorizontalLayout"
import * as Justification from "../../src/RenderOptions/Justification"
import * as PrintDirection from "../../src/RenderOptions/PrintDirection"

pipe(
  OptionsBuilder.builder(),
  OptionsBuilder.withMaxWidth(140),
  OptionsBuilder.withInternalFont("slant"),
  OptionsBuilder.withHorizontalLayout(HorizontalLayout.HorizontalFitting),
  OptionsBuilder.withJustification(Justification.FontDefault),
  OptionsBuilder.withPrintDirection(PrintDirection.LeftToRight),
  OptionsBuilder.text("Hello, World!"),
  OptionsBuilder.renderToString,
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
