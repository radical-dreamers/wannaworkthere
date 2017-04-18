<template lang="html">

  <column-list :title="$t('contacts.common.contacts')">
    <div slot="filters">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" v-bind:placeholder="$t('contacts.list.searchEmail')" v-model="filters.email">
              </p>
              <p class="control">
                <a class="button is-info" @click="search">
                  {{ $t('common.search') }}
                </a>
              </p>
            </div>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" v-bind:placeholder="$t('contacts.list.searchCity')" v-model="filters.city">
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
            <router-link :to="{name: 'admin.contacts.new'}" class="button is-success" :title="$t('contacts.common.new')">
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

    <div slot="items" class="column is-4" v-for="item in items">
        <contact-list-item :item="item"></contact-list-item>
    </div>

  </column-list>


</template>

<script>
import api from '../../api'
import ColumnList from '../common/lists/column-list.vue'
import ListPaginator from '../common/lists/list-paginator.vue'
import DataListMixin from '../common/mixins/data-list-mixin'
import ContactListItem from './contact-list-item.vue'

export default {
  name: 'contactList',
  mixins: [DataListMixin],
  data () {
    return {
      items: [],
      skip: 0,
      total: 0,
      limit: 15,
      filters: {
        englishLevel: '',
        email: '',
        city: ''
      },
      dataSource: api.contacts
    }
  },
  components: {
    'column-list': ColumnList,
    'list-paginator': ListPaginator,
    'contact-list-item': ContactListItem
  },
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
      if (this.filters.email != '') {
        f.email = {
          $search: this.filters.email
        }
      }
      if (this.filters.city != '') {
        f.city = {
          $search: this.filters.city
        }
      }
      return f
    }
  }
}
</script>

<style lang="css">
</style>
