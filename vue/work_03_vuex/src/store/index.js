import { createStore } from 'vuex'

import moduleUser from './modules/user';
import moduleCounter from './modules/counter';
// modulos
// const moduleUser = {

//   namespaced: true,

//   state: {
//     name: 'Victor',
//     lastName: 'Torres',
//   },
//   getters: {
//     sizeApellido(state) {
//       return state.lastName.length;
//     }
//   },
//   mutations: {
//     changeName(state, name) {
//       state.name = name;
//     },
//   },
//   actions: {
//     changeNameAsync({commit, state, getters}, name) {

//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           //console.log('Ejecutando la funcion asincrona');
//           commit('changeName', name);

//           // state.name = name;
//           // getters.sizeApellido;
//           resolve();
//         }, 2000);
//       });
//     },
//     async confirmationChangeName({ dispatch }, name) {
//       await dispatch('changeNameAsync', name);
//       console.log('Ejecutando la funcion asincrona');
//     }
//   },
// }

// const moduleCounter = {

//   namespaced: true,

//   state: {
//     count: 1,
//   },
//   mutations: {
//     increment(state) {
//       state.count++;
//     },
//     decrement(state) {
//       state.count--;
//     }
//   },
// }

export default createStore({
  state: {
    // name: 'Victor',
    // lastName: 'Torres',
    //count: 1,
  },
  getters: {
    // sizeApellido(state) {
    //   return state.lastName.length;
    // }
  },
  mutations: {
    // changeName(state, name) {
    //   state.name = name;
    // },
    // increment(state) {
    //   state.count++;
    // },
    // decrement(state) {
    //   state.count--;
    // }
  },
  // Para hacer funciones asincronas
  actions: {
    // changeNameAsync({commit, state, getters}, name) {

    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       //console.log('Ejecutando la funcion asincrona');
    //       commit('changeName', name);

    //       // state.name = name;
    //       // getters.sizeApellido;
    //       resolve();
    //     }, 2000);
    //   });
    // },
    // async confirmationChangeName({ dispatch }, name) {
    //   await dispatch('changeNameAsync', name);
    //   console.log('Ejecutando la funcion asincrona');
    // }

  },
  modules: {
    user: moduleUser,
    counter: moduleCounter,
  }
});