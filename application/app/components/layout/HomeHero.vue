<template lang="html">
  <section class="hero header-image is-large is-fullheight is-primary">
    <div class="hero-head">
      <app-header></app-header>
    </div>
    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          Queres trabajar con nosotros?
        </h1>
        <h2 class="subtitle">
          En Altimetrik necesitamos gente como vos y queremos ponernos en contacto!
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import AppHeader from './AppHeader.vue'

export default {
  components: {
    'app-header': AppHeader
  }
}
</script>

<style lang="css" scoped>
.header-image {
    background-image: linear-gradient(rgba(0, 0, 0, 0.49),rgba(0, 0, 0, 0.89)),url(/img/hand-on-tablet.jpg);
    background-size: 100% auto;
};
</style>
