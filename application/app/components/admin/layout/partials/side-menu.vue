<template lang="html">
  <aside class="menu aside">
    <p></p>
    <p class="menu-label">
      Usuarios
    </p>
    <ul class="menu-list">
      <li><router-link :to="{ name: 'admin.users' }"><span class="icon"><i class="fa fa-users"></i></span>&nbsp;Usuarios</router-link></li>

    </ul>
    <p class="menu-label">Registros</p>
    <ul class="menu-list">
      <li><router-link :to="{ name: 'admin.registrations' }"><span class="icon"><i class="fa fa-id-card"></i></span>&nbsp;Registros</router-link></li>
    </ul>
    <ul>

    </ul>
  </aside>
</template>

<script>
export default {
  name: 'adminSideMenu'
}
</script>

<style lang="css">
</style>
