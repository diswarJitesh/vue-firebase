import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { auth } from '../firebase'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  { path: '/dashboard', 
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../components/Dashboard/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "about" */ '../components/Settings/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../components/Auth/Login/Login.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "about" */ '../components/Auth/SignUp/SignUp.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "about" */ '../components/Auth/Forgot-Password/Forgot-Password.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else if (!requiresAuth && auth.currentUser) {
    next('/dashboard')
  } else {
    next();
  }  
})
export default router
