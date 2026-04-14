import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import store from './store'

// base url de la api
axios.defaults.baseURL = 'http://codersfree-api.lndo.site/'

// Envio de credenciales
//axios.defaults.withCredentials = true

const app = createApp(App)

app
.use(router)
.use(VueAxios, axios)
.use(store)
.use({ origin: true})

app.mount('#app')
