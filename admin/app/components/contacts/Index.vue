<template lang="html">
  <fade-in-transition>
    <router-view></router-view>
  </fade-in-transition>
</template>

<script>
import fadeInTransition from '../common/transitions/fade-in-transition'
export default {
  name: 'contacts',
  components: {
    'fade-in-transition': fadeInTransition
  }
}
</script>

<style lang="css">
</style>
