import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Pokédex'
    },
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon',
    component: () => import('../views/PokemonView.vue'),
    meta: {
      title: 'Loading...'
    },
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('../views/TeamView.vue'),
    meta: {
      title: 'Pokédex - My Team'
    },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../views/FavoritesView.vue'),
    meta: {
      title: 'Pokédex - Favorites'
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFoundView.vue'),
    meta: {
      title: 'Not Found'
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
