<template lang="html">
  <div class="hero is-small is-light">
    <div class="hero-body">
      <div class="container is-fluid">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">Mostrando del <strong>{{ minRecord }}</strong> al <strong>{{ maxRecord }}</strong> de <strong>{{ total }}</strong></p>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <button type="button" name="previous" class="button is-info" :disabled="!hasPrevious" @click="previous">Anterior</button>
            </div>
            <div class="level-item">
              <button type="button" name="next" class="button is-info" :disabled="!hasNext" @click="next">Siguiente</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    minRecord: {
      type: Number,
      required: false,
      default: 0
    },
    maxRecord: {
      type: Number,
      required: false,
      default: 0
    },
    hasPrevious: {
      type: Boolean,
      required: false,
      default: false
    },
    hasNext: {
      type: Boolean,
      required: false,
      default: false
    },
    total: {
      type: Number,
      required: false,
      default: 0
    }

  },
  methods: {
    next () {
      this.$emit('next')
    },
    previous () {
      this.$emit('previous')
    }
  }
}
</script>

<style lang="css">
</style>
