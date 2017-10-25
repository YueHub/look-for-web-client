import Vue from 'vue'
import VueRouter from 'vue-router'

import Preview from '@/components/Preview'
import Acticle from '@/pages/acticle'
import Index from '@/pages/index/index'
import Publish from '@/pages/publish/publish'
import Mine from '@/pages/mine/mine'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/preview',
      name: 'Preview',
      component: Preview
    },
    {
      path: '/acticle',
      name: 'Acticle',
      component: Acticle
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
