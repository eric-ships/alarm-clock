// Alarm Clock -----------------------------------------------------------------
// takes care of app state changes
function AlarmClock(container) {
  'use strict'

  var state = {
    alarm: false,
    date: new Date()
  }

  var display, el, tickInterval;

  function checkAlarms() {
    if (state.alarm) {

    }
  }

  function render() {
    el = document.createElement('div')
    el.className = 'alarm-clock'

    container.insertBefore(el, null)

    display = new Display(el, state.date)
  }

  function startClock() {
    tickInterval = setInterval(tick, 1000)

    tick()
  }

  function tick() {
    state.date = new Date()

    updateDisplay()
    checkAlarms()
  }

  function updateDisplay() {
    if (display) {
      display.setDate(state.date)
    }
  }

  startClock()
  render()
}

// Display ---------------------------------------------------------------------
function Display(container, date) {
  'use strict'

  var state = {
    date: date,
    period: 'AM',
    twelveHours: true
  }

  var el, dateEl, hoursEl, minutesEl, periodEl, secondsEl

  function getDateToStr() {
    return state.date.toDateString()
  }

  function getHoursToStr() {
    var h = state.date.getHours()

    if (state.twelveHours) {
      if (h > 12) {
        h = h - 12
      }
    }

    return h
  }

  function getMinutesToStr() {
    var m = state.date.getMinutes()

    if (m < 10) {
      m = '0' + m
    }

    return ':' + m
  }

  function getPeriodToStr() {
    if (state.twelveHours) {
      return state.date.getHours() < 12 ? 'AM' : 'PM'
    }

    return ''
  }

  function getSecondsToStr() {
    var s = state.date.getSeconds()

    if (s < 10) {
      s = '0' + s
    }

    return ':' + s
  }

  function render() {
    el = document.createElement('div')
    el.className = 'display'

    dateEl = document.createElement('div')
    dateEl.className = 'display__date'

    hoursEl = document.createElement('span')
    hoursEl.className = 'display__hours'

    minutesEl = document.createElement('span')
    minutesEl.className = 'display__minutes'

    periodEl = document.createElement('span')
    periodEl.className = 'display__period'

    secondsEl = document.createElement('span')
    secondsEl.className = 'display__seconds'

    container.insertBefore(el, null)
    el.insertBefore(hoursEl, null)
    el.insertBefore(minutesEl, null)
    el.insertBefore(secondsEl, null)
    el.insertBefore(periodEl, null)
    el.insertBefore(dateEl, null)
  }

  function setDate(newDate) {
    state.date = newDate

    update()
  }

  function update() {
    dateEl.innerHTML = getDateToStr()
    hoursEl.innerHTML = getHoursToStr()
    minutesEl.innerHTML = getMinutesToStr()
    periodEl.innerHTML = getPeriodToStr()
    secondsEl.innerHTML = getSecondsToStr()
  }

  render()

  return {
    setDate: setDate
  }
}

// -----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function(e) {
  new AlarmClock(document.getElementById('app'))
})
