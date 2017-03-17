<template lang="html">
  <default-layout>
    <section slot="content" class="section" >
      <div class="container">
        <h1 class="title">Buscamos gente como vos!</h1>
        <h2 class="subtitle">Si te interesa el desarrollo y testing de software,
          y querés tener la oportunidad de trabajar con
          nosotros, llená el formulario a continuación</h2>
        <br>
        <div class="notification is-info">
          Además de contactarte por oportunidades laborales, vamos a estar informándote
          de eventos que organicemos en tu ciudad
        </div>
        <form class="" @submit.prevent.stop="register" novalidate>
          <div class="field">
            <label for="name" class="label">Nombre</label>
            <p class="control has-icon has-icon-right">
              <input class="input is-required" name="name" v-validate:name.initial="'required'"
                type="text" placeholder="Nadia Silva" v-model="person.name"
                :class="{'is-danger': errors.has('name')}">
              <span class="icon is-small" v-show="errors.has('name')">
                <i class="fa fa-warning is-danger"></i>
              </span>
            </p>
            <p class="help is-danger" v-show="errors.has('name')">Este campo es requerido.</p>
          </div>
          <div class="field">
            <label for="email" class="label">Email</label>
            <p class="control has-icon has-icon-right">
              <input class="input" name="email" v-validate:email.initial="'required|email'"
                type="text" placeholder="someone@altimetrik.com" v-model="person.email"
                :class="{'is-danger': errors.has('email')}">
              <span class="icon is-small" v-show="errors.has('email')">
                <i class="fa fa-warning is-danger"></i>
              </span>
            </p>
            <p class="help is-danger" v-show="errors.has('email')">No es un email valido.</p>
          </div>
          <div class="field">
            <label for="age" class="label">Edad</label>
            <p class="control">
              <input type="number" name="age" min="15" class="input" placeholder="19" v-model="person.age">
            </p>
          </div>
          <div class="field">
            <label for="university" class="label">Universidad / Escuela Tecnica</label>
            <p class="control">
              <input type="text" name="university" class="input" placeholder="UdelaR" v-model="person.university">
            </p>
          </div>
          <div class="field">
            <label for="coursingYear" class="label">Año/Semestre en curso</label>
            <p class="control">
              <input type="text" name="coursingYear" class="input" placeholder="Segundo año" v-model="person.coursingYear">
            </p>
          </div>
          <div class="field">
            <label for="city" class="label">Ciudad</label>
            <p class="control has-icon has-icon-right">
              <input class="input" name="city" v-validate:city.initial="'required'"
                type="text" placeholder="Salto" v-model="person.city"
                :class="{'is-danger': errors.has('city')}">
              <span class="icon is-small" v-show="errors.has('city')">
                <i class="fa fa-warning is-danger"></i>
              </span>
            </p>
            <p class="help is-danger" v-show="errors.has('city')">Este campo es requerido.</p>
          </div>
          <div class="field">
            <label for="remote" class="label">Queres trabajar desde tu ciudad?</label>
            <p class="control">
              <label class="radio">
                <input type="radio" name="remote" value="Si" v-model="person.remote">
                Si
              </label>
              <label class="radio">
                <input type="radio" name="remote" value="No" v-model="person.remote">
                No
              </label>
            </p>
          </div>
          <div class="field">
            <label for="englishLevel" class="label">Nivel de ingles</label>
            <p class="control">
              <span class="select">
                <select v-model="person.englishLevel" name="englishLevel" v-validate:englishLevel.initial="'required'">
                  <option>No hablo</option>
                  <option>Basico</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                </select>
              </span>
            </p>
            <p class="help is-danger" v-show="errors.has('englishLevel')">Este campo es requerido.</p>
          </div>
          <div class="field">
            <label for="interest" class="label">Desarrollo o testing?</label>
            <p class="control">
              <span class="select">
                <select v-model="person.interest" v-validate:interest.initial="'required'" name="interest">
                  <option>Desarrollo</option>
                  <option>Testing</option>
                  <option>Ambos</option>
                </select>
              </span>
            </p>
            <p class="help is-danger" v-show="errors.has('interest')">Este campo es requerido.</p>
          </div>

          <div class="field">
            <label for="languages" class="label">Que lenguaje/framework te resulta familiar?</label>
            <p class="control has-icon has-icon-right">
              <input type="text" name="languages" class="input"
                placeholder="Java, Python, Javascript, Angular, Spring, Force.com"
                v-model="person.languages" v-validate:languages.initial="'required'"
                :class="{'is-danger': errors.has('languages')}" >
                <span class="icon is-small" v-show="errors.has('languages')">
                  <i class="fa fa-warning is-danger"></i>
                </span>
            </p>
            <p class="help is-danger" v-show="errors.has('languages')">Este campo es requerido.</p>
          </div>
          <div class="block is-clearfix">
            <button type="submit" name="button" class="is-pulled-right button is-primary is-large" :disabled="!fields.passed()">Confirmar</button>
          </div>
        </form>
      </div>
    </section>
  </default-layout>


</template>

<script>
import DefaultLayout from '../layout/DefaultLayout.vue'

import Api from '../../api'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'default-layout': DefaultLayout
  },
  data () {
    return {
      person: {
        name: '',
        email: '',
        age: null,
        university: '',
        coursingYear: null,
        englishLevel: '',
        interest: '',
        remote: 'Si',
        city: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'addMessage'
    ]),
    register () {

      this.$validator.validateAll().then( (success) => {
        Api.registrations.create(this.person).then((response) => {

          this.addMessage({
            text: '¡Gracias por registrarte!',
            type: 'success'
          })
          this.$router.push({name: 'registrationsSuccess'})
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
        alert('Por favor, corregi los errores en el formulario')
      })

    }
  }
}
</script>

<style lang="css">
</style>
