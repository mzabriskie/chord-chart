import app from './lib/app'
const instruments = [
  require('./lib/instruments/guitar'),
  require('./lib/instruments/ukulele')
]

app.init(document.getElementById('canvas'), document.getElementById('instrument'), instruments)
