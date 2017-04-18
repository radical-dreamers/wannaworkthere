<template lang="html">
  <div class="card">
    <div class="card-content">
      <div class="content">
        <p class="title is-4">
          <router-link :to="{ name: 'admin.contacts.detail', params: { id: item._id}}">
            {{ item.firstName }} {{ item.lastName}}
          </router-link>
        </p>
        <p class="subtitle is-6">{{ item.email }}</p>
      </div>
      <div class="content">

        <span class="tag is-warning">{{ item.phone }}</span>
        <span class="tag is-primary">{{ item.age }}</span>
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
