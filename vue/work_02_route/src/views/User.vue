
<template>
  <br><br>
  <h1>Users Id</h1>

  <div v-if="$route.params.userId">
    Aqui podras ver el detalle de un usuario

    <!-- ===== ===== con params ===== ===== -->
    User Id: {{  $route.params.userId  }}

    <br>

    <!-- ===== ===== con props ===== ===== -->
    User Id Props: {{  userId  }}
  </div>

  <div v-else>
    Aqui podra ver la lista de usuarios
  </div>
  <br>
  <div id="nav">
    <router-link :to="{ name: 'UserIndex', params: { userId: $route.params.userId } }">Index</router-link> ||
    <router-link :to="{ name: 'UserProfile', params: { userId: $route.params.userId } }">Perfil</router-link> ||
    <router-link :to="{ name: 'UserCourses', params: { userId: $route.params.userId } }">Cursos</router-link>

  </div>

  <router-view></router-view>

</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      default: 0
    }
  },
}
</script>

<style>

</style>