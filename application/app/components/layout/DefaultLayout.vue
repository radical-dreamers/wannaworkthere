<template lang="html">
  <div class="">
    <app-header></app-header>
    <slot name="content"></slot>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

export default {
  components: {
    'app-footer': AppFooter,
    'app-header': AppHeader
  }
}
</script>

<style lang="css">
</style>
