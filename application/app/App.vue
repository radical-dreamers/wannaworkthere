<template>
  <fade-in-transition>
    <router-view></router-view>
  </fade-in-transition>
</template>

<script>
import fadeInTransition from './components/common/transitions/fade-in-transition'
export default {
  components: {
    'fade-in-transition': fadeInTransition
  }
}
</script>

<style>
</style>
