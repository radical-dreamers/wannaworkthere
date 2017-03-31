<template lang="html">
  <div class="field">

    <p class="is-medium">
      <span class="label" v-if="label">{{ label }}</span>
      <p class="is-medium">
        {{ text }}
      </p>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="css">
</style>
