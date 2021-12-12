import * as Map from "@effect-ts/core/Collections/Immutable/Map"
import * as String from "@effect-ts/core/String"

// -----------------------------------------------------------------------------
// Standard Font
// -----------------------------------------------------------------------------

export const signature = "flf2a"

export const hardblank = "$"

export const height = "6"

export const baseline = "5"

export const maxLength = "16"

export const oldLayout = "15"

export const commentLines = "11"

export const printDirection = "0"

export const fullLayout = "24463"

export const codetagCount = "4"

export const comment = String.stripMargin(
  `|Standard by Glenn Chappell & Ian Chai 3/93 -- based on Frank's .sig
   |Includes ISO Latin-1
   |figlet release 2.1 -- 12 Aug 1994
   |Modified for figlet 2.2 by John Cowan <cowan@ccil.org>
   |  to add Latin-{2,3,4,5} support (Unicode U+0100-017F).
   |Permission is hereby given to modify this font, as long as the
   |modifier's name is placed on a comment line.
   |
   |Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
   |supported by FIGlet and FIGWin.  May also be slightly modified for better use
   |of new full-width/kern/smush alternatives, but default output is NOT changed.`
)

export const characters: Map.Map<string, string> = Map.make([
  [
    "032",
    String.stripMargin(
      `| $@
       | $@
       | $@
       | $@
       | $@
       | $@@`
    )
  ],
  [
    "033",
    String.stripMargin(
      `|  _ @
       | | |@
       | | |@
       | |_|@
       | (_)@
       |    @@`
    )
  ],
  [
    "034",
    String.stripMargin(
      `|  _ _ @
       | ( | )@
       |  V V @
       |   $  @
       |   $  @
       |      @@`
    )
  ],
  [
    "035",
    String.stripMargin(
      `|    _  _   @
       |  _| || |_ @
       | |_  ..  _|@
       | |_      _|@
       |   |_||_|  @
       |           @@`
    )
  ],
  [
    "036",
    String.stripMargin(
      `|   _  @
       |  | | @
       | / __)@
       | \\__ \\@
       | (   /@
       |  |_| @@`
    )
  ],
  [
    "037",
    String.stripMargin(
      `|  _  __@
       | (_)/ /@
       |   / / @
       |  / /_ @
       | /_/(_)@
       |       @@`
    )
  ],
  [
    "038",
    String.stripMargin(
      `|   ___   @
       |  ( _ )  @
       |  / _ \\/\\@
       | | (_>  <@
       |  \\___/\\/@
       |         @@`
    )
  ],
  [
    "039",
    String.stripMargin(
      `|  _ @
       | ( )@
       | |/ @
       |  $ @
       |  $ @
       |    @@`
    )
  ],
  [
    "040",
    String.stripMargin(
      `|   __@
       |  / /@
       | | | @
       | | | @
       | | | @
       |  \\_\\@@`
    )
  ],
  [
    "041",
    String.stripMargin(
      `| __  @
       | \\ \\ @
       |  | |@
       |  | |@
       |  | |@
       | /_/ @@`
    )
  ],
  [
    "042",
    String.stripMargin(
      `|       @
       | __/\\__@
       | \\    /@
       | /_  _\\@
       |   \\/  @
       |       @@`
    )
  ],
  [
    "043",
    String.stripMargin(
      `|        @
       |    _   @
       |  _| |_ @
       | |_   _|@
       |   |_|  @
       |        @@`
    )
  ],
  [
    "044",
    String.stripMargin(
      `|    @
       |    @
       |    @
       |  _ @
       | ( )@
       | |/ @@`
    )
  ],
  [
    "045",
    String.stripMargin(
      `|        @
       |        @
       |  ----- @
       | |_____|@
       |    $   @
       |        @@`
    )
  ],
  [
    "046",
    String.stripMargin(
      `|    @
       |    @
       |    @
       |  _ @
       | (_)@
       |    @@`
    )
  ],
  [
    "047",
    String.stripMargin(
      `|     __@
       |    / /@
       |   / / @
       |  / /  @
       | /_/   @
       |       @@`
    )
  ],
  [
    "048",
    String.stripMargin(
      `|   ___  @
       |  / _ \\ @
       | | | | |@
       | | |_| |@
       |  \\___/ @
       |        @@`
    )
  ],
  [
    "049",
    String.stripMargin(
      `|  _ @
       | / |@
       | | |@
       | | |@
       | |_|@
       |    @@`
    )
  ],
  [
    "050",
    String.stripMargin(
      `|  ____  @
       | |___ \\ @
       |   __) |@
       |  / __/ @
       | |_____|@
       |        @@`
    )
  ],
  [
    "051",
    String.stripMargin(
      `|  _____ @
       | |___ / @
       |   |_ \\ @
       |  ___) |@
       | |____/ @
       |        @@`
    )
  ],
  [
    "052",
    String.stripMargin(
      `|  _  _   @
       | | || |  @
       | | || |_ @
       | |__   _|@
       |    |_|  @
       |         @@`
    )
  ],
  [
    "053",
    String.stripMargin(
      `|  ____  @
       | | ___| @
       | |___ \\ @
       |  ___) |@
       | |____/ @
       |        @@`
    )
  ],
  [
    "054",
    String.stripMargin(
      `|   __   @
       |  / /_  @
       | | '_ \\ @
       | | (_) |@
       |  \\___/ @
       |        @@`
    )
  ],
  [
    "055",
    String.stripMargin(
      `|  _____ @
       | |___  |@
       |    / / @
       |   / /  @
       |  /_/   @
       |        @@`
    )
  ],
  [
    "056",
    String.stripMargin(
      `|   ___  @
       |  ( _ ) @
       |  / _ \\ @
       | | (_) |@
       |  \\___/ @
       |        @@`
    )
  ],
  [
    "057",
    String.stripMargin(
      `|   ___  @
       |  / _ \\ @
       | | (_) |@
       |  \\__, |@
       |    /_/ @
       |        @@`
    )
  ],
  [
    "058",
    String.stripMargin(
      `|    @
       |  _ @
       | (_)@
       |  _ @
       | (_)@
       |    @@`
    )
  ],
  [
    "059",
    String.stripMargin(
      `|    @
       |  _ @
       | (_)@
       |  _ @
       | ( )@
       | |/ @@`
    )
  ],
  [
    "060",
    String.stripMargin(
      `|   __@
       |  / /@
       | / / @
       | \\ \\ @
       |  \\_\\@
       |     @@`
    )
  ],
  [
    "061",
    String.stripMargin(
      `|        @
       |  _____ @
       | |_____|@
       | |_____|@
       |    $   @
       |        @@`
    )
  ],
  [
    "062",
    String.stripMargin(
      `| __  @
       | \\ \\ @
       |  \\ \\@
       |  / /@
       | /_/ @
       |     @@`
    )
  ],
  [
    "063",
    String.stripMargin(
      `|  ___ @
       | |__ \\@
       |   / /@
       |  |_| @
       |  (_) @
       |      @@`
    )
  ],
  [
    "064",
    String.stripMargin(
      `|    ____  @
       |   / __ \\ @
       |  / / _\` |@
       | | | (_| |@
       |  \\ \\__,_|@
       |   \\____/ @@`
    )
  ],
  [
    "065",
    String.stripMargin(
      `|     _    @
       |    / \\   @
       |   / _ \\  @
       |  / ___ \\ @
       | /_/   \\_\\@
       |          @@`
    )
  ],
  [
    "066",
    String.stripMargin(
      `|  ____  @
       | | __ ) @
       | |  _ \\ @
       | | |_) |@
       | |____/ @
       |        @@`
    )
  ],
  [
    "067",
    String.stripMargin(
      `|   ____ @
       |  / ___|@
       | | |    @
       | | |___ @
       |  \\____|@
       |        @@`
    )
  ],
  [
    "068",
    String.stripMargin(
      `|  ____  @
       | |  _ \\ @
       | | | | |@
       | | |_| |@
       | |____/ @
       |        @@`
    )
  ],
  [
    "069",
    String.stripMargin(
      `|  _____ @
       | | ____|@
       | |  _|  @
       | | |___ @
       | |_____|@
       |        @@`
    )
  ],
  [
    "070",
    String.stripMargin(
      `|  _____ @
       | |  ___|@
       | | |_   @
       | |  _|  @
       | |_|    @
       |        @@`
    )
  ],
  [
    "071",
    String.stripMargin(
      `|   ____ @
       |  / ___|@
       | | |  _ @
       | | |_| |@
       |  \\____|@
       |        @@`
    )
  ],
  [
    "072",
    String.stripMargin(
      `|  _   _ @
       | | | | |@
       | | |_| |@
       | |  _  |@
       | |_| |_|@
       |        @@`
    )
  ],
  [
    "073",
    String.stripMargin(
      `|  ___ @
       | |_ _|@
       |  | | @
       |  | | @
       | |___|@
       |      @@`
    )
  ],
  [
    "074",
    String.stripMargin(
      `|      _ @
       |     | |@
       |  _  | |@
       | | |_| |@
       |  \\___/ @
       |        @@`
    )
  ],
  [
    "075",
    String.stripMargin(
      `|  _  __@
       | | |/ /@
       | | ' / @
       | | . \\ @
       | |_|\\_\\@
       |       @@`
    )
  ],
  [
    "076",
    String.stripMargin(
      `|  _     @
       | | |    @
       | | |    @
       | | |___ @
       | |_____|@
       |        @@`
    )
  ],
  [
    "077",
    String.stripMargin(
      `|  __  __ @
       | |  \\/  |@
       | | |\\/| |@
       | | |  | |@
       | |_|  |_|@
       |         @@`
    )
  ],
  [
    "078",
    String.stripMargin(
      `|  _   _ @
       | | \\ | |@
       | |  \\| |@
       | | |\\  |@
       | |_| \\_|@
       |        @@`
    )
  ],
  [
    "079",
    String.stripMargin(
      `|   ___  @
       |  / _ \\ @
       | | | | |@
       | | |_| |@
       |  \\___/ @
       |        @@`
    )
  ],
  [
    "080",
    String.stripMargin(
      `|  ____  @
       | |  _ \\ @
       | | |_) |@
       | |  __/ @
       | |_|    @
       |        @@`
    )
  ],
  [
    "081",
    String.stripMargin(
      `|   ___  @
       |  / _ \\ @
       | | | | |@
       | | |_| |@
       |  \\__\\_\\@
       |        @@`
    )
  ],
  [
    "082",
    String.stripMargin(
      `|  ____  @
       | |  _ \\ @
       | | |_) |@
       | |  _ < @
       | |_| \\_\\@
       |        @@`
    )
  ],
  [
    "083",
    String.stripMargin(
      `|  ____  @
       | / ___| @
       | \\___ \\ @
       |  ___) |@
       | |____/ @
       |        @@`
    )
  ],
  [
    "084",
    String.stripMargin(
      `|  _____ @
       | |_   _|@
       |   | |  @
       |   | |  @
       |   |_|  @
       |        @@`
    )
  ],
  [
    "085",
    String.stripMargin(
      `|  _   _ @
       | | | | |@
       | | | | |@
       | | |_| |@
       |  \\___/ @
       |        @@`
    )
  ],
  [
    "086",
    String.stripMargin(
      `| __     __@
       | \\ \\   / /@
       |  \\ \\ / / @
       |   \\ V /  @
       |    \\_/   @
       |          @@`
    )
  ],
  [
    "087",
    String.stripMargin(
      `| __        __@
       | \\ \\      / /@
       |  \\ \\ /\\ / / @
       |   \\ V  V /  @
       |    \\_/\\_/   @
       |             @@`
    )
  ],
  [
    "088",
    String.stripMargin(
      `| __  __@
       | \\ \\/ /@
       |  \\  / @
       |  /  \\ @
       | /_/\\_\\@
       |       @@`
    )
  ],
  [
    "089",
    String.stripMargin(
      `| __   __@
       | \\ \\ / /@
       |  \\ V / @
       |   | |  @
       |   |_|  @
       |        @@`
    )
  ],
  [
    "090",
    String.stripMargin(
      `|  _____@
       | |__  /@
       |   / / @
       |  / /_ @
       | /____|@
       |       @@`
    )
  ],
  [
    "091",
    String.stripMargin(
      `|  __ @
       | | _|@
       | | | @
       | | | @
       | | | @
       | |__|@@`
    )
  ],
  [
    "092",
    String.stripMargin(
      `| __    @
       | \\ \\   @
       |  \\ \\  @
       |   \\ \\ @
       |    \\_\\@
       |       @@`
    )
  ],
  [
    "093",
    String.stripMargin(
      `|  __ @
       | |_ |@
       |  | |@
       |  | |@
       |  | |@
       | |__|@@`
    )
  ],
  [
    "094",
    String.stripMargin(
      `|  /\\ @
       | |/\\|@
       |   $ @
       |   $ @
       |   $ @
       |     @@`
    )
  ],
  [
    "095",
    String.stripMargin(
      `|        @
       |        @
       |        @
       |        @
       |  _____ @
       | |_____|@@`
    )
  ],
  [
    "096",
    String.stripMargin(
      `|  _ @
       | ( )@
       |  \\|@
       |  $ @
       |  $ @
       |    @@`
    )
  ],
  [
    "097",
    String.stripMargin(
      `|        @
       |   __ _ @
       |  / _\` |@
       | | (_| |@
       |  \\__,_|@
       |        @@`
    )
  ],
  [
    "098",
    String.stripMargin(
      `|  _     @
       | | |__  @
       | | '_ \\ @
       | | |_) |@
       | |_.__/ @
       |        @@`
    )
  ],
  [
    "099",
    String.stripMargin(
      `|       @
       |   ___ @
       |  / __|@
       | | (__ @
       |  \\___|@
       |       @@`
    )
  ],
  [
    "100",
    String.stripMargin(
      `|      _ @
       |   __| |@
       |  / _\` |@
       | | (_| |@
       |  \\__,_|@
       |        @@`
    )
  ],
  [
    "101",
    String.stripMargin(
      `|       @
       |   ___ @
       |  / _ \\@
       | |  __/@
       |  \\___|@
       |       @@`
    )
  ],
  [
    "102",
    String.stripMargin(
      `|   __ @
       |  / _|@
       | | |_ @
       | |  _|@
       | |_|  @
       |      @@`
    )
  ],
  [
    "103",
    String.stripMargin(
      `|        @
       |   __ _ @
       |  / _\` |@
       | | (_| |@
       |  \\__, |@
       |  |___/ @@`
    )
  ],
  [
    "104",
    String.stripMargin(
      `|  _     @
       | | |__  @
       | | '_ \\ @
       | | | | |@
       | |_| |_|@
       |        @@`
    )
  ],
  [
    "105",
    String.stripMargin(
      `|  _ @
       | (_)@
       | | |@
       | | |@
       | |_|@
       |    @@`
    )
  ],
  [
    "106",
    String.stripMargin(
      `|    _ @
       |   (_)@
       |   | |@
       |   | |@
       |  _/ |@
       | |__/ @@`
    )
  ],
  [
    "107",
    String.stripMargin(
      `|  _    @
       | | | __@
       | | |/ /@
       | |   < @
       | |_|\\_\\@
       |       @@`
    )
  ],
  [
    "108",
    String.stripMargin(
      `|  _ @
       | | |@
       | | |@
       | | |@
       | |_|@
       |    @@`
    )
  ],
  [
    "109",
    String.stripMargin(
      `|            @
       |  _ __ ___  @
       | | '_ \` _ \\ @
       | | | | | | |@
       | |_| |_| |_|@
       |            @@`
    )
  ],
  [
    "110",
    String.stripMargin(
      `|        @
       |  _ __  @
       | | '_ \\ @
       | | | | |@
       | |_| |_|@
       |        @@`
    )
  ],
  [
    "111",
    String.stripMargin(
      `|        @
       |   ___  @
       |  / _ \\ @
       | | (_) |@
       |  \\___/ @
       |        @@`
    )
  ],
  [
    "112",
    String.stripMargin(
      `|        @
       |  _ __  @
       | | '_ \\ @
       | | |_) |@
       | | .__/ @
       | |_|    @@`
    )
  ],
  [
    "113",
    String.stripMargin(
      `|        @
       |   __ _ @
       |  / _\` |@
       | | (_| |@
       |  \\__, |@
       |     |_|@@`
    )
  ],
  [
    "114",
    String.stripMargin(
      `|       @
       |  _ __ @
       | | '__|@
       | | |   @
       | |_|   @
       |       @@`
    )
  ],
  [
    "115",
    String.stripMargin(
      `|      @
       |  ___ @
       | / __|@
       | \\__ \\@
       | |___/@
       |      @@`
    )
  ],
  [
    "116",
    String.stripMargin(
      `|  _   @
       | | |_ @
       | | __|@
       | | |_ @
       |  \\__|@
       |      @@`
    )
  ],
  [
    "117",
    String.stripMargin(
      `|        @
       |  _   _ @
       | | | | |@
       | | |_| |@
       |  \\__,_|@
       |        @@`
    )
  ],
  [
    "118",
    String.stripMargin(
      `|        @
       | __   __@
       | \\ \\ / /@
       |  \\ V / @
       |   \\_/  @
       |        @@`
    )
  ],
  [
    "119",
    String.stripMargin(
      `|           @
       | __      __@
       | \\ \\ /\\ / /@
       |  \\ V  V / @
       |   \\_/\\_/  @
       |           @@`
    )
  ],
  [
    "120",
    String.stripMargin(
      `|       @
       | __  __@
       | \\ \\/ /@
       |  >  < @
       | /_/\\_\\@
       |       @@`
    )
  ],
  [
    "121",
    String.stripMargin(
      `|        @
       |  _   _ @
       | | | | |@
       | | |_| |@
       |  \\__, |@
       |  |___/ @@`
    )
  ],
  [
    "122",
    String.stripMargin(
      `|      @
       |  ____@
       | |_  /@
       |  / / @
       | /___|@
       |      @@`
    )
  ],
  [
    "123",
    String.stripMargin(
      `|    __@
       |   / /@
       |  | | @
       | < <  @
       |  | | @
       |   \\_\\@@`
    )
  ],
  [
    "124",
    String.stripMargin(
      `|  _ @
       | | |@
       | | |@
       | | |@
       | | |@
       | |_|@@`
    )
  ],
  [
    "125",
    String.stripMargin(
      `| __   @
       | \\ \\  @
       |  | | @
       |   > >@
       |  | | @
       | /_/  @@`
    )
  ],
  [
    "126",
    String.stripMargin(
      `|  /\\/|@
       | |/\\/ @
       |   $  @
       |   $  @
       |   $  @
       |      @@`
    )
  ],
  [
    "196",
    String.stripMargin(
      `|  _   _ @
       | (_)_(_)@
       |   /_\\  @
       |  / _ \\ @
       | /_/ \\_\\@
       |        @@`
    )
  ],
  [
    "214",
    String.stripMargin(
      `|  _   _ @
       | (_)_(_)@
       |  / _ \\ @
       | | |_| |@
       |  \\___/ @
       |        @@`
    )
  ],
  [
    "220",
    String.stripMargin(
      `|  _   _ @
       | (_) (_)@
       | | | | |@
       | | |_| |@
       |  \\___/ @
       |        @@`
    )
  ],
  [
    "228",
    String.stripMargin(
      `|  _   _ @
       | (_)_(_)@
       |  / _\` |@
       | | (_| |@
       |  \\__,_|@
       |        @@`
    )
  ],
  [
    "246",
    String.stripMargin(
      `|  _   _ @
       | (_)_(_)@
       |  / _ \\ @
       | | (_) |@
       |  \\___/ @
       |        @@`
    )
  ],
  [
    "252",
    String.stripMargin(
      `|  _   _ @
       | (_) (_)@
       | | | | |@
       | | |_| |@
       |  \\__,_|@
       |        @@`
    )
  ],
  [
    "223",
    String.stripMargin(
      `|   ___ @
       |  / _ \\@
       | | |/ /@
       | | |\\ \\@
       | | ||_/@
       | |_|   @@`
    )
  ]
])

export const codeTag: Map.Map<string, string> = Map.make([
  [
    "160",
    String.stripMargin(
      `|160  NO-BREAK SPACE
       | $@
       | $@
       | $@
       | $@
       | $@
       | $@@`
    )
  ],
  [
    "161",
    String.stripMargin(
      `|161  INVERTED EXCLAMATION MARK
       | _  @
       | (_)@
       | | |@
       | | |@
       | |_|@
       |    @@`
    )
  ],
  [
    "162",
    String.stripMargin(
      `|162  CENT SIGN
       |    _  @
       |   | | @
       |  / __)@
       | | (__ @
       |  \\   )@
       |   |_| @@`
    )
  ],
  [
    "163",
    String.stripMargin(
      `|163  POUND SIGN
       |    ___  @
       |   / ,_\\ @
       | _| |_   @
       |  | |___ @
       | (_,____|@
       |         @@`
    )
  ]
])
