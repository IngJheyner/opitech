<template>
  <br>
  <h1>Detalle del POST {{ post.nombre }}</h1>

  <p>{{ post.contenido }}</p>

  <p>
    <b>Categoria:</b>
   {{ category.nombre }}
  </p>
  <p>
    <b>Autor:</b>
   {{ user.name }}
  </p>

  <div v-if="auth && user.id === auth.user.id">
    <router-link :to="{ name: 'edit-post', params: { id: post.id } }">
      Editar Post
    </router-link>
  </div>

</template>



<script>
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        post: {},
        category: {},
        user: {},
      };
    },
    computed: {
      ...mapState(["auth"]),
    },
    created() {
      this.getPost();
    },
    methods: {

      async getPost() {

        await this.axios.get("v1/posts/" + this.$route.params.id + "?included=category,user")
        .then((res) => {
          this.post = res.data.data;
          // Para resolver un error que da en consola en las relaciones
          this.category = res.data.data.categoria;
          this.user = res.data.data.usuario;
        })
        .catch((err) => {
          console.log(err);
        })

      },

    },
  }
</script>