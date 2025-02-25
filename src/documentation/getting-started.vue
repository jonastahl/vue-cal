<template lang="pug">
h1.title1 Getting Started

//- Installation
title-link.mt12(h2 anchor="installation") Installation
p.mt2 You have 2 options: using #[strong NPM] or #[strong.code &lt;script&gt;] tag.
ul.ml4
  li
    h3.mt4 Via NPM
    .w-flex.align-center.mt2.xs-column.xs-align-start
      ssh-pre.my0(language="shell" :dark="store.darkMode") npm i vue-cal # Vue 3
      span.mx6 or
      ssh-pre.my0(language="shell" :dark="store.darkMode") npm i vue-cal@legacy # Vue 2

    p.mt6.mb3 Then import Vue Cal in your Vue component and use it.
    .w-flex.gap6.smd-column.wrap
      w-tabs.w-flex.column.bdrs2(:items="2" content-class="pa0 fill-height")
        template(#item-title.1) Options API
        template(#item-content.1)
          ssh-pre.fill-height.ma0.bd0(language="js" :dark="store.darkMode").
            import VueCal from 'vue-cal'
            import 'vue-cal/dist/vuecal.css'

            export default {
              components: { VueCal },
              ...
            }

        template(#item-title.2) Composition API
        template(#item-content.2)
          ssh-pre.fill-height.ma0.bd0(language="js" :dark="store.darkMode").
            import VueCal from 'vue-cal'
            import 'vue-cal/dist/vuecal.css'

      .highlight-box.grow
        .title2 Demos on StackBlitz
        p.body.mb4.grey Check the different setups for bundlers
        .w-flex.align-center
          w-icon.ml3.mr2.bolt(color="grey-light2" size="4.5em") mdi mdi-lightning-bolt
          ul.no-bullet
            li
              w-icon.mr2 wi-chevron-right
              a.ml1(href="https://stackblitz.com/edit/vuecal-vuecli?file=src%2FApp.vue" target="_blank")
                | Vue Cal + Vue 3 + Vue CLI
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
            li
              w-icon.mr2 wi-chevron-right
              a.ml1(href="https://stackblitz.com/edit/vuecal-vite?file=src%2FApp.vue" target="_blank")
                | Vue Cal + Vue 3 + Vite
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
            li
              w-icon.mr2 wi-chevron-right
              a.ml1(href="https://stackblitz.com/edit/vuecal-vite-composition-api?file=src%2FApp.vue" target="_blank")
                | Vue Cal + Vue 3 &amp; composition API + Vite
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new

            li
              w-icon.mr2 wi-chevron-right
              a.ml1(href="https://stackblitz.com/edit/vuecal-vue2?file=src%2FApp.vue" target="_blank")
                | Vue Cal + Vue 2 + Vue CLI
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new

  li.mt8
    h3.mt4 Or via #[span.code &lt;script&gt;] tag
    p Include the Vue Cal script in your document #[span.code &lt;head&gt;] as follows:
    w-tabs.my4(:items="2" content-class="pa0")
      template(#item-title.1) Vue 3
      template(#item-content.1)
        ssh-pre.ma0(language="html" :dark="store.darkMode").
          &lt;head&gt;
            ...
            &lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
            &lt;script src="https://unpkg.com/vue-cal"&gt;&lt;/script&gt;
            &lt;link href="https://unpkg.com/vue-cal/dist/vuecal.css" rel="stylesheet"&gt;
          &lt;/head&gt;

      template(#item-title.2) Vue 2
      template(#item-content.2)
        ssh-pre.ma0(language="html" :dark="store.darkMode").
          &lt;head&gt;
            ...
            &lt;script src="https://unpkg.com/vue@legacy"&gt;&lt;/script&gt;
            &lt;script src="https://unpkg.com/vue-cal@legacy"&gt;&lt;/script&gt;
            &lt;link href="https://unpkg.com/vue-cal@legacy/dist/vuecal.css" rel="stylesheet"&gt;
          &lt;/head&gt;

    p.
      Then define the component to use in your template if you are not using the Vue composition
      API:
    .w-flex.gap6.smd-column.wrap.mt4
      ssh-pre.grow.ma0.pa3.bdrs2(language="js" :dark="store.darkMode").
        // In your Vue.js component.
        export default {
          components: { VueCal: vuecal },
          ...
        }
      .highlight-box.grow
        .title2 Demos on Codepen
        p.body.mb4.grey Check the different setups for direct browser use
        .w-flex.align-center
          w-icon.ml3.mr2.bolt.pa6(color="grey-light2" size="2.8em") mdi mdi-codepen
          ul.no-bullet
            li
              w-icon.mr2 wi-chevron-right
              a.ml1(href="https://codepen.io/antoniandre/pen/XWEgLxg?editors=1010" target="_blank")
                | Vue Cal + Vue 3 (IIFE build)
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
            li
              w-icon.mr2 wi-chevron-right
              a.ml1(href="https://codepen.io/antoniandre/pen/pGJWjL" target="_blank")
                | Vue Cal + Vue 2 (UMD build)
                w-icon.ml1(sm style="margin-top: -2px") mdi mdi-open-in-new

title-link.mt12.pt12(h2 anchor="how-to-use") How to use
p Once you've imported the Vue Cal component, it's super simple. In your template just use:
ssh-pre.my2(language="html-vue" :dark="store.darkMode").
  &lt;vue-cal ... /&gt;
p.
  Without any options, Vue Cal will not do much things for you apart from being a calendar.
  You may choose to provide options:
.w-flex.gap4.smd-column
  div
    p &bull; As direct props like this:
    ssh-pre.my2.ml3.pt4(language="html-vue" :dark="store.darkMode").
      &lt;vue-cal hide-weekends time ... /&gt;
  div
    p &bull; Or bind all the props via v-bind like this:
    ssh-pre.my2.ml3(language="html-vue" :dark="store.darkMode").
      &lt;vue-cal v-bind="config" /&gt;

      const config = {
        hideWeekends: true,
        time: true
        ...
      }

alert
  .title3 That's it! You're up and running.
  p.mt1 Vue Cal comes with a default height of 500px. If you want to change that, you can use CSS. ;)

vue-cal(small :dark="store.darkMode")

//- CSS notes.
title-link.mt12.pt12(h2 anchor="css-notes") CSS Notes
p You can easily change the calendar design with CSS.

p.mt1 First off, Vue Cal comes with a default height of 500px. So if you want to change it, that's via CSS. ;)


title-link.mt12(h3 anchor="themes") Themes
p.
  Currently 2 color themes (green &amp; blue) are available, in addition to the standard grey theme.#[br]
  You can apply a green or blue theme by using the CSS class #[span.code vuecal--green-theme]
  or #[span.code vuecal--blue-theme].
p.
  If you want another color theme, you can define your own easily.#[br]
  This is what a standard color theme looks like.
  You can copy and change any color to quickly get a nice render.#[br]
  If that is still not doing what you want you can change even more in your own CSS.

ssh-pre(language="css" :dark="store.darkMode").
  /* Green-theme. */
  .vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;}
  .vuecal__title-bar {background-color: #e4f5ef;}
  .vuecal__cell--today, .vuecal__cell--current {background-color: rgba(240, 240, 255, 0.4);}
  .vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(235, 255, 245, 0.4);}
  .vuecal__cell--selected:before {border-color: rgba(66, 185, 131, 0.5);}
  /* Cells and buttons get highlighted when an event is dragged over it. */
  .vuecal__cell--highlighted:not(.vuecal__cell--has-schedules),
  .vuecal__schedule--highlighted {background-color: rgba(195, 255, 225, 0.5);}
  .vuecal__arrow.vuecal__arrow--highlighted,
  .vuecal__view-btn.vuecal__view-btn--highlighted {background-color: rgba(136, 236, 191, 0.25);}

p
  strong Rounded theme#[br]
  | You can use the rounded cells theme like in the Example
  | #[a(href="#ex--calendar-themes") Calendar themes - Rounded cells],
  | by applying the CSS class #[span.code vuecal--rounded-theme] to the Vue Cal wrapper.

title-link.mt12(h3 anchor="css-variables") CSS Variables
ul
  li
    code.mr2 allDayBarHeight
    p.
      When the all day bar is visible and Vue Cal is also scrollable horizontally (due to
      #[span.code --vuecal-min-cell-width] or day schedules with #[span.code --vuecal-min-schedule-width]),
      the all-day bar must have a fixed height for this particular layout.#[br]
      Only if these conditions are fulfilled, the height provided through this option will be
      used. If none is provided the default height will be used.#[br]
      The height can be any valid CSS height (as a string) or an integer for an amount of pixels.

  li
    code.mr2 timeCellHeight
    p.
      If #[span.code time] is enabled, set the time cell height in pixels.#[br]
      this is very important as it is used to calculate the events position in the day.

title-link.mt12(h3 anchor="responsiveness-media-queries") Responsiveness &amp; Media Queries
p.
  This calendar is fully responsive.#[br]
  To help you in making the calendar always look perfect,
  2 media queries (to keep it simple) are in place for small screens.#[br]
  The media queries operate downwards from 550px &amp; 450px, to truncate the text
  of the days of the week from full day name to 3 letters and to 1 letter according to the available space.#[br]#[br]

  If this is not enough for your particular use, you can add your own in your CSS.#[br]
  Additionally, you can use the options #[span.code sm] &amp; #[span.code xs]
  to truncate week days at any size.

h3.mt12 # Disabled text selection
p.
  By default the selection is disabled in the whole calendar except in the events.
  you can override this by CSS.
</template>

<script setup>
import { useAppStore } from '@/store'
import { VueCal } from '@/vue-cal'

const store = useAppStore()
</script>

<style lang="scss">
.main--getting-started {
  .w-tabs__content-wrap {flex-grow: 1;}
}
</style>
