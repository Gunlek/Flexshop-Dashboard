import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue';
import Tutorials from '../views/Tutorials.vue';
import Machines from '../views/Machines.vue';
import Workshops from '../views/Workshops.vue';
import Credits from '../views/Credits.vue';
import Settings from '../views/Settings.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Workshops
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
    path: '/credits',
    name: 'Credits',
    component: Credits
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
