const app = Vue.createApp({
  data() {
    return {
      textSize: 1,
      count: 5,
      courses : [
        {id: 1, name: 'HTML', price: '$50'},
        // {id: 2, name: 'CSS', price: '$60'},
        // {id: 3, name: 'JavaScript', price: '$70'},
      ]
    }
  },
  methods: {
    incrementarTexto(size) {
      this.textSize += size;
    }
  }
});

app.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button v-on:click="count++">
      You clicked me {{ count }} times.
    </button>
  `,
});

app.component('detail-course', {

  props: ['course'],

  data() {
    return {

    }
  },

  template: `
    <h1>{{ course.name }}</h1>
    <span>{{ course.price }}</span><br>
    <button
    @click="$emit('crecerTexto', 0.2)">Incrementar Tamanio</button>
    <br>
    <slot></slot>
  `,

});