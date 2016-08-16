function Display(container, date, settings) {
  // container is the DOM where the element will be inserted
  // settings allows Display to know how to display

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

  function update(newDate, newSettings) {
    state.date = newDate
    state.settings = newSettings

    dateEl.innerHTML = getDateToStr()
    hoursEl.innerHTML = getHoursToStr()
    minutesEl.innerHTML = getMinutesToStr()
    periodEl.innerHTML = getPeriodToStr()
    secondsEl.innerHTML = getSecondsToStr()
  }

  render()

  return {
    update: update
  }
}
