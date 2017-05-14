<template lang="html">
  <div class="">
    <vb-field :label="label" :help="help">
      <input slot="field" class="input" ref="input" type="text" placeholder="" v-on:input="handleInput($event.target.value)"/>
    </vb-field>
    <div v-for="(tag, index) in tagList" class="tag is-success">
      {{ tag }}
      <button class="delete" @click.prevent.stop="deleteTag(index)"></button>
    </div>
  </div>

</template>

<script>
import vbField from './vb-field.vue'

export default {
  data () {
    return {
      tagText: ''
    }
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: 'Tags'
    },
    separator: {
      type: String,
      required: false,
      default: ','
    },
    help: {
      type: Object,
      required: false
    }
  },
  methods: {
    handleInput(value) {
      if (value.indexOf(this.separator) >= 0) {
        this.value.push(value.split(this.separator)[0].trim())
        this.$refs.input.value = ''
        this.emitInput(this.tagList)
      }
    },
    emitInput: function(value) {
      this.$emit('input', value)
    },
    deleteTag: function(index) {
      if (index >= 0) {
        this.value.splice(index, 1)
        this.emitInput(this.tagList)
      }

    }
  },
  computed: {
    tagList () {
      return this.value
    }
  },
  components: {
    'vb-field': vbField
  }
}
</script>

<style lang="css">
</style>
