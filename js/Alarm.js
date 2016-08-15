// sets the alarm on or off and allows user to input alarm time in 12-hour format
// future: could have multiple alarms, could move alarm alert here for each alarm

function Alarm(container, showOptions, updateAlarmSet) {
  // container is the DOM where the element will be inserted
  // showOptions is a callback that allows AlarmClock to toggle the correct options dropdown
  // updateSettings is a callback to update overall settings

  'use strict'

  var state = {
    hours: 1,
    minutes: 0,
    on: false,
    period: 'AM'
  }

  var el = document.createElement('div')

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
    el.classList.remove('alarm--active')
  }

  function render() {
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
