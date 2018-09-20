import {
  FRET_WIDTH,
  FRET_HEIGHT,
  FRET_BOARD_OFFSET
} from './constants'

export function getFretBoardWidth (stringCount) {
  return (FRET_WIDTH + 1) * (stringCount - 1) + 1
}

export function getStringPosition(string) {
  return (FRET_WIDTH + 1) * (string - 1)
}

export function getFretPosition(fret) {
  return FRET_BOARD_OFFSET + ((FRET_HEIGHT + 1) * fret) - (FRET_HEIGHT / 2)
}

export function distributeEmptySpace (availableSpace, itemSpace, itemsPerChannel) {
  // Determine how much empty space is available in the canvas after items are accounted for
  const emptySpace = availableSpace - (itemSpace * itemsPerChannel)

  // Distribute empty space between items
  const distributedSpace = emptySpace / (itemsPerChannel - 1)

  return itemSpace + distributedSpace
}
