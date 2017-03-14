<template>

    <home-layout>
      <div slot="content" class="container">
        <!-- Main intent -->
        <div class="columns">
          <div class="column">
            <img src="/img/bg5.jpg" alt="" class="image">
          </div>
          <div class="column">
            <div class="hero ">
              <div class="hero-body">
                <div class="container">
                  <h1 class="title">Trabajá desde tu ciudad</h1>
                  <p class="is-3">Estamos buscando estudiantes y egresados de
                    <strong>Carreras de Software</strong>
                    para trabajar desde <strong>distintos puntos del país</strong>.
                  </p>
                  <p class="is-3">Altimetrik te ofrece una oportunidad única para hacer
                   lo que te gusta para clientes de porte internacional. </p>
                   <br>
                   <router-link :to="{ name: 'registrationsNew' }" class="button is-warning is-large">Trabajá con nosotros</router-link>
                </div>
              </div>
            </div>

          </div>
        </div>
        <!-- End main intent-->
        <!-- SCRUM section -->
        <div class="hero">

            <div class="columns">
              <div class="column">
                <div class="hero is-medium">
                  <div class="hero-body">
                    <div class="container">
                      <h1 class="title">Somos ágiles</h1>
                      En <strong>Atlimetrik</strong> creemos en que la agilidad es
                      fundamental para que los equipos y clientes disfruten del proceso
                      de desarrollo.
                    </div>
                  </div>


                </div>

              </div>
              <div class="column">
                <img src="/img/agile-team.jpg" alt="Agile Team" class="image">
              </div>
            </div>

        </div>
        <!-- End SCRUM Section -->
        <!-- Workshops and Education Section -->
        <div class="columns">
          <div class="column">
            <img src="/img/workshop.jpg" alt="" class="image">
          </div>
          <div class="column">

                <div class="container">
                  <h1 class="title">Workshops y capacitación</h1>
                  <p class="is-3">En <strong>Altimetrik</strong> nos importa
                    tu crecimiento profesional, por eso ofrecemos:
                  </p>
                  <br>
                  <div class="block">
                    <span class="icon ">
                      <i class="fa fa-check is-success"></i>
                    </span>
                    <span>Workshops</span>
                  </div>
                  <div class="block">
                    <span class="icon is-success">
                      <i class="fa fa-check"></i>
                    </span>
                    <span>Capacitación in-house</span>
                  </div>
                  <div class="block">
                    <span class="icon is-success">
                      <i class="fa fa-check"></i>
                    </span>
                    <span>Cursos online</span>
                  </div>
                  <hr>
                  <p>Próximamente vamos a estar haciendo workshops en Salto,
                    Paysandú y Montevideo. ¡Tenemos cupos limitados así que
                    aprovechá para anotarte ya!</p>
                  <br>
                  <div class="level">
                    <router-link :to="{ name: 'registrationsNew' }" class="button is-primary is-medium">
                      Quiero participar
                    </router-link>
                  </div>
                </div>


          </div>
        </div>
      </div>

    </home-layout>

</template>

<script>
import HomeLayout from './layout/HomeLayout.vue'

export default {
  name: 'hello',
  components: {
    'home-layout': HomeLayout
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
