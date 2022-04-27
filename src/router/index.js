import Vue from 'vue'
import VueRouter from 'vue-router'
import Cart from '../views/Cart.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'cart',
    component: Cart
  }
]

const router = new VueRouter({
  routes
})

export default router
