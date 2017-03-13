<template>
  
    <home-layout>
      <section slot="content" class="section">
        <div class="container">
          <h3>contentn</h3>
        </div>
      </section>
    </home-layout>

</template>

<script>
import HomeLayout from './layout/HomeLayout.vue'

export default {
  name: 'hello',
  components: {
    'home-layout': HomeLayout
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
