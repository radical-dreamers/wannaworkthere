<template lang="html">
  <vb-field :label="label" :rightIcon="rightIcon" :leftIcon="leftIcon" :help="{show: errors.has(name), message: $t('fields.requiredMessage'), level: 'is-danger'}">
    <input slot="field" :value="value" @input="emitInput($event.target.value)"
      class="input" :type="type" :placeholder="placeholder" :name="name" v-validate:bind="validation" :data-vv-name="name"
      :class="{'is-danger': name && errors.has(name)}"/>
  </vb-field>
</template>

<script>
import vbField from './vb-field.vue'

export default {
  components: {
    'vb-field': vbField
  },
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
    value: {
      required: true
    },
    type: {
      required: true,
      type: String
    },
    placeholder: {
      required: false,
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: false
    },
    validation: {
      type: String,
      required: false
    }
  },
  methods: {
    emitInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="css">
</style>
