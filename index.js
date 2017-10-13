(function () {
  const CHORDS = [
    {
      name: 'A',
      open: [1, 5],
      mute: [6],
      notes: [
        [2, 4, 1], [2, 3, 2], [2, 2, 3]
      ]
    },
    {
      name: 'Am',
      open: [1, 5],
      mute: [6],
      notes: [
        [1, 2, 1],
        [2, 4, 2], [2, 3, 3]
      ]
    },
    {
      name: 'A7',
      open: [1, 3, 5],
      mute: [6],
      notes: [
        [2, 4, 1], [2, 2, 3]
      ]
    },
    {
      name: 'B',
      mute: [6],
      notes: [
        [2, 5, 1], [2, 1, 1],
        [4, 4, 2], [4, 3, 3], [4, 2, 4]
      ]
    },
    {
      name: 'Bm',
      mute: [6],
      notes: [
        [2, 5, 1], [2, 1, 1],
        [3, 2, 2],
        [4, 4, 3], [4, 3, 4]
      ]
    },
    {
      name: 'B7',
      open: [2],
      mute: [6],
      notes: [
        [1, 4, 1],
        [2, 5, 2], [2, 3, 3], [2, 1, 4]
      ]
    },
    {
      name: 'C',
      open: [3, 1],
      mute: [6],
      notes: [
        [1, 2, 1],
        [2, 4, 2],
        [3, 5, 3]
      ]
    },
    {
      name: 'Cm',
      open: [3, 1],
      mute: [6],
      notes: [
        [1, 4, 1], [1, 2, 2],
        [3, 5, 3]
      ]
    },
    {
      name: 'C7',
      open: [1],
      mute: [6],
      notes: [
        [1, 2, 1],
        [2, 4, 2],
        [3, 5, 3], [3, 3, 4]
      ]
    },
    {
      name: 'D',
      open: [4],
      mute: [5, 6],
      notes: [
        [2, 3, 1], [2, 1, 2],
        [3, 2, 3]
      ]
    },
    {
      name: 'Dm',
      open: [4],
      mute: [5, 6],
      notes: [
        [1, 1, 1],
        [2, 3, 2],
        [3, 2, 3]
      ]
    },
    {
      name: 'D7',
      open: [4],
      mute: [5, 6],
      notes: [
        [1, 2, 1],
        [2, 3, 2], [2, 1, 3],
      ]
    },
    {
      name: 'E',
      open: [6, 2, 1],
      notes: [
        [1, 3, 1],
        [2, 4, 2], [2, 5, 3]
      ]
    },
    {
      name: 'Em',
      open: [6, 3, 2, 1],
      notes: [
        [2, 4, 2], [2, 5, 3]
      ]
    },
    {
      name: 'E7',
      open: [6, 4, 2, 1],
      notes: [
        [1, 3, 1],
        [2, 5, 3]
      ]
    },
    {
      name: 'F',
      mute: [6, 5],
      notes: [
        [1, 2, 1], [1, 1, 1],
        [2, 3, 2],
        [3, 4, 3]
      ]
    },
    {
      name: 'Fm',
      notes: [
        [1, 6, 1], [1, 3, 1], [1, 2, 1], [1, 1, 1],
        [3, 5, 2], [3, 4, 3]
      ]
    },
    {
      name: 'F7',
      notes: [
        [1, 6, 1], [1, 4, 1], [1, 2, 1], [1, 1, 1],
        [2, 3, 2],
        [3, 5, 3]
      ]
    },
    {
      name: 'G',
      open: [4, 3],
      notes: [
        [2, 5, 1],
        [3, 6, 2], [3, 1, 4]
      ]
    },
    {
      name: 'Gm',
      open: [4, 3],
      notes: [
        [1, 5, 1],
        [3, 6, 2], [3, 2, 3], [3, 1, 4]
      ]
    },
    {
      name: 'G7',
      open: [4, 3, 2],
      notes: [
        [1, 1, 1],
        [2, 5, 2],
        [3, 6, 3]
      ]
    }
  ]

  const FRET_WIDTH = 25
  const FRET_HEIGHT = 35
  const NUT_HEIGHT = 3
  const FRET_BOARD_WIDTH = (FRET_WIDTH + 1) * 5 + 1
  const FRET_BOARD_HEIGHT = (FRET_HEIGHT + 1) * 4 + NUT_HEIGHT
  const FRET_BOARD_OFFSET = 50
  const FONT_SIZE = 24
  const NOTE_RADIUS = 10

  const CANVAS_WIDTH = 650
  const CANVAS_HEIGHT = 1800
  const CANVAS = document.getElementById('canvas')
  const CONTEXT = CANVAS.getContext('2d')
  
  function drawFretBoard(x, y) {    
    CONTEXT.beginPath()
    CONTEXT.fillStyle = '#000'
    CONTEXT.rect(x, y + FRET_BOARD_OFFSET, FRET_BOARD_WIDTH, FRET_BOARD_HEIGHT)
    CONTEXT.fill()
    CONTEXT.closePath()

    // Draw frets and strings
    for (let i=0; i<4; i++) {
      for (let j=0; j<5; j++) {
        CONTEXT.beginPath()
        CONTEXT.fillStyle = '#fff'
        CONTEXT.fillRect(
          (x + 1) + ((FRET_WIDTH + 1) * j),
          (y + FRET_BOARD_OFFSET + NUT_HEIGHT) + ((FRET_HEIGHT + 1) * i),
          FRET_WIDTH,
          FRET_HEIGHT
        )
        CONTEXT.closePath()
      }
    }
  }

  function drawChord(x, y, chord) {
    // Draw fret board
    drawFretBoard(x, y)

    // Draw chord name
    CONTEXT.beginPath()
    CONTEXT.font = `${FONT_SIZE}px sans-serif`
    CONTEXT.textAlign = 'center'
    CONTEXT.fillStyle = '#000'
    CONTEXT.fillText(chord.name, x + FRET_BOARD_WIDTH / 2, y + 20)
    CONTEXT.closePath()
    
    // Draw notes
    chord.notes.forEach((note) => {
      const [fret, string, finger] = note

      CONTEXT.beginPath()
      CONTEXT.fillStyle = '#000'
      CONTEXT.arc(
        x + getStringPosition(string),
        y + getFretPosition(fret) + NUT_HEIGHT,
        NOTE_RADIUS,
        0,
        Math.PI * 2,
        false
      )
      CONTEXT.fill()
      CONTEXT.closePath()

      // Draw finger position
      if (finger) {
        CONTEXT.beginPath()
        CONTEXT.font = '15px sans-serif'
        CONTEXT.textAlign = 'center'
        CONTEXT.fillStyle = '#fff'
        CONTEXT.fillText(
          finger,
          x + getStringPosition(string),
          y + getFretPosition(fret) + 8,
        )
        CONTEXT.closePath()
      }
    })

    // Draw open strings
    if (Array.isArray(chord.open)) {
      chord.open.forEach((string) => {
        CONTEXT.beginPath()
        CONTEXT.arc(
          x + getStringPosition(string),
          y + FRET_BOARD_OFFSET - 10,
          3,
          0,
          Math.PI * 2,
          false
        )
        CONTEXT.stroke()
        CONTEXT.closePath()
      })
    }

    // Draw muted strings
    if (Array.isArray(chord.mute)) {
      chord.mute.forEach((string) => {
        CONTEXT.beginPath()
        CONTEXT.font = '15px sans-serif'
        CONTEXT.textAlign = 'center'
        CONTEXT.fillStyle = '#000'
        CONTEXT.fillText('×', x + getStringPosition(string), y + FRET_BOARD_OFFSET - 6)
        CONTEXT.closePath()
      })
    }
  }

  function getStringPosition(string) {
    return FRET_BOARD_WIDTH - ((FRET_WIDTH + 1) * (string - 1))
  }

  function getFretPosition(fret) {
    return FRET_BOARD_OFFSET + ((FRET_HEIGHT + 1) * fret) - (FRET_HEIGHT / 2)
  }

  function clearCanvas() {
    CONTEXT.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }

  function render() {
    let offsetX = 9
    let offsetY = 0

    clearCanvas()

    CHORDS.forEach((chord, index) => {
      if (index > 0 && index % 3 === 0) {
        offsetX = 9
        offsetY += 265
      }

      drawChord(offsetX, offsetY, chord)
      offsetX += 250
    })
  }

  function upscale() {
    // Upscale the canvas for pixel ratio
    // http://www.html5rocks.com/en/tutorials/canvas/hidpi/
    var devicePixelRatio = getDevicePixelRatio();
    var backingStoreRatio = getBackingStorePixelRatio(CONTEXT);
    var ratio = devicePixelRatio / backingStoreRatio;

    if (devicePixelRatio !== backingStoreRatio) {
      var oldWidth = CANVAS.width;
      var oldHeight = CANVAS.height;

      CANVAS.width = oldWidth * ratio;
      CANVAS.height = oldHeight * ratio;

      CANVAS.style.width = oldWidth + 'px';
      CANVAS.style.height = oldHeight + 'px';

      CONTEXT.scale(ratio, ratio);
    }
  }

  function getDevicePixelRatio() {
    return window.devicePixelRatio || 1;
  }

  function getBackingStorePixelRatio(context) {
    return getVendorPrefixedProp(context, 'backingStorePixelRatio', 1);
  }

  function getVendorPrefixedProp(context, prop, defaultValue) {
    if (typeof context[prop] !== 'undefined') {
      return context[prop];
    }

    // Make first character upper case
    prop = prop.slice(0, 1).toUpperCase() + prop.slice(1);

    var prefixes = ['webkit', 'moz', 'ms', 'o'];

    for (var i=0, l=prefixes.length; i<l; i++) {
      var value = context[prefixes[i] + prop];

      if (typeof value !== 'undefined') {
        return value;
      }
    }

    return defaultValue;
  }

  render()
})()
