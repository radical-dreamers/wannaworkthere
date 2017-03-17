<template lang="html">
  
  <column-list title="Registros">
    <div slot="items" class="column is-4" v-for="item in items">
      <registration-list-item :item="item"></registration-list-item>
    </div>
  </column-list>


</template>

<script>
import api from '../../../api'
import ColumnList from '../common/lists/column-list.vue'
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
    'column-list': ColumnList,
    'registration-list-item': RegistrationListItem
  }
}
</script>

<style lang="css">
</style>
