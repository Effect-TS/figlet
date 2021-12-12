import * as NA from "@effect-ts/core/Collections/Immutable/NonEmptyArray"
import * as E from "@effect-ts/core/Either"

import type { FigletResult } from "../src/FigletException"

export function stringifyError<A>(value: FigletResult<A>) {
  return E.mapLeft_(
    value,
    NA.map((error) => `${error._tag} - ${error.message}`)
  )
}
