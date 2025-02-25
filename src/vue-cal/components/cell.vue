<template lang="pug">
.vuecal__cell(ref="cellEl" :class="classes" v-on="cellEventListeners")
  template(v-if="$slots.cell")
    slot(name="cell" :start="start" :end="end" :index="index" :events="cellEvents")

  template(v-if="specialHours")
    .vuecal__special-hours(
      v-for="(range, i) in specialHours"
      :style="range.style"
      :class="range.class"
      v-html="range.label || ''")

  template(v-if="!$slots.cell && config.schedules")
    .vuecal__schedule.vuecal__schedule--cell(
      v-for="schedule in config.schedules"
      :key="schedule.id"
      :class="schedule.class"
      :style="schedule.style || null"
      :data-schedule="schedule.id")
      template(v-if="$slots['cell-events']")
        slot(name="cell-events" :start="start" :end="end" :events="cellEvents")
      .vuecal__cell-date(v-if="formattedCellDate || $slots['cell-date']")
        slot(name="cell-date" :start="start" :end="end" :events="cellEvents") {{ formattedCellDate }}
      .vuecal__cell-content(v-if="$slots['cell-content']")
        slot(name="cell-content" :start="start" :end="end" :events="cellEvents")
      .vuecal__cell-events(v-if="cellEvents.length")
        slot(
          v-if="$slots['cell-events']"
          name="cell-events"
          :start="start"
          :end="end"
          :events="cellEvents")
        template(v-else)
          event(
            v-for="eventId in cellEventsPerSchedule[schedule.id]"
            :key="eventId"
            :id="eventId"
            @event-drag-start="emit('event-drag-start')"
            @event-drag-end="emit('event-drag-end')")
      .vuecal__event-placeholder(
        v-if="isCreatingEvent && touch.schedule === schedule.id"
        :style="eventPlaceholder.style")
        | {{ eventPlaceholder.start }} - {{ eventPlaceholder.end }}

  template(v-if="!$slots.cell && !config.schedules")
    template(v-if="$slots['cell-events']")
      slot(name="cell-events")
    .vuecal__cell-date(v-if="formattedCellDate || $slots['cell-date']")
      slot(name="cell-date" :start="start" :end="end" :events="cellEvents") {{ formattedCellDate }}
    .vuecal__cell-content(v-if="$slots['cell-content']")
      slot(name="cell-content" :start="start" :end="end" :events="cellEvents")
    .vuecal__cell-events(v-if="cellEvents.length")
      slot(
        v-if="$slots['cell-events']"
        name="cell-events"
        :start="start"
        :end="end"
        :events="cellEvents")
      template(v-else)
        event(
          v-for="eventId in cellEvents"
          :key="eventId"
          :id="eventId"
          @event-drag-start="emit('event-drag-start')"
          @event-drag-end="emit('event-drag-end')")
    .vuecal__event-placeholder(v-if="isCreatingEvent" :style="eventPlaceholder.style")
      | {{ eventPlaceholder.start }} - {{ eventPlaceholder.end }}


  .vuecal__now-line(
    v-if="nowLine.show"
    :style="nowLine.style"
    :title="nowLine.currentTime")
    span {{ nowLine.currentTime }}
</template>

<script setup>
import { computed, inject, reactive, ref } from 'vue'
import { months, weekdays } from '@/vue-cal/core/config'
import { minutesToPercentage, percentageToMinutes } from '@/vue-cal/utils/cell'
import Event from './event.vue'

const props = defineProps({
  // Even with time=false, the date of the cell will still be provided in order to attach
  // events to a specific date.
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  index: { type: Number, required: true }
})

// These emits are only internal to the root component.
// External emits are not using `emit` and manually call any listener handler directly (more flexible).
const emit = defineEmits(['cell-drag-start', 'cell-drag-end', 'event-drag-start', 'event-drag-end'])

const vuecal = inject('vuecal')
const { view, config, dateUtils, eventsManager } = vuecal
const isToday = computed(() => dateUtils.isToday(props.start))

const cellEl = ref(null)

// The touch/mouse events listeners are always attached to the cell, but if the event.target is a schedule,
// display the event placeholder in that schedule.
const touch = reactive({
  dragging: false,
  holding: false, // When the cell is clicked and hold for a certain amount of time.
  holdTimer: null, // Cell click and hold detection.
  startX: 0,
  startY: 0,
  moveX: 0,
  moveY: 0,
  startPercentageX: 0,
  startPercentageY: 0,
  movePercentageX: 0,
  movePercentageY: 0,
  schedule: null
})
const awaitingEventCreation = ref(false)

// While dragging in the cell render an event placeholder, before it becomes a normal calendar event.
// The calendar creation could be canceled for different wanted reasons at the end of dragging.
const eventPlaceholder = computed(() => {
  const startPercentage = Math.min(touch.startPercentageY, touch.movePercentageY)
  const endPercentage = Math.max(touch.startPercentageY, touch.movePercentageY)
  const startMinutes = percentageToMinutes(startPercentage, config)
  const endMinutes = percentageToMinutes(endPercentage, config)

  return {
    style: {
      top: startPercentage + '%',
      height: Math.abs(endPercentage - startPercentage) + '%'
    },
    startMinutes,
    endMinutes,
    start: dateUtils.formatMinutes(startMinutes),
    end: dateUtils.formatMinutes(endMinutes),
    ...(touch.schedule ? { schedule: touch.schedule } : {})
  }
})

const isCreatingEvent = computed(() => config.editableEvents?.create && (touch.dragging || awaitingEventCreation.value))

const classes = computed(() => {
  const now = new Date()
  const viewYear = view.start.getFullYear()
  const viewMonth = view.start.getMonth()
  const y = props.start.getFullYear()
  const m = props.start.getMonth()
  const weekday = weekdays[props.start.getDay()]

  return {
    [`vuecal__cell--${weekday}`]: view.isDay || view.isDays || view.isWeek || view.isMonth,
    [`vuecal__cell--${months[m]}`]: view.isYear,
    [`vuecal__cell--${y}`]: view.isYears,
    'vuecal__cell--today': isToday.value,
    'vuecal__cell--current-month': view.isYear && y === now.getFullYear() && m === now.getMonth(),
    'vuecal__cell--current-year': view.isYears && y === now.getFullYear(),
    'vuecal__cell--out-of-range': view.isMonth && (y !== viewYear || m !== viewMonth),
    'vuecal__cell--before-min': isDisabled.value && isBeforeMinDate.value,
    'vuecal__cell--after-max': isDisabled.value && isAfterMaxDate.value,
    'vuecal__cell--disabled': isDisabled.value,
    'vuecal__cell--selected': view.selectedDate && view.selectedDate.getTime() >= props.start.getTime() && view.selectedDate.getTime() <= props.end.getTime(),
    'vuecal__cell--has-schedules': config.schedules?.length,
    'vuecal__cell--dragging': touch.dragging,
    'vuecal__cell--has-events': false
  }
})

// Note: This will recompute when the locale changes (from formatDate) or xs prop changes for instance.
// So it needs to be a distinct computed from the events.
const formattedCellDate = computed(() => {
  // ! \ IMPORTANT NOTE:
  // If the selectedDate prop would be added to the vuecal.view, any click on any cell
  // (triggering an emit of the selectedDate), would trigger a rerendering of all the
  // cells of the view. The following marker is here to monitor that this does not happen
  // with any prop while developing.
  console.log('recomputing cell') // @todo: remove this marker after dev.

  switch (view.id) {
    case 'day':
      return ''
    case 'days':
      if (config.availableViews.days.rows > 1) dateUtils.formatDate(props.start, 'D')
      return ''
    case 'week':
      return ''
    case 'month':
      return dateUtils.formatDate(props.start, 'D')
    case 'year':
      return dateUtils.formatDate(props.start, config.xs ? 'MMM' : 'MMMM')
    case 'years':
      return dateUtils.formatDate(props.start, 'YYYY')
  }
})

const cellEvents = computed(() => {
  if (config.datePicker || config.xs) return []
  return view.events[dateUtils.formatDate(props.start)] || []
})

/**
 * Generates an object containing events grouped by schedule ID.
 *
 * @returns {Object} An object where keys are schedule IDs, and values are arrays of event IDs
 *                   that correspond to each schedule.
 */
const cellEventsPerSchedule = computed(() => {
  return config.schedules?.reduce((obj, schedule) => {
    obj[schedule.id] = cellEvents.value.filter(eid => eventsManager.getEvent(eid).schedule === schedule.id)
    return obj
  }, {})
})

/**
 * The special hours of the current cell day.
 * returns an array if the view is day, days, week and the specialHours prop is set correctly.
 */
const specialHours = computed(() => {
  if (!config.specialHours || view.isMonth || view.isYear || view.isYears) return
  const weekday = weekdays[props.start.getDay()]

  // The special hours ranges for the current cell day.
  let daySpecialHours = config.specialHours?.[weekday]
  if (!daySpecialHours) return

  if (!Array.isArray(daySpecialHours)) daySpecialHours = [daySpecialHours]

  // Foreach of the given ranges, return an object with CSS positioning in percentage.
  return daySpecialHours.map(dayRanges => {
    let { from, to, class: classes, label } = dayRanges

    // Return if the special hours are incorrect or completely out of range.
    if (isNaN(from) || isNaN(to) || config.timeFrom >= to || config.timeTo <= from) return

    from = Math.max(config.timeFrom, from) // Ensure that from is in range.
    to = Math.min(config.timeTo, to) // Ensure that to is in range.

    const top = minutesToPercentage(from, config)
    const height = minutesToPercentage(to, config) - top

    return {
      style: { top: `${top}%`, height: `${height}%` },
      label,
      class: classes
    }
  }).filter(specialRanges => !!specialRanges)
})

const isBeforeMinDate = computed(() => {
  return config.minTimestamp !== null && config.minTimestamp > props.end.getTime()
})

const isAfterMaxDate = computed(() => {
  return config.maxTimestamp && config.maxTimestamp < props.start.getTime()
})

// Is the current cell disabled or not (disabled date or before min date or after max date).
const isDisabled = computed(() => {
  const { disableDays } = config
  const isYearsOrYearView = view.isYear || view.isYears
  if (disableDays.length && disableDays.includes(dateUtils.formatDate(props.start)) && !isYearsOrYearView) return true
  return isBeforeMinDate.value || isAfterMaxDate.value
})

// Draw a line in today's cell at the exact current time.
const nowLine = reactive({
  show: computed(() => {
    if (!view.isDay && !view.isDays && !view.isWeek) return
    if (!isToday.value || !config.time) return
    if (config.timeFrom > dateUtils.dateToMinutes(view.now)) return
    if (dateUtils.dateToMinutes(view.now) > config.timeTo) return
    return true
  }),
  nowInMinutes: computed(() => dateUtils.dateToMinutes(view.now)),
  todaysTimePosition: computed(() => minutesToPercentage(nowLine.nowInMinutes, config)),
  style: computed(() => `top: ${nowLine.todaysTimePosition}%`),
  currentTime: computed(() => dateUtils.formatTime(view.now))
})

// Automatically forwards any event listener attached to vuecal starting with @cell- to the cell.
const cellEventListeners = computed(() => {
  if (isDisabled.value) return {} // If the cell is disabled, completely disable any interaction.

  const eventListeners = { ...config.eventListeners.cell }

  // Inject the cell details in each eventListener handler call as 2nd param.
  Object.entries(eventListeners).forEach(([eventListener, handler]) => {
    eventListeners[eventListener] = e => {
      updateCursorInfo(e) // Update the cursor position in the cell.

      // When interacting with an event, skip calling the cell DOM event handler.
      // The DOM event bubbles up to the cell from the event but we don't stop it on purpose so
      // we can receive the on mouseup from the document and stop event drag&drop.
      if ((e.target || e.e?.target).matches?.('.vuecal__event, .vuecal__event *')) return

      // Check if e.type to not rewrap the DOM event in an object if already done.
      handler(e.type ? { e, cell: cellInfo.value, cursor: cursorInfo.value } : e)
    }
  })

  // Store a copy of any potential external handler to combine with internal handlers like click,
  // touchstart, mousedown.
  const externalHandlers = { ...eventListeners }

  eventListeners.click = e => {
    onCellClick()
    if (touch.schedule) cell.schedule = touch.schedule
    externalHandlers.click?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
  }

  if (config.time && view.isDay || view.isDays || view.isWeek) {
    eventListeners.touchstart = e => {
      onMousedown(e.e || e)
      externalHandlers.touchstart?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
    }
    eventListeners.mousedown = e => {
      onMousedown(e.e || e)

      externalHandlers.mousedown?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
    }
  }

  return eventListeners
})

const cellInfo = computed(() => ({
  start: props.start,
  end: props.end,
  events: cellEvents,
  ...(touch.schedule ? { schedule: touch.schedule } : {})
}))

// Get cursor information including position and date.
const cursorInfo = computed(() => {
  const minutes = percentageToMinutes(touch.startPercentageY, config)
  const date = new Date(props.start)
  date.setMinutes(minutes)

  return {
    x: touch.startPercentageX,
    y: touch.startPercentageY,
    date
  }
})

// Functions.
// --------------------------------------------------------
const updateCursorInfo = e => {
  // The event object may already contain an `e` property added by the cellEventListeners computed prop.
  const event = e.e || e
  const { clientX, clientY } = event.touches?.[0] || event
  const { left, top, width, height } = event.target.getBoundingClientRect()
  // Only the pointer position in percentage in the cell.
  // Does not take into account the calendar start time.
  touch.startPercentageX = ((clientX - left) / width) * 100
  touch.startPercentageY = ((clientY - top) / height) * 100
}

const onCellClick = () => {
  view.updateSelectedDate(props.start)
  view.updateViewDate(props.start)

  if (config.clickToNavigate) {
    if ((view.isMonth || view.isDays || view.isWeek) && config.availableViews.day) view.switch('day')
    else if (view.isYear && config.availableViews.month) view.switch('month')
    else if (view.isYears && config.availableViews.year) view.switch('year')
    view.updateViewDate(props.start)
  }
}

// On mousedown OR TOUCHSTART of the cell.
const onMousedown = e => {
  touch.schedule = ~~e.target.dataset.schedule
  const rect = cellEl.value.getBoundingClientRect()
  touch.startX = (e.touches?.[0] || e).clientX - rect.left // Handle click or touch event coords.
  touch.startY = (e.touches?.[0] || e).clientY - rect.top // Handle click or touch event coords.
  touch.startPercentageX = touch.startX * 100 / rect.width
  touch.startPercentageY = touch.startY * 100 / rect.height

  document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', onDocMousemove)
  document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', onDocMouseup, { once: true })

  touch.holdTimer = setTimeout(() => {
    touch.holding = true
    // If there's a @cell-hold external listener, call it.
    cellEventListeners.value.hold?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
  }, 1000)
}

const onDocMousemove = e => {
  // Internal emit to the root component to add a CSS class on wrapper while dragging.
  if (!touch.dragging) {
    emit('cell-drag-start')

    // If there's a @cell-drag-start external listener, call it.
    cellEventListeners.value.dragStart?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
  }
  touch.dragging = true
  touch.holdTimer = clearTimeout(touch.holdTimer)
  touch.holding = false

  const rect = cellEl.value.getBoundingClientRect()
  touch.moveX = (e.touches?.[0] || e).clientX - rect.left // Handle click or touch event coords.
  touch.moveY = (e.touches?.[0] || e).clientY - rect.top // Handle click or touch event coords.
  touch.movePercentageX = touch.moveX * 100 / rect.width
  touch.movePercentageY = touch.moveY * 100 / rect.height

  // If there's a @cell-drag external listener, call it.
  cellEventListeners.value.drag?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
}

const onDocMouseup = async e => {
  document.removeEventListener(e.type === 'touchend' ? 'touchmove' : 'mousemove', onDocMousemove, { passive: false })

  if (touch.dragging) {
    // If there's a @cell-drag-end external listener, call it.
    cellEventListeners.value.dragEnd?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
    emit('cell-drag-end') // Internal emit to the root to add a CSS class on wrapper while dragging.

    if (config.editableEvents?.create) {
      awaitingEventCreation.value = true
      await createEventIfAllowed(e)
      awaitingEventCreation.value = false
    }
  }

  touch.holdTimer = clearTimeout(touch.holdTimer)
  touch.holding = false
  touch.dragging = false
  touch.startX = 0
  touch.startY = 0
  touch.moveX = 0
  touch.moveY = 0
  touch.startPercentageX = 0
  touch.startPercentageY = 0
  touch.movePercentageX = 0
  touch.movePercentageY = 0
  touch.schedule = null
}

const createEventIfAllowed = async e => {
  let { start, end, startMinutes, endMinutes } = eventPlaceholder.value
  start = new Date(props.start)
  start.setMinutes(startMinutes)
  end = new Date(props.start)
  end.setMinutes(endMinutes)

  let eventToCreate = { ...eventPlaceholder.value, start, end }

  // If there's a @event-create listener, call it and check if it returns true to accept the event
  // creation or false to cancel it. If no listener, create the event.
  // The call to the handler is wrapped in a promise so the user may open an event editor and modify
  // the event before sending in back and resolving the promise.
  const { create: createListener } = config.eventListeners.event

  if (typeof createListener === 'function') {
    const eventCopy = eventToCreate
    eventToCreate = await new Promise(resolve => createListener({ e, event: eventToCreate, cell: cellInfo.value, resolve, cursor: cursorInfo.value }))
    // eventToCreate may be true, false or an updated event object to create.
    if (eventToCreate && typeof eventToCreate === 'object') view.createEvent(eventToCreate)
    if (eventToCreate && typeof eventToCreate === 'boolean') view.createEvent(eventCopy)
  }
  else view.createEvent(eventToCreate)
}
</script>

<style lang="scss">
.vuecal__cell {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  touch-action: none; // Prevents browser default touch handling.

  .vuecal__scrollable--days-view &,
  .vuecal__scrollable--week-view & {min-width: var(--vuecal-min-cell-width, 0);}

  &--has-schedules {align-items: stretch;}
  &--out-of-range {opacity: 0.4;}
  &--disabled {cursor: not-allowed;}
}

.vuecal__special-hours {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  pointer-events: none; // Under the day schedules if enabled.
}

.vuecal__now-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 0;
  border-top: 1px solid;
  border-color: rgba(red, 0.6);
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: -6px;
    left: 0;
    border: 5px solid transparent;
    border-left-color: inherit;
  }

  &:after {
    content: "";
    position: absolute;
    inset: -6px 0;
  }

  span {
    position: absolute;
    right: 1px;
    font-size: 10px;
    opacity: 0.7;
  }
}

.vuecal__scrollable--day-view {
  .vuecal__cell--today:before,
  .vuecal__cell--selected:before {display: none;}
}

.vuecal__event-placeholder {
  background-color: rgb(35, 181, 181);
  position: absolute;
  left: 0;
  right: 0;
  padding-left: 4px;
  border-radius: 4px;
  font-size: 11px;
}
</style>
