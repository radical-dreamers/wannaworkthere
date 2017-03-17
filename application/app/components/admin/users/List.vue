<template lang="html">
  <tiled-list title="Usuarios">
    <div slot="items" class="tile is-parent is-child is-6" v-for="item in items">
      <user-list-item :item="item"></user-list-item>
    </div>
  </tiled-list>
</template>

<script>
import api from '../../../api'
import UserListItem from './user-list-item.vue'
import TiledList from '../common/lists/tiled-list.vue'
import DataListMixin from '../common/mixins/data-list-mixin'

export default {
  name: 'usersList',
  components: {
    'user-list-item': UserListItem,
    'tiled-list': TiledList
  },
  data () {
    return {
      items: [],
      skip: 0,
      total: 0,
      limit: 20,
      dataSource: api.users
    }
  },
  mixins: [DataListMixin]
}
</script>

<style lang="css">
</style>
