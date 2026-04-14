<script setup>

import Counter from './components/Counter.vue'

</script>

<template>

  <header>
    <nav>
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'Users' }">User</router-link> |
      <router-link :to="{ name: 'Blog' }">Blog</router-link>
    </nav>
  </header>

  <h1>Hola desde titulo principal</h1>

  <Counter />

  <router-view />

</template>
