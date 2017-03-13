<template lang="html">
  <div class="">
    <home-hero></home-hero>
    <slot name="content"></slot>
    <app-footer></app-footer>
  </div>
</template>

<script>
import HomeHero from './HomeHero.vue'
import AppFooter from './AppFooter.vue'
export default {
  components: {
    'home-hero': HomeHero,
    'app-footer': AppFooter
  }
}
</script>

<style lang="css">
</style>
