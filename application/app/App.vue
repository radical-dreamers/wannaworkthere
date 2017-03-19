<template>
  <animated-fade-in>
    <router-view></router-view>
  </animated-fade-in>
</template>

<script>
import fadeInTransition from './components/admin/common/transitions/fade-in-transition'
export default {
  components: {
    'fade-in-transition': fadeInTransition
  }
}
</script>

<style>
</style>
