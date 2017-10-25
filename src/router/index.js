import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/Hello'

import Preview from '@/components/Preview'
import Index from '@/pages/index'
import Publish from '@/pages/publish'
import Mine from '@/pages/mine'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/preview',
      name: 'Preview',
      component: Preview
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    }
  ]
})
