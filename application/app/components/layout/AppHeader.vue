<template lang="html">
  <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link class="nav-item title is-3" :to="{ name: 'home' }">
            {{ appTitle }}
          </router-link>
        </div>
        <span class="nav-toggle"  @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu" v-bind:class="{ 'is-active': isOpen }" @click="toggleMenu">
          <router-link class="nav-item is-tab" :to="{ name: 'home' }">
            Home
          </router-link>
          <router-link class="nav-item is-tab" :to="{name: 'registrationsNew'}">
            Events
          </router-link>
          <router-link class="nav-item is-tab" :to="{name: 'about'}">
            About
          </router-link>
        </div>
      </div>
    </nav>
</template>

<script>
import config from '../../config'

export default {
  data () {
    return {
      appTitle: config.appTitle,
      isOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="css">
</style>
