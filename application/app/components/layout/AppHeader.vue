<template lang="html">
  <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link class="nav-item title is-3" :to="{ name: 'hello' }">
            ALTIMETRIK
          </router-link>
        </div>
        <span class="nav-toggle"  @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu" v-bind:class="{ 'is-active': isOpen }" @click="toggleMenu">
          <router-link class="nav-item is-tab" :to="{ name: 'hello' }">
            Home
          </router-link>
          <router-link class="nav-item is-tab" :to="{name: 'registrationsNew'}">
            Quiero Trabajar
          </router-link>
          <router-link class="nav-item is-tab" :to="{name: 'about'}">
            Altimetrik
          </router-link>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  data () {
    return {
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
