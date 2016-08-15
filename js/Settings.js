// takes care of any options that the user may need
// currently allows for display of 24-hour or 12-hour clock

function Settings(container, showOptions, updateSettings) {
  // container is the DOM where the element will be inserted
  // showOptions is a callback that allows AlarmClock to toggle the correct options dropdown
  // updateSettings is a callback to update overall settings

  'use strict'

  var el = document.createElement('div')

  function hide() {
    el.classList.remove('settings--active')
  }

  function render() {
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
