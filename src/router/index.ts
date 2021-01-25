import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue';
import Tutorials from '../views/Tutorials.vue';
import Machines from '../views/Machines.vue';
import Workshops from '../views/Workshops.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tutorials',
    name: 'Tutorials',
    component: Tutorials
  },
  {
    path: '/machines',
    name: 'Machines',
    component: Machines
  },
  {
    path: '/workshops',
    name: 'Workshops',
    component: Workshops
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
