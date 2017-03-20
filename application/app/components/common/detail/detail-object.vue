<template lang="html">
  <div class="section">
    <div class="columns">
      <div class="column">
        <div class="level">
          <div class="level-left" v-if="title">
            <div class="level-item">
              <h1 class="title is-3">{{ title }}</h1>
            </div>
          </div>
          <div class="level-right">
            <slot name="toolbar-items"></slot>
          </div>
        </div>
        <div class="level" v-if="subtitle">
          <div class="level-left">
            <div class="level-item">
              <h2 class="subtitle is-5 is-">{{ subtitle }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr/>
    <slot name="content-sections"></slot>
  </div>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="css">
</style>
