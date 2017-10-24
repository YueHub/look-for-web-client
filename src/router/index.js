import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/pages/index'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    }
  ]
})
