<template lang="html">
  <detail-object :title="item.name" subtitle="Detalles del registro">
    <div class="level-item" title="Fecha de Registro" slot="toolbar-items">
      <h2 class="subtitle is-5"><strong><i class="fa fa-calendar"></i></strong> {{ createdAt}}</h2>
    </div>
    <content-section title="Datos personales" slot="content-sections">
      <div class="column is-4" slot="fields">
        <div class="field">
          <label class="label">Nombre</label>
          <div class="is-medium">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="column is-4" slot="fields">
        <div class="field ">
          <label class="label">Email</label>
          <div class="is-medium">
            {{ item.email }}
          </div>
        </div>
      </div>
      <div class="column is-4" slot="fields">
        <div class="field">
          <label class="label">Edad</label>
          <div class="is-medium">
            {{ item.age }}
          </div>
        </div>
      </div>
      <div class="column is-4" slot="fields">
        <div class="field">
          <label class="label">Ciudad</label>
          <p class="is-medium">
            {{ item.city }}
          </p>
        </div>
      </div>
      <div class="column is-4" slot="fields">
        <div class="field">
          <label class="label">Desde su ciudad?</label>
          <div class="has-text-centered">
            <span class="tag is-medium" v-bind:class="{'is-success': item.remote == 'Si', 'is-danger': item.remote == 'No'}">{{ item.remote }}</span>
          </div>
        </div>
      </div>
    </content-section>
    <content-section slot="content-sections" title="Educación">
      <div class="column is-4" slot="fields">
        <div class="field">
          <label class="label">Universidad</label>
          <p class="is-medium">
            {{ item.university }}
          </p>
        </div>
      </div>
      <div class="column is-4" slot="fields">
        <div class="field">
          <label class="label">Año/Semestre</label>
          <p class="is-medium">
            {{ item.coursingYear }}
          </p>
        </div>
      </div>
      <div class="column is-4" slot="fields">
        <div class="field">
          <label class="label">Inglés</label>
          <p class="is-medium">
            {{ item.englishLevel }}
          </p>
        </div>
      </div>
    </content-section>
    <content-section slot="content-sections" title="Datos técnicos">
      <div class="column is-4" slot="fields">
        <div class="field">

          <p class="is-medium">
            <span class="label ">Desarrollo o testing?</span>
            <span class="tag is-medium is-info">{{ item.interest }}</span>
          </p>
        </div>
      </div>
      <div class="column" slot="fields">
        <div class="field">
          <label class="label">Lenguajes</label>
          <div class="content">
            <span v-for="language in languageArray">
                <span class="tag is-warning">{{ language }}</span>&nbsp;
            </span>
          </div>
        </div>
      </div>
    </content-section>
  </detail-object>

</template>

<script>
import RegistrationInstanceMixin from './registration-instance-mixin'
import DetailObject from '../../common/detail/detail-object.vue'
import ContentSection from '../../common/detail/content-section.vue'
import api from '../../../api'
import moment from 'moment'

export default {
  components: {
    'detail-object': DetailObject,
    'content-section': ContentSection
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  mixins: [
    RegistrationInstanceMixin
  ],
  data () {
    return {
      item: {}
    }
  },
  created () {
    api.registrations.get(this.id).then((result) => {
      this.item = result.data
    }).catch((error) => { /* Do nothing. errors are handled globally */})
  },
  computed: {
    createdAt () {
      return moment(this.item.createdAt).format('DD/MM/YYYY hh:mm')
    }
  }
}
</script>

<style lang="css">
</style>
