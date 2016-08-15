// Alarm Clock -----------------------------------------------------------------
// takes care of app state changes
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
      display.setDate(state.date)
    }
  }

  function updateSettings(key, newValue) {
    state.settings[key] = newValue
  }

  startClock()
  render()
}

// Alarms ----------------------------------------------------------------------
function Alarm(container, showOptions, updateAlarmSet) {
  'use strict'

  var state = {
    hours: 1,
    minutes: 0,
    on: false,
    period: 'AM'
  }

  function check(date) {
    var h, m

    if (state.on) {
      h = state.period === 'AM' ? parseInt(state.hours) : parseInt(state.hours) + 12
      m = parseInt(state.minutes)

      if (date.getHours() === h && date.getMinutes() === m && date.getSeconds() === 0) {
        return true
      }
    }

    return false
  }

  function hide() {
    document.getElementsByClassName('alarm')[0].classList.remove('alarm--active')
  }

  function render() {
    var el = document.createElement('div')
    var iconEl = document.createElement('div')
    var optionsEl = document.createElement('div')
    var labelEl = document.createElement('label')
    var hoursOptionEl = document.createElement('select')
    var minutesOptionEl = document.createElement('select')
    var periodOptionEl = document.createElement('select')
    var checkboxEl = document.createElement('input')

    checkboxEl.setAttribute('type', 'checkbox')

    el.className = 'alarm'
    iconEl.className = 'alarm__icon fa fa-bell-slash'
    optionsEl.className = 'alarm__options'
    labelEl.className = 'alarm__label'
    hoursOptionEl.className = 'alarm__select'
    minutesOptionEl.className = 'alarm__select'
    periodOptionEl.className = 'alarm__select'
    checkboxEl.className = 'alarm__checkbox'

    iconEl.onclick = toggle.bind(el)
    hoursOptionEl.onchange = update.bind(hoursOptionEl, 'hours')
    minutesOptionEl.onchange = update.bind(minutesOptionEl, 'minutes')
    periodOptionEl.onchange = update.bind(periodOptionEl, 'period')
    checkboxEl.onclick = update.bind(checkboxEl, 'on', iconEl)

    labelEl.innerHTML = 'Set alarm'

    for (var i = 1; i < 13; i++) {
      var opt = document.createElement('option')
      opt.value = i
      opt.innerHTML = i
      hoursOptionEl.appendChild(opt)
    }

    for (var i = 0; i < 59; i++) {
      var opt = document.createElement('option')
      opt.value = i
      opt.innerHTML = i < 10 ? '0' + i : i
      minutesOptionEl.appendChild(opt)
    }

    ;(function() {
      var optAM = document.createElement('option');
      var optPM = document.createElement('option');

      optAM.value = 'AM'
      optAM.innerHTML = 'AM'

      optPM.value = 'PM'
      optPM.innerHTML = 'PM'

      periodOptionEl.appendChild(optAM)
      periodOptionEl.appendChild(optPM)
    })()

    container.insertBefore(el, null)
    el.insertBefore(iconEl, null)
    el.insertBefore(optionsEl, null)
    optionsEl.insertBefore(labelEl, null)
    optionsEl.insertBefore(hoursOptionEl, null)
    optionsEl.insertBefore(minutesOptionEl, null)
    optionsEl.insertBefore(periodOptionEl, null)
    optionsEl.insertBefore(checkboxEl, null)
  }

  function toggle() {
    showOptions('alarm')
    this.classList.toggle('alarm--active')
  }

  function toggleIcon(iconEl) {
    if (state.on) {
      iconEl.classList.remove('fa-bell-slash')
      iconEl.classList.add('fa-bell', 'alarm__icon--active')

      return
    }

    iconEl.classList.remove('fa-bell', 'alarm__icon--active')
    iconEl.classList.add('fa-bell-slash')
  }

  function update(type, iconEl) {
    switch (type) {
      case 'hours':
        state.hours = this.value
        return
      case 'minutes':
        state.minutes = this.value
        return
      case 'period':
        state.period = this.value
        return
      case 'on':
        var on = this.checked
        state.on = on
        updateAlarmSet(on)
        toggleIcon(iconEl)
        return
    }
  }

  render()

  return {
    check: check,
    hide: hide
  }
}

// Display ---------------------------------------------------------------------
function Display(container, date, settings) {
  'use strict'

  var dateEl, hoursEl, minutesEl, periodEl, secondsEl

  var state = {
    date: date,
    settings: settings
  }

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

  render()

  return {
    setDate: setDate
  }
}

// Settings --------------------------------------------------------------------
function Settings(container, showOptions, updateSettings) {
  'use strict'

  function hide() {
    document.getElementsByClassName('settings')[0].classList.remove('settings--active')
  }

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
    showOptions('settings')
    this.classList.toggle('settings--active')
  }

  function update() {
    updateSettings('twelveHours', !this.checked)
  }

  render()

  return {
    hide: hide
  }
}

// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function(e) {
  new AlarmClock(document.getElementById('app'))
})
