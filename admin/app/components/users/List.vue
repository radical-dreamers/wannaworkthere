<template lang="html">
  <column-list title="Usuarios">
    <div slot="filters" class="container">
      <list-paginator :max-record="maxRecord" :total="total" :min-record="minRecord" :has-next="hasNext" :has-previous="hasPrevious" v-on:next="next" v-on:previous="previous"></list-paginator>
      <br/>
    </div>
    <div slot="items" class="column is-6" v-for="item in items">
      <user-list-item :item="item"></user-list-item>
    </div>
  </column-list>
</template>

<script>
import api from '../../api'
import UserListItem from './user-list-item.vue'
import ColumnList from '../common/lists/column-list.vue'
import ListPaginator from '../common/lists/list-paginator.vue'
import DataListMixin from '../common/mixins/data-list-mixin'

export default {
  name: 'usersList',
  components: {
    'column-list': ColumnList,
    'list-paginator': ListPaginator,
    'user-list-item': UserListItem
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
