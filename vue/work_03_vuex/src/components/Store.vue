<template>

  <div>

    <h1>Store</h1>

    <p>Mi nombre es: {{ `${name} ${lastName}` }}</p>

    <p>El apellido tiene {{ sizeApellido }} letras</p>

    <div>
      <button @click="decrement()">Disminuir</button>
        <span>{{ count }}</span>
      <button @click="increment">Aumentar</button>
    </div>

    <hr>

    <form action="" @submit.prevent="changeNameComponent">
      <input type="text" v-model="nameComponent">
      <button>Actualizar</button>
    </form>

  </div>

</template>

<script>

// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('user');

export default {
  // computed: {
  //   name() {
  //     return this.$store.state.name;
  //   },
  //   lastName() {
  //     return this.$store.state.lastName;
  //   }
  // }
  data() {
    return {
      nameComponent: '',
    }
  },
  methods: {
    //...mapMutations(['increment', 'decrement', 'changeName']),

    ...mapMutations('count', ['increment', 'decrement']), // Probar la accion de changeNameAsync
    ...mapActions('user', ['changeNameAsync', 'confirmationChangeName']),

    changeNameComponent() {

      // Probar la accion de changeNameAsync
      //this.$store.dispatch('changeNameAsync');
      // this.changeNameAsync(this.nameComponent).then(() => {
      //   console.log('Termino la promesa');
      //   //this.changeName(this.nameComponent);
      //   this.nameComponent = '';
      // }).catch(() => {
      //   console.log('Error en la promesa');
      // })

      this.confirmationChangeName(this.nameComponent).then(() => {
        console.log('Termino la promesa');
        //this.changeName(this.nameComponent);
        this.nameComponent = '';
      }).catch(() => {
        console.log('Error en la promesa');
      })

    },
    // changeNameAsync(name) {
    //   this.$store.dispatch('changeNameAsync', name);
    // }
  },
  computed: {
    //...mapState(['name', 'lastName', 'count']),

    // con modulos
    ...mapState({
      name: state => state.user.name,
      lastName: state => state.user.lastName,
      count: state => state.counter.count,
    }),

    // Getters
    // sizeApellido() {
    //   return this.lastName.length;
    // }
    //...mapGetters(['sizeApellido']),

    // Modulos
    ...mapGetters('user', ['sizeApellido']),
  }
}
</script>

<style>

</style>