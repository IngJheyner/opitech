<template>

  <h1>Listado de Posts</h1>

  <div v-if="auth" class="card bg-dark">
    <div class="card-header text-danger my-3">
      <ul v-if="errors.length > 0">
        <li v-for="error in errors" :key="error.id">
          {{ error }}
        </li>
      </ul>
    </div>
    <form @submit.prevent="savePost" class="card-body text-success">
      <div class="mb-3">
        <label for="name" class="fw-bold fs-6">Titulo</label>
        <br>
        <input type="text" name="name" id="name"
        v-model="post.name" class="form-control bg-dark border-success text-white-50">
      </div>
      <div class="mb-3">
        <label for="slug" class="fw-bold fs-6">Slug</label>
        <br>
        <input type="text" name="slug" id="slug"
        v-model="post.slug" class="form-control bg-dark border-success text-white-50">
      </div>
      <div class="mb-3">
        <label for="category_id" class="fw-bold fs-6">Categoria</label>
        <br>
        <select name="category_id" id="category_id"
        v-model="post.category_id" class="form-control bg-dark border-success text-white-50">
          <option value="" selected disabled>Seleccione una categoria</option>
          <option v-for="category in categories" :key="'category-'+category.id" :value="category.id">
            {{ category.nombre }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="extract" class="fw-bold fs-6">Extracto</label>
        <br>
        <input type="text" name="extract" id="extract"
        v-model="post.extract" class="form-control bg-dark border-success text-white-50">
      </div>
      <div class="mb-3">
        <label for="body" class="fw-bold fs-6">Contenido</label>
        <br>
        <textarea name="body" id="body" cols="30" rows="10"
        v-model="post.body" class="form-control bg-dark border-success text-white-50"></textarea>
      </div>
      <br>
      <button type="submit"
      :class="{
        'btn btn-primary btn-lg': true,
        'disabled': disabled
      }">
     Crear Post</button>
    </form>
  </div>

  <div class="d-flex flex-column mx-auto">
    <div>
      <h2>Buscador</h2>
      <input type="text" placeholder="Ingrese una palabra para filtrar" class="form-control"
      v-model="search">
    </div>

    <ul>
      <li v-for="post in posts" :key="'post-'+ post.id" class="mt-3">

        <router-link :to="{ name: 'show-post', params: { id: post.id } }" class="fs-5">
          {{ post.nombre }}
        </router-link>
        &nbsp; &nbsp;
        <button v-if="auth && post.usuario.id == auth.user.id" @click="deletePost(post.id)"
        class="btn btn-danger btn-sm">
          Eliminar
        </button>
      </li>

      <li v-if="posts.length === 0 && !disabled" class="my-3 fs-5">No se encontraron posts</li>

    </ul>

    <nav aria-label="Page navigation example bg-dark">

      <div style="width: 3rem; height: 3rem;" role="status"
      :class="{
          'spinner-border my-3': disabled
      }">
        <span class="sr-only"></span>
      </div>

      <ul class="pagination">

        <li class="page-item"
        v-for="pagination in pagination.links" :key="'pagination_links-'+pagination.label"
        :class="{
          'active': pagination.active,
          'disabled': pagination.url == null
        }">
          <a class="page-link" v-html="pagination.label"
          @click="changePage(pagination.url)" href="#">
          </a>
        </li>
      </ul>

    </nav>

  </div>

</template>

<script>

  import usePagination from '@/composables/usePagination.js';

  import { mapState } from 'vuex';

export default {

  // composition api
  // Lo pasamos al archivo src/composables/usePagination.js
  setup() {

    const { pagination, page, setPagination, changePage } = usePagination();

    // const pagination = ref({});
    // const route = useRoute();
    // const router = useRouter();

    // // Computed
    // const page = computed(() => {
    //   let page = route.query.page ?? 1;

    //   if (page > pagination.value.last_page) {
    //     // Se remplaza el parametro page por el ultimo en la url
    //     router.replace({ query: { page: pagination.value.last_page } })
    //     return pagination.value.last_page;
    //   }

    //   return page;
    // })

    // // Metodos
    // const setPagination = (meta) => {
    //   pagination.value = {
    //     links: meta.links,
    //     last_page: meta.last_page
    //   }
    // }

    // // Cambiar de pagina
    // const changePage = (url) => {

    //   let page = url.split("page=")[1];
    //   router.replace({ query: { page: page } });

    // }

    return {
      pagination,
      page,
      setPagination,
      changePage,
    }
  },
  data() {
    return {
      posts: [],
      categories: [],
      post: {
        name: "",
        slug: "",
        extract: "Lorem ispum default",
        category_id: "",
        body: ""
      },
      errors: [],
      //pagination_links: [],
      //pagination: {},
      search: "",
      disabled: false,
    };
  },
  created() {

    this.disabled = true;
    setTimeout(() => {
      this.getPosts();
      this.getCategories();
    }, 1000);

  },
  computed: {
    // page() {
    //   let page = this.$route.query.page ?? 1;

    //   if (page > this.pagination.last_page) {
    //     // Se remplaza el parametro page por el ultimo en la url
    //     this.$router.replace({ query: { page: this.pagination.last_page } })
    //     return this.pagination.last_page;
    //   }

    //   return page;
    // }
    ...mapState(['auth'])
  },
  // Oyente de cambios
  watch: {
    page() {
      this.getPosts();
    },
    search() {
      this.posts = [];
      this.disabled = true;
      setTimeout(() => {
        this.getPosts();
      }, 1000);
      //this.getPosts();
    }
  },
  methods: {

    // Me trae los posts
    async getPosts() {

      //await this.axios.get("http://codersfree-api.lndo.site/v1/posts?sort=-id&perPage=10&page=" + this.page + "&filter[name]=" + this.search)
      //this.disabled = true;
      await this.axios.get("v1/posts", {
        params: {
          included: "user",
          sort: "-id",
          perPage: 10,
          page: this.page,
          filter: {
            name: this.search
          },
        }
      })
        .then((res) => {
          this.posts = res.data.data;

          this.setPagination(res.data.meta);

          console.log(this.posts)

          this.disabled = false;

          // this.pagination = {
          //   links: res.data.meta.links,
          //   last_page: res.data.meta.last_page,
          // }
          //this.pagination_links = res.data.meta.links;

        })
        .catch((err) => {
          console.log(err);
      })

    },

    // Trae las categorias
    async getCategories() {

      await this.axios.get("v1/categories")
      .then((res) => {
        this.categories = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      })
    },

    // Se debe loguear en postman para poder crear un post
    // Se debe enviar el token en el header
    async savePost() {

      await this.axios.post("v1/posts", this.post)
      .then((res) => {
        this.disabled = true;
        this.posts = [];
        setTimeout(() => {

          this.getPosts();

          this.post = {
            name: "",
            slug: "",
            //extract: "",
            category_id: "",
            body: ""
          }

          this.errors = [];

          this.disabled = false;

        }, 1000);

      })
      .catch((err) => {

        // Convierte el objeto en un array
        this.errors = Object.values(err.response.data.errors).flat();
        this.disabled = false;
        //this.errors = err.response.data.errors;
      })

    },

    // Eliminar post
    async deletePost(id) {
      await this.axios.delete("v1/posts/" + id)
      .then(() => {
       //this.posts = this.posts.filter((post) => post.id != id);
        this.getPosts();
      })
      .catch((err) => {
        console.log(err);
      })
    },

    // // Cambiar de pagina
    // async changePage(url) {
    //   let page = url.split("page=")[1];

    //   this.$router.replace({ query: { page: page } });
    // }

  },

}
</script>