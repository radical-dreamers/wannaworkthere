<template lang="html">
  <default-layout>
    <section slot="content" class="section">
      <div class="container">

        <h1 class="title is-2">Más acerca de Altimetrik</h1>
        <h2 class="subtitle is-3">¿Quiénes somos? ¿Qué hacemos? ¿Dónde estamos?</h2>
        <hr />
        <div class="container">
          <p>
            Altimetrik es una empresa de desarrollo de software que promueve la adopción
            de tecnologías de vanguardia. En Uruguay, nos especializamos en el desarrollo
            de aplicaciones en la nube para cualquier dispositivo.
            Trabajamos utilizando diferentes metodologías ágiles como Scrum y
            tecnologías ofrecidas en la modalidad de Software As a Service.
          </p>
          <br>
          <p>
            Con sede en Southfield, Michigan, contamos con mas de 1700 empleados
            distribuidos alrededor del mundo: Montevideo, San Francisco, New Jersey,
            Chennai, Bangalore, Mumbai.
          </p>

        </div>
        <hr>
        <div class="container">
          <h1 class="title is-2">Mercados</h1>
          <p>
            Estamos trabajando para muchos mercados e industrias, como la <strong>automotriz</strong>, <strong>el mercado financiero</strong>,
            <strong>la salud</strong> y <strong>SaaS/PaaS</strong>
          </p>

        </div>
        <hr>
        <div class="container">
          <h1 class="title is-2">Tecnologías</h1>
          <p>
            Hacemos software para el mundo y de nivel internacional, por lo que manejamos
            un abanico de tecnologías muy diverso que incluye las últimas tendencias del mercado de software
          </p>
          <br><br>
          <div class="columns">
            <div class="column is-4">

              <img src="/img/logos/salesforce-logo.png" alt="Salesforce" class="image" />
            </div>
            <div class="column is-2" >
              <img src="/img/logos/node-logo.svg" alt="NodeJs" class="image"/>
              <img src="/img/logos/java-logo.png" alt="Java" class="image" />
            </div>
            <div class="column is-2">
              <img src="/img/logos/angular-logo.png" alt="Angular" class="image"/>
              <img src="/img/logos/react-logo.png" alt="ReactJS" class="image">
            </div>
            <div class="column is-2">
              <img src="/img/logos/lightning-logo.png" alt="Lightning" class="image">

            </div>
            <div class="column is-2">
              <img src="/img/logos/js-logo.png" alt="Javascript" class="image">
            </div>
          </div>
        </div>


      </div>
    </section>
  </default-layout>


</template>

<script>
import DefaultLayout from '../layout/DefaultLayout.vue'

export default {
  components: {
    'default-layout': DefaultLayout
  }
}
</script>

<style lang="css">
</style>
