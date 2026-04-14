<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapActions, mapState } from 'vuex'
import HelloWorld from './components/HelloWorld.vue'

export default {

  created() {
    this.setAuth()
  },

  computed: {
    ...mapState(['auth'])
  },

  watch: {
    auth(newValue) {
      if (newValue) {
        this.axios.defaults.headers.common.Authorization = `Bearer ${newValue.token.access_token}`
      }
    }
  },
  methods: {
    ...mapActions(['setAuth', 'logout'])
  }
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />


      <div v-if="auth">

        <p class="text-success fs-4 mb-0">Bienvenido</p>
        <p class="fs-3 mb-0">{{ auth.user.name }}</p>

      </div>

      <nav class="mb-3">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about" v-if="auth">About</RouterLink>
        <RouterLink :to="{name: 'posts'}" v-if="auth">Posts</RouterLink>
        <RouterLink :to="{name: 'posts'}" v-if="auth" class="text-danger"
        @click="logout">Cerrar sesion</RouterLink>

        <RouterLink to="/login" v-if="!auth">Login</RouterLink>
        <RouterLink to="/register" v-if="!auth">Register</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
