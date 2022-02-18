import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as E from "@effect-ts/core/Either"
import { pipe } from "@effect-ts/core/Function"
import * as O from "@effect-ts/core/Option"

import * as VerticalLayout from "../../src/FigFont/VerticalLayout"
import * as VerticalSmushingRule from "../../src/FigFont/VerticalSmushingRule"
import * as FullLayout from "../../src/FigHeader/FullLayout"
import { TestHeader } from "../fixtures/TestHeader"

const header = TestHeader.default

describe("VerticalLayout", () => {
  describe("fromHeader", () => {
    it.concurrent.each([
      {
        input: "not present",
        headerValue: O.emptyOf<Chunk<FullLayout.FullLayout>>(),
        fontValue: VerticalLayout.FullHeight
      },
      {
        input: "an empty list",
        headerValue: O.some(C.empty<FullLayout.FullLayout>()),
        fontValue: VerticalLayout.FullHeight
      },
      {
        input: "VerticalFitting",
        headerValue: O.some(C.single(FullLayout.VerticalFitting)),
        fontValue: VerticalLayout.VerticalFitting
      },
      {
        input: "VerticalSmushing",
        headerValue: O.some(C.single(FullLayout.VerticalSmushing)),
        fontValue: VerticalLayout.UniversalSmushing
      },
      {
        input: "VerticalSmushing with EqualCharacterVerticalSmushing",
        headerValue: O.some(
          C.from([
            FullLayout.VerticalSmushing,
            FullLayout.EqualCharacterVerticalSmushing
          ])
        ),
        fontValue: VerticalLayout.ControlledSmushing(
          C.from([VerticalSmushingRule.EqualCharacter])
        )
      },
      {
        input: "VerticalSmushing with UnderscoreVerticalSmushing",
        headerValue: O.some(
          C.from([FullLayout.VerticalSmushing, FullLayout.UnderscoreVerticalSmushing])
        ),
        fontValue: VerticalLayout.ControlledSmushing(
          C.from([VerticalSmushingRule.Underscore])
        )
      },
      {
        input: "VerticalSmushing with HierarchyVerticalSmushing",
        headerValue: O.some(
          C.from([FullLayout.VerticalSmushing, FullLayout.HierarchyVerticalSmushing])
        ),
        fontValue: VerticalLayout.ControlledSmushing(
          C.from([VerticalSmushingRule.Hierarchy])
        )
      },
      {
        input: "VerticalSmushing with HorizontalLineVerticalSmushing",
        headerValue: O.some(
          C.from([
            FullLayout.VerticalSmushing,
            FullLayout.HorizontalLineVerticalSmushing
          ])
        ),
        fontValue: VerticalLayout.ControlledSmushing(
          C.from([VerticalSmushingRule.HorizontalLine])
        )
      },
      {
        input: "VerticalSmushing with VerticalLineSupersmushing",
        headerValue: O.some(
          C.from([FullLayout.VerticalSmushing, FullLayout.VerticalLineSupersmushing])
        ),
        fontValue: VerticalLayout.ControlledSmushing(
          C.from([VerticalSmushingRule.VerticalLineSupersmushing])
        )
      }
    ])(
      "should return the correct values when fullLayout is $input",
      ({ fontValue, headerValue }) => {
        const computed = pipe(
          header.toFigHeader(),
          E.map((_) => _.copy({ fullLayout: headerValue })),
          E.chain(VerticalLayout.fromHeader)
        )

        expect(computed).toEqual(E.right(fontValue))
      }
    )

    it("should return multiple smushing rules in the output", () => {
      const input = C.from([
        FullLayout.VerticalSmushing,
        FullLayout.UnderscoreVerticalSmushing,
        FullLayout.HierarchyVerticalSmushing
      ])
      const computed = pipe(
        header.toFigHeader(),
        E.map((_) => _.copy({ fullLayout: O.some(input) })),
        E.chain(VerticalLayout.fromHeader)
      )

      expect(computed).toEqual(
        E.right(
          VerticalLayout.ControlledSmushing(
            C.from([VerticalSmushingRule.Underscore, VerticalSmushingRule.Hierarchy])
          )
        )
      )
    })
  })
})
