const moduleUser = {

  namespaced: true,

  state: {
    name: 'Victor',
    lastName: 'Torres',
  },
  getters: {
    sizeApellido(state) {
      return state.lastName.length;
    }
  },
  mutations: {
    changeName(state, name) {
      state.name = name;
    },
  },
  actions: {
    changeNameAsync({commit, state, getters}, name) {

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          //console.log('Ejecutando la funcion asincrona');
          commit('changeName', name);

          // state.name = name;
          // getters.sizeApellido;
          resolve();
        }, 2000);
      });
    },
    async confirmationChangeName({ dispatch }, name) {
      await dispatch('changeNameAsync', name);
      console.log('Ejecutando la funcion asincrona');
    }
  },
}

export default moduleUser;