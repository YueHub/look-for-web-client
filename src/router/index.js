import Vue from 'vue'
import VueRouter from 'vue-router'

import Preview from '@/components/Preview'
import InfoBoard from '@/pages/info-board'
import Index from '@/pages/index/index'
import Release from '@/pages/release/release'
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
      path: '/infoboard',
      name: 'InfoBoard',
      component: InfoBoard
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/release',
      name: 'Release',
      component: Release
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    }
  ]
})
