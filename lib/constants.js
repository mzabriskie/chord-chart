export const SCALE = 1
export const FRET_COUNT = 4
export const CHORDS_PER_ROW = 3
export const CANVAS_WIDTH = scale(500)
export const CANVAS_HEIGHT = scale(1600)
export const FRET_WIDTH = scale(25)
export const FRET_HEIGHT = scale(35)
export const NUT_HEIGHT = scale(3)
export const GUTTER_WIDTH = scale(75)
export const FRET_BOARD_HEIGHT = (FRET_HEIGHT + scale(1)) * FRET_COUNT + NUT_HEIGHT
export const FRET_BOARD_OFFSET = scale(50)
export const FRET_BOARD_PADDING = scale(10)
export const FONT_SIZE = scale(24)
export const NOTE_RADIUS = scale(10)
export const OPEN_RADIUS = scale(3)
export const TEXT_OFFSET_CHORD_NAME = scale(20)
export const TEXT_OFFSET_FINGER_POSITION = scale(8)
export const TEXT_OFFSET_OPEN_STRING = scale(10)
export const TEXT_OFFSET_MUTED_STRING = scale(6)

function scale (value) {
  return value * SCALE
}
