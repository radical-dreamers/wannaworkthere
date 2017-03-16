<template lang="html">
  <div class="notification">
    <div class="columns">
      <div class="column is-2">
        <span class="icon is-large"><i class="fa fa-user-circle"></i></span>
      </div>
      <div class="column">
        <p class="title is-3">
          <router-link :to="{ name: 'admin.users.detail', params: { id: item._id }}">{{ item.firstName }} {{ item.lastName}}</router-link>
        </p>
        <p class="subtitle">{{ item.email }}</p>
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
    }
  }
}
</script>

<style lang="css">
</style>
