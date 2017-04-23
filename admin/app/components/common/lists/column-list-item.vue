<template lang="html">
  <div class="notification">
    <div class="columns">
      <div class="column is-2" v-if="icon">
        <span class="icon is-large"><i class="fa" :class="icon"></i></span>
      </div>
      <div class="column">
        <p class="title is-3">
          <router-link :to="{ name: detailState, params: { id: item._id }}">{{ header }}</router-link>
        </p>
        <p class="" v-for="field in shownFields">
          <strong>{{ $t('events.common.' + field)}}</strong>&nbsp;{{ item[field] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    shownFields: {
      type: Array,
      required: true
    },
    detailState: {
      type: String,
      required: true
    }
  },
  computed: {
    header () {
      return this.title || this.item._id
    }
  },
  created () {
    console.log(this.shownFields)
  }

}
</script>

<style lang="css">
</style>
