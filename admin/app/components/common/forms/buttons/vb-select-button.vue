<template lang="html">
  <div>
    <div class="field has-addons">
      <p class="control">
        <a class="button" @click.stop.prevent="emitClick">
          <span >{{ selected.label }}</span>
        </a>
      </p>
      <p class="control">
        <a class="button">
          <span class="icon" @click="toggleOptions">
            <i class="fa " :class="{'fa-angle-down': !open, 'fa-angle-up': open}"></i>
          </span>  
        </a>
      </p>
    </div>
    <div class="" style="position: relative;">
        <div class="menu" v-show="open">
          <ul class="menu-list">
            <li v-for="(option, index) in options" ><a class="panel-block is-solid" @click.stop.prevent="selectOption(option)" :class="{'is-active': option.value === selected.value }">
            {{ option.label }}
          </a></li>
          </ul>
          
        </div>
      </div>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      //selected: null,
      open: false
    }
  },
  props: {
    // v-model attribute
    value: {
      required: false
    },
    // options for our button. each option can have a value, label and selected attribute.
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleOptions: function() {
      this.open = !this.open
    },
    selectOption: function(option) {
      // TODO: see why the v-model is not being set.
      // de-select the currently selected option
      let oldSelected = this.selected
      // Execute changes if the currently selected option is different from the previous one
      if (oldSelected !== option) {
        oldSelected.selected = false
        // select the new option
        option.selected = true
        // emit input event for v-model implementation
        this.$emit('input', option.value)
        // emit a change event so we can execute any code required.
        this.$emit('change', { old: oldSelected.value, new: option.value })
        this.selected = option
      }
      // close the menu if required
      if (this.open) {
        this.toggleOptions()
      }
    },
    emitClick: function(...args) {
      this.$emit('click', this)
    }
  },
  computed: {
    selected () {
      let vm = this
      return this.options.find(x => x.value === vm.value) || this.options.find( x => x.selected )
    }
  }
}
</script>

<style lang="css">
</style>
