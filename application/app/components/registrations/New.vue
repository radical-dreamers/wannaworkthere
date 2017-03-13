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
          de eventos que organizemos en tu ciudad
        </div>
        <form class="" @submit.prevent.stop="register" novalidate>
          <div class="control">
            <label for="name" class="label">Nombre</label>
            <p class="control">
              <input type="text" name="name" class="input" placeholder="Nadia Silva" v-model="person.name">
            </p>
          </div>
          <div class="control">
            <label for="email" class="label">Email</label>
            <p class="control">
              <input type="text" name="email" class="input" placeholder="someone@yourmail.com" v-model="person.email">
            </p>
          </div>
          <div class="control">
            <label for="age" class="label">Edad</label>
            <p class="control">
              <input type="number" name="age" min="15" class="input" placeholder="19" v-model="person.age">
            </p>
          </div>
          <div class="control">
            <label for="university" class="label">Universidad / Escuela Tecnica</label>
            <p class="control">
              <input type="text" name="university" class="input" placeholder="UdelaR" v-model="person.university">
            </p>
          </div>
          <div class="control">
            <label for="coursingYear" class="label">Año/Semestre en curso</label>
            <p class="control">
              <input type="text" name="coursingYear" class="input" placeholder="Segundo ano" v-model="person.coursingYear">
            </p>
          </div>
          <div class="control">
            <label for="city" class="label">Ciudad</label>
            <p class="control">
              input type="text" name="city" class="input" placeholder="Salto" v-model="person.city"
            </p>
          </div>
          <div class="control">
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
          <div class="control">
            <label for="englishLevel" class="label">Nivel de ingles</label>
            <p class="control">
              <span class="select">
                <select v-model="person.englishLevel">
                  <option>No hablo</option>
                  <option>Basico</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                </select>
              </span>
            </p>
          </div>
          <div class="control">
            <label for="interest" class="label">Desarrollo o testing?</label>
            <p class="control">
              <span class="select">
                <select v-model="person.interest">
                  <option>Desarrollo</option>
                  <option>Testing</option>
                  <option>Ambos</option>
                </select>
              </span>
            </p>
          </div>

          <div class="control">
            <label for="languages" class="label">Que lenguaje/framework te resulta familiar?</label>
            <p class="control">
              <input type="text" name="languages" class="input" placeholder="Java, Python, Javascript" v-model="person.languages">
            </p>
          </div>
          <div class="block">
            <button type="submit" name="button" class="button is-primary is-large">Confirmar</button>
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
      Api.registrations.create(this.person).then((response) => {

        this.addMessage({
          text: '¡Gracias por registrarte!',
          type: 'success'
        })
        this.$router.push({name: 'registrationsSuccess'})
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="css">
</style>
