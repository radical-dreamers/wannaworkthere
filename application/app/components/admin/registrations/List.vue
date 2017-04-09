<template lang="html">

  <column-list title="Registros">
    <div slot="filters" class="container">
      <div class="level">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Buscar por email" v-model="filters.email">
            </p>
            <p class="control">
              <a class="button is-info" @click="search">
                Buscar
              </a>
            </p>
          </div>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Buscar por ciudad" v-model="filters.city">
            </p>
            <p class="control">
              <a class="button is-info" @click="search">
                Buscar
              </a>
            </p>
          </div>
        </div>
        <div class="level-item">
          <div class="field">
            <label for="englishLevel" class="label">Nivel de ingles</label>
            <p class="control">
              <span class="select">
                <select v-model="filters.englishLevel" name="englishLevel" v-on:change="search">
                  <option disabled value="">
                    -- Cualquiera --
                  </option>
                  <option>No hablo</option>
                  <option>Basico</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                </select>
              </span>
            </p>
          </div>
        </div>

      </div>
      <list-paginator :max-record="maxRecord" :total="total" :min-record="minRecord" :has-next="hasNext" :has-previous="hasPrevious" v-on:next="next" v-on:previous="previous"></list-paginator>
      <br/>
    </div>

    <div slot="items" class="column is-4" v-for="item in items">
        <registration-list-item :item="item"></registration-list-item>
    </div>

  </column-list>


</template>

<script>
import api from '../../../api'
import ColumnList from '../../common/lists/column-list.vue'
import ListPaginator from '../../common/lists/list-paginator.vue'
import DataListMixin from '../../common/mixins/data-list-mixin'
import RegistrationListItem from './registration-list-item.vue'

export default {
  name: 'registrationsList',
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
      dataSource: api.registrations
    }
  },
  components: {
    'column-list': ColumnList,
    'list-paginator': ListPaginator,
    'registration-list-item': RegistrationListItem
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
      if (this.filters.englishLevel != '') {
        f.englishLevel = this.filters.englishLevel
      }
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
