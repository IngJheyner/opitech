import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
    //component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/post',
    name: 'Blog',
    // component: Blog
    component: () => import('../views/Blog.vue')
  },
  // Redirect
  {
    path: '/blog',
    redirect: { name: 'Blog' }
  },
  {
    path: '/blog/:post',
    name: 'Post',
    // component: Post
    component: () => import('../views/Post.vue')

  },
  {
    path: '/user/:user/post/:post',
    name: 'UserPost',
    // component: Post
    component: () => import('../views/UserPost.vue')

  },
  {
    path: '/puys/:orderId(\\d+)',
    name: 'Order',
    // component: Post
    component: () => import('../views/Order.vue')

  },
  {
    path: '/puys/:productName',
    name: 'Product',
    // component: Post
    component: () => import('../views/Product.vue')

  },
  {
    path: '/users/:userId(\\d+)?',
    name: 'Users',
    // component: Post
    component: () => import('../views/User.vue'),
    props: true,
    children: [
      {
        path: '',
        name: 'UserIndex',
        component: () => import('../views/users/Index.vue')
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('../views/users/Profile.vue')
      },
      {
        path: 'courses',
        name: 'UserCourses',
        component: () => import('../views/users/Courses.vue')
      },
    ],
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    // component: Post
    component: () => import('../views/404.vue')

  },
]

const router = createRouter({
  history: createWebHistory(),
  //history: createWebHashHistory(),
  routes
})

export default router