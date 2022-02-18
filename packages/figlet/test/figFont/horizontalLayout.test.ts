import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as E from "@effect-ts/core/Either"
import { pipe } from "@effect-ts/core/Function"
import * as O from "@effect-ts/core/Option"

import * as HorizontalLayout from "../../src/FigFont/HorizontalLayout"
import * as HorizontalSmushingRule from "../../src/FigFont/HorizontalSmushingRule"
import * as FullLayout from "../../src/FigHeader/FullLayout"
import * as OldLayout from "../../src/FigHeader/OldLayout"
import { TestHeader } from "../fixtures/TestHeader"
import * as TestUtils from "../test-utils"

const header = TestHeader.default

describe("HorizontalLayout", () => {
  describe("fromOldLayout", () => {
    it.concurrent.each([
      {
        headerValue: OldLayout.FullWidth,
        fontValue: HorizontalLayout.FullWidth
      },
      {
        headerValue: OldLayout.HorizontalFitting,
        fontValue: HorizontalLayout.HorizontalFitting
      },
      {
        headerValue: OldLayout.EqualCharacterSmushing,
        fontValue: HorizontalLayout.ControlledSmushing(
          C.from([HorizontalSmushingRule.EqualCharacter])
        )
      },
      {
        headerValue: OldLayout.UnderscoreSmushing,
        fontValue: HorizontalLayout.ControlledSmushing(
          C.from([HorizontalSmushingRule.Underscore])
        )
      },
      {
        headerValue: OldLayout.HierarchySmushing,
        fontValue: HorizontalLayout.ControlledSmushing(
          C.from([HorizontalSmushingRule.Hierarchy])
        )
      },
      {
        headerValue: OldLayout.OppositePairSmushing,
        fontValue: HorizontalLayout.ControlledSmushing(
          C.from([HorizontalSmushingRule.OppositePair])
        )
      },
      {
        headerValue: OldLayout.BigXSmushing,
        fontValue: HorizontalLayout.ControlledSmushing(
          C.from([HorizontalSmushingRule.BigX])
        )
      },
      {
        headerValue: OldLayout.HardblankSmushing,
        fontValue: HorizontalLayout.ControlledSmushing(
          C.from([HorizontalSmushingRule.Hardblank])
        )
      }
    ])(
      "should return the correct values when oldLayout is $headerValue._tag",
      ({ fontValue, headerValue }) => {
        const computed = pipe(
          header.toFigHeader(),
          E.map((_) => _.copy({ oldLayout: C.single(headerValue) })),
          E.chain(HorizontalLayout.fromOldLayout)
        )

        expect(computed).toEqual(E.right(fontValue))
      }
    )

    it("should return multiple smushing rules in the output", () => {
      const oldLayout = C.from([
        OldLayout.EqualCharacterSmushing,
        OldLayout.UnderscoreSmushing
      ])
      const computed = pipe(
        header.toFigHeader(),
        E.map((_) => _.copy({ oldLayout })),
        E.chain(HorizontalLayout.fromOldLayout)
      )

      expect(computed).toEqual(
        E.right(
          HorizontalLayout.ControlledSmushing(
            C.from([
              HorizontalSmushingRule.EqualCharacter,
              HorizontalSmushingRule.Underscore
            ])
          )
        )
      )
    })

    it("should fail when given FullWidth with a smushing rule", () => {
      const oldLayout = C.from([OldLayout.FullWidth, OldLayout.UnderscoreSmushing])
      const computed = pipe(
        header.toFigHeader(),
        E.map((_) => _.copy({ oldLayout })),
        E.chain(HorizontalLayout.fromOldLayout),
        TestUtils.stringifyError
      )

      expect(computed).toEqual(
        E.left([
          `FigFontError - Could not convert layout settings found in header to a HorizontalLayout, received "-1, 2"`
        ])
      )
    })

    it("should fail when given HorizontalFitting with a smushing rule", () => {
      const oldLayout = C.from([
        OldLayout.HorizontalFitting,
        OldLayout.UnderscoreSmushing
      ])
      const computed = pipe(
        header.toFigHeader(),
        E.map((_) => _.copy({ oldLayout })),
        E.chain(HorizontalLayout.fromOldLayout),
        TestUtils.stringifyError
      )

      expect(computed).toEqual(
        E.left([
          `FigFontError - Could not convert layout settings found in header to a HorizontalLayout, received "0, 2"`
        ])
      )
    })
  })

  describe("fromFullLayout", () => {
    it.concurrent.each([
      {
        input: "not present",
        headerValue: O.emptyOf<Chunk<FullLayout.FullLayout>>(),
        fontValue: O.emptyOf<HorizontalLayout.HorizontalLayout>()
      },
      {
        input: "empty",
        headerValue: O.some(C.empty<FullLayout.FullLayout>()),
        fontValue: O.some(HorizontalLayout.FullWidth)
      },
      {
        input: "HorizontalFitting",
        headerValue: O.some(C.single(FullLayout.HorizontalFitting)),
        fontValue: O.some(HorizontalLayout.HorizontalFitting)
      },
      {
        input: "HorizontalSmushing",
        headerValue: O.some(C.single(FullLayout.HorizontalSmushing)),
        fontValue: O.some(HorizontalLayout.UniversalSmushing)
      },
      {
        input: "HorizontalSmushing with EqualCharacterHorizontalSmushing",
        headerValue: O.some(
          C.from([
            FullLayout.HorizontalSmushing,
            FullLayout.EqualCharacterHorizontalSmushing
          ])
        ),
        fontValue: O.some(
          HorizontalLayout.ControlledSmushing(
            C.from([HorizontalSmushingRule.EqualCharacter])
          )
        )
      },
      {
        input: "HorizontalSmushing with UnderscoreHorizontalSmushing",
        headerValue: O.some(
          C.from([
            FullLayout.HorizontalSmushing,
            FullLayout.UnderscoreHorizontalSmushing
          ])
        ),
        fontValue: O.some(
          HorizontalLayout.ControlledSmushing(
            C.from([HorizontalSmushingRule.Underscore])
          )
        )
      },
      {
        input: "HorizontalSmushing with HierarchyHorizontalSmushing",
        headerValue: O.some(
          C.from([
            FullLayout.HorizontalSmushing,
            FullLayout.HierarchyHorizontalSmushing
          ])
        ),
        fontValue: O.some(
          HorizontalLayout.ControlledSmushing(
            C.from([HorizontalSmushingRule.Hierarchy])
          )
        )
      },
      {
        input: "HorizontalSmushing with OppositePairHorizontalSmushing",
        headerValue: O.some(
          C.from([
            FullLayout.HorizontalSmushing,
            FullLayout.OppositePairHorizontalSmushing
          ])
        ),
        fontValue: O.some(
          HorizontalLayout.ControlledSmushing(
            C.from([HorizontalSmushingRule.OppositePair])
          )
        )
      },
      {
        input: "HorizontalSmushing with BigXHorizontalSmushing",
        headerValue: O.some(
          C.from([FullLayout.HorizontalSmushing, FullLayout.BigXHorizontalSmushing])
        ),
        fontValue: O.some(
          HorizontalLayout.ControlledSmushing(C.from([HorizontalSmushingRule.BigX]))
        )
      },
      {
        input: "HorizontalSmushing with HardblankHorizontalSmushing",
        headerValue: O.some(
          C.from([
            FullLayout.HorizontalSmushing,
            FullLayout.HardblankHorizontalSmushing
          ])
        ),
        fontValue: O.some(
          HorizontalLayout.ControlledSmushing(
            C.from([HorizontalSmushingRule.Hardblank])
          )
        )
      }
    ])(
      "should return the correct values when fullLayout is $input",
      ({ fontValue, headerValue }) => {
        const computed = pipe(
          header.toFigHeader(),
          E.map((_) => _.copy({ fullLayout: headerValue })),
          E.chain(HorizontalLayout.fromFullLayout)
        )

        expect(computed).toEqual(E.right(fontValue))
      }
    )

    it("should return multiple smushing rules in the output", () => {
      const input = C.from([
        FullLayout.HorizontalSmushing,
        FullLayout.EqualCharacterHorizontalSmushing,
        FullLayout.BigXHorizontalSmushing
      ])
      const computed = pipe(
        header.toFigHeader(),
        E.map((_) => _.copy({ fullLayout: O.some(input) })),
        E.chain(HorizontalLayout.fromFullLayout)
      )

      expect(computed).toEqual(
        E.right(
          O.some(
            HorizontalLayout.ControlledSmushing(
              C.from([
                HorizontalSmushingRule.EqualCharacter,
                HorizontalSmushingRule.BigX
              ])
            )
          )
        )
      )
    })
  })

  describe("fromHeader", () => {
    it("should use values from fullLayout when present", () => {
      const oldLayout = C.single(OldLayout.FullWidth)
      const fullLayout = O.some(C.single(FullLayout.HorizontalFitting))
      const computed = pipe(
        header.toFigHeader(),
        E.map((_) => _.copy({ oldLayout, fullLayout })),
        E.chain(HorizontalLayout.fromHeader)
      )

      expect(computed).toEqual(E.right(HorizontalLayout.HorizontalFitting))
    })

    it("should use values from oldLayout when fullLayout is not present", () => {
      const oldLayout = C.single(OldLayout.FullWidth)
      const fullLayout = O.emptyOf<Chunk<FullLayout.FullLayout>>()
      const computed = pipe(
        header.toFigHeader(),
        E.map((_) => _.copy({ oldLayout, fullLayout })),
        E.chain(HorizontalLayout.fromHeader)
      )

      expect(computed).toEqual(E.right(HorizontalLayout.FullWidth))
    })
  })
})
