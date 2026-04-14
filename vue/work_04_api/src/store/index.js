import { createStore } from 'vuex';
import router from '../router';

export default createStore({
  state: {
    auth: null,
  },
  mutations: {
    setAuth(state, auth) {
      state.auth = auth;
    }
  },
  actions: {
    setAuth({ commit }) {
      if (localStorage.getItem('auth')) {
        commit('setAuth', JSON.parse(localStorage.getItem('auth')));
      }
    },
    logout({commit}) {
      localStorage.removeItem('auth');
      commit('setAuth', null);
      router.push({ name: 'home' });
    }
  },
  modules: {},
});