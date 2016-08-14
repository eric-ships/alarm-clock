// Alarm Clock -----------------------------------------------------------------
// takes care of app state changes
function AlarmClock(container) {
  'use strict'

  var state = {
    alarm: false,
    date: new Date(),
    settings: {
      twelveHours: true
    }
  }

  var display;

  function checkAlarms() {
    if (state.alarm) {

    }
  }

  function render() {
    var el = document.createElement('div')
    var alarmsEl = document.createElement('div')
    var settingsEl = document.createElement('div')

    el.className = 'alarm-clock alarm-clock--loading'
    alarmsEl.className = 'alarm-clock__alarms'
    settingsEl.className = 'alarm-clock__settings'

    container.insertBefore(el, null)
    el.insertBefore(alarmsEl, null)
    el.insertBefore(settingsEl, null)

    display = new Display(el, state.date, state.settings)

    new Settings(settingsEl, updateSettings)

    setTimeout(function() {
      el.classList.remove('alarm-clock--loading')
    }, 1200)
  }

  function startClock() {
    setInterval(tick, 1000)

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

  function updateSettings(key, newValue) {
    state.settings[key] = newValue
  }

  startClock()
  render()
}

// Display ---------------------------------------------------------------------
function Display(container, date, settings) {
  'use strict'

  var state = {
    date: date,
    settings: settings
  }

  var dateEl, hoursEl, minutesEl, periodEl, secondsEl

  function getDateToStr() {
    return state.date.toDateString()
  }

  function getHoursToStr() {
    var h = state.date.getHours()

    if (state.settings.twelveHours) {
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
    if (state.settings.twelveHours) {
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
    var el = document.createElement('div')

    dateEl = document.createElement('div')
    hoursEl = document.createElement('span')
    minutesEl = document.createElement('span')
    periodEl = document.createElement('span')
    secondsEl = document.createElement('span')

    el.className = 'display'
    dateEl.className = 'display__date'
    hoursEl.className = 'display__hours'
    minutesEl.className = 'display__minutes'
    periodEl.className = 'display__period'
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

  function updateSettings(newSettings) {
    state.settings = newSettings
  }

  render()

  return {
    setDate: setDate,
    updateSettings: updateSettings
  }
}

// Settings --------------------------------------------------------------------
function Settings(container, updateSettings) {
  'use strict'

  function render() {
    var el = document.createElement('div')
    var iconEl = document.createElement('div')
    var optionsEl = document.createElement('div')
    var labelEl = document.createElement('label')
    var checkboxEl = document.createElement('input')

    checkboxEl.setAttribute('type', 'checkbox')

    el.className = 'settings'
    iconEl.className = 'settings__icon fa fa-cog'
    optionsEl.className = 'settings__options'
    labelEl.className = 'settings__label'
    checkboxEl.className = 'settings__checkbox'

    iconEl.onclick = toggle.bind(el)
    checkboxEl.onclick = update.bind(checkboxEl)

    labelEl.innerHTML = 'Use 24-hour clock'

    container.insertBefore(el, null)
    el.insertBefore(iconEl, null)
    el.insertBefore(optionsEl, null)
    optionsEl.insertBefore(labelEl, null)
    optionsEl.insertBefore(checkboxEl, null)
  }

  function toggle() {
    this.classList.toggle('settings--active')
  }

  function update() {
    updateSettings('twelveHours', !this.checked)
  }

  render()
}

// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function(e) {
  new AlarmClock(document.getElementById('app'))
})
