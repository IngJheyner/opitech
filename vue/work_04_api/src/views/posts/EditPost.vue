<template>
  <h1>Editar POST</h1>

  <form @submit.prevent="updatePost">

    <div>
      <label for="nombre">Titulo</label>
      <br>
      <input type="text" name="nombre" id="nombre"
      v-model="post.nombre">
    </div>

    <div>
      <label for="slug">Slug</label>
      <br>
      <input type="text" name="slug" id="slug"
      disabled>
    </div>

    <div>
      <label for="category_id">Categoria</label>
      <br>
      <select name="category_id" id="category_id"
      v-model="post.category_id">
        <option value="" selected disabled>Seleccione una categoria</option>
        <option v-for="category in categories" :key="'category-'+category.id" :value="category.id">
          {{ category.nombre }}
        </option>
      </select>
    </div>

    <div>
      <label for="extracto">Extracto</label>
      <br>
      <input type="text" name="extracto" id="extracto"
      v-model="post.extracto">
    </div>

    <div>
      <label for="contenido">Contenido</label>
      <br>
      <textarea name="contenido" id="contenido" cols="30" rows="10"
      v-model="post.contenido"></textarea>
    </div>

    <br>

    <div v-if="auth"><button type="submit">Editar Post</button></div>
  </form>

</template>

<script>

  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        categories: [],
        post: {},
        user: {},
      };
    },
    created() {
      this.getPost();
      this.getCategories();
    },
    computed: {
      ...mapState(['auth']),
    },
    methods: {

      async getCategories() {

        await this.axios.get("v1/categories")
        .then((res) => {
          this.categories = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
      },

      async getPost() {

        await this.axios.get("v1/posts/" + this.$route.params.id + "?included=category,user")
        .then((res) => {
          this.post = res.data.data;
          this.user = res.data.data.usuario;

          if (this.user.id != this.auth.user.id) {
            this.$router.push({ name: 'posts' });
          }
        })
        .catch((err) => {
          console.log(err);
        })

      },

      async updatePost() {

        await this.axios.put("v1/posts/" + this.$route.params.id, this.post, {
          headers: {
          //Authorization: "Bearer " + localStorage.getItem("token")
          Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5OWJhMWFjZi0xY2M5LTRiZDEtYjk4ZS04NTQ4ODMzNTZlM2IiLCJqdGkiOiI1NzRiMzQzODg5ZmJmZDUzMTRjMzdjZDA2MzI3NTQ4ODA3ODFhMjFjMzllYzZhYzhlYjIwNjNmMmYwYzkyZTJlZGM4ZDA3OTU0YWQyOTIxNiIsImlhdCI6MTY5MDI1MDg4Ni42OTAyODMsIm5iZiI6MTY5MDI1MDg4Ni42OTAyODcsImV4cCI6MTY5MDI1MTA2Ni42MzkyMjIsInN1YiI6IjEiLCJzY29wZXMiOlsicmVhZC1wb3N0Il19.K_sTmrWqk7lWDu_Vq3Twi_VdI8ag2S0F4A6lUnviZdn0FwZlxXnAH23d0WWCl-LbFai5WB4A2k5HDkwCPKbEylkD6EDhwYHPasNqUIOxJGgPgN4KcmrhQN19RioRulMp5oe3QjKV48MJVFiWjKmUwT1P-96dOWZg-g1phRhSGLpyn-fbCHil2C7qyKOMV5cPYoollRoEzQ8TsnkMorKq0ebHFnZHKLzxZZr_YgUb1dCuBPUJ0SMyhp-d4dzzOhBFQBGBBpfajykHP3Xow5TKrL6S4ZucSs3W0K82PJijlbQK-kqDXV5JU2NiN7DcOd5gq9MFrLqEpyswM-52Aty0f0p4AkNIPMKZ6lL_GcdpIJYOtIVS0MNqVGLqiCZTwbrmaGfsNLgf1Zs58Q_2Q-KLwSrUGiadicX7nENPSMcf44NqpSKIP0ZFeC7njXUiM2GXD2MkEMlJQxwfB5DsN6P-k74YqvDuAHGkZIbN1n8zOiQ2OnfClSDf_NRQuP8nac0w4FyDEtIUMnaEFXm4Gxl2bXfb6f8afcByGzyGNnlkx-7phFbc4RnP2aqkhrD9Oc5Na78bZp9yZ8haj4SQOfZQ38H8bYZXZ11HV0-t86ipYQhwQhClIkolWlGAzyCGYygSDd0Zy0bg8ZiY0qw47FyxsWk-znM0XtVaTWKBDC__NaE"
          },
        })
        .then(() => {
          this.$router.push({ name: 'show-post', params: { id: this.$route.params.id } });
        })
        .catch((err) => {
          console.log(err);
        })

      },

    },
  }
</script>