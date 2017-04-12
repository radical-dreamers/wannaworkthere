<template lang="html">
  <div class="content">
    <h1 class="title is-4" v-if="title">{{ title }}</h1>
    <div class="columns is-multiline">
      <slot name="fields"></slot>
    </div>
    <hr/>
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
