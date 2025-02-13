import { computed } from 'vue'

/**
 * useEvents is a composable function that manages events for the Vue Cal component.
 * It provides methods to create, delete, and retrieve events, as well as normalize event dates.
 *
 * @param {Object} vuecal - The Vue Cal instance.
 * @returns {Object} An object containing methods and computed properties for managing events.
 */
export const useEvents = vuecal => {
  const { dateUtils, config } = vuecal
  let uid = 0 // Internal unique ID events counter.

  // Computed property to manage and organize events.
  const events = computed(() => {
    const events = {
      byDate: {}, // A map of single-day events indexed by date.
      recurring: [], // An array of events IDs that are recurring.
      multiday: [], // An array of events IDs that are multiday.
      byId: {} // A map of all the events indexed by ID for fast lookup.
    }

    // First sort the events by start date so the latest comes last in the DOM and has a natural
    // higher z-index for readability when overlapping.
    const sortedEvents = config.events.sort((a, b) => a.start - b.start < 0 ? -1 : 1)

    sortedEvents.forEach(event => {
      // Makes sure the dates are valid Date objects, and add formatted start date in `event._`.
      normalizeEventDates(event)

      // Inject a unique ID in each event.
      if (!event._) event._ = {}
      event._.id = event._.id || event.id || ++uid

      // Inject a delete function in each event and set the deleting flag to false.
      if (!event.delete) event.delete = forcedStage => deleteEvent(event._.id, forcedStage)
      event._.deleting = false
      event._.deleted = false

      event.isOverlapping = () => {
        // return isEventOverlapping(event, events.byDate[event._.startFormatted].filter(id => id !== event._.id))
        return overlaps[event._.startFormatted]?.[event._.id]?.overlaps?.length > 0
      }
      event.getOverlappingEvents = () => {
        return overlaps[event._.startFormatted]?.[event._.id]?.overlaps
      }

      // Register the event DOM node in the event in order to emit DOM events.
      event._.register = domNode => {
        event._.$el = domNode
        if (event._.fireCreated) vuecal.emit('event-created', event)
      }
      event._.unregister = () => (event._.$el = null)

      events.byId[event._.id] = event // Save and index the event in the byId map.

      if (event.recurring) {
        events.recurring.push(event._.id)
        // @todo: Possibly do other things here.
      }
      else if (event._.multiday) {
        events.multiday.push(event._.id)
        // @todo: handle multiday events. For now, index the event by its start date.
        if (!events.byDate[event._.startFormatted]) events.byDate[event._.startFormatted] = []
        events.byDate[event._.startFormatted].push(event._.id)
      }
      else {
        // Index this event by its start date.
        if (!events.byDate[event._.startFormatted]) events.byDate[event._.startFormatted] = []
        events.byDate[event._.startFormatted].push(event._.id)
      }
    })
    return events
  })

  // Normalize event dates to ensure they are valid Date objects and add formatted dates.
  const normalizeEventDates = event => {
    if (typeof event.start === 'string') event.start = dateUtils.stringToDate(event.start)
    if (typeof event.end === 'string') event.end = dateUtils.stringToDate(event.end)
    if (isNaN(event.start) || isNaN(event.end)) {
      if (isNaN(event.start)) console.error(`Vue Cal: invalid start date for event "${event.title}".`, event.start)
      else console.error(`Vue Cal: invalid end date for event "${event.title}".`, event.end)
      return
    }
    else if (event.end.getTime() < event.start.getTime()) console.error(`Vue Cal: invalid event dates for event "${event.title}". The event ends before it starts.`, event.start, event.end)

    if (!event._) event._ = {}
    event._.multiday = !dateUtils.isSameDate(event.start, event.end)
    event._.startFormatted = dateUtils.formatDate(event.start) // yyyy-mm-dd formatted date string.
    event._.startMinutes = ~~dateUtils.dateToMinutes(event.start) // Integer (minutes).
    event._.endMinutes = ~~dateUtils.dateToMinutes(event.end) // Integer (minutes).
    const startHours = event.start.getHours()
    const startMinutes = event.start.getMinutes().toString().padStart(2, 0)
    const endHours = event.end.getHours()
    const endMinutes = event.end.getMinutes().toString().padStart(2, 0)
    event._.startTimeFormatted24 = `${startHours.toString().padStart(2, 0)}:${startMinutes}`
    event._.startTimeFormatted12 = `${(startHours % 12) || 12}${startMinutes ? `:${startMinutes}` : ''} ${startHours < 12 ? 'AM' : 'PM'}`
    event._.endTimeFormatted24 = `${endHours.toString().padStart(2, 0)}:${endMinutes}`
    event._.endTimeFormatted12 = `${(endHours % 12) || 12}${endMinutes ? `:${endMinutes}` : ''} ${endHours < 12 ? 'AM' : 'PM'}`
    event._.duration = event._.endMinutes - event._.startMinutes // Integer (minutes).
  }

  // Retrieve an event by its ID.
  const getEvent = id => events.value.byId[id]

  // Retrieve events by a formatted date and optionally return the full event objects.
  const getEventsByDate = (dateFormatted, fullEvents = false) => {
    const evts = events.value.byDate[dateFormatted] || []
    return fullEvents ? evts.map(getEvent) : evts
  }

  // Get events for the view based on cell dates.
  // Returns an object of cell events arrays indexed by the cell string date.
  const getViewEvents = cellDates => {
    console.log('👗', 'getViewEvents')

    const events = {}
    cellDates.forEach(({ startFormatted }) => {
      events[startFormatted] = []
      const eventsByDate = getEventsByDate(startFormatted)
      if (eventsByDate.length) events[startFormatted].push(...eventsByDate)
    })
    return events
  }

  // Create a new event and add it to the events list.
  const createEvent = newEvent => {
    if (!newEvent.start || !newEvent.end) {
      console.error('Vue Cal: Cannot create an event without valid start and end dates.')
      return
    }

    // If `snapToInterval` is enabled in the configuration, adjust the `start` and `end` times to the
    // nearest interval specified by `config.snapToInterval`.
    if (config.snapToInterval) {
      dateUtils.snapToInterval(newEvent.start, config.snapToInterval)
      dateUtils.snapToInterval(newEvent.end, config.snapToInterval)
    }

    newEvent._ = { fireCreated: true } // Flag to fire the 'event-created' event on first mounted.
    config.events.push(newEvent) // Add the new event to the source of truth.
    return newEvent
  }

  /**
   * Deletes an event based on the provided eventId and forcedStage.
   *
   * @param {string} eventId - The ID of the event to delete.
   * @param {number} [forcedStage=0] - The stage of deletion to force.
   *    0: Initial deletion stage, toggles deleting and deleted flags.
   *    1: Sets the deleting flag to true.
   *    2: Sets the deleted flag to true and dispatches 'event-deleted' event.
   *    3: Removes the event from the source of truth, emits 'update:events' and 'event-delete' events, and dispatches 'event-deleted' event.
   * @returns {boolean} - Returns true for chaining.
   */
  const deleteEvent = (eventId, forcedStage = 0) => {
    if (!config.editableEvents.delete) return
    if (!eventId) return console.warn(`Vue Cal: Cannot delete unknown event \`${eventId}\`.`)

    const index = config.events.findIndex(item => item._.id === eventId)
    if (index === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${eventId}\`.`)

    const event = config.events[index]
    if (event.deletable === false) return console.warn(`Vue Cal: Can't delete event \`${eventId}\` since it was explicitely set to \`delete: false\`.`)

    switch (forcedStage) {
      case 0:
        if (!event._.deleting) event._.deleting = true
        else if (!event._.deleted) event._.deleted = true
        else config.events.splice(index, 1) // Remove the event from the source of truth.
        break
      // Display the delete button.
      case 1:
        event._.deleting = true
        config.events[index]._.deleting = true
        break
      // Visual deletion + external DOM event firing.
      case 2:
        event._.deleted = true
        config.events[index]._.deleted = true
        // Internal emit to the cell (`detail` is the native expected object wrapper).
        event._.$el?.dispatchEvent(new CustomEvent('event-deleted', { detail: event._.id }))
        break
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        // Removing the event from the source of truth causes a reactivity update cascade that rerenders
        // all the cells and sub-components. This is not a bug, but in most cases, not the ideal behavior.
        config.events.splice(index, 1) // Remove the event from the source of truth.
        console.log('😫', 'deleting the event!', event)
        vuecal.emit('update:events', config.events)
        vuecal.emit('event-delete', event)
        break
    }

    return true // For chaining.
  }

  const overlaps = {} // Store the overlaps for each cell date.
  const isEventOverlapping = (event, otherCellEvents = []) => {
    if (!otherCellEvents) return false
    const { startMinutes: eventStart, endMinutes: eventEnd } = event._

    return otherCellEvents.some(id => {
      const otherEvent = getEvent(id)
      if (!otherEvent) return false
      const { startMinutes: otherStart, endMinutes: otherEnd } = otherEvent._
      return (eventStart >= otherStart && eventStart < otherEnd) || (eventEnd > otherStart && eventEnd <= otherEnd) || (eventStart <= otherStart && eventEnd >= otherEnd)
    })
  }

  // Will recalculate all the overlaps of the current cell OR schedule.
  // cellEvents will contain only the current schedule events if in a schedule.
  const getOverlappingEvents = cellDate => {
    const cellEvents = getEventsByDate(cellDate, true)
    if (!cellEvents.length) return { cellOverlaps: {}, longestStreak: 0 }

    let cellOverlaps = {}
    let longestStreak = 0
    let activeEvents = new Set()

    // Sort events by start time, then by duration (shorter first)
    cellEvents.sort((a, b) => a.start - b.start || (a.end - a.start) - (b.end - b.start))

    for (const e of cellEvents) {
      const id = e._.id

      if (!cellOverlaps[id]) {
        cellOverlaps[id] = { overlaps: new Set(), start: e.start, position: 0 }
      }

      // Remove non-overlapping events
      for (const activeId of [...activeEvents]) {
        const activeEvent = cellEvents.find(ev => ev._.id === activeId)
        if (activeEvent && !isEventInRange(activeEvent, e.start, e.end)) {
          activeEvents.delete(activeId)
        }
      }

      // Track overlaps in active events
      for (const activeId of activeEvents) {
        const activeEvent = cellEvents.find(ev => ev._.id === activeId)

        const eventIsInRange = isEventInRange(activeEvent, e.start, e.end)
        const eventsInSameTimeStep = config.overlapsPerTimeStep
          ? dateUtils.datesInSameTimeStep(e.start, activeEvent.start, config.timeStep)
          : true

        if (!e.background && !e.allDay && !activeEvent.background && !activeEvent.allDay && eventIsInRange && eventsInSameTimeStep) {
          cellOverlaps[id].overlaps.add(activeId)
          cellOverlaps[activeId].overlaps.add(id)
        }
      }

      // Add current event to active tracking
      activeEvents.add(id)

      // Update longest streak of overlapping events
      longestStreak = Math.max(longestStreak, activeEvents.size)
    }

    // Convert Sets to Arrays and assign positions correctly
    for (const id in cellOverlaps) {
      const item = cellOverlaps[id]

      const overlapsRow = Array.from(item.overlaps).map(id2 => ({
        id: id2,
        start: cellOverlaps[id2].start
      }))
      overlapsRow.push({ id, start: item.start })
      overlapsRow.sort((a, b) => a.start - b.start || String(a.id).localeCompare(String(b.id)))

      item.position = overlapsRow.findIndex(e => e.id === id)
      longestStreak = Math.max(overlapsRow.length, longestStreak)

      // Convert Set to array for return
      item.overlaps = [...item.overlaps]
    }

    // Save the overlaps for this cell date so it can be used from the event.getOverlappingEvents method.
    overlaps[cellDate] = cellOverlaps

    return { cellOverlaps, longestStreak }
  }

  /**
   * Returns true if an event is in a given date range, even partially, or false otherwise.
   *
   * @param {Object} event The event to test.
   * @param {Date} start The start of range date object.
   * @param {Date} end The end of range date object.
   * @return {Boolean} true if in range, even partially.
   */
  const isEventInRange = (event, start, end) => {
    // Check if all-day or timeless event (if date but no time there won't be a `:` in event.start).
    if (event.allDay || !config.time) {
      // Get the date and discard the time if any, then check it's within the date range.
      const startTimestamp = new Date(event.start).setHours(0, 0, 0, 0)
      const endTimestamp = new Date(event.end).setHours(23, 59, 59, 999)
      const rangeStart = new Date(start).setHours(0, 0, 0, 0)
      const rangeEnd = new Date(end).setHours(23, 59, 59, 999)

      return endTimestamp >= rangeStart && startTimestamp <= rangeEnd
    }

    const startTimestamp = event.start.getTime()
    const endTimestamp = event.end.getTime()
    return endTimestamp >= start.getTime() && startTimestamp <= end.getTime()
  }

  return {
    events,
    getEvent,
    getEventsByDate,
    getViewEvents,
    getOverlappingEvents,
    createEvent,
    deleteEvent,
    isEventInRange
  }
}
