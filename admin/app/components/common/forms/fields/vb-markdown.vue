<template lang="html">
  <div class="columns">
    <div class="column">
      <vb-field :label="label" :help="help">
        <textarea slot="field" class="textarea" type="text" :value="value"
          name="description" v-on:keyup="handleInput($event.target.value)"/>
      </vb-field>
    </div>
    <div class="column" >
      <div class="card" >
        <div class="card-content content" v-html="mdText">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import vbField from './vb-field.vue'
export default {

  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    help: {
      type: Object,
      required: false
    }
  },
  computed: {
    mdText: function() {
      return this.buildMarkdown(this.value)

    }
  },
  methods: {
    handleInput: function(value) {
      this.mdText = this.buildMarkdown(value)
      this.emitInput(value)
    },
    /**
     * emits an 'input' event
     * @param  {String} value the value we want to send out as input
     */
    emitInput: function(value) {
      this.$emit('input', value)
    },
    buildMarkdown: function(value) {
      return marked(value)
    }
  },
  components: {
    'vb-field': vbField
  },
  created () {

  }
}
</script>

<style lang="css">
</style>
