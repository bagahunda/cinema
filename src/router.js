import Vue from 'vue'
import Router from 'vue-router'
import MovieDetails from './views/MovieDetails'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'movie-details',
      component: MovieDetails
    }
  ]
})
