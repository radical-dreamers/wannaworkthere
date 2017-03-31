<template lang="html">
  <detail-object :title="item.name" subtitle="Detalles del registro">
    <div class="level-item" title="Fecha de Registro" slot="toolbar-items">
      <h2 class="subtitle is-5"><strong><i class="fa fa-calendar"></i></strong> {{ createdAt}}</h2>
    </div>
    <div class="level-item" slot="toolbar-items">
      <delete-confirm theme="is-danger" action-icon="fa-trash"
        :dialog-title="deleteDialog.title" :dialog-text="deleteDialog.text"
        :confirm-text="deleteDialog.confirmText" v-on:confirm="doDelete">
      </delete-confirm>
    </div>
    <content-section title="Datos personales" slot="content-sections">
      <div class="column is-4" slot="fields">
        <text-field label="Nombre" :text="item.name"></text-field>
      </div>
      <div class="column is-4" slot="fields">
        <text-field label="Email" :text="item.email"></text-field>
      </div>
      <div class="column is-4" slot="fields">
        <text-field label="Edad" :text="item.age"></text-field>
      </div>
      <div class="column is-4" slot="fields">
        <text-field label="Ciudad" :text="item.city"></text-field>
      </div>
      <div class="column is-4" slot="fields">
        <checkbox-field label="Desde su ciudad?" :value="item.remote == 'Si'" :legend="item.remote"></checkbox-field>
      </div>
    </content-section>
    <content-section slot="content-sections" title="Educación">
      <div class="column is-4" slot="fields">
        <text-field label="Universidad" :text="item.university"></text-field>
      </div>
      <div class="column is-4" slot="fields">
        <text-field label="Año/Semestre" :text="item.coursingYear"></text-field>
      </div>
      <div class="column is-4" slot="fields">
        <text-field label="Inglés" :text="item.englishLevel"></text-field>
      </div>
    </content-section>
    <content-section slot="content-sections" title="Datos técnicos">
      <div class="column is-4" slot="fields">
        <text-field label="Desarrollo o Testing?" :text="item.interest"></text-field>
      </div>
      <div class="column" slot="fields">
        <tag-list label="Lenguajes" :tags="languageArray" level="is-warning"></tag-list>
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
import { mapActions } from 'vuex'
import fields from '../../common/detail/fields'
import dialogs from '../../common/dialogs'

export default {
  components: {
    'detail-object': DetailObject,
    'content-section': ContentSection,
    'text-field': fields.TextField,
    'tag-list': fields.TagList,
    'checkbox-field': fields.Checkbox,
    'delete-confirm': dialogs.Confirm
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
      item: {},
      confirmDelete: false,
      deleteDialog: {
        title: 'Confirma',
        text: '¿Realmente querés borrar este Registro? Esta acción no puede ser deshecha',
        confirmText: 'Si, Borrar'
      }
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
  },
  methods: {
    ...mapActions([
      'addMessage'
    ]),
    doDelete () {
      api.registrations.remove(this.id).then((result) => {
        this.addMessage({
          text: 'El registro ' + this.id + ' ha sido borrado exitosamente',
          type: 'success'
        })
        this.$router.push({ name: 'admin.registrations'})
      }).catch((error) => {})
    }
  }
}
</script>

<style lang="css">
</style>
