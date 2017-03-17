<template lang="html">
  <div class="section">
    <h1 class="title is-3">{{ item.name }}</h1>
    <h2 class="subtitle is-5 is-">Detalles del registro</h2>
    <hr/>
    <div class="content">
      <h1 class="title is-4">Datos personales</h1>
      <div class="columns">
        <div class="column is-4">
          <div class="field">
            <label class="label">Nombre</label>
            <div class="is-medium">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field ">
            <label class="label">Email</label>
            <div class="is-medium">
              {{ item.email }}
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label class="label">Edad</label>
            <div class="is-medium">
              {{ item.age }}
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-4">
          <div class="field">
            <label class="label">Ciudad</label>
            <p class="is-medium">
              {{ item.city }}
            </p>
          </div>
        </div>
        <div class="column is-4">
          <div class="field column is-4">
            <label class="label">Desde su ciudad?</label>
            <div class="is-medium has-text-centered">
              <span class="tag" v-bind:class="{'is-success': item.remote == 'Si', 'is-danger': item.remote == 'No'}">{{ item.remote }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr/>
    <div class="content">
      <h1 class="title is-4">Educacion</h1>
      <div class="columns">
        <div class="column is-4">
          <div class="field">
            <label class="label">Universidad</label>
            <p class="is-medium">
              {{ item.university }}
            </p>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label class="label">Año/Semestre</label>
            <p class="is-medium">
              {{ item.coursingYear }}
            </p>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label class="label">Inglés</label>
            <p class="is-medium">
              {{ item.englishLevel }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr/>
    <div class="content">
      <h1 class="title is-4">Datos técnicos</h1>
      <div class="columns">
        <div class="column is-4">
          <div class="field">

            <p class="is-medium">
              <span class="label ">Desarrollo o testing?</span>
              <span class="tag is-medium is-info">{{ item.interest }}</span>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Lenguajes</label>
            <div class="content">
              <span v-for="language in languageArray">
                  <span class="tag is-warning">{{ language }}</span>&nbsp;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationInstanceMixin from './registration-instance-mixin'
import api from '../../../api'

export default {
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
  }
}
</script>

<style lang="css">
</style>
