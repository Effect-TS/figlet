import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as Map from "@effect-ts/core/Collections/Immutable/Map"
import * as E from "@effect-ts/core/Either"
import * as O from "@effect-ts/core/Option"
import { pipe } from "@effect-ts/system/Function"

import type { FigCharacter } from "../../../src/FigCharacter"
import * as FC from "../../../src/FigCharacter"
import type { FigletResult } from "../../../src/FigletException"
import * as SubLines from "../../../src/SubLines"
import * as StandardFont from "../StandardFont"
import { TestHeader } from "../TestHeader"

// -----------------------------------------------------------------------------
// Test Character
// -----------------------------------------------------------------------------

export function get(params: {
  char: string
  lines?: SubLines.SubLines
  maxWidth?: number
  height?: number
}): FigletResult<FigCharacter> {
  const config = {
    lines: getChain("032", (x) => C.single(x)),
    maxWidth: Number.parseInt(TestHeader.default.maxLength),
    height: Number.parseInt(TestHeader.default.height),
    ...params
  }
  const header = TestHeader.default
    .copy({
      maxLength: `${config.maxWidth}`,
      height: `${config.height}`
    })
    .toFigHeader()

  return E.chain_(header, (h) =>
    FC.makeFromHeader("", h, config.char, config.lines, O.none, 123)
  )
}

export function chain(
  f: (name: string, index: number) => Chunk<string>
): SubLines.SubLines {
  return getChain("036", f)
}

export function getChain(
  name: string,
  f: (name: string, index: number) => Chunk<string>
): SubLines.SubLines {
  return pipe(
    Map.lookup_(StandardFont.characters, name),
    O.fold(
      () => {
        throw new Error(`Invalid name ${name}`)
      },
      (s) =>
        SubLines.fromValue(
          pipe(
            C.from(s.split("\n")),
            C.zipWithIndex,
            C.chain(({ tuple: [name, index] }) => f(name, index))
          )
        )
    )
  )
}
