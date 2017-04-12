<template lang="html">
  <div class="field">
    <label class="label" v-if="label">{{ label }}</label>
    <div class="content">
      <span v-for="tag in tags">
        <span class="tag" v-bind:class="[level]" >{{ tag }}</span>&nbsp;
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false
    },
    tags: {
      type: Array,
      required: false,
      default: []
    },
    level: {
      type: String,
      required: false,
      default: 'is-default'
    }
  }
}
</script>

<style lang="css">
</style>
