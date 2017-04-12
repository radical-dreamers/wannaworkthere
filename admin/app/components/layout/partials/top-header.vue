<template lang="html">
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <router-link class="nav-item title is-3" :to="{ name: 'admin.home' }">
          ALTIMETRIK - Admin Panel
        </router-link>
      </div>
      <span class="nav-toggle"  @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu" v-bind:class="{ 'is-active': isOpen }" @click="toggleMenu">
        <router-link class="nav-item is-tab" :to="{ name: 'admin.users.detail', params: { id: '231'} }">
          Profile
        </router-link>
        <router-link class="nav-item is-tab" :to="{ name: 'admin.users.detail', params: {id: '131'} }">
          Go to Site
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
