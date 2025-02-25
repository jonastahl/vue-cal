<template lang="pug">
w-switch.theme-switch(
  :model-value="store.darkMode"
  @update:modelValue="store.toggleDarkMode")
  template(#thumb)
    w-icon mdi {{ store.darkMode ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}

w-toolbar.top-bar.pa0(:class="{ fixed }")
  .top-bar__title
    span.top-bar__title-line
    span.top-bar__title-line
    component.w-flex.align-center.primary.px5.mb0.title1(:is="$route.name === 'home' ? 'h1' : 'div'")
      router-link.top-bar__logo-link.w-flex.align-center.no-grow.gap4(:to="{ name: 'home', hash: '#top' }")
        .logo.top-bar__logo {{ todayDate < 10 ? `0${todayDate}` : todayDate }}
        .top-bar__logo-title
          | Vue Cal
          .version v. {{ version }}
      span.intro Vue.js full cal&nbsp; #[span.code --no-deps --no-bs]&nbsp; :metal:

  .top-bar__items.fill-height.mr3
    w-button(
      v-if="!isProduction"
      route="/test"
      text
      tile
      color="secondary"
      height="100%")
      w-icon.mr2.green(lg) mdi mdi-needle
      span.green TESTS
    w-menu(
      show-on-hover
      hide-on-menu-click
      align-right
      transition="slide-fade-down"
      menu-class="mt0 top-menu top-menu--doc"
      append-to=".top-bar__items"
      custom)
      template(#activator="{ on }")
        w-button.bd0(
          v-on="on"
          text
          tile
          color="secondary"
          height="100%")
          w-icon.mr2(lg) mdi mdi-school
          span DOC

      w-list.mt0.pa0.sh2.base-color--bg.bdrs1(
        nav
        :items="docs"
        item-class="pa0")
        template(#item="{ item }")
          w-divider.grow.pa0(v-if="(item.class || '').startsWith('divider')" color="grey-light1")
          router-link.w-flex.grow.align-center.px5.py2(v-else-if="item.route" :to="item.route")
            w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
            span(v-html="item.label")
          .py2(v-else)
            w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
            span(v-html="item.label")

    w-menu(
      show-on-hover
      hide-on-menu-click
      align-right
      transition="slide-fade-down"
      menu-class="mt0 top-menu top-menu--examples"
      append-to=".top-bar__items"
      custom)
      template(#activator="{ on }")
        w-button.bd0.mr10(
          v-on="on"
          text
          tile
          color="secondary"
          route="/examples"
          height="100%")
          w-icon.mr2(lg) mdi mdi-apps
          span EXAMPLES
      w-list.mt0.pa0.sh2.base-color--bg.bdrs1(
        nav
        :items="examples"
        item-class="pa0"
        style="max-height: 90vh;overflow: auto;white-space: nowrap")
        template(#item="{ item }")
          w-divider.grow.pa0(v-if="(item.class || '').startsWith('divider')" color="grey-light1")
          router-link.w-flex.grow.align-center.px5.py2(v-else-if="item.route" :to="item.route")
            w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
            span(:class="{ ml8: !item.icon }" v-html="item.label")
          .w-flex.grow.align-center.px5.py2(v-else)
            w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
            span(:class="{ ml8: !item.icon }" v-html="item.label")
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '@/store'

const props = defineProps({
  fixed: { type: Boolean }
})

const store = useAppStore()
const todayDate = ref((new Date()).getDate())
const isProduction = import.meta.env.PROD

const docs = [
  { route: '/getting-started', label: 'Getting Started' },
  { class: 'divider pa0' },
  { route: '/api', label: 'API' },
  { route: '/date-prototypes', label: 'Date Prototypes' },
  // { route: { name: 'examples', hash: '#css-notes' }, label: 'CSS notes' },
  { route: '/migration-guide', label: 'Migration Guide' },
  { route: '/road-map', label: 'Road Map' },
  { class: 'divider pa0' },
  { route: '/release-notes', label: 'Release Notes' }
]

const examples = [
  { class: 'heading', route: '/examples', label: 'BASIC &amp; VIEW OPTIONS', icon: 'wi-check' },
  { route: { name: 'examples', hash: '#ex--basic' }, label: 'Basic, hide weekends' },
  { route: { name: 'examples', hash: '#ex--small-cal' }, label: 'Small calendar, no view selector, custom arrows' },
  { route: { name: 'examples', hash: '#ex--disable-views' }, label: 'Disable views, default view' },
  { route: { name: 'examples', hash: '#ex--min-max-dates' }, label: 'Min / max dates &amp; single click to navigate' },
  { route: { name: 'examples', hash: '#ex--disable-days' }, label: 'Disable days' },
  { route: { name: 'examples', hash: '#ex--calendar-themes' }, label: 'Calendar themes' },
  { route: { name: 'examples', hash: '#ex--hiding-particular-week-days' }, label: 'Hide particular weekdays &amp; show week numbers' },
  { class: 'heading', route: { name: 'examples', hash: '#ex--internationalization' }, label: 'INTERNATIONALIZATION (I18N)', icon: 'mdi mdi-translate' },
  { route: { name: 'examples', hash: '#ex--internationalization' }, label: 'Internationalization' },
  { class: 'heading', route: { name: 'examples', hash: '#ex--timeline' }, label: 'TIMELINE, BUSINESS HOURS &amp; TODAY', icon: 'mdi mdi-clock-outline' },
  { route: { name: 'examples', hash: '#ex--timeline' }, label: 'Timeline' },
  { route: { name: 'examples', hash: '#ex--special-hours' }, label: 'Business Hours' },
  { route: { name: 'examples', hash: '#ex--today-current-time' }, label: 'Today\'s current time' },
  { route: { name: 'examples', hash: '#ex--adding-a-today-button' }, label: 'Adding a Today button' },

  { class: 'heading', route: { name: 'examples', hash: '#ex--timeless-events' }, label:'EVENTS', icon: 'mdi mdi-calendar' },
  { route: { name: 'examples', hash: '#ex--timeless-events' }, label: 'Timeless events' },
  { route: { name: 'examples', hash: '#ex--events-with-time' }, label: 'Events with time information' },
  { route: { name: 'examples', hash: '#ex--open-dialog-on-event-click' }, label: 'Open a dialog box on event click / dblclick' },
  { route: { name: 'examples', hash: '#ex--events-indicators' }, label: 'Events indicators' },
  { route: { name: 'examples', hash: '#ex--events-on-month-view' }, label: 'Display events on month view' },
  { route: { name: 'examples', hash: '#ex--edit-and-delete-events' }, label: 'Edit &amp; delete events' },
  { route: { name: 'examples', hash: '#ex--create-events' }, label: 'Create events' },
  { route: { name: 'examples', hash: '#ex--other-event-creation-methods' }, label: 'Other event creation methods' },
  { route: { name: 'examples', hash: '#ex--drag-and-drop' }, label: 'Drag &amp; drop' },
  { route: { name: 'examples', hash: '#ex--external-events-drag-and-drop' }, label: 'External events drag &amp; drop' },
  { route: { name: 'examples', hash: '#ex--multiple-day-events' }, label: 'Multiple day events' },
  { route: { name: 'examples', hash: '#ex--recurring-events' }, label: 'Recurring events' },
  { route: { name: 'examples', hash: '#ex--overlapping-events' }, label: 'Overlapping events' },
  { route: { name: 'examples', hash: '#ex--background-events' }, label: 'Background events' },
  { route: { name: 'examples', hash: '#ex--all-day-events' }, label: 'All day events' },
  { route: { name: 'examples', hash: '#ex--schedules' }, label: 'Day schedules' },

  { class: 'heading', route: { name: 'examples', hash: '#ex--emitted-events' }, label: 'COMMUNICATING WITH VUE CAL', icon: 'mdi mdi-swap-horizontal' },
  { route: { name: 'examples', hash: '#ex--emitted-events' }, label: 'Vue Cal emitted events' },
  { route: { name: 'examples', hash: '#ex--external-controls' }, label: 'External controls &amp; use of Vue Cal methods' },
  { route: { name: 'examples', hash: '#ex--sync-two-calendars' }, label: 'Sync two vue-cal instances' },
  { route: { name: 'examples', hash: '#ex--modifying-events-from-outside' }, label: 'Modifying events from outside' },

  { class: 'heading', route: { name: 'examples', hash: '#ex--timeline-tweaking' }, label: 'ADVANCED CUSTOMIZATION', icon: 'mdi mdi-tune' },
  { route: { name: 'examples', hash: '#ex--scroll-to-time' }, label: 'Scroll the view to a particular time' },
  { route: { name: 'examples', hash: '#ex--timeline-tweaking' }, label: 'Timeline tweaking' },
  { route: { name: 'examples', hash: '#ex--custom-events-count' }, label: 'Custom events count' },
  { route: { name: 'examples', hash: '#ex--custom-title-and-cells' }, label: 'Custom title &amp; cells' },
  { route: { name: 'examples', hash: '#ex--custom-event-rendering' }, label: 'Custom event rendering' },
  { route: { name: 'examples', hash: '#ex--custom-schedules' }, label: 'Custom day schedules' }

  // w-tag.ml2(color="primary" outline) NEW
  // w-tag.ml2(color="blue" outline) UPDATED
]

const version = computed(() => {
  return process.env.VITE_APP_VERSION.replace(
    /-(\w)(\w+)\.(\d+)/,
    (m0, m1, m2, m3) => ` <strong>${m1.toUpperCase()}${m2} ${m3}</strong>`
  )
})
</script>

<style lang="scss">
$secondary: #2c3e50;
$lighter-text: #ccc;

.theme-switch {
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: 11;
}

.top-bar {
  position: absolute;
  border-bottom: 1px solid transparent;
  background: rgba(255, 255, 255, 0.1);
  transition: 0.3s ease-in-out all, 0.1s 0s ease-in-out border-color;
  top: 0;
  left: 0;
  right: 0;
  padding-right: 30px;
  box-sizing: content-box;
  background-color: rgba(#fff, 0.6);
  backdrop-filter: blur(6px);
  height: 40px;

  &.w-toolbar {border-color: transparent;}
  .w-app &.w-toolbar {z-index: 10;}

  h1 {height: 100%;}

  &__title {
    position: relative;
    overflow: visible;
    margin-left: auto;
    margin-right: auto;
    width: 15.5em;
    height: 100%;
    transition: 0.3s ease-in-out;
    font-size: 1em;
  }

  &__title-line {
    position: absolute;
    top: 50%;
    width: 130px;
    right: 100%;

    & + & {right: auto;left: 100%;}

    &:before, &:after {
      content: "";
      position: absolute;
      top: 0%;
      width: 100%;
      display: block;
      z-index: -1;
      border-left: none;
      border-right: none;
      border-radius: 99em;
    }

    &:before {
      margin-top: -1px;
      border: 2px solid var(--w-primary-color);
    }

    &:after {
      margin-top: 5px;
      border: 1px solid color-mix(in srgb, var(--w-primary-color) 100%, var(--w-contrast-bg-color) 50%);
    }
  }

  &__logo {
    position: relative;
    flex-shrink: 0;
    vertical-align: middle;
    box-sizing: border-box;
    transition: 0.2s 0s ease-in-out;
    background-color: var(--w-primary-color);
    width: 38px;
    height: 36px;
    border-radius: 4px;
    display: inline-block;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    opacity: 0.8;
    margin-top: -2px;
    padding-top: 9px;
    font-family: impact, arial black, arial, sans-serif;
    transition: 0.4s 0.4s ease-in-out;
    transform: translate(3px, 3px) scale(0.9);
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0);

    &:before, &:after {
      content: '';
      position: absolute;
      top: 5px;
      width: 5px;
      height: 5px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    &:before {left: 5px;}
    &:after {right: 5px;}

    .ready & {
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
      transform: translate(0, 0);
    }
    [data-theme="dark"] .ready & {box-shadow: 2px 2px 3px #000;}
  }

  &__logo-link {
    display: inline-flex;
    height: 100%;
    font-size: 0.7em;
  }

  &__logo-title {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    transition: 0.3s ease-in-out;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 2px;
  }

  &__logo-title:after {
    content: "*";
    position: absolute;
    top: 0;
    left: 100%;
    margin-left: 4px;
    line-height: 1;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  .version {
    opacity: 0;
    color: #bbb;
    font-style: italic;
    font-size: 11px;
    position: absolute;
    bottom: -8px;
    right: 0;
  }

  &__items {
    position: absolute;
    right: 0;
    transition: 0.3s ease-in-out;
    transform: translateX(100%);
    opacity: 0;
  }

  .w-menu__content {max-height: 90vh;}
  .w-menu__content .v-list-item {
    height: 30px;
    font-size: 1em;
    padding-left: 32px;

    &.heading {
      padding-left: 8px;
      margin-top: 8px;
      color: #888;
    }
  }

  .w-tag {
    height: 16px;
    line-height: 1;
    font-size: 0.8em;
    padding: 0 7px;
  }

  .intro {
    position: absolute;
    top: 3em;
    left: 76px;
    color: #888;
    opacity: 1;
    transform: translateY(0);
    transition: 0.3s .4s ease-in-out, 0s 0s top;
    font-size: 12px;
    font-weight: normal;
    border: none;
    text-align: left;
    white-space: nowrap;
  }

  .intro:before {
    content: "* ";
    vertical-align: super;
  }

  .intro em {
    padding-top: 3px;
    opacity: 0.6;
    transition: 0.3s;

    &:hover {opacity: 0.9;}
  }

  // When scrolled: sticky top bar.
  &.fixed {
    transition: 0.6s ease-in-out all, 0.3s 0.5s ease-in-out border-color;
    border-bottom-color: rgba($lighter-text, 0.5);
    position: fixed;

    .top-bar__title {width: 100%;}
    .top-bar__logo {
      width: 32px;
      height: 30px;
      font-size: 0.8em;
      padding-top: 9px;
    }
    .top-bar__logo-title {
      font-size: 0.9em;
      font-weight: 600;
      letter-spacing: 0;
    }
    .top-bar__logo-title:after {opacity: 0;}
    .version {opacity: 1;}

    .top-bar__items {
      transition: 0.3s 0.3s ease-in-out all;
      transform: translateX(0%);
      opacity: 1;
    }

    .intro {
      transition: 0.2s 0s ease-in-out all, 0s 0.3s top;
      transform: translateY(-1em);
      opacity: 0;
      top: -5em;
    }
  }
}

.top-menu li {font-size: 15px;}
.top-menu li .heading {
  font-size: 14px;
  color: #888;
  margin-top: 20px;
  padding: 8px 0;
  border-top: 1px solid color-mix(in srgb, var(--w-contrast-bg-color) 10%, transparent);
  background: //linear-gradient(90deg, rgba(128, 231, 172, 0.12), rgba(255, 255, 255, 0));
  linear-gradient(90deg, var(--highlight-color), rgba(255, 255, 255, 0));
  &:before {background: inherit;}
  &:focus:before, &:hover:before {opacity: 1;}
}

// Media queries.
// --------------------------------------------------------
@media screen and (max-width: $xs) {
  .fixed .top-bar__logo {transform: scale(0.8);}

  .top-bar.fixed,
  .top-bar.fixed .w-toolbar__content,
  .fixed .w-flex.top-bar__logo-link {
    height: 32px;
    gap: 8px;
  }

  .top-bar__items .w-button {padding: 0 10px;}
}

@media screen and (max-width: $xxs) {
  .theme-switch {top: 4px;right: 4px;}

  .top-bar.fixed .top-bar__items {margin-right: 0;}
  .top-bar.fixed .top-bar__title > .w-flex {padding-left: 8px;}
  .top-bar__title {width: 14.5em;}
  .top-bar .intro {
    font-size: 11px;
    left: 72px;
    letter-spacing: -0.3px;
  }
  .top-bar__items .w-button__content span {display: none;}
  .top-menu--examples li {font-size: 13px;}
  .top-menu--examples li .heading {
    margin-top: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 30px;
  }
  .top-menu--examples li .w-list__item-label > div {padding-left: 8px;}
}
</style>
