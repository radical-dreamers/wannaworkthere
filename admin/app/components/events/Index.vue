<template lang="html">
  <fade-in-transition>
    <router-view></router-view>
  </fade-in-transition>
</template>

<script>
import FadeIn from '../common/transitions/fade-in-transition'

export default {
  components: {
    'fade-in-transition': FadeIn
  }
}
</script>

<style lang="css">
</style>
