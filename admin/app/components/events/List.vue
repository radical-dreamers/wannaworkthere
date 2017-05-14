<template lang="html">
  <column-list title="Events">
    <div slot="filters">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" v-bind:placeholder="$t('events.list.searchTitle')" v-model="filters.title">
              </p>
              <p class="control">
                <a class="button is-info" @click="search">
                  {{ $t('common.search') }}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <router-link :to="{name: 'admin.events.create'}" class="button is-success" :title="$t('events.common.new')">
              <span class="icon">
                <i class="fa fa-plus"></i>
              </span>
            </router-link>
          </div>
        </div>

      </div>
      <list-paginator :max-record="maxRecord" :total="total" :min-record="minRecord" :has-next="hasNext" :has-previous="hasPrevious" v-on:next="next" v-on:previous="previous"></list-paginator>
      <br/>
    </div>
    <div slot="items" class="column is-6" v-for="item in items">
      <column-list-item :item="item" :title="item.title" icon="fa-calendar" :shown-fields="['startDate','endDate']" detail-state="admin.events.detail"></column-list-item>
    </div>
  </column-list>
</template>

<script>
import api from '../../api'
import ColumnList from '../common/lists/column-list.vue'
import ColumnListItem from '../common/lists/column-list-item.vue'
import ListPaginator from '../common/lists/list-paginator.vue'
import DataListMixin from '../common/mixins/data-list-mixin'

export default {
  name: 'usersList',
  components: {
    'column-list': ColumnList,
    'list-paginator': ListPaginator,
    'column-list-item': ColumnListItem,

  },
  data () {
    return {
      items: [],
      skip: 0,
      total: 0,
      limit: 20,
      filters: {
        title: ''
      },
      dataSource: api.events
    }
  },
  mixins: [DataListMixin],
  methods: {
    search() {
      this.loadItems(this.cleanFilters)
    }
  },
  computed: {
    /**
     * this property takes the filters in our page and adapts them to the actual filters needed for querying
     * @return {Object} the filters, properly formatted.
     */
    cleanFilters () {
      let f = {}
      if (this.filters.title != '') {
        f.title = {
          $search: this.filters.title
        }
      }
      return f
    }
  },
  created () {

  }
}
</script>

<style lang="css">
</style>
