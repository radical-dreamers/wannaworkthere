<template lang="html">
  <div class="">
    <h1 class="title is-2" v-if="title">{{ title }}</h1>

    <div class="tile is-parent is-multiline">
      <slot name="items"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="css">
</style>
