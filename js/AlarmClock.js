// overall class that takes care of most app state changes
// if the project gets bigger, would probably utilize a singleton dispatcher for better state change
// future: add snooze functionality

function AlarmClock(container) {
  'use strict'

  var alarm, display, settings;

  var state = {
    alarmSet: false,
    date: new Date(),
    settings: {
      twelveHours: true
    }
  }

  function checkAlarm() {
    if (state.alarmSet && alarm.check(state.date)) {
      alert('alarm!')
    }
  }

  function showOptions(type) {
    if (type === 'alarm') {
      settings.hide()

      return
    }

    alarm.hide()
  }

  function render() {
    var el = document.createElement('div')
    var alarmsEl = document.createElement('div')
    var settingsEl = document.createElement('div')

    el.className = 'alarm-clock alarm-clock--loading'
    alarmsEl.className = 'alarm-clock__alarm'
    settingsEl.className = 'alarm-clock__settings'

    container.insertBefore(el, null)
    el.insertBefore(settingsEl, null)
    el.insertBefore(alarmsEl, null)

    display = new Display(el, state.date, state.settings)
    alarm = new Alarm(alarmsEl, showOptions, updateAlarmSet)
    settings = new Settings(settingsEl, showOptions, updateSettings)

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
    checkAlarm()
  }

  function updateAlarmSet(newState) {
    state.alarmSet = newState
  }

  function updateDisplay() {
    if (display) {
      display.update(state.date, state.settings)
    }
  }

  function updateSettings(key, newValue) {
    state.settings[key] = newValue

    updateDisplay()
  }

  startClock()
  render()
}
