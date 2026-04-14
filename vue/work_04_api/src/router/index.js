import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/posts/Posts.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/posts/:id',
      name: 'show-post',
      component: () => import('../views/posts/ShowPost.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/posts/:id/edit',
      name: 'edit-post',
      component: () => import('../views/posts/EditPost.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
      // Con esto verificamos si el usuario esta logueado
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('auth')) {
          next({ name: 'home'})
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue')
    },
  ]
})

// Con esto verificamos si el usuario esta logueado
// y si no lo esta lo redirigimos al login
// y si lo esta lo dejamos pasar
// Esto se hace en cada ruta que requiera autenticacion
// y se agrega el meta: { requiresAuth: true }
// y en el beforeEach se verifica si la ruta tiene ese meta
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('auth')) {
      next()
    } else {
      next({ name: 'login'})
    }
  } else {
    next()
  }
});

export default router
