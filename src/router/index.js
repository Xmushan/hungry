import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: () => import('../components/goods/Goods.vue')
  },
  {
    path: '/ratings',
    component: () => import('../components/ratings/Ratings.vue')
  },
  {
    path: '/seller',
    component: () => import('../components/seller/Seller.vue')
  },
  {
    path: '/test',
    component: () => import('../views/test.vue')
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

export default router
