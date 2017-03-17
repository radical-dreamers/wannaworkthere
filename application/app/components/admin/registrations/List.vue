<template lang="html">
  <tiled-list title="Registros">
    <div slot="items" class="tile is-parent is-child is-4" v-for="item in items">
      <registration-list-item :item="item"></registration-list-item>
    </div>
  </tiled-list>
</template>

<script>
import api from '../../../api'
import TiledList from '../common/lists/tiled-list.vue'
import DataListMixin from '../common/mixins/data-list-mixin'
import RegistrationListItem from './registration-list-item.vue'

export default {
  name: 'registrationsList',
  mixins: [DataListMixin],
  data () {
    return {
      items: [],
      skip: 0,
      total: 0,
      limit: 20,
      dataSource: api.registrations
    }
  },
  components: {
    'tiled-list': TiledList,
    'registration-list-item': RegistrationListItem
  }
}
</script>

<style lang="css">
</style>
