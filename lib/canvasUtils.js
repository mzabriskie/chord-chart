export function upscale (canvas, context) {
  // Upscale the canvas for pixel ratio
  // http://www.html5rocks.com/en/tutorials/canvas/hidpi/
  var devicePixelRatio = getDevicePixelRatio()
  var backingStoreRatio = getBackingStorePixelRatio(context)
  var ratio = devicePixelRatio / backingStoreRatio

  if (devicePixelRatio !== backingStoreRatio) {
    var oldWidth = canvas.width
    var oldHeight = canvas.height

    canvas.width = oldWidth * ratio
    canvas.height = oldHeight * ratio

    canvas.style.width = oldWidth + 'px'
    canvas.style.height = oldHeight + 'px'

    context.scale(ratio, ratio)
  }
}

function getDevicePixelRatio () {
  return window.devicePixelRatio || 1
}

function getBackingStorePixelRatio (context) {
  return getVendorPrefixedProp(context, 'backingStorePixelRatio', 1)
}

function getVendorPrefixedProp (context, prop, defaultValue) {
  if (typeof context[prop] !== 'undefined') {
    return context[prop]
  }

  // Make first character upper case
  prop = prop.slice(0, 1).toUpperCase() + prop.slice(1)

  var prefixes = ['webkit', 'moz', 'ms', 'o']

  for (var i=0, l=prefixes.length; i<l; i++) {
    var value = context[prefixes[i] + prop]

    if (typeof value !== 'undefined') {
      return value
    }
  }

  return defaultValue
}
