<template lang="pug">
.vuecal(
  ref="vuecal-el"
  :data-locale="locale"
  :class="wrapperClasses"
  :style="wrapperStyles")
  slot(
    v-if="$slots.diy"
    name="diy"
    :vuecal="vuecal"
    :view="view"
    :available-views="config.availableViews")
  template(v-else)
    VueCalHeader
      template(v-if="$slots.header" #header="params")
        slot(name="header" v-bind="params")
      template(v-if="!$slots.header && $slots['previous-button']" #previous-button="params")
        slot(name="previous-button" v-bind="params")
      template(v-if="!$slots.header && $slots['next-button']" #next-button="params")
        slot(name="next-button" v-bind="params")
      template(v-if="!$slots.header && $slots['today-button']" #today-button="params")
        slot(name="today-button" v-bind="params")
      template(v-if="!$slots.header && $slots.title" #title="params")
        slot(name="title" v-bind="params")
      template(v-if="!$slots.header && $slots['schedule-heading']" #schedule-heading="params")
        slot(name="schedule-heading" v-bind="params")

    .vuecal__scrollable-wrap
      transition(:name="`vuecal-slide-fade--${view.transitionDirection}`")
        .vuecal__scrollable(
          :class="scrollableElClasses"
          :key="view.id + view.start.getTime()")
          TimeColumn(v-if="hasTimeColumn")
            template(v-if="$slots['time-cell']" #time-cell="params")
              slot(name="time-cell" v-bind="params")
          .vuecal__week-numbers(v-if="config.weekNumbers && view.isMonth")
            .vuecal__week-number(v-for="i in weekNumbers")
              slot(name="week-number")
                small {{ i }}
          .vuecal__body-wrap
            HeadingsBar
              template(#weekday-heading="params")
                slot(name="weekday-heading" v-bind="params")
              template(#schedule-heading="params")
                slot(name="schedule-heading" v-bind="params")

            VueCalBody(
              @cell-drag-start="isDraggingCell = true"
              @cell-drag-end="isDraggingCell = false"
              @event-drag-start="isDraggingEvent = true"
              @event-drag-end="isDraggingEvent = false")
              template(v-if="$slots.cell" #cell="params")
                slot(name="cell" v-bind="params")
              template(v-if="!$slots.cell && $slots['cell-date']" #cell-date="params")
                slot(name="cell-date" v-bind="params")
              template(v-if="!$slots.cell && $slots['cell-content']" #cell-content="params")
                slot(name="cell-content" v-bind="params")
              template(v-if="!$slots.cell && $slots['cell-events']" #cell-events="params")
                slot(name="cell-events" v-bind="params")
</template>

<script setup>
import { computed, nextTick, onMounted, provide, ref, useAttrs, useTemplateRef, watch } from 'vue'
import { props as propsDefinitions } from '../core/props-definitions'
import { useVueCal } from '../core/index'
import VueCalHeader from './header.vue'
import HeadingsBar from './headings-bar.vue'
import TimeColumn from './time-column.vue'
import VueCalBody from './body.vue'
import '../index.scss'
import '../default-theme.scss'

const props = defineProps(propsDefinitions)

// In addition to the following emitted events, there are other manually-handled events that are forwarded
// to specific components, allowing the user to have full flexibility and control on their own events:
// cell-click, cell-xxxx, where xxxx is an existing DOM event name given by the end user;
// event-click, event-xxxx, where xxxx is an existing DOM event name given by the end user.
const emit = defineEmits([
  'ready',
  'view-change',
  'update:view',
  'update:selectedDate',
  'update:viewDate'
])

const vuecalEl = useTemplateRef('vuecal-el')
const vuecal = useVueCal(props, emit, useAttrs(), vuecalEl)
const { config, view, dateUtils } = vuecal
const isDraggingCell = ref(false)
const isDraggingEvent = ref(false)
const hasTimeColumn = computed(() => config.time && (view.isDay || view.isDays || view.isWeek))

const weekNumbers = computed(() => {
  return Array(view.rows).fill().map((v, i) => {
    return dateUtils.getWeek(dateUtils.addDays(view.firstCellDate, 7 * i))
  })
})

const wrapperClasses = computed(() => ({
  'vuecal--ready': config.ready,
  [`vuecal--${config.theme}-theme`]: config.theme,
  [`vuecal--${config.size}`]: true,
  'vuecal--date-picker': config.datePicker,
  'vuecal--dark': config.dark,
  'vuecal--light': !config.dark,
  [`vuecal--${view.id}-view`]: true,
  'vuecal--view-has-time': hasTimeColumn.value,
  'vuecal--timeless': !config.time,
  'vuecal--dragging-cell': isDraggingCell.value,
  'vuecal--dragging-event': isDraggingEvent.value,
  'vuecal--has-schedules': config.schedules
}))

const wrapperStyles = computed(() => ({
  '--vuecal-time-cell-height': config.timeCellHeight && `${config.timeCellHeight}px`
}))

const scrollableElClasses = computed(() => ({
  'vuecal__scrollable--row': hasTimeColumn.value || (config.weekNumbers && view.isMonth),
  // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
  [`vuecal__scrollable--${view.id}-view`]: true,
  'vuecal__scrollable--has-schedules': config.schedules?.length
}))

onMounted(async () => {
  await nextTick()
  emit('ready', { config, view })
})

watch(() => config.locale, newLocale => config.loadTexts(newLocale))

// Share the vuecal object across all the Vue components.
provide('vuecal', vuecal)

defineExpose({ view: vuecal.view })
</script>
