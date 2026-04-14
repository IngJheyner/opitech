<template>
  <div>
    <h1>Login</h1>
    <div class="card bg-dark">
      <div class="card-body text-success">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="fw-bold fs-6">Email</label>
            <input type="email" id="email" class="form-control border-success bg-dark text-white-50" placeholder="Ingresa tu e-mail"
            v-model="email"/>
          </div>

          <div class="mb-3">
            <label for="password" class="fw-bold fs-6">Password</label>
            <input type="password" id="password" class="form-control border-success bg-dark text-white-50" placeholder="Ingresa tu password"
            v-model="password"/>
          </div>

          <button type="submit" class="btn btn-primary btn-lg mt-3"
          :class="{
            'disabled': disabled
          }">
          <span role="status" aria-hidden="true"
          :class="{
            'spinner-border spinner-border-sm': disabled
          }"></span>
          Login</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex'

  export default {
    data() {
      return {
        email: '',
        password: '',
        disabled: false,
      }
    },
    computed: {
      ...mapState(['auth'])
    },
    methods: {
      async login() {
        this.disabled = true
        await this.axios.post('v1/login', {
          grant_type: 'password',
          client_id: '99ba1acf-1cc9-4bd1-b98e-854883356e3b',
          client_secret: 'kM6JcugBx3BxG38n1j0rtHn3dchs0yfuUrKYus0x',
          username: this.email,
          password: this.password
        })
        .then(response => {
          // Se guarda la informacion en el localstorage
          localStorage.setItem('auth', JSON.stringify(response.data))
          this.setAuth(response.data)
          this.$router.push({name: 'home'})
          this.disabled = false
        })
        .catch(error => {
          console.log(error)
        })
      },
      ...mapMutations(['setAuth'])
    }
  }
</script>