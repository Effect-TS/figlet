// ets_tracing: off

import * as P from "@effect-ts/core/Prelude"
import type { URI } from "@effect-ts/core/Prelude/HKT"

import type { MergeActionURI } from "./definition.js"
import { Continue } from "./definition.js"
import { map, zipBoth } from "./operations.js"

export const Any = P.instance<P.Any<[URI<MergeActionURI>]>>({
  any: () => new Continue({ value: {} })
})

export const Covariant = P.instance<P.Covariant<[URI<MergeActionURI>]>>({
  ...Any,
  map
})

export const AssociativeBoth = P.instance<P.AssociativeBoth<[URI<MergeActionURI>]>>({
  both: zipBoth
})

export const Applicative = P.instance<P.Applicative<[URI<MergeActionURI>]>>({
  ...Any,
  ...Covariant,
  ...AssociativeBoth
})
