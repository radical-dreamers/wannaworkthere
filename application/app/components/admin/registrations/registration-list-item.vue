<template lang="html">
  <div class="card">
    <div class="card-content">
      <div class="content">
        <p class="title is-4">
          <router-link :to="{ name: 'admin.registrations.detail', params: { id: item._id}}">
            {{ item.name }}
          </router-link>
        </p>
        <p class="subtitle is-6">{{ item.email }}</p>
      </div>
      <div class="content">
        <span v-for="language in shownLanguageArray">
            <span class="tag is-warning">{{ language }}</span>&nbsp;
        </span>
        <span class="content is-primary" v-show="maxLanguages < languageArray.length">...</span>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationInstanceMixin from './registration-instance-mixin'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      maxLanguages: 3,

    }
  },
  mixins: [RegistrationInstanceMixin]

}
</script>

<style lang="css">
</style>
