<template>

  <h1>Hola desde el componente counter</h1>

  <button
  @click="decrement">-</button>
  <span>{{ count }}</span>
  <button
  @click="increment">+</button>

</template>

<script>
  export default {
    data() {
      return {
        count: 0,
        prueba: 'Hola desde el componente counter'
      }
    },
    methods: {
      increment() {
        this.count++
      },
      decrement() {
        this.count--
      }
    },
    // Antes de que se cree el componente
    beforeCreate() {
      console.log('beforeCreate')

    },
    // Se crea el componente
    created() {
      this.prueba = 'Hola desde el componente counter 2'
    },

    // Se monta el componente
    mounted() {
      console.log('mounted')
    },

    // Se actualiza el componente
    updated() {
      console.log('updated')
    },

    // Se desmonta el componente
    unmounted() {
      console.log('unmounted')
    }
  }
</script>

<style scoped>
  h1 {
    color: red;
  }
</style>