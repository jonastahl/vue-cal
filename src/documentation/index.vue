<template lang="pug">
top-bar(v-if="$route.name !== 'home'" fixed)

.page.w-flex.grow.page-container(
  :class="`page--${$route.name}`"
  v-scroll="onScroll"
  v-bind="$attrs")
  aside(v-if="!['test', 'home'].includes($route.name)")
    nav.nav.mb12
      ul
        li
          router-link.nav__item(to="/") Home
        li
          router-link.nav__item(to="/getting-started") Getting Started
        li
          router-link.nav__item(to="/api") API
        li
          router-link.nav__item(to="/date-prototypes") Date Prototypes
        li
          router-link.nav__item(to="/examples") Examples
          w-transition-expand(y)
            ul(v-if="$route.fullPath.includes('/examples')")
              li
                router-link.nav__item(to="/examples/introduction") Introduction
              li
                router-link.nav__item(to="/examples/view") View
              li
                router-link.nav__item(to="/examples/date-and-time") Date and Time
              li
                router-link.nav__item(to="/examples/schedules") Schedules
              li
                router-link.nav__item(to="/examples/calendar-events--display") Events Display
              li
                router-link.nav__item(to="/examples/calendar-events--interactions") Events Interactions
              li
                router-link.nav__item(to="/examples/dom-events") DOM Events
              li
                router-link.nav__item(to="/examples/customization") Customization
              li
                router-link.nav__item(to="/examples/playground") Playground
        li
          router-link.nav__item(to="/migration-guide") Migration Guide
        li
          router-link.nav__item(to="/road-map") Road Map
        li
          router-link.nav__item(to="/release-notes") Release Notes

  router-view(v-if="$route.name === 'home'" :offset-top="offsetTop")
  main.main(v-else :class="`main--${$route.name}`")
    router-view

    w-transition-twist
      w-button.go-top.ma2(
        v-show="!goTopHidden"
        @click="scrollToTop"
        icon="wi-chevron-up"
        fixed
        bottom
        right
        round
        xl)

footer.page-container.grey-dark1.smd-column.smd-justify-center.gap4
  .w-flex.text-center.smu-text-left.copyright.align-end
    | Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
  .made-with.text-right.smd-text-center.no-grow
    .w-flex.gap1.mb1.justify-end.smd-justify-center
      | This documentation is made with
      w-tooltip(top)
        template(#activator="{ on }")
          w-icon.caption(v-on="on" size="1rem") mdi mdi-vuejs
        | Vue
      w-tooltip(top)
        template(#activator="{ on }")
          w-icon.caption(v-on="on" size="1rem") mdi mdi-language-html5
        | HTML5 &amp; Pug
      w-tooltip(top)
        template(#activator="{ on }")
          w-icon.caption(v-on="on" size="1rem") mdi mdi-language-css3
        | CSS3
      w-tooltip(top)
        template(#activator="{ on }")
          w-icon.caption(v-on="on" size="1rem") mdi mdi-sass
        | SCSS
      span &amp;
      w-tooltip(top align-right)
        template(#activator="{ on }")
          w-icon.caption(v-on="on" size="1rem").heart mdi mdi-heart
        | Love
    | View project on #[a(href="https://github.com/antoniandre/vue-cal" target="_blank") #[w-icon mdi mdi-github] Github].
</template>

<script setup>
import { provide, ref } from 'vue'
import TopBar from '@/documentation/components/top-bar.vue'
import '@/scss/index.scss'

const offsetTop = ref(0)
const goTopHidden = ref(true)

const scrollToTop = () => document.querySelector('#top').scrollIntoView()

// Directives.
const vScroll = {
  mounted: (el, binding) => {
    const f = evt => {
      if (binding.value(evt, el)) window.removeEventListener('scroll', f)
    }
    window.addEventListener('scroll', f)
  }
}

const onScroll = () => {
  const { scrollTop, offsetHeight } = document.documentElement
  offsetTop.value = window.scrollY || scrollTop
  goTopHidden.value = offsetTop.value < 200
}

provide('locales', [
  { code: 'sq', label: 'Albanian' },
  { code: 'ar', label: 'Arabic' },
  { code: 'bn', label: 'Bangla' },
  { code: 'bs', label: 'Bosnian' },
  { code: 'bg', label: 'Bulgarian' },
  { code: 'ca', label: 'Catalan' },
  { code: 'cs', label: 'Czech' },
  { code: 'zh-cn', label: 'Chinese (Simplified)' },
  { code: 'zh-hk', label: 'Chinese (Traditional)' },
  { code: 'hr', label: 'Croatian' },
  { code: 'da', label: 'Danish' },
  { code: 'nl', label: 'Dutch' },
  { code: 'en', label: 'English' },
  { code: 'et', label: 'Estonian' },
  { code: 'fa', label: 'Farsi' },
  { code: 'fr', label: 'French' },
  { code: 'ka', label: 'Georgian' },
  { code: 'de', label: 'German' },
  { code: 'el', label: 'Greek' },
  { code: 'he', label: 'Hebrew' },
  { code: 'hu', label: 'Hungarian' },
  { code: 'is', label: 'Icelandic' },
  { code: 'it', label: 'Italian' },
  { code: 'id', label: 'Indonesian' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'lt', label: 'Lithuanian' },
  { code: 'mn', label: 'Mongolian' },
  { code: 'no', label: 'Norwegian' },
  { code: 'pl', label: 'Polish' },
  { code: 'pt-br', label: 'Portuguese Brasilian' },
  { code: 'ro', label: 'Romanian' },
  { code: 'ru', label: 'Russian' },
  { code: 'sr', label: 'Serbian' },
  { code: 'sk', label: 'Slovak' },
  { code: 'sl', label: 'Slovenian' },
  { code: 'es', label: 'Spanish' },
  { code: 'sv', label: 'Swedish' },
  { code: 'tr', label: 'Turkish' },
  { code: 'uk', label: 'Ukrainian' },
  { code: 'vi', label: 'Vietnamese' }
])
</script>
