import * as canvasUtils from './canvasUtils'
import * as chartUtils from './chartUtils'
import {
  FRET_COUNT,
  CHORDS_PER_ROW,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  FRET_WIDTH,
  FRET_HEIGHT,
  NUT_HEIGHT,
  GUTTER_WIDTH,
  FRET_BOARD_HEIGHT,
  FRET_BOARD_OFFSET,
  FRET_BOARD_PADDING,
  FONT_SIZE,
  NOTE_RADIUS,
  OPEN_RADIUS,
  TEXT_OFFSET_CHORD_NAME,
  TEXT_OFFSET_FINGER_POSITION,
  TEXT_OFFSET_OPEN_STRING,
  TEXT_OFFSET_MUTED_STRING
} from './constants'

function renderFretBoard (context, x, y, stringCount = 6, fretCount = 4) {    
  context.beginPath()
  context.fillStyle = '#000'
  context.rect(x, y + FRET_BOARD_OFFSET, chartUtils.getFretBoardWidth(stringCount), FRET_BOARD_HEIGHT)
  context.fill()
  context.closePath()

  // Render frets and strings
  for (let i=0; i<fretCount; i++) {
    for (let j=0; j<stringCount - 1; j++) {
      context.beginPath()
      context.fillStyle = '#fff'
      context.fillRect(
        (x + 1) + ((FRET_WIDTH + 1) * j),
        (y + FRET_BOARD_OFFSET + NUT_HEIGHT) + ((FRET_HEIGHT + 1) * i),
        FRET_WIDTH,
        FRET_HEIGHT
      )
      context.closePath()
    }
  }
}

function renderChord (context, x, y, chord, stringCount) {
  // Render fret board
  renderFretBoard(context, x, y, stringCount)

  const fretBoardWidth = chartUtils.getFretBoardWidth(stringCount)

  // Render chord name
  context.beginPath()
  context.font = `${FONT_SIZE}px sans-serif`
  context.textAlign = 'center'
  context.fillStyle = '#000'
  context.fillText(chord.name, x + fretBoardWidth / 2, y + TEXT_OFFSET_CHORD_NAME)
  context.closePath()
  
  // Render notes
  chord.notes.forEach((note) => {
    const [fret, string, finger] = note

    context.beginPath()
    context.fillStyle = '#000'
    context.arc(
      x + fretBoardWidth - chartUtils.getStringPosition(string),
      y + chartUtils.getFretPosition(fret) + NUT_HEIGHT,
      NOTE_RADIUS,
      0,
      Math.PI * 2,
      false
    )
    context.fill()
    context.closePath()

    // Render finger position
    if (finger) {
      context.beginPath()
      context.font = `${FONT_SIZE * 0.625}px sans-serif`
      context.textAlign = 'center'
      context.fillStyle = '#fff'
      context.fillText(
        finger,
        x + fretBoardWidth - chartUtils.getStringPosition(string),
        y + chartUtils.getFretPosition(fret) + TEXT_OFFSET_FINGER_POSITION,
      )
      context.closePath()
    }
  })

  // Render open strings
  if (Array.isArray(chord.open)) {
    chord.open.forEach((string) => {
      context.beginPath()
      context.arc(
        x + fretBoardWidth - chartUtils.getStringPosition(string),
        y + FRET_BOARD_OFFSET - TEXT_OFFSET_OPEN_STRING,
        OPEN_RADIUS,
        0,
        Math.PI * 2,
        false
      )
      context.stroke()
      context.closePath()
    })
  }

  // Render muted strings
  if (Array.isArray(chord.mute)) {
    chord.mute.forEach((string) => {
      context.beginPath()
      context.font = `${FONT_SIZE * 0.625}px sans-serif`
      context.textAlign = 'center'
      context.fillStyle = '#000'
      context.fillText('×', x + fretBoardWidth - chartUtils.getStringPosition(string), y + FRET_BOARD_OFFSET - TEXT_OFFSET_MUTED_STRING)
      context.closePath()
    })
  }
}

function render (canvas, instrument) {
  const context = canvas.getContext('2d')

  // Set canvas size and clear content
  canvas.setAttribute('width', CANVAS_WIDTH)
  canvas.setAttribute('height', CANVAS_HEIGHT)
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  canvasUtils.upscale(canvas, context)

  const fretBoardWidth = chartUtils.getFretBoardWidth(instrument.strings)
  const horizontalOffset = chartUtils.distributeEmptySpace(CANVAS_WIDTH - (FRET_BOARD_PADDING * 2), fretBoardWidth, CHORDS_PER_ROW)
  const verticalOffset = chartUtils.distributeEmptySpace(CANVAS_HEIGHT, FRET_BOARD_HEIGHT + FRET_BOARD_OFFSET, Math.round(instrument.chords.length / CHORDS_PER_ROW))

  let offsetX = FRET_BOARD_PADDING
  let offsetY = 0

  instrument.chords.forEach((chord, index) => {
    if (index > 0 && index % CHORDS_PER_ROW === 0) {
      offsetX = FRET_BOARD_PADDING
      offsetY += verticalOffset
    }

    renderChord(context, offsetX, offsetY, chord, instrument.strings)
    offsetX += horizontalOffset
  })
}

function init (canvas, select, instruments) {
  select.addEventListener('change', () => {
    localStorage.setItem('selectedInstrumentIndex', select.value)
    render(canvas, instruments[select.value])
  })

  instruments.forEach((m, index) => {
    const option = new Option(m.label, index)
    select.appendChild(option)
  })

  select.value = parseInt(localStorage.getItem('selectedInstrumentIndex'), 10) || 0
  render(canvas, instruments[select.value])
}

export default {
  init
}
