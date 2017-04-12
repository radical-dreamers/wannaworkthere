<template lang="html">
  <div class="field">
    <label class="label" v-if="label">{{ label }}</label>
    <div class="has-text-centered">
      <span class="tag is-medium" v-bind:class="{'is-success': value, 'is-danger': !value}">{{ legend }}</span>
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
    value: {
      type: Boolean,
      required: false,
      default: false
    },
    legend: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="css">
</style>
