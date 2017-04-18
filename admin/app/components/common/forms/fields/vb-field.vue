<template lang="html">
  <div class="field">
    <label class="label" v-if="label">{{ label }}</label>
    <p class="control" :class="{'has-icons-left': leftIcon, 'has-icons-right': rightIcon}">
      <slot name="field"></slot>
      <span class="icon is-small is-left" v-if="leftIcon">
        <i class="fa" :class="leftIcon"></i>
      </span>
      <span class="icon is-small is-right" v-if="rightIcon">
        <i class="fa" :class="rightIcon"></i>
      </span>
    </p>
    <p v-if="help && help.show" class="help" :class="help.level">{{ help.message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    leftIcon: {
      type: String,
      required: false
    },
    rightIcon: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    help: {
      type: Object,
      required: false
    }
  }
}
</script>

<style lang="css">
</style>
